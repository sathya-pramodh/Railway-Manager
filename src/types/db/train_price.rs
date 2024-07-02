use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct TrainPrice {
    pub tid: u64,
    pub total_price: u64,
}
