#!/bin/bash
curl -X POST -H "Content-Type: application/json" -d @json/add_booking.json http://localhost:8080/api/addBooking
