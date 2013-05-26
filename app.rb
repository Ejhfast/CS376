require 'sinatra'
require 'json'
require 'dino'

get '/finger_data' do 
  data = []
  ["A0","A1","A2","A4","A5"].map{|x| x+"_file"}.each do |f|
    data.push(Marshal.load(IO.read(f)))
  end
  data.to_json
end

get '/' do
  File.read(File.join('public', 'index.html'))
end