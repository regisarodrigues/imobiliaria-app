import { ref as storageRef } from 'firebase/storage';
import { uid } from 'uid';
import { computed } from 'vue';
import { useFirebaseStorage, useStorageFile } from 'vuefire';

export default function useImage() {
  const storage = useFirebaseStorage();
  const storageRefPath = storageRef(storage, `imovies/${uid()}.jpg`);
  const { url, upload } = useStorageFile(storageRefPath);

  function uploadImage(e) {
    const data = e.target.files[0];
    if (data) {
      upload(data);
    }
  }
  const image = computed(() => {
    return url.value ? url.value : null;
  });

  return {
    url,
    uploadImage,
    image
  };
}
