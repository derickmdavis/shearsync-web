import { expect, test } from "@playwright/test";

const previewToken = "PVW_e2e-preview-token";

test.beforeEach(async ({ request }) => {
  await request.post("http://localhost:4010/__e2e/reset");
});

test("opens a read-only preview popup without persisting capabilities, referrals, or booking activity", async ({
  context,
  page,
  request,
}) => {
  const publicRequests: string[] = [];
  context.on("request", (requestEvent) => {
    const url = new URL(requestEvent.url());
    if (url.pathname.startsWith("/api/public/")) {
      publicRequests.push(`${requestEvent.method()} ${url.pathname}`);
    }
  });

  await page.goto("/");

  const previewPagePromise = page.waitForEvent("popup");
  await page.evaluate((token) => {
    window.open(`/book/maya-johnson?preview=${token}&ref=rf_should_not_persist`);
  }, previewToken);
  const previewPage = await previewPagePromise;

  await expect(
    previewPage.getByRole("heading", { name: "Booking is disabled" }),
  ).toBeVisible();
  await expect(previewPage.getByText("Let's get to know you")).toBeVisible();
  await expect(
    previewPage.getByText("Start with your contact details before selecting a service."),
  ).toBeVisible();
  await previewPage.getByPlaceholder("Enter your full name").fill("Preview Client");
  await previewPage.getByPlaceholder("(555) 123-4567").fill("555-0100");
  await previewPage.getByRole("button", { name: "Select Services" }).click();
  await expect(previewPage.getByText("Signature Cut")).toBeVisible();
  await previewPage.getByRole("button", { name: /Signature Cut/i }).click();
  await previewPage.getByRole("button", { name: "Continue" }).click();

  await expect(
    previewPage.getByRole("heading", { name: "Choose a date & time" }),
  ).toBeVisible();
  await expect(
    previewPage.getByText(
      "Sample times illustrate the booking flow and are not live availability.",
    ),
  ).toBeVisible();
  await previewPage.getByRole("button", { name: /10:00/i }).first().click();
  await previewPage.getByRole("button", { name: "Continue" }).click();

  await expect(
    previewPage.getByRole("heading", { name: "Review your booking" }),
  ).toBeVisible();
  await expect(
    previewPage.getByRole("button", { name: "Booking is disabled in preview" }),
  ).toBeDisabled();
  await expect(
    previewPage.getByRole("button", { name: /Add a reference photo/i }),
  ).toBeDisabled();
  await expect(previewPage.locator('input[type="file"]')).toBeDisabled();
  await expect.poll(() => new URL(previewPage.url()).searchParams.has("preview")).toBe(false);

  const previewStorage = await previewPage.evaluate(() => ({
    local: Object.entries(localStorage),
    session: Object.entries(sessionStorage),
  }));
  const persistedPreviewValues = [...previewStorage.local, ...previewStorage.session]
    .flat()
    .join(" ");
  expect(persistedPreviewValues).not.toContain(previewToken);
  expect(persistedPreviewValues).not.toContain("referral:maya-johnson");

  expect(publicRequests).toContain("GET /api/public/services/maya-johnson");
  expect(publicRequests).not.toContain("GET /api/public/stylists/maya-johnson");
  expect(publicRequests.every((entry) => entry === "GET /api/public/services/maya-johnson")).toBe(true);

  const backendRequests = await request.get("http://localhost:4010/__e2e/requests");
  const { data } = (await backendRequests.json()) as {
    data: Array<{ method: string; pathname: string }>;
  };
  expect(data).not.toContainEqual({ method: "GET", pathname: "/api/public/stylists/maya-johnson" });
  expect(
    data.some(
      (entry) =>
        entry.method !== "GET" && entry.pathname.startsWith("/api/public/"),
    ),
  ).toBe(false);
});
