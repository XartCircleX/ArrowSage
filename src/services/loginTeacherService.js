const db = require("./dbservice");

const handleLoginTeacher = (teacherEmail, teacherPassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            const teacher = await findTeacherByEmail(teacherEmail);
            if (teacher) {
                if (teacherPassword === teacher.teacherPassword) {
                    resolve(true);
                } else {
                    reject(`The password that you've entered is incorrect`);
                }
            } else {
                reject(`This user email "${teacherEmail}" doesn't exist`);
            }
        } catch (err) {
            reject(err);
        }
    });
};

const findTeacherByEmail = (teacherEmail) => {
    return new Promise((resolve, reject) => {
        db.query(
            ' SELECT * FROM Teachers WHERE email = ? ',
            [teacherEmail],
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

const compareTeacherPassword = (teacherPassword, teacherObject) => {
    return new Promise((resolve, reject) => {
        try {
        if (teacherPassword === teacherObject.teacherPassword) {
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