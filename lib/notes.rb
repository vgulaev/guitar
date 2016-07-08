class Notes
  NOTES = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
  STEPS = {
    C: 1,
    c: 2,
    D: 3,
    d: 4,
    E: 5,
    F: 6,
    f: 7,
    G: 8,
    g: 9,
    A: 10,
    a: 11,
    B: 12
  }
  NEXT = {'C': 'D',
          'D': 'E',
          'F': 'G',
          'G': 'A',
          'A': 'B',}
  #def 
  attr_accessor :note, :octave, :hz

  def calculat_frequency
    i = ( STEPS[:"#{note}"] - 10 ) + 12 * ( octave - 4 )
    (440 * 2 ** (i/12.0)).round(2)
  end

  def initialize(options = {})
    @note = 'E'
    @octave = 2
    if options.is_a?(String)
      @note = options[0]
      @octave = options[1].to_i
    elsif options.is_a?(Hash)
      @note = options[:note] if options.key?(:note)
      @octave = options[:octave] if options.key?(:octave)
    end
    @hz = calculat_frequency
  end

  def next(step = 1)
    if 'B' == note
      Notes.new(note: 'C', octave: octave + 1)
    elsif 'E' == note
      Notes.new(note: 'F', octave: octave)
    else
      if note.upcase == note
        Notes.new(note: note.downcase, octave: octave)
      else
        Notes.new(note: NEXT[:"#{note.upcase}"], octave: octave)
      end
    end
  end

  def to_s
    note.to_s + octave.to_s
  end
end