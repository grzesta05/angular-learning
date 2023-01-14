import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchDataService } from '../fetch-data.service';

type year = {};
@Component({
  selector: 'app-numbers-menu',
  templateUrl: './numbers-menu.component.html',
  styleUrls: ['./numbers-menu.component.css'],
})
export class NumbersMenuComponent implements OnInit {
  @Input() magazine!: string;
  public yearsData: string[] = [];
  public clicked: number | null = null;

  public fuckGoBack() {
    this._router.navigate(['../'], { relativeTo: this.route });
  }
  constructor(
    private _api: FetchDataService,
    private _router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.yearsData = this._api.getYearByMagazine(this.magazine);
  }

  public displayNumbers(number: string) {
    this._router.navigate([number], { relativeTo: this.route });
    this.clicked = this.yearsData.findIndex((val) => val == number);
    if (this.clicked == -1) {
      this.clicked = this.yearsData.length + 1;
    }
  }
}
