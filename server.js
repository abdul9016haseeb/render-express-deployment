require('dotenv').config();
const express = require("express")
const app = express();
const port = process.env.PORT || 8080;
const nodemailer = require("nodemailer");
const email = 'abdul2002haseeb@gmail.com';
const credentials = {
    user: process.env.appUser, // Your Gmail email
    pass: process.env.appPassword, // Use an App Password for Gmail
}

console.log(credentials)

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",//use gmail.com to real emails
    port: 587, // Use Gmail
    auth: credentials,
});

app.get('/', (req, res) => {
    res.send("my first successfull deployment");
})

app.get('/send-email', async (req, res) => {
    try {
        const info = await transporter.sendMail({
            from: credentials.user,
            to: email,
            subject: 'Verification code',
            html: `<p>
            hi makka, email from abdul haseeb for testing 😎
            😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 🙂 🙃 😉 😌 😍 🥰 😘 😗 😙 😚 😋 😛 😜 🤪 🤨 🧐 🤓 😎 🥳 😏 😒 😞 😔 😟 😕 🙁 ☹️ 😣 😖 😫 😩 🥺 😢 😭 😤 😠 😡 🤬 🤯 😳 🥵 🥶 😱 😨 😰 😥 😓 🤗 🤔 🤭 🤫 🤥 😶 😐 😑 😬 🙄 😮 😯 😲 😳 🤐 😴 😪 😵 🤢 🤮 🤧 😷 🤒 🤕 🤑 🤠 😈 👿 💀 ☠️ 👻 👽 🤖 🎃 💩 👍 👎 👊 ✊ 🤛 🤜 🤝 🙌 👏 👐 🤲 🙏</p>`
        })
        res.status(200).json({ msg: "email sent" });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: "error sending email",
            error: error,
        });
    }
})

app.listen(port, () => {
    console.log("server started on port 8080")
});