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
const TIMEOFFSET = '+05:30';

// Método para obtener la fecha y hora en formato ISO 8601
const getISO8601DateTime = () => {
    let date = new Date();
    return date.toISOString();
};

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
        // Obtén los datos del cuerpo de la solicitud
        const { eventTitle, eventDescription, startDateTime, endDateTime } = req.body;

        // Validación de datos
        if (!eventTitle || !startDateTime || !endDateTime) {
            return res.status(400).json({ success: false, message: 'Los campos obligatorios deben estar presentes.' });
        }

        // Convertir las fechas al formato ISO 8601
        const isoStartDateTime = new Date(startDateTime).toISOString();
        const isoEndDateTime = new Date(endDateTime).toISOString();

        // Evento para Google Calendar
        const event = {
            'summary': eventTitle,
            'description': eventDescription || '',
            'start': {
                'dateTime': isoStartDateTime,
                'timeZone': 'America/Chihuahua'
            },
            'end': {
                'dateTime': isoEndDateTime,
                'timeZone': 'America/Chihuahua'
            }
        };

        // Insertar evento en Google Calendar
        const result = await insertEvent(event);

        if (result === 1) {
            res.status(200).json({ success: true, message: 'Evento creado exitosamente.' });
        } else {
            res.status(500).json({ success: false, message: 'Error al crear el evento.' });
        }
    } catch (error) {
        console.error('Error en el controlador createEvent:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor.', error: error.message });
    }
};

module.exports = {
    createEvent: createEvent
};