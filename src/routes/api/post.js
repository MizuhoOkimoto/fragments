const { Fragment } = require('../../model/fragment');
const logger = require('../../logger');
const { createSuccessResponse, createErrorResponse } = require('../../response');
const apiURL = process.env.API_URL;

module.exports = async (req, res) => {
  if (!Buffer.isBuffer(req.body)) {
    return res.status(415).json(createErrorResponse(415, 'Unsupported Content Type'));
  }
  try {
    logger.info('POST fragment');
    console.log(req.user, req.get('Content-type'));
    const frag = new Fragment({
      ownerId: req.user,
      type: req.get('Content-type'),
      size: req.body.byteLength,
    });
    await frag.save();
    await frag.setData(req.body);

    // FB: This is not necessary, since you already have `frag` from creating it a few lines above
    //const savedFragment = await Fragment.byId(req.user, frag.id);

    logger.debug({ frag }, 'Fragment is created');
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Location
    // https://www.itra.co.jp/webmedia/http-header.html

    res.setHeader('Content-Type', frag.type);
    res.setHeader('Location', apiURL + `/v1/fragments/` + frag.id);

    return res
      .status(201)
      .json(
        createSuccessResponse({
          fragment: frag,
          Location: apiURL + `/v1/fragments/` + frag.id,
          'Content-Length': frag.size,
        })
      );
    //return res.send(data);
  } catch (error) {
    logger.error({ error }, `Unable to save fragment`);
    //console.log('Unable to save fragment');
    res.status(400).json(createErrorResponse(400, 'Unable to save fragment'));
  }
};
