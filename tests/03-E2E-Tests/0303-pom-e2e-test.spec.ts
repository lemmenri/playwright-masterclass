import test, { Locator, Page, expect } from "@playwright/test"

// Tests
test('Als bezoeker kan ik het contact formulier gebruiken', async ({ page }) => {
    await gegevenIkBenOpDeContactpagina(page)
    await alsIkHetContactFormulierVerzend(page)
    await danZieIkEenSuccesMelding(page)
})

// Steps
async function gegevenIkBenOpDeContactpagina(page: Page) {
    const contactPage = new ContactPage(page)
    await test.step('Gegeven ik ben op de contact pagina', async () => {
        await contactPage.goto()
    })
}

async function alsIkHetContactFormulierVerzend(page: Page) {
    const contactPage = new ContactPage(page)
    await test.step('Als ik het contact formulier verzend', async () => {
        await contactPage.fillContactForm()
        await contactPage.submitContactForm()
    })
}

async function danZieIkEenSuccesMelding(page: Page) {
    const contactPage = new ContactPage(page)
    await test.step('Dan zie ik een succesmelding', async () => {
        await contactPage.contactFormIsSendSuccesfully();
    })
}

// Page
class ContactPage {
    // Data members
    readonly page: Page;
    readonly url: string;
    readonly inputFirstName: Locator;
    readonly inputLastName: Locator;
    readonly inputEmail: Locator;
    readonly selectSubject: Locator;
    readonly inputMessage: Locator;
    readonly btnContactSubmit: Locator;
    readonly alertContactSucces: Locator;

    // Constants
    readonly textContactFormSucces = "Thanks for your message! We will contact you shortly."

    // Constructor
    constructor(page: Page) {
        this.page = page;
        this.url = 'https://practicesoftwaretesting.com/contact/'
        this.inputFirstName = page.getByTestId('first-name');
        this.inputLastName = page.getByTestId('last-name');
        this.inputEmail = page.getByTestId('email');
        this.selectSubject = page.getByTestId('subject');
        this.inputMessage = page.getByTestId('message');
        this.btnContactSubmit = page.getByTestId('contact-submit');
        this.alertContactSucces = page.locator(".alert-success");
    }
    // Functions
    async goto() {
        await this.page.goto(this.url);
    }

    async fillContactForm() {
        await this.inputFirstName.fill('John')
        await this.inputLastName.fill('Doe')
        await this.inputEmail.fill('John.Doe@johndoe.com')
        await this.selectSubject.selectOption('Return')
        await this.inputMessage.fill('test'.repeat(40))
    }

    async submitContactForm() {
        await this.btnContactSubmit.click()
    }

    async contactFormIsSendSuccesfully() {
        await expect(this.alertContactSucces).toHaveText(this.textContactFormSucces);
    }
}



// // Tests
// test('Als gebruiker kan ik', async ({ page }) => {
//     await gegevenDezeUitgangsSituatie(page)
//     // await alsActieWordtUitgevoerd(page)
//     // await danZieIkResultaat(page)
// })

// // Steps
// async function gegevenDezeUitgangsSituatie(page: Page) {
//     const contactPage = new ContactPage(page)
//     await test.step('Gegeven deze uitgangs situatie', async () => {
//         await contactPage.goto()
//         // TODO: implement stuff
//     })
// }

// // Page
// class ContactPage {
//     // Data members
//     readonly page: Page;
//     readonly url: string;
//     readonly h1Title: Locator;
//     // Constructor
//     constructor(page: Page) {
//         this.page = page;
//         this.url = 'https://www.pageurl.com/subpage/'
//         this.h1Title = page.getByTestId('title')
//     }
//     // Functions
//     async goto() {
//         await this.page.goto(this.url);
//     }
//     async titleIsVisible() {
//         await expect(this.h1Title).toBeVisible();
//     }
// }
