import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

  @Input('progressValue1')  progress:number=90;
  @Input('colorButton') classButton:string= 'btn-primary';
  @Output() valorSalida:EventEmitter<number>=new EventEmitter();
  constructor() { }
  
  

  ngOnInit(): void {
    this.classButton=`btn ${this.classButton}`
  }
  public cambiarProgress(value:number):void{
    this.progress=this.progress+value;
    if(this.progress>100){
      this.progress=100;
      this.valorSalida.emit(this.progress)
      return;
    }
    else if(this.progress<0){
      this.progress=0;
      this.valorSalida.emit(this.progress)
      return;
    }
    this.valorSalida.emit(this.progress)
  }
  public onChangeIncrement(valor:number):void{
    
    this.progress=valor;
    if(this.progress>100){
      this.progress=100;
      this.valorSalida.emit(this.progress)
      return;
    }
    else if(this.progress<0){
      this.progress=0;
      this.valorSalida.emit(this.progress)
      return;
    }
    this.valorSalida.emit(this.progress)
  }
}
