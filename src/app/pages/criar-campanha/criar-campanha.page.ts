import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

import { AppHeaderComponent } from '../../components/app-header.component';
import { AppFooterComponent } from '../../components/app-footer.component';

@Component({
  selector: 'app-criar-campanha',
  standalone: true,
  templateUrl: './criar-campanha.page.html',
  styleUrls: ['./criar-campanha.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule, AppHeaderComponent, AppFooterComponent],
})
export class CriarCampanhaPage {

  titulo = '';
  local = '';
  data = new Date().toISOString().split('T')[0]; //
  descricao = ''; // 🔹 Adicionado

  constructor(
    private firestore: Firestore,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async salvarCampanha() {
    if (!this.titulo || !this.local || !this.data) {
      this.exibirAlerta('Preencha todos os campos obrigatórios.');
      return;
    }

    const campanha = {
      titulo: this.titulo,
      local: this.local,
      data: this.data,
      descricao: this.descricao || '', // 🔹 Incluído no objeto
      criado_em: new Date().toISOString()
    };

    try {
      const colRef = collection(this.firestore, 'campanhas');
      await addDoc(colRef, campanha);

      this.exibirAlerta('Campanha criada com sucesso!', true);
      this.router.navigate(['/campanhas']);
    } catch (error) {
      this.exibirAlerta('Erro ao criar campanha.');
      console.error(error);
    }
  }

  async exibirAlerta(msg: string, sucesso = false) {
    const alert = await this.alertCtrl.create({
      header: sucesso ? 'Sucesso' : 'Atenção',
      message: msg,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
