const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// ############################### Find All Tags #################################
// ############################### Find All Tags #################################
// ############################### Find All Tags #################################

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      // This will retrieve every Reader's associated LibraryCard data. In SQL, this would be a JOIN function.
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// ###################### Find a Single Tag By its ID ############################
// ###################### Find a Single Tag By its ID ############################
// ###################### Find a Single Tag By its ID ############################

router.get('/:id', async (req, res) => {
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// ################################# Create A New Tag ##############################
// ################################# Create A New Tag ##############################
// ################################# Create A New Tag ##############################

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// ######################## Update a Tag's name by its `id` value #################
// ######################## Update a Tag's name by its `id` value #################
// ######################## Update a Tag's name by its `id` value #################

router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(
      { 
        tag_name: req.body.tag_name 
      },
      { where: {
        id: req.params.id
        },
      },  

      
    );
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// ############################## Delete on tag by its `id` value #################
// ############################## Delete on tag by its `id` value #################
// ############################## Delete on tag by its `id` value #################

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
