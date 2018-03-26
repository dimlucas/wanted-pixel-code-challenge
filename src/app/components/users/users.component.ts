import {Component, OnInit} from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { Post } from '../../models/post';
import { Comment } from '../../models/comment';

@Component({
    templateUrl: './users.component.html',
    selector: 'users'
})
export class UsersComponent implements OnInit{
    isBusy: boolean = false;
    users: User[] = [];    
    posts: Post[] = [];
    comments: Comment[] = [];

    constructor(private _usersService: UsersService) {

    }
    
    ngOnInit() {
        this.refresh();
    }

    refresh(): Promise<any> {
        this.isBusy = true;
        return Promise.all([this._usersService.fetchUsers(), this._usersService.fetchPosts(), this._usersService.fetchComments()]).then((responses) => {
            this.users = responses[0];
            this.posts = responses[1];
            this.comments = responses[2];
            this.users.forEach(user => {
                user.posts = this.findUserPosts(this.posts, user.id);
                user.posts.forEach(post => {
                    post.comments = this.findPostComments(this.comments, post.id);
                });
                user.postsAmount = user.posts.length;
                user.postsCommentsRatio = this.calculatePostCommentsRatio(user.posts);
            });           
            this.isBusy = false;
            console.log(this.users);
        });
    }

    findUserPosts(allPosts: Post[], userId: number): Post[] {
        return allPosts.filter(p => p.userId == userId);
    }

    findPostComments(allComments: Comment[], postId: number): Comment[] {
        return allComments.filter(c => c.postId == postId);
    }

    calculatePostCommentsRatio(posts: Post[]): number {
        let numberOfComments = 0;
        posts.forEach(p => {
            numberOfComments += p.comments.length;
        });
        return (numberOfComments / posts.length);
    } 
}