import multer from "multer";
import path from "path";
import crypto from "crypto";

function getDestination(req, file, cb) {
  let uploadPath = "";

  if (req.baseUrl.includes("company")) {
    uploadPath = "uploads/company/";
  } else if (req.baseUrl.includes("event")) {
    uploadPath = "uploads/event/";
  } else {
    uploadPath = "uploads/othrer/";
  }
  cb(null, uploadPath);
}

function getFileName(req, file, cb) {
  const fileHash = crypto.randomBytes(10).toString("hex");
  const extension = path.extname(file.originalname);
  const fileName = `${fileHash}${extension}`;
  cb(null, fileName);
}

// Configuração básica do multer
const storage = multer.diskStorage({
  destination: getDestination,
  filename: getFileName,
});

const upload = multer({ storage: storage });

export { upload };
