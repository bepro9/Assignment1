"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMagazine = exports.addBook = exports.findBookAndMagSortByTitle = exports.findBookOrMagazineByAuthor = exports.findBookOrMagazineByISBN = exports.getAllMagazines = exports.getAllBooks = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const getAllBooks = (req, res) => {
    const BookFilePath = path.resolve(__dirname, "./data/outputBook.json");
    const BookContent = fs.readFileSync(BookFilePath, { encoding: "utf-8" });
    const finalresp = JSON.parse(BookContent);
    res.status(200).json({ length: finalresp.length, data: finalresp });
};
exports.getAllBooks = getAllBooks;
const getAllMagazines = (req, res) => {
    const MagazineFilePath = path.resolve(__dirname, "./data/outputMagazine.json");
    const MagazineContent = fs.readFileSync(MagazineFilePath, {
        encoding: "utf-8",
    });
    const finalresp = JSON.parse(MagazineContent);
    res.status(200).json({ length: finalresp.length, data: finalresp });
};
exports.getAllMagazines = getAllMagazines;
const findBookOrMagazineByISBN = (req, res) => {
    const id = req.params.id;
    const BookFilePath = path.resolve(__dirname, "./data/outputBook.json");
    const MagazineFilePath = path.resolve(__dirname, "./data/outputMagazine.json");
    const BookContent = fs.readFileSync(BookFilePath, { encoding: "utf-8" });
    const MagazineContent = fs.readFileSync(MagazineFilePath, {
        encoding: "utf-8",
    });
    let response;
    JSON.parse(BookContent).forEach((element) => {
        if (element.isbn == id) {
            response = element;
        }
    });
    JSON.parse(MagazineContent).forEach((element) => {
        if (element.isbn == id) {
            response = element;
        }
    });
    res.status(200).json({ data: response });
};
exports.findBookOrMagazineByISBN = findBookOrMagazineByISBN;
const findBookOrMagazineByAuthor = (req, res) => {
    const authorName = req.params.id;
    const resp = [];
    const BookFilePath = path.resolve(__dirname, "./data/outputBook.json");
    const MagazineFilePath = path.resolve(__dirname, "./data/outputMagazine.json");
    const BookContent = fs.readFileSync(BookFilePath, { encoding: "utf-8" });
    const MagazineContent = fs.readFileSync(MagazineFilePath, {
        encoding: "utf-8",
    });
    JSON.parse(BookContent).forEach((element) => {
        if (element.authors == authorName)
            resp.push(element);
    });
    JSON.parse(MagazineContent).forEach((element) => {
        if (element.authors == authorName)
            resp.push(element);
    });
    res.status(200).json({ data: resp });
};
exports.findBookOrMagazineByAuthor = findBookOrMagazineByAuthor;
const findBookAndMagSortByTitle = (req, res) => {
    const data = [];
    const BookFilePath = path.resolve(__dirname, "./data/outputBook.json");
    const MagazineFilePath = path.resolve(__dirname, "./data/outputMagazine.json");
    const BookContent = fs.readFileSync(BookFilePath, { encoding: "utf-8" });
    const MagazineContent = fs.readFileSync(MagazineFilePath, {
        encoding: "utf-8",
    });
    JSON.parse(BookContent).forEach((element) => {
        data.push(element);
    });
    JSON.parse(MagazineContent).forEach((element) => {
        data.push(element);
    });
    var byTitle = data.slice(0);
    byTitle.sort(function (a, b) {
        var x = a.title.toLowerCase();
        var y = b.title.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
    });
    res.status(200).json(byTitle);
};
exports.findBookAndMagSortByTitle = findBookAndMagSortByTitle;
const addBook = (req, res) => {
    const obj = {
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
exports.addBook = addBook;
const addMagazine = (req, res) => {
    const obj = {
        title: req.body.title,
        isbn: req.body.isbn,
        authors: req.body.authors,
        publishedAt: req.body.publishedAt,
    };
    const MagazineFilePath = path.resolve(__dirname, "./data/outputMagazine.json");
    // File contant in JSON
    const myObject = JSON.parse(fs.readFileSync(MagazineFilePath, "utf8"));
    myObject.push(obj);
    fs.writeFileSync(MagazineFilePath, JSON.stringify(myObject));
    res.status(200).json("Magazine added successfully");
};
exports.addMagazine = addMagazine;
