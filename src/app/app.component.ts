import { Component, effect } from '@angular/core';
import { IonicModule, MenuController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  isAdmin: boolean | undefined;
  nomeUsuario: string | undefined;

  constructor(private menu: MenuController, private router: Router, private toast: ToastController) {
    this.controlarMenu();
  }

  // Função que controla quando o menu estará habilitado
  controlarMenu() {
    this.menu.enable(false); // Desabilita o menu inicialmente

    // Escuta mudança de rota
    this.router.events.subscribe(() => {
      const rota = this.router.url;
      if (rota.includes('login') || rota === '/home') {
        this.menu.enable(false);
      } else {
        this.menu.enable(true);
      }
    });
  }

  sobre() {
    this.menu.close();
    this.router.navigate(['/sobre']);
  }

  logout() {
    this.menu.close();
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('email_usuario');
    localStorage.removeItem('nome_usuario');
    this.atualizarStatusAdmin();
    this.router.navigate(['/login']);
  }
  atualizarStatusAdmin() {
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
  }
  atualizarNomeUsuario() {
    this.nomeUsuario = localStorage.getItem('nome_usuario') || '';
  }
  home() {
    this.menu.close();
    this.router.navigate(['/home']);
  }
  campanha() {
    const isLogged = localStorage.getItem('usuarioLogado');

    if (isLogged) {
      this.menu.close();
      this.router.navigate(['/campanhas']);
    } else {
      this.toast.create({
        message: 'Faça o login para acessar as campanhas.',
        duration: 2000,
        color: 'danger',
      }).then(t => t.present());

      this.router.navigate(['/login']);
    }

  }
  solicitacao() {

    const isLogged = localStorage.getItem('usuarioLogado');

    if (isLogged) {
      this.menu.close();
      this.router.navigate(['/solicitacoes']);
    } else {
      this.toast.create({
        message: 'Faça o login para acessar as solicitações.',
        duration: 2000,
        color: 'danger',
      }).then(t => t.present());

      this.router.navigate(['/login']);
    }
  }
}
