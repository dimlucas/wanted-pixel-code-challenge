import { Component } from "@angular/core";
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
    
    constructor(public stateService: StateService) {

    }
}