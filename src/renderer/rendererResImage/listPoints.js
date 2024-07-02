import { getTypeTable, QRPointType } from '../../utils/qrcodeHandler';

export default function listPoints(qrcode, params) {
    if (!qrcode) return [];

    const nCount = qrcode.getModuleCount();
    const typeTable = getTypeTable(qrcode);
    const pointList = new Array(nCount);
    const alignType = params[3];
    const timingType = params[4];
    const posColor = params[6];
    const icon = params[7];
    const iconSize = params[8] / 100;
    const iconPos = params[9];
    const backgroundImage = params[10];
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

    let id = 0;
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
    for (let x = 0; x < nCount; x++) {
        for (let y = 0; y < nCount; y++) {
            const posX = 3 * x;
            const posY = 3 * y;
            if (
                typeTable[x][y] === QRPointType.ALIGN_CENTER ||
                typeTable[x][y] === QRPointType.ALIGN_OTHER
            ) {
                if (qrcode.isDark(x, y)) {
                    if (alignType === 2) {
                        pointList.push(
                            `<use
                                key="${id++}"
                                xlink:href="#B-black"
                                x="${posX - 0.03}"
                                y="${posY - 0.03}"
                            />`
                        );
                    } else {
                        pointList.push(
                            `<use
                                key="${id++}"
                                xlink:href="#S-black"
                                x="${posX + 1 - 0.01}"
                                y="${posY + 1 - 0.01}"
                            />`
                        );
                    }
                } else {
                    if (alignType === 0) {
                        pointList.push(
                            `<use
                                key="${id++}"
                                xlink:href="#S-white"
                                x="${posX + 1}"
                                y='${posY + 1}'
                            />`
                        );
                    } else {
                        pointList.push(
                            `<use
                                key="${id++}"
                                xlink:href="#B-white"
                                x="${posX - 0.03}"
                                y="${posY - 0.03}"
                            />`
                        );
                    }
                }
            } else if (typeTable[x][y] === QRPointType.TIMING) {
                if (qrcode.isDark(x, y)) {
                    if (timingType === 2) {
                        pointList.push(
                            `<use
                                key="${id++}"
                                xlink:href="#B-black"
                                x="${posX - 0.03}"
                                y="${posY - 0.03}"
                            />`
                        );
                    } else {
                        pointList.push(
                            `<use
                                key="${id++}"
                                xlink:href="#S-black"
                                x="${posX + 1}"
                                y="${posY + 1}"
                            />`
                        );
                    }
                } else {
                    if (timingType === 0) {
                        pointList.push(
                            `<use
                                key="${id++}"
                                xlink:href="#S-white"
                                x="${posX + 1}"
                                y="${posY + 1}"
                            />`
                        );
                    } else {
                        pointList.push(
                            `<use
                                key="${id++}"
                                xlink:href="#B-white"
                                x="${posX - 0.03}"
                                y="${posY - 0.03}"
                            />`
                        );
                    }
                }
            } else if (typeTable[x][y] === QRPointType.POS_CENTER) {
                if (qrcode.isDark(x, y)) {
                    pointList.push(
                        `<use
                            key="${id++}"
                            fill="${posColor}"
                            xlink:href="#B"
                            x="${posX - 0.03}"
                            y="${posY - 0.03}"
                        />`
                    );
                }
            } else if (typeTable[x][y] === QRPointType.POS_OTHER) {
                if (qrcode.isDark(x, y)) {
                    pointList.push(
                        `<use
                            key="${id++}"
                            fill="${posColor}"
                            xlink:href="#B"
                            x="${posX - 0.03}"
                            y="${posY - 0.03}"
                        />`
                    );
                } else {
                    pointList.push(
                        `<use
                            key="${id++}"
                            xlink:href="#B-white"
                            x="${posX - 0.03}"
                            y="${posY - 0.03}"
                        />`
                    );
                }
            } else {
                if (qrcode.isDark(x, y)) {
                    pointList.push(
                        `<use
                            key="${id++}"
                            xlink:href="#S-black"
                            x="${posX + 1}"
                            y="${posY + 1}"
                        />`
                    );
                }
            }
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
