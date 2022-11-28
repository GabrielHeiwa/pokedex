import { logger } from "./logger";
import { app } from "./server";

const PORT = process.env.PORT || 4444;

function main() {
  app.listen(PORT, () =>
    logger.info("[main]> Server running in http://localhost:" + PORT)
  );
}

main();
