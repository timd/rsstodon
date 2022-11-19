import Parser from 'rss-parser'
import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript"

import { FeedItem } from './feedItem'

export async function feedParser(feedUrl: string) {

  let parser = new Parser()
  
  const feed = await parser.parseURL(feedUrl)

  let jsonConvert: JsonConvert = new JsonConvert()
  jsonConvert.operationMode = OperationMode.DISABLE // print some debug data
  jsonConvert.ignorePrimitiveChecks = false // don't allow assigning number to string etc.
  jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL // never allow null

  const jsonItems = feed.items.map( entry => {

    let feedItem: FeedItem
    try {
        feedItem = jsonConvert.deserializeObject(entry, FeedItem)
        return feedItem
    } catch (e) {
        console.log((<Error>e))
    }

  })

  return jsonItems

}