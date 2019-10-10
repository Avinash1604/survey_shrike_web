import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { MaterialModule } from 'src/app/shared/material.module';

const dashBoardRoutes: Routes = [

  {
    path: 'dashboardHome', component: DashboardHomeComponent,
    // children: [{
    //   path: 'dashboardhome', component: DashboardHomeComponent
    // }]
  }
];

@NgModule({
  declarations: [DashboardHomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(dashBoardRoutes),
    MaterialModule
  ],
  exports: [DashboardHomeComponent]
})
export class DashboardModule {

}


