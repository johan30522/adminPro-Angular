import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';



import { AppRoutingModule } from './app-rounting.module';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';


import { AuthModule } from './auth/auth.module';




@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    PagesModule,
    AuthModule

  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
