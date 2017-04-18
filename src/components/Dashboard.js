import React from 'react';
import { MuiThemeProvider, Card, CardHeader, CardText, CardActions, FlatButton, AppBar } from 'material-ui';

const handleTouchTap = taskId => {
  fetch(`http://localhost:8000/tasks/${taskId}/delete`, {
    method: 'DELETE'
  }).then(res => res.json());
};

const sortTasks = tasks =>
  tasks.sort(function(a,b) {
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

export const Dashboard = tasks =>
  tasks.length !== 0
    ? sortTasks(tasks).map(task => (
      <MuiThemeProvider key={task.title}>
        <div>
          <Card style={{ width: "50%", marginLeft: "auto", marginRight: "auto"}}>
            <AppBar showMenuIconButton={false} title={task.title}/>
            <CardHeader title={task.subject} subtitle={task.dueDate}/>
            <CardText>
              <p className="description">{task.description}</p>
            </CardText>
            <CardActions>
              <FlatButton label="Completed" onTouchTap={() => {handleTouchTap(task._id); location.reload();}}/>
            </CardActions>
          </Card><br/>
        </div>
      </MuiThemeProvider>))
    : (<MuiThemeProvider key="Task">
        <div>
          <Card style={{ width: "50%", marginLeft: "auto", marginRight: "auto", textAlign: "center"}}>
            <AppBar showMenuIconButton={false} title="No Tasks"/>
            <CardText>
              <p className="description">You currently have no tasks. Good job!</p>
            </CardText>
          </Card><br/>
        </div>
      </MuiThemeProvider>);