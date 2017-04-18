import React from 'react';
import { MuiThemeProvider, Card, CardHeader, CardText, CardActions, FlatButton, AppBar } from 'material-ui';
import { SideNav } from './SideNav';

const Dashboard = tasks =>
  tasks.map(task => (
    <MuiThemeProvider key={task.title}>
      <div>
        <Card style={{width: "50%", marginLeft: "auto", marginRight: "auto"}}>
          <AppBar showMenuIconButton={false} title={task.title}/>
          <CardHeader title={task.subject} subtitle={task.dueDate}/>
          <CardText>
            <p className="description">{task.description}</p>
          </CardText>
          <CardActions>
            <FlatButton label="Completed" onTouchTap={handleTouchTap(task._id)}/>
          </CardActions>
        </Card><br/>
      </div>
    </MuiThemeProvider>
    )
  );

const handleTouchTap = taskId => {

};

const sortTasks = props =>
  props.tasks.sort(function(a,b) {
    return new Date(a.dueDate) - new Date(b.dueDate);
});

export const DashboardView = props => (
  <div>
    <SideNav {...props.props}/>
    <div className="wrapper">
      <br/>
      {Dashboard(sortTasks(props))}
    </div>
  </div>
);