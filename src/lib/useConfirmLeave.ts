import { useNavigation } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Alert, Platform } from 'react-native';

/**
 * Asks before leaving a screen while `active` (close button, Android Back or a swipe),
 * so unfinished work isn't lost by accident. Call `allow()` right before an intended exit.
 */
export function useConfirmLeave(active: boolean, title: string, message: string) {
  const navigation = useNavigation();
  const allowed = useRef(false);

  useEffect(() => {
    return navigation.addListener('beforeRemove', (e) => {
      if (!active || allowed.current) return;
      e.preventDefault();
      const leave = () => {
        allowed.current = true;
        navigation.dispatch(e.data.action);
      };
      if (Platform.OS === 'web') {
        if (window.confirm(`${title}\n\n${message}`)) leave();
        return;
      }
      Alert.alert(title, message, [
        { text: 'Stay', style: 'cancel' },
        { text: 'Leave', style: 'destructive', onPress: leave },
      ]);
    });
  }, [navigation, active, title, message]);

  return {
    allow: () => {
      allowed.current = true;
    },
  };
}
