import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Doghnut } from 'src/app/components/interfaces/doghnut';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css']
})
export class Grafica1Component implements OnInit {


  public grafica1:Doghnut={
    tittle:'Ventas',
    doughnutChartData: [[350, 450, 100]],
    doughnutChartLabels: ['Ventas', 'Ventas En Stock', 'Ventas En linea'],
    colors:[{backgroundColor:['#9E120E','#FF5800','#FFB414']}]
  }
  
  
  public grafica2:Doghnut={
    tittle:'Compras',
    doughnutChartData: [[200, 600, 900]],
    doughnutChartLabels: ['Platico', 'Metal', 'Madera'],
    colors:[{backgroundColor:['#808000','#008080','#000080']}]
  }

  constructor() { }

  ngOnInit(): void {
  }


}
