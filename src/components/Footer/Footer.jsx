import { useState } from 'react'
import './Footer.css'

function Footer() {
  //TODO перенести в глобальные данные
  const footerData = [
    {
      title: 'Frontend',
      folder: 'frontend',
      icons: [
        'TypeScript',
        'React',
        'Next',
        'StyledComponents',
        'Less',
        'SCSSSASS',
        'MUI',
        'AntDesign',
        'Zustand',
        'Redux',
        'ReactRouter'
      ]
    },
    {
      title: '3D & AR/VR',
      folder: '3darvr',
      icons: [
        'Three',
        'Drei',
        'ReactThreeFiber',
        'AFrame',
        'MindAR',
        'ReactThreeARNFT',
        'JsArtoolkitNft',
        'WebXR',
        'GLTF',
        'GLB'
      ]
    },
    {
      title: 'Backend & DB',
      folder: 'backend-db',
      icons: ['Express', 'Node', 'MongoDB', 'PostgreSQL', 'RESTfulAPIs']
    },
    {
      title: 'Tools',
      folder: 'tools',
      icons: ['Vite', 'Webpack', 'Git', 'GitHub', 'GitLab']
    },
    {
      title: 'Design',
      folder: 'design',
      icons: ['Figma', 'Photoshop', 'Illustrator']
    },
    {
      title: 'Exploring',
      folder: 'exploring',
      icons: ['Svelte', 'OpenGL']
    }
  ]

  return (
    <div className='footer'>
      {footerData.map(({ title, folder, icons }) => (
        <div
          className={`footer__container footer__container_type_${folder}`}
          key={title}
        >
          <h3>{title}</h3>

          <div
            className='footer__icons'
            style={{
              width: `${
                Math.round(icons.length / 2) * 25 +
                (Math.round(icons.length / 2) - 1) * 20
              }px`
            }}
          >
            {icons.map(icon => (
              <div
                key={icon}
                className='footer__icon'
                style={{
                  backgroundImage: `url('/svg/${folder}/${icon}.svg')`
                }}
              />
            ))}
          </div>
        </div>
      ))}
      <div className={`footer__container footer__container_type_optimization`}>
        <h3>Optimization</h3>

        <div className='footer__icons '></div>
      </div>
    </div>
  )
}

export default Footer
