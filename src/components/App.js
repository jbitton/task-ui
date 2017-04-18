import React, { Component } from 'react';
import Create from './Create';
import { Dashboard } from './Dashboard';
import { SideNav } from './SideNav';
import Settings from './Settings';
import * as utils from '../assets/util';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      userId: this.props.userId
    }
  }

  async componentDidMount() {
    const tasks = await utils.getTasks(this.state.userId);
    this.setState({ tasks });
  }

  async componentWillReceiveProps(newProps) {
    if (this.props.view !== newProps.view) {
      const tasks = await utils.getTasks(this.state.userId);
      this.setState({ tasks });
    }
  }

  render() {
    return (
      <div>
        <SideNav history={this.props.history} userId={this.state.userId}/>
        <div className="wrapper">
          <br/>
          {this.props.view === "dashboard"
            ? Dashboard(this.state.tasks)
            : this.props.view === "create"
              ? <Create userId={this.state.userId}/>
              : this.props.view === "settings"
                ? <Settings userId={this.state.userId}/>
                : this.props.history.push("/")}
        </div>
      </div>
    );
  }
}

export default App;