import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { AppHeaderComponent } from '../../components/app-header.component';
import { AppFooterComponent } from '../../components/app-footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    AppHeaderComponent,
    AppFooterComponent,

  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  campanhas$!: Observable<any[]>;
  solicitacoes$!: Observable<any[]>;

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: {
      delay: 3000,
    },
    loop: true
  };

  constructor(
    private router: Router,
    private firestore: Firestore
  ) {}

  ngOnInit() {
    this.buscarCampanhas();
    this.buscarSolicitacoes();
  }

  buscarCampanhas() {
    const col = collection(this.firestore, 'campanhas');
    this.campanhas$ = collectionData(col, { idField: 'id' });
  }

  buscarSolicitacoes() {
    const col = collection(this.firestore, 'solicitacoes');
    this.solicitacoes$ = collectionData(col, { idField: 'id' });
  }

  verTodasCampanhas() {
  this.router.navigate(['/campanhas']);
}

verTodasSolicitacoes() {
  this.router.navigate(['/solicitacoes']);
}

  irParaPerfil() {
    this.router.navigate(['/perfil']);
  }
}
