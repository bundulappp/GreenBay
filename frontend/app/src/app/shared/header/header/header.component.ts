import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  username: string;
  userDollar: number;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUserDetails().subscribe((x) => {
      this.username = x.username;
      this.userDollar = x.dollar;
    });
  }

  logout(): void {
    this.authenticationService.logout();
  }
}
