import { describe, expect, it, jest } from '@jest/globals';
import { render } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';

import { RunnerHost } from '../runner/RunnerHost';

jest.mock('react-native-webview', () => {
  const { View } = jest.requireActual<typeof import('react-native')>('react-native');
  return { WebView: (props: object) => <View testID="webview" {...props} /> };
});

describe('the hidden code sandbox', () => {
  it('never takes layout space (it once split every screen in half on Android)', async () => {
    const { toJSON, getByTestId } = await render(<RunnerHost onMessage={() => {}} registerPost={() => {}} />);
    const root = toJSON() as unknown as { props: { style: object } };
    const outer = StyleSheet.flatten(root.props.style) as { position?: string; width?: number; height?: number };
    expect(outer.position).toBe('absolute');
    expect(outer.width).toBe(1);
    expect(outer.height).toBe(1);
    // react-native-webview wraps the page in a container that is flex: 1 unless containerStyle says otherwise.
    const container = StyleSheet.flatten(getByTestId('webview', { includeHiddenElements: true }).props.containerStyle) as { flex?: number; height?: number };
    expect(container.flex).toBe(0);
    expect(container.height).toBe(1);
  });
});
