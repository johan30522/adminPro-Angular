import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivationEnd, Router, ActivatedRoute } from '@angular/router';

import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  public tittle: string = '';
  public tittleSubs!: Subscription;

  constructor(private readonly router: Router, private route: ActivatedRoute) {
    // console.log(route.snapshot.children);

 
    this.tittleSubs = this.inicialize();
    this.router.events.subscribe((subs) => {
     // console.log(subs);
    });
  }
  ngOnDestroy(): void {
    this.tittleSubs.unsubscribe();
  }

  ngOnInit(): void {

  }


  public inicialize(): Subscription {

    return this.router.events
      .pipe(
        filter<any>((evento) => evento instanceof ActivationEnd),
        filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
        map((evento: ActivationEnd) => evento.snapshot.data)
      )
      .subscribe(({ tittle }) => {
  
        document.title = `Admin Pro - ${tittle}`;
      })
  }
}
