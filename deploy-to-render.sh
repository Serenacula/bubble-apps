#!/bin/bash

echo "Sending deploy request"
echo
# Check cURL command if available (required), abort if does not exists
type curl >/dev/null 2>&1 || { echo >&2 "Required curl but it's not installed. Aborting."; exit 1; }
echo

curl "https://api.render.com/deploy/srv-cf6upupa6gdjkk5ev9fg?key=6DhxmJDHCoE"