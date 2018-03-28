import { Post } from "./post";

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    posts: Post[];
    postsAmount: number;
    postsCommentsRatio: number;
    address: any;
}