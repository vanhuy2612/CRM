const { REDIS_HOST, REDIS_PORT, REDIS_PASS, REDIS_QUEUE_DB, REDIS_QUEUE_PREFIX} = process.env
const Bull = require('bull');

class BullService{
    static getRandom(length) {
        return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
    }
    static getAllQueuename() {
        return Object.keys(this._queues);
    }
    static queue(name) {
        return this._queues[name]
    }
    static setQueue(name, queue) {
        this._queues[name] = queue
    }
    static createProcess(name, fn, thread = 4){
        if(!this.queue(name)) {
            this.createQueue(name)
        }
        let queue = this.queue(name);
        queue.process(thread, fn);
    }
    static createJob(queueName, data, {
        delay = 0,
        attempts = 1,
        ttl = 30000, // time to live
        backoff = 0,
        repeat = undefined, // repeat if job fail
        fnCompleted = undefined, // function if complete
        fnFailed = undefined // function if fail
    } = {}){
        let queue = this.queue(queueName)
        // create callbackjob:
        let newJobCallbackId
        do {
            newJobCallbackId = Date.now().toString + this.getRandom(10)
        } while(this._jobCallback[newJobCallbackId])

        let promise = new Promise( (resolve, reject) => {
            this._jobCallback[newJobCallbackId] = {
                resolve: data => {
                    if (typeof fnCompleted == 'function') fnCompleted(data) 
                },
                reject: error => {
                    if (typeof fnFailed == 'function') fnFailed(data)
                    console.log('reject')
                    reject(error)
                }
            }
        })
        data['_callbackId'] = newJobCallbackId;
        if (!name) {
            queue.add(data, {
                delay: delay,
                attempts: attempts,
                timeout: ttl,
                repeat: repeat,
                backoff: {
                    type: 'fixed',
                    delay: backoff
                }
            })
        } else {
            queue.add(name, data, {
                delay: delay,
                attempts: attempts,
                timeout: ttl,
                repeat: repeat,
                backoff: {
                    type: 'fixed',
                    delay: backoff
                }
            })
        }
        return promise
    }
    static createQueue(name){
        let redisQueueName = `${name}-${REDIS_QUEUE_DB}-`;
        const queue = new Bull(redisQueueName, {
            prefix: REDIS_QUEUE_PREFIX,
            redis: {
                host: REDIS_HOST,
                port: REDIS_PORT,
                password: REDIS_PASS,
                db: REDIS_QUEUE_DB
            }
        })
        // Add listener to events that what happen in the queue
        queue.on("global:completed", async (jobId, result) => {
            let job = await queue.getJob(jobId)
            if (!job) return //not found job
            console.log("completed job: #", job.id)
            if (job.data['_callbackId'] && this._jobCallback[job.data['_callbackId']]) {
                try {
                    result = JSON.parse(result)
                }
                catch (e) {
                    //skip
                }
                this._jobCallback[job.data['_callbackId']].resolve(result)
                delete this._jobCallback[job.data['_callbackId']]
                //job.remove();
            }
        })
        queue.on("global:failed", async (jobId, result) => {
            let job = await queue.getJob(jobId)
            if (!job) return //not found job
            if (job.opts.attempts !== job.attemptsMade) {
                console.log(`failed attempts(${job.attemptsMade}/${job.opts.attempts}) job: #`, job.id)
                return
            }
            console.log("failed job: #", job.id)
            if (job.data['_callbackId'] && this._jobCallback[job.data['_callbackId']]) {
                try {
                    result = JSON.parse(result)
                }
                catch (e) {
                    //skip
                }
                this._jobCallback[job.data['_callbackId']].reject(result)
            }
        })
        queue.on("global:active", (jobId, result) => {
            //  console.log("active job: ", jobId)
        })
        queue.on("active", (job, result) => {
            if (!job) return //not found job
            console.log("this server will process job: #", job.id)
        })
        this.setQueue(name, queue)
    }

    static createProcess(name, fn, thread = 4) {
        if (!this.queue(name)) {
            this.createQueue(name)
        }
        let queue = this.queue(name)
        queue.process(thread, fn)
    }
}

BullService._jobCallback = {}
BullService._queues = {}

module.exports = BullService;
