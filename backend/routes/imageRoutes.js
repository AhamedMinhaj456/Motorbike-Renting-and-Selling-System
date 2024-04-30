const cloudinary = require('cloudinary');
const router = require('express').Router();
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.ahamedminhaj456,
  api_key: 264471476213338,
  api_secret: process.env.tXdwqsGVekX8uZFnFYEPfmfGLeo
})

router.delete('/:public_id', async(req, res)=> {
  const {public_id} = req.params;
  try {
      await cloudinary.uploader.destroy(public_id);
      res.status(200).send();
  } catch (e) {
      res.status(400).send(e.message)
  }
})


module.exports = router;
