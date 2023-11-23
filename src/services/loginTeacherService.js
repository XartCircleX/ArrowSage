const db = require("./dbservice");
const bcrypt = require("bcryptjs");

const handleLogin = (teacherEmail, teacherPassword) => {
    return new Promise(async (resolve, reject) => {
        //check email is exist or not
        const user = await findUserByEmail(teacherEmail);
        if (user) {
            //compare password
            await bcrypt.compare(teacherPassword, user.teacherPassword).then((isMatch) => {
                if (isMatch) {
                    resolve(true);
                } else {
                    reject(`The password that you've entered is incorrect`);
                }
            });
        } else {
            reject(`This user email "${teacherEmail}" doesn't exist`);
        }
    });
};


const findUserByEmail = (teacherEmail) => {
    return new Promise((resolve, reject) => {
        try {
            db.query(
                ' SELECT * FROM Teachers WHERE email = ? ',
                [teacherEmail],
                function(err, rows) {
                    if (err) {
                        reject(err)
                    }
                    const user = rows[0];
                    resolve(user);
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};

const findUserById = (idT) => {
    return new Promise((resolve, reject) => {
        try {
            db.query(
                ' SELECT * FROM Teachers WHERE id = ?  ', idT,
                function(err, rows) {
                    if (err) {
                        reject(err)
                    }
                    const user = rows[0];
                    resolve(user);
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};

const comparePassword = (teacherPassword, userObject) => {
    return new Promise(async (resolve, reject) => {
        try {
            await bcrypt.compare(teacherPassword, userObject.teacherPassword).then((isMatch) => {
                if (isMatch) {
                    resolve(true);
                } else {
                    resolve(`The password that you've entered is incorrect`);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    handleLogin: handleLogin,
    findUserByEmail: findUserByEmail,
    findUserById: findUserById,
    comparePassword: comparePassword
};