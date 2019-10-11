import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Subscription } from 'rxjs';
import { Survey } from '../create-survey/data.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  subscription: Subscription;
  survey: Survey;

  constructor(private messageService: MessageService, private router: Router) {
    this.survey = this.messageService.getSurveyData();
  }

  ngOnInit() {

  }

  done() {
    this.router.navigate(['dashboardhome/createSurvey']);
  }

}
