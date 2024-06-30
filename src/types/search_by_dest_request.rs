use serde::Deserialize;

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SearchByDestRequest {
    pub source_station: String,
    pub destination_station: String,
}
