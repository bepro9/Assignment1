import * as fs from "fs";
import * as path from "path";
import { Request, Response } from "express";

export const getAllBooks = (req: Request, res: Response) => {
  const BookFilePath = path.resolve(__dirname, "./data/outputBook.json");
  const BookContent = fs.readFileSync(BookFilePath, { encoding: "utf-8" });
  const finalresp = JSON.parse(BookContent);
  res.status(200).json({ length: finalresp.length, data: finalresp });
};

export const getAllMagazines = (req: Request, res: Response) => {
  const MagazineFilePath = path.resolve(
    __dirname,
    "./data/outputMagazine.json"
  );
  const MagazineContent = fs.readFileSync(MagazineFilePath, {
    encoding: "utf-8",
  });
  const finalresp = JSON.parse(MagazineContent);
  res.status(200).json({ length: finalresp.length, data: finalresp });
};

export const findBookOrMagazineByISBN = (req: Request, res: Response) => {
  const id: string = req.params.id;

  const BookFilePath = path.resolve(__dirname, "./data/outputBook.json");
  const MagazineFilePath = path.resolve(
    __dirname,
    "./data/outputMagazine.json"
  );

  const BookContent = fs.readFileSync(BookFilePath, { encoding: "utf-8" });
  const MagazineContent = fs.readFileSync(MagazineFilePath, {
    encoding: "utf-8",
  });

  let response;
  JSON.parse(BookContent).forEach((element: any) => {
    if (element.isbn == id) {
      response = element;
    }
  });
  JSON.parse(MagazineContent).forEach((element: any) => {
    if (element.isbn == id) {
      response = element;
    }
  });

  res.status(200).json({ data: response });
};

export const findBookOrMagazineByAuthor = (req: Request, res: Response) => {
  const authorName: string = req.params.id;
  const resp: any = [];

  const BookFilePath = path.resolve(__dirname, "./data/outputBook.json");
  const MagazineFilePath = path.resolve(
    __dirname,
    "./data/outputMagazine.json"
  );

  const BookContent = fs.readFileSync(BookFilePath, { encoding: "utf-8" });
  const MagazineContent = fs.readFileSync(MagazineFilePath, {
    encoding: "utf-8",
  });

  JSON.parse(BookContent).forEach((element: any) => {
    if (element.authors == authorName) resp.push(element);
  });
  JSON.parse(MagazineContent).forEach((element: any) => {
    if (element.authors == authorName) resp.push(element);
  });

  res.status(200).json({ data: resp });
};

export const findBookAndMagSortByTitle = (req: Request, res: Response) => {
  const data: any = [];

  const BookFilePath = path.resolve(__dirname, "./data/outputBook.json");
  const MagazineFilePath = path.resolve(
    __dirname,
    "./data/outputMagazine.json"
  );

  const BookContent = fs.readFileSync(BookFilePath, { encoding: "utf-8" });
  const MagazineContent = fs.readFileSync(MagazineFilePath, {
    encoding: "utf-8",
  });

  JSON.parse(BookContent).forEach((element: any) => {
    data.push(element);
  });
  JSON.parse(MagazineContent).forEach((element: any) => {
    data.push(element);
  });

  var byTitle = data.slice(0);
  byTitle.sort(function (a: any, b: any) {
    var x = a.title.toLowerCase();
    var y = b.title.toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
  });

  res.status(200).json(byTitle);
};

export const addBook = (req: Request, res: Response) => {
  const obj: any = {
    title: req.body.title,
    isbn: req.body.isbn,
    authors: req.body.authors,
    description: req.body.description,
  };

  const BookFilePath = path.resolve(__dirname, "./data/outputBook.json");

  // File contant in JSON
  const myObject = JSON.parse(fs.readFileSync(BookFilePath, "utf8"));
  myObject.push(obj);
  fs.writeFileSync(BookFilePath, JSON.stringify(myObject));

  res.status(200).json("Book added successfully");
};

export const addMagazine = (req: Request, res: Response) => {
  const obj: any = {
    title: req.body.title,
    isbn: req.body.isbn,
    authors: req.body.authors,
    publishedAt: req.body.publishedAt,
  };

  const MagazineFilePath = path.resolve(
    __dirname,
    "./data/outputMagazine.json"
  );
  // File contant in JSON
  const myObject = JSON.parse(fs.readFileSync(MagazineFilePath, "utf8"));
  myObject.push(obj);
  fs.writeFileSync(MagazineFilePath, JSON.stringify(myObject));

  res.status(200).json("Magazine added successfully");
};
