import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreviewComponent } from './preview/preview.component';
import { MyServeyComponent } from './my-servey/my-servey.component';

const dashBoardRoutes: Routes = [

  {
    path: 'dashboardhome', component: DashboardHomeComponent,
    children: [{
      path: '', component: CreateSurveyComponent,
    },
    {
      path: 'createSurvey', component: CreateSurveyComponent
    },
     {
      path: 'preview', component: PreviewComponent
    },
    {
      path: 'mySurvey', component: MyServeyComponent
    }
    ]
  }
];

@NgModule({
  declarations: [DashboardHomeComponent, CreateSurveyComponent, PreviewComponent, MyServeyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(dashBoardRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [DashboardHomeComponent]
})
export class DashboardModule {

}


