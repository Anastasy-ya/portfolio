import './Bio.css'
import QuickLinks from './QuickLinks/QuickLinks'
import MobileMenu from '../MobileMenu/MobileMenu'
import { useStore } from '../store/store'

function Bio() {
  const locale = useStore(s => s.locale)
  const bioDataset = useStore(s => s.bioDataset)
  const windowWidth = useStore(s => s.windowWidth)

  return (
    <>
      <section className='bio'>
        <div className='bio__about'>
          <h1>{bioDataset.name[locale]}</h1>
          <p>{bioDataset.role[locale]}</p>
        </div>
        <div className='quick-links'>
          {windowWidth <= 600 && <MobileMenu />}
          <QuickLinks />
        </div>
      </section>
    </>
  )
}

export default Bio
