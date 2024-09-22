import multer from "multer";
import fs from "fs";
import path from "path";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/resumes");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      req.body.firstname +
      req.body.lastname +
      "-Resume-" +
      Math.round(Math.random() * 1e9) +
      ".pdf";
    cb(null, uniqueSuffix);
  },
});
function uploadFilter(req, file, callback) {
  if (file.mimetype !== "application/pdf") {
    console.log("Invalid file type. Only PDF files are allowed.");
    callback(new Error("Invalid file type"), false);
  } else {
    callback(null, true);
  }
}
const upload = multer({ storage: storage, fileFilter: uploadFilter });
const uploadSingle = upload.single("resume");

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
