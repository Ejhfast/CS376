require 'sinatra'
require 'json'

get '/finger_data' do 
  data = []
  ["A4","A5"].map{|x| x+"_file"}.each do |f|
    data.push(IO.read(f))
  end
  data.to_json
end

get '/' do
  File.read(File.join('public', 'index.html'))
end