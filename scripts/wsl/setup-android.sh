#!/usr/bin/env bash
# One-time setup of the Android build tools inside WSL Ubuntu, all in ~/tools (no sudo needed).
# Run from Windows:  wsl -d Ubuntu -- bash /mnt/c/Users/Lenovo/Desktop/CodeY/codeyatra-app/scripts/wsl/setup-android.sh
set -euo pipefail
T="$HOME/tools"
mkdir -p "$T"
cd "$T"

# Java 17 (Eclipse Temurin), the version Android's Gradle plugin needs.
if [ ! -x "$T/jdk17/bin/java" ]; then
  echo "== Java 17"
  curl -fL --retry 3 -o jdk17.tar.gz "https://api.adoptium.net/v3/binary/latest/17/ga/linux/x64/jdk/hotspot/normal/eclipse"
  mkdir -p jdk17 && tar -xzf jdk17.tar.gz -C jdk17 --strip-components=1 && rm jdk17.tar.gz
fi

# Node.js 22 (same major version as on Windows).
if [ ! -x "$T/node/bin/node" ]; then
  echo "== Node 22"
  V=$(curl -fsS https://nodejs.org/dist/index.json | python3 -c "import json,sys; print(next(r['version'] for r in json.load(sys.stdin) if r['version'].startswith('v22.')))")
  curl -fL --retry 3 -o node.tar.xz "https://nodejs.org/dist/$V/node-$V-linux-x64.tar.xz"
  mkdir -p node && tar -xJf node.tar.xz -C node --strip-components=1 && rm node.tar.xz
fi

# Android SDK command-line tools.
export ANDROID_HOME="$T/android-sdk"
if [ ! -x "$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager" ]; then
  echo "== Android command-line tools"
  curl -fL --retry 3 -o cmdtools.zip "https://dl.google.com/android/repository/commandlinetools-linux-13114758_latest.zip"
  mkdir -p "$ANDROID_HOME/cmdline-tools"
  python3 -m zipfile -e cmdtools.zip "$ANDROID_HOME/cmdline-tools/" && rm cmdtools.zip
  mv "$ANDROID_HOME/cmdline-tools/cmdline-tools" "$ANDROID_HOME/cmdline-tools/latest"
  chmod +x "$ANDROID_HOME/cmdline-tools/latest/bin/"*
fi

export JAVA_HOME="$T/jdk17"
export PATH="$JAVA_HOME/bin:$T/node/bin:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH"
echo "== Android SDK packages"
# yes exits early once sdkmanager stops reading, so ignore its pipe error.
(yes | sdkmanager --licenses > /dev/null) || true
sdkmanager "platform-tools" "platforms;android-36" "build-tools;36.0.0"

# Make the tools available in every new shell.
if ! grep -q "codeyatra build tools" "$HOME/.bashrc"; then
  cat >> "$HOME/.bashrc" <<'RC'
# codeyatra build tools
export JAVA_HOME="$HOME/tools/jdk17"
export ANDROID_HOME="$HOME/tools/android-sdk"
export PATH="$JAVA_HOME/bin:$HOME/tools/node/bin:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH"
RC
fi
java -version 2>&1 | head -1
node -v
echo "SETUP DONE"
