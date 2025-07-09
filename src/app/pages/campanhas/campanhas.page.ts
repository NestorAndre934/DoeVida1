import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, AlertController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { deleteDoc, doc } from '@angular/fire/firestore';
import { EMPTY, Observable } from 'rxjs';

import { AppHeaderComponent } from '../../components/app-header.component';
import { AppFooterComponent } from '../../components/app-footer.component';

@Component({
  selector: 'app-campanhas',
  templateUrl: './campanhas.page.html',
  styleUrls: ['./campanhas.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    RouterModule,
    CommonModule,
    AppHeaderComponent,
    AppFooterComponent
  ]
})


export class CampanhasPage {
  campanhas$: Observable<any[]> = EMPTY;
  campanhaSelecionada: any = null;
  private firestore = inject(Firestore);
  isAdmin: boolean | undefined;


  constructor(private router: Router, private alertCtrl: AlertController) {}

  ngOnInit() {
    const col = collection(this.firestore, 'campanhas');
    this.campanhas$ = collectionData(col, { idField: 'id' });
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';

  }


  toggleDetalhes(campanha: any) {
    this.campanhaSelecionada =
      this.campanhaSelecionada?.id === campanha.id ? null : campanha;
  }

  criarCampanha() {
    this.router.navigate(['/criar-campanha']);
  }

  async deletarCampanha(campanhaId: string) {
  const confirm = await this.alertCtrl.create({
    header: 'Confirmar',
    message: 'Tem certeza que deseja excluir esta campanha?',
    buttons: [
      { text: 'Cancelar', role: 'cancel' },
      {
        text: 'Excluir',
        role: 'destructive',
        handler: async () => {
          try {
            const docRef = doc(this.firestore, 'campanhas', campanhaId);
            await deleteDoc(docRef);
            this.campanhaSelecionada = null;
          } catch (error) {
            console.error('Erro ao deletar campanha:', error);
          }
        },
      },
    ],
  });

  await confirm.present();
}}
