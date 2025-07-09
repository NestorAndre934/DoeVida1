// src/app/components/app-footer.component.ts
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [IonicModule],
  template: `
    <ion-footer>
      <ion-toolbar color="danger">
        <ion-title size="small">DoeVida &copy; 2025</ion-title>
      </ion-toolbar>
    </ion-footer>
  `
})
export class AppFooterComponent {}
