import {test, expect} from '@playwright/test'

test('Check left menu options', async ({page}) => {

 await page.goto('https://opensource-demo.orangehrmlive.com/')
 await page.getByRole('textbox', {name: 'Username'}).fill('Admin')
 await page.getByRole('textbox', {name: 'Password'}).fill('admin123')
 await page.getByRole('button', {name: 'Login'}).click()

 await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()


 const leftMenuItems = page.getByLabel('Sidepanel').getByRole('listitem')
 const currentMenuItemsCount = await leftMenuItems.count()
 console.log('Current menu items count', currentMenuItemsCount)

 const currentMenuItems: string [] = []

 for (let i=0; i<currentMenuItemsCount; i++){
    const menuText = await leftMenuItems.nth(i).innerText()
    currentMenuItems.push(menuText)

 }

 console.log(currentMenuItems)

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
];
expect(currentMenuItems).toEqual(expectedMenuItems)

})

test('Navigate through the left panel', async({page}) => {

 await page.goto('https://opensource-demo.orangehrmlive.com/')
 await page.getByRole('textbox', {name: 'Username'}).fill('Admin')
 await page.getByRole('textbox', {name: 'Password'}).fill('admin123')
 await page.getByRole('button', {name: 'Login'}).click()

 await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()


 const leftMenuItems = page.getByLabel('Sidepanel').getByRole('listitem')
 const currentMenuItemsCount = await leftMenuItems.count()

 for(let i = 0; i<currentMenuItemsCount; i++){
      const menuItem = leftMenuItems.nth(i)
      const menuText = await menuItem.innerText()

      console.log('Current menu item', menuText)
     
      if (menuText !== 'Maintenance') {
        await menuItem.click()
      }
  }
})

test('Navigate through the left panel whit Maintenance', async({page}) => {

 await page.goto('https://opensource-demo.orangehrmlive.com/')
 await page.getByRole('textbox', {name: 'Username'}).fill('Admin')
 await page.getByRole('textbox', {name: 'Password'}).fill('admin123')
 await page.getByRole('button', {name: 'Login'}).click()

 await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()

 // Aumentar timeout
 test.setTimeout(60000)

 const leftMenuItems = page.getByLabel('Sidepanel').getByRole('listitem')
 const currentMenuItemsCount = await leftMenuItems.count()

 for(let i = 0; i<currentMenuItemsCount; i++){
      const menuItem = leftMenuItems.nth(i)
      const menuText = await menuItem.innerText()

      console.log('Current menu item', menuText)
     
      // Si es "Maintenance", hacer clic y luego volver atrás
      if (menuText === 'Maintenance') {
        console.log('🔄 Haciendo clic en Maintenance...')
        await menuItem.click()
        
        // Esperar que cargue la página de Maintenance
        await page.waitForLoadState('networkidle')
        console.log('✅ Página de Maintenance cargada')
        
        // Buscar y hacer clic en el botón "Atrás" o "Back"
        try {
          // Opción 1: Botón "Back" del navegador
          await page.goBack()
          console.log('⬅️ Volviendo atrás con navegador')
          
          // Opción 2: Botón "Atrás" de la interfaz (descomentar si existe)
          // await page.getByRole('button', { name: 'Back' }).click()
          // await page.getByText('Back').click()
          
          await page.waitForLoadState('networkidle')
          console.log('✅ Regresó al menú principal')
          
        } catch (error) {
          console.log('❌ Error al volver atrás:', error.message)
        }
        
      } else {
        // Para los demás items, hacer clic normal
        await menuItem.click()
        await page.waitForLoadState('networkidle')
        console.log(`✅ Navegó a: ${menuText}`)
      }
  }
})

test('Check all the qualification links', async({ page}) => {

    const expectedPages = [

      {
        menu: 'Skills',
        url: '/web/index.php/admin/viewSkills'
      },
      {
        menu: 'Education',
        url: '/web/index.php/admin/viewEducation'
      },
      {
        menu: 'Licenses',
        url: '/web/index.php/admin/viewLicenses'
      }
    ]

     await page.goto('https://opensource-demo.orangehrmlive.com/')
     await page.getByRole('textbox', {name: 'Username'}).fill('Admin')
     await page.getByRole('textbox', {name: 'Password'}).fill('admin123')
     await page.getByRole('button', {name: 'Login'}).click()

     await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()

     await page.getByRole('link', {name: 'Admin'}).click()

     await page.getByRole('navigation', {name: 'Topbar menu'}).getByText('Qualifications').click()

     const qualificationOptions = page.getByRole('menu').locator('li')

     for(let expetedPage of expectedPages){
      const menuOption = qualificationOptions.filter({hasText: expetedPage.menu})
      await menuOption.click()
      await expect(page).toHaveURL(new RegExp(expetedPage.url))

      await page.getByRole('navigation', {name: 'Topbar menu'}).getByText('Qualifications').click()
     }
})