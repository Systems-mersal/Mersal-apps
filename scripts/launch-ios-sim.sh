#!/usr/bin/env bash
# Launch the installed iOS app without Expo's System Events AppleScript check.
# Needed when Terminal/Cursor lacks Automation permission for System Events.
set -euo pipefail

BUNDLE_ID="${BUNDLE_ID:-com.anonymous.mersalcar}"
PORT="${PORT:-8081}"
DEVICE_NAME="${DEVICE_NAME:-iPhone 17 Pro}"
APP_PATH="${APP_PATH:-$HOME/Library/Developer/Xcode/DerivedData/mersalcar-bobqeuxmvpjftqgnhgqzigqasazg/Build/Products/Debug-iphonesimulator/mersalcar.app}"

UDID="$(
  xcrun simctl list devices available |
    grep "$DEVICE_NAME" |
    grep -Eo '\([A-F0-9-]{36}\)' |
    head -1 |
    tr -d '()'
)"

if [[ -z "${UDID}" ]]; then
  echo "Could not find simulator: $DEVICE_NAME"
  exit 1
fi

# Prefer Simulator.app; fall back to DeviceHub (Xcode 27+)
if [[ -d "/Applications/Xcode.app/Contents/Developer/Applications/Simulator.app" ]]; then
  open -a Simulator --args -CurrentDeviceUDID "$UDID"
elif [[ -d "/Applications/Xcode.app/Contents/Applications/DeviceHub.app" ]]; then
  open -a DeviceHub
else
  open -a Simulator || open -a DeviceHub || true
fi

xcrun simctl boot "$UDID" 2>/dev/null || true
xcrun simctl bootstatus "$UDID" -b >/dev/null

if [[ -d "$APP_PATH" ]]; then
  xcrun simctl install "$UDID" "$APP_PATH" >/dev/null
fi

xcrun simctl terminate "$UDID" "$BUNDLE_ID" 2>/dev/null || true
xcrun simctl launch "$UDID" "$BUNDLE_ID" >/dev/null

# Prefer LAN IP so the sim can reach Metro when not on localhost-only
LAN_IP="$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || true)"
if [[ -n "${LAN_IP}" ]]; then
  METRO_URL="http://${LAN_IP}:${PORT}"
else
  METRO_URL="http://localhost:${PORT}"
fi

ENCODED_URL="$(python3 -c "import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1], safe=''))" "$METRO_URL")"
xcrun simctl openurl "$UDID" "${BUNDLE_ID}://expo-development-client/?url=${ENCODED_URL}"

echo "Opened $BUNDLE_ID on $DEVICE_NAME → $METRO_URL"
