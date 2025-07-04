import { appConfig, getRpcUrl, getSymbol, getPort, getNodeEnv } from "./config";

console.log("🧪 Testing configuration loader...");

try {
  console.log("✅ Configuration loaded successfully:");
  console.log(`  - RPC URL: ${getRpcUrl()}`);
  console.log(`  - Symbol: ${getSymbol()}`);
  console.log(`  - Port: ${getPort()}`);
  console.log(`  - Node Environment: ${getNodeEnv()}`);
  console.log("\n📋 Full config object:");
  console.log(JSON.stringify(appConfig, null, 2));
} catch (error) {
  console.error("❌ Configuration loading failed:");
  console.error(error);
  process.exit(1);
}
