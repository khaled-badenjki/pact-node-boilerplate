const path = require('path')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const expect = chai.expect
const { Pact, Matchers } = require('@pact-foundation/pact')

const LOG_LEVEL = process.env.LOG_LEVEL || 'TRACE'

chai.use(chaiAsPromised)

describe('Pact', () => {
  const provider = new Pact({
    consumer: 'storefront',
    provider: 'inventory',
    log: path.resolve(process.cwd(), 'logs', 'storefront-inventory.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    logLevel: LOG_LEVEL,
    spec: 2
  })

  const { like } = Matchers

  const healthBodyExpectation = {
    health: like('healthy')
  }

  before(() => {
    provider.setup().then((opts) => {
      process.env.API_URL = `http://127.0.0.1:${opts.port}`
    })
  })

  afterEach(() => provider.verify())
  // TODO: ping is being called with the default url, not the one defined above 
  const { ping } = require('../handlers')

  describe('when a call to the inventory service is made', () => {
    describe('and the serivce is healthy', () => {
      before(() => {
        provider.addInteraction({
          state: 'service is healthy',
          uponReceiving: 'a request to /health endpoint',
          withRequest: {
            method: 'GET',
            path: '/health'
          },
          willRespondWith: {
            status: 200,
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
            body: healthBodyExpectation
          }
        })
      })
      it('returns healthy status', (done) => {
        ping().then((body) => {
          expect(body.health).to.be.equal('healthy').notify(done)
        })
      })
    })
  })
  // Write pact files
  after(() => {
    return provider.finalize();
  })
})