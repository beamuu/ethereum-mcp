import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { ethereumKnowledge } from "./base-knowledge/ethereum";
import { handleGasPrice } from "../modules/ethereum/jsonrpc/eth-gas-price";
import { handleGetAccount } from "../modules/ethereum/jsonrpc/eth-get-account";
import { handleGetBalance } from "../modules/ethereum/jsonrpc/eth-get-balance";
import { handleGetBlockByHash } from "../modules/ethereum/jsonrpc/eth-get-block-by-hash";
import { handleGetBlockByNumber } from "../modules/ethereum/jsonrpc/eth-get-block-by-number";
import { handleGetCode } from "../modules/ethereum/jsonrpc/eth-get-code";
import { handleGetLogs } from "../modules/ethereum/jsonrpc/eth-get-logs";
import { handleGetTransaction } from "../modules/ethereum/jsonrpc/eth-get-transaction";
import { handleGetTransactionReceipt } from "../modules/ethereum/jsonrpc/eth-get-transaction-receipt";

export function registerResources(server: McpServer) {
  server.registerResource(
    "knowledge-chain",
    "knowledge://chain",
    {
      title: "Blockchain Base Knowledge",
      description:
        "Comprehensive knowledge about this blockchain before, covering core concepts, data structures, and mechanisms.",
      mimeType: "text/plain",
    },
    async (uri) => {
      return {
        contents: [
          {
            uri: uri.href,
            text: ethereumKnowledge,
          },
        ],
      };
    }
  );
  server.registerResource(
    "eth-get-balance",
    new ResourceTemplate("ethereum://balance/{address}", { list: undefined }),
    {
      title: "Ethereum Balance",
      description: "Get the balance of an Ethereum address",
      mimeType: "text/plain",
    },
    async (uri, { address }) => {
      const balanceResponse = await handleGetBalance(address as string);
      return {
        contents: [
          {
            uri: uri.href,
            text: balanceResponse,
          },
        ],
      };
    }
  );

  server.registerResource(
    "eth-get-transaction-by-hash",
    new ResourceTemplate("ethereum://transaction/{txHash}", {
      list: undefined,
    }),
    {
      title: "Ethereum Transaction",
      description: "Get details of an Ethereum transaction by hash",
      mimeType: "text/plain",
    },
    async (uri, { txHash }) => {
      const transactionResponse = await handleGetTransaction(txHash as string);
      return {
        contents: [
          {
            uri: uri.href,
            text: transactionResponse,
          },
        ],
      };
    }
  );

  server.registerResource(
    "eth-get-transaction-receipt",
    new ResourceTemplate("ethereum://transaction-receipt/{txHash}", {
      list: undefined,
    }),
    {
      title: "Ethereum Transaction Receipt",
      description: "Get the receipt of an Ethereum transaction by hash",
      mimeType: "text/plain",
    },
    async (uri, { txHash }) => {
      const receiptResponse = await handleGetTransactionReceipt(
        txHash as string
      );
      return {
        contents: [
          {
            uri: uri.href,
            text: receiptResponse,
          },
        ],
      };
    }
  );

  server.registerResource(
    "eth-get-block-by-number",
    new ResourceTemplate("ethereum://block/number/{blockNumber}", {
      list: undefined,
    }),
    {
      title: "Ethereum Block by Number",
      description:
        "Get an Ethereum block by block number (supports 'latest', 'pending', 'earliest', decimal, or hex)",
      mimeType: "text/plain",
    },
    async (uri, { blockNumber }) => {
      const blockResponse = await handleGetBlockByNumber(blockNumber as string);
      return {
        contents: [
          {
            uri: uri.href,
            text: blockResponse,
          },
        ],
      };
    }
  );

  server.registerResource(
    "eth-get-block-by-hash",
    new ResourceTemplate("ethereum://block/hash/{blockHash}", {
      list: undefined,
    }),
    {
      title: "Ethereum Block by Hash",
      description: "Get an Ethereum block by block hash",
      mimeType: "text/plain",
    },
    async (uri, { blockHash }) => {
      const blockResponse = await handleGetBlockByHash(blockHash as string);
      return {
        contents: [
          {
            uri: uri.href,
            text: blockResponse,
          },
        ],
      };
    }
  );

  server.registerResource(
    "eth-get-gas-price",
    new ResourceTemplate("ethereum://gas-price", { list: undefined }),
    {
      title: "Ethereum Gas Price",
      description: "Get current gas price information",
      mimeType: "text/plain",
    },
    async (uri) => {
      const gasPriceResponse = await handleGasPrice();
      return {
        contents: [
          {
            uri: uri.href,
            text: gasPriceResponse,
          },
        ],
      };
    }
  );

  server.registerResource(
    "eth-get-account",
    new ResourceTemplate("ethereum://account/{address}", { list: undefined }),
    {
      title: "Ethereum Account",
      description:
        "Get account information including balance, nonce, and contract status",
      mimeType: "text/plain",
    },
    async (uri, { address }) => {
      const accountResponse = await handleGetAccount(address as string);
      return {
        contents: [
          {
            uri: uri.href,
            text: accountResponse,
          },
        ],
      };
    }
  );

  server.registerResource(
    "eth-get-code",
    new ResourceTemplate("ethereum://code/{address}", { list: undefined }),
    {
      title: "Ethereum Contract Code",
      description: "Get the contract code at an address",
      mimeType: "text/plain",
    },
    async (uri, { address }) => {
      const codeResponse = await handleGetCode(address as string);
      return {
        contents: [
          {
            uri: uri.href,
            text: codeResponse,
          },
        ],
      };
    }
  );

  server.registerResource(
    "eth-get-logs",
    new ResourceTemplate("ethereum://logs{?fromBlock,toBlock,address,topics}", {
      list: undefined,
    }),
    {
      title: "Ethereum Logs",
      description:
        "Get logs based on filter criteria (fromBlock, toBlock, address, topics)",
      mimeType: "text/plain",
    },
    async (uri, params) => {
      const queryParams: any = {};
      if (params.fromBlock) queryParams.fromBlock = params.fromBlock as string;
      if (params.toBlock) queryParams.toBlock = params.toBlock as string;
      if (params.address) queryParams.address = params.address as string;
      if (params.topics) {
        queryParams.topics = Array.isArray(params.topics)
          ? (params.topics as string[])
          : [params.topics as string];
      }
      const logsResponse = await handleGetLogs(queryParams);
      return {
        contents: [
          {
            uri: uri.href,
            text: logsResponse,
          },
        ],
      };
    }
  );
  // another resource can be registered here
}
