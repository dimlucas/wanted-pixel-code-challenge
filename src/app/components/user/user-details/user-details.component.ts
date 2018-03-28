import { Component, Input } from '@angular/core';
import { User } from '../../../models/user';

@Component({
    selector: 'user-details',
    templateUrl: './user-details.component.html'
})
export class UserDetailsComponent {
    @Input()
    user: User;
}