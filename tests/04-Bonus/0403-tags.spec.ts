import test, { expect } from "@playwright/test"

test('Contact page has correct title and URL @tag1 @smoketest', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/contact')
    await expect(page.getByRole('heading', { name: 'Contact' })).toBeVisible()
})

test('Contact page has correct title and URL @tag2', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/contact')
    await expect(page.getByRole('heading', { name: 'Contact' })).toBeVisible()
})


// npx playwright test --grep "@tag1"