class Symphony
  attr_accessor :items

  def initialize(options = {})
    from_s(options)
  end

  #"E3 B3 B3 B3 C4 B3 A3 B3 B3 B3 G3 B3".split
  def from_s(options)
    #@items = options.split.map { |n| Notes.new(note: n[0], octave: n[1].to_i - 3) }
    @items = options.split.map { |n| Notes.new(n) }
  end

  def to_json
    @items.map { |n| {hz: n.hz} }
          .to_json
  end
end
