import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

import { UserService } from './user.service';
import { WalletService } from './wallet.service';

import { User } from '../shared/models/user.model';
import { Wallet } from '../shared/models/wallet.model';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  loggedIn = false;
  isAdmin = false;

  currentUser: User = new User();
  walletUser: Wallet = new Wallet();

  constructor(private userService: UserService,
              private walletService: WalletService,
              private router: Router,
              private jwtHelper: JwtHelperService) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = this.decodeUserFromToken(token);
      this.setCurrentUser(decodedUser);
      this.setWalletUser(decodedUser);
    }
  }

  login(emailAndPassword) {
    return this.userService.login(emailAndPassword).map(
      res => {
        localStorage.setItem('token', res.token);
        const decodedUser = this.decodeUserFromToken(res.token);
        this.setCurrentUser(decodedUser);
        this.setWalletUser(decodedUser);
        return this.loggedIn;
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.isAdmin = false;
    this.currentUser = new User();
    this.router.navigate(['/']);
  }

  decodeUserFromToken(token) {
    return this.jwtHelper.decodeToken(token).user;
  }

  setCurrentUser(decodedUser) {
    this.loggedIn = true;
    this.currentUser._id = decodedUser._id;
    this.currentUser.username = decodedUser.username;
    this.currentUser.role = decodedUser.role;
    decodedUser.role === 'admin' ? this.isAdmin = true : this.isAdmin = false;
    delete decodedUser.role;
  }

  setWalletUser(decodedUser) {
    this.walletService.getWalletByUserId(this.currentUser._id).subscribe(
      data => this.walletUser = data,
      error => console.log(error)
    );
  }
}
