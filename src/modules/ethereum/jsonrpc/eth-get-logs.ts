import { client } from "..";

export const handleGetLogs = async (params: {
  fromBlock?: string;
  toBlock?: string;
  address?: string;
  topics?: string[];
}): Promise<string> => {
  const filter: any = {};

  // Handle block range
  if (params.fromBlock) {
    filter.fromBlock =
      params.fromBlock === "latest" ||
      params.fromBlock === "pending" ||
      params.fromBlock === "earliest"
        ? params.fromBlock
        : params.fromBlock.startsWith("0x")
        ? parseInt(params.fromBlock, 16)
        : parseInt(params.fromBlock, 10);
  }

  if (params.toBlock) {
    filter.toBlock =
      params.toBlock === "latest" ||
      params.toBlock === "pending" ||
      params.toBlock === "earliest"
        ? params.toBlock
        : params.toBlock.startsWith("0x")
        ? parseInt(params.toBlock, 16)
        : parseInt(params.toBlock, 10);
  }

  // Handle address filter
  if (params.address) {
    filter.address = params.address;
  }

  // Handle topics filter
  if (params.topics && params.topics.length > 0) {
    filter.topics = params.topics;
  }

  const logs = await client.getLogs(filter);

  return JSON.stringify(
    {
      logsCount: logs.length,
      logs: logs.map((log) => ({
        address: log.address,
        topics: log.topics,
        data: log.data,
        blockNumber: log.blockNumber,
        transactionHash: log.transactionHash,
        transactionIndex: log.transactionIndex,
        blockHash: log.blockHash,
        logIndex: log.index,
        removed: log.removed,
      })),
    },
    null,
    2
  );
};
