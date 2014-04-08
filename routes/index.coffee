
$ = require('jquery-deferred')
request = require('../server/request')
#mongodb = require('../mongodb')

exports.index = (req, res, params) ->
  id = req.query.id || '1863' # want to random
  enTitleUrl = "http://www.ted.com/talks/titles/id/#{id}"
  jaTitleUrl = "http://www.ted.com/talks/titles/id/#{id}/lang/ja"
  enSubtitlesUrl = "http://www.ted.com/talks/subtitles/id/#{id}"
  jaSubtitlesUrl = "http://www.ted.com/talks/subtitles/id/#{id}/lang/ja"
  $.when(request.get(enTitleUrl), request.get(jaTitleUrl), request.get(enSubtitlesUrl), request.get(jaSubtitlesUrl))
  .done (enTitleRes, jaTitleRes, enSubtitlesRes, jaSubtitlesRes) ->
    res.render 'index',
      id: id
      enTitle: enTitleRes.response
      jaTitle: jaTitleRes.response
      enSubtitles: enSubtitlesRes.captions
      enSubtitlesLeng: enSubtitlesRes.captions.length
      jaSubtitles: jaSubtitlesRes.captions
      jaSubtitlesLeng: jaSubtitlesRes.captions.length
  .fail () ->
    #if req.query.id
    res.render 'not-found',
      id: id
      fail: true
    #else
    #res.redirect('?id=1863')
    #exports.index({query: 1863}, res, params)

#url: 'https://www.ted.com/talks/1863',
