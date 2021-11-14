import { Component, OnInit, Input } from '@angular/core';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';
import { Doghnut } from '../interfaces/doghnut';

@Component({
  selector: 'app-doghnut',
  templateUrl: './doghnut.component.html',
  styleUrls: ['./doghnut.component.css']
})
export class DoghnutComponent implements OnInit {

  @Input('graficaConf') graficaConf!:Doghnut;



  public doughnutChartType: ChartType = 'doughnut';


  constructor() { }

  ngOnInit(): void {

  }



   // events
   public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
