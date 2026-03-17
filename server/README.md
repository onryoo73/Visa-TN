# Appointment Backend

This is a production-ready Express + MongoDB backend for an appointment booking system. It exposes REST endpoints to create, list, check availability, and delete appointments.

Environment
- Copy `.env.example` to `.env` and set `MONGODB_URI` and `PORT`.

Telegram Notifications (Optional)
To get instant phone notifications when someone books:

1. Open Telegram, search for **@BotFather** and create a new bot
   - Send `/newbot`, follow instructions
   - Save the **bot token** (looks like: `123456789:ABCdefGHIjklMNOpqrSTUvwxyz`)

2. Search **@userinfobot** and send any message to get your **Chat ID**

3. Add to your `.env`:
   ```
   TELEGRAM_BOT_TOKEN=your_bot_token_here
   TELEGRAM_CHAT_ID=your_chat_id_here
   ```

4. You'll now receive instant notifications like:
   > 🎉 **Nouveau rendez-vous vCardTN !**
   > 👤 **Client:** Ahmed Ben Ali
   > 📞 **Téléphone:** +216 55 921 442
   > 📅 **Date:** lundi 20 mars 2026
   > ⏰ **Heure:** 14:30

Install & Run

```bash
cd server
npm install
# dev (requires nodemon)
npm run dev
# or production
npm start
```

API Endpoints

- POST /api/appointments
  - Creates a new appointment
  - Required JSON body: { name, phone, appointmentDate, appointmentTime }

- GET /api/appointments
  - Returns all appointments sorted newest first

- GET /api/appointments/available?date=YYYY-MM-DD
  - Returns available `HH:mm` slots for the date

- DELETE /api/appointments/:id
  - Deletes an appointment by id

Validation & Rules

- Phone numbers are validated with a permissive regex (digits, spaces, +, dashes)
- Appointments cannot be created for past date-times
- Duplicate bookings (same date + time) are prevented by a compound unique index

Example Requests & Responses

1) Create appointment

Request (POST /api/appointments)

```json
{
  "name": "Jane Doe",
  "phone": "+1234567890",
  "appointmentDate": "2026-03-20",
  "appointmentTime": "09:30"
}
```

Response (201)

```json
{
  "success": true,
  "message": "Appointment created",
  "data": {
    "_id": "642...",
    "name": "Jane Doe",
    "phone": "+1234567890",
    "appointmentDate": "2026-03-20T00:00:00.000Z",
    "appointmentTime": "09:30",
    "status": "pending",
    "createdAt": "2026-03-11T12:00:00.000Z",
    "__v": 0
  }
}
```

2) Get available slots

Request: GET /api/appointments/available?date=2026-03-20

Response (200)

```json
{
  "success": true,
  "date": "2026-03-20",
  "available": ["09:00","10:00","10:30","11:00", ...]
}
```

Notes for Frontend Integration

- Send `appointmentDate` as YYYY-MM-DD and `appointmentTime` as HH:mm.
- The server normalizes and stores `appointmentDate` as a date-only value; availability is computed per date.

Admin actions

- To perform admin actions (delete or update appointment status) the backend requires an admin token.
- Set `ADMIN_TOKEN` in the server `.env`. For local dev you can also set `NEXT_PUBLIC_ADMIN_TOKEN` to reuse the same token in the frontend admin page (NOT recommended for production).

Example: Update status

Request (PATCH /api/appointments/:id) with header `x-admin-token: <ADMIN_TOKEN>`

```json
{
  "status": "confirmed"
}
```
