const mongoose = require('mongoose');
var encrypt = require('mongoose-encryption');

const Schema = mongoose.Schema;
let UserSchema = new Schema({
  email: { type: String, required: true, unique: true, max: 100 },
  name: { type: String, required: true, max: 100 },
  pwd: { type: String, required: true },
  favorites: {type: Array, required:true, default:[]}
}, {timestamps: true});

//obtaining encryption keys
var encKey = process.env.ENCKEY;
var sigKey = process.env.SIGKEY;
//encrypting schema
UserSchema.plugin(encrypt, { encryptionKey: encKey, signingKey: sigKey, encryptedFields: ['pwd'] });

module.exports = mongoose.model('User', UserSchema);
