import { BytechCoinWalletd } from './BytechCoinWalletdRPC'


const host      = 'http://localhost',
      port      = 8081,
      password  = 'password'

describe('BytechCionWalletd', () => {
  describe('getViewKey()', () => {
    it('works', () => {
      let tc = new BytechCoinWalletd(host, port, password)

      console.log(
        tc.getViewKey()
        .then(function(res) { console.log(res) })
        .catch(function(err) { console.log('error - ', err) })
      )
    })
  })
})
