const app = require("./src/app.js");
require("./src/database/database.js");
const port = process.env.PORT || 3001;

async function main() {
    try {
        app.listen(port);
        console.log("server in listening on port 💡", port);
    } catch (error) {
        console.log("este es el error...", error);
    }
}

main();
