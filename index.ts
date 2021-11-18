// Require the framework and instantiate it
import fastify from 'fastify'
import fetch from 'node-fetch'

const app = fastify({ logger: false })

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

// Declare a route
app.post('*', async (request, reply) => {
  // TODO: It would be nice to have a map for this
  if ((request.body as any).method === 'eth_call') {
    await delay(3 * 1000)
  }
  const response = await fetch('http://127.0.0.1:8545', { body: JSON.stringify(request.body), method: 'POST' })
  const payload = await response.json()
  console.log('request:', request.body, 'response:', payload)
  return payload
})

// Run the server!
const start = async () => {
  try {
    await app.listen(9999)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()
