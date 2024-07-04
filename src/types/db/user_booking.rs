use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct UserBooking {
    pub uid: u64,
    pub tid: u64,
    pub source_sid: u64,
    pub dest_sid: u64,
    pub price: u64,
}
