use serde::Deserialize;

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct User {
    pub uid: u64,
    pub uname: String,
    pub phno: u64,
    pub email: String,
}
