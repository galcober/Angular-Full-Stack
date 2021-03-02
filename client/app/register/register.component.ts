import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/mergeMap';

import { UserService } from '../services/user.service';
import { WalletService } from '../services/wallet.service';

import { Wallet } from '../shared/models/wallet.model';

import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  username = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    Validators.pattern('[a-zA-Z0-9_-\\s]*')
  ]);
  email = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100)
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);
  role = new FormControl('', [
    Validators.required
  ]);

  wallet: Wallet;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              public toast: ToastComponent,
              private userService: UserService,
              private walletService: WalletService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role,
      active: true
    });
  }

  setClassUsername() {
    return { 'has-danger': !this.username.pristine && !this.username.valid };
  }

  setClassEmail() {
    return { 'has-danger': !this.email.pristine && !this.email.valid };
  }

  setClassPassword() {
    return { 'has-danger': !this.password.pristine && !this.password.valid };
  }

  register() {
    this.userService.register(this.registerForm.value)
      .flatMap(user => this.walletService.addWallet(this.createUserWallet(user._id)))
      .subscribe(
        response => {
          this.wallet = response;
          this.toast.setMessage('you successfully registered!', 'success');
          this.router.navigate(['/login']);
      },
        error => this.toast.setMessage('email already exists', 'danger')
      );
  }

  createUserWallet(id_user: string) {
    let wallet: Wallet;
    wallet = new Wallet();
    wallet.coins = 100;
    wallet.id_user = id_user;
    return wallet;
  }

}
