import{expect, test} from '@playwright/test'

test ('login to hrm', async({page}) => {

 await page.goto('https://opensource-demo.orangehrmlive.com/')
 await page.getByRole('textbox', {name: 'Username'}).fill('Admin')
 await page.getByRole('textbox', {name: 'Password'}).fill('admin0000')
 await page.getByRole('button', {name: 'Login'}).click()

 await expect(page.getByText('Invalid credentials')).toBeVisible();

})