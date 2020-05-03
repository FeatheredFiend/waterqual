
import { Component } from '@angular/core';
import { ApiService } from '../_services';
import { Router } from '@angular/router';
import { Users } from '../_models';


@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html'
})

export class LayoutComponent {
    loginbtn: boolean;
    logoutbtn: boolean;
    currentUser: Users;

    constructor(
        private router: Router,
        private dataService: ApiService) {
        dataService.getLoggedInName.subscribe(name => this.changeName(name));
        this.dataService.currentUser.subscribe(x => this.currentUser = x);
        if (this.dataService.isLoggedIn()) {
            console.log("loggedin");
            this.loginbtn = false;
            this.logoutbtn = true

        }
        else {
            this.loginbtn = true;
            this.logoutbtn = false
        }

    }

    private changeName(name: boolean): void {
        this.logoutbtn = name;
        this.loginbtn = !name;
    }
    logout() {
        this.dataService.deleteToken();
        this.dataService.logout();
        this.router.navigate(['/login']);
    }
}