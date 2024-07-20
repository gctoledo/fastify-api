import { expect, it, beforeAll, afterAll, describe, beforeEach } from 'vitest'
import request from 'supertest'
import app from '../app'
import { handleDb } from './utils/handle-db'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    handleDb.clearDb()
    handleDb.loadMigrations()
  })

  it('should be able to create a new transaction', async () => {
    const response = await request(app.server).post('/transactions').send({
      title: 'New transaction',
      amount: 5000,
      type: 'credit',
    })

    expect(response.statusCode).toEqual(201)
  })

  it('should be able to list all transactions', async () => {
    const createdTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createdTransactionResponse.get('Set-Cookie')

    const response = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies ?? [])

    expect(response.statusCode).toEqual(200)
    expect(response.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New transaction',
        amount: 5000,
      }),
    ])
  })

  it('should be able to get a specific transaction', async () => {
    const createdTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createdTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies ?? [])

    const transactionId = listTransactionsResponse.body.transactions[0].id

    console.log(transactionId)

    const response = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies ?? [])

    expect(response.statusCode).toEqual(200)
    expect(response.body.transaction).toEqual(
      expect.objectContaining({
        title: 'New transaction',
        amount: 5000,
      }),
    )
  })
})
