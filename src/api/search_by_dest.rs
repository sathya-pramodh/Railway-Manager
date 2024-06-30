use actix_web::{
    http::header::ContentType,
    post,
    web::{self},
    HttpResponse,
};
use mysql::{prelude::Queryable, Pool};

use crate::{
    db::station::Station,
    types::{
        db::route::Route, search_by_dest_request::SearchByDestRequest,
        search_by_dest_response::SearchByDestResponse,
    },
};

#[post("/api/searchByDest")]
pub async fn search_by_dest(
    pool: web::Data<Pool>,
    web::Json(search_by_dest): web::Json<SearchByDestRequest>,
) -> HttpResponse {
    let mut conn = match pool.get_conn() {
        Ok(conn) => conn,
        Err(err) => {
            eprintln!("Unable to get connection from pool: {}", err);
            return HttpResponse::InternalServerError().finish();
        }
    };
    let source_station_name = search_by_dest.source_station;
    let dest_station_name = search_by_dest.destionation_station;
    let source_station_query = format!(
        "SELECT SID, SNAME, SLOCATION FROM STATION WHERE SNAME LIKE '%{}%'",
        source_station_name
    );
    let dest_station_query = format!(
        "SELECT SID, SNAME, SLOCATION FROM STATION WHERE SNAME LIKE '%{}%'",
        dest_station_name
    );
    let source_stations =
        match conn.query_map(source_station_query, |(sid, sname, location)| Station {
            sid,
            sname,
            location,
        }) {
            Ok(res) => res,
            Err(err) => {
                let response = format!(
                    "Unable to get source station for sname: '{}': {}",
                    source_station_name, err
                );
                eprintln!("{}", response);
                return HttpResponse::BadRequest().body(response);
            }
        };
    let source_station = match source_stations.first() {
        Some(station) => station,
        None => {
            let response = format!("No stations found with name: '{}'.", source_station_name);
            eprintln!("{}", response);
            return HttpResponse::BadRequest().body(response);
        }
    };
    let dest_stations = match conn.query_map(dest_station_query, |(sid, sname, location)| Station {
        sid,
        sname,
        location,
    }) {
        Ok(res) => res,
        Err(err) => {
            let response = format!(
                "Unable to get source station for sname: '{}': {}",
                source_station_name, err
            );
            eprintln!("{}", response);
            return HttpResponse::BadRequest().body(response);
        }
    };
    let dest_station = match dest_stations.first() {
        Some(station) => station,
        None => {
            let response = format!("No stations found with name: '{}'.", source_station_name);
            eprintln!("{}", response);
            return HttpResponse::BadRequest().body(response);
        }
    };
    let result_query = format!(
        "SELECT TID, SourceSID, DestSID, Price FROM ROUTE WHERE SourceSID = {} AND DestSID = {}",
        source_station.sid, dest_station.sid
    );
    let routes = match conn.query_map(result_query, |(tid, source_sid, dest_sid, price)| Route {
        tid,
        source_sid,
        dest_sid,
        price,
    }) {
        Ok(routes) => routes,
        Err(err) => {
            let response = format!(
                "No routes found from '{}' to '{}': {}",
                source_station_name, dest_station_name, err
            );
            eprintln!("{}", response);
            return HttpResponse::NotFound().body(response);
        }
    };
    let response = SearchByDestResponse { routes };
    HttpResponse::Ok()
        .content_type(ContentType::json())
        .json(response)
}
