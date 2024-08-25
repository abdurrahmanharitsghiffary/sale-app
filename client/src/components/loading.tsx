import React from "react";
import { Container, Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        minHeight="100dvh"
      >
        <CircularProgress />
      </Box>
    </Container>
  );
}
