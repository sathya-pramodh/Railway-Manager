use actix_web::{post, web, HttpResponse};
use mysql::{prelude::Queryable, Pool};

use crate::types::{
    db::{train::Train, train_price::FullTrainPrice},
    req::search_by_train_id::SearchByTrainIdRequest,
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
    let price_query = format!(
        "SELECT SUM(Price) AS TotalPrice FROM ROUTE WHERE TID = {}",
        tid
    );
    let result = match conn.query_map(price_query, |total_price| {
        for train in trains.iter() {
            if train.tid == tid {
                return Some(FullTrainPrice {
                    total_price,
                    train: train.copy(),
                });
            }
        }
        None
    }) {
        Ok(result) => result,
        Err(err) => {
            let response = format!("Unable to get prices for tid: {} : {}", tid, err);
            eprintln!("{}", response);
            return HttpResponse::BadRequest().body(response);
        }
    };
    let mut trains = vec![];
    for train in result {
        if train.is_some() {
            trains.push(train.unwrap());
        }
    }
    let response = SearchByTrainIdResponse { trains };
    HttpResponse::Ok().json(response)
}
