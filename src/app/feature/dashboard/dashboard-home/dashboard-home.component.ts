import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {

  screenWidth: number;
  getUserInfo;
  constructor(private route: Router) {
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      // set screenWidth on screen size change
      this.screenWidth = window.innerWidth;
     };
   }

  ngOnInit() {
    // this.getUserInfo = JSON.parse(localStorage.getItem('adminInfo'));
  }


  // logOut(): void {

  // }

}
