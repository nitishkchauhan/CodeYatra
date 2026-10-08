import { Directory, File, Paths } from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

export type PhotoSource = 'library' | 'camera';
export type PickResult = { uri: string } | { error: string } | null;

const OPTIONS: ImagePicker.ImagePickerOptions = { mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.6 };

/**
 * Lets the learner choose or take a square photo and keeps a copy in the app's own folder,
 * so it survives the picker's cache being cleared. Returns null if they cancel.
 */
export async function pickAvatar(source: PhotoSource): Promise<PickResult> {
  const permission = source === 'camera' ? await ImagePicker.requestCameraPermissionsAsync() : await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) return { error: source === 'camera' ? 'Allow camera access to take a photo' : 'Allow photo access to choose a picture' };

  const result = source === 'camera' ? await ImagePicker.launchCameraAsync(OPTIONS) : await ImagePicker.launchImageLibraryAsync(OPTIONS);
  if (result.canceled || !result.assets[0]) return null;

  const dir = new Directory(Paths.document, 'avatar');
  if (dir.exists) dir.delete();
  dir.create();
  const saved = new File(dir, `photo-${Date.now()}.jpg`);
  new File(result.assets[0].uri).copy(saved);
  return { uri: saved.uri };
}

export function deleteAvatarFile() {
  const dir = new Directory(Paths.document, 'avatar');
  if (dir.exists) dir.delete();
}
