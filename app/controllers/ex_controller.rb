class ExController < ActionController::Base
  def index
    #render('mp3play')
  end

  def graph
    render('graph')
  end

  def note_e2
    render('note_e2')
  end

  def note_detector
    render('note_detector')
  end

  def mic
    render('mic')
  end
end
