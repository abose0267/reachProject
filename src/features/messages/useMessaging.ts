import { db, firebase, Message, MessageGroup, useAuth, useAuthenticatedUser, UserProfile } from "@app/lib"
import { useCollection, useDoc } from "@app/lib/useFirebase";
import { getDoc, doc, setDoc, updateDoc, FieldValue, collection, addDoc } from "firebase/firestore";
import { useCallback, useState } from "react";

export const computeMessageGroupId = (members: Pick<UserProfile, 'uid'>[]) => 
  members
    .map(member => member.uid)
    .sort()
    .join('');

// gets the message group based on list of uids, if one doesn't exist, create a new one.
export const getMessageGroup = async (members: Pick<UserProfile, 'uid'>[]) => {
    const messageGroupId = computeMessageGroupId(members);
    const ref = doc(db, 'messageGroups', messageGroupId);
    const snap =  await getDoc(ref);
    const data = snap.data();

    if (data) return messageGroupId;

    const memberRefs = members.map(member => doc(db, 'users', member.uid));
    const memberSnaps = await Promise.all(memberRefs.map(getDoc<UserProfile>));
    const memberData = memberSnaps.map(snap => snap.data());

    const groupData: MessageGroup = {
        name: memberData.map(member => member.firstname).join(', '),
        members: memberData,
    }

    await setDoc(ref, groupData);

    await Promise.all(members.map(member => {
        const memberGroupsRef = doc(db, 'users', member.uid, 'groups', messageGroupId);
        setDoc(memberGroupsRef, groupData);
    }));

    return messageGroupId;
}
    
export const useMessageGroup = (groupId?: string) => {
    const { data: group } = useDoc<MessageGroup>('messageGroups', groupId);
    const { data: messages, addDoc: addMessage } = useCollection<Message>(`messageGroups/${groupId}/messages`);
    const { user } = useAuthenticatedUser();

    const sendMessage = useCallback(async (message: Message) => {
        await addMessage(message);
    }, [user])

    return { group, messages: messages.map(m => ({...m, createdAt: m.createdAt.toDate()})), sendMessage };
}

