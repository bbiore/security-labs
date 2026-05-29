#!/usr/bin/env bash
set -euo pipefail

: "${GOVEE_API_KEY:?Set GOVEE_API_KEY first}"
: "${GOVEE_DEVICE_ID:?Set GOVEE_DEVICE_ID first}"
: "${GOVEE_MODEL:=H6008}"

curl -s -X PUT \
  -H "Govee-API-Key: ${GOVEE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"device":"'"${GOVEE_DEVICE_ID}"'","model":"'"${GOVEE_MODEL}"'","cmd":{"name":"turn","value":"on"}}' \
  https://developer-api.govee.com/v1/devices/control | python3 -m json.tool
