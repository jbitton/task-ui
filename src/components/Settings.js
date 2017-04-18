import React, { Component } from 'react';
import { MuiThemeProvider, AppBar, Card, CardActions, CardText, TextField, RaisedButton, Dialog } from 'material-ui';
import * as utils from '../assets/util';
import 'mootools';

class Settings extends Component {
  constructor(props){
    super(props);
    this.state = {
      userInfo: {},
      open: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(type, val) {
    if (val.replace(" ", '').length !== 0) {
      const userInfo = Object.clone(this.state.userInfo);
      userInfo[type] = val;
      this.setState({ userInfo });
    }
  }

  async handleSettings() {
    const updatedSettings = await utils.updateUser(this.state.userInfo, this.props.userId);
    this.setState({ open: true, userInfo: updatedSettings });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Card style={{ width: "50%", marginLeft: "auto", marginRight: "auto", textAlign: "center"}}>
            <AppBar showMenuIconButton={false} title="Account Settings"/>
            <CardText>
              <p>Please fill in all the fields you'd like to change:</p>
              <TextField hintText="Email" floatingLabelText="Change your email"
                         onChange={(e, val) => { this.handleChange("email", val)}}/><br/>
              <TextField hintText="Username" floatingLabelText="Change your username"
                         onChange={(e, val) => { this.handleChange("userName", val)}}/><br/>
              <TextField hintText="Password" floatingLabelText="Change your password" type="password"
                         onChange={(e, val) => { this.handleChange("password", val)}}/><br/>
            </CardText>
            <CardActions>
              <RaisedButton label="Change" primary={true} onTouchTap={() => this.handleSettings()}/>
            </CardActions><br/>
          </Card>
          <Dialog title="Account Settings Changed" modal={false} open={this.state.open}
                  onRequestClose={() => { this.setState({ open: false })}}>
            Your account settings have been updated!
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Settings;