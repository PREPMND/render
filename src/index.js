import dotenv from "dotenv";
import { connectRedis } from "./redis/redis.js";

dotenv.config({
    path:'./.env'
})
import elastic from "./utils/elasticsearch.js";
import { MongoConnection } from "./db/index.js";
import { application } from "./app.js";
    

  throw new Error("Elasticsearch did not start in time");

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
