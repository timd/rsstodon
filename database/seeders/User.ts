import User from 'App/Models/User'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  public async run () {
    
    const uniqueKey = 'email'

    await User.updateOrCreateMany(uniqueKey,
      [
        {
          name: "Tim Duckett",
          email: "tim@duckett.de"
        },
        {
          name: "Lucy Toman",
          email: "lucy@toman.me.uk"
        },
      ]
    )
  }
}
