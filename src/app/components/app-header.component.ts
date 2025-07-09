import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IonicModule],
  template: `
    <ion-header>
      <ion-toolbar color="danger">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>

        <ion-title>DoeVida</ion-title>

        <ion-buttons slot="end">
          <div style="display: flex; flex-direction: column; align-items: center; margin-top: -4px;">
            <ion-button fill="clear" size="small" style="height: 32px; padding: 0;" (click)="goProfile()">
              <ion-icon name="person-circle-outline" style="font-size: 24px;"></ion-icon>
            </ion-button>
            <span style="font-size: 12px; color: white; line-height: 1;">{{ nome ? nome : 'Login' }}</span>
          </div>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>


  `,
})
export class AppHeaderComponent {
  nome: string | undefined;

  constructor(private router: Router, private toast: ToastController) {
    const nomeCompleto = localStorage.getItem('nome_usuario') || '';
    this.nome = nomeCompleto.split(' ')[0]; // Pega o primeiro nome
  }

  goProfile() {
    const isLogged = localStorage.getItem('usuarioLogado');

    console.log('Nome do usuário:', this.nome);
    if (isLogged) {
      this.router.navigate(['/perfil']);
    } else {
      this.toast.create({
        message: 'Faça o login para acessar o perfil.',
        duration: 2000,
        color: 'danger',
      }).then(t => t.present());

      this.router.navigate(['/login']);
    }
  }
}

/*

  <ion-menu contentId="main-content" side="start">
    <ion-header>
      <ion-toolbar color="danger">
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item button routerLink="/home">
          <ion-icon name="home-outline" slot="start"></ion-icon>
          <ion-label>Início</ion-label>
        </ion-item>
        <ion-item button routerLink="/campanhas">
          <ion-icon name="heart-outline" slot="start"></ion-icon>
          <ion-label>Campanhas</ion-label>
        </ion-item>
        <ion-item button routerLink="/solicitacoes">
          <ion-icon name="alert-circle-outline" slot="start"></ion-icon>
          <ion-label>Solicitações</ion-label>
        </ion-item>
        <ion-item button routerLink="/sobre">
          <ion-icon name="information-circle-outline" slot="start"></ion-icon>
          <ion-label>Sobre</ion-label>
        </ion-item>
        <ion-item button (click)="logout()">
          <ion-icon name="log-out-outline" slot="start"></ion-icon>
          <ion-label>Sair</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>


*/
