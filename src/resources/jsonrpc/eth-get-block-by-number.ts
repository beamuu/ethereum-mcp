import { client } from "../../modules/ethereum";

export const handleGetBlockByNumber = async (
  blockNumber: string
): Promise<string> => {
  let blockNum: number;

  // Handle special cases like "latest", "pending", "earliest"
  if (
    blockNumber === "latest" ||
    blockNumber === "pending" ||
    blockNumber === "earliest"
  ) {
    blockNum = blockNumber as any;
  } else {
    // Convert string to number, handle both decimal and hex formats
    blockNum = blockNumber.startsWith("0x")
      ? parseInt(blockNumber, 16)
      : parseInt(blockNumber, 10);
  }

  const block = await client.getBlock(blockNum);

  if (!block) {
    return `Block ${blockNumber} not found`;
  }

  return JSON.stringify(
    {
      number: block.number,
      hash: block.hash,
      parentHash: block.parentHash,
      timestamp: block.timestamp,
      difficulty: block.difficulty?.toString(),
      gasLimit: block.gasLimit.toString(),
      gasUsed: block.gasUsed.toString(),
      miner: block.miner,
      extraData: block.extraData,
      baseFeePerGas: block.baseFeePerGas?.toString(),
      transactionCount: block.transactions.length,
      transactions: block.transactions,
    },
    null,
    2
  );
};
