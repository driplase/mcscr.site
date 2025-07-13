import facilities from '@/data/facilities.json';

let text = [
  'Facility Information',
  '',
  '■ Registering Facilities',
  '  To register a facility, please submit a request to [link;https://discord.com/channels/888638910589206569/1223134209984565269;here]',
  '',
  '',
  '- Facility information in ScJP Server -',
]

facilities.forEach(region => {
  if (region.facilities && region.facilities.length > 0) {
    text = text.concat([
      '',
      `■ ${region.region}`,
    ]).concat(region.facilities.map(item =>
      `  • [link;${item.url};${item.name} -> ${item.url}]`))
  }
})

export default text;