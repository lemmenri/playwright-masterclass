import test, { expect } from "@playwright/test"

//functie
const addNumber = (a: number, b: number): number => a + b

//unit test
test('add two positive numbers', () => {
    const result = addNumber(4, 5)
    expect(result).toEqual(9)
})

// //test
// test('name', () => {
//     // TODO: implement test
// })

