import mongoose from 'mongoose';
import Weblink from '../models/weblink.js';
import User from '../models/user.js';

export const create = async (req, res) => {
  const { title, link } = req.body;

  try {
    if (!title || !link) {
      return res.status(400).json({ error: 'Title and link are required.' });
    }

    const weblink = await Weblink.create({ title, link, user: req.user._id });
    res.status(200).json({ message: 'Weblink created successfully', weblink });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const read = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).lean();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const weblinks = await Weblink.find({ user: user._id }).sort({ createdAt: -1 });
    res.status(200).json({ weblinks });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getWeblink = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Weblink not found' });
  }

  try {
    const weblink = await Weblink.findById(id);

    if (!weblink) {
      return res.status(404).json({ error: 'Weblink not found' });
    }

    res.status(200).json({ weblink });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteWeblink = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Weblink not found' });
  }

  try {
    const weblink = await Weblink.findByIdAndDelete(id);

    if (!weblink) {
      return res.status(404).json({ error: 'Weblink not found' });
    }

    res.status(200).json({ message: 'Weblink deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Weblink not found' });
  }

  try {
    const weblink = await Weblink.findByIdAndUpdate(
      id,
      { title: req.body.title, link: req.body.link },
      { new: true, runValidators: true }
    );

    if (!weblink) {
      return res.status(404).json({ error: 'Weblink not found' });
    }

    res.status(200).json({ message: 'Weblink updated successfully', weblink });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
