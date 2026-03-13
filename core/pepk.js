const { exec } = require("child_process")

exports.run = (event, args) => {
    console.log("args = ", args)
    return new Promise((resolve, reject) => {
        const cmd = `
java -jar pepk/pepk.jar \
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
            else resolve("output.zip generated")
        })

    })
}