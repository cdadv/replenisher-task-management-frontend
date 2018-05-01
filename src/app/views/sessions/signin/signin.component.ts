import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  signinForm: FormGroup;

  constructor(
    private router: Router, 
    private tokenService: TokenService, 
    private snack: MatSnackBar) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false)
    })
  }

  signin() {
    const signinData = this.signinForm.value
    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';
    this.tokenService.getAccessToken(signinData).subscribe(data => {
      this.onSuccess(data);
    }, err => {
      this.onError(err);
    });;
  }

  onSuccess(result: any): any {
    let access_token = result['access_token'];
    let expires_in = result['expires_in'];
    let refresh_token = result['refresh_token'];
    let token_type = result['token_type'];
    let scope = result['scope']
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    // route to '/task_management' page
    this.router.navigateByUrl('/task_management');   
  }

  onError(error: HttpErrorResponse) {
    this.progressBar.mode = 'determinate';
    this.submitButton.disabled = false;
    this.snack.open(error.error.error_description, 'ERROR', { duration: 7000 });
  }
}
