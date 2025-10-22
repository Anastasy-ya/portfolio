import './Menu.css'
import { useStore } from '../store/store'
// import Sound from '../Sound/Sound'

function Menu() {
  const menuDataset = useStore(s => s.menuDataset)
  const locale = useStore(s => s.locale)
  const windowWidth = useStore(s => s.windowWidth)
  const isOpenModal = useStore(s => s.isOpenModal)
  const modalType = useStore(s => s.modalType)
  const setIsOpenModal = useStore(s => s.setIsOpenModal)
  const setModalType = useStore(s => s.setModalType)

  function handleClick(name) {
    if (name === 'about-me') {
      setIsOpenModal()
      setModalType('about-me')
    } else if (name === 'mail') {
      setIsOpenModal()
      setModalType('mail')
    } else console.error('error')
  }

  return (
    <nav className='menu'>
      <ul className='menu__box'>
        {windowWidth > 600 &&
          menuDataset.map((item, index) => {
            //windowWidth > 1000 &&  TODO вернуть
            if (item.type === 'text-button') {
              return (
                <li className='menu__item' key={index}>
                  <button
                    // onClick={item.action} временно не используется до появления текстовых пунктов меню
                    className='menu__button'
                    aria-label={item.text[locale]}
                  >
                    {item.text[locale]}
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
                  >
                    <img src={item.icon} alt={item.label[locale]} />
                  </button>
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
