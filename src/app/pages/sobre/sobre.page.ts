import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AppHeaderComponent } from '../../components/app-header.component';
import { AppFooterComponent } from '../../components/app-footer.component';

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [CommonModule, IonicModule, AppHeaderComponent, AppFooterComponent],
  templateUrl: './sobre.page.html',
  styleUrls: ['./sobre.page.scss'],
})
export class SobrePage {}
