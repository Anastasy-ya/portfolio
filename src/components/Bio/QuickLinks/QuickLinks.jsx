import './QuickLinks.css'

function QuickLinks() {
  //TODO в стор
  const socialLinks = [
    {
      name: 'Email',
      url: 'mailto:hiperiosity@gmail.com',
      label: 'E-mail'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Anastasy-ya',
      label: 'GitHub'
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/+79105465796',
      label: 'WhatsApp'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/anastasy-ya',
      label: 'LinkedIn'
    },
    // {
    //   name: 'Instagram',
    //   url: 'https://www.instagram.com/yourusername',
    //   label: 'Instagram profile'
    // },

    {
      name: 'ArtStation',
      url: 'https://www.artstation.com/anastasy_ya',
      label: 'ArtStation'
    }
  ]

  return (
    <>
      <div className='quick-links__root'>
        <div className='quick-links__container'>
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className={`social-link social-link--${link.name.toLowerCase()}`}
              aria-label={link.label}
              target='_blank'
              rel='noopener noreferrer'
              title={link.label}
            ></a>
          ))}
        </div>
        {/* <button
          // onClick={console.log('меня нажали')}
          className={`quick-links__about-button`}
          aria-label='Information about me'
          style={{
            backgroundImage: `url('/svg/arrow.svg')`
          }}
        > */}
        {/* </button> */}
      </div>
    </>
  )
}

export default QuickLinks
