import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchDataService } from '../fetch-data.service';

type numberMagazine = {
  [key: string]: any;
};
@Component({
  selector: 'app-numbers-list',
  templateUrl: './numbers-list.component.html',
  styleUrls: ['./numbers-list.component.css'],
})
export class NumbersListComponent implements OnInit {
  private magazineName: string = '';
  private magazineYear: string = '';
  public numbersList: any[] = [];

  constructor(
    private _api: FetchDataService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  getImageLink(obj: any) {
    return (
      'http://atarionline.pl/biblioteka/czasopisma/' +
      this.getTextProp(obj, 'nazwa').replace(' ', '_') +
      '/' +
      this.getTextProp(obj, 'miniaturka')
    );
  }

  getFileLink(obj: any) {
    return (
      'http://atarionline.pl/biblioteka/czasopisma/' +
      this.getTextProp(obj, 'nazwa').replace(' ', '_') +
      '/' +
      this.getTextProp(obj, 'plik')
    );
  }

  getTextProp = (obj: any, propName: string) => {
    if (obj[propName] == undefined) {
      return '';
    } else {
      return obj[propName]['text'];
    }
  };

  checkIfEmpty = (num: any) => {
    return num['attr']['brak'] != undefined;
  };

  ngOnInit(): void {
    this.magazineName =
      this._route.snapshot.pathFromRoot[1].paramMap.get('magazine')!;

    if (this._api.magazinesYears[this.magazineName as keyof object]) {
      this._route.params.subscribe((value) => {
        this.magazineYear = value['year'];

        if (
          this._api
            .getYearByMagazine(this.magazineName)
            .find((val: string) => val == this.magazineYear) ||
          this.magazineYear == 'all'
        ) {
          const numberObj: any =
            this._api.data[this.magazineName as keyof Object];
          delete numberObj.text;

          this.numbersList = Object.entries(numberObj).map(
            (val) => val.slice(1)[0]
          );
          if (this.magazineYear == 'all') {
            return;
          }
          this.numbersList = this.numbersList.filter(
            (val: any) => val.attr.rok == this.magazineYear
          );
          console.log(this.numbersList);
        }
      });
    }
  }
}
