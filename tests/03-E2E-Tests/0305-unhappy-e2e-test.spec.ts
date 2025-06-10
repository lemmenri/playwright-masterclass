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

test('Als bezoeker ben ik verplicht een voornaam op te geven', async ({ page }) => {
    // testdata
    const contactData: ContactFormData = {
        lastName: 'Doe',
        email: 'John.Doe@johndoe.com',
        subject: 'Return',
        inputMessage: 'test'.repeat(40)
    }

    // test steps
    await gegevenIkBenOpDeContactpagina(page)
    await alsIkHetContactFormulierVerzend(page, contactData)
    await danZieIkEenFoutmeldingVoorHetVoornaamveld(page)
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

async function danZieIkEenFoutmeldingVoorHetVoornaamveld(page: Page) {
    const contactPage = new ContactPage(page)
    await test.step('Dan zie ik een foutmelding voor het voornaamveld', async () => {
        await contactPage.firstNameErrorIsVisible();
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
    readonly errorFirstName: Locator;

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
        this.errorFirstName = page.getByTestId('first-name-error')
    }
    // Functions
    async goto() {
        await this.page.goto(this.url);
    }

    async fillContactForm(formData: ContactFormData) {
        formData.firstName && await this.inputFirstName.fill(formData.firstName) // check if property is used
        formData.lastName && await this.inputLastName.fill(formData.lastName)
        formData.email && await this.inputEmail.fill(formData.email)
        formData.subject && await this.selectSubject.selectOption(formData.subject)
        formData.inputMessage && await this.inputMessage.fill(formData.inputMessage)
    }

    async submitContactForm() {
        await this.btnContactSubmit.click()
    }

    async contactFormIsSendSuccesfully() {
        await expect(this.alertContactSucces).toHaveText(
            "Thanks for your message! We will contact you shortly."
        );
    }

    async firstNameErrorIsVisible() {
        await expect(this.errorFirstName).toBeVisible();
    }
}

// Custom Data Types
type ContactFormData = {
    firstName?: string,
    lastName?: string,
    email?: string,
    subject?: string, // kunnen we nog een enum van maken
    inputMessage?: string
}



// // Tests
// test('Als gebruiker kan ik', async ({ page }) => {
//     await gegevenDezeUitgangsSituatie(page)
//     // await alsActieWordtUitgevoerd(page)
//     // await danZieIkResultaat(page)
// })

// // Steps
// async function gegevenDezeUitgangsSituatie(page: Page) {
//     await test.step('Gegeven deze uitgangs situatie', async () => {
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
// type DataName = {
//     propertyOne: string, // Name of property with datatype
//     propertyTwo?: string, // ? makes the property optional
// }