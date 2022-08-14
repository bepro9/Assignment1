import { Request, Response, Router } from "express";
import {
  getAllBooks,
  getAllMagazines,
  findBookOrMagazineByISBN,
  findBookOrMagazineByAuthor,
  findBookAndMagSortByTitle,
  addBook,
  addMagazine,
} from "./controllers";

const router = Router();

router.get("/all-books", getAllBooks);
router.get("/all-magazines", getAllMagazines);

router.get("/BM-byId/:id", findBookOrMagazineByISBN);
router.get("/BM-byAuthor/:id", findBookOrMagazineByAuthor);

router.get("/all-books-mag-SortByTitle", findBookAndMagSortByTitle);

router.post("/addBook", addBook);
router.post("/addMagazine", addMagazine);

export default router;
