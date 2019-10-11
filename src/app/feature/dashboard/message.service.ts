import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Survey } from './create-survey/data.models';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private survey: Survey;


  constructor() { }

  sendSurveyData(survey: Survey) {
    this.survey = survey;
  }


  getSurveyData(): Survey {
    return this.survey;
  }

}
