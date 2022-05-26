import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Prescription from '../models/prescriptionModel.js';
import cloudinary from 'cloudinary';
import User from '../models/userModel.js';
const presRouter = express.Router();

presRouter.get(
  '/all',
  expressAsyncHandler(async (req, res) => {
    const pres = await Prescription.find({});
    res.json(pres);
  })
);

presRouter.post(
  '/add',
  expressAsyncHandler(async (req, res) => {
    const { file, fileName, userId } = req.body;

    const result = await cloudinary.v2.uploader.upload(file, {
      folder: 'prescription',
      width: 500,
      crop: 'limit',
    });

    const user = await User.findById(userId);

    

    user.prescription = result.url;

    await user.save();

    const pres = new Prescription({
      userId,
      public_id: result.public_id,
      url: result.url,
    });

    await pres.save();

    res.status(200).json({
      message: 'Prescription added successfully',
      pres,
    });
  })
);

export default presRouter;
