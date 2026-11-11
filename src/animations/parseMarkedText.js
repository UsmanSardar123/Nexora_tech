export function parseMarkedText(text) {
  const segments = []
  const markerPattern = /\{([^{}]+)\}/g
  let lastIndex = 0

  for (const match of text.matchAll(markerPattern)) {
    const start = match.index
    if (start > lastIndex) {
      segments.push({ text: text.slice(lastIndex, start), blue: false })
    }

    segments.push({ text: match[1], blue: true })
    lastIndex = start + match[0].length
  }

  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), blue: false })
  }

  return segments
}

export function countMarkedWords(text) {
  return parseMarkedText(text).reduce(
    (count, segment) =>
      count + (segment.text.match(/\S+/g)?.length ?? 0),
    0,
  )
}
