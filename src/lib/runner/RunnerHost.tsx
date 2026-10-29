import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

import { RUNNER_HTML } from './host';
import type { HostProps } from './types';

/**
 * Hidden WebView that hosts the code sandbox on Android and iOS. It is mounted next to the whole app, so it must
 * never take layout space: on Android the WebView sits inside its own container (flex: 1 by default), which would
 * otherwise split the screen in half. The wrapper and the container are both taken out of the layout.
 */
export function RunnerHost({ onMessage, registerPost }: HostProps) {
  const ref = useRef<WebView>(null);
  return (
    <View style={styles.hidden} pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <WebView
        ref={(view) => {
          ref.current = view;
          registerPost((msg) => view?.injectJavaScript(`window.__run(${JSON.stringify(msg)});true;`));
        }}
        source={{ html: RUNNER_HTML, baseUrl: 'https://codeyatra.app/' }}
        originWhitelist={['*']}
        javaScriptEnabled
        onMessage={(e) => onMessage(JSON.parse(e.nativeEvent.data))}
        containerStyle={styles.box}
        style={styles.box}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  hidden: { position: 'absolute', width: 1, height: 1, opacity: 0, left: -10, top: -10, overflow: 'hidden' },
  box: { width: 1, height: 1, flex: 0 },
});
