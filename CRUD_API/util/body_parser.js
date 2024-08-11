module.exports = (request) => {
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            request.on("data", (chunk) => {
                body += chunk;
            });
            request.on("end", () => {
                const data = JSON.parse(body);
                resolve(data);
            });
        }
        catch (er) {
            console.log(er);
            reject(er);
        }
    });
}