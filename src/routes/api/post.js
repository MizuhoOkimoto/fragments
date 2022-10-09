const { Fragment } = require('../../model/fragment');
const apiURL = process.env.API_URL;

module.exports = async (req, res) => {
  try {
    console.log(req.user, req.get('Content-type'));
    const frag = new Fragment({
      ownerId: req.user,
      type: req.get('Content-type'),
      size: req.body.byteLength,
    });
    await frag.save();
    await frag.setData(req.body);
    const savedFragment = await Fragment.byId(req.user, frag.id);

    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Location
    // https://www.itra.co.jp/webmedia/http-header.html
    res.setHeader('Content-Type', frag.type);
    res.setHeader('Location', apiURL + `/v1/fragments/` + frag.id);

    return res.status(201).json({ message: 'ok', fragment: savedFragment });
    //return res.send(data);
  } catch (error) {
    console.log('Unable to save fragment');
  }
};
