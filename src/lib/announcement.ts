import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { UserProfile } from './schema';
import { useAuth } from './useAuth';
import { useCollection, useDoc } from './useFirebase';

export interface CreateAnnouncementData {
    message: string;
    creatorUID: string;
    createdAt: Date;
}

export const createAnnouncement = async(data: CreateAnnouncementData) => {
    const announcementRef = collection(db, 'announcements');
    await setDoc(doc(announcementRef), {
        ...data,
    });
}

export const useAnnouncements = () => {
    const {data: announcements} = useCollection<CreateAnnouncementData>('announcements');
    return {announcements};
}