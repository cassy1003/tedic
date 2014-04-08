
$ = require('jquery-deferred')
request = require('request')

exports.get = (url) ->
  $.Deferred (d) ->
    request {url: url, json: true}, (error, response, body) ->
      console.log(url)
      console.log response.statusCode
      if !error and response.statusCode is 200
        d.resolve(body)
      else
        d.reject(error, response)
