import { Component, OnInit } from '@angular/core';
import {CrudService} from '../../services/crud.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss']
})
export class NavListComponent {

  public models: Observable<any>;

  constructor(private crudService: CrudService) {
    this.models = this.crudService.navList;
  }

}
