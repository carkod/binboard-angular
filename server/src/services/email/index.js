import nodemailer from 'nodemailer'
import { emailUser, emailPass, emailClientId, emailClientSecret } from '../../config'

function htmlFormat(text) {
    const html = `<body style="text-align: center;"><p>${text}</p></body>`;
    return html;
}

export default async function sendMail({ 
    from, to, subject, text, html, cc, bcc, attachments 
}) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        //   host: "smtp.gmail.email",
        service: "gmail",
        // port: 587,
        // secure: false, // true for 465, false for other ports
        auth: {
            user: emailUser,
            pass: emailPass,
          }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: from,
        subject: subject, // Subject line
        text: text, // plain text body
        to: to,
        // Optional fields below
        html: htmlFormat(), // html body
        cc: cc,
        bcc: bcc,
        attachments: [],
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions)
    console.log("Binboard mail sent: %s", info.messageId);
}