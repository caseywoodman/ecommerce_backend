const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  // find all categories
  const data = await Tag.findAll({
    include: [{ model: Product, through: ProductTag }],
  });
  // be sure to include its associated Products
  return res.json(data);
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  const data = await Tag.findOne({
    where: {
      id: req.params.id,
    },
    // be sure to include its associated Product data
    include: [{ model: Product, through: ProductTag }],
  });
  return res.json(data);
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const data = await Tag.create(req.body);
    return res.status(200).json(data);
  } catch (err) {
    return res.json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  const data = await Tag.update(req.body, {
    where: { id: req.params.id },
  });
  return res.status(200).json(data);
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  const data = await Tag.destroy({
    where: { id: req.params.id },
  });
  return res.status(200).json(data);
});

module.exports = router;
