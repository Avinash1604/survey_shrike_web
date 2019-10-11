import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog, MatDialogRef } from '@angular/material';
import { of } from 'rxjs';
import { User } from '../login/user';
import { LocalStorageService } from '../dashboard/local-storage.service';
import { Router } from '@angular/router';

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


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
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
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should registered data store in local storage and dailog reference close when user did sucessfull registration', () => {
    const localStorage = TestBed.get(LocalStorageService);
    spyOn(localStorage, 'setLoginData');
    const user = {} as User;
    user.userName = 'userName';
    user.password = 'password';
    user.email = 'email';
    user.firstName = 'firstName';
    component.user = user;
    component.register();
    expect(localStorage.setLoginData).toHaveBeenCalledWith(user);
    expect(router.navigate).toHaveBeenCalledWith(['dashboardhome/createSurvey']);
  });
});
