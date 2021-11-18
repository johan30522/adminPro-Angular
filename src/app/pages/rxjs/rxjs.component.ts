import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
//import { retry } from "rxjs/operator";
import { map, filter, retry, take } from 'rxjs/operators'

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit,OnDestroy {

  public intervalSubs!:Subscription;
  
  constructor() {
   

/*
    this.retornaObservable()
      .pipe(
        retry()
      )
      .subscribe(
        (valor) => {
          console.log('subs', valor);
        },
        (err) => {
          console.warn('error:', err)
        },
        () => {
          console.warn('obs terminado');
        }
      );*/


      this.intervalSubs= this.retornaIntervalo()
        .subscribe(
          console.log
        )
  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
    
  }

  ngOnInit(): void {
  }

  public retornaIntervalo():Observable<number>{

    const intervals$=interval(1000)
                      .pipe(
                        take(4),
                        map((valor)=>{
                          return valor+1;
                        }),
                        filter(valor=>(valor % 2===0)?true:false)
                        
                      );

    return intervals$

    
  }
  public retornaObservable():Observable<number>{
    let i = 0;
    return new Observable<number>(
      (observer) => {

        const intervalo = setInterval(() => {
          i++;
          observer.next(i);
          if (i === 7) {
            clearInterval(intervalo);
            observer.complete();
          }
          if (i === 2) {
            observer.error(' i llego al valor de 2');
          }
        }, 1000)

      }

    );
   
  }

}
