import * as types from './actionType';
import { normalizeResponseErrors } from './utils';

//----- SYNC ACTIONS -----//

// UNIVERSAL: Toggle Loading
export const fetchClassesRequest = () => ({
  type: types.FETCH_CLASSES_REQUEST,
});
// UNIVERSAL: Toggle Error
export const fetchClassesError = (err) => ({
  type: types.FETCH_CLASSES_ERROR,
  err,
});

export const fetchClassesSuccess = () => ({
  type: types.FETCH_CLASSES_SUCCESS,
})

// STUDENT: Search class by teacher name
export const searchClassesSuccess = (classes) => ({
  type: types.SEARCH_CLASSES_SUCCESS,
  classes,
});

// STUDENT: Retrieve all enrolled classes
export const fetchClassesByStudentSuccess = (classes) => ({
  type: types.FETCH_CLASSES_BY_STUDENT_SUCCESS,
  classes,
});

// TEACHER: Retrieve all created classes
export const fetchClassesByTeacherSuccess = (classes) => ({
  type: types.FETCH_CLASSES_BY_TEACHER_SUCCESS,
  classes,
});

//----- STUDENT: ASYNC ACTIONS  -----//

// STUDENT: Search class by teacher name // CONNECTED
export const searchClasses = lastName => (dispatch, getState) => {
  dispatch(fetchClassesRequest());
  return fetch(`http://localhost:8080/api/classes/search/${lastName}`)
  .then(res => res.json())
  .then(classes => dispatch(searchClassesSuccess(classes)))
  .catch((err) => {
    dispatch(fetchClassesError(err));
  });
};

// STUDENT: Enroll to an existing class // CONNECTED
export const enrollClass = (data) => (dispatch, getState) => {

  return fetch(`http://localhost:8080/api/classes/student/enroll/${data.classID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json',
          },
        body: JSON.stringify(data),
      })
     .then(res => normalizeResponseErrors(res))
    //  .then(res => {res.json()})
     .then(() => dispatch(fetchClassesByStudent(data.studentID)))
     .catch((err) => {
      dispatch(fetchClassesError(err));
    });
};

// STUDENT: Retrieve all enrolled classes // CONNECTED
export const fetchClassesByStudent = studentID => (dispatch, getState) => {
  dispatch(fetchClassesRequest());
  return fetch(`http://localhost:8080/api/classes/student/${studentID}`)
  .then(res => res.json())
  .then(classes => dispatch(fetchClassesByStudentSuccess(classes)))
  // .then(() => dispatch(fetchClassesSuccess()))
  .catch((err) => {
    dispatch(fetchClassesError(err));
  });
};

//----- TEACHER: ASYNC ACTIONS  -----//

// TEACHER: Create a new class // CONNECTED
export const createClass = (data) => (dispatch, getState) => {
  dispatch(fetchClassesRequest());
  return fetch('http://localhost:8080/api/classes/teacher/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json',
          },
        body: JSON.stringify(data),
      })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(() => dispatch(fetchClassesByTeacher(data.id)))
    .catch((err) => {
      dispatch(fetchClassesError(err));
    });
};

// TEACHER: Retrieves all created classes // CONNECTED
export const fetchClassesByTeacher = teacherID => (dispatch, getState) => {
  dispatch(fetchClassesRequest());
  return fetch(`http://localhost:8080/api/classes/teacher/${teacherID}`)
  .then(res => res.json())
  .then(classes => dispatch(fetchClassesByTeacherSuccess(classes)))
  .catch((err) => {
    dispatch(fetchClassesError(err));
  });
};