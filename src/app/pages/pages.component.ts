import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function customInitFunctions():any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit, AfterViewInit {


  constructor(
    private readonly settingsService: SettingsService

  ) { }
  ngAfterViewInit(): void {
    customInitFunctions();
  }

  ngOnInit(): void {
    // customInitFunctions();

  }


  
}
