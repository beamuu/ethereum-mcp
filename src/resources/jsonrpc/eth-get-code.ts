import { client } from "../../modules/ethereum";

export const handleGetCode = async (address: string): Promise<string> => {
  const code = await client.getCode(address);

  if (code === "0x") {
    return `No contract code found at address ${address} (externally owned account)`;
  }

  return JSON.stringify(
    {
      address: address,
      code: code,
      codeLength: (code.length - 2) / 2, // Remove 0x prefix and divide by 2 for byte length
    },
    null,
    2
  );
};
