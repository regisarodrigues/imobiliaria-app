import { collection, deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref as storageRef } from 'firebase/storage';
import { computed, ref } from 'vue';
import { useCollection, useFirebaseStorage, useFirestore } from 'vuefire';

export default function useImoveis() {
  const piscina = ref(false);

  const storage = useFirebaseStorage();
  const db = useFirestore();
  const imoveisCollection = useCollection(collection(db, 'imoveis'));

  async function deleteItem(id, urlImage) {
    if (confirm('Deseja deletar este imóvel?')) {
      const docRef = doc(db, 'imoveis', id);
      const imageRef = storageRef(storage, urlImage);

      await Promise.all([deleteDoc(docRef), deleteObject(imageRef)]);
    }
  }

  const imoveisFiltrado = computed(() => {
    return piscina.value
      ? imoveisCollection.value.filter((imovel) => imovel.piscina)
      : imoveisCollection.value;
  });

  return {
    piscina,
    imoveisCollection,
    imoveisFiltrado,
    deleteItem
  };
}
