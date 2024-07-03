use actix_web::{post, web, HttpResponse};
use mysql::{prelude::Queryable, Pool};

use crate::types::{
    db::booking::Booking, req::get_history::GetHistoryRequest, res::get_history::GetHistoryResponse,
};

#[post("/api/getHistory")]
pub async fn get_history(
    pool: web::Data<Pool>,
    web::Json(get_history_request): web::Json<GetHistoryRequest>,
) -> HttpResponse {
    let mut conn = match pool.get_conn() {
        Ok(conn) => conn,
        Err(err) => {
            eprintln!("Unable to get connection from pool: {}", err);
            return HttpResponse::InternalServerError().finish();
        }
    };
    let uid = get_history_request.uid;
    let query = format!(
        "SELECT BID, UID, TID, SourceSID, DestSID, Price, BTime FROM BOOKING WHERE UID = {}",
        uid
    );
    let bookings = match conn.query_map(
        query,
        |(bid, uid, tid, source_sid, dest_sid, price, btime)| Booking {
            bid,
            uid,
            tid,
            source_sid,
            dest_sid,
            price,
            btime,
        },
    ) {
        Ok(bookings) => bookings,
        Err(err) => {
            let response = format!("Unable to get bookings for user uid: {} : {}", uid, err);
            eprintln!("{}", response);
            return HttpResponse::InternalServerError().body(response);
        }
    };
    let response = GetHistoryResponse { bookings };
    HttpResponse::Ok().json(response)
}
