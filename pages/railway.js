import railwayLinks from '@/data/railway_links.json'

let text = [
  'Railway Information',
  '',
  '- Railway information in ScJP Server -',
]

railwayLinks.forEach(item => {
  text = text.concat([
    '',
    `■ ${item.title}`,
    `  [link;${item.url};${item.title} -> ${item.url}]`,
  ])
})

text = text.concat([
  '',
  '■ Route Map',
  '  Route map is available [link;https://docs.google.com/spreadsheets/d/1hLuNfYppxd4mTFPS_j6loTB5ToiMbDoNjqM33CRKDSk/edit#gid=461967107;here]',
  '',
])

export default text;