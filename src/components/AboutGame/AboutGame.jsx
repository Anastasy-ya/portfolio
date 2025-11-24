import './AboutGame.css'

function AboutGame() {
  return (
    <div id='tooltip-about' className='about'>
      <div className='about__close-icon'></div>
      <div className='about__inner'>
        <h3 className='about__title'>What’s going on here?</h3>
        <p className='about__text'>
          John Conway’s Game of Life is a cellular automaton where simple rules
          make dots on a grid live, die, and form patterns that seem alive. A
          simple system turning chaos into order — and a perfect metaphor for
          creativity, where pixels, like ideas, come to life.
        </p>
      </div>
    </div>
  )
}

export default AboutGame
