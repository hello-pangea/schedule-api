import { FastifyInstance } from "fastify";
import eventsRoute from "./routes/events.js";

export default async function routes(fastify: FastifyInstance) {
  fastify.register(eventsRoute, { prefix: "/events" });
}
