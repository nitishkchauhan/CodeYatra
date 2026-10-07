import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

let enabled = true;

/** Set from the user's settings by ProgressProvider. */
export function setHapticsEnabled(on: boolean) {
  enabled = on;
}

const canVibrate = () => enabled && Platform.OS !== 'web';

export const haptic = {
  tap() {
    if (canVibrate()) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  },
  success() {
    if (canVibrate()) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
  },
  error() {
    if (canVibrate()) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
  },
};
