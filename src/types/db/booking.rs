use serde::Deserialize;

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Booking {
    pub bid: u64,
    pub uid: u64,
    pub tid: u64,
    pub source_sid: u64,
    pub dest_sid: u64,
    pub price: u64,
    pub btime: String,
}
