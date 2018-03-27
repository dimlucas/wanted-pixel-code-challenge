import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {SharedModule} from "./shared/shared.module";
import {AppRoutingModule} from "./app-routing.module";
import {WelcomeComponent} from "./welcome/welcome.component";
import { UsersService } from './services/users.service';
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/user/user.component';

@NgModule({
    declarations: [
        AppComponent,
        WelcomeComponent,
        UsersComponent,
        UserComponent
    ],
    imports: [
        BrowserModule,
        SharedModule,
        AppRoutingModule,
        HttpClientModule
        // RouterModule.forRoot([
        //     { path: '', component: UsersComponent }            
        // ])
    ],
    providers: [UsersService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
