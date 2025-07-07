export const blockscoutKnowledge = `
Kubscan is a blockchain explorer for KUB Chain. It use Blockscout as a base, which is an open-source blockchain explorer that provides a user-friendly interface for exploring blockchain data.
API Endpoints for you to select

General Search
GET /search
Search for tokens, addresses, blocks, or transactions. Query param: q.
GET /search/check-redirect
Check search term for redirect (e.g., direct result). Query param: q.

Transactions
GET /transactions
List transactions. Filter with query params: filter, type, method.
GET /transactions/{transaction_hash}
Get details for a specific transaction.
GET /transactions/{transaction_hash}/token-transfers
List token transfers in a transaction. Filter type with query param: type.
GET /transactions/{transaction_hash}/internal-transactions
List internal operations in a transaction.
GET /transactions/{transaction_hash}/logs
List logs/events for a transaction.
GET /transactions/{transaction_hash}/raw-trace
Get raw execution trace for a transaction.
GET /transactions/{transaction_hash}/state-changes
Get state changes caused by a transaction.
GET /transactions/{transaction_hash}/summary
Get a human-readable transaction summary.

Blocks
GET /blocks
List blocks. Filter type with query param: type.
GET /blocks/{block_number_or_hash}
Get block details by number or hash.
GET /blocks/{block_number_or_hash}/transactions
List transactions in a block.

Token Transfers & Internal Transactions
GET /token-transfers
List recent token transfers.
GET /internal-transactions
List recent internal transactions.

Stats & Charts
GET /stats
Get general blockchain network statistics.

Addresses
GET /addresses
List native coin holders.
GET /addresses/{address_hash}
Get address information.
GET /addresses/{address_hash}/counters
Get counters for an address (tx count, etc).
GET /addresses/{address_hash}/transactions
List transactions for an address. Filter with query param: filter.
GET /addresses/{address_hash}/token-transfers
List token transfers for an address. Filter with type, filter, token.
GET /addresses/{address_hash}/tokens
List tokens held by an address. Filter with optional query param: type ERC20 ERC721 ERC1155.
GET /addresses/{address_hash}/internal-transactions
List internal transactions for an address. Filter with query param: filter.
GET /addresses/{address_hash}/logs
List logs for an address.
GET /addresses/{address_hash}/blocks-validated
List blocks validated by the address.
GET /addresses/{address_hash}/token-balances
Get all token balances for the address.
GET /addresses/{address_hash}/tokens
Get paginated token balances. Filter with query param: type.
GET /addresses/{address_hash}/coin-balance-history
Get coin balance history for an address.
GET /addresses/{address_hash}/coin-balance-history-by-day
Get daily coin balance history.
GET /addresses/{address_hash}/nft
List NFTs owned by an address. Filter with query param: type.
GET /addresses/{address_hash}/nft/collections
List NFT collections owned by an address. Filter with query param: type.
`;
