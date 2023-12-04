const config = require("./utils/config.js")
const logger = require("./utils/logger.js")
const app = require("./app.js")

const PORT = config.PORT || 3000

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})

