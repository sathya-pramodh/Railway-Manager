use serde::Deserialize;

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Station {
    pub sid: u64,
    pub sname: String,
    pub location: String,
}
