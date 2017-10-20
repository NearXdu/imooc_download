# 下载慕课网免费视频到本地

## **getURL.js**

抓下来的m3u8文件加密，通过js代码拿到ts文件列表

下载下来之后，ts文件无法播放，发现m3u8经过ASE加密，抓下来的key同样被加密，需要通过getURL.js解密拿到16字节的key

将ts文件url以及解密的key输出到json文件中


## **java代码**

解析json文件，异步下载ts文件并合并成一个文件，执行执行`convert.sh`对合并的ts进行解密并编码成mp4格式




