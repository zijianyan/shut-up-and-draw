import React, { Component, Fragment } from 'react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import Menu from './menu'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  list: { // for menu
    width: 250,
  },
  fullList: { // for menu
    width: 'auto',
  },
};

class ButtonAppBar extends Component {
  state = {
    menu: false
  }

  toggleMenu = ()=> {
    this.setState({ menu: !this.state.menu })
  }

  render() {
    const { classes } = this.props;
    const { toggleMenu } = this;
    const { menu } = this.state;

    return (
      <Fragment>
        <div className={classes.root}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon onClick={toggleMenu}/>
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Logo
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </div>

        <div>
          <Drawer open={menu} onClose={toggleMenu}>
            <div className={classes.list}>
              <List>
                <ListItem button>
                  <ListItemIcon><InboxIcon /></ListItemIcon>
                  <ListItemText primary='Active Games' />
                </ListItem>
                <ListItem button>
                  <ListItemIcon><InboxIcon /></ListItemIcon>
                  <ListItemText primary='Finished Games' />
                </ListItem>
                <ListItem button>
                  <ListItemIcon><InboxIcon /></ListItemIcon>
                  <ListItemText primary='Create a Game' />
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem button>
                  <ListItemIcon><InboxIcon /></ListItemIcon>
                  <ListItemText primary='Friends List' />
                </ListItem>
                <ListItem button>
                  <ListItemIcon><InboxIcon /></ListItemIcon>
                  <ListItemText primary='Logout' />
                </ListItem>
              </List>
            </div>
          </Drawer>
        </div>
      </Fragment>
    );
  }
  
}

export default withTheme()(withStyles(styles)(ButtonAppBar));