const URL = 'https://to-day-api.herokuapp.com';
// UTILITY FUNCTIONS
export const searchParams = obj =>
  Object.keys(obj).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
  }).join('&');

export const sortTasks = tasks =>
  tasks.sort(function(a,b) {
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

// API CALLS
export const getTasks = userId =>
  fetch(`${URL}/tasks/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    }
  }).then(res => res.json());

export const addTask = (taskObj, id) =>
  fetch(`${URL}/tasks/new/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: searchParams(taskObj)
  });

export const deleteTask = taskId =>
  fetch(`${URL}/tasks/${taskId}/delete`, {
    method: 'DELETE'
  }).then(res => res.json());

export const loginUser = userObj =>
  fetch(`${URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: searchParams(userObj)
  }).then(res => res.json());

export const addUser = userObj =>
  fetch(`${URL}/users/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: searchParams(userObj)
  }).then(res => res.json());

export const updateUser = (userObj, id) =>
  fetch(`${URL}/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: searchParams(userObj)
  }).then(res => res.json());
