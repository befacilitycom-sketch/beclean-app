import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, subject, message } = data;

    // Validation basique
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 });
    }

    // Configurer le transporteur SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true, // true pour 465, false pour 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Construire l'e-mail
    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.SMTP_TO_EMAIL,
      subject: `Nouveau Message Contact BeClean : ${subject || 'Sans Sujet'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #00f5d4;">Nouveau Message depuis le site BeClean</h2>
          <p><strong>Nom / Entreprise :</strong> ${name}</p>
          <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Sujet :</strong> ${subject}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Message :</strong></p>
          <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 5px; color: #333;">${message}</p>
          <br />
          <p style="font-size: 12px; color: #888;">Cet e-mail a été envoyé automatiquement depuis le formulaire de contact du site BeClean.</p>
        </div>
      `,
    };

    // Envoyer l'e-mail
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Message envoyé avec succès' }, { status: 200 });
  } catch (error) {
    console.error('Erreur envoi email contact:', error);
    return NextResponse.json({ error: 'Erreur lors de l\'envoi du message' }, { status: 500 });
  }
}
