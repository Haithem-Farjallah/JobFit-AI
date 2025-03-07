import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { environment } from 'environments/environment.development';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.css',
})
export class ProfileHeaderComponent implements OnChanges {
  formattedDate!: string;
  @Input() userDetails: any;
  @Output() openFormEvent = new EventEmitter<void>();

  private profilepicsUrl = environment.profilepicsUrl;
  ngOnChanges() {
    this.userDetails = {
      ...this.userDetails,
      image_url: this.profilepicsUrl + this.userDetails.image_url,
    };
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    };
    this.formattedDate = new Date(
      this.userDetails.created_at
    ).toLocaleDateString('en-US', options);
  }
  openForm() {
    this.openFormEvent.emit();
  }
}
