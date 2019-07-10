import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Modules
import { AppRoutingModule } from './app-routing.module';
import { LoginModule }  from './pages/login/login.module';
import { SharedModule } from './shared/shared.module';
import { MainModule } from './main/main.module';
import { CoreModule } from './core/core.module';
import { AngularDraggableModule } from 'angular2-draggable';

import { FullLayoutComponent } from './layouts/full-layout.component'; 

import { DataService } from './DataService';

@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    LoginModule,
    MainModule,
    CoreModule,
    AngularDraggableModule
  ],
  providers: [ DataService ],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
