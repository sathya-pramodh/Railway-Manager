use serde::{Deserialize, Serialize};

use crate::types::db::train_price::TrainPrice;

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SearchByPriceResponse {
    pub trains: Vec<TrainPrice>,
}
