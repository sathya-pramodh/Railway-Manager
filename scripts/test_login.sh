#!/bin/bash
curl -X POST -H "Content-Type: application/json" -d @json/login.json http://localhost:8080/api/login
