const { REDIS_HOST, REDIS_PORT, REDIS_PASS, REDIS_QUEUE_DB, REDIS_QUEUE_PREFIX} = process.env

module.exports = {
    redis: {
        host: REDIS_HOST,
        port: REDIS_PORT,
        password: REDIS_PASS,
        db: REDIS_QUEUE_DB
    }
}