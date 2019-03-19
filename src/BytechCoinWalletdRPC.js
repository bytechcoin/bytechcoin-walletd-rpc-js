/**
 * BytechCoinWalletdRPC module - provides the BytechCoinWalletd JSON-RPC wrapper for BytechCoin's walletd daemon.
 * @module BytechCoinWalletd
 */
import * as rpc           from './rpcBuilders'
import { post }           from 'popsicle'

/** Wrapper for BytechCoin walletd JSON-RPC interface */
export class BytechCoinWalletd {
  /**
   * Create an instance of BytechCoinWalletd for interacting with BytechCoin's walletd daemon
   * @param { string } host - the hostname of the walletd daemon (must include http://)
   * @param { int } port - the port number the walletd daemon is listening on
   * @param { string } rpcPassword - the password for walletd's JSON-RPC interface
   * @param { boolean } logging - switch to activate/deactivate logging
   */
  constructor(
    host        = "http://127.0.0.1",
    port        = 8070,
    rpcPassword = "test",
    logging     = true
  ) {
    this.host        = host
    this.port        = port
    this.rpcPassword = rpcPassword
    this.id          = 0
    this.logging     = logging
  }

  /**
   * Private method. Sends the actual HTTP request to JSON-RPC daemon
   * @private
   */
  _sendXHR(payload, success, error) {
    return new Promise((resolve, reject) => {
      let url = `${this.host}:${this.port}/json_rpc`,
          id  = this.id
      if (this.logging) {
        console.log('************')
        console.log(`Sending HTTP request to walletd JSON-RPC interface at ${url}...`)
        console.log(`Request (id: ${id}):`)
        console.log(payload)
        console.log('************')
      }

      post({
        url,
        body: payload
      })
      .then(res => {
        if (this.logging) {
          console.log('************')
          console.log (`Request (id: ${id}) to walletd HTTP JSON-RPC interface successful!`)
          console.log(res.status)
          console.log(res.headers)
          console.log(res.body)
          console.log('************')
        }

        res.body = JSON.parse(res.body)
        success  ? success(res) : resolve(res)
      })
      .catch(err => {
        if (this.logging) {
          console.log('************')
          console.log(`Error sending request (id: ${id})`)
          console.log(err)
          console.log('************')
        }

        error ? error(err) : resolve(err)
      })

      this.id++

    })
  }

  /**
   * Re-syncs the wallet
   * @param {string} [viewSecretKey] - Private view key for the wallet
   * If the viewSecretKey is not provided, reset() resets the wallet and re-syncs it. If the viewSecretKey argument is provided, reset() substitutes the existing wallet with a new one with the specified viewSecretKey and creates an address for it
   */
  reset(viewSecretKey, success, error) {
    return this._sendXHR(
      rpc.reset(
        this.id,
        this.rpcPassword,
        viewSecretKey ? { viewSecretKey }
        : null
      ),
      success,
      error
    )
  }

  /**
   * Saves the wallet
   */
  save(success, error) {
    return this._sendXHR(
      rpc.save(this.id, this.rpcPassword),
      success,
      error
    )
  }

  /**
   * Gets the wallet's private view key
   */
  getViewKey(success, error) {
    return this._sendXHR(
      rpc.getViewKey(this.id, this.rpcPassword),
      success, error
    )
  }

  /**
   * Gets the spend keys for an address
   * @param {string} address - Valid address that exists in the container
   */
  getSpendKeys(address, success, error) {
    return this._sendXHR(
      rpc.getSpendKeys(
        this.id,
        this.rpcPassword,
        { address }
      ),
      success,
      error
    )
  }

  /**
   * Gets information about the current RPC wallet state:
   * blockCount, knownBlockCount, lastBlockHash, and peerCount
   */
  getStatus(success, error) {
    return this._sendXHR(
      rpc.getStatus(this.id, this.rpcPassword),
      success,
      error
    )
  }

  /**
   * Gets an array of addresses in the wallet
   */
  getAddresses(success, error) {
    return this._sendXHR(
      rpc.getAddresses(this.id, this.rpcPassword),
      success, error
    )
  }

  /**
   * Creates an additional address in the wallet
   * @param {string} [secretSpendKey] - Private spend key. If specified, walletd creates a spend address.
   * @param {string} [publicSpendKey] - Public spend key. If specified, walletd creates a view address.
  * Note: If secretSpendKey or publicSpendKey parameters are specified, walletd creates a spend address with a generated spend key.
  * Note: Both parameters (secretSpendKey, viewSpendKey) cannot be present in a single request.
  */
  createAddress(secretSpendKey, publicSpendKey, success, error) {
    return this._sendXHR(
      rpc.createAddress(
        this.id,
        this.rpcPassword,
        {
          ...(secretSpendKey && { secretSpendKey }),
          ...(publicSpendKey && { publicSpendKey })

        }
      ),
      success,
      error
    )
  }

  /**
   *
   */
  deleteAddress(address, success, error) {
    return this._sendXHR(
      rpc.deleteAddress(
        this.id,
        this.rpcPassword,
        { address }
      ),
      success,
      error
    )
  }
  getBalance(address, success, error) {
    return this._sendXHR(
      rpc.getBalance(
        this.id,
        this.rpcPassword,
        address ? { address }
        : null
      ),
      success,
      error
    )
  }

  getBlockHashes(firstBlockIndex, blockCount, success, error) {
    return this._sendXHR(
      rpc.getBlockHashes(
        this.id,
        this.rpcPassword,
        {
          firstBlockIndex,
          blockCount
        }
      ),
      success,
      error
    )
  }

  getTransactionHashes(
    blockCount,
    firstBlockIndex,
    blockHash,
    addresses,
    paymentId,
    success,
    error
  ) {
    return this._sendXHR(
      rpc.getTransactionHashes(
        this.id,
        this.rpcPassword,
        {
          blockCount,
          ...(firstBlockIndex && { firstBlockIndex }),
          ...(blockHash       && { blockHash }),
          ...(addresses       && { addresses }),
          ...(paymentId       && { paymentId })
        }
      ),
      success,
      error
    )
  }
  getTransactions(
    blockCount,
    firstBlockIndex,
    blockHash,
    addresses,
    paymentId,
    success,
    error
  ) {
    return this._sendXHR(
      rpc.getTransactions(
        this.id,
        this.rpcPassword,
        {
          blockCount,
          ...(firstBlockIndex && { firstBlockIndex }),
          ...(blockHash       && { blockHash }),
          ...(addresses       && { addresses }),
          ...(paymentId       && { paymentId })
        }
      ),
      success,
      error
    )
  }

  getUnconfirmedTransactionHashes(addresses, success, error) {
    return this._sendXHR(
      rpc.getUnconfirmedTransactionHashes(
        this.id,
        this.rpcPassword,
        addresses ? { addresses }
        : null
      ),
      success,
      error
    )
  }

  getTransaction(transactionHash, success, error) {
    return this._sendXHR(
      rpc.getTransaction(
        this.id,
        this.rpcPassword,
        { transactionHash }
      ),
      success,
      error
    )
  }

  sendTransaction(
    anonymity,
    transfers,
    fee,
    addresses,
    unlockTime,
    extra,
    paymentId,
    changeAddress,
    success,
    error
  ) {
    return this._sendXHR(
      rpc.sendTransaction(
        this.id,
        this.rpcPassword,
        {
          anonymity,
          transfers,
          fee,
          ...(addresses  && { addresses }),
          ...(unlockTime && { unlockTime  }),
          ...(extra      && { extra }),
          ...(paymentId  && { paymentId }),
          ...(changeAddress && { changeAddress })
        }
      ),
      success,
      error
    )
  }

  createDelayedTransaction(
    anonymity,
    transfers,
    fee,
    addresses,
    unlockTime,
    extra,
    paymentId,
    changeAddress,
    success,
    error
  ) {
    return this._sendXHR(
      rpc.createDelayedTransaction(
        this.id,
        this.rpcPassword,
        {
          anonymity,
          transfers,
          fee,
          ...(addresses  && { addresses }),
          ...(unlockTime && { unlockTime  }),
          ...(extra      && { extra }),
          ...(paymentId  && { paymentId }),
          ...(changeAddress && { changeAddress })
        }
      ),
      success,
      error
    )
  }

  getDelayedTransactionHashes(success, error) {
    return this._sendXHR(
      rpc.getDelayedTransactionHashes(
        this.id,
        this.rpcPassword
      ),
      success,
      error
    )
  }

  deleteDelayedTransaction(transactionHash, success, error) {
    return this._sendXHR(
      rpc.deleteDelayedTransaction(
        this.id,
        this.rpcPassword,
        { transactionHash }
      ),
      success,
      error
    )
  }

  sendDelayedTransaction(transactionHash, success, error) {
    return this._sendXHR(
      rpc.sendDelayedTransaction(
        this.id,
        this.rpcPassword,
        { transactionHash }
      ),
      success,
      error
    )
  }

  sendFusionTransaction(
    threshold,
    anonymity,
    addresses,
    destinationAddress,
    success,
    error
  ) {
    return this._sendXHR(
      rpc.sendFusionTransaction(
        this.id,
        this.rpcPassword,
        {
          threshold,
          anonymity,
         ...(addresses && { addresses }),
         ...(destinationAddress && { destinationAddress })
        }
      ),
      success,
      error
    )
  }

  estimateFusion(threshold, addresses, success, error) {
    return this._sendXHR(
      rpc.estimateFusion(
        this.id,
        this.rpcPassword,
        {
          threshold,
          ...(addresses && { addresses })
        }
      ),
      success,
      error
    )
  }

  getMnemonicSeed(address, success, error) {
    return this._sendXHR(
      rpc.getMnemonicSeed(
        this.id,
        this.rpcPassword,
        { address }
      ),
      success,
      error
    )
  }
}
