const { ObjectId } = require('bson')
const { model, Schema, Types } = require('mongoose')

const reactionSchema = new Schema({
    reactionId: { 
        type: Schema.Types.ObjectId, 
        default: ()=>new Types.ObjectId()
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
        type: String,
        required: true
    }
  }, { _id: false })

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
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        required: true
      },
    reactions: [reactionSchema] 


})



thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
})

thoughtSchema.set('toJSON', { virtuals: true });

const Thought = model('Thought', thoughtSchema)


module.exports = Thought