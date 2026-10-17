#!/usr/bin/env bash
# Builds the Google Play bundle (.aab) inside WSL with `eas build --local`: free, uses the app's upload key from
# EAS and bumps the remote versionCode like a cloud build. Needs a one-time `npx eas-cli login` inside Ubuntu.
# Profile production-local (eas.json) builds the two ARM CPU types with 2 Gradle workers to fit WSL's memory.
# Run attached (Ubuntu stops idle sessions):  wsl -d Ubuntu -- bash /mnt/c/Users/Lenovo/Desktop/CodeY/codeyatra-app/scripts/wsl/build-aab.sh
set -euo pipefail
export JAVA_HOME="$HOME/tools/jdk17"
export ANDROID_HOME="$HOME/tools/android-sdk"
export PATH="$JAVA_HOME/bin:$HOME/tools/node/bin:$ANDROID_HOME/platform-tools:$PATH"
SRC="/mnt/c/Users/Lenovo/Desktop/CodeY/codeyatra-app"
APP="$HOME/build/codeyatra-app"
OUT="/mnt/c/Users/Lenovo/Desktop/CodeY/builds"
mkdir -p "$OUT"
# Everything also goes to builds/aab-build.log, so progress can be followed from Windows.
exec > >(tee "$OUT/aab-build.log") 2>&1
trap 'echo "AAB FAILED (line $LINENO)"' ERR

echo "== Copy project (without node_modules, native folders or secrets)"
mkdir -p "$APP" "$OUT"
rm -rf "$APP/src" "$APP/assets" "$APP/android" "$APP/ios"
(cd "$SRC" && tar --exclude=./node_modules --exclude=./.git --exclude=./android --exclude=./ios --exclude=./.expo --exclude=./dist \
  --exclude=./google-play-service-account.json -cf - .) | (cd "$APP" && tar -xf -)

cd "$APP"
V=$(node -p "require('./app.json').expo.version")
echo "== Build the Play bundle (version $V)"
# /tmp in Ubuntu 26.04 is a small RAM disk (2.5 GB); the build needs more, so work on the real disk.
export EAS_LOCAL_BUILD_WORKINGDIR="$HOME/eas-build-work"
rm -rf "$EAS_LOCAL_BUILD_WORKINGDIR" && mkdir -p "$EAS_LOCAL_BUILD_WORKINGDIR"
EAS_NO_VCS=1 npx -y eas-cli@latest build --local --platform android --profile production-local --non-interactive \
  --output "$OUT/CodeYatra-$V.aab"
ls -la "$OUT"
echo "AAB DONE"
