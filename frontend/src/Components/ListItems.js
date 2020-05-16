import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import PeopleIcon from '@material-ui/icons/People'
import BarChartIcon from '@material-ui/icons/BarChart'
import ExitToApp from '@material-ui/icons/ExitToApp'
import Settings from '@material-ui/icons/Settings'
import AccessTime from '@material-ui/icons/AccessTime'
import ThumbsUpDown from '@material-ui/icons/ThumbsUpDown'
import ImportContacts from '@material-ui/icons/ImportContacts'
import AccountCircle from '@material-ui/icons/AccountCircle'

export const Login = (
  <div >
    <ListItem button >
      <ListItemIcon >
        <ExitToApp style={{height: '40px', width: '40px'}} />
      </ListItemIcon>
    </ListItem>
  </div>
);
export const Dashboard = (
  <div >
   <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
  </div>
);
export const Order = (
  <div >
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItem>
  </div>
);
export const Customers = (
  <div >
   <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItem>
  </div>
);
export const Reports = (
  <div >
   <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
  </div>
);
export const Products = (
  <div >
   <ListItem button>
      <ListItemIcon>
        <Settings />
      </ListItemIcon>
      <ListItemText primary="Products/Services" />
    </ListItem>
  </div>
);
export const Activity = (
  <div >
   <ListItem button>
      <ListItemIcon>
        <AccessTime />
      </ListItemIcon>
      <ListItemText primary="Activity" />
    </ListItem>
  </div>
);
export const Deals = (
  <div >
  <ListItem button>
      <ListItemIcon>
        <ThumbsUpDown />
      </ListItemIcon>
      <ListItemText primary="Deal" />
    </ListItem>
  </div>
);
export const Contacts = (
  <div >
  <ListItem button>
      <ListItemIcon>
        <ImportContacts />
      </ListItemIcon>
      <ListItemText primary="Contacts" />
    </ListItem>
  </div>
);
export const Accounts = (
  <div >
  <ListItem button>
      <ListItemIcon>
        <AccountCircle />
      </ListItemIcon>
      <ListItemText primary="Accounts" />
    </ListItem>
  </div>
);
