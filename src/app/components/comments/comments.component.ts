import {Component, Input} from '@angular/core';
import { Post } from '../../models/post';

@Component({
    selector: 'comments',
    templateUrl: './comments.component.html'
})
export class CommentsComponent {
    @Input()
    post: Post;
}