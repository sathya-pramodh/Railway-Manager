#!/bin/bash
curl -X POST -H "Content-Type: application/json" -d @json/logout_6.json http://localhost:8081/api/logout
curl -X POST -H "Content-Type: application/json" -d @json/logout_2.json http://localhost:8081/api/logout
