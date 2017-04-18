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
  fetch(`http://ec2-52-25-60-252.us-west-2.compute.amazonaws.com:8080/tasks/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    }
  }).then(res => res.json());

export const addTask = (taskObj, id) =>
  fetch(`http://ec2-52-25-60-252.us-west-2.compute.amazonaws.com:8080/tasks/new/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: searchParams(taskObj)
  });

export const deleteTask = taskId =>
  fetch(`http://ec2-52-25-60-252.us-west-2.compute.amazonaws.com:8080/tasks/${taskId}/delete`, {
    method: 'GET'
  }).then(res => res.json());

export const loginUser = userObj =>
  fetch('http://ec2-52-25-60-252.us-west-2.compute.amazonaws.com:8080/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: searchParams(userObj)
  }).then(res => res.json());

export const addUser = userObj =>
  fetch('http://ec2-52-25-60-252.us-west-2.compute.amazonaws.com:8080/users/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: searchParams(userObj)
  }).then(res => res.json());

export const updateUser = (userObj, id) =>
  fetch(`http://ec2-52-25-60-252.us-west-2.compute.amazonaws.com:8080/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: searchParams(userObj)
  }).then(res => res.json());
