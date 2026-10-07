import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

import { RUNNER_HTML } from './host';
import type { HostProps } from './types';

/** Hidden WebView that hosts the code sandbox on Android and iOS. */
export function RunnerHost({ onMessage, registerPost }: HostProps) {
  const ref = useRef<WebView>(null);
  return (
    <WebView
      ref={(view) => {
        ref.current = view;
        registerPost((msg) => view?.injectJavaScript(`window.__run(${JSON.stringify(msg)});true;`));
      }}
      source={{ html: RUNNER_HTML, baseUrl: 'https://codeyatra.app/' }}
      originWhitelist={['*']}
      javaScriptEnabled
      onMessage={(e) => onMessage(JSON.parse(e.nativeEvent.data))}
      style={styles.hidden}
      pointerEvents="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    />
  );
}

const styles = StyleSheet.create({
  hidden: { position: 'absolute', width: 1, height: 1, opacity: 0, left: -10, top: -10 },
});
