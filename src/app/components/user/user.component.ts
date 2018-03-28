import { Component, state } from "@angular/core";
import { StateService } from "../../services/state.service";
import { User } from "../../models/user";

@Component({
    selector: 'user',
    templateUrl: './user.component.html'
})
export class UserComponent {
    get user(): User {
        return this.stateService.currentUser;
    }

    detailsVisible: boolean = false;
    commentSectionsVisibility: boolean[] = [];
    
    toggleUserDetails() {
        this.detailsVisible = !this.detailsVisible;
    }

    toggleCommentsVisibility(e: Event, index) {
        e.preventDefault();
        this.commentSectionsVisibility[index] = !this.commentSectionsVisibility[index];
    }

    constructor(public stateService: StateService) {
        for(let post of this.user.posts) {
            this.commentSectionsVisibility.push(false);
        }
    }
}