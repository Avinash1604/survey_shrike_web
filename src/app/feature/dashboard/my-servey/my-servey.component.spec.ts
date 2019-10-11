import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyServeyComponent } from './my-servey.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Survey } from '../create-survey/data.models';
import { Router } from '@angular/router';
import { User } from '../../login/user';
import { LocalStorageService } from '../local-storage.service';

describe('MyServeyComponent', () => {
  let component: MyServeyComponent;
  let fixture: ComponentFixture<MyServeyComponent>;

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
  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyServeyComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: Router, useValue: router }, LocalStorageService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyServeyComponent);
    component = fixture.componentInstance;
    spyOn(localStorage, 'removeItem');
    const user: User = {} as User;
    user.email = 'avinashnv2@gmail.com';
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(user));
    const service = TestBed.get(LocalStorageService);
    spyOn(service, 'getSurveyData').and.returnValue([survey]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should survey data set', () => {
    component.ngOnInit();
    expect(component.surveysList).toEqual([survey]);
  });

  it('should preview button click takes user to preview page', () => {
    component.preview(survey);
    expect(router.navigate).toHaveBeenCalledWith(['dashboardhome/preview']);
  });

});
