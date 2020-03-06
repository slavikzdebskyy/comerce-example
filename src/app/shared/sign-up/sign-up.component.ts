import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../login/login.component';
import {MatSnackBar} from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import {User} from '../../interfaces/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public hide = true;
  public hidec = true;
  public signUpForm: FormGroup;
  public matcher: MyErrorStateMatcher;

  constructor(
    private matSnackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router,
    ) {
    this.hide = true;
    this.matcher = new MyErrorStateMatcher();
    this.initForm();
  }

  public ngOnInit(): void {
  }

  public hasError(field: string, errorName: string): boolean {
    return this.signUpForm.get(field).hasError(errorName);
  }

  private pswrdValidator(): ValidatorFn {
    return (group: FormGroup) => {
      const pass: string = group.get('password').value;
      const confirmPass: string = group.get('confirmPassword').value;
      return pass === confirmPass ? null : {pswrdsNotMatch: true};
    };
  }

  public submit(): void {
    if (this.signUpForm.invalid) {
      return;
    }
    const user: User = this.signUpForm.getRawValue();
    this.authService.singUp(user).subscribe(
      () => {
        this.openSnackBar('You signed up !!!', 'Success !!!');
        this.router.navigate(['login']);
      },
      ({error}) => this.openSnackBar(error.message, 'Error !')
    );
  }

  private openSnackBar(message: string, action: string) {
    this.matSnackBar.open(message, action, {duration: 2000});
  }

  private initForm(): void {
    this.signUpForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required])
    }, this.pswrdValidator());
  }

}
