import './Footer.css'
import { useStore } from '../store/store'

function Footer() {
  const footerDataset = useStore(s => s.footerDataset)

  //TODO проверить валидность верстки и доступность для люд со спец в
  return (
    <section className='footer'>
      {footerDataset.map((block, blockIdx) => (
        <div className='footer__container' key={blockIdx}>
          {block.sections.map((section, secIdx) => (
            <div key={secIdx} className='footer__section'>
              <h3 className='footer__title'>{section.title}</h3>
              <ul
                className={`footer__icons footer__icons_type_${section.folder}`}
                style={{
                  width: `${
                    Math.round(section.icons.length / 2) * 25 +
                    (Math.round(section.icons.length / 2) - 1) * 10
                  }px`
                }}
              >
                {section.icons.map(icon => (
                  <li
                    key={icon}
                    className='footer__icon'
                    style={{
                      backgroundImage: `url('/svg/${section.folder}/${icon}.svg')`
                    }}
                    aria-label={icon}
                    title={icon}
                  >
                    <span className='footer__icon-label'>{icon}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}

      <div className='footer__container footer__container_type_optimization'>
        <h3 className='footer__title'>Optimization</h3>
        <ul className='footer__optimizations optimizations'>
          <li>
            <div></div>
            <p className='optimizations__info'>Instancing</p>
          </li>
          <li>
            <p className='optimizations__info'>LOD</p>
          </li>
          <li>
            <p className='optimizations__info'>Rustum culling</p>
          </li>
          <li>
            <p className='optimizations__info'>
              Resource dispose and memory management
            </p>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Footer
