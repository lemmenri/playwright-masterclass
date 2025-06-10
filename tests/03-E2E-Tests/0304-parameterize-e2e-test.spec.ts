import test, { Locator, Page, expect } from "@playwright/test"

// Tests
test('Als bezoeker kan ik het contact formulier gebruiken', async ({ page }) => {
    // testdata
    const contactData: ContactFormData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'John.Doe@johndoe.com',
        subject: 'Return',
        inputMessage: 'test'.repeat(40)
    }

    // test steps
    await gegevenIkBenOpDeContactpagina(page)
    await alsIkHetContactFormulierVerzend(page, contactData)
    await danZieIkEenSuccesMelding(page)
})

// Steps
async function gegevenIkBenOpDeContactpagina(page: Page) {
    const contactPage = new ContactPage(page)
    await test.step('Gegeven ik ben op de contact pagina', async () => {
        await contactPage.goto()
    })
}

async function alsIkHetContactFormulierVerzend(page: Page, contactData: ContactFormData) {
    const contactPage = new ContactPage(page)
    await test.step('Als ik het contact formulier verzend', async () => {
        await contactPage.fillContactForm(contactData)
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

    async fillContactForm(formData: ContactFormData) {
        await this.inputFirstName.fill(formData.firstName)
        await this.inputLastName.fill(formData.lastName)
        await this.inputEmail.fill(formData.email)
        await this.selectSubject.selectOption(formData.subject)
        await this.inputMessage.fill(formData.inputMessage)
    }

    async submitContactForm() {
        await this.btnContactSubmit.click()
    }

    async contactFormIsSendSuccesfully() {
        await expect(this.alertContactSucces).toHaveText(
            "Thanks for your message! We will contact you shortly."
        );
    }
}

// Custom Data Types
type ContactFormData = {
    firstName: string,
    lastName: string,
    email: string,
    subject: string, // kunnen we nog een enum van maken
    inputMessage: string
}

// // Tests
// test('Als gebruiker kan ik', async ({ page }) => {
//     // testdata
//     const testData: DataTypeName = {
//         propertyOne: 'John',
//     }

//     // test steps
//     // await gegevenDezeUitgangsSituatie(page)
//     await alsActieWordtUitgevoerdMetTestdata(page, testData)
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
// class NamePage {
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

// // Custom Data Types
// type DataTypeName = {
//     propertyOne: string, // Name of property with datatype
// }
