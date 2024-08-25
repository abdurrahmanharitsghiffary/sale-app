import {
  Box,
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { PropsWithChildren } from "react";
import { Receipt, Add } from "@mui/icons-material";
import Link from "next/link";

interface ItemOption {
  text: string;
  icon: React.ReactNode;
  id: string;
  href: string;
}

const items: ItemOption[] = [
  { icon: <Receipt />, text: "Sale", id: "sales", href: "/sale" },
  {
    icon: <Add />,
    text: "Create Sale",
    id: "create-sale",
    href: "/sale/create",
  },
];

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <Box display={"flex"} maxHeight={"100dvh"}>
      <Box
        sx={{
          minHeight: "100dvh",
          width: "100%",
          maxWidth: "270px",
        }}
        className="border-r-zinc-200 border-r-2"
      >
        <List>
          {items.map((item) => (
            <ListItem
              key={item.id}
              component={Link}
              href={item.href}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box className="flex flex-col w-full">
        <Card
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            borderRadius: 0,
            display: "flex",
            alignItems: "center",
            boxShadow: 4,
          }}
          className="sticky top-0 inset-x-0 p-5"
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "1.25rem" }}>
            Dashboard
          </Typography>
        </Card>
        <Box className="bg-zinc-100 p-4 overflow-y-auto w-full">{children}</Box>
      </Box>
    </Box>
  );
}
