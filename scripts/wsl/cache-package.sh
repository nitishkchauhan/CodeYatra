#!/usr/bin/env bash
# Puts one npm package tarball into WSL's npm cache, downloaded over IPv4 (for when WSL's IPv6 is broken).
#   wsl -d Ubuntu -- bash scripts/wsl/cache-package.sh react-native-keyboard-controller 1.21.9
set -euo pipefail
export PATH="$HOME/tools/node/bin:$PATH"
NAME="$1"; VER="$2"; FILE="/tmp/$NAME-$VER.tgz"
curl -4 -sSfL --retry 3 -o "$FILE" "https://registry.npmjs.org/$NAME/-/$NAME-$VER.tgz"
npm cache add "$FILE"
echo "CACHED $NAME@$VER"
