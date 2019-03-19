const buildRPC = (method, id, password, params) => {
  return JSON.stringify({
    jsonrpc  : "2.0",
    method,
    id,
    ...(password && { password}),
    ...(params    && { params })
  })
}

export function reset(
  id,
  rpcPassword,
  params
) {
  return buildRPC(
    "reset",
    ...arguments
  )
}

export function save(
  id,
  rpcPassword,
  params
) {
  return buildRPC(
    "save",
    ...arguments
  )
}

export function getViewKey(
  id,
  rpcPassword,
  params
) {
  return buildRPC(
    "getViewKey",
    ...arguments
  )
}

export function getSpendKeys(
  id,
  rpcPassword,
  params
) {
  return buildRPC(
    "getSpendKeys",
    ...arguments
  )
}

export function getStatus(
  id,
  rpcPassword,
  params
) {
  return buildRPC(
    "getStatus",
    ...arguments
  )
}

export function getAddresses(
  id,
  rpcPassword,
  params
) {
  return buildRPC(
    "getAddresses",
    ...arguments
  )
}

export function createAddress(
  id,
  rpcPassword,
  params
) {
  return buildRPC(
    "createAddress",
    ...arguments
  )
}

export function deleteAddress(
  id,
  rpcPassword,
  params
) {
  return buildRPC(
    "deleteAddress",
    ...arguments
  )
}

export function getBalance(
  id,
  rpcPassword,
  params
) {
  return buildRPC(
    "getBalance",
    ...arguments
  )
}

export function getBlockHashes(
  id,
  rpcPassword,
  params
) {
  return buildRPC(
    "getBlockHashes",
    ...arguments
  )
}

export function getTransactionHashes(
  id,
  rpcPassword,
  params
) {
  return buildRPC(
    "getTransactionHashes",
    ...arguments
  )
}

export function getTransactions(
  id,
  rpcPassword,
  params
) {
  return buildRPC(
    "getTransactions",
    ...arguments
  )
}

export function getUnconfirmedTransactionHashes(
  id,
  rpcPassword,
  params
) {
  return buildRPC(
    "getUnconfirmedTransactionHashes",
    ...arguments
  )
}

export function getTransaction(
  id,
  rpcPassword,
  params
) {
  return buildRPC(
    "getTransaction",
    ...arguments
  )
}

export function sendTransaction(
  id,
  rpcPassword,
  params
) {
  return buildRPC(
    "sendTransaction",
    ...arguments
  )
}

export function createDelayedTransaction(
  id,
  rpcPassword,
  params
) {
  return buildRPC(
    "createDelayedTransaction",
    ...arguments
  )
}

export function getDelayedTransactionHashes(
  id,
  rpcPassword,
  params
) {
  return buildRPC(
    "getDelayedTransactionHashes",
    ...arguments
  )
}

export function deleteDelayedTransaction(
  id,
  rpcPassword,
  params
) {
  return buildRPC(
    "deleteDelayedTransaction",
    ...arguments
  )
}

export function sendDelayedTransaction(
  id,
  rpcPassword,
  params
) {
  return buildRPC(
    "sendDelayedTransaction",
    ...arguments
  )
}

export function sendFusionTransaction(
  id,
  rpcPassword,
  params
) {
  return buildRPC(
    "sendFusionTransaction",
    ...arguments
  )
}

export function estimateFusion(
  id,
  rpcPassword,
  params
) {
  return buildRPC(
    "estimateFusion",
    ...arguments
  )
}

export function getMnemonicSeed(
  id,
  rpcPassword,
  params
) {
  return buildRPC(
    "getMnemonicSeed",
    ...arguments
  )
}