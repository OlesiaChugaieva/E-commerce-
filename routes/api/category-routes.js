const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });

    res.status(200).json(categoryData);
  } catch {
    res.status(500).json(err);
  }
});
// find one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const searchedCategory = await Category.findOne(req.params.id, {
      include: [{ model: Product }]
    });

    if (!searchedCategory) {
      res.status(404).json({ message: `No category found with ID: ${req.params.id}` });
      return;
    }
    res.status(200).json(searchedCategory);
  } catch {
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
    .then((newCategory) => {
      return res.json(newCategory)
    })
    .catch((error) => {
      return res.json(error);
    })
});

// update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where:{
        id: req.params.id
      },
    }
  )
  .then((modifiedCategory) => {
    res.json(modifiedCategory);
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  });
});

// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id:req.params.id,
    }
  })
  .then((deletedCategory) => {
    res.json(deletedCategory);
  })
  .catch((err) => res.json(err));
});

module.exports = router;
