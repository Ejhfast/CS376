require 'json'
hsh = Hash.new([])
g1 = ["a","b","c","d","e","f","g"]
g2 = ["h","i","j","k","l","m","n"]
g3 = ["o","p","q","r","s","t","u"]
g4 = ["v","w","x","y","z"]
word_list = IO.read("en_50k.txt").split("\n").map{|line| line.split(" ")}.each do |pair|
  
  gp = pair[0].split(//).map do |x|
    if g1.include?(x)
      "1"
    elsif g2.include?(x)
      "2"
    elsif g3.include?(x)
      "3"
    elsif g4.include?(x)
      "4"
    else
      nil
    end
  end.compact
  key = gp.join("")
  hsh[key] = hsh[key] + [[pair[0],pair[1].to_i]]
end
puts "window.Dictionary=#{hsh.to_json}"
# hsh.each do |k,v|
#   if v.size > 1
#     puts v
#   end
# end