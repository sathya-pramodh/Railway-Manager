use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SearchByPriceRequest {
    pub price_lower_bound: u64,
    pub price_upper_bound: u64,
}
