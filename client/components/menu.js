import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class Menu extends React.Component {
  state = {
    open: false
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ open: this.props.open })
    }
  }

  toggleDrawer = () => {
    this.setState({
      open: !this.state.open
    });
  };

  render() {
    const { classes } = this.props;
    const { toggleDrawer } = this;

    return (
      <div>
        <Drawer open={this.state.open} onClose={toggleDrawer}>
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
    );
  }
}

export default withStyles(styles)(Menu);

        // <Button onClick={this.toggleDrawer}>Open Menu</Button>

          // <div
          //   tabIndex={0}
          //   role="button"
          //   onClick={this.toggleDrawer}
          //   onKeyDown={this.toggleDrawer}
          // >
            
          // </div>