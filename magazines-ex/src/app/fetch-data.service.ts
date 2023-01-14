// @ts-nocheck
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxXmlToJsonService } from 'ngx-xml-to-json';

@Injectable({
  providedIn: 'root',
})
export class FetchDataService {
  readonly data: object = {};
  readonly magazinesCover = [];
  readonly magazinesYears = {};
  readonly magazinesInfo = {};

  private formatData(dataInput: object) {
    this.data = dataInput;

    delete this.data.text;
    delete this.data.zmienne.text;
    console.log(this.data);
    //add titles
    for (const [o, a] of Object.entries(this.data.zmienne)) {
      delete a.text;
      this.magazinesCover.push(a);
      this.magazinesYears[o] = this.data.lata[o].text.split(',');
    }
    delete dataInput.zmienne;
    delete dataInput.lata;
    this.magazinesInfo = dataInput;
    console.log(this.magazinesInfo);
  }
  public getYearByMagazine(magazineName: string) {
    return this.magazinesYears[magazineName];
  }
  constructor(
    private ngxXmlToJsonService: NgxXmlToJsonService,
    private httpClient: HttpClient
  ) {
    this.fetch();
  }

  public fetch() {
    const options = {
      // set up the default options
      textKey: 'text', // tag name for text nodes
      attrKey: 'attr', // tag for attr groups
      cdataKey: 'cdata', // tag for cdata nodes (ignored if mergeCDATA is true)
    };
    this.httpClient
      .get('https://mendela.pl/3web/czasopisma.xml', {
        responseType: 'text',
      })
      .subscribe((val) => {
        this.formatData(
          this.ngxXmlToJsonService.xmlToJson(val, options).czasopisma
        );
      });
  }
}
