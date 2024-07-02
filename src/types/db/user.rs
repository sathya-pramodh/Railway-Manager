use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct User {
    pub uid: u64,
    pub uname: String,
    pub phno: u64,
    pub email: String,
}

impl User {
    pub fn copy(&self) -> Self {
        Self {
            email: self.email.to_owned(),
            uname: self.uname.to_owned(),
            ..(*self)
        }
    }
}
