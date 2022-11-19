import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SkillUsers extends BaseSchema {
  protected tableName = 'feed_user'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('users.id')
      table.integer('feed_id').unsigned().references('feeds.id')
      table.unique(['user_id', 'feed_id'])
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }
}
