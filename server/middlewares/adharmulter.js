import multer from "multer"

const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //   cb(null, 'public/images')
    // },
    filename: function (req, file, cb) {
      // const uniqueSuffix = Date.now() + '-' + path.extname(file.originalname))
      cb(null, file.fieldname + '-' +Date.now()+ file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
  export default upload