import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialogLogin(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDialogRegister(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
