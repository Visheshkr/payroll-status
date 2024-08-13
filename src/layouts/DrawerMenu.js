import * as MuiIcons from "@mui/icons-material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { hasChildren } from "../utils/MenuUtils";
export default function DrawerMenu() {
  // const getIcon = ({ iconName }) => <div>{MuiIcons[iconName]}</div>;

  const [selectedItem, setSelectedItem] = useState(null);
  const [menu1, setMenu1] = useState([]);

  const location = useLocation();

  var myObject1 = [
    {
      // icon: <DashboardIcon />,
      icon: MuiIcons["Dashboard"],
      menuName: "Dashboard",
      link: "/home",
    },



  ];

  useEffect(() => {
    // if (store.getState().user.status === "success") {
    // console.log(user.data.data.userdetails.subMenuList);
    // console.log(Object.keys(user.data.data.userdetails.menuList).length );
    // }

    fillMenu();
    const selectedMenu = menu1.find(
      (item) => item.menuCode === location.pathname
    );

    setSelectedItem(selectedMenu);
  }, []);

  // console.log(user.data.userdetails.menuList)
  const fillMenu = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_PAYROLL_API_URL}/user/menu/${localStorage.getItem(
        "userId"
      )}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    const user = res.data;
// console.log("user::",user);
    // Extracting Dashboard menu if it exists
    const dashboardMenu = myObject1.find((item) => item.menuName === "Dashboard");

    // Remove Dashboard menu from the original list
    const filteredMenus = myObject1.filter((item) => item.menuName !== "Dashboard");

    // Adding Dashboard menu at the beginning
    const sortedMyObject = [
      ...filteredMenus
    ];

    for (let i = 0; i < Object.keys(user.parentMenuList).length; i++) {
      sortedMyObject.push({
        icon: MuiIcons[user.parentMenuList[i].icon],
        menuName: user.parentMenuList[i].menuName,
        items: user.subMenuList.filter(
          (x) => x.parentMenuId === user.parentMenuList[i].menuId
        ),
      });
    }

    // Sorting the final menu
    const finalSortedMenu = sortedMyObject
      .slice()
      .sort((a, b) => a.menuName.localeCompare(b.menuName));

    finalSortedMenu.forEach((obj) => {
      if (obj.items) {
        obj.items.sort((a, b) => a.menuName.localeCompare(b.menuName));
      }
    });

    // Filtering and setting the menu
    const filteredSortedMyObject = finalSortedMenu.filter(
      (obj) => obj.menuName !== "Master" && obj.menuName !== "Operations"
    );

    // Adding Dashboard menu back at the beginning
    const finalMenu = [dashboardMenu, ...filteredSortedMyObject];

    setMenu1(finalMenu);
  };

  return menu1?.map((item, key) => (
    <Box key={key}>
      <MenuItem key={key} item={item} />
    </Box>
  ));
}

const MenuItem = ({
  item,
  selected,
  onSelect,
  selectedChild,
  setSelectedChild,
}) => {
  const Component = hasChildren(item) ? MultiLevel : SingleLevel;
  //console.log(item.role);
  return (
    <Component
      item={item}
      selected={selected}
      onSelect={onSelect}
      selectedChild={selectedChild}
      setSelectedChild={setSelectedChild}
    />
  );
};

const SingleLevel = ({ item, selected, onSelect }) => {
  // console.log(item);
  //
  return (
    <Link
      to={item.link}
      style={{
        textDecoration: "none",
        display: "block",
        color: selected ? "#2169b3" : "#666666",
      }}
    >
      <ListItem
        button
        // onClick={() => onSelect(item)}
        style={{ backgroundColor: selected ? "#f2f9ff" : "inherit" }}
      >
        <ListItemIcon style={{ color: selected ? "#2169b3" : "#666666" }}>
          {item.icon ? <item.icon /> : null}
        </ListItemIcon>
        <Link
          to={item.link}
          style={{
            textDecoration: "none",
            display: "block",
            color: selected ? "#2169b3" : "#666666",
          }}
        >
          <ListItemText primary={item.menuName} />
        </Link>
      </ListItem>
    </Link>
  );
};

const MultiLevel = ({
  item,
  selected,
  onSelect,
  selectedChild,
  setSelectedChild,
}) => {
  const navigate = useNavigate();

  // console.log(item);
  // console.log(localStorage.getItem("userid"));
  const { items: children } = item;
  // console.log(item);
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handlenavigate = (link) => {
    navigate(link);
  };
  const handleEvent = () => {
    handleToggle();
    // onSelect(item);
  };
  return (
    <React.Fragment>
      <ListItem
        component="div"
        button
        onClick={handleEvent}
        style={{ backgroundColor: selected ? "#f2f9ff" : "inherit" }}
      >
        <ListItemIcon style={{ color: selected ? "#2169b3" : "#666666" }}>
          {item.icon ? <item.icon /> : null}
        </ListItemIcon>
        <ListItemText
          primary={item.menuName}
          style={{
            color: selected ? "#2169b3" : "#666666",
            fontFamily: "Lato,serif",
          }}
        />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children.map((child, key) => (
            <Link
              key={key}
              // onClick={() => setSelectedChild(child)}
              to={child.link}
              style={{
                textDecoration: "none",
                display: "block",
                color: selectedChild === child ? "#2169b3" : "inherit",
              }}
            >
              <MenuItem
                key={key}
                item={child}
                href={child.link}
                component={child.link}
                selected={child === selectedChild}
                onSelect={setSelectedChild}
                onClick={(child) => child.link}
              />
            </Link>
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
};
