const nodemailer = require('nodemailer');

const sendMail = async (params) => {
    try {
        const { subject, email, content, attachments = [] } = params;
        //console.log("inside ",subject, email, content, attachments)
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'artequitys@parthinfosystems.com',
                pass: 'Art@12345',
            },
        });

        let mailOptions = {
            from: 'artequitys@parthinfosystems.com',
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