import { execSync } from "child_process"


const check = () => {
    try {
        execSync("java -version")

        return "Java OK"
    } catch {
        throw "Java not installed"
    }
}

export { check }