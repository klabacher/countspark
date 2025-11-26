// uses unsplash images for demonstration purposes and idk what else to use. I REALLY NEED TO KNOW HOW TO DO THIS PROPERLY

import { RootState } from 'Providers/ReduxProvider/Store'
import { useSelector } from 'react-redux'

// Add comtent with different sizes for different themes (light/dark) - TODO: add direct cdn links or host images properly
const images = {
  frontpage: {
    light:
      'https://images.pexels.com/photos/34872274/pexels-photo-34872274.jpeg', // https://www.pexels.com/photo/scenic-autumn-path-lined-with-golden-trees-34872274/
    dark: 'https://images.pexels.com/photos/29579880/pexels-photo-29579880.jpeg' // https://www.pexels.com/photo/misty-forest-path-in-dense-pine-woods-29579880/
  },
  auth: {
    light:
      'https://images.pexels.com/photos/29579880/pexels-photo-29579880.jpeg',
    dark: 'https://images.pexels.com/photos/29579880/pexels-photo-29579880.jpeg'
  },
  icon: {
    light: '/images/icon-light.svg',
    dark: '/images/icon-dark.svg'
  },
  default: {
    light: '/images/default-light.png',
    dark: '/images/default-dark.png'
  }
}

export type ImageKey = keyof typeof images

// TODO: add preloading of images for better performance
export function getImagePath(
  imageName: ImageKey,
  theme: 'light' | 'dark' = 'dark'
): string {
  return images[imageName]?.[theme] || ''
}

export default function useImageDynamicCDNLink(imageName: ImageKey): string {
  // get context theme
  const theme = useSelector((state: RootState) => state.dom.theme) || 'light'
  return getImagePath(imageName, theme)
}
