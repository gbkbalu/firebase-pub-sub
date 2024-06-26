const apiTestDataModel = require('../model/api_test_model')
const express = require('express')
const router = express.Router()
const respHandler = require('../handler/response.handler')
const wealth_util = require('../util/wealth_util')

router.gettotalrecordscount = async (req, res, next) => {
    const startTime = Date.now();
    let start_time = new Date();
    console.log("api call received to get total records count:", new Date())
    let records_count = await apiTestDataModel.gettotalrecordscount();
    return respHandler.successHandler(res, { call_name: "gettotalrecordscount", count: records_count, start_time: start_time, end_time: new Date(), time_taken: Date.now() - startTime })
}

router.getById = async (req, res, next) => {
    const startTime = Date.now();
    let start_time = new Date();
    console.log("api call received to getById:", new Date())
    let record = await apiTestDataModel.getById(req.query.id);
    return respHandler.successHandler(res, { call_name: "getById", record: record, start_time: start_time, end_time: new Date(), time_taken: Date.now() - startTime })
}

router.emptyapicall = async (req, res, next) => {
    const startTime = Date.now();
    let start_time = new Date();
    console.log("api call received for emptyapicall:", new Date())
    return respHandler.successHandler(res, { call_name: "emptyapicall", start_time: start_time, end_time: new Date(), time_taken: Date.now() - startTime })
}

router.create = async (req, res, next) => {
    const startTime = Date.now();
    let start_time = new Date();
    try {
        const result = await apiTestDataModel.create(req.body)
        if (!result) return respHandler.errorHandler(res, result, "System encountered an error while creating crp question. Please try again later.", errorCodes.ERROR_CREATING_ROLE)
        return respHandler.successHandler(res, { success: true, message: "Role created successfully", call_name: "apittestcreate", start_time: start_time, end_time: new Date(), time_taken: Date.now() - startTime })
    } catch (e) {
        console.error("error in creationg of role", e)
        return next(e)
    }
}

router.publishmessage = async (req, res, next) => {
    let start_time = new Date();
    console.log("api call received to publish message:", new Date())
    let mailData = { name: "wealthupp", team: "shris", data: req.body };
    wealth_util.publishMessageToTopic(config.TOPIC_NAME, mailData)
    console.log("api call ended:", new Date())
    return respHandler.successHandler(res, { message: "message published to topic", start_time: start_time, end_time: new Date() })
}

module.exports = router