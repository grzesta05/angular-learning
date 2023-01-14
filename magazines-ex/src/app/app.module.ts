import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MagazinesListComponent } from './magazines-list/magazines-list.component';
import { MagazineComponent } from './magazine/magazine.component';
import { AppRoutingModule } from './app-routing.module';
import { FetchDataService } from './fetch-data.service';
import { NumbersMenuComponent } from './numbers-menu/numbers-menu.component';

import { NumberComponent } from './number/number.component';
import { NumbersListComponent } from './numbers-list/numbers-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MagazinesListComponent,
    MagazineComponent,
    NumbersMenuComponent,
    NumberComponent,
    NumbersListComponent,
  ],
  imports: [AppRoutingModule, BrowserModule, FormsModule, HttpClientModule],
  providers: [FetchDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
