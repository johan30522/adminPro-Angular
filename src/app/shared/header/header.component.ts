import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
    `
    a:hover {
      cursor:pointer;
    }
    `
  ]
})
export class HeaderComponent implements OnInit {

  constructor( private router:Router) { }

  ngOnInit(): void {
  }

  public logout():void{
    this.router.navigateByUrl('/auth/login');
  }


}
