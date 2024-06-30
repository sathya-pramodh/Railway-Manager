#!/bin/bash
curl -X POST -H "Content-Type: application/json" -d @json/search_by_dest.json http://localhost:8080/api/searchByDest
