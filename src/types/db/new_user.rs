use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct NewUser {
    pub uname: String,
    pub phno: u64,
    pub email: String,
}
