import { client } from "..";

export const handleBlockNumber = async (): Promise<any> => {
    try {
        return (await client.getBlockNumber()).toString();
    } catch (error) {
        return {
            error: `Failed to fetch block number: ${
                error instanceof Error ? error.message : "Unknown error"
            }`,
        };
    }
};
