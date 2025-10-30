import React, { useState, useEffect } from 'react'
import './Footer.css'
import { useStore } from '../store/store'
import ModalWrapper from '../ModalWrapper/ModalWrapper'

function Footer() {
  const footerDataset = useStore(s => s.footerDataset)
  const windowWidth = useStore(s => s.windowWidth)
  const isWide = windowWidth > 1000
  const [modalPositions, setModalPositions] = useState({ open: 0, closed: 0 })
  const isOpenFooterModal = useStore(s => s.isOpenFooterModal)
  const setIsOpenFooterModal = useStore(s => s.setIsOpenFooterModal)

  useEffect(() => {
    windowWidth > 1001
      ? setModalPositions({ open: 254, closed: 0 })
      : windowWidth <= 1000 && windowWidth > 800
        ? setModalPositions({
          open: window.innerHeight - 300,
          closed: window.innerHeight - 80
        })
        : windowWidth <= 800 && windowWidth > 600
          ? setModalPositions({
            open: window.innerHeight - 400,
            closed: window.innerHeight - 80
          })
          : setModalPositions({ open: 110, closed: window.innerHeight - 80 })
  }, [windowWidth])



  function toggleFooter() {
    setIsOpenFooterModal(isOpenFooterModal ? false : true);
  }

  const content = (
    <section className={`footer ${isWide ? 'footer_type_wide' : ''}`}>
      <div className='footer__content'>
        {footerDataset.map((block, blockIdx) => (
          <div className='footer__container' key={blockIdx}>
            {block.sections.map((section, secIdx) => (
              <div key={secIdx} className='footer__section'>
                <h3 className='footer__title'>{section.title}</h3>
                <ul
                  className={`footer__icons footer__icons_type_${section.folder}`}
                  style={{
                    width: `${Math.round(section.icons.length / 2) * 25 +
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
                      {/* <span className='footer__icon-label'>{icon}</span> */}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}

        <div className='footer__container footer__container_type_optimization'>
          <h3 className='footer__title'>Optimizations</h3>
          <ul className='footer__optimizations optimizations'>
            <li>
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
      </div>
    </section>
  )

  return (
    <>
      {isWide ? (
        content
      ) : (
        <ModalWrapper
          type={'footer'}
          modalPositions={modalPositions}
          isOpen={isOpenFooterModal}
          handleClose={toggleFooter}
        >
          {content}
        </ModalWrapper>
      )}
    </>
  )
}

export default Footer
