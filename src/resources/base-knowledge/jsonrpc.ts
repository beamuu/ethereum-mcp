export const jsonRpcKnowledge = `
# 🔧 How to Talk to an Ethereum JSON-RPC Node

These instructions are for an AI (or any autonomous agent) that needs to **query** and **submit** data through a standard Ethereum JSON-RPC endpoint.

---

## 1  Transport Layer

| Item | Value | Notes |
|------|-------|-------|
| **Protocol** | HTTP POST (or WebSocket if supported) | Always send Content-Type: application/json. |
| **JSON-RPC version** | "2.0" | Include the field exactly. |
| **Envelope** | { "jsonrpc": "2.0", "method": "<name>", "params": [ … ], "id": <int \| string> } | id can be any unique value; echo it back to correlate responses. |
| **Batching** | Send an **array** of envelopes | The node returns an array in any order. |
| **Error handling** | If the response has an "error" key, treat the call as failed and read error.code / error.message. | Retry only on transient errors (e.g. -32005, "timeout"). |

---

## 2  Encoding Rules

1. **Hex quantities**  
   * Big-endian, two-s complement **without leading zeros**, prefixed by 0x.  
   * Example: decimal 15 000 → "0x3a98".
2. **Hashes / Addresses**  
   * Always 0x-prefixed 32-byte (64 hex chars) for hashes, 20-byte (40 hex chars) for addresses.  
   * Mixed-case checksum is optional but recommended for addresses (EIP-55).
3. **Block specifiers**  
   * Use a **quantity** ("0x…"), or a **tag**: "latest", "earliest", "pending".
4. **Boolean flags**  
   * The last parameter of many “get” calls toggles **full objects vs. hashes**; true → return full structures.
5. **Time**  
   * All timestamps returned are **Unix seconds** (uint64).

---

## 3  Method Cheat-Sheet (Frequently Used)

| Method | Params | Result (success) | Typical Use |
|--------|--------|------------------|-------------|
| eth_chainId | [] | "0x1" (mainnet) | Discover network. |
| eth_blockNumber | [] | Hex quantity | Latest height. |
| eth_getBlockByNumber | [ <block>, <bool fullTx> ] | Block object | Historical queries, live tailing. |
| eth_getBlockByHash | [ "0xhash", <bool fullTx> ] | Block object | Integrity check. |
| eth_getTransactionByHash | [ "0xhash" ] | Tx object \| null | Lookup single tx. |
| eth_getTransactionReceipt | [ "0xhash" ] | Receipt object | Status, logs, gas used. |
| eth_getBalance | [ "0xaddr", <block> ] | Hex quantity (wei) | Wallet balances. |
| eth_getCode | [ "0xaddr", <block> ] | "0x…", empty if EOA | Detect smart contracts. |
| eth_call | [ txCallObj, <block> ] | Return data | Read-only contract queries. |
| eth_estimateGas | [ txCallObj ] | Hex quantity | Pre-flight a tx. |
| eth_sendRawTransaction | [ "0x…signedTx" ] | "0xhash" | Broadcast signed tx. |
| eth_gasPrice | [] | Hex quantity | Legacy fee suggestion. |
| eth_feeHistory | [ <blockCount>, <newestBlock>, <rewardPercentiles> ] | Fee history struct | EIP-1559 price modeling. |
| eth_getLogs | [ filterObj ] | Array of log objects | Indexer / event processor. |
| eth_getTransactionCount | [ "0xaddr", <block> ] | Hex quantity | Next nonce for account. |

### Parameter Structures

jsonc
// <txCallObj>
{
  "from":  "0x...",      // optional for eth_call; required for estimateGas
  "to":    "0x...",      // null for contract creation
  "gas":   "0x5208",     // optional, 21000 by default
  "gasPrice":           "0x...", // legacy
  "value":              "0x...", // wei
  "data":               "0x..."  // ABI-encoded call
}

// <filterObj> for eth_getLogs
{
  "fromBlock": "0x0",
  "toBlock":   "latest",
  "address": [ "0xtoken1", "0xtoken2" ],
  "topics": [
     "0xddf252ad...",           // indexed event signature
     ["0xaddr1", "0xaddr2"],    // OR-list in indexed position
     null                       // wildcard
  ]
}
`;
