import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";
import Link from "next/link";

function NotFound() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          mb: 2,
          fontSize: "10rem",
          fontWeight: "bold",
          color: "grey.300",
        }}
      >
        404
      </Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Link href="/sale" passHref>
        <Button variant="contained" color="primary" startIcon={<HomeIcon />}>
          Go to Sale
        </Button>
      </Link>
    </Container>
  );
}

export default NotFound;
