const logDataModel = require('../model/log_data_model')
const config = require('../config')
const express = require('express')
const router = express.Router()
const respHandler = require('../handler/response.handler')

// Batch insert data
router.batchinsertdata = async (req, res, next) => {
    try {
        const startTime = Date.now();
        let start_time = new Date();
        let start_count = req.query.start;
        let end_count = req.query.end;
        let batch_count = 0;
        let documents = [];
        let insertion_count = 0;
        const promises = [];  
        for (let insert_len = start_count; insert_len <= end_count; insert_len++) {
            batch_count++;
            insertion_count++;
            documents.push({ series: insert_len, create_at: new Date() });
        
            if (config.BATCH_SIZE === batch_count) {
                // Collect the promise instead of awaiting it
                promises.push(logDataModel.batchinsertdata(documents));
        
                // Reset batch count and documents array for the next batch
                batch_count = 0;
                documents = [];
            }
        }
    
        // Handle any remaining documents not inserted due to the final batch being smaller than batchSize
        if (documents.length > 0) {
            promises.push(logDataModel.batchinsertdata(documents));
        }
    
        // Wait for all batch insertions to complete
        await Promise.all(promises);
        console.log('All data has been inserted successfully.');
        return respHandler.successHandler(res, { start: start_count, end: end_count, insertion_count: insertion_count, start_time: start_time, end_time: new Date(), time_taken: Date.now() - startTime })
    } catch (e) {
        console.log("error getting all function records", e)
        return next(e)
    }
}

router.gettotalrecordscount = async (req, res, next) => {
    const startTime = Date.now();
    let start_time = new Date();
    console.log("api call received to get total records count:", new Date())
    let records_count = await logDataModel.gettotalrecordscount();
    return respHandler.successHandler(res, { count: records_count, start_time: start_time, end_time: new Date(), time_taken: Date.now() - startTime })
}

router.helloworld = async (req, res, next) => {
    const startTime = Date.now();
    console.log("api call received:", new Date())
    let mailData = { name: "shris", otp: 1234 };
    // this.publishMessageToTopic("email-event", "testing", mailData)
    console.log("api call ended:", new Date())
    return respHandler.successHandler(res, { message:"Hello world!", time_taken: Date.now() - startTime })
}

module.exports = router