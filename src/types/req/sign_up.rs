use serde::Deserialize;

use crate::types::db::new_user::NewUser;

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SignUpRequest {
    pub user: NewUser,
    pub password: String,
}
