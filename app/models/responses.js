import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ResponseSchema = new Schema({
    surveyID: String,
    surveyor: String,
    surveyorEmail: String,
    template: String, 
    title: String,
    createdOn: Date,
    expiry: Date,
    surveyAuthor: String,
    questions: [String],
    responses: [String]
}, {
    timestamps: true,
    collection: 'responses'
});

export default mongoose.model('Responses', ResponseSchema);