import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import {MatFormFieldControl} from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(public thisDialogRef: MatDialogRef<LoginComponent>,
              private fb: FormBuilder,) {

    this.loginForm = this.fb.group({
      email: [null, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(200)
      ])
      ],
      password: [null, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ])
      ]
    });
  }

  ngOnInit(): void {
  }

  onCloseCancel() {
		this.thisDialogRef.close(false);
  }

  submit(){
    console.log('submit!')
  }

  isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.loginForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

}
