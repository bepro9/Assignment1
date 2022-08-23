import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse";
import { Author, Book, Magazines } from "./dt";

const BookData = () => {
  const csvFilePath = path.resolve(__dirname, "../data/Book.csv");
  const headers = ["title", "isbn", "authors", "description"];
  const fileContent = fs.readFileSync(csvFilePath, { encoding: "utf-8" });
  const newFile = path.resolve(__dirname, "../data/outputBook.json");

  parse(
    fileContent,
    {
      delimiter: ";",
      columns: headers,
      from_line: 2,
    },
    (error, result: Book[]) => {
      if (error) {
        console.error(error);
      }
      //   console.log("book data:", result);
      const jsondata = JSON.stringify(result);
      fs.writeFileSync(newFile, jsondata);
    }
  );
};

const AuthorData = () => {
  const csvFilePath = path.resolve(__dirname, "../data/Author.csv");
  const headers = ["email", "first_name", "last_name"];
  const fileContent = fs.readFileSync(csvFilePath, { encoding: "utf-8" });
  const newFile = path.resolve(__dirname, "../data/outputAuthor.json");
  parse(
    fileContent,
    {
      delimiter: ";",
      columns: headers,
      from_line: 2,
    },
    (error, result: Author[]) => {
      if (error) {
        console.error(error);
      }
      const jsondata = JSON.stringify(result);
      fs.writeFileSync(newFile, jsondata);
    }
  );
};

const MagazinesData = () => {
  const csvFilePath = path.resolve(__dirname, "../data/Magazines.csv");
  const headers = ["title", "isbn", "authors", "publishedAt"];
  const fileContent = fs.readFileSync(csvFilePath, { encoding: "utf-8" });
  const newFile = path.resolve(__dirname, "../data/outputMagazine.json");

  parse(
    fileContent,
    {
      delimiter: ";",
      columns: headers,
      from_line: 2,
    },
    (error, result: Magazines[]) => {
      if (error) {
        console.error(error);
      }
      //   console.log("Magazines : ", result);
      const jsondata = JSON.stringify(result);
      fs.writeFileSync(newFile, jsondata);
    }
  );
};

BookData();
AuthorData();
MagazinesData();
