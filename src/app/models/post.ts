import { User } from "./user";
import { Comment } from './comment';

export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
    user: User;
    comments: Comment[];
}