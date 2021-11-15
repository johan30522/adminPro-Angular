import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor(private readonly router:Router) { }

  ngOnInit(): void {
  }

  public signup():void{
    this.router.navigateByUrl('/auth/login');
  }


}
