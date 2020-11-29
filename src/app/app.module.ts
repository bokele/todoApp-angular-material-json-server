import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material/material.module';
import { HomeModule } from './home/home.module';
import { ActionModule } from './action/action.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { AuthModule } from './auth/auth.module';




@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    CommonModule,
    MaterialModule,
    HomeModule,
    ActionModule,
    AuthModule,
    AppRoutingModule,


  ],
  exports:[MaterialModule],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
