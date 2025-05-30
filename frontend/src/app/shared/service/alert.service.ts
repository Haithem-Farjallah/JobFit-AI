import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private snackBar: MatSnackBar) {}
  showMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // 5 seconds
      verticalPosition: 'top', // 'top' | 'bottom'
      panelClass: ['snackbar-custom'], // Add custom class for styling
    });
  }
}
