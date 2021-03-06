# SurveyShrikeWeb 

SurveyShrike help businesses conduct surveys. SurveyShrike believes every customer has different views or comments about services and over all products. And every business needs to know right customer mindset to engage customers for long run. SurveyShrike is trying to solve this problem .

SurveyShrike would require an authenticated user to create a survey by using below options

* Single Line Input
* Multiple Line Input
* Dropdown
* Select
* Radio
* File Upload

# Build status and code coverage [![Build Status](https://travis-ci.org/Avinash1604/survey_shrike_web.svg?branch=master)](https://travis-ci.org/Avinash1604/survey_shrike_web)[![Coverage Status](https://coveralls.io/repos/github/Avinash1604/survey_shrike_web/badge.svg?branch=master)](https://coveralls.io/github/Avinash1604/survey_shrike_web?branch=master)

## Coverage:
(`https://coveralls.io/github/Avinash1604/survey_shrike_web?branch=master`) [coverage](https://coveralls.io/github/Avinash1604/survey_shrike_web?branch=master)

## Build:
(`https://travis-ci.org/Avinash1604/survey_shrike_web`) [build](https://travis-ci.org/Avinash1604/survey_shrike_web)


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.2.

## Development server

GitHub pages:
`https://Avinash1604.github.io/survey_shrike_web/`

Local :
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## CI/CD 
 
Code deployment process is automated , used Travis CI to build and deploy when code is puhsed to master , 

Below are the task taken care by Travis :
* Clone project 
* Check for lint issue 
* Test case 
* Coverage 
 coveralls plugin used for the automate coverage , coveralls dashboard will show details of overall coverage
* Auto deployment to git hub pages 

## Demo 

Project is hosted in github pages by Travis CI , Please find a below link 
`https://Avinash1604.github.io/survey_shrike_web/` [demo](https://Avinash1604.github.io/survey_shrike_web/)

### How to use an application 
Currently an application is built with local storage , hence need to register when you swich your browser and then it will take you to the survey dashboard page.
Survey dashboard , you can create customize survey and save it and preview it , next time login in it will be available , in my survey list .

Note: There is no real server interaction so user related activity will be saved in local storage only . 

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

