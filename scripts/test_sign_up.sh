#!/bin/bash
curl -X POST -H "Content-Type: application/json" -d @json/sign_up.json http://localhost:8080/api/signUp
