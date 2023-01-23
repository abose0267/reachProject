import { collection, doc, setDoc, WhereFilterOp } from "firebase/firestore";
import { db } from "./firebase";
import { UserProfile } from "./schema";
import { useAuth } from "./useAuth";
import { useCollection, UseCollectionWhereFilter, useDoc } from "./useFirebase";
import { useAuthenticatedUser } from "./user";


export interface UpcomingEventData {
    event_id: string;
    name: string;
    date: Date;
    program_id?: string;
}

