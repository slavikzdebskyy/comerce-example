import {Component, OnInit} from '@angular/core';
import {CrudService} from '../../services/crud.service';
import {ActivatedRoute, Router} from '@angular/router';
import {pluck, switchMap} from 'rxjs/operators';
import {Car} from '../../interfaces/car.interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  public cars: Car[];

  constructor(
    private crudService: CrudService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.paramMap
      .pipe(
        pluck('params', 'cat'),
        switchMap((param) => this.crudService.getFilteredCars(param)),
      )
      .subscribe(
        (cars: Car[]) =>  this.cars = cars,
      );


  }

  public redirectToCar(id: number): void {
    this.router.navigate(['car', id]);
  }
}
