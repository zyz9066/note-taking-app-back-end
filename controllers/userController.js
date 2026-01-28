exports.getUsers = async (req, res) => {
  try {
    const userId = req.oidc.user.sub;
    const notes = await Note.find({ user: userId });
    res.render('index', { notes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const userId = req.oidc.user.sub;
    const { title, content } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: 'Title and content are required' });
    }
    await new Note({ user: userId, title, content }).save();
    res.redirect('/');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.oidc.user.sub;
    const note = await Note.findOne({ _id: req.params.id, user: userId });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.render('edit', { note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.oidc.user.sub;
    const { title, content } = req.body;
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      { title, content },
      { new: true, runValidators: true }
    );
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.redirect('/');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.oidc.user.sub;
    await Note.deleteOne({ _id: req.params.id, user: userId });
    res.redirect('/');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
