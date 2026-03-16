import { exec } from "child_process"
import { app } from "electron"
import path from "path"


const run = (event, args) => {
    console.log("args = ", args)

    return new Promise((resolve, reject) => {
        let jarPath;
        if (app.isPackaged) {
            jarPath = path.join(process.resourcesPath, "pepk/pepk.jar");
        } else {
            jarPath = path.join(__dirname, "../pepk/pepk.jar");
        }

        const cmd = `
java -jar ${jarPath} \
--keystore="${args.keystore}" \
--alias="${args.alias}" \
--output="${args.outputDir}/output.zip" \
--include-cert \
--rsa-aes-encryption \
--encryption-key-path="${args.pem}" \
--keystore-pass=${args.storepass} \
--key-pass=${args.keypass}
`
        console.log(cmd)

        exec(cmd, (err, stdout, stderr) => {
            if (err) reject(stderr)
            else resolve(`${args.outputDir}/output.zip generated`)
        })

    })
}

export { run }