import { createContext, useContext, useRef, useState, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Glyph } from './Icon';
import { T } from './Text';
import { colors } from '@/theme';

const ToastContext = createContext<(message: string) => void>(() => {});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const insets = useSafeAreaInsets();

  const show = (message: string) => {
    if (timer.current) clearTimeout(timer.current);
    setToast({ id: Date.now(), message });
    timer.current = setTimeout(() => setToast(null), 2600);
  };

  return (
    <ToastContext.Provider value={show}>
      {children}
      <View pointerEvents="none" style={[styles.host, { top: insets.top + 10 }]}>
        {toast && (
          <Animated.View
            key={toast.id}
            entering={FadeInUp.springify().damping(18)}
            exiting={FadeOutUp.duration(180)}
            accessibilityRole="alert"
            accessibilityLiveRegion="polite"
            style={styles.toast}>
            <Glyph name="flame" size={16} color={colors.saffron} />
            <T variant="labelSm" color="#FFFFFF" style={{ fontSize: 13 }}>
              {toast.message}
            </T>
          </Animated.View>
        )}
      </View>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);

const styles = StyleSheet.create({
  host: { position: 'absolute', left: 16, right: 16, alignItems: 'center' },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 14,
    backgroundColor: colors.ink,
    boxShadow: '0 10px 30px rgba(22,20,43,0.3)',
    maxWidth: 340,
  },
});
