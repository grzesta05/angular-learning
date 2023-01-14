import { Component, OnInit } from '@angular/core';
import { FetchDataService } from './fetch-data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public showMagazines: boolean = false;

  ngOnInit(): void {
    setInterval(() => {
      this.time = Date.now();
    }, 100);
  }

  public title: string = 'magazines-ex';
  public time: number = Date.now();
  public input: string = '';

  constructor(
    _fetchData: FetchDataService,
    private route: ActivatedRoute,
    private _router: Router
  ) {}

  validateInput = (event: KeyboardEvent) => {
    if (
      (this.input.includes('.') && event.key == '.') ||
      (this.input.length == 0 && event.key == '.') ||
      (isNaN(Number(event.key)) && event.key != '.') ||
      event.key == ' '
    ) {
      event.preventDefault();
    }
  };
}
