import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from "./welcome/welcome.component";
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/user/user.component';

let routes: Routes = [
    { path: '', component: UsersComponent },
    { path: 'user/:id', component: UserComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
