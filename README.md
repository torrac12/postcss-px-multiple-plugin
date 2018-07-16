## postcss-px-multiple-plugin

一个 postcss 的插件，可以把 css 文件中含 `px` 的样式乘以倍数，注意大写的 PX 不会转换。

这个插件对设计稿定义 `pt` 单位，实际 `1pt = 2px` 情况下很有用。另外当 `viewport` 设置成固定值且不为 `device-width` 时，比如 `width=750`，当引入第三方组件中的 css 时候，第三方组件一般都是按 `device-width` 写的尺寸，此时用此插件很好解决问题。

参考自：[postcss-px2rem](https://github.com/songsiqi/px2rem-postcss)

### Usage

wepback 的参考配置如下，gulp 和 grunt 可以自行查询

```
var pxMultiple = require('postcss-px-multiple');

module.exports = {
  module: {
    rules: {
      test: '/*.css/',
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          plugins: [
            require('pxMultiple')({multiple: 2})
          ]
        }
      }]
    }
  }
}

```

效果如下：
```
/* origin file */
body {
  width: 100%;
  height: 20px;
  margin: 10px;
  font-size: 14px;
  border: 1PX solid black;
}


/* output file */
body {
  width: 100%;
  height: 40px;
  margin: 20px;
  font-size: 28px;
  border: 1PX solid black;
}

```

