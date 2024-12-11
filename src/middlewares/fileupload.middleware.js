import multer, { diskStorage } from "multer";
// Configure storage with filename and location
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  },
});
export const upload = multer({ storage: storage });
