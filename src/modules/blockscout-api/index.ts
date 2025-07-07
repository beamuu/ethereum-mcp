import { getBlockscoutApiUrl } from "../../config";

export async function callBlockscoutApi(endpoint: string): Promise<any> {
    const baseUrl = getBlockscoutApiUrl();
    const url = new URL("/api/v2" + endpoint, baseUrl);
    console.log(`Calling Blockscout API: ${url.toString()}`);
    const response = await fetch(url.toString());
    if (!response.ok) {
        throw new Error(`Blockscout API error: ${response.statusText}`);
    }

    return response.json();
}
