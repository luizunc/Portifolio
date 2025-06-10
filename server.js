const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/send', async (req, res) => {
  const { nome, email, mensagem } = req.body;

  // Configure o transporte SMTP (exemplo com Gmail)
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'eduarluiz21@gmail.com', // seu e-mail
      pass: 'SENHA_DO_APP',         // senha de app do Gmail
    },
  });

  try {
    await transporter.sendMail({
      from: `"${nome}" <${email}>`,
      to: 'eduarluiz21@gmail.com', // para onde vai chegar
      subject: 'Nova mensagem do portfólio',
      text: mensagem,
      html: `<b>Nome:</b> ${nome}<br><b>Email:</b> ${email}<br><b>Mensagem:</b><br>${mensagem}`,
    });
    res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao enviar mensagem.', error });
  }
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
}); 