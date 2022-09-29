const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
router.get('/', async (req, res) => {
  try{
    const searchedTags = await Tag.findAll({
      include:[{ model: Product, through: ProductTag, as: 'products'}]
    });
    if(!searchedTags){
      res.status(500).json({ message: 'There is nothing in the table' });
      return;
    }

    return res.json(searchedTags);
  } catch (error){
    console.log(error);
  }
  
});

// find a single tag by its `id`
router.get('/:id', async (req, res) => {
  try{
    const searchedTag = await Tag.findOne({
      where: {id: req.params.id},
      include:[{ 
        
        model: Product,
        through: ProductTag,
        as: 'products',
      }]
      });
    if(!searchedTag){
      res.status(500).json({ message: 'This is not in the table' });
      return;
    }

    return res.json(searchedTag);
  } catch (error){
    console.log(error);
  }
});

// create a new tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
  })
  .then((newTag)=>{
    return res.json(newTag)
  })
  .catch((error)=>{
    return res.json(error);
  })
});

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where:{
        id: req.params.id
      },
    }
  )
  .then((updatedTag) => {
    res.json(updatedTag);
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  });
});

 // delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id:req.params.id,
    }
  })
  .then((deletedTag) => {
    res.json(deletedTag);
  })
  .catch((err) => res.json(err));
});

module.exports = router;
