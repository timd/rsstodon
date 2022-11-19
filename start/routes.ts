/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import { feedParser } from '../app/lib/feedParser'
import { mastoLogin, toot } from '../app/lib/tooter'

Route.get('/', async () => {
  
  const jsonItems = await feedParser('https://www.theguardian.com/business/economics/rss')
  
  const mastoClient = await mastoLogin()
  
  const tootResults = await Promise.all(
    
    jsonItems.map( async (item) => {

      console.log(item?.title);

      const tootContent = `${item?.title} \n\n ${item?.link}`

      if (item) {
        return await toot(mastoClient, tootContent)
      }
    
    })
  )

  return tootResults

})
