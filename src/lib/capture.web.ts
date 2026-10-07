import type { RefObject } from 'react';
import type { View } from 'react-native';

/** Sharing images is an app feature; the web build skips it. */
export const captureView = async (_ref: RefObject<View | null>): Promise<string | null> => null;
