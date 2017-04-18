export const getTasks = userId =>
  fetch(`http://localhost:8000/tasks/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    }
  }).then(res => res.json());