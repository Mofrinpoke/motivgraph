require 'sinatra'
require 'json'

set :public_folder, 'public'

get '/' do
  @title = "MotivGraph - 就活・自己分析用モチベーショングラフ作成ツール"
  @description = "自己分析用モチベーショングラフ作成ツール"
  erb :index
end

post '/download' do
  content_type 'application/json'
  data = JSON.parse(request.body.read)
  File.open('public/data.json', 'w') { |f| f.write(data.to_json) }
  { status: 'ok' }.to_json
end

get '/motiv' do
  @title = "就活・自己分析用モチベーショングラフ作成ツール"
  @description = "就活とか自己分析したいときに、モチベーショングラフを作って自分を可視化しよう"
  erb :motiv
end
