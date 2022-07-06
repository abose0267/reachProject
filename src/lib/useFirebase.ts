import { useEffect, useState } from "react";
import { collection, CollectionReference, getDocs } from "firebase/firestore";
import { db } from "./firebase";

interface UseCollectionConfigOptions {
  subscribe?: boolean;
}

export const useCollection = <T>(collectionName: string, options?: UseCollectionConfigOptions) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const collectionRef = collection(db, collectionName) as CollectionReference<T>;

  useEffect(() => {
    getDocs(collectionRef)
      .then(snap => snap.docs.map(d => d.data()))
      .then(data => { 
        setError(null); 
        setData(data)
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setError(err);
      });
  }, [collectionName])

  return { data, error, loading };
}