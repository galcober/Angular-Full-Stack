import { Component, OnInit } from '@angular/core';

import { ToastComponent } from '../../shared/toast/toast.component';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  isLoading = true;

  constructor(public auth: AuthService,
              public toast: ToastComponent,
              private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      data => this.users = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  deleteUser(user: User) {
    if (window.confirm('Are you sure you want to delete ' + user.username + '?')) {
      this.userService.deleteUser(user).subscribe(
        data => this.toast.setMessage('user deleted successfully.', 'success'),
        error => console.log(error),
        () => this.getUsers()
      );
    }
  }

  deactivateUser(user: User) {
    user.active = false;
    if (window.confirm('Are you sure you want to deactivate ' + user.username + '?')) {
      this.userService.editUser(user).subscribe(
        res => this.toast.setMessage('account deactivated!', 'success'),
        error => console.log(error)
      );
    }
  }

  activateUser(user: User) {
    user.active = true;
    if (window.confirm('Are you sure you want to activate ' + user.username + '?')) {
      this.userService.editUser(user).subscribe(
        res => this.toast.setMessage('account activated!', 'success'),
        error => console.log(error)
      );
    }
  }

}
