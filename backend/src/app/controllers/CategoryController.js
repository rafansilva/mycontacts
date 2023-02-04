const isValidUUID = require('../../utils/isValidUUID');
const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryController {
  async index(req, res) {
    const categories = await CategoryRepository.findAll();

    res.json(categories);
  }

  async show(req, res) {
    const { id } = req.params;

    if (!isValidUUID(id)) {
      return res.status(404).json({ error: "Invalid category id" });
    }

    const category = await CategoryRepository.findById(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  }

  async store(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const categoryExists = await CategoryRepository.findByName(name);

    if (categoryExists) {
      return res.status(400).json({ error: 'This category already exists' });
    }

    const category = await CategoryRepository.create({ name });

    res.status(201).json(category);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    if (!isValidUUID(id)) {
      return res.status(404).json({ error: "Invalid category id" });
    }

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const category = await CategoryRepository.findById(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const categoryExists = await CategoryRepository.findByName(name);

    if (categoryExists) {
      return res.status(400).json({ error: 'This category already exists' });
    }

    const updatedCategory = await CategoryRepository.update(id, { name });

    res.json(updatedCategory);
  }

  async delete(req, res) {
    const { id } = req.params;

    if (!isValidUUID(id)) {
      return res.status(404).json({ error: "Invalid user id" });
    }

    await CategoryRepository.delete(id);
    res.sendStatus(204);
  }
}

module.exports = new CategoryController();
