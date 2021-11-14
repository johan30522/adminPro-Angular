import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  public progress1: number = 90;
  public progress2: number = 90;

  constructor() { }

  public get progressValue1(): string {
    return `${this.progress1}%`
  } public get progressValue2(): string {
    return `${this.progress2}%`
  }



  ngOnInit(): void {
  }

  public cambioValorProgress(valor:number): void {
    console.log('cambia '  , valor);
  }
}
