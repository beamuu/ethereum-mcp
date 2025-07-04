import { formatUnits } from "ethers";
import { client } from "../../modules/ethereum";
import { getSymbol } from "../../config";

export const handleGetBalance = async (address: string): Promise<string> => {
  const bal = await client.getBalance(address);
  return `${formatUnits(bal, 18)} ${getSymbol()}`;
};
