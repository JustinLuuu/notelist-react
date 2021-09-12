const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const { json } = require('body-parser');
const { nanoid } = require('nanoid');

dotenv.config({ path: './config.env' });

const app = express();

app.use(cors());
app.use(json());

// tablitas virtuales 

let users = [
	{
		id: nanoid(),
		fullname: 'Fernando Rodriguez',
		username: 'fernandito',
		password: 'fernanfloo65',
	},
	{
		id: nanoid(),
		fullname: 'Angel David Revilla',
		username: 'dross',
		password: 'miedo',
	},
	{
		id: nanoid(),
		fullname: 'Tomas Estrella',
		username: 'cristiano7',
		password: 'futbolvida14',
	},
];

const notes = [
	{
		id: nanoid(),
		id_user: users[0].id,
		text: 'no se que me pasa hoy, me siento bastante raro, es como si algo no me dejara en paz.',
		date: '9/9/2021',
		time: '7:43'
	},
	{
		id: nanoid(),
		id_user: users[1].id,
		text: 'el dia esta para subir videos de terror y jugar mucho secondlife.. !',
		date: '18/3/2010',
		time: '16:54'
	},
	{
		id: nanoid(),
		id_user: users[2].id,
		text: 'hoy marqué 300 goles, me siento genial; lo malo es que fue jugando en contra de bebés',
		date: '6/7/2030',
		time: '23:09'
	}
]

// para los usuarios

app.post('/userExist', (req, res) => {
	const user = users.find(
		u => u.username === req.body.username &&
			u.password === req.body.password);

	if (user) {
		res.send(user);
	}
	else {
		res.send({});
	}
});

app.post('/users', (req, res) => {
	const newUser = {
		id: nanoid(),
		fullname: req.body.fullname,
		username: req.body.username,
		password: req.body.password
	};

	users.push(newUser);
	return res.send(newUser);
});

// para las notas

app.get('/notes/:idUser', (req, res) => {
	const notesUser = notes.filter(n => n.id_user === req.params.idUser);
	res.send(notesUser);
});

app.post('/notes', (req, res) => {

	var currentDate = new Date()
	const dateToday = () => {
		var day = currentDate.getDate()
		var month = currentDate.getMonth() + 1
		var year = currentDate.getFullYear()
		return day + "/" + month + "/" + year;
	}

	const timeNow = () => {
		var time = currentDate.getHours() +
			':' +
			currentDate.getMinutes() 
		return time;
	}

	const newNote = {
		id: nanoid(),
		id_user: req.body.idUser,
		text: req.body.text,
		date: dateToday(),
		time: timeNow()
	};

	notes.push(newNote);
	return res.send(newNote);
});

app.patch('/notes/:idNote', (req, res) => {
	const id = req.params.idNote;
	const {id_user: idUser} = notes.find(n=> n.id === id);

	const index = notes.findIndex((note) => note.id === id);
	if (index > -1) {
		notes[index].text = req.body.text;
	}
	const notesUser = notes.filter(n=> n.id_user === idUser);
	res.send(notesUser);
});


app.delete('/notes/:idNote', (req, res) => {
	const id = req.params.idNote;
	const {id_user: idUser} = notes.find(n=> n.id === id);

	const index = notes.findIndex((note) => note.id == id);
	if (index > -1) {
		notes.splice(index, 1);
	}

	const notesUser = notes.filter(n=> n.id_user === idUser);
	res.send(notesUser);
});

const PORT = 7000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.green.bold));
