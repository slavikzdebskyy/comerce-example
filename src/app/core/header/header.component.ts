import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {User} from '../../interfaces/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Output()
  public toggleSideNav: EventEmitter<void>;

  public isLogined$: BehaviorSubject<boolean>;
  public user$: BehaviorSubject<User>;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.toggleSideNav = new EventEmitter<void>();
    this.isLogined$ = this.authService.isLogined$;
    this.user$ = this.authService.user$;
  }

  public logOut(): void {
    this.authService.logOut();
    this.router.navigate(['']);
  }


}
