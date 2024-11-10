const express = require('express');
const app = express();
app.use(express.json());

let alumnos = [];
let profesores = [];

// --- Endpoints para Alumnos ---

app.get('/alumnos', (req, res) => {
    res.json(alumnos);
});

app.get('/alumnos/:id', (req, res) => {
    const alumno = alumnos.find(a => a.id === parseInt(req.params.id));
    if (!alumno) return res.status(404).json({ error: 'Alumno no encontrado' });
    res.json(alumno);
});


app.post('/alumnos', (req, res) => {
    const { id, nombres, apellidos, matricula, promedio } = req.body;

    if (!id || !nombres || !apellidos || !matricula || promedio === undefined) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }
    if (typeof promedio !== 'number') {
        return res.status(400).json({ error: 'El promedio debe ser un número' });
    }

    const nuevoAlumno = { id, nombres, apellidos, matricula, promedio };
    alumnos.push(nuevoAlumno);
    res.status(201).json(nuevoAlumno);
});

app.put('/alumnos/:id', (req, res) => {
    const alumno = alumnos.find(a => a.id === parseInt(req.params.id));
    if (!alumno) return res.status(404).json({ error: 'Alumno no encontrado' });

    const { nombres, apellidos, matricula, promedio } = req.body;
    if (!nombres || !apellidos || !matricula || promedio === undefined) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    alumno.nombres = nombres;
    alumno.apellidos = apellidos;
    alumno.matricula = matricula;
    alumno.promedio = promedio;

    res.json(alumno);
});

app.delete('/alumnos', (req, res) => {
    return res.status(405).json({ error: 'Método no permitido en /alumnos sin un ID' });
});

app.delete('/alumnos/:id', (req, res) => {
    const index = alumnos.findIndex(a => a.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Alumno no encontrado' });

    alumnos.splice(index, 1);
    res.status(200).json({ message: 'Alumno eliminado' });
});


// --- Endpoints para Profesores ---

app.get('/profesores', (req, res) => {
    res.json(profesores);
});

app.get('/profesores/:id', (req, res) => {
    const profesor = profesores.find(p => p.id === parseInt(req.params.id));
    if (!profesor) return res.status(404).json({ error: 'Profesor no encontrado' });
    res.json(profesor);
});

app.post('/profesores', (req, res) => {
    const { id, numeroEmpleado, nombres, apellidos, horasClase } = req.body;

    if (!id || !numeroEmpleado || !nombres || !apellidos || horasClase === undefined) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }
    if (typeof horasClase !== 'number') {
        return res.status(400).json({ error: 'Las horas de clase deben ser un número' });
    }

    const nuevoProfesor = { id, numeroEmpleado, nombres, apellidos, horasClase };
    profesores.push(nuevoProfesor);
    res.status(201).json(nuevoProfesor);
});

app.put('/profesores/:id', (req, res) => {
    const profesor = profesores.find(p => p.id === parseInt(req.params.id));
    if (!profesor) return res.status(404).json({ error: 'Profesor no encontrado' });

    const { numeroEmpleado, nombres, apellidos, horasClase } = req.body;
    if (!numeroEmpleado || !nombres || !apellidos || horasClase === undefined) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    profesor.numeroEmpleado = numeroEmpleado;
    profesor.nombres = nombres;
    profesor.apellidos = apellidos;
    profesor.horasClase = horasClase;

    res.json(profesor);
});

app.delete('/profesores', (req, res) => {
    return res.status(405).json({ error: 'Método no permitido en /profesores sin un ID' });
});

app.delete('/profesores/:id', (req, res) => {
    const index = profesores.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Profesor no encontrado' });

    profesores.splice(index, 1);
    res.status(200).json({ message: 'Profesor eliminado' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
