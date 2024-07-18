use actix_web::{post, web, HttpResponse};
use mysql::{prelude::Queryable, Pool};

use crate::types::req::remove_booking::RemoveBookingRequest;

#[post("/api/removeBooking")]
pub async fn remove_booking(
    pool: web::Data<Pool>,
    web::Json(remove_booking_request): web::Json<RemoveBookingRequest>,
) -> HttpResponse {
    let mut conn = match pool.get_conn() {
        Ok(conn) => conn,
        Err(err) => {
            eprintln!("Unable to get connection from pool: {}", err);
            return HttpResponse::InternalServerError().finish();
        }
    };
    let bid = remove_booking_request.bid;
    let query = format!("DELETE FROM BOOKING WHERE BID = {}", bid);
    match conn.query_drop(query) {
        Ok(_) => (),
        Err(err) => {
            let response = format!("Unable to delete booking bid: {} : {}", bid, err);
            eprintln!("{}", response);
            return HttpResponse::NotFound().body(response);
        }
    }
    HttpResponse::Ok().finish()
}
