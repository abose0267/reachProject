import { collection, doc, setDoc, WhereFilterOp } from "firebase/firestore";
import { db } from "./firebase";
import { UserProfile } from "./schema";
import { useAuth } from "./useAuth";
import { useCollection, UseCollectionWhereFilter, useDoc } from "./useFirebase";
import { useAuthenticatedUser } from "./user";


export interface UpcomingEventData {
    event_id: string;
    name: string;
    description: string;
    date: Date;
    program_id?: string;
}


export const createEvent = async (data: UpcomingEventData) => {
    const event_id = Math.random().toString(36).substring(2, 15);
    await setDoc(doc(db, "events", data.event_id), {
        ...data,
        event_id,
    });
}

export const updateEvent = async (data: UpcomingEventData) => {
    await setDoc(doc(db, "events", data.event_id), {
        ...data,
    });
}
