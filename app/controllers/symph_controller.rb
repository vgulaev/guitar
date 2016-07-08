class SymphController < ActionController::Base
  def index
    render(json: Symphony.new('E3 B3 C4 A3 B3 G3 E3 B3 C4 A3 B3 G3').to_json)
  end
end
