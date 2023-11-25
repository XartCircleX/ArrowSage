const db = require("./dbservice");

const handleLoginTeacher = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const teacher = await findTeacherByEmail(email);
            if (teacher) {
                if (password === teacher.password) {
                    resolve(true);
                } else {
                    reject(`The password that you've entered is incorrect`);
                }
            } else {
                reject(`This user email "${email}" doesn't exist`);
            }
        } catch (err) {
            reject(err);
        }
    });
};

const findTeacherByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query(
            ' SELECT * FROM Teachers WHERE email = ? ',
            [email],
            function (err, rows) {
                if (err) {
                    reject(err);
                }
                const teacher = rows[0];
                resolve(teacher);
            }
        );
    });
};

const findTeacherById = (id_teacher) => {
    return new Promise((resolve, reject) => {
        db.query(
            ' SELECT * FROM Teachers WHERE id_teacher = ?  ',
            id_teacher,
            function (err, rows) {
                if (err) {
                    reject(err);
                }
                const teacher = rows[0];
                resolve(teacher);
            }
        );
    });
};

const compareTeacherPassword = (password, teacherObject) => {
    return new Promise((resolve, reject) => {
        try {
        if (password === teacherObject.password) {
            resolve(true);
        } else {
            resolve(`The password that you've entered is incorrect`); 
        }
        } catch (e) {
            reject (e);
        }
    });
};


module.exports = {
    handleLoginTeacher: handleLoginTeacher,
    findTeacherByEmail: findTeacherByEmail,
    findTeacherById: findTeacherById,
    compareTeacherPassword: compareTeacherPassword,
};