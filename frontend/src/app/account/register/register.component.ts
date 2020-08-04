import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { ValidationMessages, GenericValidator, DisplayMessage } from 'src/app/utils/generic-form-validation';
import { CustomValidators } from 'ngx-custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, AfterViewInit {

  erros: any[] = [];
  registerForm: FormGroup;
  user: User;

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(private fb: FormBuilder, private accountService: AccountService) {
  
      this.validationMessages = {
        email: {
          required: 'Informe o e-mail',
          email: 'E-mail inválido'
        },
        password: {
          required: 'Informe a senha',
          rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
        },
        confirmPassword:{
          required: 'Informe a senha novamente',
          rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
          equalTo: 'As senhas não conferem'
        }
      };
  }

  ngOnInit() {

    let password = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15])]);

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      confirmPassword: [''],
      profile: ['']
    });
  }

  ngAfterViewInit() { 

  }

  registerAccount() {
    if(this.registerForm.dirty && this.registerForm.valid) {
      this.user = Object.assign({}, this.user, this.registerForm.value);

      this.accountService.registerUser(this.user);
    }
  }


}
