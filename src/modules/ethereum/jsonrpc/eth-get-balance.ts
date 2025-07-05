import { formatUnits } from "ethers";
import { getSymbol } from "../../../config";
import { client } from "..";

export const handleGetBalance = async (address: string): Promise<string> => {
  const bal = await client.getBalance(address);
  return `${formatUnits(bal, 18)} ${getSymbol()}`;
};
