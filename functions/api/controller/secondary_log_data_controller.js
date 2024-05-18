const secondaryLogDataModel = require('../model/secondary_log_data_model')
const express = require('express')
const router = express.Router()
const respHandler = require('../handler/response.handler')

router.gettotalrecordscount = async (req, res, next) => {
    const startTime = Date.now();
    let start_time = new Date();
    console.log("api call received to get total records count:", new Date())
    let records_count = await secondaryLogDataModel.gettotalrecordscount();
    return respHandler.successHandler(res, { count: records_count, start_time: start_time, end_time: new Date(), time_taken: Date.now() - startTime })
}

module.exports = router