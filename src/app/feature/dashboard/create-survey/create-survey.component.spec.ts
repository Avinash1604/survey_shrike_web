import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateSurveyComponent } from './create-survey.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../login/user';
import { By } from '@angular/platform-browser';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';

describe('CreateSurveyComponent', () => {
  let component: CreateSurveyComponent;
  let fixture: ComponentFixture<CreateSurveyComponent>;

  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSurveyComponent],
      imports: [MaterialModule, RouterTestingModule.withRoutes([]), BrowserAnimationsModule, FormsModule, ReactiveFormsModule],
      providers: [LocalStorageService, { provide: Router, useValue: router }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSurveyComponent);
    component = fixture.componentInstance;
    spyOn(localStorage, 'removeItem');
    const user: User = {} as User;
    user.email = 'avinashnv2@gmail.com';
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(user));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create survey page and suvery title and questions should load', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
    fixture.detectChanges();
    let input = fixture.debugElement.query(By.css('.mat-input-element')).nativeElement;
    expect(input.textContent).toEqual('');
    component.surveyForm.controls.surveyTitle.setValue('test');
    fixture.detectChanges();
    input = fixture.debugElement.query(By.css('.mat-input-element')).nativeElement;
    expect(input.value).toEqual('test');
    expect(component.surveyForm.valid).toBeFalsy();
  });

  it('should add questions', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.surveyForm.controls.surveyQuestions[`controls`].length).toEqual(1);
    component.onAddQuestion();
    expect(component.surveyForm.controls.surveyQuestions[`controls`].length).toEqual(2);
  });

  it('should remove questions', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
    fixture.detectChanges();
    component.onAddQuestion();
    expect(component.surveyForm.controls.surveyQuestions[`controls`].length).toEqual(2);
    component.onRemoveQuestion(1);
    expect(component.surveyForm.controls.surveyQuestions[`controls`].length).toEqual(1);
  });

  it('shold on select of SingleChoice, Multichoice , should add optional controller to questions', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
    fixture.detectChanges();
    component.onSeletQuestionType('SingleChoice', 0);
    expect(component.surveyForm.controls.surveyQuestions[`controls`].length).toEqual(1);
  });

  it('should add options', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
    fixture.detectChanges();
    component.onSeletQuestionType('SingleChoice', 0);
    fixture.detectChanges();
    component.addOption(0);
    expect(component.surveyForm.controls.surveyQuestions[`controls`].length).toEqual(1);
  });


  it('should remove options', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
    fixture.detectChanges();
    component.onSeletQuestionType('SingleChoice', 0);
    fixture.detectChanges();
    component.removeOption(0, 0);
    expect(component.surveyForm.controls.surveyQuestions[`controls`].length).toEqual(1);
  });

  it('should onSubmit click should get all the survey details and route to preview screen', () => {
    const localStorageService = TestBed.get(LocalStorageService);
    spyOn(localStorageService, 'setSurveyData');
    expect(component).toBeTruthy();
    component.ngOnInit();
    fixture.detectChanges();
    component.surveyForm.controls.surveyTitle.setValue('test');
    component.surveyForm.controls.surveyType.setValue('event');
    fixture.detectChanges();
    component.onSubmit();
    expect(router.navigate).toHaveBeenCalledWith(['dashboardhome/preview']);
  });


});
