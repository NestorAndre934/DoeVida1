import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'campanhas',
    loadComponent: () => import('./pages/campanhas/campanhas.page').then((m) => m.CampanhasPage),
  },
  {
    path: 'solicitacoes',
    loadComponent: () => import('./pages/solicitacoes/solicitacoes.page').then((m) => m.SolicitacoesPage),
  },
  {
    path: 'perfil',
    loadComponent: () => import('./pages/perfil/perfil.page').then((m) => m.PerfilPage),
  },
  {
    path: 'nova-solicitacao',
    loadComponent: () => import('./pages/nova-solicitacao/nova-solicitacao.page').then( m => m.NovaSolicitacaoPage)
  },
  {
    path: 'criar-campanha',
    loadComponent: () => import('./pages/criar-campanha/criar-campanha.page').then( m => m.CriarCampanhaPage)
  },
  {
    path: 'sobre',
    loadComponent: () => import('./pages/sobre/sobre.page').then( m => m.SobrePage)
  },
];
