import multer from 'multer'

export const upload = multer({
    limits: {
        fileSize: 1024*1024*5
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/))
            return cb(new Error('Please upload an image'))
        
        cb(null, true)
    }
})
