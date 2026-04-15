import { useEffect, useMemo } from 'react'
import './Footer.css'
import { useStore } from '../store/store'
import ModalWrapper from '../ModalWrapper/ModalWrapper'
import { useShallow } from 'zustand/react/shallow'

function Footer() {
  const {
    footerDataset,
    windowWidth,
    isOpenFooterModal,
    setIsOpenFooterModal,
    isOpenMobileMenuModal,
    isOpenAboutMeModal
  } = useStore(
    useShallow(s => ({
      footerDataset: s.footerDataset,
      windowWidth: s.windowWidth,
      isOpenFooterModal: s.isOpenFooterModal,
      setIsOpenFooterModal: s.setIsOpenFooterModal,
      isOpenMobileMenuModal: s.isOpenMobileMenuModal,
      isOpenAboutMeModal: s.isOpenAboutMeModal
    }))
  )
  const isWide = windowWidth > 1000
  const height = window.innerHeight //TODO вынести в переменную и не пересчитывать каждый раз

  const modalPositions = useMemo(() => {
    if (windowWidth > 1001) {
      return { open: 254, closed: 0 }
    }
    if (windowWidth > 601 && windowWidth <= 1000) {
      return { open: 160, closed: height - 80 }
    }
    if (windowWidth > 401 && windowWidth <= 600) {
      return { open: 148, closed: height - 80 }
    }
    return { open: 110, closed: height - 80 }
  }, [windowWidth, height])

  //открытие других модалок автоматически закрывает остальные
  useEffect(() => {
    if (isOpenAboutMeModal || isOpenMobileMenuModal) {
      setIsOpenFooterModal(false)
    }
  }, [isOpenMobileMenuModal, isOpenAboutMeModal, setIsOpenFooterModal])

  function toggleFooter() {
    setIsOpenFooterModal(isOpenFooterModal ? false : true)
  }

  const content = (
    <section className={`footer ${isWide ? 'footer_type_wide' : ''}`}>
      <div className='footer__content'>
        {footerDataset.map((block, blockIdx) => (
          <div className='footer__container' key={blockIdx}>
            {block.sections.map((section, secIdx) => (
              <div key={secIdx} className='footer__section'>
                <p className='footer__title'>{section.title}</p>
                <ul
                  className={`footer__icons footer__icons_type_${section.folder}`}
                  style={{
                    width: `${
                      Math.round(section.icons.length / 2) * 25 +
                      (Math.round(section.icons.length / 2) - 1) * 10
                    }px`
                  }}
                >
                  {section.icons.map((icon, index) => (
                    <li key={index} className='footer__icon'>
                      <img
                        src={`/svg/${section.folder}/${icon}.svg`}
                        alt={icon}
                        title={icon}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}

        <div className='footer__container footer__container_type_optimization'>
          <p className='footer__title'>Optimizations</p>
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
