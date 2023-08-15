export function postActivityMdl(req, res, next) {
  const { name, difficulty, duration, season, userId, countries } = req.body;
  if (!name || !difficulty || !duration || !season || !userId) return res.status(404).json({ message: "Data is missing" });
  if (!countries || countries.length === 0) return res.status(404).json({ message: "Data is missing" });
  next();
}