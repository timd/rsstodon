import { login, MastoClient } from 'masto'

const mastodonUrl = process.env.MASTODON_URL || ''
const mastodonToken = process.env.MASTODON_TOKEN || ''

export async function mastoLogin() {
  return await login({
    url: mastodonUrl,
    accessToken: mastodonToken
  })
}

export async function tootResults(mastodonClient, jsonItems) {

  const tootResults = await Promise.all(
      
    jsonItems.map( async (item) => {
  
      console.log(item?.title);
  
      const tootContent = `${item?.title} \n\n ${item?.link}`
  
      if (item) {
        return await toot(mastodonClient, tootContent)
      }
    
    })
  )

  return tootResults
}

export async function toot(mastoClient: MastoClient, payload: string) {

  try {

    const result = await mastoClient.statuses.create({
      status: payload,
      visibility: 'public'
    })
    
    console.log(result.id)

    return result

  } catch (err) {
    console.log(err)
  }

}