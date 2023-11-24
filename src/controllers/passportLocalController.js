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
            passport.serializeUser((user, done) => {
                done(null, user.id_student);
            });
            
            passport.deserializeUser((id_student, done) => {
                loginService.findUserById(id_student).then((user) => {
                    return done(null, user);
                }).catch(error => {
                    return done(error, null)
                });
            });

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

        passport.serializeUser((admin, done) => {
            done(null, admin.id_teacher);
        });
        
        passport.deserializeUser((id_teacher, done) => {
            loginTeacherService.findTeacherById(id_teacher).then((admin) => {
                return done(null, admin);
            }).catch(error => {
                return done(error, null)
            });
        });
};




module.exports = initPassportLocal;