let keystorePath = ""
let pemPath = ""
let outputDir = ""

const logs = document.getElementById("logs")

function log(msg) {
    logs.textContent += msg + "\n----------------------------\n"
    logs.scrollTop = logs.scrollHeight
}

document.getElementById("selectKeystore").onclick = async () => {
    keystorePath = await window.api.selectFile()

    document.getElementById("keystorePath").innerText = keystorePath

    log("Keystore selected")
}

document.getElementById("selectPem").onclick = async () => {
    pemPath = await window.api.selectFile()

    document.getElementById("pemPath").innerText = pemPath

    log("Encryption key selected")
}

document.getElementById("selectFolder").onclick = async () => {
    outputDir = await window.api.selectFolder()

    document.getElementById("folderPath").innerText = outputDir

    log("Output folder selected")
}

document.getElementById("generateBtn").onclick = async () => {
    const alias = document.getElementById("alias").value
    const storepass = document.getElementById("storepass").value
    const keypass = document.getElementById("keypass").value

    log(`Running PEPK..., keystorePath = ${keystorePath}, alias = ${alias}, storepass = ${storepass}, keypass = ${keypass}, pemPath = ${pemPath}, outputDir = ${outputDir}`)

    try {
        const res = await window.api.runPEPK({
            keystore: keystorePath,
            alias: alias,
            storepass: storepass,
            keypass: keypass,
            pem: pemPath,
            outputDir: outputDir
        })
        log(res)
    } catch (e) {
        log("Error: " + e)
    }
}