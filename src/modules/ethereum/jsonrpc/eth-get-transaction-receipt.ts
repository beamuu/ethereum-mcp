import { client } from "..";

export const handleGetTransactionReceipt = async (
  txHash: string
): Promise<string> => {
  const receipt = await client.getTransactionReceipt(txHash);

  if (!receipt) {
    return `Transaction receipt for ${txHash} not found`;
  }

  return JSON.stringify(
    {
      transactionHash: receipt.hash,
      transactionIndex: receipt.index,
      blockNumber: receipt.blockNumber,
      blockHash: receipt.blockHash,
      from: receipt.from,
      to: receipt.to,
      cumulativeGasUsed: receipt.cumulativeGasUsed.toString(),
      gasUsed: receipt.gasUsed.toString(),
      effectiveGasPrice: receipt.gasPrice.toString(),
      contractAddress: receipt.contractAddress,
      status: receipt.status,
      type: receipt.type,
      logs: receipt.logs.map((log) => ({
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
