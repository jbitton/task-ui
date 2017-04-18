import React from 'react';
import { MuiThemeProvider, Card, CardHeader, CardText, CardActions, FlatButton, AppBar } from 'material-ui';
import * as utils from '../assets/util';

export const Dashboard = tasks =>
  tasks.length !== 0
    ? utils.sortTasks(tasks).map(task => (
      <MuiThemeProvider key={task.title}>
        <div>
          <Card style={{ width: "50%", marginLeft: "auto", marginRight: "auto"}}>
            <AppBar showMenuIconButton={false} title={task.title}/>
            <CardHeader title={task.subject} subtitle={task.dueDate.split('T')[0]} actAsExpander={true}
                        showExpandableButton={true}/>
            <CardText expandable={true}>
              <p className="description">{task.description}</p>
            </CardText>
            <CardActions>
              <FlatButton label="Completed" onTouchTap={() => {utils.deleteTask(task._id); location.reload();}}/>
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