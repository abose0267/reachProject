import React, { useState, useEffect, useContext, createContext, useCallback } from "react";
import { collection, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db, firebase, Message, MessageGroup, useAuth, useAuthenticatedUser, UserProfile } from "@app/lib"
import { useCollection, useDoc } from "@app/lib/useFirebase";

export interface ProgramChat {
    program_id: string;
    name: string;
    pfp: string;
    joinCode: number;
    qrCode: string;
}

export const createProgramChat = async (data: ProgramChat) => {
    await setDoc(doc(db, "programs", data.program_id), {
        ...data,
    });
}

export const addMember = async(data: UserProfile, program: ProgramChat) => {
    const programRef = collection(db, "programs", program.program_id, "members");
    await setDoc(doc(programRef, data.uid), {
        ...data,
    });
    const userRef = collection(db, `users/${data.uid}/groups`);
    await setDoc(doc(userRef, program.program_id), {
        ...program,
    });
}

export const removeMember = async(data: UserProfile, program: ProgramChat) => {
    const programRef = collection(db, "programs", program.program_id, "members", data.uid);
    await deleteDoc(doc(programRef));
}


export const useProgramChatGroup = (groupId?: string) => {
    const { data: group } = useDoc<ProgramChat>('programs', groupId);
    const { data: messages, addDoc: addMessage } = useCollection<Message>(`programs/${groupId}/messages`);
    const { user } = useAuthenticatedUser();
    const sendMessage = useCallback(async (message: Message) => {
        await addMessage(message);
    }, [user])

    // @ts-ignore
    return { group, messages: messages.map(m => ({...m, createdAt: m.createdAt.toDate()})), sendMessage };
}
