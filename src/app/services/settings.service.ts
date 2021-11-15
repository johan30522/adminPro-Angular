import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');



  constructor() {
    this.setTheme();
  }


  public setTheme(): void {

    let linkthemeLocal = localStorage.getItem("theme") || `./assets/css/colors/default-dark.css`;

    this.linkTheme?.setAttribute('href', linkthemeLocal);


  }

  public changeTheme(strColor: string): void {

    let url: string = `./assets/css/colors/${strColor}.css`;
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);


  }
  public checkCurrentTheme(): void {

    let links = document.querySelectorAll('.selector');

    links.forEach(element => {
      element.classList.remove('working');
      let btnTheme = element.getAttribute('data-theme');
      let btnThemeURL = `./assets/css/colors/${btnTheme}.css`;
      let currentTheme = this.linkTheme?.getAttribute('href');
      if (btnThemeURL === currentTheme) {
        element.classList.add('working');
      }
    });
  }




}
