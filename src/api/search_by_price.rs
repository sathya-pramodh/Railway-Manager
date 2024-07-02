use actix_web::{post, web, HttpResponse};
use mysql::{prelude::Queryable, Pool};

use crate::types::{db::train_price::TrainPrice, req::search_by_price::SearchByPriceRequest, res::search_by_price::SearchByPriceResponse};

#[post("/api/searchByPrice")]
pub async fn search_by_price(
    pool: web::Data<Pool>,
    web::Json(search_by_price): web::Json<SearchByPriceRequest>,
) -> HttpResponse {
    let mut conn = match pool.get_conn() {
        Ok(conn) => conn,
        Err(err) => {
            eprintln!("Unable to get connection from pool: {}", err);
            return HttpResponse::InternalServerError().finish();
        }
    };
    let lower_bound = search_by_price.price_lower_bound;
    let upper_bound = search_by_price.price_upper_bound;
    let query = format!(
        "SELECT TID, SUM(Price) AS TotalPrice FROM ROUTE GROUP BY TID HAVING TotalPrice >= {} AND TotalPrice <= {} ORDER BY TotalPrice", 
        lower_bound, 
        upper_bound
    );
    let results = match conn.query_map(query, |(tid, total_price)| {
        TrainPrice { tid, total_price }
    }) {
        Ok(res) => res,
        Err(err) => {
            let response = format!("Unable to get trains for price lb: {} and price ub: {} : {}", lower_bound, upper_bound, err);
            eprintln!("{}", response);
            return HttpResponse::NotFound().body(response);
        }
    };
    let response = SearchByPriceResponse { trains: results };
    HttpResponse::Ok().json(response)
}
