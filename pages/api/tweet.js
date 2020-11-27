const fetch = require("node-fetch");

let headers = {
  authorization:
    "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
  "x-guest-token": "1329326213484056577"
};

function extractTweets(data) {
  let tweets = Object.values(data.globalObjects.tweets).filter(
    (x) => x.in_reply_to_status_id == null
  );
  let texts = tweets.map((t) => t.full_text);
  console.log(texts);
  return texts;
}

function getMoreTweets(tweetId) {
  let url = `https://api.twitter.com/2/rux.json?include_profile_interstitial_type=1&include_blocking=1&include_blocked_by=1&include_followed_by=1&include_want_retweets=1&include_mute_edge=1&include_can_dm=1&include_can_media_tag=1&skip_status=1&cards_platform=Web-12&include_cards=1&include_ext_alt_text=true&include_quote_count=true&include_reply_count=1&tweet_mode=extended&include_entities=true&include_user_entities=true&include_ext_media_color=true&include_ext_media_availability=true&send_error_codes=true&simple_quoted_tweet=true&count=20&refsrc_tweet=${tweetId}&ext=mediaStats%2ChighlightedLabel`;
  return fetch(url, {
    method: "GET",
    headers: headers
  })
    .then((resp) => resp.json())
    .then((data) => extractTweets(data))
    .catch((e) => console.log(e));
}

export default (res, req)  => {
  console.log(res, req);
  const { id } = req.body;
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ id }));
}

// getMoreTweets('1327914527514533888');
