// Native animation libraries have no native side under Jest; use their official mocks.
jest.mock('react-native-worklets', () => require('react-native-worklets/src/mock'));
// The official mock lacks useReducedMotion (used by Yatri); tests run with motion on.
jest.mock('react-native-reanimated', () => ({ ...require('react-native-reanimated/mock'), useReducedMotion: () => false }));
jest.mock('react-native-safe-area-context', () => require('react-native-safe-area-context/jest/mock').default);
jest.mock('@react-native-async-storage/async-storage', () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'));
