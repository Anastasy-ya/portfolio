import './Menu.css'
import { useStore } from '../store/store'

function Menu() {
  const menuDataset = useStore(s => s.menuDataset)
  const locale = useStore(s => s.locale)

  return (
    <nav className='menu'>
      <ul className='menu__box'>
        {menuDataset.map((item, index) => {
          if (item.type === 'text-button') {
            return (
              <li className='menu__item' key={index}>
                <button
                  onClick={item.action}
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
              <li className='menu__item' key={index}>
                <button
                  onClick={item.action}
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
      </ul>
    </nav>
  )
}

export default Menu
