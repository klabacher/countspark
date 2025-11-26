import { classNames } from 'Utils'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'Providers/ReduxProvider/Store'
import { toast } from 'react-toastify'
import useImageDynamicCDNLink, { ImageKey } from 'Assets/images'

// type Size = {
//   width: number
//   height: number
// }

type RandomImageProps = {
  src?: string
  alt?: string
}

const Placeholder = () => (
  <div className="flex size-full items-center justify-center bg-slate-900 text-slate-600">
    <span className="text-sm">No Image Source</span>
  </div>
)

function DynamicImage({ src, alt }: RandomImageProps) {
  // Estado para guardar a URL gerada e evitar re-renders com URLs novas
  const [stableUrl, setStableUrl] = useState<string | undefined>(undefined)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    // Se vier uma URL customizada do Redux, usa ela.
    if (src && src.trim() !== '') {
      setStableUrl(src)
      setIsError(false)
      return
    }

    // Se não, gera uma URL do Picsum baseada no tamanho da TELA (não do container)
    // Arredonda para evitar mudanças bruscas. Ex: 1920x1080
    const width = Math.ceil(window.innerWidth / 100) * 100
    const height = Math.ceil(window.innerHeight / 100) * 100

    // Adiciona seed aleatória para garantir cache consistency durante a sessão
    // mas muda se der refresh real
    const randomSeed = Math.floor(Math.random() * 1000)

    setStableUrl(`https://picsum.photos/${width}/${height}?seed=${randomSeed}`)
    setIsError(false)
  }, [src]) // Só roda se a prop src mudar (do Redux) ou no mount inicial

  const handleError = () => {
    if (!isError) {
      console.error('Error loading image')
      toast.error('Falha ao carregar imagem de fundo')
      setIsError(true)
    }
  }

  if (isError || !stableUrl) {
    return <Placeholder />
  }

  return (
    <img
      className={classNames(
        'absolute inset-0 size-full object-cover transition-opacity duration-700 ease-in-out'
      )}
      src={stableUrl}
      alt={alt || 'Background'}
      onError={handleError}
      loading="lazy"
    />
  )
}

export default function ImageContainer({
  sizeFull = false,
  src,
  context
}: {
  sizeFull?: boolean
  context?: ImageKey
  src?: string
}) {
  const dynamicCDN = useImageDynamicCDNLink(context || 'default')
  const settingsImage = useSelector(
    (state: RootState) => state.counter.Settings.Styles.backgroundImageUrl
  )
  // Use first the custom src
  let backgroundImageUrl = ''
  if (src) {
    backgroundImageUrl = src
  } else if (context) {
    // then use context image from settings
    backgroundImageUrl = dynamicCDN
  } else if (!context) {
    // Fallback to settings image
    backgroundImageUrl = settingsImage
  } else {
    backgroundImageUrl =
      'https://w7.pngwing.com/pngs/802/825/png-transparent-redbubble-polite-cat-meme-funny-cat-meme-thumbnail.png'
  }

  if (sizeFull) {
    return (
      <div className="absolute inset-0 size-full overflow-hidden bg-slate-950">
        <DynamicImage src={backgroundImageUrl} />
      </div>
    )
  }

  return (
    <div className="relative w-full overflow-hidden bg-slate-900 p-4">
      <div className="absolute inset-0 bg-slate-900/20" />{' '}
      {/* Placeholder visual instantâneo */}
      <DynamicImage src={backgroundImageUrl} />
    </div>
  )
}
