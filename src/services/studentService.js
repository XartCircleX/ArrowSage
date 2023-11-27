const util = require('util');
const db = require('./dbservice');

const queryAsync = util.promisify(db.query).bind(db);

const getGroupByStudentId = async (studentId) => {
  try {
    const queryResult = await queryAsync('SELECT id_group FROM groups WHERE id_group = (SELECT id_group FROM students WHERE id_student = ?);', [studentId]);
    
    if (queryResult.length > 0) {
      console.log('The group is:', queryResult[0].id_group);
      return { id_group: queryResult[0].id_group };
    } else {
      console.log('Student not found or not assigned to any group.');
      return null;
    }
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};

const getSpecialtyByStudentId = async (studentId) => {
  try {
    const queryspecialtyResult = await queryAsync('SELECT name FROM cat_specialities WHERE id_specialty = (SELECT id_specialty FROM students WHERE id_student = ?);', [studentId]);
    
    if (queryspecialtyResult.length > 0) {
      console.log('The specialty is:', queryspecialtyResult[0].name);
      return { specialty: queryspecialtyResult[0].name };
    } else {
      console.log('Student not found or not assigned to any Specialty.');
      return null;
    }
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};

const getTurnByStudentId = async (studentId) => {
  try {
    const queryTurnResult = await queryAsync('SELECT name FROM turns WHERE id_turn = (SELECT id_turn FROM students WHERE id_student = ?);', [studentId]);
    
    if (queryTurnResult.length > 0) {
      console.log('The Turn is:', queryTurnResult[0].name);
      return { turn: queryTurnResult[0].name }; // Corregido aquí
    } else {
      console.log('Student not found or not assigned to any turn.');
      return null;
    }
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};

const getTutorByStudentId = async (studentId) => {
  try {
    const queryTutorResult = await queryAsync('SELECT fullname FROM teachers WHERE id_teacher = (SELECT id_teacher FROM tutors WHERE id_tutor = (SELECT id_tutor FROM students WHERE id_student = ?));', [studentId]);
    
    if (queryTutorResult.length > 0) {
      console.log('The tutor is:', queryTutorResult[0].fullname); // Corregido aquí
      return { tutor: queryTutorResult[0].fullname };
    } else {
      console.log('Student not found or not assigned to any tutor.');
      return null;
    }
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};

const getPeriodByStudentId = async (studentId) => {
  try {
    const queryPeriodResult = await queryAsync('SELECT id_period FROM periods WHERE id_Period = (SELECT id_period FROM students WHERE id_student = ?)', [studentId]);
    
    if (queryPeriodResult.length > 0) {
      console.log('The Period is:', queryPeriodResult[0].id_period); // Corregido aquí
      return { id_period: queryPeriodResult[0].id_period };
    } else {
      console.log('Student not found or not assigned to any period.');
      return null;
    }
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};

const getAsignatureByStudentId = async (studentId) => {
  try {
    const queryAsignatureResult = await queryAsync('SELECT name FROM asignatures WHERE id_asignature = (SELECT id_asignature FROM students WHERE id_student = ?);', [studentId]);
    
    if (queryAsignatureResult.length > 0) {
      console.log('The asignature is:', queryAsignatureResult[0].name);
      return { asignature: queryAsignatureResult[0].name }; // Corregido aquí
    } else {
      console.log('Student not found or not assigned to any asignature.');
      return null;
    }
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};

const getUpdate = (req, res) => {
  const {email,name,emailN} = req.body.user;
  const actualizaionSQL = "UPDATE students SET fullname = ?, email = ? where email = ?" 
db.query(actualizaionSQL,[name,email,emailN],(error,resultado)=>{
  if(error){
      console.error('error en la querry'+error.message);
      return res.status(500).send('fallo en la base de datos')
  }
  else{
      console.log('actualizaste los datos');
  }
});
};

const getErase = (req, res) => {
  const {name, institutional_email} = req.body.user
  const eliminarSQL = "delete from students where fullname = ? AND email = ?"
db.query(eliminarSQL,[name, institutional_email],(error,resultado)=>{
  if(error){
      console.error('error en consulta'+error.message);
      return res.status(500).send('datos no eliminados, error de base de datos');
  }
  else{
      console.log('eliminaste los datos');
  }
});
}

module.exports = {
  getGroupByStudentId: getGroupByStudentId,
  getSpecialtyByStudentId: getSpecialtyByStudentId,
  getTurnByStudentId: getTurnByStudentId,
  getTutorByStudentId: getTutorByStudentId,
  getPeriodByStudentId: getPeriodByStudentId,
  getAsignatureByStudentId: getAsignatureByStudentId,
  getUpdate: getUpdate,
  getErase: getErase
};