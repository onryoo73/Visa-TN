// Telegram notification service for appointment bookings
// To set up:
// 1. Message @BotFather on Telegram, create a bot, get the token
// 2. Message @userinfobot to get your chat ID
// 3. Add to .env: TELEGRAM_BOT_TOKEN=your_token, TELEGRAM_CHAT_ID=your_chat_id

const TELEGRAM_API = 'https://api.telegram.org/bot';

/**
 * Send a notification to Telegram when a new appointment is booked
 * @param {Object} appointment - The appointment object
 * @param {string} appointment.name - Client name
 * @param {string} appointment.phone - Client phone
 * @param {Date} appointment.appointmentDate - Appointment date
 * @param {string} appointment.appointmentTime - Appointment time (HH:mm)
 */
async function sendBookingNotification(appointment) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  // Skip if not configured
  if (!botToken || !chatId) {
    console.log('Telegram not configured, skipping notification');
    return;
  }

  const { name, phone, appointmentDate, appointmentTime } = appointment;
  
  // Format date nicely
  const dateStr = new Date(appointmentDate).toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const message = `
🎉 <b>Nouveau rendez-vous vCardTN !</b>

👤 <b>Client:</b> ${name}
📞 <b>Téléphone:</b> ${phone}
📅 <b>Date:</b> ${dateStr}
⏰ <b>Heure:</b> ${appointmentTime}

💰 <b>Revenu potentiel:</b> 100 TND

🔔 Action requise: Contacter le client sous 24h pour confirmer.
  `.trim();

  try {
    const response = await fetch(`${TELEGRAM_API}${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
        disable_notification: false
      })
    });

    const data = await response.json();
    
    if (data.ok) {
      console.log('✅ Telegram notification sent successfully');
    } else {
      console.error('❌ Telegram API error:', data.description);
    }
  } catch (error) {
    console.error('❌ Failed to send Telegram notification:', error.message);
  }
}

module.exports = { sendBookingNotification };

/**
 * Send a notification to Telegram when a new top-up is requested
 * @param {Object} topUp - The top-up object
 * @param {string} topUp.name - Client name
 * @param {string} topUp.phone - Client phone
 * @param {number} topUp.usdAmount - USD amount requested
 * @param {number} topUp.tndAmount - TND amount to pay
 */
async function sendTopUpNotification(topUp) {
  // Use separate bot credentials for top-up notifications
  const botToken = process.env.TOPUP_TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TOPUP_TELEGRAM_CHAT_ID || process.env.TELEGRAM_CHAT_ID;

  // Skip if not configured
  if (!botToken || !chatId) {
    console.log('Telegram not configured, skipping top-up notification');
    return;
  }

  const { name, phone, usdAmount, tndAmount } = topUp;

  const message = `
💰 <b>Nouvelle demande de recharge vCardTN !</b>

👤 <b>Client:</b> ${name}
📞 <b>Téléphone:</b> ${phone}
💵 <b>Montant USD:</b> ${usdAmount} USDT
💰 <b>Prix TND:</b> ${tndAmount} TND
📊 <b>Taux:</b> 3.2 TND/USDT

🔔 Action requise: Contacter le client pour le paiement et envoyer les USDT.
  `.trim();

  try {
    const response = await fetch(`${TELEGRAM_API}${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
        disable_notification: false
      })
    });

    const data = await response.json();
    
    if (data.ok) {
      console.log('✅ Top-up Telegram notification sent successfully');
    } else {
      console.error('❌ Telegram API error:', data.description);
    }
  } catch (error) {
    console.error('❌ Failed to send top-up Telegram notification:', error.message);
  }
}

module.exports = { sendBookingNotification, sendTopUpNotification };
