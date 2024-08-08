import mongoose from 'mongoose';
import User from './user.js';
import Profile from './profile.js';
import Weblink from './weblink.js';

mongoose.Promise = global.Promise;

const db = {
    mongoose,
    user: User,
    profile: Profile,
    weblink: Weblink
};

export default db;
