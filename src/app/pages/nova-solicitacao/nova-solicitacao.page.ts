import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

import { AppHeaderComponent } from '../../components/app-header.component';
import { AppFooterComponent } from '../../components/app-footer.component';

@Component({
  selector: 'app-nova-solicitacao',
  standalone: true,
  templateUrl: './nova-solicitacao.page.html',
  styleUrls: ['./nova-solicitacao.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule, AppHeaderComponent, AppFooterComponent],
})
export class NovaSolicitacaoPage {

  tipoSanguineo: string = '';
  hospital: string = '';
  descricao: string = '';
  email_usuario = localStorage.getItem('email_usuario');

  constructor(
    private firestore: Firestore,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async salvar() {
    if (!this.tipoSanguineo || !this.hospital || !this.descricao) {
      this.exibirAlerta('Preencha todos os campos.');
      return;
    }

    const solicitacao = {
      tipo_sanguineo: this.tipoSanguineo,
      hospital: this.hospital,
      descricao: this.descricao,
      data: new Date().toLocaleDateString(),
      status: 'Pendente',
      email: this.email_usuario || '',
    };

    try {
      const colRef = collection(this.firestore, 'solicitacoes');
      await addDoc(colRef, solicitacao);

      // Chama o backend Node.js para notificar todos os usuários
      await fetch('http://localhost:3000/nova-solicitacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo_sanguineo: this.tipoSanguineo,
          hospital: this.hospital,
          descricao: this.descricao
        })
      });

      this.exibirAlerta('Solicitação criada e notificação enviada!', true);
      this.router.navigate(['/home']);

    } catch (err) {
      console.error(err);
      this.exibirAlerta('Erro ao criar solicitação ou enviar notificação.');
    }
  }

  async exibirAlerta(mensagem: string, sucesso = false) {
    const alert = await this.alertCtrl.create({
      header: sucesso ? 'Sucesso' : 'Atenção',
      message: mensagem,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
