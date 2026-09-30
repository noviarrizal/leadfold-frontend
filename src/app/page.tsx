"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export default function HomePage() {
  return (
    <Container maxWidth="sm" sx={{ py: { xs: 10, sm: 16 } }}>
      <Stack spacing={3} alignItems="center" textAlign="center">
        <Typography variant="h3" component="h1" fontWeight={700}>
          Leadfold
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Turns messy WhatsApp, form, and DM messages into clean, structured
          leads pushed straight into your CRM — no more manual data entry.
        </Typography>
        <Box>
          <Stack direction="row" spacing={2}>
            <Button component={Link} href="/signup" variant="contained" size="large">
              Get started
            </Button>
            <Button component={Link} href="/login" variant="outlined" size="large">
              Log in
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
