import { Schema, model, models } from "mongoose";

const profileSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  imagePath: { type: String, required: true }
});

const ProfileModel = models.Profile || model('Profile', profileSchema);

export default ProfileModel;
