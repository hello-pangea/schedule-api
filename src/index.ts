import Fastify from "fastify";
import cors from "fastify-cors";
import fastifySensible from "fastify-sensible";
import { connectToServer } from "./lib/mongo/index.js";
import routes from "./routes.js";

const fastify = Fastify({
  logger: process.env.NODE_ENV !== "production",
});

fastify.register(cors, {
  origin: "*",
});

fastify.register(fastifySensible);

// Register Routes
fastify.register(routes);

console.log(
  "ℹ️  Node.js " + process.version + " running on " + process.platform
);
console.log("😎 The vibe is checked");
console.log("🔥 Let the games begin\n");

// Connect to the database before starting the application server.
connectToServer()
  .then(() => {
    console.log("✅ We're connected to mongoDB");

    // Run the server!
    fastify.listen(
      process.env.PORT || 5001,
      "0.0.0.0",
      function (err, address) {
        if (err) {
          fastify.log.error(err);
          process.exit(1);
        }

        console.log("👂 Listening on address: " + address + "\n");
      }
    );
  })
  .catch(() => {
    console.error("Critical: Failed to connect to MongoDB");
    process.exit(1);
  });
