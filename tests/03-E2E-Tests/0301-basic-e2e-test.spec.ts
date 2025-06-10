import test, { expect } from "@playwright/test"

// e2e test
test('Contact page has correct title and URL', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/')
    await page.getByTestId('nav-contact').click()
    await expect(page.getByRole('heading', { name: 'Contact' })).toBeVisible()
    expect(page.url()).toContain('/contact')
})

