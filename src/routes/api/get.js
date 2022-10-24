// src/routes/api/get.js
const { Fragment } = require('../../model/fragment');
const { createSuccessResponse, createErrorResponse } = require('../../response');
const logger = require('../../logger');
/**
 * Get a list of fragments for the current user
 */
async function getFragments(req, res) {
  try {
    let fragments;
    fragments = await Fragment.byUser(req.user, req.query.expand);
    res.status(200).json(createSuccessResponse({ fragments: fragments }));
  } catch (err) {
    res.status(404).json(createErrorResponse(404, 'Not able to get fragments'));
  }
}

// TODO: I will need to change the function name!!! GetFragmentId?
async function getFragmentsById(req, res) {
  try {
    const id = req.params.id;
    const fragment = await Fragment.byId(req.user, id);
    const data = await fragment.getData();
    //res.status(200).json(createSuccessResponse({ fragment }));
    // You need to set the content-type header before you send the Buffer, so it matches the fragment's type
    res.status(200).send(data);
  } catch (error) {
    logger.error('Fragment is not found by id');
    return res.status(400).json(createErrorResponse('Fragment is not found by id'));
  }
}

// This is A2
// I will need to change inside the function
async function getFragmentsInfo(req, res) {
  try {
    const id = req.params.id;
    const fragment = await Fragment.byId(req.user, id);
    const data = await fragment.getData();
    //res.status(200).json(createSuccessResponse({ fragment }));
    // FB: You need to set the content-type header before you send the Buffer, so it matches the fragment's type
    res.status(200).send(data);
  } catch (error) {
    logger.error('Fragment is not found by id');
    return res.status(400).json(createErrorResponse('Fragment is not found by id'));
  }
}

module.exports.getFragments = getFragments;
module.exports.getFragmentsById = getFragmentsById;
module.exports.getFragmentsInfo = getFragmentsInfo;
