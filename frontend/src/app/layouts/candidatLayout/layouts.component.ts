import { Component } from '@angular/core';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.css',
})
export class LayoutsComponent {
  isAuthenticated: boolean = false;
  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
  }
}
