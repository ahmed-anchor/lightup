import { Schema, model, models } from "mongoose";


const jobSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  phone: { type: String, required: true },
});

const JobModel = models.Job || model('Job', jobSchema);

export default JobModel;