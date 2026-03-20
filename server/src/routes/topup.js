const express = require('express');
const router = express.Router();
const { sendTopUpNotification } = require('../services/telegramService');

// POST /api/topup - Create new top-up request
router.post('/', async (req, res) => {
  try {
    const { name, phone, usdAmount, tndAmount } = req.body;

    // Validation
    if (!name || !phone || !usdAmount || !tndAmount) {
      return res.status(400).json({
        success: false,
        message: 'Tous les champs sont requis'
      });
    }

    if (usdAmount < 10 || usdAmount > 1000) {
      return res.status(400).json({
        success: false,
        message: 'Le montant doit être entre 10 et 1000 USD'
      });
    }

    // Send Telegram notification
    await sendTopUpNotification({
      name,
      phone,
      usdAmount,
      tndAmount
    });

    res.status(200).json({
      success: true,
      message: 'Demande de recharge envoyée avec succès'
    });
  } catch (error) {
    console.error('Top-up error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur, réessayez plus tard'
    });
  }
});

module.exports = router;
