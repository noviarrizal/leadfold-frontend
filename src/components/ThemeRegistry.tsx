"use client";

import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { theme } from "@/theme";

// The theme object contains functions (breakpoints.up/.down/etc), which can't
// be passed as a prop from a Server Component into a Client Component across
// the RSC boundary. Importing it here, inside the client component itself,
// avoids that — don't move `theme={theme}` back up into layout.tsx.
export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
