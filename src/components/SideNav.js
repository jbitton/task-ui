import React  from 'react';
import { MuiThemeProvider, AppBar, Divider, Drawer, Menu, MenuItem } from 'material-ui';
import '../assets/App.css';

export const SideNav = props => (
  <MuiThemeProvider>
    <div className="sidenav">
      <AppBar showMenuIconButton={false}/>
      <Drawer>
        <AppBar showMenuIconButton={false} title="to-day"/>
        <Menu autoWidth={false} style={{width: 256}}>
          <MenuItem primaryText="Dashboard" style={{width: 256}}
                    onTouchTap={() => props.history.push(`/dashboard/${props.userId}`)}/>
          <MenuItem primaryText="Create a Task" style={{width: 256}}
                    onTouchTap={() => props.history.push(`/create/${props.userId}`)}/>
          <MenuItem primaryText="Settings" style={{width: 256}}
                    onTouchTap={() => props.history.push(`/settings/${props.userId}`)}/>
          <Divider/>
          <MenuItem primaryText="Sign out" style={{width: 256}}
                    onTouchTap={() => props.history.push(`/`)}/>
        </Menu>
      </Drawer>
    </div>
  </MuiThemeProvider>
);
