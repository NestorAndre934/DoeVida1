📱 ##DoeVida##

Aplicativo móvel desenvolvido com Ionic + Angular + Firebase, cujo objetivo é conectar doadores de sangue a campanhas e solicitações em tempo real.

🧩 Tecnologias utilizadas

Ionic Framework (UI nativa para mobile)

Angular (arquitetura SPA)

**Firebase**:

   -Authentication (login por e-mail/senha)

   -Firestore (armazenamento de dados: usuários, campanhas, solicitações)

Cloud Functions / Node.js + Nodemailer (envio de e‑mail)

🚀 Como executar

1. Pré-requisitos locais

Node.js (v14+)

Ionic CLI (npm install -g @ionic/cli)

Firebase CLI (npm install -g firebase-tools)

Git (para clonar o repositório)

2. Clonar o projeto

git clone https://github.com/seu-usuario/doevida.git
cd doevida

3. Instalar dependências do App

npm install

4. Configurar o Firebase

No Firebase Console:

1. Crie um projeto “DoeVida”.


2. Ative Authentication (E‑mail/Senha).


3. Crie coleções no Firestore: users, campanhas, solicitacoes.


4. Na raiz do app Ionic, edite src/environments/environment.ts:

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "API_KEY",
    authDomain: "SEU-PROJETO.firebaseapp.com",
    projectId: "SEU-PROJETO",
    storageBucket: "SEU-PROJETO.appspot.com",
    messagingSenderId: "ID",
    appId: "APP_ID"
  }
};
5. Instalar o servidor de envio de e‑mail (Node.js + Nodemailer)

cd api-doe-email
npm install

📌 Crie .env com as credenciais SMTP:

SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-aplicativo
PORT=3000

⚙️ O endpoint /enviar-email envia notificação para todos os usuários com mesmo tipo sanguíneo quando é criada uma nova solicitação.

Iniciar o servidor:

node index.js

Deve aparecer: API rodando na porta 3000

6. Iniciar a aplicação Ionic

Voltando na pasta raiz:

ionic serve

A aplicação abrirá em http://localhost:8100

📚 Funcionalidades principais

1. Login / Registro

2. Firebase Authentication controla o acesso.

3. Home:

Exibe banner e cartazes descritivos.

Mostra 1 campanha ativa + botão “Ver todas”.

Mostra 1 solicitação urgente + botão “Ver todas”.

4. Campanhas:

Listagem de campanhas do Firebase.

Administradores podem excluir uma campanha.

5. Solicitações:

Exibe solicitações feitas por qualquer usuário.

Usuários possuem botão para excluir suas próprias solicitações.

6. Notificação por E‑mail:

Ao criar uma nova solicitação, dispara chamada ao endpoint Node.js que envia e‑mail aos doadores com o tipo sanguíneo correspondente.

⚙️ Configurações adicionais

Scripts úteis:

npm run build — build da aplicação Ionic.

firebase deploy --only functions — deploy das Cloud Functions (caso use).


Ambiente de produção:

Atualize environment.production = true.

Use credenciais seguras.

Testes:

Use Firebase Authentication para criar dois perfis: admin (isAdmin=true) e usuário comum (isAdmin=false).

Para testes de envio de e‑mail, cadastre usuário com tipo sanguíneo, depois crie uma solicitação desse tipo e verifique se os destinatários recebem a notificação.

👨‍🏫 Instruções para avaliação

1. Clone o repositório.

2. Configure environment.ts com dados do seu projeto Firebase.

3. No diretório api-doe-email, adicione o .env e inicie o servidor Node.js.

4. Na raiz, rode ionic serve.

5. Registre e faça login como admin e usuário, teste as funcionalidades de campanha e solicitação.

6. Ao criar uma solicitação, verifique se todos os e‑mails são enviados.

7. Finalize explorando as interfaces e testando exclusão/visualização.


📝 Licença
Projeto acadêmico: uso permitido apenas para avaliação da disciplina de Computação Móvel.
