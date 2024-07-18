use serde::Deserialize;

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RemoveBookingRequest {
    pub bid: u64,
}
