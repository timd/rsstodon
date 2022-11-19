import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("FeedItem")
export class FeedItem {

  @JsonProperty("title", String)
  title: string = ""

  @JsonProperty("link", String)
  link: string = ""

  @JsonProperty("dc:date", String)
  pubDate: string = ""

  @JsonProperty("content", String)
  content: string = ""

}