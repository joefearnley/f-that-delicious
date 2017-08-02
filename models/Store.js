const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a store name!'
  },
  slug: String,
  description: {
    type: String,
    trim: true
  },
  tags: [String],
  created: {
    type: Date,
    default: Date.now
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [{
      type: Number,
      required: 'You must supply coordinates!'
    }],
    address: {
      type: String,
      required: 'You must supply an address!'
    }
  }
});

storeSchema.pre('save', function(next) {
  if (!this.isModified('name')) {
    next();
    return;
  }
  this.slug = slug(this.name);
  next();
});

// storeSchema.pre('findOneAndUpdate', async function(next) {
//   const store = await this.findOne({})
//   if(!this._update.name || store.name === this._update.name) {
//     return next()
//   }

//   let   storeSlug = slug(this._update.name)
//   const slugRegEx = new RegExp(`^(${storeSlug})((-[0-9]*$)?)$`, 'i')
//   const storesWithSlug = await Store.find({slug: slugRegEx})

//   if(storesWithSlug.length) storeSlug = `${storeSlug}-${storesWithSlug.length + 1}`

//   const newSlug = promisify(this.update({}, { slug: storeSlug }), this)
//   await newSlug
//   next()
// });

module.exports = mongoose.model('Store', storeSchema);