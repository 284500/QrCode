import { rand } from '../../utils/util';

export default function listPoints(qrcode, params) {
    if (!qrcode) return [];

    const nCount = qrcode.getModuleCount();
    const pointList = [];
    let width2 = params[0] / 100;
    let width1 = params[1] / 100;
    const width3 = params[2] / 100;
    const posType = params[3];
    const icon = params[4];
    const iconSize = params[5] / 100;
    const iconPos = params[6];
    const backgroundImage = params[7];

    if (width2 <= 0) width2 = 70;
    if (width1 <= 0) width1 = 70;

    let id = 0;
      //设置图标的位置信息
      let iconPosX = 0;
      let iconPosY = 0;
      let iconW = 0;
      if(icon){
          if (iconPos === 'bottom' ) {
              iconPosX = Math.floor(nCount - iconSize * nCount);
               iconPosY = Math.floor(nCount - iconSize * nCount);
               iconW = Math.ceil(nCount * iconSize);
            }else {
               iconPosX = Math.floor(nCount / 2 - iconSize / 2 * nCount)
               iconPosY = Math.floor(nCount / 2 - iconSize / 2 * nCount);
               iconW = nCount - Math.floor(nCount / 2 - iconSize / 2 * nCount) * 2
            }
          }

    const randArr = [];
    if (backgroundImage) {
        pointList.push(
            `<image
                key="${id++}"
                x="0"
                y="0"
                width="${nCount}"
                height="${nCount}"
                xlink:href="${backgroundImage}"
            />`
        );
    }
    for (let row = 0; row < nCount; row++) {
        for (let col = 0; col < nCount; col++) {
            randArr.push([row, col]);
        }
    }
    randArr.sort(function () {
        return 0.5 - Math.random();
    });

    for (let i = 0; i < randArr.length; i++) {
        const row = randArr[i][0];
        const col = randArr[i][1];
        if (qrcode.isDark(row, col)) {
            const tempRand = rand(0.8, 1.3);
            const randNum = rand(50, 230);
            const tempRGB = [
                'rgb(' +
                    Math.floor(20 + randNum) +
                    ',' +
                    Math.floor(170 - randNum / 2) +
                    ',' +
                    Math.floor(60 + randNum * 2) +
                    ')',
                'rgb(' +
                    Math.floor(-20 + randNum) +
                    ',' +
                    Math.floor(130 - randNum / 2) +
                    ',' +
                    Math.floor(20 + randNum * 2) +
                    ')',
            ];
            const width = 0.15;
            pointList.push(
                `<rect
                    key="${id++}"
                    opacity="0.9"
                    fill="${tempRGB[1]}"
                    width="${1 * tempRand + width}"
                    height="${1 * tempRand + width}"
                    x="${row - (tempRand - 1) / 2}"
                    y="${col - (tempRand - 1) / 2}"
                />`
            );
            pointList.push(
                `<rect
                    key="${id++}"
                    fill="${tempRGB[0]}"
                    width="${1 * tempRand}"
                    height="${1 * tempRand}"
                    x="${row - (tempRand - 1) / 2}"
                    y="${col - (tempRand - 1) / 2}"
                />`
            );
        }
    }
    if (icon) {
        if (iconPos === 'bottom') {
           

            pointList.push(
                `<rect
                    key="${id++}"
                    x="${Math.floor(nCount-iconSize*nCount)}"
                    y="${Math.floor(nCount-iconSize*nCount)}"
                    width="${Math.ceil(nCount*iconSize)}"
                    height="${Math.ceil(nCount*iconSize)}"
                />`
            );
            pointList.push(
                `<image
                    key="${id++}"
                    x="${nCount-iconSize*nCount}"
                    y="${nCount-iconSize*nCount}"
                    width="${nCount*iconSize}"
                    height="${nCount*iconSize}"
                    xlink:href="${icon}"
                />`
            );
        } else{
            pointList.push(
                `<rect
                    key="${id++}"
                    x="${Math.floor(nCount/2-iconSize/2*nCount)}"
                    y="${Math.floor(nCount/2-iconSize/2*nCount)}"
                    width="${nCount-Math.floor(nCount/2-iconSize/2*nCount)*2}"
                    height="${nCount-Math.floor(nCount/2-iconSize/2*nCount)*2}"
                />`
            );
            pointList.push(
                `<image
                    key="${id++}"
                    x="${nCount/2-iconSize/2*nCount}"
                    y="${nCount/2-iconSize/2*nCount}"
                    width="${nCount*iconSize}"
                    height="${nCount*iconSize}"
                    xlink:href="${icon}"
                />`
            );
        }
       
    }
    return pointList;
}
