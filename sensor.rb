#quire 'bundler/setup'
require 'dino'
require 'json'

board = Dino::Board.new(Dino::TxRx.new)
sensor1 = Dino::Components::Sensor.new(pin: 'A0', board: board)
sensor2 = Dino::Components::Sensor.new(pin: 'A1', board: board)
sensor3 = Dino::Components::Sensor.new(pin: 'A2', board: board)
sensor4 = Dino::Components::Sensor.new(pin: 'A4', board: board)
sensor5 = Dino::Components::Sensor.new(pin: 'A5', board: board)

def print_d(x) 
  Proc.new do |data|
    if data.to_i < 250
      # puts data.to_i
      File.open("#{x}_file", 'w') { |file| file.write(Marshal.dump([x,"bent!",data.to_i])) } 
      #`echo #{Marshal.dump([x,"bent!",data.to_i])} > #{x}_file`
    else
      # puts data.to_i
      File.open("#{x}_file", 'w') { |file| file.write(Marshal.dump([x,"straight!",data.to_i])) } 
      #`echo #{Marshal.dump([x,"straight!",data.to_i])} > #{x}_file`
    end
    #puts x+":"+data.to_s
  end
end

sensor1.when_data_received print_d("A0")
sensor2.when_data_received print_d("A1")
sensor3.when_data_received print_d("A2")
sensor4.when_data_received print_d("A4")
sensor5.when_data_received print_d("A5")

sleep