const ImageKit = require("imagekit");
const APIError = require("../utils/APIError");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

class ImageKitService {
  static async uploadImage(file, folder, fileName) {
    try {
      const response = await imagekit.upload({
        file: file.buffer,
        fileName: fileName || `${Date.now()}-${file.originalname}`,
        folder: `/${folder}`,
      });
      return response;
    } catch (error) {
      throw new APIError(`Image upload failed: ${error.message}`, 500);
    }
  }

  static async deleteImage(fileId) {
    try {
      return await imagekit.deleteFile(fileId);
    } catch (error) {
      throw new APIError(`Image deletion failed: ${error.message}`, 500);
    }
  }

  static getImageUrl(filePath, transformations = {}) {
    return imagekit.url({
      path: filePath,
      transformation: [transformations],
    });
  }
}

module.exports = ImageKitService;
