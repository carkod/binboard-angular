export default class EmailModel {

    constructor() {

    }
    mailOptions() {
        return {
            title: 'Hello',
            from: '"Binboard notification 👻" <noreply@carloswu.com>',     // sender address
            message: 'This is a test message and this is the body',
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
            to: ['carkodw@gmail.com'],
            cc: [],
            bcc: [],
            attachments: [],
        }
    }

}