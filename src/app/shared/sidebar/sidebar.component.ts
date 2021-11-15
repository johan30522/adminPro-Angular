import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
    `
    a:hover {
      cursor:pointer;
    }
    `
  ]
})
export class SidebarComponent implements OnInit {

public menu:any;

  constructor(
    private readonly sidebarService:SidebarService,
    private readonly router:Router
    ) {

    this.menu=sidebarService.menuItems;
    console.log(this.menu);
   }

  ngOnInit(): void {
  }

  public logout():void{
    this.router.navigateByUrl('/auth/login');
  }

}
