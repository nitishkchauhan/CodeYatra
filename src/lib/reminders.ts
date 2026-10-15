import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const CHANNEL = 'streak';

/** Who the reminder is for, so it can speak to them: name, daily minutes and career path. */
export type ReminderContext = { name?: string; minutes?: number; pathTitle?: string | null };

/** The reminder text for a learner, varied by day of the month. */
export function reminderMessage({ name, minutes, pathTitle }: ReminderContext = {}, day = new Date().getDate()) {
  const who = name?.trim() ? `${name.trim()}, ` : '';
  const time = minutes ? `${minutes} minutes` : 'Five minutes';
  const options = [
    { title: `${who}Yatri is waiting for you`, body: `${time} of code today keeps your streak alive.` },
    { title: 'Your streak is on the line', body: pathTitle ? `One lesson closer to becoming a ${pathTitle}.` : 'One short lesson keeps the yatra going.' },
    { title: `${who}your lesson is ready`, body: `${time} today. Let’s keep the yatra going!` },
  ];
  return options[day % options.length];
}

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
export async function syncReminder(reminder: { enabled: boolean; hour: number; minute: number }, context?: ReminderContext): Promise<boolean> {
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
  const message = reminderMessage(context);
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
