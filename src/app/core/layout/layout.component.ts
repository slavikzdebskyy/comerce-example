import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  public opened: boolean;

  constructor() {
    this.opened = true;
  }

  ngOnInit() {
  }

  public toggleSideNav(event): void {
    if (event === undefined) {
      this.opened = !this.opened;
      return;
    }
    this.opened = event;

  }

}
