import nodemailer from 'nodemailer'
import { emailUser, emailPass } from '../../config'
import model from './model'
import EmailModel from './model';

export async function main(title, from, to, message, subject, text, html, cc, bcc, attachments) {


    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        //   host: "smtp.gmail.email",
        service: "gmail",
        // port: 587,
        // secure: false, // true for 465, false for other ports
        auth: {
            user: emailUser,
            pass: emailPass
        }
    });

    console.log(model)

    // setup email data with unicode symbols
    let mailOptions = EmailModel.mailOptions;

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions)

    console.log("Message sent: %s", info.messageId);

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}