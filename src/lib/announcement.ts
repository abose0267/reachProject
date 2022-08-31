import { collection, doc, setDoc, WhereFilterOp } from "firebase/firestore";
import { db } from "./firebase";
import { UserProfile } from "./schema";
import { useAuth } from "./useAuth";
import { useCollection, UseCollectionWhereFilter, useDoc } from "./useFirebase";
import { useAuthenticatedUser } from "./user";

export interface CreateAnnouncementData {
  message: string;
  creatorUID: string;
  createdAt: Date;
  title?: string;
  isAnnouncement?: boolean;
  users?: string[];
}

export const createAnnouncement = async (data: CreateAnnouncementData) => {
  const announcementRef = collection(db, "announcements");
  await setDoc(doc(announcementRef), {
    ...data,
  });
};

export const useAnnouncements = () => {
  const { user } = useAuthenticatedUser();
  const { data: announcements } =
    useCollection<CreateAnnouncementData>("announcements");
  return { announcements };
};

export const useBlasts = () => {
  const { user } = useAuthenticatedUser();
  const uid = user?.uid;
  const where: UseCollectionWhereFilter = ["users", "array-contains", 'ETeqDgVbcSgIPWOrEt73ISQNhhI2'];
  console.log("where", where);
  const { data: blasts } = useCollection<CreateAnnouncementData>(
    "announcements",
    {where: where}
  );
  return { blasts };
};
