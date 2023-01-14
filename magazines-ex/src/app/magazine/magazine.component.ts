import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchDataService } from '../fetch-data.service';
import { czasopisma } from '../magazines-list/magazines-list.component';

@Component({
  selector: 'app-magazine',
  templateUrl: './magazine.component.html',
  styleUrls: ['./magazine.component.css'],
})
export class MagazineComponent implements OnInit {
  public magazineName: string = '';
  ngOnInit(): void {
    if (
      !this._api.magazinesCover.some(
        (val) =>
          //@ts-ignore
          val.klik.text == this._routeDetails.snapshot.paramMap.get('magazine')
      )
    ) {
      console.log('Redirecting...');
      this._router.navigateByUrl('/');
    }
    this.magazineName = this._routeDetails.snapshot.paramMap.get('magazine')!;
  }
  constructor(
    private _routeDetails: ActivatedRoute,
    private _api: FetchDataService,
    private _router: Router
  ) {}
}
