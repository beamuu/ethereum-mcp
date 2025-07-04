export const ethereumKnowledge = `
## Ethereum Pre-Merge: Comprehensive Base Knowledge

This document outlines the core concepts, data structures, and mechanisms of Ethereum **before the Merge**, covering the original Proof-of-Work Mainnet. It is designed to inform MCP resource design and LLM understanding.

---

### 1. Architecture Layer

1. **Execution Layer (EL)**

   * Runs the Ethereum Virtual Machine (EVM).
   * Processes transactions, smart contracts, and state transitions.
   * Produces blocks containing:

     * **Header**: metadata (parentHash, stateRoot, txRoot, receiptsRoot, timestamp, nonce, difficulty).
     * **Transactions**: ordered list of signed transactions.
     * **Uncles (Ommer headers)**: up to two uncle headers for security incentives.

> *Note: Legacy Ethereum separates only the EVM execution layer. Consensus is handled by Proof-of-Work.*

---

### 2. Core Data Sets & Structures

| Dataset          | Description                               | Key Fields & Content                                                                                                                                         |
| ---------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Block Header** | Metadata for each block                   | parentHash, ommersHash, beneficiary, stateRoot, txRoot, receiptsRoot, logsBloom, difficulty, number, gasLimit, gasUsed, timestamp, extraData, mixHash, nonce |
| **Transactions** | Signed messages changing state            | nonce, gasPrice / maxFeePerGas, maxPriorityFeePerGas, gasLimit, to, value, data, v, r, s                                                                     |
| **Receipts**     | Post-execution results                    | transactionHash, blockHash, blockNumber, cumulativeGasUsed, gasUsed, contractAddress, logs, status                                                           |
| **State Trie**   | Merkle Patricia Trie of global state      | Maps 20‑byte addresses to {nonce, balance, storageRoot, codeHash}                                                                                            |
| **Storage Trie** | Per-contract storage                      | Separate MPT for each contract’s storageRoot mapping slot keys to 32‑byte values                                                                             |
| **Logs**         | Event logs emitted during execution       | Each log: address, topics\[] (up to 4 indexed), data bytes                                                                                                   |
| **Uncles**       | Included uncle headers for block security | Same structure as block headers but without transactions or receipts                                                                                         |

---

### 3. Ethereum Abstractions

1. **Account Model**

   * **Externally Owned Accounts (EOA)**: controlled by private keys; send transactions and pay gas.
   * **Contract Accounts**: code stored under an address; invoked by transactions or contract calls.
   * **Fields**:

     * nonce (uint64): transaction count or contract-creation count.
     * balance (wei): Ether held.
     * storageRoot: root of the contract’s storage trie.
     * codeHash: hash of the contract’s bytecode.

2. **EVM Execution Model**

   * **Stack-based VM**: 1024‑depth stack, 256‑bit word size.
   * **Memory**: byte‑addressable, zero‑initialized per call.
   * **Gas**: metered per opcode to prevent infinite loops.
   * **Opcodes**: \~150 instructions (arithmetic, environment, storage, logging, control flow).
   * **Call Frames**: isolate contract calls with local memory and gas.
   * **State Transitions**: successful execution updates the global state trie.

---

### 4. Block Production & Timing

* **Block Time**: \~13–15 seconds on Mainnet PoW.
* **Difficulty Adjustment**: Every block via Ethash’s difficulty bomb targeting that average.
* **Uncle Inclusion**: Miners include up to two uncle headers, receiving a partial reward; uncles also earn a reward.
* **Finality**: Probabilistic—each additional block deep reduces the chance of reorgs exponentially.

---

### 5. Consensus Mechanism: Ethash Proof-of-Work

* **Ethash PoW**

  * Memory-hard, ASIC-resistant puzzle based on a large Directed Acyclic Graph (DAG).
  * Miners iterate nonces to find a block hash below the target threshold.
  * Rewards: block subsidy, uncle inclusion reward, transaction fees (pre-EIP-1559: all gas fees to miner).

---

### 6. Smart Contract Platform

* **Languages**: Solidity, Vyper compile to EVM bytecode.
* **Deployment**: eth_sendRawTransaction with init code in data; contract address = keccak256(sender, nonce).
* **Calls**: CALL, DELEGATECALL, STATICCALL for inter-contract interactions.
* **Events**: LOGn opcodes emit logs for off-chain indexers.
* **ABI Encoding**: Standard for function selectors and parameter serialization.

---

### 7. Ethereum RPC Abstraction

Common JSON-RPC methods exposed at /rpc:

* eth_blockNumber
* eth_getBlockByNumber
* eth_getBlockByHash
* eth_getTransactionByHash
* eth_getTransactionReceipt
* eth_call
* eth_sendRawTransaction
* eth_estimateGas
* eth_getLogs

Networking and client implementations leverage devp2p (RLPx, eth/66) under the hood.

---

### 8. Mechanism of Blockchain

1. **Transaction Lifecycle**: Created → Signed → Pooled → Propagated → Mined → Executed → State Updated → Receipt Generated.
2. **Propagation**: Gossip TX/blocks via devp2p.
3. **State Merklization**: stateRoot in header commits to entire state.
4. **Reorgs**: Chain with greatest cumulative difficulty wins; stale blocks dropped and state reverts.

---
`;
