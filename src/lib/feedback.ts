// "Send feedback" opens the learner's email app with the details we need to help.
import Constants from 'expo-constants';
import { Linking, Platform } from 'react-native';

export const SUPPORT_EMAIL = 'codeyatra.support@gmail.com';
export const APP_VERSION = Constants.expoConfig?.version ?? 'dev';

/** A mailto link with the app version, phone OS and what the feedback is about. No personal data. */
export function feedbackUrl(about?: string) {
  const subject = about ? `CodeYatra feedback: ${about}` : 'CodeYatra feedback';
  const details = [`App ${APP_VERSION}`, `${Platform.OS} ${Platform.Version}`, about].filter(Boolean).join(' · ');
  const body = `\n\n\n---\nWrite above this line. These details help us find the problem:\n${details}`;
  return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Opens the email app. Returns false when the phone has no email app, so the caller can show the address. */
export async function sendFeedback(about?: string): Promise<boolean> {
  try {
    await Linking.openURL(feedbackUrl(about));
    return true;
  } catch {
    return false;
  }
}
