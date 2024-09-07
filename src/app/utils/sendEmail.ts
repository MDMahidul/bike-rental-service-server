import nodemailer from 'nodemailer';
import config from '../config';

export const sendMail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'mmbmahidul07@gmail.com',
      pass: 'flmo jfnl mknu jpac',
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: 'mmbmahidul07@gmail.com', // sender address
    to, // list of receivers
    subject: 'Reset Password', // Subject line
    text: 'Reset your password within 10 mins!', // plain text body
    html, // html body
  });
};
