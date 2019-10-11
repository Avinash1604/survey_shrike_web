import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewComponent } from './preview.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { Survey } from '../create-survey/data.models';
import { MessageService } from '../message.service';
import { Router } from '@angular/router';

const router = {
  navigate: jasmine.createSpy('navigate')
};

describe('PreviewComponent', () => {
  let component: PreviewComponent;
  let fixture: ComponentFixture<PreviewComponent>;

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PreviewComponent],
      imports: [MaterialModule, RouterTestingModule.withRoutes([]), BrowserAnimationsModule],
      providers: [MessageService, { provide: Router, useValue: router }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewComponent);
    component = fixture.componentInstance;
    const messageService = TestBed.get(MessageService);
    component.survey = survey;
    messageService.sendSurveyData(survey);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should done button click navigate to create survey screen', () => {
    component.done();
    expect(router.navigate).toHaveBeenCalledWith(['dashboardhome/createSurvey']);
  });
});
