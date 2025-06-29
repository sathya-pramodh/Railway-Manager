#!/bin/bash
curl -X POST -H "Content-Type: application/json" -d @json/remove_booking.json http://localhost:8081/api/removeBooking
