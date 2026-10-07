import type { RefObject } from 'react';
import type { View } from 'react-native';
import { captureRef } from 'react-native-view-shot';

/** PNG snapshot of a view, for sharing. */
export const captureView = (ref: RefObject<View | null>) => captureRef(ref, { format: 'png', quality: 1 });
