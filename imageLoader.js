// Image loader personalizado para build estático
export default function imageLoader({ src, width, quality }) {
  return `${src}?w=${width}&q=${quality || 75}`
}
