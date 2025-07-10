import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

// Ensure environment variables are loaded
dotenv.config();

// Debug: Check if environment variables are loaded
console.log("Cloudinary Environment Variables:");
console.log(
  "CLOUD_NAME:",
  process.env.CLOUDINARY_CLOUD_NAME ? "✓ Loaded" : "✗ Missing"
);
console.log(
  "API_KEY:",
  process.env.CLOUDINARY_API_KEY ? "✓ Loaded" : "✗ Missing"
);
console.log(
  "API_SECRET:",
  process.env.CLOUDINARY_API_SECRET ? "✓ Loaded" : "✗ Missing"
);

// Validate required environment variables
if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  throw new Error(
    "Missing required Cloudinary environment variables. Please check your .env file."
  );
}

// Configure Cloudinary with explicit values
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Use HTTPS URLs
});

// Verify configuration
try {
  const config = cloudinary.config();
  console.log(
    "Cloudinary configured successfully with cloud_name:",
    config.cloud_name
  );
} catch (error) {
  console.error("Cloudinary configuration error:", error.message);
  throw error;
}

// Configure Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "chat-app-files",
      allowed_formats: [
        "jpg",
        "jpeg",
        "png",
        "gif",
        "pdf",
        "doc",
        "docx",
        "txt",
        "mp4",
        "mp3",
      ],
      resource_type: "auto", // Automatically detect file type
      transformation: [{ quality: "auto", fetch_format: "auto" }],
      public_id: `${Date.now()}-${file.originalname}`, // Unique filename
    };
  },
});

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow specific file types
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
      "video/mp4",
      "audio/mpeg",
      "audio/mp3",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("File type not allowed"), false);
    }
  },
});

export { cloudinary, upload };
