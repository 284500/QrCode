import { getTypeTable, QRPointType } from '../../utils/qrcodeHandler';

export default function listPoints(qrcode, params) {
    if (!qrcode) return [];

    const nCount = qrcode.getModuleCount();
    const typeTable = getTypeTable(qrcode);
    const pointList = new Array(nCount);

    const backgroundImage = params[0];
    const type = params[1];
    let size = params[2] / 100 / 3;
    const opacity = params[3] / 100;
    const otherColorDark = params[4];
    const otherColorLight = params[5];
    const posType = params[6];
    const posColor = params[7];
    const icon = params[8];
    const iconSize = params[9] / 100;
    const iconPos = params[10];
    let id = 0;

    const vw = [3, -3];
    const vh = [3, -3];

     //设置图标的位置信息
     let iconPosX = 0;
     let iconPosY = 0;
     let iconW = 0;
     if (iconPos === 'bottom') {
         iconPosX = Math.floor(nCount - iconSize * nCount);
          iconPosY = Math.floor(nCount - iconSize * nCount);
          iconW = Math.ceil(nCount * iconSize);
       }else {
          iconPosX = Math.floor(nCount / 2 - iconSize / 2 * nCount)
          iconPosY = Math.floor(nCount / 2 - iconSize / 2 * nCount);
          iconW = nCount - Math.floor(nCount / 2 - iconSize / 2 * nCount) * 2
       }
 

    if (size <= 0) size = 1.0;
    if (backgroundImage){
        pointList.push(
            `<image
                key="${id++}"
                x="0"
                y="0"
                width="${nCount}"
                height="${nCount}"
                xlink:href="${params[0]}"
            />`
        );
    }


    for (let x = 0; x < nCount; x++) {
        for (let y = 0; y < nCount; y++) {
            if(x>=iconPosX && x<iconPosX+iconW && y>=iconPosY && y<iconPosY+iconW){

            }else{
                if (
                    typeTable[x][y] === QRPointType.ALIGN_CENTER ||
                    typeTable[x][y] === QRPointType.ALIGN_OTHER ||
                    typeTable[x][y] === QRPointType.TIMING
                ) {
                    if (qrcode.isDark(x, y)) {
                        if (type === 0)
                            pointList.push(
                                `<rect
                                    opacity="${opacity}"
                                    width="${size}"
                                    height="${size}"
                                    key="${id++}"
                                    fill="${otherColorDark}"
                                    x="${x + (1 - size) / 2}"
                                    y="${y + (1 - size) / 2}"
                                />`
                            );
                        else if (type === 1)
                            pointList.push(
                                `<circle
                                    opacity="${opacity}"
                                    r="${size / 2}"
                                    key="${id++}"
                                    fill="${otherColorDark}"
                                    cx="${x + 0.5}"
                                    cy="${y + 0.5}"
                                />`
                            );
                    } else {
                        if (type === 0)
                            pointList.push(
                                `<rect
                                    opacity="${opacity}"
                                    width="${size}"
                                    height="${size}"
                                    key="${id++}"
                                    fill="${otherColorLight}"
                                    x="${x + (1 - size) / 2}"
                                    y="${y + (1 - size) / 2}"
                                />`
                            );
                        else if (type === 1)
                            pointList.push(
                               `<circle
                                    opacity="${opacity}"
                                    r="${size / 2}"
                                    key="${id++}"
                                    fill="${otherColorLight}"
                                    cx="${x + 0.5}"
                                    cy="${y + 0.5}"
                                />`
                            );
                    }
                } else if (typeTable[x][y] === QRPointType.POS_CENTER) {
                    if (qrcode.isDark(x, y)) {
                        if (posType === 0) {
                            pointList.push(
                                `<rect
                                    width="${1}"
                                    height="${1}"
                                    key="${id++}"
                                    fill="${posColor}"
                                    x="${x}"
                                    y="${y}"
                                />`
                            );
                        } else if (posType === 1) {
                            pointList.push(
                                `<circle
                                    key="${id++}"
                                    fill="white"
                                    cx="${x + 0.5}"
                                    cy="${y + 0.5}"
                                    r="${5}"
                                />`
                            );
                            pointList.push(
                                `<circle
                                    key="${id++}"
                                    fill="${posColor}"
                                    cx="${x + 0.5}"
                                    cy="${y + 0.5}"
                                    r="${1.5}"
                                />`
                            );
                            pointList.push(
                                `<circle
                                    key="${id++}"
                                    fill="none"
                                    stroke-width="1"
                                    stroke="${posColor}"
                                    cx="${x + 0.5}"
                                    cy="${y + 0.5}"
                                    r="${3}"
                                />`
                            );
                        } else if (posType === 2) {
                            pointList.push(
                               `<circle
                                    key="${id++}"
                                    fill="white"
                                    cx="${x + 0.5}"
                                    cy="${y + 0.5}"
                                    r="${5}"
                                />`
                            );
                            pointList.push(
                                `<circle
                                    key="${id++}"
                                    fill="${posColor}"
                                    cx="${x + 0.5}"
                                    cy="${y + 0.5}"
                                    r="${1.5}"
                                />`
                            );
                            pointList.push(
                                `<circle
                                    key="${id++}"
                                    fill="none"
                                    stroke-width="0.15"
                                    stroke-dasharray="0.5,0.5"
                                    stroke="${posColor}"
                                    cx="${x + 0.5}"
                                    cy="${y + 0.5}"
                                    r="${3}"
                                />`
                            );
                            for (let w = 0; w < vw.length; w++) {
                                pointList.push(
                                    `<circle
                                        key="${id++}"
                                        fill="${posColor}"
                                        cx="${x + vw[w] + 0.5}"
                                        cy="${y + 0.5}"
                                        r="${0.5}"
                                    />`
                                );
                            }
                            for (let h = 0; h < vh.length; h++) {
                                pointList.push(
                                    `<circle
                                        key="${id++}"
                                        fill="${posColor}"
                                        cx="${x + 0.5}"
                                        cy="${y + vh[h] + 0.5}"
                                        r="${0.5}"
                                    />`
                                );
                            }
                        }
                    }
                } else if (typeTable[x][y] === QRPointType.POS_OTHER) {
                    if (qrcode.isDark(x, y)) {
                        if (posType === 0) {
                            pointList.push(
                                `<rect
                                    width="${1}"
                                    height="${1}"
                                    key="${id++}"
                                    fill="${posColor}"
                                    x="${x}"
                                    y="${y}"
                                />`
                            );
                        }
                    } else {
                        if (posType === 0) {
                            pointList.push(
                                `<rect
                                    width="${1}"
                                    height="${1}"
                                    key="${id++}"
                                    fill="white"
                                    x="${x}"
                                    y="${y}"
                                />`
                            );
                        }
                    }
                } else {
                    if (qrcode.isDark(x, y)) {
                        if (type === 0)
                            pointList.push(
                                `<rect
                                    opacity="${opacity}"
                                    width="${size}"
                                    height="${size}"
                                    key="${id++}"
                                    fill="${otherColorDark}"
                                    x="${x + (1 - size) / 2}"
                                    y="${y + (1 - size) / 2}"
                                />`
                            );
                        else if (type === 1)
                            pointList.push(
                                `<circle
                                    opacity="${opacity}"
                                    r="${size / 2}"
                                    key="${id++}"
                                    fill="${otherColorDark}"
                                    cx="${x + 0.5}"
                                    cy="${y + 0.5}"
                                />`
                            );
                    } else {
                        if (type === 0)
                            pointList.push(
                                `<rect
                                    opacity="${opacity}"
                                    width="${size}"
                                    height="${size}"
                                    key="${id++}"
                                    fill="${otherColorLight}"
                                    x="${x + (1 - size) / 2}"
                                    y="${y + (1 - size) / 2}"
                                />`
                            );
                        else if (type === 1)
                            pointList.push(
                                `<circle
                                    opacity="${opacity}"
                                    r="${size / 2}"
                                    key="${id++}"
                                    fill="${otherColorLight}"
                                    cx="${x + 0.5}"
                                    cy="${y + 0.5}"
                                />`
                            );
                    }
                }
            }
            
           
        }
    }

    if (icon) {
        if (iconPos === 'bottom') {


            pointList.push(
                `<rect
                    key="${id++}"
                    x="${Math.floor(nCount - iconSize * nCount)}"
                    y="${Math.floor(nCount - iconSize * nCount)}"
                    width="${Math.ceil(nCount * iconSize)}"
                    height="${Math.ceil(nCount * iconSize)}"
                    rx="1" 
                    ry="1"
                />`
            );
            pointList.push(
                `<image
                    key="${id++}"
                    x="${Math.floor(nCount - iconSize * nCount) + Math.ceil(nCount * iconSize) / 2 - nCount * iconSize / 2}"
                    y="${Math.floor(nCount - iconSize * nCount) + Math.ceil(nCount * iconSize) / 2 - nCount * iconSize / 2}"
                    width="${nCount * iconSize}"
                    height="${nCount * iconSize}"
                    xlink:href="${icon}"
                    clip-path="url(#clipImage)"
                    preserveAspectRatio="none"
                />
                <defs>
                    <clipPath id="clipImage">
                    <rect
                    x="${Math.floor(nCount - iconSize * nCount) + Math.ceil(nCount * iconSize) / 2 - nCount * iconSize / 2}"
                    y="${Math.floor(nCount - iconSize * nCount) + Math.ceil(nCount * iconSize) / 2 - nCount * iconSize / 2}"
                    width="${nCount * iconSize}"
                    height="${nCount * iconSize}"
                     rx="1" ry="1"/>
                     </clipPath>
                </defs>`
            );
        } else {
            pointList.push(
                `<rect
                    key="${id++}"
                    x="${Math.floor(nCount / 2 - iconSize / 2 * nCount)}"
                    y="${Math.floor(nCount / 2 - iconSize / 2 * nCount)}"
                    width="${nCount - Math.floor(nCount / 2 - iconSize / 2 * nCount) * 2}"
                    height="${nCount - Math.floor(nCount / 2 - iconSize / 2 * nCount) * 2}"
                    rx="1"
                    ry="1"
                />
                `
            );
            pointList.push(
                `<image
                key="${id++}"
                x="${nCount / 2 - iconSize / 2 * nCount}"
                y="${nCount / 2 - iconSize / 2 * nCount}"
                width="${nCount * iconSize}"
                height="${nCount * iconSize}"
                xlink:href="${icon}"
                clip-path="url(#clipImage)"
                preserveAspectRatio="none"
                />
                <defs>
                <clipPath id="clipImage">
                <rect
                x="${nCount / 2 - iconSize / 2 * nCount}"
                y="${nCount / 2 - iconSize / 2 * nCount}"
                width="${nCount * iconSize}"
                height="${nCount * iconSize}"
                rx="1" ry="1"/>
                </clipPath>
            </defs>`
            );
        }

    }

    return pointList;
}
