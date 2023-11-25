const passportLocal = require ("passport-local");
const passport = require ("passport");
const loginService = require ("../services/loginService");
const loginTeacherService = require ("../services/loginTeacherService");

const LocalStrategy = passportLocal.Strategy;

const initPassportLocal = () => {
    passport.use("student", new LocalStrategy({
            usernameField: 'studentEmail',
            passwordField: 'studentPassword',
            passReqToCallback: true
        },
        async (req, studentEmail, studentPassword, done) => {
            try {
                await loginService.findUserByEmail(studentEmail).then(async (user) => {
                    if (!user) {
                        return done(null, false, req.flash("errors", `This user email "${studentEmail}" doesn't exist`));
                    }
                    if (user) {
                        let match = await loginService.comparePassword(studentPassword, user);
                        if (match === true) {
                            return done(null, user, null)
                        } else {
                            return done(null, false, req.flash("errors", match)
                            )
                        }
                    }
                });
                
            } catch (err) {
                console.log(err);
                return done(null, false, { message: err });
            }
        }));

    passport.use(
        "teacher",
        new LocalStrategy(
            {
                usernameField: "teacherEmail",
                passwordField: "teacherPassword",
                passReqToCallback: true,
            },
            async (req, teacherEmail, teacherPassword, done) => {
                try {
                    const admin = await loginTeacherService.findTeacherByEmail(teacherEmail);

                    if (!admin) {
                        return done(
                            null,
                            false,
                            req.flash("errors", `This user email "${teacherEmail}" doesn't exist`)
                        );
                    }

                    const isPasswordCorrect = await loginTeacherService.compareTeacherPassword(
                        teacherPassword,
                        admin
                    );

                    if (isPasswordCorrect) {
                        return done(null, admin, null);
                    } else {
                        return done(null, false, req.flash("errors", "Incorrect password"));
                    }
                } catch (err) {
                    console.log(err);
                    return done(null, false, { message: err });
                }
            }
        )
    );
};

passport.serializeUser((user, done) => {
    if (user.id_student) {
        done(null, { userType: 'student', id: user.id_student });
    } else if (user.id_teacher) {
        done(null, { userType: 'teacher', id: user.id_teacher });
    } else {
        done(new Error('Invalid user object'), null);
    }
});

passport.deserializeUser((userData, done) => {
    if (userData.userType === 'student') {
        loginService.findUserById(userData.id).then((user) => {
            done(null, user);
        }).catch(error => {
            done(error, null);
        });
    } else if (userData.userType === 'teacher') {
        loginTeacherService.findTeacherById(userData.id).then((teacher) => {
            done(null, teacher);
        }).catch(error => {
            done(error, null);
        });
    } else {
        done(new Error('Invalid user type'), null);
    }
});




module.exports = initPassportLocal;