import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Post } from '../models/post';

@Injectable()
export class StateService {
    currentUser: User;
}