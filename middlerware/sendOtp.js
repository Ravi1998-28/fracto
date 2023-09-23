const nodemailer = require('nodemailer');

const sendMail = async (params) => {
    try {
        const { subject, email, content, attachments = [] } = params;
        console.log("inside ",subject, email, content, attachments)
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'v.rai@parthinfosystems.com',
                pass: '@234',
            },
        });

        var mailOptions = {
            from: 'v.rai@parthinfosystems.com',
            to: email,
            subject: subject,
            text: content,
            attachments: attachments,
        };

        var info = await transporter.sendMail(mailOptions);
        if (info.response) {
            return true;
        } else {
            throw { message: 'Mail doesn\'t sent' };
        }
    } catch (e) {
        throw e;
    }
};

module.exports = { sendMail };