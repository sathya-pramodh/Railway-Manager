use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Train {
    pub tid: u64,
    pub source_sid: u64,
    pub dest_sid: u64,
    pub capacity: u64,
    pub dtime: String,
}
