import { Component, OnInit } from '@angular/core';
import { User } from '../login/user';
import { LocalStorageService } from '../dashboard/local-storage.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: User = {} as User;

  constructor(private localStorageService: LocalStorageService,
              private router: Router,
              private dialogRef: MatDialogRef<RegisterComponent>) {
  }

  ngOnInit() {
  }

  register() {
    this.localStorageService.setLoginData(this.user);
    localStorage.setItem('loginUser', JSON.stringify(this.user));
    this.dialogRef.close();
    this.router.navigate(['dashboardhome/createSurvey']);
  }

}
