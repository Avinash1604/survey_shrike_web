import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { LocalStorageService } from '../dashboard/local-storage.service';
import { User } from './user';

const router = {
  navigate: jasmine.createSpy('navigate')
};

export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of({ action: true })
    };
  }
}

export class MatDialogRefMock {
  close() {
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [MaterialModule, BrowserAnimationsModule, FormsModule, RouterTestingModule],
      providers: [
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        { provide: Router, useValue: router },
        LocalStorageService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login successfull when data exist in local storage', () => {
    const localStorage = TestBed.get(LocalStorageService);
    const user = {} as User;
    user.userName = 'userName';
    user.password = 'password';
    user.email = 'email';
    user.firstName = 'firstName';
    spyOn(localStorage, 'getLoginData').and.returnValue([user]);
    component.login();
    expect(router.navigate).toHaveBeenCalledWith(['dashboardhome/createSurvey']);
  });

  it('should show error message when login failed', () => {
    const localStorage = TestBed.get(LocalStorageService);
    spyOn(window, 'alert');
    spyOn(localStorage, 'getLoginData').and.returnValue([]);
    component.login();
    expect(window.alert).toHaveBeenCalledWith('Incorrect email or password');
  });

});
