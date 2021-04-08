const fs = require("fs")
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const path = require("path")
const images = require("images")
const readline = require("readline")

var pngArray = []
var jpgArray = []
let positionDir;
let outputDir = path.join(process.cwd(), "compress_images")
let testDirStrArray = []
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let welcome_word = "欢迎使用阿政压缩图片工具！\n本工具只适用压缩png,jpg图片\n目前只支持windows系统！\n在使用之前，确认你需要压缩的图片放入一个文件夹里！\n压缩后的图片将放入compress_images文件夹里，请注意查看！\n请输入你需要压缩的文件夹名：（例如：img，pic）...\n"
let re = /^[0-9a-zA-Z]+$/
function questions(str) {
    rl.question(str, (answer) => {
        let asr = answer.replace(/\s+/g, "");
        if (asr == "compress_images") {
            console.log("不可以与默认输出文件夹重名！");
            return questions("请重新输入！\n")
        } else if (!re.test(asr)) {
            console.log("只能输入英文和数字");
            return questions("请重新输入！\n")
        }
        positionDir = path.join(process.cwd(), asr)
        testDir(positionDir)
        ready(`请把所需压缩图片放入${positionDir}输入ok，开始压缩图片！\n`)
    })
}
questions(welcome_word)

function ready(str) {
    rl.question(str, answers => {
        let asr = answers.trim().toLocaleLowerCase()
        if (asr == "ok") {
            console.log("开始压缩...\n");
            main()
        } else {
            ready("指令错误请重新输入,输入ok开始压缩图片\n")
        }
    })
}
//读取文件
function readfile(dir) {
    let arr = fs.readdirSync(dir)
    arr.forEach(item => {
        let filePath = path.join(dir, item)
        if (path.extname(item) == ".png") {
            let filename = filePath.replace(/\\/g, "/")
            let output = filename.replace(positionDir.replace(/\\/g, "/"), outputDir.replace(/\\/g, "/"))
            pngArray.push({ filename, output })
        } else if (path.extname(item) == ".jpg") {
            let filename = filePath.replace(/\\/g, "/")
            let output = filename.replace(positionDir.replace(/\\/g, "/"), outputDir.replace(/\\/g, "/"))
            jpgArray.push({ filename, output })
        } else if (fs.statSync(filePath).isDirectory()) {
            readfile(filePath)
        }
    })
}

//主入口
function main() {
    console.time("共耗时：")
    readfile(positionDir)
    if (jpgArray.length == 0 && pngArray.length == 0) {
        console.log("未检测到图片，请检查压缩目标文件路径是否正确！\n本窗口在5秒后自动关闭！")
        setTimeout(() => {
            rl.close()
        }, 5000)
        return
    }


    if (jpgArray.length != 0) {
        jpgArray = rmSame(jpgArray)
        //压缩jpg
        jpgArray.forEach(item => {
            testDir(path.dirname(item.output))
            images(item.filename).save(item.output, { quality: 60 })
        })
    }


    //压缩png
    pngArray = rmSame(pngArray)
    pngCompress(pngArray, pngArray.length - 1)

}

//检查文件是否存在
function testDir(dir) {
    if (testDirStrArray.indexOf(dir) != -1) {
        return
    }
    testDirStrArray.push(dir)
    if (fs.existsSync(dir)) {
        console.log("已存在该路径：" + dir);
    } else {
        fs.mkdirSync(dir, { recursive: true })
        console.log(`创建${dir}路径成功！`);
    }
}

//去重
function rmSame(arr) {
    let newArray = []
    let arrObj = []
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if (newArray.indexOf(element['filename']) == -1 && (fs.statSync(element['filename']).size > 1024)) {
            newArray.push(element['filename'])
            arrObj.push(element)
        } else if (newArray.indexOf(element['filename']) == -1 && (fs.statSync(element['filename']).size <= 1024)) {
            let pathDir = path.dirname(element['output'])
            testDir(pathDir)
            fs.createReadStream(element['filename']).pipe(fs.createWriteStream(element['output']))
            console.log(`图片${element['filename']}内存过小，直接转移到${element['output']}`)
        }
    }
    return arrObj
}


//png压缩图片
function pngCompress(arr, index) {
    //压缩结束
    if (index < 0) return over()

    let pathDir = path.dirname(arr[index]['output'])
    let filename = arr[index]['filename']
    testDir(pathDir)
    imagemin([filename], {
        destination: pathDir,
        plugins: [
            imageminPngquant({
                quality: [0.6, 0.7]
            })
        ]
    }).then(() => {
        console.log(`图片${filename}压缩完成!`);
        pngCompress(arr, index - 1)
    }).catch(err => {
        console.log(`${arr[index]['filename']}图片压缩不了了，直接转移到${arr[index]['output']}`)
        fs.createReadStream(arr[index]['filename']).pipe(fs.createWriteStream(arr[index]['output']))
        pngCompress(arr, index - 1)
    });

}

//压缩结束

function over() {
    console.log("     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~   \n")
    console.log("                        _oo0oo_                  ");
    console.log("                       o8888888o                 ");
    console.log(`                       88" . "88                 `);
    console.log("                      (|  -_-  |)                 ");
    console.log("                       0\\  =  /0                 ");
    console.log("                     ___/`---'\\___               ");
    console.log("                   .' \\\\|     |// '.             ");
    console.log("                  / \\\\|||  :  |||// \\            ");
    console.log("                 / _||||| -:- |||||- \\           ");
    console.log("                |   | \\\\\\  - /// |   |           ");
    console.log("                | \\_|  ''\\---/''  |_/ |          ");
    console.log("                \\  .-\\__  '-'  ___/-. /          ");
    console.log("              ___'. .'  /--.--\\  `. .'___        ");
    console.log(`           ."" '<  '.___\\_<|>_/___.' >' "".      `);
    console.log("          | | :  `- \\`.;`\\ _ /`;.`/ - ` : | |    ");
    console.log("          \\  \\ `_.   \\_ __\\ /__ _/   .-` /  /    ");
    console.log("      =====`-.____`.___ \\_____/___.-`___.-'===== ");
    console.log("                        `=---='                  ");
    console.log("     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~   \n")
    console.log("--------------------------------------------------")
    console.log(`压缩图片完成，请到目录：\n ${outputDir} \n查看`)
    console.timeEnd("共耗时：")
    console.log("\n本窗口在5秒后关闭！")
    setTimeout(() => {
        rl.close()
    }, 5000)
}
