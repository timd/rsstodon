import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Feed from 'App/Models/Feed'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  public async run () {

    const uniqueKey = 'url'

    await Feed.updateOrCreateMany(uniqueKey,
      [
        {
          url: "https://www.theguardian.com/business/economics/rss",
          name: "The Guardian Economics",
          feedUpdate: DateTime.fromISO('2022-01-01T09:00:00', {zone: 'utc'}),
        },
        {
          url: "https://rss.nytimes.com/services/xml/rss/nyt/Business.xml",
          name: "New York Times Business",
          feedUpdate: DateTime.fromISO('2022-01-01T09:00:00', {zone: 'utc'}),
        },
      ]
    )
  }
}
