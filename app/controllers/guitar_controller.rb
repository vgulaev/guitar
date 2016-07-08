class GuitarController < ActionController::Base
  helper_method :gstring

  def notes
    notes ||= ['C', 'D', 'E', 'F', 'G', 'A', 'B']
  end

  def string_progression(note, octave)
    gstring = []
    note = Notes.new(note: note, octave: octave)
    13.times do |i|
      gstring.push(note)
      note = note.next
    end
    gstring
  end

  def init_gstring
    [ 
      string_progression('E', 4),
      string_progression('B', 3),
      string_progression('G', 3),
      string_progression('D', 3),
      string_progression('A', 2),
      string_progression('E', 2)
    ]
  end

  def gstring
    @gstring ||= init_gstring
  end

  def index
    render(:index, layout: 'application')
  end
end
