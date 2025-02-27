"use client"; 
import { Drawer, IconButton, List, ListItem, ListItemText } from "@mui/material";
import Link from "next/link";

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <div className="flex">
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="transition-transform duration-300 ease-in-out "
        BackdropProps={{ style: { backgroundColor: "transparent" } }}
      >
        <div className="w-60 bg-gray-800 h-full text-white p-4">
          <List>
            {[
              { text: "Pegawai", href: "/pegawai" },
              { text: "Jabatan", href: "/jabatan" },
              { text: "Absensi", href: "/absensi" },
            ].map((item, index) => (
              <ListItem key={index} onClick={() => setIsOpen(false)}>
                <Link href={item.href} className="w-full">
                  <ListItemText primary={item.text} className="hover:text-gray-400" />
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
