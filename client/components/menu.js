import React, { Component, Fragment } from 'react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
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
// import WhatsHot from '@material-ui/icons/WhatsHot';
import Done from '@material-ui/icons/Done';
import Stars from '@material-ui/icons/Stars';
import Input from '@material-ui/icons/Input';
import Launch from '@material-ui/icons/Launch';


import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {logout} from '../store'




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

class Menu extends Component {
  state = {
    menu: false
  }

  toggleMenu = ()=> {
    this.setState({ menu: !this.state.menu })
  }

  render() {
    const { classes, isLoggedIn, handleLogout } = this.props;
    const { toggleMenu } = this;
    const { menu } = this.state;

    return (
      <Fragment>
        <div className={classes.root}>
          <AppBar position="static" style={{}}>
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon onClick={toggleMenu}/>
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.grow} component={Link} to='/home'>
                <img src='/shut-up-and-draw-logo-white-small.png'/>
              </Typography>
            </Toolbar>
          </AppBar>
        </div>

        <div>
          <Drawer open={menu} onClose={toggleMenu}>
            <div className={classes.list}>
              {
                isLoggedIn
                  ? <List>
                      <ListItem button component={Link} to='/games' onClick={toggleMenu}>
                        <ListItemIcon></ListItemIcon>
                        <ListItemText primary='Active Games'/>
                      </ListItem>
                      <ListItem button component={Link} to='/selectplayers' onClick={toggleMenu}>
                        <ListItemIcon><Stars /></ListItemIcon>
                        <ListItemText primary='Create a Game' />
                      </ListItem>
                    </List>
                  : null
              }
              <Divider />
              <List>
                {
                  isLoggedIn
                    ? <ListItem button onClick={()=> {
                        handleLogout();
                        toggleMenu();
                      }}>
                        <ListItemIcon><Launch /></ListItemIcon>
                        <ListItemText primary='Logout' />
                      </ListItem>
                    : <ListItem button component={Link} to='/login' onClick={toggleMenu}>
                        <ListItemIcon><Input /></ListItemIcon>
                        <ListItemText primary='Login' />
                      </ListItem>
                }
              </List>
            </div>
          </Drawer>
        </div>
      </Fragment>
    );
  }

}

const mapStateToProps = (state)=> {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    handleLogout: ()=> {
      dispatch(logout())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme()(withStyles(styles)(Menu)));
