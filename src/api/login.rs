use crate::types::{db::user::User, req::login::LoginRequest, res::login::LoginResponse};
use actix_web::{post, web, HttpResponse};
use mysql::{prelude::Queryable, Pool};
use sha2::{Digest, Sha256};

#[post("/api/login")]
pub async fn login(
    pool: web::Data<Pool>,
    web::Json(login_request): web::Json<LoginRequest>,
) -> HttpResponse {
    let mut conn = match pool.get_conn() {
        Ok(conn) => conn,
        Err(err) => {
            eprintln!("Unable to get connection from pool: {}", err);
            return HttpResponse::InternalServerError().finish();
        }
    };
    let mut hasher = Sha256::new();
    hasher.update(login_request.password.as_bytes());
    let password_hash = format!("{:X}", hasher.finalize());

    let query = format!(
        "SELECT UID FROM PASSWORDS WHERE PASSWORD_HASH = '{}'",
        password_hash
    );
    let users = match conn.query_map(query, |uid: u64| uid) {
        Ok(users) => users,
        Err(err) => {
            let response = format!("Unable to verify password: {}", err);
            eprintln!("{}", response);
            return HttpResponse::NotFound().body(response);
        }
    };
    if users.is_empty() || users.len() >= 2 {
        let response = format!(
            "Invalid inputs: email: {}, password:{} ",
            login_request.email, login_request.password
        );
        eprintln!("{}", response);
        return HttpResponse::BadRequest().body(response);
    }
    let uid = users.first().unwrap();
    let check_query = format!(
        "SELECT UID, UName, PhNo, Email FROM USER WHERE UID = {}",
        uid
    );
    let results = match conn.query_map(check_query, |(uid, uname, phno, email)| User {
        uid,
        uname,
        phno,
        email,
    }) {
        Ok(result) => result,
        Err(err) => {
            let response = format!(
                "Unable to verify uid for email: {} : {}",
                login_request.email, err
            );
            eprintln!("{}", response);
            return HttpResponse::NotFound().body(response);
        }
    };
    if results.is_empty() {
        let response = format!(
            "Invalid inputs: email: {}, password: {}",
            login_request.email, login_request.password
        );
        eprintln!("{}", response);
        return HttpResponse::BadRequest().body(response);
    }
    let user = results.first().unwrap();
    if user.email.to_lowercase() != login_request.email.to_lowercase() {
        let response = format!("Unable to verify email: {}.", login_request.email);
        eprintln!("{}", response);
        return HttpResponse::BadRequest().body(response);
    }
    let response = LoginResponse { user: user.copy() };
    let update_query = format!("UPDATE USER SET LoggedIn = 1 WHERE UID = {}", user.uid);
    match conn.query_drop(update_query) {
        Ok(_) => (),
        Err(err) => {
            let response = format!(
                "Unable to update user to logged in with email: {} : {}",
                login_request.email, err
            );
            eprintln!("{}", response);
            return HttpResponse::InternalServerError().body(response);
        }
    };
    HttpResponse::Ok().json(response)
}
