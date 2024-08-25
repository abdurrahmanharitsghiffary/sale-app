import React from "react";
import { Container, Typography, Box } from "@mui/material";

export default function NotFoundPage({ message }: { message: string }) {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        minHeight="100dvh"
      >
        <Typography variant="h4" color="textPrimary" gutterBottom>
          {message}
        </Typography>
      </Box>
    </Container>
  );
}
