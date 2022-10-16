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

async function getFragmentsInfo(req, res) {
  try {
    const id = req.params.id;
    const fragment = await Fragment.byId(req.user, id);
    const data = await fragment.getData();
    //res.status(200).json(createSuccessResponse({ fragment }));
    res.status(200).send(data);
  } catch (error) {
    logger.error('Fragment is not found by id');
    return res.status(400).json(createErrorResponse('Fragment is not found by id'));
  }
}

module.exports.getFragments = getFragments;
module.exports.getFragmentsInfo = getFragmentsInfo;
