import { IMessage } from "react-native-gifted-chat";

export interface UserProfile {
    title: string;
    uid: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    username: string;
    token: string; 
}
  
export interface Message extends IMessage {}

export interface MessageGroup {
    name: string
    members?: UserProfile[]
}

export interface BlastGroup {
    name: String
    members?: UserProfile[]
}
