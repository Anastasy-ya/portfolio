import { create } from 'zustand'
import matrix_1 from '../Matrices/1'
import matrix_2 from '../Matrices/2'
import matrix_0 from '../Matrices/0'

//перенести в utils TODO
function getBrowserLanguage() {
  return (
    navigator.language ||
    navigator.userLanguage ||
    navigator.browserLanguage ||
    navigator.systemLanguage ||
    'ru'
  ).toLowerCase()
}

const useStore = create((set, get) => ({
  //game
  matrices: [matrix_1, matrix_2, matrix_0],
  matrixName: 'matrix_1',
  setMatrixName: name => set({ matrixName: name }),
  matrix: matrix_1,
  setMatrix: newMatrix => set({ matrix: newMatrix }),
  gameSpeed: 500,
  setGameSpeed: newSpeed => set({ gameSpeed: newSpeed }),
  isLiving: true,
  toggleLiving: () => set(state => ({ isLiving: !state.isLiving })),

  //window width
  windowWidth: window.innerWidth,
  setWindowWidth: windowWidth => set({ windowWidth }),

  //modale
  isOpenModal: false,
  setIsOpenModal: value => set({ isOpenModal: value }),
  isOpenFooterModal: false,
  setIsOpenFooterModal: value => set({ isOpenFooterModal: value }),

  modalType: null, // null, 'about', 'mail'
  setModalType: newModalType => set({ modalType: newModalType }),

  //lang
  locale: 'ru',
  initLocale: () => {
    const lang = getBrowserLanguage()
    set({ locale: lang.startsWith('ru') ? 'ru' : 'en' })
  },

  //sound
  sound: 'false',
  // toggleSound: () => set({ sound: !get().sound }),
  // soundDataset: {
  //   'false': {
  //     'ru': 'Включить звук',
  //     'en': 'Unmute'
  //   },
  //   'true': {
  //     'ru': 'Выключить звук',
  //     'en': 'Mute'
  //   },

  // }

  //datasets
  menuDataset: [
    // {
    //   type: 'text-button',
    //   action: () => console.log('Blog clicked'),
    //   text: {
    //     ru: 'Блог',
    //     en: 'Blog'
    //   }
    // },
    // временный компонент copy-email
    {
      type: 'text-button',
      mame: 'copy-email',
      text: {
        ru: 'hiperiosity@gmail.com',
        en: 'hiperiosity@gmail.com'
      },
      success: {
        ru: 'Адрес скопирован',
        en: 'Copied to clipboard'
      }
    },
    {
      type: 'icon-button',
      name: 'about-me',
      icon: '/svg/about-me.svg',
      label: {
        ru: 'Обо мне',
        en: 'About me'
      }
    }
    // {
    //   type: 'icon-button',
    //   name: 'mail',
    //   icon: '/svg/mail.svg',
    //   label: {
    //     ru: 'Написать сообщение',
    //     en: 'Send message'
    //   }
    // }
  ],
  sidebarDataset: {
    play: {
      type: 'button',
      icon1: '/svg/play.svg',
      icon2: '/svg/stop.svg',
      // action: () => console.log('Play clicked'),
      label: {
        ru: 'Начать игру в жизнь',
        en: 'Play game of life'
      }
    },
    // info: {
    //   type: 'button',
    //   icon: '/svg/info.svg',
    //   action: () => setShowTooltip(prev => !prev),
    //   tooltip: true,
    //   label: {
    //     ru: 'О проекте',
    //     en: 'About project'
    //   }
    // },
    speed: {
      type: 'button',
      icon1: '/svg/2x.svg',
      icon2: '/svg/1x.svg',
      action: () => {
        const { gameSpeed, setGameSpeed } = get()
        setGameSpeed(gameSpeed === 500 ? 100 : 500)
      },
      label: {
        ru: 'Увеличить скорость',
        en: '2x speed'
      }
    },
    slider: {
      type: 'slider',
      buttons: [1, 2, 0]
    }
    // vr: {
    //   type: 'button',
    //   icon: '/svg/vr.svg',
    //   action: () => console.log('VR clicked'),
    //   label: {
    //     ru: 'Перейти в VR режим (Внимание: потребуется доступ к датчикам)',
    //     en: 'Enter VR mode (Note: sensor access required)'
    //   }
    // }
  },

  bioDataset: {
    name: {
      ru: 'LAZAREVA ANASTASIA',
      en: 'LAZAREVA ANASTASIA'
    },
    role: {
      ru: 'КРЕАТИВНЫЙ ФРОНТЕНД\u2011РАЗРАБОТЧИК',
      en: `CREATIVE FRONTEND\u00A0DEVELOPER`
    }
  },
  modalAboutMeDataset: {
    mainTitle: {
      ru: 'Добро пожаловать на мой сайт, приглашаю осмотреться',
      en: 'Glad to see you here. Take a look around'
    },
    mainArticle: {
      ru: `Сочетая логику разработчика и взгляд дизайнера, я формирую цифровой опыт на базе 3D, дополненной, виртуальной реальности и уникальных эффектов. Использую эти технологии не ради зрелищности, я ищу и доношу смыслы и нужные ассоциации. Предпочитаю вести проект самостоятельно от первого наброска до финальной строчки кода и лично отвечаю за каждый этап. Благодаря этому идеи не только выглядят потрясающе, они работают безукоризненно, будь то полное погружение в VR или та самая анимация, что заставляет Вас остановиться. Я знаю пределы кода, и готова выходить за них!`,
      en: `Crafting web applications that feel alive — not just beautiful, but thoughtful.
      
          With a developer’s logic and a designer’s eye, I craft experiences
          powered by 3D, AR, VR, and custom effects — not for spectacle, but for
          meaning. I don’t hand off designs. I shape them end to end — from
          first sketch to final line of code. That means ideas don’t just look
          stunning; they work flawlessly. From immersive VR journeys to a single
          animation that makes people pause — I know the limits of code — and I
          push them further.`
    },
    aboutProjectTitle: {
      ru: 'Кубики? Что здесь происходит?',
      en: 'What’s going on here?'
    },
    aboutProjectArticle: {
      ru: `«Игра в Жизнь» Джона Конвея — это клеточный автомат, где простые правила заставляют точки рождаться, умирать и формировать узоры, которые кажутся живыми. Это простая система, превращающая хаос в порядок — метафора творчества, где идеи, как пиксели, возникают и взаимодействуют.
Я воссоздала эту игру в 3D и сейчас работаю над VR режимом чтобы пользователи могли в полной мере погрузиться в 3d опыт.`,
      en: `John Conway’s Game of Life is a cellular automaton where simple rules make dots on a grid live, die, and form patterns that seem alive. A simple system turning chaos into order — a metaphor for creativity, where ideas, like pixels, emerge and interact. I’ve recreated this game in 3D, and I’m now working on a VR mode to let players step inside the evolving world, experiencing patterns as if they were alive around them.`
    }
  },

  formDataset: {
    title: { ru: 'ЕСТЬ ИДЕЯ?', en: 'GET IN TOUCH' },
    nameLabel: { ru: 'ИМЯ', en: 'ТNAME' },
    mailLabel: { ru: 'E-MAIL', en: 'E-MAIL' },
    messageLabel: { ru: 'СООБЩЕНИЕ', en: 'MESSAGE' },
    submitButton: { ru: 'ОТПРАВИТЬ', en: 'send' }
  },

  footerDataset: [
    {
      sections: [
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
        }
      ]
    },
    {
      sections: [
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
        }
      ]
    },
    {
      sections: [
        {
          title: 'Backend & DB',
          folder: 'backend-db',
          icons: ['Express', 'Node', 'MongoDB', 'PostgreSQL', 'RESTfulAPIs']
        }
      ]
    },
    {
      sections: [
        {
          title: 'Tools',
          folder: 'tools',
          icons: ['Vite', 'Webpack', 'Git', 'GitHub', 'GitLab']
        }
      ]
    },
    {
      sections: [
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
    }
  ]
}))

export { useStore }
