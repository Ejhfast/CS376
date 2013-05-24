#quire 'bundler/setup'
require 'dino'

board = Dino::Board.new(Dino::TxRx.new)
sensor1 = Dino::Components::Sensor.new(pin: 'A0', board: board)
sensor2 = Dino::Components::Sensor.new(pin: 'A1', board: board)

def print_d(x) 
  Proc.new do |data|
    if data.to_i < 250
      `echo bent! > #{x}_file`
    else
      `echo straight! > #{x}_file`
    end
    #puts x+":"+data.to_s
  end
end

sensor2.when_data_received print_d("A5")
sensor1.when_data_received print_d("A4")

sleep