import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  

  @ViewChild('mydatatable') mydatatable: any;

  count: number = 50;
  rows: any[] = [];
  active: boolean = true;
  temp: any[] = [];
  cols: any = [
    'name', 'gender', 'company'
  ];

  constructor(private cd: ChangeDetectorRef) {
    this.fetch((data) => {
      this.rows = data.map(d => {
        d.updated = Date.now().toString();
        return d;
      });

      this.temp = [...this.rows];
    });

    this.start();
  }

  randomNum(start: number, end: number): number {
    return Math.floor(Math.random() * end) + start;
  }

  start(): void {
    if(!this.active) return;

    setTimeout(this.updateRandom.bind(this), 50);
  }

  stop(): void {
    this.active = false;
  }

  add() {
    this.rows.splice(0, 0, this.temp[this.count++]);
  }

  remove() {
    this.rows.splice(0, this.rows.length);
  }

  updateRandom() {
    const rowNum = this.randomNum(0, 5);
    const cellNum = this.randomNum(0, 3);
    const newRow = this.randomNum(0, 100);
    const prop = this.cols[cellNum];
    const rows = this.rows;

    if(rows.length) {
      const row = rows[rowNum];
      row[prop] = rows[newRow][prop];
      row.updated = Date.now().toString();
    }

    this.rows = [...this.rows];

    // this.cd.markForCheck();
    // this.mydatatable.update();
    this.start();
  }

  fetch(cb: any): void {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }


}
