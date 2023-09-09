const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/upload'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now().toString() + "_" + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    const extensaoCsv = ['text/csv'].find(formatoAceito => formatoAceito == file.mimetype);

    if (extensaoCsv) {
        return cb(null, true);
    }

    return cb(null, false);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
