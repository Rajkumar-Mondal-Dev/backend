const mongoose = require('mongoose')
const connectDB = require('./database')

jest.mock('mongoose', () => ({
  connect: jest.fn(),
}))

describe('connectDB', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should connect successfully using MONGO_URI and dbName', async () => {
    mongoose.connect.mockResolvedValueOnce()

    await expect(connectDB()).resolves.toBeUndefined()
    expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGO_URI, {
      dbName: 'devTinder',
    })
  })

  it('should throw an error if mongoose connection fails', async () => {
    const error = new Error('Mock connection failed')
    mongoose.connect.mockRejectedValueOnce(error)

    await expect(connectDB()).rejects.toThrow('Mock connection failed')
  })
})
