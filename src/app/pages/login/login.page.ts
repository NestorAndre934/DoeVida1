import { Component, inject } from '@angular/core';
import { IonicModule, MenuController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AppHeaderComponent } from '../../components/app-header.component';
import { AppFooterComponent } from '../../components/app-footer.component';

import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

import { collection, collectionData, Firestore, query, where } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, AppHeaderComponent, AppFooterComponent],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email = '';
  senha = '';
  private firestore = inject(Firestore);
  users$: any;

  constructor(
    private router: Router,
    private menu: MenuController,
    private auth: Auth,
    private toastController: ToastController
  ) {}

  ionViewDidEnter() {
    this.menu.enable(false);
  }

  async login() {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, this.email, this.senha);

      const usersRef = collection(this.firestore, 'users');
      const q = query(usersRef, where('email', '==', this.email));
      this.users$ = collectionData(q, { idField: 'id' });

      this.users$.subscribe((dados: any[]) => {
        if (dados.length > 0) {
          const usuario = dados[0];
          localStorage.setItem('nome_usuario', usuario.nome || '');
          localStorage.setItem('isAdmin', usuario.isAdmin ? 'true' : 'false');
          localStorage.setItem('usuarioLogado', 'true');
          localStorage.setItem('email_usuario', this.email);
          localStorage.setItem('nome', usuario.nome || '');


          this.menu.enable(true);
          this.router.navigate(['/home']);
          this.showToast('Login bem-sucedido!');
        } else {
          this.showToast('Usuário não encontrado no Firestore.');
        }
      });

    } catch (error: any) {
      console.error('Erro ao fazer login:', error.message);
      this.showToast('Email ou senha incorretos.');
    }
  }

  register() {
    this.router.navigate(['/register']);
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'primary'
    });
    toast.present();
  }
}
