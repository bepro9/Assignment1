"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("./controllers");
const router = (0, express_1.Router)();
router.get("/hc", (req, res) => {
    res.status(200).send("Health Check Route...");
});
router.get("/all-books", controllers_1.getAllBooks);
router.get("/all-magazines", controllers_1.getAllMagazines);
router.get("/BM-byId/:id", controllers_1.findBookOrMagazineByISBN);
router.get("/BM-byAuthor/:id", controllers_1.findBookOrMagazineByAuthor);
router.get("/all-books-mag-SortByTitle", controllers_1.findBookAndMagSortByTitle);
router.post("/addBook", controllers_1.addBook);
router.post("/addMagazine", controllers_1.addMagazine);
exports.default = router;
