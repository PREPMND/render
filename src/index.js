import dotenv from "dotenv";
import { connectRedis } from "./redis/redis.js";
import { createIndex } from "./utils/elasticsearch.js";
dotenv.config({
    path:'./.env'
})
import { MongoConnection } from "./db/index.js";
import { application } from "./app.js";
async function waitForElastic(retries = 30) {
  while (retries--) {
    try {
      await elastic.info();
      console.log("Elasticsearch is ready");
      return;
    } catch {
      console.log("Waiting for Elasticsearch...");
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  throw new Error("Elasticsearch did not start in time");
}

MongoConnection();
await connectRedis();
await waitForElastic();
try {
    await createIndex();
} catch (err) {
    console.error("Elasticsearch not ready:", err.message);
}
application.use((req, res, next) => {
    next();
});
const PORT= process.env.PORT || 3000;
application.listen(PORT,()=>{
    console.log("Server is running on ", PORT)
})
application.get("/hello", (req, res) => res.send("hello from index"));
process.on("SIGINT", () => {
  console.log("Shutting down...");
  process.exit();
});
