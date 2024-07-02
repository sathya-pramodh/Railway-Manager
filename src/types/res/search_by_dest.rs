use serde::{Deserialize, Serialize};

use crate::types::db::route::Route;

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SearchByDestResponse {
    pub routes: Vec<Route>,
}
