use serde::{Deserialize, Serialize};

use crate::types::db::booking::Booking;

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct GetHistoryResponse {
    pub bookings: Vec<Booking>,
}
