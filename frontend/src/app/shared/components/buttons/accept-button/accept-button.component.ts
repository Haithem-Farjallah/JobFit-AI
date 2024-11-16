import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-accept-button',
  templateUrl: './accept-button.component.html',
  styleUrl: './accept-button.component.css',
})
export class AcceptButtonComponent {
  @Input() value!: string;
}
