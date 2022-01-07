const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

//
module.exports.upload = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.image, {
      public_id: `${Date.now()}`,
      resource_type: 'auto', // image format may be png or jpeg or any format
    });
    console.log(result);
    res.json({
      public_id: result.public_id,
      url: result.secure_url,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.remove = (req, res) => {
  const imageId = req.body.public_id;
  cloudinary.uploader.destroy(imageId, (err, result) => {
    if (err) res.json({ success: false, err });
    res.send('Ok');
  });
};
