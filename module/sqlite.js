const sqlite3 = require('sqlite3').verbose();
const database = './ProgettoProvaNodeJs.db';

module.exports = {
    getStudents: function (callback) {
        let db = new sqlite3.Database(database);
        var students = []
        let sql = `SELECT * FROM STUDENTI ORDER BY NOME`;
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
        let sql = `SELECT * FROM DOCENTI ORDER BY NOME`;
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

    }

}