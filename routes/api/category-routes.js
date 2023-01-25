const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  const data = await Category.findAll({
    include: [Product],
  });
  // be sure to include its associated Products
  return res.json(data);
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  const data = await Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [Product],
  });
  return res.json(data);
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const data = await Category.create(req.body);
    return res.status(200).json(data);
  } catch (err) {
    return res.json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  const data = await Category.update(req.body, {
    where: { id: req.params.id },
  });
  return res.status(200).json(data);
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  const data = await Category.destroy({
    where: { id: req.params.id },
  });
  return res.status(200).json(data);
});

module.exports = router;
