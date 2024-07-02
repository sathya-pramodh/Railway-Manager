use serde::Deserialize;

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Passwords {
    pub uid: u64,
    pub password_hash: String,
}
