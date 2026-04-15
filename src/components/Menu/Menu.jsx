import './Menu.css'
import { useStore } from '../store/store'
// import Sound from '../Sound/Sound'
import { useState, useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'

function Menu() {
  const {
    menuDataset,
    locale,
    windowWidth,
    isOpenAboutMeModal,
    setIsOpenAboutMeModal,
    setModalType
  } = useStore(
    useShallow(s => ({
      menuDataset: s.menuDataset,
      locale: s.locale,
      windowWidth: s.windowWidth,
      isOpenAboutMeModal: s.isOpenAboutMeModal,
      setIsOpenAboutMeModal: s.setIsOpenAboutMeModal,
      setModalType: s.setModalType
    }))
  )

  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    if (!isCopied) return

    const timer = setTimeout(() => {
      setIsCopied(false)
    }, 1500)

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [isCopied])

  function handleClick(name) {
    if (!isOpenAboutMeModal) {
      if (name === 'about-me') {
        setIsOpenAboutMeModal(true)
        setModalType('about-me')
      } else if (name === 'mail') {
        setIsOpenAboutMeModal(true)
        setModalType('mail')
      }
    } else {
      setIsOpenAboutMeModal(false)
      setTimeout(() => {
        setModalType(null)
      }, 500)
    }
  }

  const handleCopy = () => {
    navigator.clipboard
      .writeText('hiperiosity@gmail.com')
      .then(() => {
        setIsCopied(true)
      })
      .catch(err => {
        console.error('Ошибка копирования:', err)
      })
  }

  console.count('render menu')

  return (
    <nav className='menu'>
      <ul className='menu__box'>
        {windowWidth > 600 &&
          menuDataset.map((item, index) => {
            if (item.type === 'text-button') {
              return (
                <li className='menu__item' key={index}>
                  {/*TODO убрать onClick и вставить универсальный action после включения формы обратной связи */}
                  <button
                    onClick={() => handleCopy(item.text)}
                    className='menu__button'
                    aria-label={item.text[locale]}
                    title={item.text[locale]}
                  >
                    {isCopied ? item.success[locale] : item.text[locale]}
                  </button>
                </li>
              )
            }

            if (item.type === 'icon-button') {
              return (
                <li className='menu__item' key={item.name} id={item.name}>
                  <button
                    onClick={() => handleClick(item.name)}
                    className={`menu__icon-button menu__icon-button_type_${item.name}`}
                    aria-label={item.label[locale]}
                    title={item.label[locale]}
                    style={{ backgroundImage: item.icon }}
                  ></button>
                </li>
              )
            }
            return null
          })}
        {/*НЕ УДАЛЯТЬ */}
        {/* <li  className='menu__item'>
        <Sound />
       </li> */}
      </ul>
    </nav>
  )
}

export default Menu
