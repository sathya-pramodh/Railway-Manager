#!/bin/bash
curl -X POST -H "Content-Type: application/json" -d @json/get_history.json http://localhost:8080/api/getHistory
