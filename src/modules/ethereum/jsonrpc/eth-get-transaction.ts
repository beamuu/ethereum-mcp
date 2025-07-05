import { client } from "..";

export const handleGetTransaction = async (txHash: string): Promise<string> => {
  const tx = await client.getTransaction(txHash);

  if (!tx) {
    return `Transaction ${txHash} not found`;
  }

  return JSON.stringify(
    {
      hash: tx.hash,
      blockNumber: tx.blockNumber,
      blockHash: tx.blockHash,
      from: tx.from,
      to: tx.to,
      value: tx.value.toString(),
      gasLimit: tx.gasLimit.toString(),
      gasPrice: tx.gasPrice?.toString(),
      maxFeePerGas: tx.maxFeePerGas?.toString(),
      maxPriorityFeePerGas: tx.maxPriorityFeePerGas?.toString(),
      nonce: tx.nonce,
      type: tx.type,
      chainId: tx.chainId?.toString(),
      data: tx.data,
      accessList: tx.accessList,
    },
    null,
    2
  );
};
