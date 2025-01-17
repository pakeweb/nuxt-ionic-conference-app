import {
  call,
  cog,
  colorPalette,
  compass,
  construct,
  document,
  hammer,
  logoAngular,
  logoIonic,
  restaurant,
} from 'ionicons/icons'

export default defineEventHandler(async () => {
  return [
    {
      name: 'Angular',
      icon: logoAngular,
    },
    {
      name: 'Documentation',
      icon: document,
    },
    {
      name: 'Food',
      icon: restaurant,
    },
    {
      name: 'Ionic',
      icon: logoIonic,
    },
    {
      name: 'Tooling',
      icon: hammer,
    },
    {
      name: 'Design',
      icon: colorPalette,
    },
    {
      name: 'Services',
      icon: cog,
    },
    {
      name: 'Workshop',
      icon: construct,
    },
    {
      name: 'Communication',
      icon: call,
    },
    {
      name: 'Navigation',
      icon: compass,
    },
  ]
})
