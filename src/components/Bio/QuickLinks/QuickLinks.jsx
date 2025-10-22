import './QuickLinks.css'

function QuickLinks() {
  //TODO в стор
  const socialLinks = [
    {
      name: 'Email',
      url: 'mailto:your.email@domain.com',
      label: 'Send email'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/yourusername',
      label: 'GitHub profile'
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/yourphonenumber',
      label: 'Contact via WhatsApp'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/yourusername',
      label: 'LinkedIn profile'
    },
    // {
    //   name: 'Instagram',
    //   url: 'https://www.instagram.com/yourusername',
    //   label: 'Instagram profile'
    // },

    {
      name: 'ArtStation',
      url: 'https://www.artstation.com/yourusername',
      label: 'ArtStation portfolio'
    }
  ]

  return (
    <>
      <div className='quick-links__root'>
        <div className='quick-links__container'>
          {/*переименовать классы по бэм TODO */}
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className={`social-link social-link--${link.name.toLowerCase()}`}
              aria-label={link.label}
              target='_blank'
              rel='noopener noreferrer'
            >
              {/* Метатеги для SEO */}
              <meta itemProp='name' content={link.name} />
              <meta itemProp='url' content={link.url} />
              <link itemProp='url' href={link.url} />

              {/* Скрытый текст для доступности */}
              <span className='visually-hidden'>{link.label}</span>
            </a>
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
        {/* Метатеги для SEO */}
        {/* <meta itemProp='name' content={link.name} /> */}
        {/* <meta itemProp='url' content={link.url} /> */}
        {/* <link itemProp='url' href={link.url} /> */}
        {/* <span className='visually-hidden'>About me</span>
        </button> */}
      </div>
    </>
  )
}

export default QuickLinks
