use serde::{Deserialize, Serialize};

use crate::types::db::train::Train;

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SearchByTrainIdResponse {
    pub trains: Vec<Train>,
}
