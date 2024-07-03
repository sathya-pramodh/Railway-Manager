use actix_web::{post, web, HttpResponse};
use mysql::{prelude::Queryable, Pool};

use crate::types::{
    db::train::Train, req::search_by_train_id::SearchByTrainIdRequest,
    res::search_by_train_id::SearchByTrainIdResponse,
};

#[post("/api/searchByTrainId")]
pub async fn search_by_train_id(
    pool: web::Data<Pool>,
    web::Json(search_by_train_id_request): web::Json<SearchByTrainIdRequest>,
) -> HttpResponse {
    let mut conn = match pool.get_conn() {
        Ok(conn) => conn,
        Err(err) => {
            eprintln!("Unable to get connection from pool: {}", err);
            return HttpResponse::InternalServerError().finish();
        }
    };
    let tid = search_by_train_id_request.tid;
    let query = format!(
        "SELECT TID, SourceSID, DestSID, Capacity, DTime FROM TRAIN WHERE TID = {}",
        tid
    );
    let trains = match conn.query_map(query, |(tid, source_sid, dest_sid, capacity, dtime)| {
        Train {
            tid,
            source_sid,
            dest_sid,
            capacity,
            dtime,
        }
    }) {
        Ok(trains) => trains,
        Err(err) => {
            let response = format!("Unable to get trains for tid: {} : {}", tid, err);
            eprintln!("{}", response);
            return HttpResponse::BadRequest().body(response);
        }
    };
    let response = SearchByTrainIdResponse { trains };
    HttpResponse::Ok().json(response)
}
