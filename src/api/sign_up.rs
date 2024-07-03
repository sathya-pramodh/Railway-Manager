use actix_web::{post, web, HttpResponse};
use mysql::{prelude::Queryable, Pool};
use sha2::{Digest, Sha256};

use crate::types::{db::user::User, req::sign_up::SignUpRequest, res::sign_up::SignUpResponse};

#[post("/api/signUp")]
pub async fn sign_up(
    pool: web::Data<Pool>,
    web::Json(sign_up_request): web::Json<SignUpRequest>,
) -> HttpResponse {
    let mut conn = match pool.get_conn() {
        Ok(conn) => conn,
        Err(err) => {
            eprintln!("Unable to get connection from pool: {}", err);
            return HttpResponse::InternalServerError().finish();
        }
    };
    let get_last_uid_query = "SELECT UID FROM USER ORDER BY UID DESC";
    let last_uid = match match conn.query_first(get_last_uid_query) {
        Ok(uid) => uid,
        Err(err) => {
            let response = format!("Unable to get last uid from users table: {}", err);
            eprintln!("{}", response);
            return HttpResponse::NotFound().body(response);
        }
    } {
        Some(uid) => uid,
        None => 0,
    };
    let new_user = sign_up_request.user;
    let check_query = format!(
        "SELECT * FROM USER WHERE UName = '{}' AND Email = '{}'",
        new_user.uname, new_user.email
    );
    match conn.query_map(
        check_query,
        |(uid, uname, phno, email, _logged_in): (u64, String, u64, String, bool)| User {
            uid,
            uname,
            email,
            phno,
        },
    ) {
        Ok(users) => {
            if users.len() != 0 {
                let response = format!(
                    "User has already signed up with email: '{}' and name: '{}'",
                    new_user.email, new_user.uname
                );
                eprintln!("{}", response);
                return HttpResponse::BadRequest().body(response);
            }
        }
        Err(err) => {
            let response = format!("Unable to check if a user is already in db: {}", err);
            eprintln!("{}", response);
            return HttpResponse::InternalServerError().body(response);
        }
    };
    let user_query = format!(
        "INSERT INTO USER VALUES ({}, '{}', {}, '{}', 1)",
        last_uid + 1,
        new_user.uname,
        new_user.phno,
        new_user.email
    );
    match conn.query_drop(user_query) {
        Ok(_) => (),
        Err(err) => {
            let response = format!("Unable to insert new user into db: {}", err);
            eprintln!("{}", response);
            return HttpResponse::NotFound().body(response);
        }
    };
    let mut hasher = Sha256::new();
    hasher.update(sign_up_request.password.as_bytes());
    let password_hash = format!("{:X}", hasher.finalize());
    let password_query = format!(
        "INSERT INTO PASSWORDS VALUES ({}, '{}')",
        last_uid + 1,
        password_hash
    );
    match conn.query_drop(password_query) {
        Ok(_) => (),
        Err(err) => {
            let response = format!("Unable to insert new user into db: {}", err);
            eprintln!("{}", err);
            return HttpResponse::BadRequest().body(response);
        }
    }
    let user = User {
        uid: last_uid + 1,
        uname: new_user.uname,
        email: new_user.email,
        phno: new_user.phno,
    };
    let response = SignUpResponse { user };
    HttpResponse::Ok().json(response)
}
