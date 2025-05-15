import { Schema, model, models } from "mongoose";

const projectSchema = new Schema({
  projectName: { type: String, required: true },
  price: { type: Number, required: true }
});

const profileSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  imagePath: { type: String, required: true },
  token: { type: String, required: true },
  netWorth: { type: Number, default: 0 },
  projects: { 
    type: [projectSchema], 
    default: []
  }
});

const ProfileModel = models.Profile || model('Profile', profileSchema);

export default ProfileModel;