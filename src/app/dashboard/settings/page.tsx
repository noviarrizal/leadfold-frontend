"use client";

import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { getApiKey } from "@/lib/auth";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    setApiKey(getApiKey());
  }, []);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
  const formWebhookUrl = apiKey ? `${apiUrl}/webhooks/form/${apiKey}` : "";

  return (
    <Stack spacing={3} maxWidth={600}>
      <Typography variant="h5" fontWeight={700}>
        Settings
      </Typography>

      <Paper variant="outlined" sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Typography variant="subtitle1" fontWeight={600}>
            API key
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Used to authenticate Zapier/Make connections (header <code>x-api-key</code>) and to
            build your form webhook URL below.
          </Typography>
          <TextField value={apiKey ?? "—"} slotProps={{ input: { readOnly: true } }} fullWidth />
        </Stack>
      </Paper>

      <Paper variant="outlined" sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Typography variant="subtitle1" fontWeight={600}>
            Form webhook URL
          </Typography>
          <Typography variant="body2" color="text.secondary">
            POST <code>{"{ \"message\": \"...\" }"}</code> (or any fields your form collects) to
            this URL from any form/widget embedded on your own site — each submission becomes a
            parsed lead.
          </Typography>
          <TextField value={formWebhookUrl} slotProps={{ input: { readOnly: true } }} fullWidth />
        </Stack>
      </Paper>

      <Alert severity="info">
        WhatsApp connection and Zapier/Make setup aren&apos;t wired into this dashboard yet — see
        the backend README&apos;s &quot;Not built yet&quot; section.
      </Alert>
    </Stack>
  );
}
