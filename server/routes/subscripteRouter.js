const Router = require('express');
const router = new Router();
const mailService = require('../services/mailService.js');

router.post('/subscribe', async (req, res) => {
    const { email } = req.body;

    try {
        // Викликайте функцію sendTelegramMail з mailService.js для надсилання повідомлення на пошту
        await mailService.sendTelegramMail(email);

        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

module.exports = router;
