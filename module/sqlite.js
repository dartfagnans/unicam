const sqlite3 = require('sqlite3').verbose();
const database = './ProgettoProvaNodeJs.db';

module.exports = {
    getStudents: function (callback) {
        let db = new sqlite3.Database(database);
        var students = []
        let sql = 'SELECT * FROM UTENTI WHERE Tipo = "s" ORDER BY Matricola ';
        db.all(sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
                console.log("row", row);
                var student = {};
                student.id=row.Matricola;
                student.name = row.Nome;
                student.surname = row.Cognome;
                student.mail = row.Mail;
                student.password = row.Password;
                console.log("student", student)

                students.push(student)
            });
            //call the callback
            callback(students)

        });

        db.close();

    },

    getTeachers: function (callback) {
        let db = new sqlite3.Database(database);
        var teachers = []
        let sql = `SELECT * FROM UTENTI WHERE TIPO=="d" ORDER BY Matricola `;
        db.all(sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
                console.log("row", row);
                var teacher = {};
                teacher.id=row.IdDocente;
                teacher.name = row.Nome;
                teacher.surname = row.Cognome;
                teacher.course = row.Materia;
                console.log("teacher", teacher)

                teachers.push(teacher)
            });
            //call the callback
            callback(teachers)

        });

        db.close();

    },

    getVotes: function (callback) {
        let db = new sqlite3.Database(database);
        var votes = []
        let sql = `SELECT * FROM VOTI ORDER BY VOTO DESC`;

        db.all(sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
                console.log("row", row);
                var vote = {};
                vote.id=row.IdMateria;
                vote.course = row.NomeMateria;
                vote.vote = row.Voto;
                console.log("vote", vote)

                votes.push(vote)
            });
            //call the callback
            callback(votes)

        });

        db.close();
    },

    getUsers: function (callback) {
        let db = new sqlite3.Database(database);
        var students = []
        let sql = "SELECT * FROM UTENTI ORDER BY Matricola";
        db.all(sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
                console.log("row", row);
                var student = {};
                student.id=row.Matricola;
                student.name = row.Nome;
                student.surname = row.Cognome;
                student.mail = row.Mail;
                student.password = row.Password;
                student.type = row.Tipo;
                console.log("student", student)

                students.push(student)
            });
            //call the callback
            callback(students)

        });

        db.close();

    }
}