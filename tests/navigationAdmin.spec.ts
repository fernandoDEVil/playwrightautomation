import { test, expect } from '@playwright/test'

test('Check left menu options', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/')
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

    const leftMenuItems = page.getByLabel('Sidepanel').getByRole('listitem')
    const currentMenuItemsCount = await leftMenuItems.count()
    console.log('Current menu items count', currentMenuItemsCount)

    const currentMenuItems: string[] = []

    for (let i = 0; i < currentMenuItemsCount; i++) {
        const menuText = await leftMenuItems.nth(i).innerText()
        currentMenuItems.push(menuText)
    }

    console.log(currentMenuItems)

    // ASERCIÓN 1: Verificar que el primer elemento es "Admin"
    expect(currentMenuItems[0]).toBe('Admin')
    console.log('✅ El primer elemento del menú es "Admin"')

    const expectedMenuItems = [
        'Admin',
        'PIM',
        'Leave',
        'Time',
        'Recruitment',
        'My Info',
        'Performance',
        'Dashboard',
        'Directory',
        'Maintenance',
        'Claim',
        'Buzz'
    ]
    expect(currentMenuItems).toEqual(expectedMenuItems)
    console.log('✅ Todos los elementos del menú coinciden')
})