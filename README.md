## 本工具只适用windows系统，压缩png，jpg图片

* 文件目录
```
    root                    -----根目录
     |  ---- app.exe        -----主程序
     |  ---- vendor         -----放置用于压缩png，jpg的二进制文件。  
```

* 如何使用

>双击运行app.exe文件，按照提示输入要指定压缩的文件夹目录，创建成功或者已存在指定目录之后，需要再次确认是否开始压缩，按照提示输入“ok”即可，进入压缩环节。压缩成功后会dos窗口会在5秒后关闭。

* 文件如何放置？

>在目标文件夹里可以放置任何文件（文件夹），程序会从目标文件夹寻找jpg，png图片。当然你也不用担心压缩后图片的文件位置杂乱无章，目标文件里的图片相对目标文件位置相当于在输出文件夹`compress_images`的位置。
```
例如：目标文件夹名：img

解压前图片位置： 
root\img\test.png
root\img\work\lucky.png
root\img\test\dog.png
root\img\a1\cat.png

解压后的位置：
root\compress_images\test.png
root\compress_images\work\lucky.png
root\compress_images\test\dog.png
root\compress_images\a1\cat.png
```