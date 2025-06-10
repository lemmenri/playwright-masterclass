import test, { expect } from "@playwright/test"

// api test
test('api returns data succesfully', async ({ request }) => {
    const data = await request.get('https://www.google.com/')
    expect(data.ok()).toBeTruthy()
})

