use actix_web::{post, web, HttpResponse};
use mysql::Pool;
use serde::Deserialize;

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
#[allow(dead_code)]
struct RequestData {
    source_destination: String,
    final_destination: String,
    date: String,
    time: String,
    price_lower_bound: u64,
    price_upper_bound: u64,
    account_id: u64,
    train_name: Option<String>,
    train_id: Option<String>,
    status_train_id: u64,
}

#[post("/api/getTrains")]
pub async fn get_trains(
    pool: web::Data<Pool>,
    web::Json(request_json): web::Json<RequestData>,
) -> HttpResponse {
    let mut conn = match pool.get_conn() {
        Ok(conn) => conn,
        Err(err) => {
            eprintln!("Unable to get connection from pool: {}", err);
            return HttpResponse::InternalServerError().finish();
        }
    };
    println!("{:#?}", request_json);
    HttpResponse::Ok().finish()
}
