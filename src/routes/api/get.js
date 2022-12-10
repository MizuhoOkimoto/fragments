// src/routes/api/get.js
const { Fragment } = require('../../model/fragment');
const { createSuccessResponse, createErrorResponse } = require('../../response');
const logger = require('../../logger');

var path = require('path');

/**
 * Get a list of fragments for the current user
 */
async function getFragments(req, res) {
  try {
    let fragments;
    fragments = await Fragment.byUser(req.user, req.query.expand === '1');
    res.status(200).json(createSuccessResponse({ fragments: fragments }));
  } catch (err) {
    res.status(401).json(createErrorResponse(401, 'unauthenticated'));
  }
}

// TODO: application/octet-stream? Check it again!
async function getFragmentById(req, res) {
  try {
    //id 657557646474hfh
    //id 64r675467476.md
    const URL = req.originalUrl;
    logger.info({ URL }, 'URL');
    // Getting parameter after the "fragment/""
    const baseName = path.basename(URL);
    // Get the extension after the parameter
    const ext = path.extname(URL);
    // Get only id from parameter
    const id = path.basename(baseName, ext);
    logger.info({ id }, 'ID');
    logger.info({ ext }, 'PATH');

    const fragment = await Fragment.byId(req.user, id);
    logger.info({ fragment }, 'fragment');

    const data = await fragment.getData(); //not metadata
    logger.info({ data }, 'AFTER GETDATA');

    // FB: You need to set the content-type header before you send the Buffer, so it matches the fragment's type
    res.header('Content-Type', fragment.type);
    //res.setHeader('Location', 'http://' + apiURL + '/v1/fragments/' + fragment.id);
    // console.log(fragment.type);
    //res.status(200).json(createSuccessResponse({ fragment }));

    if (ext === '.html') {
      // call convert Function
      // Buffer -> STRING -> Convert -> Buffer
      let convert = Fragment.convertFragment(data);
      res.header('Content-Type', 'text/html');
      return res.status(200).send(convert);
    }
    res.status(200).send(data);
  } catch (error) {
    logger.error({ error }, 'Fragment is not found by id ');
    return res.status(404).json(createErrorResponse('Fragment is not found by id'));
  }
}

// This is A2
// I will need to change inside the function
async function getFragmentsInfo(req, res) {
  try {
    const id = req.params.id;
    console.log(id, 'THIS IS ID IN THE GET INFO');
    const fragment = await Fragment.byId(req.user, id);

    res.status(200).json(createSuccessResponse({ fragment }));
    // FB: You need to set the content-type header before you send the Buffer, so it matches the fragment's type
    //res.status(200).send({ status: 'ok', fragment });
  } catch (error) {
    logger.error('Fragment info is not found by id');
    return res.status(400).json(createErrorResponse('Fragment info is not found by id'));
  }
}

module.exports.getFragments = getFragments;
module.exports.getFragmentById = getFragmentById;
module.exports.getFragmentsInfo = getFragmentsInfo;
