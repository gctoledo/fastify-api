import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { createTransactionBodySchema } from '../schemas/transactions'

export const transactionsRoutes = async (app: FastifyInstance) => {
  app.get('/', async (_, reply) => {
    const transactions = await knex('transactions').select('*')

    return reply.status(200).send({ transactions })
  })

  app.post('/', async (req, reply) => {
    const { amount, title, type } = createTransactionBodySchema.parse(req.body)

    await knex('transactions').insert({
      id: randomUUID(),
      amount: type === 'credit' ? amount : amount * -1,
      title,
    })

    return reply.status(201).send()
  })
}
