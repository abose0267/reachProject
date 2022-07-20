export interface UserProfile {
    uid: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
}
  
export interface MessageProfile {
    name: string;
    members: Array<UserProfile>;
  }

  
export interface Message {
    text: string
    from: Partial<UserProfile>
}

export interface MessageGroup {
    name: string
    members?: UserProfile[]
}