## 本工具只适用windows系统，压缩png，jpg图片(当前版本1.0.3)

* 文件目录
```
    root                    -----根目录
     |  ---- app.exe        -----主程序
     |  ---- vendor         -----jpg依赖的压缩文件 
     |  ---- src            -----源码
```
### 使用pkg对nodejs程序进行打包

* 如何使用

>双击运行app.exe文件，按照提示输入要指定压缩的文件夹目录，创建成功或者已存在指定目录之后，需要再次确认是否开始压缩，按照提示输入“ok”即可，进入压缩环节。压缩成功后会dos窗口会在5秒后关闭。

* 文件如何放置？

>在目标文件夹里可以放置任何文件（文件夹），程序会从目标文件夹寻找jpg，png图片。当然你也不用担心压缩后图片的文件位置杂乱无章，目标文件里的图片相对目标文件位置相当于在输出文件夹`compress_images`的位置。
```
例如：目标文件夹名：img

解压前图片位置： 
root\img\test.jpg
root\img\work\lucky.png
root\img\test\dog.jpg
root\img\a1\cat.png

解压后的位置：
root\compress_images\test.jpg
root\compress_images\work\lucky.png
root\compress_images\test\dog.jpg
root\compress_images\a1\cat.png
```

### 使用nodejs来运行程序
1. src文件夹下载下来
2. 以src文件为目录 运行 npm install 
3. node app.js //直接运行程序
* 若安装```imagemin-pngquant```失败,请不要气馁,继续一直安装!  
直到成功安装所有包为止.安装之后运行 ```node app.js``` 即可
### 版本说明
* 1.0.0 
* 1.0.1
> 优化检测文件夹，小于1kb内存的图片直接转移到输出文件夹。  
压缩出现错误，压缩不了大小的图片也直接转移到输出文件夹。
* 1.0.2
> 更新了第三方包对二进制文件处理图片的依赖   
解决了只压缩jpg文件后窗台不提示成功  
* 1.0.3
> 旧文件解压失败不移动它的位置，而是对文件进行拷贝一份到压缩的目录文件夹。
