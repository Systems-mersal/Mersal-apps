#!/usr/bin/env bash
# Launch the installed iOS app without Expo's System Events AppleScript check.
# Needed when Terminal/Cursor lacks Automation permission for System Events.
set -euo pipefail

BUNDLE_ID="${BUNDLE_ID:-com.anonymous.mersalcar}"
PORT="${PORT:-8081}"
DEVICE_NAME="${DEVICE_NAME:-iPhone 17 Pro}"

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

open -a Simulator
xcrun simctl bootstatus "$UDID" -b >/dev/null
xcrun simctl launch booted "$BUNDLE_ID" >/dev/null || true
xcrun simctl openurl booted "${BUNDLE_ID}://expo-development-client/?url=http%3A%2F%2Flocalhost%3A${PORT}"
echo "Opened $BUNDLE_ID on $DEVICE_NAME"
