json.review do
  json.username @review.user.username
  json.overall  @review.overall
  json.story    @review.story
  json.style    @review.style
  json.steam    @review.steam
  json.comment  @review.comment
end