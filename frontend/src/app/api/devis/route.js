import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const data = await request.json();
    const { client, devis } = data;

    if (!client || !client.name || !client.email || !devis) {
      return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const optionsList = devis.selectedOptions && devis.selectedOptions.length > 0
      ? devis.selectedOptions.join(', ')
      : 'Aucune';

    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.SMTP_TO_EMAIL,
      subject: `Nouveau Devis Généré : ${client.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #00f5d4;">Nouveau Devis BeClean</h2>
          
          <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px;">Coordonnées Client</h3>
          <p><strong>Nom :</strong> ${client.name}</p>
          <p><strong>Téléphone :</strong> ${client.phone}</p>
          <p><strong>Email :</strong> <a href="mailto:${client.email}">${client.email}</a></p>

          <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 25px;">Détails du Simulateur</h3>
          <p><strong>Service :</strong> ${devis.service}</p>
          <p><strong>Surface :</strong> ${devis.area} m²</p>
          <p><strong>Fréquence :</strong> ${devis.frequency}</p>
          <p><strong>Options choisies :</strong> ${optionsList}</p>
          
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px; border-left: 4px solid #00f5d4;">
            <h3 style="margin-top: 0;">Total Estimé HT</h3>
            <p style="font-size: 24px; margin-bottom: 0;"><strong>${devis.total} MAD</strong></p>
          </div>
          
          <br />
          <p style="font-size: 12px; color: #888;">Cet e-mail a été envoyé automatiquement depuis le simulateur de devis du site BeClean. N'oubliez pas d'envoyer le devis officiel PDF sous 30 minutes au client.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Devis envoyé avec succès' }, { status: 200 });
  } catch (error) {
    console.error('Erreur envoi email devis:', error);
    return NextResponse.json({ error: 'Erreur lors de la génération du devis' }, { status: 500 });
  }
}
