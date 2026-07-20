import { Client } from "@elastic/elasticsearch";

const elastic = new Client({
    node: process.env.ELASTIC_URL
});

export default elastic;