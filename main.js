const nodemailer = require("nodemailer")
const core = require("@actions/core")
const fs = require("fs")
const showdown = require('showdown')

function getBody(bodyOrFile, convertMarkdown) {
    let body = bodyOrFile

    // Read body from file
    if (bodyOrFile.startsWith("file://")) {
        const file = bodyOrFile.replace("file://", "")
        body = fs.readFileSync(file, "utf8")
    }

    // Convert Markdown to HTML
    if (convertMarkdown) {
        const converter = new showdown.Converter()
        body = converter.makeHtml(body)
    }

    return body
}

function getFrom(from, username) {
    if (from.match(/.+<.+@.+>/)) {
        return from
    }

    return `"${from}" <${username}>`
}

async function main() {
    try {
        // const serverAddress = core.getInput("server_address", { required: true })
        // const serverPort = core.getInput("server_port", { required: true })
        // const username = core.getInput("username", { required: true })
        // const password = core.getInput("password", { required: true })
        // const subject = core.getInput("subject", { required: true })
        // const body = core.getInput("body", { required: true })
        // const from = core.getInput("from", { required: true })
        // const to = core.getInput("to", { required: true })
        // const cc = core.getInput("cc", { required: false })
        // const bcc = core.getInput("bcc", { required: false })
        // const contentType = core.getInput("content_type", { required: true })
        // const attachments = core.getInput("attachments", { required: false })
        // const convertMarkdown = core.getInput("convert_markdown", { required: false })

        const transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "iamajaysingla001@gmail.com",
                pass: "appwrk@@",
            }
        });

        await transport.verify(async function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log("Server is ready to take our messages");
                var bb = getFrom("Ajay Singla", "iamajaysingla001@gmail.com");
                const info = await transport.sendMail({
                    from: bb,
                    to: "aj.a@appwrk.com",
                    // cc: cc ? cc : undefined,
                    // bcc: bcc ? bcc : undefined,
                    subject: "Test Email from Node JS with pipeline Fixed",
                    // text: contentType != "text/html" ? getBody(body, convertMarkdown) : undefined,
                    // html: contentType == "text/html" ? getBody(body, convertMarkdown) : undefined,
                    // attachments: attachments ? attachments.split(',').map(f => ({ path: f.trim() })) : undefined
                })
                return false;
            }
        });

    } catch (error) {
        core.setFailed(error.message)
    }
}

main()
