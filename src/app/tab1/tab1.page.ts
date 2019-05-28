import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { Router } from '@angular/router';
import { DataService } from '../service/data/data.service';
import { forEach } from '@angular/router/src/utils/collection';
//import * as pluginAnnotations from 'chartjs-plugin-annotation';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  dashboard: any;
  dashboard$: any;

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Reclamaciones abiertas' },
    { data: [], label: 'Reclamaciones cerradas' }
  ];
  public lineChartLabels: Label[] = [];
 
 
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
  
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{
        stacked : true
      }],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          stacked: true

        },
        {
          id: 'y-axis-1',

          position: 'right',
          stacked: true,
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }, 
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'bar',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
 /* public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];*/
  public lineChartLegend = true;
  public lineChartType = 'bar';
 // public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;


  constructor(public data: DataService, private router: Router) { }

  initDashboard(){
    console.log('Inicializando initDashboard');
    this.dashboard$ = this.data.dashboardGet().subscribe((data:any) => {
      this.dashboard = data;
      let instalacion; 

      data.forEach ((item, index) => {
        console.log(item); 
        let totalReclamaciones = item.totalReclamaciones; 
        let reclamacionesCerradas = item.reclamacionesCerradas; 
        let reclamacionesAbiertas = totalReclamaciones - reclamacionesCerradas; 
        let codigoInstalacion = item.codInstalacion;
        this.lineChartLabels.push(codigoInstalacion); 
        this.lineChartData[0].data.push(reclamacionesAbiertas); 
        this.lineChartData[1].data.push(reclamacionesCerradas); 
        console.log(reclamacionesAbiertas); 
      }); 
    });
    console.log(this.dashboard);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad"); 
  }

  ionViewWillLoad()  {
    console.log("ionViewWillLoad"); 
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }

  inViewWillLeave(){
    console.log("will leave"); 
  }

  inViewWillUnload(){
    console.log("will unload"); 
  }

  inViewDidLeave(){
    console.log("did leave"); 
  }

  ngOnInit() {
    /* console.log('Inicializando ngOnInit');
    await this.initDashboard(); */
    this.initDashboard(); 
  }

  clickGrafico(label : string){
    this.dashboard$.unsubscribe();
    console.log(this.dashboard$); 
    this.router.navigate(['donut', label]); 
  }
  // events
  public chartClicked(e: any): void {
    if (e.active.length > 0) {
    const chart = e.active[0]._chart;
    const activePoints = chart.getElementAtEvent(e.event);
    const positionLabel =  chart.tooltip._active[0]._datasetIndex;
    const dataSet = this.lineChartData[positionLabel].label;
    if ( activePoints.length > 0) {
        // get the internal index of slice in pie chart
        const clickedElementIndex = activePoints[0]._index;
        const label = chart.data.labels[clickedElementIndex];
        // get value by index
        const value = chart.data.datasets[0].data[clickedElementIndex];
        console.log(dataSet, label, value)
        this.clickGrafico(label); 
     }
    }
  }
  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //  console.log(event, active);
  }

}
