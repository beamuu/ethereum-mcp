import { client } from "..";


export const handleGetAccount = async (address: string): Promise<string> => {
  const [balance, nonce, code] = await Promise.all([
    client.getBalance(address),
    client.getTransactionCount(address),
    client.getCode(address),
  ]);

  const isContract = code !== "0x";

  return JSON.stringify(
    {
      address: address,
      balance: balance.toString(),
      nonce: nonce,
      isContract: isContract,
      codeHash: isContract ? code : null,
    },
    null,
    2
  );
};
