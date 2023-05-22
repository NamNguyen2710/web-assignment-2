import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload an image'), false);
    }
  }
});

const resizeAndSaveImage = async (title, buffer) => {
  const filename = `${title}-${Date.now()}.jpeg`;
  const filepath = path.join(
    __dirname,
    '..',
    '..',
    'public',
    'image',
    filename
  );

  await sharp(buffer).resize(300, 300).toFormat('jpeg').toFile(filepath);
  return filename;
};

export const handleImage = title => async (req, res, next) => {
  if (!req.file) return next();

  const imageName = await resizeAndSaveImage(title, req.file.buffer);
  req.imageName = imageName;
  return next();
};

export const handleImages = title => async (req, res, next) => {
  if (!req.files || req.files.length === 0) return next();

  const imageNames = await Promise.all(
    req.files.map(file => resizeAndSaveImage(title, file.buffer))
  );
  req.imageNames = imageNames || [];
  return next();
};

export const uploadImage = upload.single('image');
export const uploadImages = upload.array('images');
