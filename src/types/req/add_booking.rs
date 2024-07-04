use serde::Deserialize;

use crate::types::db::user_booking::UserBooking;

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AddBookingRequest {
    pub booking: UserBooking,
}
