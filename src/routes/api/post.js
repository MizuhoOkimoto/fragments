const { Fragment } = require('../../model/fragment');

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
    //const data = await frag.getData(req.user, frag.id);
    return res.status(200).json({ message: 'ok', fragment: savedFragment });
    //return res.send(data);
  } catch (error) {
    console.log('Unable to save fragment');
  }
};
