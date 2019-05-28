import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.page.html',
  styleUrls: ['./donut.page.scss'],
})
export class DonutPage implements OnInit {

  constructor(private route : ActivatedRoute) { }
  public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: MultiDataSet = [
    [350, 450, 100],
    [50, 150, 120],
    [250, 130, 70],
  ];
  public doughnutChartType: ChartType = 'doughnut';

  ngOnInit() {
    this.route.paramMap.subscribe (params => {
      console.log('params: ', params); 
    })
  }
  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
