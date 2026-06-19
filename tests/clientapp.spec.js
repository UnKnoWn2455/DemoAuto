const { test, expect } = require('@playwright/test');

test.only('Client App Login', async ({ page }) => 
{

    const productName = 'iphone 13 pro';
    const email = 'xiao80955@gmail.com';
    const products = page.locator(".card-body");

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Amankhan@111");
    await page.getByRole("button",{name:"Login"}).click();

    await page.locator(".card-body b").first().waitFor();

    await page.locator(".card-body").filter({hasText:"iphone 13 pro"})
    .getByRole("button",{name:"Add To Cart"}).click();


    await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();


    await page.locator("div li").first().waitFor();
    
    await expect(page.getByText("iphone 13 pro")).toBeVisible()

    await page.getByRole("button",{name:"Checkout"}).click();



    //await page.locator(".input.txt.text-validated").nth(0);
    await page.locator("select.input.ddl").nth(0).selectOption("01");
    await page.locator("select.input.ddl").nth(1).selectOption("25");
    //page.locator("input.input.txt").nth(1);
    await page.locator("input.input.txt").nth(1).fill("123");
    await page.locator("input.input.txt").nth(2).fill("Aman Khan");
    await page.locator("input.input.txt").nth(3).fill("xiao80955@gmail.com");


    await page.getByPlaceholder("Select Country").pressSequentially("ind");

    await page.getByRole("button",{name:"India"}).nth(1).click();    

    await page.getByText("PLACE ORDER").click();

    await expect(page.getByText("Thankyou for the order.")).toBeVisible();


    const Orderid = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(Orderid);
    await page.locator("button[routerlink*='myorders']").click();
    const rows = page.locator("tbody tr")

    await page.locator("tbody").waitFor();

    for(let i =0; i<await rows.count(); ++i)
    {
        const rowOrderId= await rows.nth(i).locator("th").textContent();
            if (Orderid.includes(rowOrderId))
            {
                await rows.nth(i).locator("button").first().click();
                break;
            }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(Orderid.includes(orderIdDetails)).toBeTruthy();
});