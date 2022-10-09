const { Fragment } = require('../../model/fragment');

module.exports = async (req, res) => {
  try {
    const id = req.params.id;
    const fragment = await Fragment.byId(req.user, id);
    const data = await fragment.getData();
    res.status(200).send(data);
  } catch (error) {
    console.log('id is not found');
  }
};
