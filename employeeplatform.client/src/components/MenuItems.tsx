import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PersonIcon from '@mui/icons-material/Person';
import StorefrontIcon from '@mui/icons-material/Storefront';
import useAuthStore from '../store/AuthStore';
import { Link } from 'react-router-dom'

const menuOptions = [
    { route: "dashboard", name: "Dashboard", icon: <DashboardIcon />, requiredRoles: ["Administrator", "Employee"] },
    { route: "requests", name: "Requests", icon: <EditNoteIcon />, requiredRoles: ["Administrator", "Employee"] },
    { route: "employees", name: "Employees", icon: <PersonIcon />, requiredRoles: ["Administrator"] },
    { route: "locations", name: "Locations", icon: <StorefrontIcon />, requiredRoles: ["Administrator"] }]


const MenuItems = () => {
    const userRoles = useAuthStore((state) => state.role);

    const hasRequiredRoles = (requiredMenuRoles: string[]) => {
        const result = userRoles.filter(userRole => requiredMenuRoles.some(requiredRole => userRole === requiredRole))
        return Boolean(result.length);
    }   

    return (<React.Fragment>

        {menuOptions.map((menuOption,index) => {
            if (hasRequiredRoles(menuOption.requiredRoles)) {
                return (< Link key={index} to={menuOption.route} >
                    <ListItemButton>
                        <ListItemIcon>
                            {menuOption.icon}
                        </ListItemIcon>
                        <ListItemText sx={{ color: 'black' }} primary={menuOption.name} />
                    </ListItemButton>
                </Link>)
            } else return <></>
        }
        )}

    </React.Fragment>)
}
 export default MenuItems;