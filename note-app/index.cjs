const config = require("./utils/config.cjs")
const logger = require("./utils/logger.cjs")
const app = require("./app.cjs")

const PORT = config.PORT || 3000

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})

