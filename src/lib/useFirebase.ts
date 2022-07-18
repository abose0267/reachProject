import {useEffect, useState} from 'react';
import * as fb from 'firebase/firestore';
import {db} from './firebase';

interface UseCollectionConfigOptions {
  subscribe?: boolean;
}

export const useCollection = <T>(
  collectionName: string,
  options?: UseCollectionConfigOptions,
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const collectionRef = fb.collection(
    db,
    collectionName,
  ) as fb.CollectionReference<T>;

  useEffect(() => {
    const unsub = fb.onSnapshot(
      collectionRef,
      snap => {
        const data = snap.docs.map(doc => doc.data());
        setError(null);
        setData(data);
        setLoading(false);
      },
      error => {
        setError(error);
        setLoading(false);
      },
    );

    // fb.getDocs(collectionRef)
    //   .then(snap => snap.docs.map(d => d.data()))
    //   .then(data => {
    //     setError(null);
    //     setData(data);
    //     setLoading(false);
    //   })
    //   .catch(err => {
    //     setLoading(false);
    //     setError(err);
    //     console.error(err);
    //   });
    return unsub;
  }, [collectionName]);

  const addDoc = async (doc: T) => fb.addDoc(collectionRef, doc);

  return {data, error, loading, addDoc};
};

export const useDoc = <T>(collectionName: string, docId?: string) => {
  const [data, setData] = useState<T>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDoc = async () => {
    const docRef = (
      docId ? fb.doc(db, collectionName, docId) : fb.doc(db, collectionName)
    ) as fb.DocumentReference<T>;
    const snap = await fb.getDoc(docRef);
    const data = snap.data();
    return data;
  };

  // const unsub = onSnapshot(doc(db, 'cities', 'SF'), doc => {
  //   console.log('Current data: ', doc.data());
  // });

  useEffect(() => {
    fetchDoc()
      .then(data => {
        setError(null);
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [collectionName]);

  return {data, error, loading};
};
