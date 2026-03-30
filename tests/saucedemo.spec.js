const {test, expect} = require('@playwright/test');

test('Invalid login shows error', async ({ page }) =>
{
    await page.goto('https://www.saucedemo.com/');

    await page.locator('#user-name').fill('wrong-user');
    await page.locator('#password').fill('wrong_password');
    await page.locator('#login-button').click();

    console.log(await page.locator('[data-test="error"]').textContent());
});

test('Valid login and print products', async ({ page }) =>
{
    await page.goto('https://www.saucedemo.com/');


    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    const products = page.locator('.inventory_item_name');

    console.log(await products.first().textContent());
    console.log(await products.nth(1).textContent());
    console.log(await products.nth(2).textContent());
    console.log(await products.nth(3).textContent());
    console.log(await products.nth(4).textContent());



});