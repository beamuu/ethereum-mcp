import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { ethereumKnowledge } from "../resources/base-knowledge/ethereum";
import { handleGasPrice } from "../modules/ethereum/jsonrpc/eth-gas-price";
import { handleGetAccount } from "../modules/ethereum/jsonrpc/eth-get-account";
import { handleGetBalance } from "../modules/ethereum/jsonrpc/eth-get-balance";
import { handleGetBlockByHash } from "../modules/ethereum/jsonrpc/eth-get-block-by-hash";
import { handleGetBlockByNumber } from "../modules/ethereum/jsonrpc/eth-get-block-by-number";
import { handleGetCode } from "../modules/ethereum/jsonrpc/eth-get-code";
import { handleGetLogs } from "../modules/ethereum/jsonrpc/eth-get-logs";
import { handleGetTransaction } from "../modules/ethereum/jsonrpc/eth-get-transaction";
import { handleGetTransactionReceipt } from "../modules/ethereum/jsonrpc/eth-get-transaction-receipt";
import { handleBlockNumber } from "../modules/ethereum/jsonrpc/eth-block-number";

export function registerTools(server: McpServer) {
    // Tool: Get Blockchain Knowledge
    server.registerTool(
        "get-blockchain-knowledge",
        {
            title: "Get Blockchain Knowledge",
            description:
                "Get comprehensive knowledge about the blockchain, covering core concepts, data structures, and mechanisms",
            inputSchema: {},
        },
        async () => {
            return {
                content: [
                    {
                        type: "text",
                        text: ethereumKnowledge,
                    },
                ],
            };
        }
    );

    // Tool: Get Balance
    server.registerTool(
        "get-balance",
        {
            title: "Get Balance",
            description: "Get balance of an address",
            inputSchema: {
                address: z.string(),
            },
        },
        async ({ address }) => {
            const bal = await handleGetBalance(address);
            return {
                content: [
                    {
                        type: "text",
                        text: bal,
                    },
                ],
            };
        }
    );

    // Tool: Get Transaction by Hash
    server.registerTool(
        "get-transaction",
        {
            title: "Get Transaction",
            description: "Get details of an transaction by hash",
            inputSchema: {
                txHash: z.string(),
            },
        },
        async ({ txHash }) => {
            const transactionResponse = await handleGetTransaction(txHash);
            return {
                content: [
                    {
                        type: "text",
                        text: transactionResponse,
                    },
                ],
            };
        }
    );

    // Tool: Get Transaction Receipt
    server.registerTool(
        "get-transaction-receipt",
        {
            title: "Get Transaction Receipt",
            description: "Get the receipt of an transaction by hash",
            inputSchema: {
                txHash: z.string(),
            },
        },
        async ({ txHash }) => {
            const receiptResponse = await handleGetTransactionReceipt(txHash);
            return {
                content: [
                    {
                        type: "text",
                        text: receiptResponse,
                    },
                ],
            };
        }
    );

    // Tool: Get Block by Number
    server.registerTool(
        "get-block-by-number",
        {
            title: "Get Block by Number",
            description:
                "Get an block by block number (supports 'latest', 'pending', 'earliest', decimal, or hex)",
            inputSchema: {
                blockNumber: z.string(),
            },
        },
        async ({ blockNumber }) => {
            const blockResponse = await handleGetBlockByNumber(blockNumber);
            return {
                content: [
                    {
                        type: "text",
                        text: blockResponse,
                    },
                ],
            };
        }
    );

    // Tool: Get Block by Hash
    server.registerTool(
        "get-block-by-hash",
        {
            title: "Get Block by Hash",
            description: "Get an block by block hash",
            inputSchema: {
                blockHash: z.string(),
            },
        },
        async ({ blockHash }) => {
            const blockResponse = await handleGetBlockByHash(blockHash);
            return {
                content: [
                    {
                        type: "text",
                        text: blockResponse,
                    },
                ],
            };
        }
    );

    // Tool: Get Gas Price
    server.registerTool(
        "get-gas-price",
        {
            title: "Get Gas Price",
            description: "Get current gas price information",
            inputSchema: {},
        },
        async () => {
            const gasPriceResponse = await handleGasPrice();
            return {
                content: [
                    {
                        type: "text",
                        text: gasPriceResponse,
                    },
                ],
            };
        }
    );

    // Tool: Get Account Information
    server.registerTool(
        "get-account",
        {
            title: "Get Account",
            description:
                "Get account information including balance, nonce, and contract status",
            inputSchema: {
                address: z.string(),
            },
        },
        async ({ address }) => {
            const accountResponse = await handleGetAccount(address);
            return {
                content: [
                    {
                        type: "text",
                        text: accountResponse,
                    },
                ],
            };
        }
    );

    // Tool: Get Contract Code
    server.registerTool(
        "get-code",
        {
            title: "Get Contract Code",
            description: "Get the contract code at an address",
            inputSchema: {
                address: z.string(),
            },
        },
        async ({ address }) => {
            const codeResponse = await handleGetCode(address);
            return {
                content: [
                    {
                        type: "text",
                        text: codeResponse,
                    },
                ],
            };
        }
    );

    // Tool: Get Logs
    server.registerTool(
        "get-logs",
        {
            title: "Get Logs",
            description:
                "Get logs based on filter criteria (fromBlock, toBlock, address, topics)",
            inputSchema: {
                fromBlock: z.string().optional(),
                toBlock: z.string().optional(),
                address: z.string().optional(),
                topics: z.array(z.string()).optional(),
            },
        },
        async ({ fromBlock, toBlock, address, topics }) => {
            const queryParams: any = {};
            if (fromBlock) queryParams.fromBlock = fromBlock;
            if (toBlock) queryParams.toBlock = toBlock;
            if (address) queryParams.address = address;
            if (topics) queryParams.topics = topics;

            const logsResponse = await handleGetLogs(queryParams);
            return {
                content: [
                    {
                        type: "text",
                        text: logsResponse,
                    },
                ],
            };
        }
    );

    // Tool: Get Current Block Number
    server.registerTool(
        "get-current-block-number",
        {
            title: "Get Current Block Number",
            description: "Get the current block number of the blockchain",
            inputSchema: {},
        },
        async () => {
            const currentBlockNumberResult = await handleBlockNumber();
            return {
                content: [
                    {
                        type: "text",
                        text: currentBlockNumberResult,
                    },
                ],
            };
        }
    );
}
