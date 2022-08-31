import {useEffect, useState} from 'react';
import * as fb from 'firebase/firestore';
import {db} from './firebase';
import { UpdateData } from 'firebase/firestore';


export type UseCollectionWhereFilter = [string, fb.WhereFilterOp, any];
interface UseCollectionConfigOptions {
  subscribe?: boolean;
  where?: UseCollectionWhereFilter;
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
    let q;
    
    if(options) {
      alert('options'+ options[0] +" "+options[1]+" "+options[2]);
      q = fb.query(fb.collection(db, collectionName), fb.where(options[0], options[1], options[2]));
    } else {
      q = fb.collection(db, collectionName);
    }
    // const q = fb.collection(db, collectionName);

    const unsub = fb.onSnapshot(
      q,
      snap => {
        const data = snap.docs.map(doc => doc.data());
        setError(null);
        setData(data as unknown as T[]);
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

  const docRef = (
    docId ? fb.doc(db, collectionName, docId) : fb.doc(db, collectionName)
  ) as fb.DocumentReference<T>;

  const fetchDoc = async () => {
    const snap = await fb.getDoc(docRef);
    const data = snap.data();
    return data;
  };

  const updateDoc = (data: UpdateData<T>) => {
    fb.updateDoc(docRef, data);
  }

  useEffect(() => {
    fetchDoc()
      .then(data => {
        setError(null);
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        console.error(err);
        setLoading(false);
      });
  }, [collectionName]);

  return {data, error, loading, updateDoc};
};
