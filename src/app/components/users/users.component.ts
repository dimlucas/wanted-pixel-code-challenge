import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { Post } from '../../models/post';
import { Comment } from '../../models/comment';
import 'jquery';
import 'jsgrid';
import { StateService } from '../../services/state.service';

@Component({
    templateUrl: './users.component.html',
    selector: 'users'
})
export class UsersComponent implements OnInit{
    isBusy: boolean = false;
    users: User[] = [];    
    posts: Post[] = [];
    comments: Comment[] = [];

    constructor(private _usersService: UsersService, private _router: Router, private _state: StateService) {

    }
    
    ngOnInit() {
        this.refresh().then(() => {
            ($('#grid') as any).jsGrid({
                width: "100%",
                height: "600px",
                inserting: false,
                editing: false,
                sorting: true,
                paging: false,
                data: this.users,
                fields: [
                    { name: 'name', title: 'Name (Click to Sort)', type: 'text' },
                    { name: 'postsAmount', title: 'Posts', type: 'number' },
                    { name: 'postsCommentsRatio', title: 'Comments/Post', type: 'number' }
                ]
            });
            this.registerEvents();
        });
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
            return;
        });
    }

    registerEvents() {
        $('tbody tr td:first-child').each((index, item) => {
            item.onclick = this.onNameClicked.bind(this, item.textContent);
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

    onNameClicked(name) {
        let user = this.findByName(name);
        if(!user) {
            throw new Error("Something went wrong...");
        }
        this._state.currentUser = user;
        this._router.navigate(['user', this.slugify(user.name)]);
    }

    findByName(name: string): User {
        return this.users.find(u => u.name === name);
    }

    slugify(str: string) {
        return str.split(' ').join('-').toLowerCase();
    }
}