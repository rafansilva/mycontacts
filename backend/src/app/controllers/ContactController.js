const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(req, res) {
    const { order } = req.query;
    const contacts = await ContactsRepository.findAll(order);

    res.json(contacts);
  }

  async show(req, res) {
    const { id } = req.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json(contact);
  }

  async store(req, res) {
    const { name, email, phone, category_id } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const contactExists = await ContactsRepository.findByEmail(email);
    if (contactExists) {
      return res
        .status(400)
        .json({ error: 'This e-mail address already exists' });
    }

    const contact = await ContactsRepository.create({
      name,
      email,
      phone,
      category_id
    });

    res.json(contact);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, email, phone, category_id } = req.body;

    const contactExists = await ContactsRepository.findById(id);
    if (!contactExists) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const contactByEmail = await ContactsRepository.findByEmail(email);
    if (contactByEmail && contactByEmail.id !== id) {
      return res
        .status(400)
        .json({ error: 'This e-mail address already exists' });
    }

    const contact = await ContactsRepository.update(id, {
      name,
      email,
      phone,
      category_id
    });

    res.json(contact);
  }

  async delete(req, res) {
    const { id } = req.params;

    await ContactsRepository.delete(id);
    res.sendStatus(204);
  }
}

// Singleton Pattern
module.exports = new ContactController();
