import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SurveySchema = new Schema({
    createdBy: String,
    template: String, 
    title: String,
    createdOn: Date,
    active: String,
    expiry: String,
    questions: [String],
    options: []
}, {
    timestamps: true,
    collection: 'survey'
});

export default mongoose.model('Surveys', SurveySchema);