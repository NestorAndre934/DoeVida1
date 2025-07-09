const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
app.use(cors());
app.use(express.json());


const serviceAccount = require('./credenciais.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'adelinoemilianoa@gmail.com', 
    pass: 'sbfl ucob pajy tklq' 
  }
});


app.post('/nova-solicitacao', async (req, res) => {
  const { tipo_sanguineo, hospital, descricao } = req.body;

  try {
  
    const usuariosSnap = await db.collection('users').get();
    
    const emails = [];
    usuariosSnap.forEach(doc => {
      const dados = doc.data();
      if (dados.email) emails.push(dados.email);
    });
    if (emails.length === 0) {
      return res.status(200).send('Nenhum usuário encontrado.');
    }
    console.log(`Total de e-mails encontrados: ${emails.length}`);
    const mensagem = `
      Uma nova solicitação de sangue foi criada:
      Tipo Sanguíneo: ${tipo_sanguineo}
      Hospital: ${hospital}
      Descrição: ${descricao}
    `;


    for (const email of emails) {
      await transporter.sendMail({
        from: 'adelinoemilianoa@gmail.com',
        to: email,
        subject: 'Nova Solicitação de Sangue',
        text: mensagem
      });
    }

    res.send('Notificações enviadas com sucesso!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao enviar notificações.');
  }
});
 
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
