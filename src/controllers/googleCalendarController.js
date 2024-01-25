const { google } = require('googleapis');
require('dotenv').config();

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({ version: 'v3' });
const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
);

const insertEvent = async (event) => {
    try {
        let response = await calendar.events.insert({
            auth: auth,
            calendarId: calendarId,
            resource: event
        });

        if (response.status === 200 && response.statusText === 'OK') {
            return 1;
        } else {
            return 0;
        }
    } catch (error) {
        console.log(`Error at insertEvent --> ${error}`);
        return 0;
    }
};

// Nuevo método para crear un evento
const createEvent = async (req, res) => {
    try {
        const {startDateTime, endDateTime, timeZone, studentName, subjectName } = req.body;

        // Validación de datos
        if (!startDateTime || !endDateTime || !timeZone || !studentName || !subjectName) {
            return res.status(400).json({ success: false, message: 'Los campos obligatorios deben estar presentes.' });
        }

        // Convertir las fechas al formato ISO 8601
        const isoStartDateTime = new Date(startDateTime).toISOString();
        const isoEndDateTime = new Date(endDateTime).toISOString();

        // Evento para Google Calendar
        const event = {
            'summary': `${subjectName} - ${studentName}`,
            'description': 'I need assistance, teacher :C',
            'start': {
                'dateTime': isoStartDateTime,
                'timeZone': timeZone
            },
            'end': {
                'dateTime': isoEndDateTime,
                'timeZone': timeZone
            }
        };

        // Insertar evento en Google Calendar
        const result = await insertEvent(event);

        if (result === 1) {
            req.flash('success', 'Evento creado exitosamente.');
            return res.redirect('/subjects'); 
        } else {
            req.flash('error', 'Error al crear el evento.');
            return res.redirect('/subjects'); 
        }
    } catch (error) {
        console.error('Error en el controlador createEvent:', error);
        req.flash('error', 'Error interno del servidor.');
        return res.redirect('/subjects'); 
    }
};

module.exports = {
    createEvent: createEvent
};