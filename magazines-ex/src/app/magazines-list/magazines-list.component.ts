import { Component, OnInit } from '@angular/core';
import { NgxXmlToJsonComponent, NgxXmlToJsonService } from 'ngx-xml-to-json';
import { FetchDataService } from '../fetch-data.service';
import { Router } from '@angular/router';
import { MagazineComponent } from '../magazine/magazine.component';
export type czasopisma = {
  src: { text: string };
  klik: { text: string };
};

@Component({
  selector: 'app-magazines-list',
  templateUrl: './magazines-list.component.html',
  styleUrls: ['./magazines-list.component.css'],
})
export class MagazinesListComponent implements OnInit {
  public data: czasopisma[] = [];

  constructor(
    private _router: Router,
    private _fetch_data: FetchDataService,
    private ngxXmlToJsonService: NgxXmlToJsonService
  ) {}

  ngOnInit(): void {
    this.data = this._fetch_data.magazinesCover as czasopisma[];
    console.log(this.data);
  }
  public click(selected: number) {
    console.log(selected);
    this._router.navigateByUrl('/' + this.data[selected].klik.text);
  }
}
