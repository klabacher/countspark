import React, { useEffect, useState } from 'react'
// Logos credits for Gemini 3 design
/**
 * Componente SparkIcon
 * O ícone da faísca desenhada com SVG.
 * Usa classes do Tailwind para cor e filtros de brilho (drop-shadow).
 */
const SparkIcon = ({
  size = 'md',
  animated = true
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
}): JSX.Element => {
  const [draw, setDraw] = useState(false)

  // Tamanhos baseados em classes w/h do Tailwind
  const sizeClasses: Record<'sm' | 'md' | 'lg' | 'xl', string> = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }

  useEffect(() => {
    if (animated) {
      // Pequeno delay para iniciar a animação de desenho
      const timer = setTimeout(() => setDraw(true), 100)
      return () => clearTimeout(timer)
    }
  }, [animated])

  return (
    <div
      className={`relative flex items-center justify-center ${sizeClasses[size]}`}
    >
      {/* O SVG da Faísca */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={`transition-all duration-500 ${
          draw ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
        }`}
        style={{ filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))' }} // Glow laranja
      >
        <path
          d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
          stroke="url(#spark-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-all duration-[1500ms] ease-out ${
            animated && !draw ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            strokeDasharray: 100,
            strokeDashoffset: draw ? 0 : 100, // A mágica do desenho da linha
            fill: draw ? 'url(#spark-fill)' : 'transparent', // Preenche depois de desenhar
            transitionDelay: '0.2s'
          }}
        />
        <defs>
          <linearGradient
            id="spark-gradient"
            x1="3"
            y1="2"
            x2="21"
            y2="22"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FBBF24" /> {/* Amber-400 */}
            <stop offset="1" stopColor="#F59E0B" /> {/* Amber-600 */}
          </linearGradient>
          <linearGradient
            id="spark-fill"
            x1="3"
            y1="2"
            x2="21"
            y2="22"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FBBF24" stopOpacity="0.8" />
            <stop offset="1" stopColor="#EA580C" stopOpacity="0.9" />
          </linearGradient>
        </defs>
      </svg>

      {/* Partículas de energia (círculos animados) */}
      {draw && (
        <>
          <span
            className="absolute right-0 top-0 size-1 animate-ping rounded-full bg-yellow-300"
            style={{ animationDuration: '1s' }}
          ></span>
          <span
            className="absolute bottom-2 left-1 size-1 animate-ping rounded-full bg-orange-400"
            style={{ animationDuration: '1.5s', animationDelay: '0.2s' }}
          ></span>
        </>
      )}
    </div>
  )
}

/**
 * Componente RollingDigit
 * Cria o efeito de "odômetro" para cada dígito.
 */
const RollingDigit = ({
  value,
  delay = 0
}: {
  value: number
  delay: number
}): JSX.Element => {
  return (
    <div className="relative mx-px inline-block h-[1em] w-[0.6em] overflow-hidden">
      <div
        className="transition-transform duration-[2000ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{
          transform: `translateY(-${value * 10}%)`,
          transitionDelay: `${delay}ms`
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <div key={num} className="flex h-full items-center justify-center">
            {num}
          </div>
        ))}
      </div>
    </div>
  )
}

type SizeKey = 'sm' | 'md' | 'lg' | 'xl'
interface CountSparkLogoProps {
  theme?: 'dark' | 'light'
  size?: SizeKey
  showStatus?: boolean
}

/**
 * Componente Principal do Logo
 * Junta o ícone e o texto animado.
 */
const CountSparkLogo = ({
  theme = 'dark',
  size = 'md',
  showStatus = false
}: CountSparkLogoProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Configurações de texto baseadas no tema
  const textColors = theme === 'dark' ? 'text-white' : 'text-slate-900'
  const subTextColors = theme === 'dark' ? 'text-slate-400' : 'text-slate-500'

  // Configurações de tamanho da fonte
  const fontSizes = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl',
    xl: 'text-7xl'
  }

  return (
    <div className="group flex cursor-pointer select-none items-center gap-3 font-sans">
      {/* Container do Ícone com efeito de hover */}
      <div className="relative transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
        <div
          className={`absolute inset-0 rounded-full bg-orange-500/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100`}
        />
        <SparkIcon size={size} />
      </div>

      {/* Container do Texto */}
      <div className="flex flex-col justify-center">
        <h1
          className={`flex items-baseline font-bold tracking-tight ${fontSizes[size]} ${textColors}`}
        >
          <span className="mr-px">Count</span>

          {/* Efeito de "Spark" no texto */}
          <span className="relative bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Spark
            {/* Brilho sutil no texto 111 group-hover:animate-shine */}
            <span className="absolute inset-0 size-full bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0" />
          </span>
        </h1>
        {/* Tagline ou Contador visual */}
        {showStatus && (
          <div
            className={`font-mono text-xs uppercase tracking-widest ${subTextColors} flex h-4 items-center gap-2 overflow-hidden`}
          >
            <span className="size-1 animate-pulse rounded-full bg-green-500" />
            <div className="flex items-center leading-none">
              Status:
              <span className="ml-1 flex font-bold text-green-500">
                {/* Simula um contador iniciando em 000 e indo para 942 */}
                <RollingDigit value={mounted ? 9 : 0} delay={500} />
                <RollingDigit value={mounted ? 4 : 0} delay={700} />
                <RollingDigit value={mounted ? 2 : 0} delay={900} />
              </span>
              <span className="ml-1 align-top text-[0.6em] opacity-60">ms</span>
            </div>
          </div>
        )}
        {/* Tagline ou Contador visual */}
      </div>

      {/* Keyframes globais para o componente (se não estiverem no tailwind config) */}
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-15deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%) skewX(-15deg); opacity: 0; }
        }
        .group-hover\\:animate-shine {
          animation: shine 1s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default CountSparkLogo
