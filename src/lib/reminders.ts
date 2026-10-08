import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const CHANNEL = 'streak';

const MESSAGES = [
  { title: 'Yatri is waiting for you', body: 'One short lesson keeps your streak alive.' },
  { title: 'Your streak is on the line', body: 'Five minutes of code today? Yatri packed snacks.' },
  { title: 'Your lesson is ready', body: 'Today’s lesson is ready. Let’s keep the yatra going!' },
];

if (Platform.OS !== 'web') {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
}

/**
 * Schedules (or clears) the daily streak reminder. Returns false when
 * notifications are unavailable or the learner declined permission.
 */
export async function syncReminder(reminder: { enabled: boolean; hour: number; minute: number }): Promise<boolean> {
  if (Platform.OS === 'web') return !reminder.enabled;
  await Notifications.cancelAllScheduledNotificationsAsync();
  if (!reminder.enabled) return true;

  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') return false;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(CHANNEL, {
      name: 'Daily streak reminder',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }
  const message = MESSAGES[new Date().getDate() % MESSAGES.length];
  await Notifications.scheduleNotificationAsync({
    content: message,
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: reminder.hour,
      minute: reminder.minute,
      channelId: CHANNEL,
    },
  });
  return true;
}
