import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../dashboard/local-storage.service';
import { User } from './user';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(private localStorageService: LocalStorageService, private router: Router,
              private dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit() {

  }

  login() {
    const user: User[] = this.localStorageService.getLoginData(this.email, this.password);
    if (user.length > 0) {
      localStorage.setItem('loginUser', JSON.stringify(user[0]));
      this.router.navigate(['dashboardhome/createSurvey']);
      this.dialogRef.close();
    } else {
      alert('Incorrect email or password');
    }
  }

}
