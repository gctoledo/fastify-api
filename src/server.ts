import fastify from 'fastify'

const app = fastify()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running')
})
