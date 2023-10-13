import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

export default function Sidebar() {
    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, ["right"]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: 350}}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <h1>hello world</h1>
        </Box>
    );

    return (
        <div>
            <React.Fragment key={"right"}>
                <Button onClick={toggleDrawer(true)}>{"Info"}</Button>
                <Drawer
                    anchor={"right"}
                    open={state["right"]}
                    onClose={toggleDrawer(false)}
                >
                    {list("right")}
                </Drawer>
            </React.Fragment>
        </div>
    );
}