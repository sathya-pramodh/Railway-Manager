use serde::{Deserialize, Serialize};

use crate::types::db::train_price::FullTrainPrice;

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SearchByTrainIdResponse {
    pub trains: Vec<FullTrainPrice>,
}
