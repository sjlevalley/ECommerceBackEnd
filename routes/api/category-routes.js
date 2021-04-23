const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// ############################### Find All Categories #################################
// ############################### Find All Categories #################################
// ############################### Find All Categories #################################

router.get('/', async (req, res) => {
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// ############################### Get One Category By ID ##############################
// ############################### Get One Category By ID ##############################
// ############################### Get One Category By ID ##############################

router.get('/:id', (req, res) => {
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// ############################### Update A Category #################################
// ############################### Update A Category #################################
// ############################### Update A Category #################################

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(
      {category_name: req.body.category_name},
      {where: req.params.id}
      );

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// ################################# Delete Product ###############################
// ################################# Delete Product ###############################
// ################################# Delete Product ###############################

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
