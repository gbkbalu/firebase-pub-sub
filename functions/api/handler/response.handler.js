'use strict';
const logger = require('../config/logger')

// Returning response object by document count and result data
function getResponseObject(filterObject, dataCount, resultList) {
  var pageCount = 0;
  if (dataCount > 0) {
    pageCount = Math.floor(dataCount / filterObject.pageLimit);
    if ((dataCount % filterObject.pageLimit) !== 0) {
      pageCount = pageCount + 1;
    }
  }
  return { totalCount: dataCount, resultList: resultList, pageCount: pageCount, currentPage: filterObject.curPage };
}

// Returning when validation fails
function validationHandler(res, error) {
  var errorMsg = error;
  var errDetails = [];
  if (error.details && error.details.length > 0) {
    errorMsg = error.details[0].message;
    errDetails = error.details;
  }
  return res.status(400).json({ statusCode: "NS111", status: false, success: false, validation: "Failed", message: errorMsg, isValid: false , details: errDetails});
}

// Returning when error occurs
function errorHandler(res, error, message, statusCode) {
  return res.status(400).json(errorResponseObj(error, message, statusCode));
}

// Creating response json object based on error or custom message
function errorResponseObj(error, message, statusCode) {
  if(error){
    var errorMsg = error;
    if (error.errmsg !== null && error.errmsg !== undefined) {
      errorMsg = error.errmsg;
    }

    return { statusCode:statusCode,message:message,success: false, error: {}};
  }
  return { statusCode:statusCode,message:message,success: false};
}

// Returning success message, when record creation was successfull
function createdSuccessHandler(res, respObj) {
  return res.status(201).send(respObj);
}

// Returning when data was not found
function dataNotFoundHandler(jsonData) {
  return {statusCode:400, jsonObj: jsonData};
}

// Returning with success message and 200 status
function successHandler(res, respObj) {
  return res.status(200).send(respObj);
}

// Returning when delete the record with return object
function onDeletionHandler(res, delObject) {
  return res.status(200).json(delObject)
}

// Returns the filtered data based on user input
function filterHandler(res, filtReqObj, filterCount, filterDataList) {
  return res.status(200).send(getResponseObject(filtReqObj, filterCount, filterDataList))
}

function filterEventObjectHandler(res, filtReqObj, filterCount, filterDataList, eventObjList, objectDetailObj) {
  var respObj = getResponseObject(filtReqObj, filterCount, filterDataList);
  if(objectDetailObj && objectDetailObj.imageUrls && objectDetailObj.imageUrls.length>0){
    if(filtReqObj.filterObject.objectId !== null && filtReqObj.filterObject.objectId !==undefined && objectDetailObj !== null && objectDetailObj !== undefined && objectDetailObj._id !== null && objectDetailObj._id !== undefined){
      objectDetailObj = objectDetailObj.toObject();
    }
  
    objectDetailObj.thumbnail_url = objectDetailObj.imageUrls[0]
  }
  respObj.eventChunkData = eventObjList;
  respObj.objectDetails= objectDetailObj;
  respObj.objectDetails= objectDetailObj;
  respObj.isSingleObj = true;
  respObj.detectedType = "FACIAL" ;
  if(filtReqObj.filterObject.chunkId !== null && filtReqObj.filterObject.chunkId !==undefined && (filtReqObj.filterObject.objectId === null || filtReqObj.filterObject.objectId === undefined)){
    respObj.detectedType = "TRACKING" ;
  }

  if(objectDetailObj && objectDetailObj.imageUrls && objectDetailObj.imageUrls !== null && objectDetailObj.imageUrls !== undefined && objectDetailObj.imageUrls.length>0){
    objectDetailObj.thumbnail_url = objectDetailObj.imageUrls[0];
  }

  try{
    if(objectDetailObj.imageUrls[0].imageUrl === null || objectDetailObj.imageUrls[0].imageUrl === undefined){
      objectDetailObj.thumbnail_url = objectDetailObj.imageUrls[0];
    }else{
      objectDetailObj.thumbnail_url = objectDetailObj.imageUrls[0].imageUrl;
      objectDetailObj.imageUrls = [objectDetailObj.imageUrls[0].imageUrl]
    }
  }catch(error){
    logger.error(error)
  }
  
  return res.status(200).send(respObj)
}

exports.getResponseObject = getResponseObject;
exports.validationHandler = validationHandler;
exports.createdSuccessHandler = createdSuccessHandler;
exports.dataNotFoundHandler = dataNotFoundHandler;
exports.successHandler = successHandler;
exports.errorHandler = errorHandler;
exports.errorResponseObj = errorResponseObj;
exports.onDeletionHandler = onDeletionHandler;
exports.filterHandler = filterHandler;
exports.filterEventObjectHandler = filterEventObjectHandler;
