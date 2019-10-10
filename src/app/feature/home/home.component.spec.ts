import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { FormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';

export class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: () => of({ action: true })
    };
  }
}


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let matDialog: MatDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, BrowserAnimationsModule, FormsModule],
      declarations: [HomeComponent, LoginComponent, RegisterComponent],
      providers: [
        { provide: MatDialog, useClass: MatDialogMock }
      ]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [LoginComponent, RegisterComponent],
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    matDialog = TestBed.get(MatDialog);
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have title on header bar', () => {
    const headerTitle = fixture.debugElement.query(By.css('.header_title')).nativeElement;
    expect(headerTitle.textContent.trim()).toBe('Survey Shrike');
  });
  it('should login pop up open when click on login button', () => {
    spyOn(component, 'openDialogLogin');
    const deleteButton = fixture.debugElement.query(By.css('.login')).nativeElement;
    deleteButton.click(); // I've clicked the button, and now the delete function is called...
    expect(component.openDialogLogin).toHaveBeenCalled();
  });

  it('should register pop up open when click on register button', () => {
    spyOn(component, 'openDialogRegister');
    const deleteButton = fixture.debugElement.query(By.css('.register')).nativeElement;
    deleteButton.click(); // I've clicked the button, and now the delete function is called...
    expect(component.openDialogRegister).toHaveBeenCalled();
  });

  it('should check for the open dailog for login ', () => {
    fixture.detectChanges();
    component.openDialogLogin();
    expect(matDialog.open).toBeTruthy();
  });

  it('should check for the open dailog for login ', () => {
    fixture.detectChanges();
    component.openDialogRegister();
    expect(matDialog.open).toBeTruthy();
  });

});
