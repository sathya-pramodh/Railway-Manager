use serde::Deserialize;

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SearchByDestRequest {
    pub source_destination: String,
    pub final_destination: String,
}
