import formidable from 'formidable';

const getMultiform = (req) => {
    return new Promise((resolve, reject) => {
        const form = formidable({ multiples: true });
        return form.parse(req, function (err, fields, files) {
            if (!err) {
                resolve({
                    fields,
                    files
                });
            } else {
                reject('Error in handling form')
            }
        });
    });
}

export default getMultiform;