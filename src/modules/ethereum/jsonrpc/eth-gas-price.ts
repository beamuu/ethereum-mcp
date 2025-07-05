import { client } from "..";

export const handleGasPrice = async (): Promise<string> => {
  const gasPrice = await client.getFeeData();

  return JSON.stringify(
    {
      gasPrice: gasPrice.gasPrice?.toString(),
      maxFeePerGas: gasPrice.maxFeePerGas?.toString(),
      maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas?.toString(),
    },
    null,
    2
  );
};
