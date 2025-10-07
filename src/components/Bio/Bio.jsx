import './Bio.css'
import QuickLinks from './QuickLinks/QuickLinks'
import { useStore } from '../store/store'

function Bio() {
  const locale = useStore(s => s.locale)
  const bioDataset = useStore(s => s.bioDataset)

  return (
    <section>
      <div className='bio'>
        <div className='bio__about'>
          <h1 className=''>{bioDataset.name[locale]}</h1>
          <p className='bio__description'>{bioDataset.role[locale]}</p>
        </div>
      </div>
      <QuickLinks />
    </section>
  )
}

export default Bio
