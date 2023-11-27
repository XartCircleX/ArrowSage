const util = require('util');
const db = require('./dbservice');

const queryAsync = util.promisify(db.query).bind(db);

const getNameOfTeacherJuan = async () => {
    try {
      const queryResult = await queryAsync('SELECT fullname FROM teachers WHERE id_teacher = 1;');
  
      if (queryResult.length > 0) {
        return { fullname: queryResult[0].fullname };
      } else {
        console.log('No teachers found with a name.');
        return null;
      }
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  };

  const getAsignatureTeacherJuan = async () => {
    try {
      const queryResult = await queryAsync('SELECT name FROM asignatures WHERE id_teacher = 1;');
  
      if (queryResult.length > 0) {
        return { name: queryResult[0].name };
      } else {
        console.log('No asignature found.');
        return null;
      }
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  };

  const getNameOfTeacherKusaka = async () => {
    try {
      const queryResult = await queryAsync('SELECT fullname FROM teachers WHERE id_teacher = 2;');
  
      if (queryResult.length > 0) {
        return { fullname: queryResult[0].fullname };
      } else {
        console.log('No teachers found with a name.');
        return null;
      }
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  };

  const getAsignatureTeacherKusaka = async () => {
    try {
      const queryResult = await queryAsync('SELECT name FROM asignatures WHERE id_teacher = 2;');
  
      if (queryResult.length > 0) {
        return { name: queryResult[0].name };
      } else {
        console.log('No asignature found.');
        return null;
      }
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  };

  const getNameOfTeacherRoman = async () => {
    try {
      const queryResult = await queryAsync('SELECT fullname FROM teachers WHERE id_teacher = 3;');
  
      if (queryResult.length > 0) {
        return { fullname: queryResult[0].fullname };
      } else {
        console.log('No teachers found with a name.');
        return null;
      }
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  };

  const getAsignatureTeacherRoman = async () => {
    try {
      const queryResult = await queryAsync('SELECT name FROM asignatures WHERE id_teacher = 3;');
  
      if (queryResult.length > 0) {
        return { name: queryResult[0].name };
      } else {
        console.log('No asignature found.');
        return null;
      }
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  };


module.exports = {
  getNameOfTeacherJuan: getNameOfTeacherJuan,
  getAsignatureTeacherJuan: getAsignatureTeacherJuan,
  getNameOfTeacherKusaka: getNameOfTeacherKusaka,
  getAsignatureTeacherKusaka: getAsignatureTeacherKusaka,
  getNameOfTeacherRoman: getNameOfTeacherRoman,
  getAsignatureTeacherRoman: getAsignatureTeacherRoman
};