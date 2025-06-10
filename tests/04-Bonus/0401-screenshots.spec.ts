import test, { Locator, Page, TestInfo, expect } from "@playwright/test"

// Tests
test('Als bezoeker kan ik het contact formulier gebruiken @screenshot', async ({ page }, testInfo) => {
    // testdata
    const contactData: ContactFormData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'John.Doe@johndoe.com',
        subject: 'Return',
        inputMessage: 'test'.repeat(40)
    }

    // test steps
    await gegevenIkBenOpDeContactpagina(page, testInfo)
    await alsIkHetContactFormulierVerzend(page, testInfo, contactData)
    await danZieIkEenSuccesMelding(page, testInfo)
})

test('Als bezoeker ben ik verplicht een voornaam op te geven @screenshot', async ({ page }, testInfo) => {
    // testdata
    const contactData: ContactFormData = {
        lastName: 'Doe',
        email: 'John.Doe@johndoe.com',
        subject: 'Return',
        inputMessage: 'test'.repeat(40)
    }

    // test steps
    await gegevenIkBenOpDeContactpagina(page, testInfo)
    await alsIkHetContactFormulierVerzend(page, testInfo, contactData)
    await danZieIkEenFoutmeldingVoorHetVoornaamveld(page, testInfo)
})

// Steps
async function gegevenIkBenOpDeContactpagina(page: Page, testInfo: TestInfo) {
    const contactPage = new ContactPage(page)
    await test.step('Gegeven ik ben op de contact pagina', async () => {
        await contactPage.goto()
        const screenshot = await page.screenshot();
        await testInfo.attach('Gegeven ik ben op de contact pagina', { body: screenshot, contentType: 'image/png' });
    })
}

async function alsIkHetContactFormulierVerzend(page: Page, testInfo: TestInfo, contactData: ContactFormData) {
    const contactPage = new ContactPage(page)
    await test.step('Als ik het contact formulier verzend', async () => {
        await contactPage.fillContactForm(contactData)
        const screenshot = await page.screenshot();
        await testInfo.attach('Als ik het contact formulier verzend', { body: screenshot, contentType: 'image/png' });
        await contactPage.submitContactForm()
    })
}

async function danZieIkEenSuccesMelding(page: Page, testInfo: TestInfo) {
    const contactPage = new ContactPage(page)
    await test.step('Dan zie ik een succesmelding', async () => {
        await contactPage.contactFormIsSendSuccesfully();
        const screenshot = await page.screenshot();
        await testInfo.attach('Dan zie ik een succesmelding', { body: screenshot, contentType: 'image/png' });
    })
}

async function danZieIkEenFoutmeldingVoorHetVoornaamveld(page: Page, testInfo: TestInfo) {
    const contactPage = new ContactPage(page)
    await test.step('Dan zie ik een foutmelding voor het voornaamveld', async () => {
        await contactPage.firstNameErrorIsVisible();
        const screenshot = await page.screenshot();
        await testInfo.attach('Dan zie ik een foutmelding voor het voornaamveld', { body: screenshot, contentType: 'image/png' });
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
