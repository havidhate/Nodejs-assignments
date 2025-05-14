// urlparser.js
const url = require("url");
const querystring = require("querystring");

function parseUrl(fullUrl) {
  const parsed = url.parse(fullUrl);
  const queryParams = querystring.parse(parsed.query);

  return {
    hostname: parsed.hostname,
    pathname: parsed.pathname,
    query: queryParams,
  };
}

module.exports = parseUrl;
