import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
/*
    const promesa = new Promise<string>((resolve, reject) => {
      if (false) {
        resolve('hola mundo');
      } else {
        reject('error');
      }

    });


    promesa.then((result) => {
      console.log('termine');
      console.log(result);
    })
    .catch((error)=>{
      console.log(error);
    })
    console.log('fin del init');
*/


this.getUsers().then((usuarios) => {
  console.log(usuarios);
});
  }



  public  promesa2 = new Promise<string>((resolve, reject) => {
    if (false) {
      resolve('hola mundo');
    } else {
      reject('error');
    }

  });
  getUsers(): Promise<any> {
    const url = 'https://reqres.in/api/users';
    return new Promise((resolve) => {
      fetch(url)
        .then((res) => res.json())
        .then((body) => resolve(body.data));
    });
  }



}
