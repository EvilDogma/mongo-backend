const { model, Schema } = require('mongoose')

const reactionSchema = new Schema({
    reactionId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        auto: true 
    },
    reactionBody: {
        type: String,
        required: [true, 'Thought must have text'],
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
  })

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: [true, 'Thought must have text'],
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reactions: [reactionSchema] 


})



thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
})

thoughtSchema.set('toJSON', { virtuals: true });

const Thought = model('Thought', thoughtsSchema)


module.exports = Thought