import { expect } from 'chai'
import * as Terminus from './terminus'

describe('src/terminus', () => {
  it('onSignal return undefined', async () => {
    const onSignal = await Terminus.onSignal()
    expect(onSignal).to.be.undefined
  })
  it('onHealthCheck return undefined', async () => {
    const onHealthCheck = await Terminus.onHealthCheck()
    expect(onHealthCheck).to.be.undefined
  })
  it('onShutdown return undefined', async () => {
    const onShutdown = await Terminus.onShutdown()
    expect(onShutdown).to.be.undefined
  })
})
