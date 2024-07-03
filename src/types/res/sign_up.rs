use serde::{Deserialize, Serialize};

use crate::types::db::user::User;

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SignUpResponse {
    pub user: User,
}