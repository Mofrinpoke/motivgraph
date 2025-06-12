
require 'sinatra'
require 'json'

set :public_folder, 'public'

get '/' do
  erb :index
end

post '/download' do
  content_type 'application/json'
  data = JSON.parse(request.body.read)
  File.open('public/data.json', 'w') { |f| f.write(data.to_json) }
  { status: 'ok' }.to_json
end
