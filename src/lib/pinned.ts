import { collection, doc, setDoc, WhereFilterOp } from "firebase/firestore";
import { db } from "./firebase";
import { useCollection, UseCollectionWhereFilter } from "./useFirebase";



export interface PinnedMessageData {
    chat_id: string;
    message_id: string;
    text: string;
    createdAt: Date;
    image?: string;
    file?: Object;
}

export const pinMessage = async(data: PinnedMessageData) => {
    const pinRef = collection(db, "pinned");
    await setDoc(doc(pinRef), {
        ...data
    });
}

export const useGroupedPins = (id: string) => {
    const where: UseCollectionWhereFilter = ['chat_id', '==', id]
    const {data: pins} = useCollection<PinnedMessageData>(
        "pinned",
        {where: where},
    )
    return {pins};
}