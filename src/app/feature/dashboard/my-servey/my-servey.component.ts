import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
import { Survey } from '../create-survey/data.models';

@Component({
  selector: 'app-my-servey',
  templateUrl: './my-servey.component.html',
  styleUrls: ['./my-servey.component.scss']
})
export class MyServeyComponent implements OnInit {
  surveysList: Survey[] = [];
  constructor(private router: Router,
              private message: MessageService, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    const userDetails = JSON.parse(localStorage.getItem('loginUser'));
    this.surveysList = this.localStorageService.getSurveyData(userDetails.email);
  }

  preview(data) {
    this.message.sendSurveyData(data);
    this.router.navigate(['dashboardhome/preview']);
  }
}
