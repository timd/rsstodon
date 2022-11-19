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

import Feed from 'App/Models/Feed'
import User from 'App/Models/User'
import Route from '@ioc:Adonis/Core/Route'
import { feedParser } from '../app/lib/feedParser'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import { mastoLogin, tootResults } from '../app/lib/tooter'

Route.get('/', async () => {

  const jsonItems = await feedParser('https://www.theguardian.com/business/economics/rss')
  
  const mastoClient = await mastoLogin()

  const results = await tootResults(mastoClient, jsonItems);

  return results

})

Route.get('/feeds',async () => {
  const feeds = await Feed.all()
  console.log(feeds)
  return { feeds }
})

Route.get('/users',async () => {
  const users = await User.all()
  console.log(users)
  return { users }
})

Route.get('/attach',async () => {
  const feed = await Feed.findOrFail(1)
  const user = await User.findOrFail(1)
  await user.related('feeds').attach([feed.id])
  return { feed }
})

Route.get('/detach',async () => {
  const feed = await Feed.findOrFail(2)
  const user = await User.findOrFail(1)
  await user.related('feeds').detach([feed.id])
  return { feed }
})

Route.get('/relationships',async () => {

  const users = await User
  .query()
  .preload('feeds')

  const feeds = await Feed
  .query()
  .preload('users')

  return { 
    users: users,
    feeds: feeds
   }
})

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()
  
  return report.healthy
    ? response.ok(report)
    : response.badRequest(report)
})
