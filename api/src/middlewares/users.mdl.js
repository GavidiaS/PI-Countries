export function loginMdl(req, res, next) {
  const { email, password } = req.query;
  if (!email || !password) return res.status(404).json({ message: "Data is missing" });
  next();
}

export function registerMdl(req, res, next) {
  const { name, surname, email, password, countryId } = req.body;
  if (!name || !surname || !email || !password || !countryId) return res.status(404).json({ message: "Data is missing" });
  next();
}