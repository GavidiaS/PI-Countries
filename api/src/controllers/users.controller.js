import DB from '../db.js';

const { User, Country, Activity } = DB;

export async function login(req, res) {
  try {
    const { email, password } = req.query;
    const user = await User.findOne({
      where: { email },
      include: [
        { model: Country, include: [{ model: Activity, required: false }] }
      ]
    });
    if (!user) return res.status(404).json({ message: "That email does not exist" });
    if (user.password !== password) return res.status(403).json({ message: "The password is incorrect" });
    return res.status(200).json({ access: true, user: user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function register(req, res) {
  try {
    const { name, surname, email, password, countryId } = req.body;
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        name,
        surname,
        email,
        password
      }
    });
    if (!created) return res.status(403).json({ message: "That email already exists" });
    const country = await Country.findByPk(countryId);
    await country.addUser(user);
    return res.status(200).json({ successfully: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      include: [Country, Activity]
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}