import { IMessage } from "react-native-gifted-chat";

export interface UserProfile {
    uid: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    username: string;
    
}
  
export interface Message extends IMessage {}

export interface MessageGroup {
    name: string
    members?: UserProfile[]
}