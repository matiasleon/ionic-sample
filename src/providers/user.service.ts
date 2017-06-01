import { Injectable } from '@angular/core';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Storage } from '@ionic/storage';

@Injectable()
export class UserService {

    token: string;

    constructor(
        public storage: Storage,
        public JwtHelper: JwtHelper) {

    }

    login(){
        
    }

    logout() {
        this.storage.remove('token');
        this.storage.remove('profile');
    }
}