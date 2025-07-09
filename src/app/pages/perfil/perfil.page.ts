import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { AppHeaderComponent } from '../../components/app-header.component';
import { AppFooterComponent } from '../../components/app-footer.component';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { collection, collectionData, Firestore, query, where } from '@angular/fire/firestore';

@Component({
  selector: 'app-perfil',
  standalone: true,
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  imports: [
    IonicModule, CommonModule, FormsModule,
    AppHeaderComponent, AppFooterComponent
  ]
})
export class PerfilPage implements OnInit {

  nome = '';
  email = '';
  telefone = '';
  fotoPerfil = 'assets/images.jpeg';

  private auth = inject(Auth);
  private firestore = inject(Firestore);
  users$: any;
  isAdmin: boolean | undefined;

  constructor(private alertCtrl: AlertController, private router: Router) {}

 ngOnInit() {
  const email_usuario = localStorage.getItem('email_usuario');

  if (email_usuario) {
    this.email = email_usuario;

    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('email', '==', email_usuario));

    this.users$ = collectionData(q, { idField: 'id' });

    this.users$.subscribe((dados: any[]) => {
      if (dados.length > 0) {
        const usuario = dados[0];
        this.nome = usuario.nome || '';
        this.telefone = usuario.telefone || '';
      }
    });
  }
}


  async editarPerfil() {
    const alert = await this.alertCtrl.create({
      header: 'Editar Perfil',
      inputs: [
        { name: 'nome', type: 'text', placeholder: 'Nome', value: this.nome },
        { name: 'telefone', type: 'text', placeholder: 'Telefone', value: this.telefone }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Salvar', handler: (data) => {
            this.nome = data.nome;
            this.telefone = data.telefone;
          }
        }
      ]
    });
    await alert.present();
  }
  atualizarStatusAdmin() {
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
  }
  logout() {
   // this.menu.close();
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('email_usuario');
    localStorage.removeItem('nome_usuario');
    this.atualizarStatusAdmin();
    this.router.navigate(['/login']);
  }
}
