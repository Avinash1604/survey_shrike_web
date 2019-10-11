import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';
import { User } from '../login/user';
import { Survey } from './create-survey/data.models';
import { Component } from '@angular/core';

describe('LocalStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  const survey: Survey = {
    ID: 0, Type: 'Training', Title: 'survey 1',
    IsDeleted: false, question: [{
      ID: 0, Type: 'SLineText',
      Text: 'question1', options: [], Required: false,
      Remarks: '', hasRemarks: false
    },
    {
      ID: 0, Type: 'MLineText', Text: 'Question 2',
      options: [], Required: false, Remarks: '',
      hasRemarks: false
    }, {
      ID: 0, Type: 'SingleChoice',
      Text: 'question 3', options: [{
        ID: 0, OptionText: 'radio 1',
        OptionColor: '', hasRemarks: false
      }, {
        ID: 0, OptionText: 'redio2',
        OptionColor: '', hasRemarks: false
      }], Required: false, Remarks: '',
      hasRemarks: false
    }, {
      ID: 0, Type: 'MultiChoice', Text: 'question 4',
      options: [{ ID: 0, OptionText: 'test1', OptionColor: '', hasRemarks: false },
      { ID: 0, OptionText: 'test 3', OptionColor: '', hasRemarks: false }],
      Required: false, Remarks: '', hasRemarks: false
    }], userId: 'test123@gmail.com'
  };

  it('should be created', () => {
    const service: LocalStorageService = TestBed.get(LocalStorageService);
    expect(service).toBeTruthy();
  });

  it('should set survey data and get it', () => {
    const service: LocalStorageService = TestBed.get(LocalStorageService);
    spyOn(localStorage, 'removeItem');
    const user: User = {} as User;
    user.email = 'avinashnv2@gmail.com';
    spyOn(localStorage, 'setItem');
    service.setSurveyData(survey);
    spyOn(service, 'getSurveyData').and.returnValue([survey]);
    expect(service.getSurveyData(user.email)).toEqual([survey]);
  });

  it('should set user data and get it', () => {
    const service: LocalStorageService = TestBed.get(LocalStorageService);
    spyOn(localStorage, 'removeItem');
    spyOn(localStorage, 'setItem');
    const user: User = {} as User;
    user.email = 'avinashnv2@gmail.com';
    user.password = 'abcd';
    console.log('service' + service);
    service.setLoginData(user);
    spyOn(service, 'getLoginData').and.returnValue([user]);
    expect(service.getLoginData(user.email, user.password)).toEqual([user]);
  });


});
