import { defineConfig, devices } from "@playwright/test";

const apiOrigin = "http://localhost:4010";
const webOrigin = "http://localhost:3001";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  fullyParallel: false,
  use: {
    baseURL: webOrigin,
    trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: [
    {
      command: "node e2e/mock-booking-api.mjs",
      url: `${apiOrigin}/health`,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "npm run dev",
      url: webOrigin,
      reuseExistingServer: !process.env.CI,
      env: {
        API_BASE_URL: apiOrigin,
        NEXT_PUBLIC_API_BASE_URL: apiOrigin,
        NEXT_PUBLIC_SUPABASE_URL: apiOrigin,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: "e2e-anon-key",
        NEXT_PUBLIC_WEB_APP_URL: webOrigin,
      },
    },
  ],
});
