#!/bin/bash
curl -X POST -H "Content-Type: application/json" -d @json/search_by_price.json http://localhost:8081/api/searchByPrice
