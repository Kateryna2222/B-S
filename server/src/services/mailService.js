import nodemailer from 'nodemailer';
import { config } from 'dotenv';
config();

class MailService{

    constructor(){
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

    

    async sendActivationMail(to, link){
        try {
            await this.transporter.verify();
            console.log('SMTP connection successful');

            await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to,
                subject: `Активація акаунту на Buy&Sell`,
                html: `
                    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; background-color: #f4f4f9; border-radius: 10px;">
                        <h1 style="color: #4a90e2;">Привіт!</h1>
                        <p>Дякуємо за реєстрацію на <strong>Buy&Sell</strong>.</p>
                        <p>Щоб активувати свій акаунт, натисніть на кнопку нижче:</p>
                        <a href="${link}" style="
                            display: inline-block;
                            padding: 12px 25px;
                            margin: 15px 0;
                            font-size: 16px;
                            color: white;
                            background-color: #4a90e2;
                            text-decoration: none;
                            border-radius: 5px;
                        ">Активувати акаунт</a>
                        <p>Якщо кнопка не працює, скопіюйте посилання в браузер:</p>
                        <p><a href="${link}" style="color: #4a90e2;">${link}</a></p>
                        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                        <p style="font-size: 12px; color: #777;">Якщо ви не реєстрували акаунт, просто ігноруйте цей лист.</p>
                    </div>
                `
            });
        } 
        catch (error) {
            console.error('Помилка надсилання листа:', error);
            throw new Error('Не вдалося надіслати лист 11');
        }
    }
}

export default new MailService();