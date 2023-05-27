const nodemailer = require('nodemailer');

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Активація аккаунта на " + process.env.API_URL,
            text: '',
            html:
                `
                    <div>
                        <h1>Для активації перейдіть по силці</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })
    }

    async sendTelegramMail(email) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: "Підписка на пошту",
            text: '',
            html:
                `
                    <p>Дякуємо за підписку на нашу розсилку!</p>
                    <p>Для отримання більше інформації перейдіть за посиланням на наш телеграм-канал:</p>
                    <a href="https://t.me/your_channel">https://t.me/your_channel</a>
                `
     
        })
    }
}

module.exports = new MailService();