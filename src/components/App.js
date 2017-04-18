import React, { Component } from 'react';
import { CreateView } from './Create';
import { DashboardView } from './Dashboard';
import Settings from './Settings';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    }
  }

  async componentDidMount() {
    const tasks = await fetch(`http://localhost:8000/tasks/${this.props.userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      }
    }).then(res => res.json());
    this.setState({ tasks });
  }

  render() {
    return (
      <div>
        {this.props.view === "dashboard"
          ? <DashboardView tasks={this.state.tasks} props={this.props}/>
          : this.props.view === "create"
            ? <CreateView props={this.props}/>
            : this.props.view === "settings"
              ? <Settings props={this.props}/>
              : this.props.history.push("/")}
      </div>
    );
  }
}

export default App;