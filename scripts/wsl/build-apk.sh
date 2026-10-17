#!/usr/bin/env bash
# Builds a test APK of CodeYatra inside WSL (free, no EAS quota). Signed with the debug key: fine for testing on a phone.
# Takes 10-30 minutes; start it detached so it is not cut off:
#   wsl -d Ubuntu -- bash -lc "setsid nohup bash /mnt/c/Users/Lenovo/Desktop/CodeY/codeyatra-app/scripts/wsl/build-apk.sh > ~/build-apk.log 2>&1 < /dev/null &"
# The APK lands in C:\Users\Lenovo\Desktop\CodeY\builds.
set -euo pipefail
export JAVA_HOME="$HOME/tools/jdk17"
export ANDROID_HOME="$HOME/tools/android-sdk"
export PATH="$JAVA_HOME/bin:$HOME/tools/node/bin:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH"
SRC="/mnt/c/Users/Lenovo/Desktop/CodeY/codeyatra-app"
APP="$HOME/build/codeyatra-app"
OUT="/mnt/c/Users/Lenovo/Desktop/CodeY/builds"

echo "== Copy project (without node_modules, native folders or secrets)"
mkdir -p "$APP" "$OUT"
rsync_like() {
  # rsync is not installed; tar keeps it simple and fast enough.
  (cd "$SRC" && tar --exclude=./node_modules --exclude=./.git --exclude=./android --exclude=./ios --exclude=./.expo --exclude=./dist \
    --exclude=./google-play-service-account.json -cf - .) | (cd "$APP" && tar -xf -)
}
rm -rf "$APP/src" "$APP/assets"
rsync_like

cd "$APP"
echo "== Install packages"
npm ci --no-audit --no-fund --loglevel=error

echo "== Generate the Android project"
CI=1 npx expo prebuild --platform android --clean --no-install

# Keep Gradle within WSL's memory.
# WSL has about 7 GB: build arm64 only (almost every phone), 4 workers and a 2 GB heap, or WSL crashes.
P=android/gradle.properties
set_prop() { if grep -q "^$1=" "$P"; then sed -i "s|^$1=.*|$1=$2|" "$P"; else printf '
%s=%s
' "$1" "$2" >> "$P"; fi; }
set_prop reactNativeArchitectures arm64-v8a
set_prop org.gradle.workers.max 4
set_prop org.gradle.jvmargs "-Xmx2g -XX:MaxMetaspaceSize=768m"

echo "== Build the release APK"
cd android
./gradlew assembleRelease --no-daemon --console=plain > "$HOME/assemble.log" 2>&1 || { grep -A8 "What went wrong" "$HOME/assemble.log"; exit 1; }
APK=$(ls -1 app/build/outputs/apk/release/*.apk | head -1)
V=$(node -p "require('../app.json').expo.version")
cp "$APK" "$OUT/CodeYatra-$V-test.apk"
ls -la "$OUT"
echo "BUILD DONE"
