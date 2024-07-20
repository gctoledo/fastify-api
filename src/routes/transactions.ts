import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import {
  createTransactionBodySchema,
  getTransactionParamsSchema,
} from '../schemas/transactions'

export const transactionsRoutes = async (app: FastifyInstance) => {
  app.get('/', async (_, reply) => {
    const transactions = await knex('transactions').select('*')

    return reply.status(200).send({ transactions })
  })

  app.get('/:transactionId', async (req, reply) => {
    const { transactionId } = getTransactionParamsSchema.parse(req.params)

    const transaction = await knex('transactions')
      .where('id', transactionId)
      .first()

    return reply.status(200).send({ transaction })
  })

  app.get('/balance', async (req, reply) => {
    const balance = await knex('transactions')
      .sum('amount', { as: 'amount' })
      .first()

    return reply.status(200).send({ balance })
  })

  app.post('/', async (req, reply) => {
    const { amount, title, type } = createTransactionBodySchema.parse(req.body)

    let sessionId = req.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    }

    await knex('transactions').insert({
      id: randomUUID(),
      amount: type === 'credit' ? amount : amount * -1,
      title,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })
}
