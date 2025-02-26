import { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";

const Sidebar = (props) => {
  const { isOpen, setIsOpen } = props;

  return (
    <div className="flex">
      {/* Toggle Button */}
      <IconButton onClick={() => setIsOpen(!isOpen)} className="m-2">
        <MenuIcon className="text-white" />
      </IconButton>

      {/* Sidebar Drawer */}
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="transition-transform duration-300 ease-in-out"
      >
        <div className="w-60 bg-gray-800 h-full text-white p-4">
          <List>
            {[
              { text: "Home", href: "/" },
              { text: "Dashboard", href: "/dashboard" },
              { text: "About", href: "/about" },
            ].map((item, index) => (
              <ListItem button key={index} onClick={() => setIsOpen(false)}>
                <Link href={item.href} className="w-full">
                  <ListItemText
                    primary={item.text}
                    className="hover:text-gray-400"
                  />
                </Link>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default Sidebar;
