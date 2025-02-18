import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  standalone: true,
  template: `
    <h2>Login Result</h2>
    <p>{{ data.message }}</p>
    <button mat-button (click)="close()">Close</button>
  `,
  styles: [`
    h2 { color: darkblue; }
    p { font-size: 16px; }
    button { margin-top: 10px; }
  `]
})
export class PopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string },
  private dialogRef: MatDialogRef<PopupComponent>
) {}

  close() {
    this.dialogRef.close(true);  // Close the popup
   
  }
}
