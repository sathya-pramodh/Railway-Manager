use serde::Deserialize;

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SearchByDestRequest {
    pub source_station: String,
    pub destionation_station: String,
}
