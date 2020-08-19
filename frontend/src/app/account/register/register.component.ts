import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormControlName } from '@angular/forms';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { ValidationMessages, GenericValidator, DisplayMessage } from 'src/app/utils/generic-form-validation';
import { CustomValidators } from 'ngx-custom-validators';
import { Observable, fromEvent, merge } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef}) formInputElements: ElementRef[];

  [x: string]: any;
  errors: any[] = [];
  registerForm: FormGroup;
  user: User;

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(private fb: FormBuilder, 
              private accountService: AccountService,
              private router: Router) {
  
      this.validationMessages = {
        name: {
          required: 'Informe seu nome'
        },
        email: {
          required: 'Informe o e-mail',
          email: 'E-mail inválido'
        },
        password: {
          required: 'Informe a senha',
          rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
        },
        passwordConfirmation:{
          required: 'Informe a senha novamente',
          rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
          equalTo: 'As senhas não conferem'
        }
      };

      this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {

    let senha = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15])]);
    let senhaConfirm = new FormControl('', [Validators.required, CustomValidators.rangeLength([6,15]), CustomValidators.equalTo(senha)])

    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: senha,
      passwordConfirmation: senhaConfirm
    });
  }

  ngAfterViewInit() { 
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((FormControl: ElementRef) => fromEvent(FormControl.nativeElement, 'blur')); 
  
    merge(...controlBlurs).subscribe(() => {
        this.displayMessage = this.genericValidator.processarMensagens(this.registerForm);
    });
  }

  registerAccount() {
    if(this.registerForm.dirty && this.registerForm.valid) {
      this.user = Object.assign({}, this.user, this.registerForm.value);

      this.accountService.registerUser(this.user)
      .subscribe(
        success => {this.processSuccess(success)},
        error => {this.processError(error)}
      );
    }
  }

  processSuccess(response: any){
    this.registerForm.reset();
    this.errors = [];
    this.accountService.LocalStorage.saveUserLocalData(response);
    this.router.navigate(['/home']);
  }

  processError(failure: any){
    this.errors = failure.error.errors;
  }
}
