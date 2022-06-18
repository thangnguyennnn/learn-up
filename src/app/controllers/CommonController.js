
class CommonController {
    generateId(len) {
        let r = (Math.random() + 1).toString(36).substring(2);
        return r;
    }

    sendMail(email, subject, text) {
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'hethongswp301@gmail.com',
                pass: '42501002nht'
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        var mainOptions = {
            from: 'He Thong',
            to: email,
            subject: subject,
            text: text,
        }
        transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
                console.log(err);

            } else {
                console.log('Message sent: ' + info.response);

            }
        });
    }
}