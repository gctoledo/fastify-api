import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import {
  createTransactionBodySchema,
  getTransactionParamsSchema,
} from '../schemas/transactions'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export const transactionsRoutes = async (app: FastifyInstance) => {
  app.get('/', { preHandler: [checkSessionIdExists] }, async (req, reply) => {
    const { sessionId } = req.cookies

    const transactions = await knex('transactions').select('*').where({
      session_id: sessionId,
    })

    return reply.status(200).send({ transactions })
  })

  app.get(
    '/:transactionId',
    { preHandler: [checkSessionIdExists] },
    async (req, reply) => {
      const { transactionId } = getTransactionParamsSchema.parse(req.params)

      const { sessionId } = req.cookies

      const transaction = await knex('transactions')
        .where('id', transactionId)
        .andWhere('session_id', sessionId)
        .first()

      return reply.status(200).send({ transaction })
    },
  )

  app.get(
    '/balance',
    { preHandler: [checkSessionIdExists] },
    async (req, reply) => {
      const { sessionId } = req.cookies

      const balance = await knex('transactions')
        .where('session_id', sessionId)
        .sum('amount', { as: 'amount' })
        .first()

      return reply.status(200).send({ balance })
    },
  )

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
