import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

@Input('totalConfirmed') totalConfirmed;
@Input('totalDeaths') totalDeaths;
@Input('totalActive') totalActive;
@Input('totalRecovered') totalRecovered;

  constructor() { }

  ngOnInit(): void {
  }

}
