import { Injectable } from '@angular/core';
import { Survey } from './create-survey/data.models';
import { User } from '../login/user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setSurveyData(data: Survey): void {
    let surveyList = this.getSurveyList();
    if (surveyList === null) {
      surveyList = [];
    }
    surveyList.push(data);
    localStorage.setItem('survey', JSON.stringify(surveyList));
  }

  getSurveyData(userId: string): Survey[] {
    const surveyList: Survey[] = JSON.parse(localStorage.getItem('survey'));
    return surveyList ? surveyList.filter(survey => survey.userId === userId) : [];
  }

  setLoginData(data: User): void {
    try {
      let userList: User[] = this.getLoginList();
      if (userList === null) {
        userList = [];
      }
      userList.push(data);
      localStorage.setItem('userList', JSON.stringify(userList));
    } catch (e) {
    }
  }

  getLoginData(email: string, password: string): User[] {
    const userList: User[] = this.getLoginList();
    if (userList) {
      return userList.filter(user => (user.email === email && user.password === password));
    } else {
      return [];
    }
  }

  private getSurveyList(): Survey[] {
    return JSON.parse(localStorage.getItem('survey'));
  }

  private getLoginList(): User[] {
    return JSON.parse(localStorage.getItem('userList'));
  }

}
