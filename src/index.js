const fetch = require('node-fetch')

const DECIMALS = Math.pow(10, 18)
const QUERY = `
{
  total: holder(id: "0x0000000000000000000000000000000000000000") {
    amount
  }
  pool: holder(id: "0x05e42c4ae51ba28d8acf8c371009ad7138312ca4") {
    amount
  }
}
`

module.exports = async (req) => {
  const data = await fetch('https://api.thegraph.com/subgraphs/name/onbjerg/honey', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: QUERY })
  })
  const supply = (await data.json()).data

  switch (req.url) {
    case '/circulating':
      return (Math.abs(supply.total.amount) - supply.pool.amount) / DECIMALS
    default:
    case '/total':
      return Math.abs(supply.total.amount) / DECIMALS
  }
}
