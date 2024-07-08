use actix_web::{post, web, HttpResponse};
use mysql::{prelude::Queryable, Pool};

use crate::types::req::add_booking::AddBookingRequest;

#[post("/api/addBooking")]
pub async fn add_booking(
    pool: web::Data<Pool>,
    web::Json(add_booking_request): web::Json<AddBookingRequest>,
) -> HttpResponse {
    let mut conn = match pool.get_conn() {
        Ok(conn) => conn,
        Err(err) => {
            eprintln!("Unable to get connection from pool: {}", err);
            return HttpResponse::InternalServerError().finish();
        }
    };
    let booking = add_booking_request.booking;
    let query_last_bid = format!("SELECT BID FROM BOOKING ORDER BY BID DESC");
    let last_bids = match conn.query_map(query_last_bid, |bid: u64| bid) {
        Ok(bids) => bids,
        Err(err) => {
            let response = format!("Unable to fetch last BIDs from bookings: {}", err);
            eprintln!("{}", response);
            return HttpResponse::InternalServerError().body(response);
        }
    };
    let last_bid = match last_bids.first() {
        Some(bid) => bid,
        None => &0,
    };
    let btime = "NOW()";

    let query = format!(
        "INSERT INTO BOOKING VALUES ({}, {}, {}, {}, {}, {}, {})",
        last_bid + 1,
        booking.uid,
        booking.tid,
        booking.source_sid,
        booking.dest_sid,
        booking.price,
        btime
    );
    match conn.query_drop(query) {
        Ok(_) => (),
        Err(err) => {
            let response = format!("Unable to insert new booking: {}", err);
            eprintln!("{}", response);
            return HttpResponse::InternalServerError().body(response);
        }
    }
    HttpResponse::Ok().finish()
}
