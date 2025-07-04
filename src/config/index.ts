import { config as loadDotenv } from "dotenv";

// Load environment variables from .env file
loadDotenv();

export interface Config {
  rpcUrl: string;
  symbol: string;
  port: number;
  nodeEnv: string;
}

// Validate and load configuration
const loadConfig = (): Config => {
  const missingVars: string[] = [];
  
  // Check required environment variables
  const rpcUrl = process.env.RPC_URL || process.env.CHAIN_RPC_URL;
  if (!rpcUrl) {
    missingVars.push('RPC_URL or CHAIN_RPC_URL');
  }
  
  const symbol = process.env.SYMBOL || process.env.CHAIN_COIN_SYMBOL;
  if (!symbol) {
    missingVars.push('SYMBOL or CHAIN_COIN_SYMBOL');
  }
  
  // Optional variables with defaults
  const port = parseInt(process.env.PORT || '3000', 10);
  const nodeEnv = process.env.NODE_ENV || 'development';
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
  
  return {
    rpcUrl: rpcUrl!,
    symbol: symbol!,
    port,
    nodeEnv
  };
};

// Load and export configuration
export const appConfig = loadConfig();

// Convenience functions for backward compatibility
export const getRpcUrl = (): string => appConfig.rpcUrl;
export const getSymbol = (): string => appConfig.symbol;
export const getPort = (): number => appConfig.port;
export const getNodeEnv = (): string => appConfig.nodeEnv;