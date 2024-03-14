json.reviews do
  json.array! @reviews do |review|
    json.id review.id
    json.username  review.user.username
    json.overall   review.overall
    json.story     review.story
    json.style     review.style
    json.steam     review.steam
    json.comment   review.comment
    json.book_id   review.book_id
    json.title     review.title
    json.thumbnail review.thumbnail
    json.author    review.author
  end
end