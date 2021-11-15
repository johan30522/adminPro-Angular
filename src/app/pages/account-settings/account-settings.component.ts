import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {


  constructor(
    private readonly settingsService: SettingsService
  ) { }

  ngOnInit(): void {

    this.settingsService.checkCurrentTheme();
  }


  public changeTheme(strColor: string): void {

    this.settingsService.changeTheme(strColor);
    this.settingsService.checkCurrentTheme();

  }

}
