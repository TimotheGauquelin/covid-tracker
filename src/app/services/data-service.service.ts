import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GlobalDataSummary } from '../models/global-data';
import { templateSourceUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private globalDataUrl =`http://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/04-03-2020.csv`
  constructor(private http: HttpClient) { }

  getGlobalData() {
    return this.http.get(this.globalDataUrl, {responseType : 'text'}).pipe(
      map(result => {
        let data: GlobalDataSummary[] = [];
        //Split CSV Data
        let raw = {}
        let rows = result.split('\n');
        rows.splice(0, 1);
        rows.forEach(row=> {
          let cols = row.split(/,(?=\S)/)
            //Take desired data
          let cs = {
            country: cols[3],
            confirmed: +cols[7],
            deaths: +cols[8],
            recovered: +cols[9],
            active: +cols[10],
          };
          let temp : GlobalDataSummary = raw[cs.country];
          if(temp) {
            temp.active = cs.active + temp.active
            temp.confirmed = cs.confirmed + temp.confirmed
            temp.deaths = cs.deaths + temp.deaths
            temp.recovered = cs.recovered + temp.recovered
          
            raw[cs.country] = temp;

          } else {

            raw[cs.country] = cs;

          }

        })

         console.log(data);

         return <GlobalDataSummary[]>Object.values(raw);
      }) 
    );
  }
}

//40.00 https://www.youtube.com/watch?time_continue=6194&v=hPJMa1A-VNg&feature=emb_title