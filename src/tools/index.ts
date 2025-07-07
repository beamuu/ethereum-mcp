import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
// import { ethereumKnowledge } from "../resources/base-knowledge/ethereum";
// import { handleGasPrice } from "../modules/ethereum/jsonrpc/eth-gas-price";
// import { handleGetAccount } from "../modules/ethereum/jsonrpc/eth-get-account";
// import { handleGetBalance } from "../modules/ethereum/jsonrpc/eth-get-balance";
// import { handleGetBlockByHash } from "../modules/ethereum/jsonrpc/eth-get-block-by-hash";
// import { handleGetBlockByNumber } from "../modules/ethereum/jsonrpc/eth-get-block-by-number";
// import { handleGetCode } from "../modules/ethereum/jsonrpc/eth-get-code";
// import { handleGetLogs } from "../modules/ethereum/jsonrpc/eth-get-logs";
// import { handleGetTransaction } from "../modules/ethereum/jsonrpc/eth-get-transaction";
// import { handleGetTransactionReceipt } from "../modules/ethereum/jsonrpc/eth-get-transaction-receipt";
// import { handleBlockNumber } from "../modules/ethereum/jsonrpc/eth-block-number";
import { client } from "../modules/ethereum";
import { jsonRpcKnowledge } from "../resources/base-knowledge/jsonrpc";
import { parseLooseArray } from "../utils/parse-arr";
import { blockscoutKnowledge } from "../resources/base-knowledge/blockscout";
import { callBlockscoutApi } from "../modules/blockscout-api";

export function registerTools(server: McpServer) {
    // Tool: Get Blockchain Knowledge
    // server.registerTool(
    //     "get-blockchain-knowledge",
    //     {
    //         title: "Get Blockchain Knowledge",
    //         description:
    //             "Get comprehensive knowledge about the blockchain, covering core concepts, data structures, and mechanisms",
    //         inputSchema: {},
    //     },
    //     async () => {
    //         return {
    //             content: [
    //                 {
    //                     type: "text",
    //                     text: ethereumKnowledge,
    //                 },
    //             ],
    //         };
    //     }
    // );

    // // Tool: Get Balance
    // server.registerTool(
    //     "get-balance",
    //     {
    //         title: "Get Balance",
    //         description: "Get balance of an address",
    //         inputSchema: {
    //             address: z.string(),
    //         },
    //     },
    //     async ({ address }) => {
    //         const bal = await handleGetBalance(address);
    //         return {
    //             content: [
    //                 {
    //                     type: "text",
    //                     text: bal,
    //                 },
    //             ],
    //         };
    //     }
    // );

    // // Tool: Get Transaction by Hash
    // server.registerTool(
    //     "get-transaction",
    //     {
    //         title: "Get Transaction",
    //         description: "Get details of an transaction by hash",
    //         inputSchema: {
    //             txHash: z.string(),
    //         },
    //     },
    //     async ({ txHash }) => {
    //         const transactionResponse = await handleGetTransaction(txHash);
    //         return {
    //             content: [
    //                 {
    //                     type: "text",
    //                     text: transactionResponse,
    //                 },
    //             ],
    //         };
    //     }
    // );

    // // Tool: Get Transaction Receipt
    // server.registerTool(
    //     "get-transaction-receipt",
    //     {
    //         title: "Get Transaction Receipt",
    //         description: "Get the receipt of an transaction by hash",
    //         inputSchema: {
    //             txHash: z.string(),
    //         },
    //     },
    //     async ({ txHash }) => {
    //         const receiptResponse = await handleGetTransactionReceipt(txHash);
    //         return {
    //             content: [
    //                 {
    //                     type: "text",
    //                     text: receiptResponse,
    //                 },
    //             ],
    //         };
    //     }
    // );

    // // Tool: Get Block by Number
    // server.registerTool(
    //     "get-block-by-number",
    //     {
    //         title: "Get Block by Number",
    //         description:
    //             "Get an block by block number (supports 'latest', 'pending', 'earliest', decimal, or hex)",
    //         inputSchema: {
    //             blockNumber: z.string(),
    //         },
    //     },
    //     async ({ blockNumber }) => {
    //         const blockResponse = await handleGetBlockByNumber(blockNumber);
    //         return {
    //             content: [
    //                 {
    //                     type: "text",
    //                     text: blockResponse,
    //                 },
    //             ],
    //         };
    //     }
    // );

    // // Tool: Get Block by Hash
    // server.registerTool(
    //     "get-block-by-hash",
    //     {
    //         title: "Get Block by Hash",
    //         description: "Get an block by block hash",
    //         inputSchema: {
    //             blockHash: z.string(),
    //         },
    //     },
    //     async ({ blockHash }) => {
    //         const blockResponse = await handleGetBlockByHash(blockHash);
    //         return {
    //             content: [
    //                 {
    //                     type: "text",
    //                     text: blockResponse,
    //                 },
    //             ],
    //         };
    //     }
    // );

    // // Tool: Get Gas Price
    // server.registerTool(
    //     "get-gas-price",
    //     {
    //         title: "Get Gas Price",
    //         description: "Get current gas price information",
    //         inputSchema: {},
    //     },
    //     async () => {
    //         const gasPriceResponse = await handleGasPrice();
    //         return {
    //             content: [
    //                 {
    //                     type: "text",
    //                     text: gasPriceResponse,
    //                 },
    //             ],
    //         };
    //     }
    // );

    // // Tool: Get Account Information
    // server.registerTool(
    //     "get-account",
    //     {
    //         title: "Get Account",
    //         description:
    //             "Get account information including balance, nonce, and contract status",
    //         inputSchema: {
    //             address: z.string(),
    //         },
    //     },
    //     async ({ address }) => {
    //         const accountResponse = await handleGetAccount(address);
    //         return {
    //             content: [
    //                 {
    //                     type: "text",
    //                     text: accountResponse,
    //                 },
    //             ],
    //         };
    //     }
    // );

    // // Tool: Get Contract Code
    // server.registerTool(
    //     "get-code",
    //     {
    //         title: "Get Contract Code",
    //         description: "Get the contract code at an address",
    //         inputSchema: {
    //             address: z.string(),
    //         },
    //     },
    //     async ({ address }) => {
    //         const codeResponse = await handleGetCode(address);
    //         return {
    //             content: [
    //                 {
    //                     type: "text",
    //                     text: codeResponse,
    //                 },
    //             ],
    //         };
    //     }
    // );

    // // Tool: Get Logs
    // server.registerTool(
    //     "get-logs",
    //     {
    //         title: "Get Logs",
    //         description:
    //             "Get logs based on filter criteria (fromBlock, toBlock, address, topics)",
    //         inputSchema: {
    //             fromBlock: z.string().optional(),
    //             toBlock: z.string().optional(),
    //             address: z.string().optional(),
    //             topics: z.array(z.string()).optional(),
    //         },
    //     },
    //     async ({ fromBlock, toBlock, address, topics }) => {
    //         const queryParams: any = {};
    //         if (fromBlock) queryParams.fromBlock = fromBlock;
    //         if (toBlock) queryParams.toBlock = toBlock;
    //         if (address) queryParams.address = address;
    //         if (topics) queryParams.topics = topics;

    //         const logsResponse = await handleGetLogs(queryParams);
    //         return {
    //             content: [
    //                 {
    //                     type: "text",
    //                     text: logsResponse,
    //                 },
    //             ],
    //         };
    //     }
    // );

    // // Tool: Get Current Block Number
    // server.registerTool(
    //     "get-current-block-number",
    //     {
    //         title: "Get Current Block Number",
    //         description: "Get the current block number of the blockchain",
    //         inputSchema: {},
    //     },
    //     async () => {
    //         const currentBlockNumberResult = await handleBlockNumber();
    //         return {
    //             content: [
    //                 {
    //                     type: "text",
    //                     text: currentBlockNumberResult,
    //                 },
    //             ],
    //         };
    //     }
    // );

    // // Tool: Generic Blockchain JSON-RPC
    server.registerTool(
        "use-json-rpc",
        {
            title: "Blockchain JSON-RPC",
            description:
                "Execute any Ethereum JSON-RPC method with provided parameters. Supports all standard Ethereum RPC methods like eth_getBalance, eth_getBlockByNumber, eth_getTransactionByHash, etc.",
            inputSchema: {
                method: z
                    .string()
                    .describe(
                        "The JSON-RPC method name (e.g., 'eth_getBalance', 'eth_getBlockByNumber', 'eth_getTransactionByHash')"
                    ),
                params: z
                    .string()
                    .describe(
                        "Array of parameters for the JSON-RPC method. Order and types depend on the specific method being called. Pass as a string type with array indicator (e.g., '[\"0x1234\", \"latest\"]') or '[]' for no parameters"
                    ),
            },
        },
        async ({ method, params }) => {
            try {
                // Make the JSON-RPC call using the ethers provider
                const p = parseLooseArray(params);
                console.log("calling rpc method:", method, "with params:", p);
                const result = await client.send(method, p);

                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(result, null, 2),
                        },
                    ],
                };
            } catch (error) {
                return {
                    content: [
                        {
                            type: "text",
                            text: `Error executing JSON-RPC method ${method}: ${
                                error instanceof Error
                                    ? error.message
                                    : String(error)
                            }`,
                        },
                    ],
                    isError: true,
                };
            }
        }
    );

    server.registerTool(
        "use-json-rpc-instruction",
        {
            title: "Instruction to use tool use-json-rpc",
            description:
                "Detailed instructions on how to use the use-json-rpc tool to access data from blockchain",
        },
        async () => ({
            content: [
                {
                    type: "text",
                    text: jsonRpcKnowledge,
                },
            ],
        })
    );
    server.registerTool(
        "hex-to-decimal",
        {
            title: "Convert Hex to Decimal",
            description:
                "Convert a hexadecimal string to its decimal representation. Useful for interpreting blockchain data.",
            inputSchema: {
                hex: z
                    .string()
                    .describe("Hexadecimal string to convert to decimal"),
            },
        },
        async ({ hex }) => {
            // Validate hex format
            if (!/^0x[0-9a-fA-F]+$/.test(hex)) {
                return {
                    content: [
                        {
                            type: "text",
                            text: `Invalid hex format: ${hex}`,
                        },
                    ],
                    isError: true,
                };
            }

            // Convert hex to decimal
            const decimal = BigInt(hex).toString(10);
            return {
                content: [
                    {
                        type: "text",
                        text: `Decimal representation of ${hex} is ${decimal}`,
                    },
                ],
            };
        }
    );
    server.registerTool(
        "decimal-to-hex",
        {
            title: "Convert Decimal to Hex",
            description:
                "Convert a decimal number to its hexadecimal representation. Useful for interpreting blockchain data.",
            inputSchema: {
                decimal: z
                    .string()
                    .describe("Decimal number to convert to hexadecimal"),
            },
        },
        async ({ decimal }) => {
            // Validate decimal format
            if (!/^-?\d+$/.test(decimal)) {
                return {
                    content: [
                        {
                            type: "text",
                            text: `Invalid decimal format: ${decimal}`,
                        },
                    ],
                    isError: true,
                };
            }

            // Convert decimal to hex
            const hex = BigInt(decimal).toString(16);
            return {
                content: [
                    {
                        type: "text",
                        text: `Hexadecimal representation of ${decimal} is 0x${hex}`,
                    },
                ],
            };
        }
    );
    server.registerTool(
        "use-blockscout-instruction",
        {
            title: "Instruction to use Blockchain Explorer for searching data",
            description:
                "Detailed instructions on how to use the blockchain explorer to search for transactions, blocks, addresses, and tokens. Or fallback to the use-json-rpc tool if the explorer is not available.",
        },
        async () => ({
            content: [
                {
                    type: "text",
                    text: blockscoutKnowledge,
                },
            ],
        })
    );

    server.registerTool(
        "use-blockscout",
        {
            title: "Blockchain Explorer",
            description:
                "Search for transactions, blocks, addresses, and tokens on the blockchain explorer. If the explorer is not available, fallback to the use-json-rpc tool.",
            inputSchema: {
                endpoint: z
                    .string()
                    .describe(
                        "Path to the resource to search (e.g., '/transactions', '/blocks', '/search?q=...' ref from the instruction)"
                    ),
            },
        },
        async ({ endpoint }) => {
            // Fallback to use-json-rpc if the explorer is not available
            const res = await callBlockscoutApi(endpoint);
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(res),
                    },
                ],
            };
        }
    );
}
