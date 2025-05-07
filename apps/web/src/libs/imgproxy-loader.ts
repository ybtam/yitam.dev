import CryptoJS from 'crypto-js'
import { ImageProps } from 'next/image'
import { joinURL } from 'ufo'

function urlSafeBase64(src: CryptoJS.lib.WordArray) {
  return CryptoJS.enc.Base64.stringify(src)
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

const hexDecode = (hex: string) => CryptoJS.enc.Hex.parse(`${hex}`)

export default function imgproxyLoader({ src, width, quality }: ImageProps) {
  const bucketSource = `s3://yitam.dev${src}`

  const encodedUrl = urlSafeBase64(CryptoJS.enc.Utf8.parse(bucketSource))

  const path = joinURL(
    '/',
    ImgproxyProcessModifiers({
      width,
      quality: quality ?? 100,
    }),
    encodedUrl,
  )

  const signature = sign(
    process.env.NEXT_PUBLIC_IMGPROXY_SALT!,
    path,
    process.env.NEXT_PUBLIC_IMGPROXY_KEY! as string,
  )

  return joinURL(process.env.NEXT_PUBLIC_IMGPROXY_URL!, signature, path)
}

function sign(salt: string, target: string, secret: string) {
  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, hexDecode(secret))
  hmac.update(hexDecode(salt))
  hmac.update(target)

  return urlSafeBase64(hmac.finalize())
}

type ModifierKeys = keyof ImgproxyModifiers

const keyMap: Record<ModifierKeys, string> = {
  autoRotate: 'ar',
  background: 'bg',
  backgroundAlpha: 'bga',
  blur: 'bl',
  cacheBuster: 'cb',
  crop: 'c',
  dpr: 'dpr',
  enlarge: 'el',
  extend: 'ex',
  filename: 'fn',
  fit: 'rt',
  format: 'f',
  gravity: 'g',
  height: 'h',
  maxBytes: 'mb',
  padding: 'pd',
  preset: 'pr',
  quality: 'q',
  resize: 'rs',
  rotate: 'rot',
  sharpen: 'sh',
  size: 's',
  stripColorProfile: 'scp',
  stripMetadata: 'sm',
  trim: 't',
  watermark: 'wm',
  width: 'w',
}

export interface ImgproxyModifiers {
  autoRotate?: number
  background?: string
  backgroundAlpha?: number
  blur?: number
  cacheBuster?: string
  crop?: string
  dpr?: number
  enlarge?: number
  extend?: number
  filename?: string
  fit?: string
  format?: string
  gravity?: string
  height?: number
  maxBytes?: number
  padding?: number
  preset?: string
  quality?: number | `${number}`
  resize?: string
  rotate?: number
  sharpen?: number
  size?: number
  stripColorProfile?: number
  stripMetadata?: number
  trim?: number
  watermark?: string
  width?: number | `${number}`
}

const defaultModifiers: ImgproxyModifiers = {
  enlarge: 1,
  fit: 'fill',
  format: 'webp',
  gravity: 'no',
  height: 0,
  width: 0,
  quality: 100,
}

function ImgproxyProcessModifiers(modifiers?: ImgproxyModifiers) {
  const mergedModifiers = {
    ...defaultModifiers,
    ...modifiers,
  }

  const operations = Object.entries(mergedModifiers).map(([key, value]) =>
    keyMap[key as ModifierKeys] ? `${keyMap[key as ModifierKeys]}:${value}` : null,
  )

  return operations.join('/')
}
