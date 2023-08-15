import DB from '../db.js';
import axios from 'axios';
import { Op } from 'sequelize';

const { Country, User, Activity } = DB;

export async function getCountries() {
  try {
    const dtCountries = await Country.findAll();
    if (dtCountries.length !== 0) return dtCountries;
    const { data } = await axios("http://localhost:5000/countries");
    const countries = data.map(cn => {
      return {
        id: cn.cca3,
        name: cn.name.common,
        flag: cn.flags.svg,
        continent: cn.continents[0],
        capital: cn.capital ? cn.capital[0] : "",
        subregion: cn.subregion ? cn.subregion : "",
        area: cn.area,
        population: cn.population
      }
    });
    const dbCountries = await Country.bulkCreate(countries);
    return dbCountries;
  } catch (error) {
    return { error: error.message };
  }
}

export async function getCountriesByName(name) {
  try {
    const countries = await Country.findAll({
      where: { name: { [Op.iLike]: name + "%" } }
    });
    if (!countries || countries.length === 0) return { message: "Country not found" };
    return countries;
  } catch (error) {
    return { error: error.message };
  }
}

export async function getAllCountries(req, res) {
  try {
    const { name } = req.query;
    const data = (name && /^[a-zA-Z\s]+$/.test(name))
    ? await getCountriesByName(name)
    : await getCountries();
    if (data.message) return res.status(404).json({ message: data.message });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getCountryById(req, res) {
  try {
    const { id } = req.params;
    const country = await Country.findByPk(id, {
      include: [
        { model: Activity, required: false },
        { model: User, required: false }
      ]
    });
    return res.status(200).json(country);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}