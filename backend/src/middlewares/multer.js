import multer from "multer";
import fs from "fs";
import path from "path";
const storage = (type) =>
  multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `public/uploads/${type}s`);
    },
    filename: function (req, file, cb) {
      const fileExtension = path.extname(file.originalname).toLowerCase();

      const uniqueSuffix =
        (req.body.firstname || "") +
        (req.body.lastname || "") +
        Math.round(Math.random() * 1e9) +
        fileExtension;
      cb(null, uniqueSuffix);
    },
  });
const uploadFilter = (type) => (req, file, callback) => {
  if (type === "resume") {
    if (file.mimetype !== "application/pdf") {
      console.log("Invalid file type for resume. Only PDF files are allowed.");
      callback(new Error("Invalid file type for resume"), false);
    } else {
      callback(null, true);
    }
  } else if (type === "profilepic") {
    const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];

    if (!allowedImageTypes.includes(file.mimetype)) {
      console.log(
        "Invalid file type for profile picture. Only JPG, PNG, GIF are allowed."
      );
      callback(new Error("Invalid file type for profile picture"), false);
    } else {
      callback(null, true);
    }
  } else {
    callback(new Error("Unknown file type"), false);
  }
};
/*************Upload Single file ******************/
const uploadSingle = (type) => {
  console.log(type);
  const fileStorage = storage(type);
  const fileFilter = uploadFilter(type);
  return multer({
    storage: fileStorage,
    fileFilter: fileFilter,
  }).single(type);
};

/*************Delete file ******************/
const deleteFile = (filename) => {
  const filePath = path.join("public/uploads/resumes", filename);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error deleting file: ${err}`);
    } else {
      console.log("File deleted successfully");
    }
  });
};
export { uploadSingle, deleteFile };
