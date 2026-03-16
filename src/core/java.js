const { execSync } = require("child_process")

exports.check = () => {
    try {
        execSync("java -version")

        return "Java OK"
    } catch {
        throw "Java not installed"
    }
}