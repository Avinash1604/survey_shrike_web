import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Survey, Question, Option } from './data.models';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';
import { User } from '../../login/user';
import { LocalStorageService } from '../local-storage.service';

export interface QuestionType {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.scss']
})
export class CreateSurveyComponent implements OnInit {

  surveyForm: FormGroup;
  selectedOption = [];
  userDetails: User;
  editMode = false;
  surveyTypes = [
    { id: 1, value: 'Customer Feedback' },
    { id: 2, value: 'HR' },
    { id: 3, value: 'Education' },
    { id: 4, value: 'Training' },
    { id: 5, value: 'Events' },
    { id: 6, value: 'Healthcare' },
    { id: 7, value: 'Market Research' },
    { id: 8, value: 'Quiz' },
    { id: 9, value: 'Others' }
  ];

  questions: QuestionType[] = [
    { value: 'SLineText', viewValue: 'Single line input' },
    { value: 'MLineText', viewValue: 'Multiple Line input' },
    { value: 'SingleChoice', viewValue: 'Radio' },
    { value: 'MultiChoice', viewValue: 'Select' },
    { value: 'SelectBox', viewValue: 'Dropdown' },
    { value: 'FileUpload', viewValue: 'File upload' }
  ];


  constructor(
    // private surveyService: SurveyService,
    private router: Router,
    private message: MessageService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.initForm();
    this.userDetails = JSON.parse(localStorage.getItem('loginUser'));
  }

  private initForm() {
    const surveyTitle = '';
    const surveyType = '';

    this.surveyForm = new FormGroup({
      surveyTitle: new FormControl(surveyTitle, [Validators.required]),
      surveyType: new FormControl(surveyType, [Validators.required]),
      surveyQuestions: new FormArray([])
    });

    this.onAddQuestion();

  }

  onAddQuestion() {
    const surveyQuestionItem = new FormGroup({
      questionTitle: new FormControl('', Validators.required),
      questionType: new FormControl('', Validators.required),
      questionGroup: new FormGroup({})
    });
    (this.surveyForm.get('surveyQuestions') as FormArray).push(surveyQuestionItem);
  }

  onRemoveQuestion(index) {
    this.surveyForm.controls.surveyQuestions[`controls`][index].controls.questionGroup = new FormGroup({});
    this.surveyForm.controls.surveyQuestions[`controls`][index].controls.questionType = new FormControl({});
    (this.surveyForm.get('surveyQuestions') as FormArray).removeAt(index);
    this.selectedOption.splice(index, 1);
  }


  onSeletQuestionType(questionType, index) {
    if (questionType === 'SingleChoice' || questionType === 'MultiChoice' || questionType === 'SelectBox') {
      this.addOptionControls(questionType, index);
    }
  }

  addOptionControls(questionType, index) {
    const options = new FormArray([]);
    const showRemarksBox = new FormControl(false);
    (this.surveyForm.controls.surveyQuestions[`controls`][index].controls.questionGroup).addControl('options', options);
    (this.surveyForm.controls.surveyQuestions[`controls`][index].controls.questionGroup).addControl('showRemarksBox', showRemarksBox);
    this.clearFormArray((this.surveyForm.controls.surveyQuestions[`controls`][index].controls.questionGroup.controls.options as FormArray));
    this.addOption(index);
    this.addOption(index);
  }


  private clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }


  addOption(index) {
    const optionGroup = new FormGroup({
      optionText: new FormControl('', Validators.required),
    });
    (this.surveyForm.controls.surveyQuestions[`controls`][index].controls.questionGroup.controls.options as FormArray).push(optionGroup);
  }

  removeOption(questionIndex, itemIndex) {
    (this.surveyForm.controls.surveyQuestions[`controls`]
    [questionIndex].controls.questionGroup.controls.options as FormArray).removeAt(itemIndex);
  }


  postSurvey() {
    const formData = this.surveyForm.value;
    const ID = 0;
    const Type = formData.surveyType;
    const Title = formData.surveyTitle;
    const IsDeleted = false;
    const IsAnonymous = formData.IsAnonymous;
    const Questions = [];
    const surveyQuestions = formData.surveyQuestions;
    let optionArray = [];
    if (surveyQuestions[0].questionGroup.options !== undefined) {
      optionArray = formData.surveyQuestions[0].questionGroup.options[0].optionText;
    }
    const survey = new Survey(ID, Type, Title, IsDeleted, IsAnonymous, Questions, this.userDetails.email);
    surveyQuestions.forEach((question, index, array) => {
      const questionItem = {
        ID: 0,
        Type: question.questionType,
        Text: question.questionTitle,
        options: [],
        Required: false,
        Remarks: '',
        hasRemarks: false

      };
      if (question.questionGroup.hasOwnProperty('showRemarksBox')) {
        questionItem.hasRemarks = question.questionGroup.showRemarksBox;
      }
      if (question.questionGroup.hasOwnProperty('options')) {
        question.questionGroup.options.forEach(option => {
          const optionItem: Option = {
            ID: 0,
            OptionText: option.optionText,
            OptionColor: '',
            hasRemarks: false
          };
          questionItem.options.push(optionItem);
        });
      }
      survey.question.push(questionItem);

    });
    this.localStorageService.setSurveyData(survey);
    this.message.sendSurveyData(survey);
    this.router.navigate(['dashboardhome/preview']);
  }


  onSubmit() {
    this.postSurvey();
  }

}
