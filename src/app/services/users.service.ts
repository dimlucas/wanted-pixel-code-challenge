import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from '../models/user';
import { Post } from '../models/post';
import { Comment } from '../models/comment';
import 'rxjs/add/operator/toPromise';
import { Comment } from '@angular/compiler';

@Injectable()
export class UsersService {
    private _baseUrl: string = "http://jsonplaceholder.typicode.com/";

    constructor(private _http: HttpClient) {

    }   
    
    fetchUsers(): Promise<User[]> {
        return this._http.get<User[]>(`${this._baseUrl}/users`).toPromise()
    }    

    fetchPosts(): Promise<Post[]> {
        return this._http.get<Post[]>(`${this._baseUrl}/posts`).toPromise();
    }

    fetchComments(): Promise<Comment[]> {
        return this._http.get<Comment[]>(`${this._baseUrl}/comments`).toPromise();
    }
}