import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { doc, deleteDoc } from '@angular/fire/firestore';
import { AppHeaderComponent } from '../../components/app-header.component';
import { AppFooterComponent } from '../../components/app-footer.component';

import { Auth } from '@angular/fire/auth';
import { Firestore, collection, query, where, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-solicitacoes',
  templateUrl: './solicitacoes.page.html',
  styleUrls: ['./solicitacoes.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    AppHeaderComponent,
    AppFooterComponent
  ]
})
export class SolicitacoesPage implements OnInit {
  minhasSolicitacoes$!: Observable<any[]>;
  outrasSolicitacoes$!: Observable<any[]>;
  itemSelecionadoId: string | null = null;

  emailUsuario: string = '';

  constructor(
    private router: Router,
    private firestore: Firestore,
    private auth: Auth,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    const email = localStorage.getItem('email_usuario');
    if (!email) {
      console.warn('Nenhum usuário logado.');
      return;
    }

    this.emailUsuario = email;

    const solicitacoesRef = collection(this.firestore, 'solicitacoes');

    const minhasQuery = query(solicitacoesRef, where('email', '==', email));
    this.minhasSolicitacoes$ = collectionData(minhasQuery, { idField: 'id' });

    const outrasQuery = query(solicitacoesRef, where('email', '!=', email));
    this.outrasSolicitacoes$ = collectionData(outrasQuery, { idField: 'id' });
  }

  abrirDetalhes(solicitacao: any) {
    this.itemSelecionadoId = this.itemSelecionadoId === solicitacao.id ? null : solicitacao.id;
  }

  async deletarSolicitacao(id: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: 'Tem certeza que deseja deletar esta solicitação?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Deletar',
          handler: async () => {
            await deleteDoc(doc(this.firestore, 'solicitacoes', id));
            this.itemSelecionadoId = null;
          },
        },
      ],
    });

    await alert.present();
  }

  novaSolicitacao() {
    this.router.navigate(['/nova-solicitacao']);
  }
}
