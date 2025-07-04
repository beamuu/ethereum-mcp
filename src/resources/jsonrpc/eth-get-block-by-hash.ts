import { client } from "../../modules/ethereum";

export const handleGetBlockByHash = async (
  blockHash: string
): Promise<string> => {
  const block = await client.getBlock(blockHash);

  if (!block) {
    return `Block with hash ${blockHash} not found`;
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
