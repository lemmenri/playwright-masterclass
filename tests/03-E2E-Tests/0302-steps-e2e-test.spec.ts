import test, { Page, expect } from "@playwright/test"

// Tests
test('Als bezoeker kan ik het contact formulier gebruiken', async ({ page }) => {
    await gegevenIkBenOpDeContactpagina(page)
    await alsIkHetContactFormulierVerzend(page)
    await danZieIkEenSuccesMelding(page)
})

// Steps
async function gegevenIkBenOpDeContactpagina(page: Page) {
    await test.step('Gegeven ik ben op de contact pagina', async () => {
        await page.goto('https://practicesoftwaretesting.com/')
        await page.getByTestId('nav-contact').click()
    })
}

async function alsIkHetContactFormulierVerzend(page: Page) {
    await test.step('Als ik het contact formulier verzend', async () => {
        await page.getByTestId('first-name').fill('John')
        await page.getByTestId('last-name').fill('Doe')
        await page.getByTestId('email').fill('John.Doe@johndoe.com')
        await page.getByTestId('subject').selectOption('Return')
        await page.getByTestId('message').fill('test'.repeat(40))
        await page.getByTestId('contact-submit').click()
    })
}

async function danZieIkEenSuccesMelding(page: Page) {
    await test.step('Dan zie ik een succesmelding', async () => {
        await expect(page.locator(".alert-success")).toHaveText(
            "Thanks for your message! We will contact you shortly."
        );
    })
}



// // Tests
// test('Als gebruiker kan ik', async ({ page }) => {
//     await gegevenDezeUitgangssituatie(page)
//     // await alsActieWordtUitgevoerd(page)
//     // await danZieIkResultaat(page)
// })

// // Steps
// async function gegevenDezeUitgangssituatie(page: Page) {
//     await test.step('Gegeven deze uitgangssituatie', async () => {
//         // TODO: implement stuff
//     })
// }

