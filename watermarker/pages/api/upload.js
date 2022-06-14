import multer, { memoryStorage } from "multer";
import gm from "gm";

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({ storage: memoryStorage() });

export default async function handler(req, res) {
  try {
    await runMiddleware(req, res, upload.single("file"));
    await addWatermark(req.file.buffer, req.file.originalname);
    res.setHeader("Set-Cookie", "flash=success:Upload success; path=/");
  } catch (error) {
    console.error(error);
    res.setHeader("Set-Cookie", `flash=danger:${error.message}; path=/`);
  } finally {
    res.redirect(302, "/");
  }
}

function addWatermark(buffer, filename) {
  return new Promise((resolve, reject) => {
    gm(buffer)
      .fill("#ffffff")
      .font("Arial", 32)
      .drawText(32, 32, "Watermarker")
      .write(`./public/upload/${Date.now()}-${filename}`, (error) => {
        if (error) return reject(error);

        resolve();
      });
  });
}

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}
