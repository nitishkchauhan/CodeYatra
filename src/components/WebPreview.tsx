import { View } from 'react-native';
import { WebView } from 'react-native-webview';

import { readPageMessage, type PageLog } from '@/lib/web/page';
import { colors } from '@/theme';

/** Renders a learner's page in an isolated WebView. */
export function WebPreview({ doc, height = 260, onLog }: { doc: string; height?: number; onLog?: (log: PageLog) => void }) {
  return (
    <View style={{ height, borderRadius: 12, overflow: 'hidden', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: colors.line }}>
      <WebView
        originWhitelist={['*']}
        source={{ html: doc }}
        javaScriptEnabled
        // Learner pages never navigate away or open other sites.
        onShouldStartLoadWithRequest={(req) => req.url === 'about:blank' || req.url.startsWith('data:')}
        setSupportMultipleWindows={false}
        onMessage={(e) => {
          const log = readPageMessage(e.nativeEvent.data);
          if (log) onLog?.(log);
        }}
        style={{ flex: 1 }}
      />
    </View>
  );
}
