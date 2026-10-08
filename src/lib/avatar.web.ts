import * as ImagePicker from 'expo-image-picker';

export type PhotoSource = 'library' | 'camera';
export type PickResult = { uri: string } | { error: string } | null;

/** On the web the picked photo is kept as a small data URI in browser storage. */
export async function pickAvatar(_source: PhotoSource): Promise<PickResult> {
  const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.5 });
  if (result.canceled || !result.assets[0]) return null;
  return { uri: result.assets[0].uri };
}

export function deleteAvatarFile() {}
