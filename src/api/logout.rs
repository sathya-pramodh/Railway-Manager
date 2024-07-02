use actix_web::{post, web, HttpResponse};
use mysql::{prelude::Queryable, Pool};

use crate::types::req::logout::LogoutRequest;

#[post("/api/logout")]
pub async fn logout(
    pool: web::Data<Pool>,
    web::Json(logout_request): web::Json<LogoutRequest>,
) -> HttpResponse {
    let mut conn = match pool.get_conn() {
        Ok(conn) => conn,
        Err(err) => {
            eprintln!("Unable to get connection from pool: {}", err);
            return HttpResponse::InternalServerError().finish();
        }
    };
    let query = format!(
        "UPDATE USER SET LoggedIn = 0 WHERE UID = {}",
        logout_request.uid
    );
    match conn.query_drop(query) {
        Ok(_) => (),
        Err(err) => {
            let response = format!(
                "Unable to update login state for user with uid: {} : {}",
                logout_request.uid, err
            );
            eprintln!("{}", response);
            return HttpResponse::BadRequest().body(response);
        }
    };
    HttpResponse::Ok().finish()
}
