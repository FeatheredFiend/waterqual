import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Users, UserRoles, Assets } from '../_models';

@Injectable({
    providedIn: 'root'
})

export class ApiService {
   data = [];
    redirectUrl: string;
    baseUrl: string = "http://waterqual.proprietary-data.com/api";
    @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
    private currentUserSubject: BehaviorSubject<Users>;
    public currentUser: Observable<Users>;

    constructor(private httpClient: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<Users>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Users {
        return this.currentUserSubject.value;
    }

    getAssets() {
        return this.httpClient.post<any>(this.baseUrl + '/get_assets-all.php', {} )
        .pipe(map(Assets => {
            return Assets;
        }));       
    }

    public userLogin(username, password) {
        return this.httpClient.post<any>(this.baseUrl + '/login_user.php', { username, password })
            .pipe(map(Users => {
                this.setToken(Users[0].username);
                this.getLoggedInName.emit(true);
                this.currentUserSubject.next(Users[0]);
                localStorage.setItem('currentUser', JSON.stringify(Users[0]));
                return Users;
            }));
    }

    public userRegistration(username, email, password, role, jobtitle, organisation) {
        return this.httpClient.post<any>(this.baseUrl + '/register_user.php', { username, email, password, role, jobtitle, organisation })
            .pipe(map(Users => {
                return Users;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    //token
    setToken(token: string) {
        localStorage.setItem('token', token);
    }
    getToken() {
        return localStorage.getItem('token');
    }
    deleteToken() {
        localStorage.removeItem('token');
    }
    isLoggedIn() {
        const usertoken = this.getToken();
        if (usertoken != null) {
            return true
        }
        return false;
    }
}