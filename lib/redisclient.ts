import { createClient } from 'redis';

let redisClient: ReturnType<typeof createClient> | null = null;

export const getRedisClient = async () => {
    if (!redisClient) {
        redisClient = createClient({
            url: "redis://localhost:6379"
        })

        redisClient.on("error", (err) => {
            console.log("Redis Client Error: " + err);
        })

        await redisClient.connect();
        console.log("Redis Client connected successfully");
    }

    return redisClient;
}