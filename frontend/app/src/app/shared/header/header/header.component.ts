import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userNameObservable$ = this.authenticationService.userNameObservable$;
  userDollar: number;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUserDollar().subscribe((x) => {
      this.userDollar = x.dollar;
    });
  }

  logout(): void {
    this.authenticationService.logout();
  }
}
