import { JsonRpcProvider } from "ethers";
import { getRpcUrl } from "../../config";

export const client = new JsonRpcProvider(getRpcUrl());