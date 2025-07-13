import regions from '@/data/regions.json'

let text = [
  'Region Information',
  '',
  '- Region information in ScJP Server -',
  '',
]

regions.forEach(item => {
  text = text.concat([
    '',
    `■ ${item.name}`,
    `  [link;${item.url};${item.name} -> ${item.url}]`,
  ])
})

export default text;