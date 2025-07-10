import multer from "multer"
import {v4} from "uuid"
import path from "path"

const storage = multer.diskStorage({
    distination:(req,file,cb) => {
        cb(null, 'uploads/');
    },
    filename:(req,file,cb)=>{
        const uniqueName = `${v4()}${path.extname(file.originalname)}}`;
        cb(null,uniqueName);
    }
})

const upload = multer({
    storage,
    limits:{
        fileSize:10* 1024*1024},
        fileFilter: (req, file, cb) => {
            const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|txt|mp3|mp4/;
            const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
            const mimetype = allowedTypes.test(file.mimetype);
            
            if (extname && mimetype) {
              return cb(null, true);
            }
            cb(new Error('File type not allowed'));
          
    }
})

export default upload;