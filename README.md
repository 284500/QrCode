import {
    encodeData,
    renderer25D,
    rendererRect,
    rendererRound,
    rendererRandRound,
    rendererDSJ,
    rendererRandRect,
    rendererImage,
    rendererResImage,
} from 'beautify-qrcode';
/**
 * 生成二维码数据
 * @param {Object} options
 * @param {String} options.text 二维码内容
 * @param {Number} [options.width]  生成svg的宽度 默认100%
 * @param {Number} [options.height] 生成svg的高度 默认100%
 * @param {Number} [options.correctLevel] 容错率 1=>7% 0 =>15% 3=>25% 2=>30%
 * @param {Boolean} [options.isSpace] 生成内容是否预留空隙 默认true
 */
const qrcode = encodeData({
    text: QRBTF_URL,
    correctLevel: 0,
});
/**
 * A1
 * @param {Object} qrcode
 * @param {Object} options
 * @param {Number} [options.type]  信息点样式 0=>矩形 1=>圆形,2=>随机
 * @param {Number} [options.size] 信息点缩放
 * @param {String} [options.opacity]  信息点不透明度
 * @param {String} [options.posType] 定位点样式 0=>矩形 1=>圆形 2=>行星
 * @param {String} [options.otherColor] 信息点颜色
 * @param {String} [options.posColor] 定位点点颜色
 * @return {String} svg图片
 */
const A1 = rendererRect(qrcode);
/**
 * A2
 * @param {Object} qrcode
 * @param {Object} options
 * @param {Number} [options.type]  信息点样式 0=>矩形 1=>圆形,2=>随机
 * @param {Number} [options.size] 信息点缩放
 * @param {String} [options.opacity]  信息点不透明度
 * @param {String} [options.posType] 定位点样式 0=>矩形 1=>圆形 2=>行星
 * @param {String} [options.otherColor] 信息点颜色
 * @param {String} [options.posColor] 定位点点颜色
 * @return {String} svg图片
 */
const A2 = rendererRound(qrcode);
/**
 * A3
 * @param {Object} qrcode
 * @param {Object} options
 * @param {Number} [options.type]  信息点样式 0=>矩形 1=>圆形,2=>随机
 * @param {Number} [options.size] 信息点缩放
 * @param {String} [options.opacity]  信息点不透明度
 * @param {String} [options.posType] 定位点样式 0=>矩形 1=>圆形 2=>行星
 * @param {String} [options.otherColor] 信息点颜色
 * @param {String} [options.posColor] 定位点点颜色
 * @return {String} svg图片
 */
const A3 = rendererRandRound(qrcode);
/**
 * sp1
 * @param {Object} qrcode
 * @param {Object} options
 * @param {Number} [options.width1]  x 宽度
 * @param {Number} [options.width2]  信息点缩放
 * @param {Number} [options.width3]  定位点宽度
 * @param {String} [options.posType] 定位点样式 0=>矩形 1=>DSJ
 * @return {String} svg图片
 */
const sp1 = rendererDSJ(qrcode);
/**
 * sp2
 * @param {*} qrcode
 * @return {String} svg图片
 */
const sp2 = rendererRandRect(qrcode);
/**
 * B1
 * @param {Object} qrcode
 * @param {Object} options
 * @param {Number} [options.height]  柱体高度
 * @param {Number} [options.height2] 定位点柱体高度
 * @param {String} [options.upColor]  上侧颜色
 * @param {String} [options.leftColor] 左侧颜色
 * @param {String} [options.rightColor] 右侧颜色
 * @return {String} svg图片
 */
const B1 = renderer25D(qrcode);
/**
 * C1
 * @param {*} qrcode
 * @param {*} options
 * @param {String} [options.backgroudImage] 背景图片
 * @param {Number} [options.type] 信息点样式 0=>矩形 1=>圆形
 * @param {Number} [options.size] 信息点缩放
 * @param {Number} [options.opacity] 信息点不透明度
 * @param {String} [options.otherColorDark] 信息点深色
 * @param {String} [options.otherColorLight] 信息点浅色
 * @param {Number} [options.posType]  // 定位点样式 0=>'矩形' 1=>'圆形' 2=>'行星'
 * @param {String} [options.posColor]  // 定位点颜色
 * @return {String} svg图片
 */
const C1 = rendererImage(qrcode, {
    backgroudImage: Rem,
});
/**
 * C2
 * @param {*} qrcode
 * @param {*} options
 * @param {String} options.backgroudImage 背景图片
 * @param {Number} options.contrast 对比度
 * @param {Number} options.exposure 曝光
 * @param {Number} options.alignType 小定位点样式 0=>'无' 1=>'白' 2=>'黑白'
 * @param {Number} options.timingType 时钟样式 0=>'无' 1=>'白' 2=>'黑白'
 * @param {String} options.otherColor 信息点颜色
 * @param {String} options.posColor 定位点颜色
 * @return {Promise<String>}  svg图片
 */
rendererResImage(qrcode, { backgroudImage: defaultResImage }).then((res) => {
    const C2 = res;
});

/**
 * SP_3
 * @param {Object} qrcode
 * @param {Object} options
 * @param {String} [options.otherColor] 圆圈颜色
 * @param {String} [options.posColor] 定位点颜色
 */
const SP_3 = rendererCircle(qrcode);

/**
 * A_a1
 * @param {Object} qrcode
 * @param {Object} options
 * @param {String} [options.type]  连线方向 0=>左右 1=>上下 2=>纵横 3=>回环 4=>左上—右下 5=>右上—左下 6=>交叉"
 * @param {String} [options.size] 连线粗细
 * @param {String} [options.opacity] 连线不透明度
 * @param {String} [options.posType] 定位点样式  0=>矩形 1=>圆形 2=>行星 3=>圆角矩形
 * @param {String} [options.otherColor] 连线颜色
 * @param {String} [options.posColor] 定位点颜色
 */
const A_a1 = rendererLine(qrcode);

/**
 * A_a2
 * @param {Object} qrcode
 * @param {Object} options
 * @param {String} [options.type]  连线方向 0=>左右 1=>上下 2=>纵横 3=>回环 4=>左上—右下 5=>右上—左下 7=>交叉"
 * @param {String} [options.size] 连线粗细
 * @param {String} [options.opacity] 连线不透明度
 * @param {String} [options.posType] 定位点样式  0=>矩形 1=>圆形 2=>行星 3=>圆角矩形
 * @param {String} [options.otherColor] 连线颜色
 * @param {String} [options.posColor] 定位点颜色
 */
const A_a2 = rendererLine2(qrcode);

/**
 * A_b1
 * @param {Object} qrcode
 * @param {Object} options
 * @param {Number} [options.type]  信息点样式 0=>矩形 1=>圆形
 * @param {Number} [options.size] 干扰函数 0=>A 1=>B
 * @param {String} [options.opacity]  信息点不透明度
 * @param {String} [options.posType] 定位点样式  0=>矩形 1=>圆形 2=>行星 3=>圆角矩形
 * @param {String} [options.otherColor] 信息点颜色
 * @param {String} [options.otherColor2] 信息点颜色2
 * @param {String} [options.posColor] 定位点颜色
 */
const A_b1 = rendererFuncA(qrcode);
/**
 * A_b2
 * @param {Object} qrcode
 * @param {Object} options
 * @param {Number} [options.type]  信息点样式 0=>矩形 1=>圆形
 * @param {Number} [options.size] 干扰函数 1=>A 2=>B
 * @param {String} [options.opacity]  信息点不透明度
 * @param {String} [options.posType] 定位点样式  0=>矩形 1=>圆形 2=>行星 3=>圆角矩形
 * @param {String} [options.otherColor] 信息点颜色
 * @param {String} [options.otherColor2] 信息点颜色2
 * @param {String} [options.posColor] 定位点颜色
 */
const A_b2 = rendererFuncB(qrcode);

//新添加4种配置

 * @param {String} [options.backgroundImage] 背景图片
 * @param {String} [options.icon] 图标
 * @param {Number} [options.iconSize] 图标大小
 * @param {String} [options.iconPos] 定位点颜色 center bottom
