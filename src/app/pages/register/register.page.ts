import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

import { AppHeaderComponent } from '../../components/app-header.component';
import { AppFooterComponent } from '../../components/app-footer.component';

import { Router } from '@angular/router';
import {
  AlertController,
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonSelect,
    IonSelectOption,
    AppHeaderComponent,
    AppFooterComponent
  ],
})
export class RegisterPage {

  nome: string = '';
  email: string = '';
  telefone: string = '';
  tipoSanguineo: string = '';
  senha: string = '';

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async registrar() {
  if (!this.nome || !this.email || !this.telefone || !this.tipoSanguineo || !this.senha) {
    this.exibirAlerta('Preencha todos os campos.');
    return;
  }
  console.log(this.email)
  const alertLoading = await this.alertCtrl.create({
    message: 'Criando conta...',
    backdropDismiss: false
  });
  await alertLoading.present();

  try {
    const cred = await createUserWithEmailAndPassword(this.auth, this.email, this.senha);
    
    const uid = cred.user?.uid;

    await setDoc(doc(this.firestore, 'users', uid!), {
      uid,
      nome: this.nome,
      email: this.email,
      telefone: this.telefone,
      tipo_sanguineo: this.tipoSanguineo,
      isAdmin: false,
    });

    await alertLoading.dismiss();
    this.exibirAlerta('Conta criada com sucesso!', true);
    this.router.navigate(['/home']);

  } catch (err: any) {
    await alertLoading.dismiss();
    this.exibirAlerta(err.message || 'Erro ao criar conta.');
  } }
  async exibirAlerta(mensagem: string, sucesso = false) {
    const alert = await this.alertCtrl.create({
      header: sucesso ? 'Sucesso' : 'Atenção',
      message: mensagem,
      buttons: ['OK'],
    });
    await alert.present();
  } }

