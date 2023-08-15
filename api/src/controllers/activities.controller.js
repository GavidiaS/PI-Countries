import DB from '../db.js';

const { Activity, Country, User } = DB;

export async function getActivities(req, res) {
  try {
    const activities = await Activity.findAll({
      include: [Country]
    });
    return res.status(200).json(activities);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getActivityById(req, res) {
  try {
    const { id } = req.params;
    const activity = await Activity.findByPk(id, {
      include: [User, Country]
    });
    return res.status(200).json(activity);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function postActivity(req, res) {
  try {
    const { name, difficulty, duration, season, userId, countries } = req.body;
    const [activity, created] = await Activity.findOrCreate({
      where: { name },
      defaults: {
        name,
        difficulty,
        duration,
        season
      }
    });
    if (!created) return res.status(403).json({ message: "That activity already exists" });
    const user = await User.findByPk(userId);
    await user?.addActivity(activity);
    await activity?.addCountries(countries);
    const activities = await Activity.findAll({
      include: [Country]
    });
    return res.status(200).json(activities);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}