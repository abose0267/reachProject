import { collection, deleteDoc, doc, setDoc, WhereFilterOp } from "firebase/firestore";
import { db } from "./firebase";
import { useCollection, UseCollectionWhereFilter } from "./useFirebase";



export interface PinnedMessageData {
    chat_id: string;
    message_id: string;
    document_id?: string;
    text: string;
    createdAt: Date;
    image?: string;
    file?: Object;
}

export const pinMessage = async(data: PinnedMessageData) => {
    const docname = Math.random().toString(36).substring(7);
    await setDoc(doc(db, "pinned", docname), {
        ...data,
        document_id: docname,
    });
}

export const unpinMessage = async(id: string) => {
    await deleteDoc(doc(db, "pinned", id));
}

export const useGroupedPins = (id: string) => {
    const where: UseCollectionWhereFilter = ['chat_id', '==', id]
    const {data: pins} = useCollection<PinnedMessageData>(
        "pinned",
        {where: where},
    )
    return {pins};
}