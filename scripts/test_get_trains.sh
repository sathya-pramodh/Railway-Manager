#!/bin/bash
curl -X POST -H "Content-Type: application/json" -d @json/get_trains.json http://localhost:8080/api/getTrains