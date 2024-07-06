use serde::{Deserialize, Serialize};

use super::train::Train;

#[derive(Deserialize, Serialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct TrainPrice {
    pub tid: u64,
    pub total_price: u64,
}

#[derive(Deserialize, Serialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct FullTrainPrice {
    pub train: Train,
    pub total_price: u64,
}

impl FullTrainPrice {
    pub fn copy(&self) -> Self {
        Self {
            train: self.train.copy(),
            ..*self
        }
    }
}
