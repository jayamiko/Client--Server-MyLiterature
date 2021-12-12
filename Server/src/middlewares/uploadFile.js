const multer = require("multer");

exports.uploadPDF = (FilePDF, location) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'upload');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
        },
    });

    const fileFilter = (req, file, cb) => {
        if (file.fieldname === FilePDF) {
            if (!file.originalname.match(/\.(pdf|PDF)$/)) {
                req.fileValidationError = {
                    message: "Only PDF file are allowed",
                };

                return cb(new Error("Only PDF file are allowed"), false);
            }

            cb(null, true);
        }
    };

    const sizeMB = 15;
    const maxSize = sizeMB * 1024 * 1024;

    const upload = multer({
        storage,
        fileFilter,
        limits: {
            fileSize: maxSize,
        },
    }).single(FilePDF);

    return (req, res, next) => {
        upload(req, res, function (error) {
            if (req.fileValidationError) {
                return res.status(400).send(req.fileValidationError);
            }

            if (error) {
                if (error.code === "LIMIT_FILE_SIZE") {
                    return res.status(400).send({
                        message: "Max file sized is 10MB",
                    });
                }
                return res.status(400).send(error);
            }

            return next();
        });
    };
};

exports.uploadImage = (imageFile, location) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'upload');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
        },
    });

    const fileFilter = (req, file, cb) => {
        if (file.fieldname === imageFile) {
            if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|svg)$/)) {
                req.fileValidationError = {
                    message: "Only JPG file are allowed",
                };

                return cb(new Error("Only JPG file are allowed"), false);
            }

            cb(null, true);
        }
    };

    const sizeMB = 10;
    const maxSize = sizeMB * 1024 * 1024;

    const upload = multer({
        storage,
        fileFilter,
        limits: {
            fileSize: maxSize,
        },
    }).single(imageFile);

    return (req, res, next) => {
        upload(req, res, function (error) {
            if (req.fileValidationError) {
                return res.status(400).send(req.fileValidationError);
            }

            if (error) {
                if (error.code === "LIMIT_FILE_SIZE") {
                    return res.status(400).send({
                        message: "Max file sized is 10MB",
                    });
                }
                return res.status(400).send(error);
            }

            return next();
        });
    };
};