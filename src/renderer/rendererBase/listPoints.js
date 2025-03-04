import { getTypeTable, QRPointType } from '../../utils/qrcodeHandler';
import { rand } from '../../utils/util';

export default function listPoints(qrcode, params) {
    if (!qrcode) return [];

    const nCount = qrcode.getModuleCount();
    const typeTable = getTypeTable(qrcode);
    const pointList = new Array(nCount);

    const type = params[0];
    let size = params[1] / 100;
    const opacity = params[2] / 100;
    const posType = params[3];
    let id = 0;
    const otherColor = params[4];
    const posColor = params[5];
    const icon = params[6];
    const iconSize = params[7] / 100;
    const iconPos = params[8];
    const backgroundImage = params[9];


    const vw = [3, -3];
    const vh = [3, -3];

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
    const sq25 =
        'M32.048565,-1.29480038e-15 L67.951435,1.29480038e-15 C79.0954192,-7.52316311e-16 83.1364972,1.16032014 87.2105713,3.3391588 C91.2846454,5.51799746 94.4820025,8.71535463 96.6608412,12.7894287 C98.8396799,16.8635028 100,20.9045808 100,32.048565 L100,67.951435 C100,79.0954192 98.8396799,83.1364972 96.6608412,87.2105713 C94.4820025,91.2846454 91.2846454,94.4820025 87.2105713,96.6608412 C83.1364972,98.8396799 79.0954192,100 67.951435,100 L32.048565,100 C20.9045808,100 16.8635028,98.8396799 12.7894287,96.6608412 C8.71535463,94.4820025 5.51799746,91.2846454 3.3391588,87.2105713 C1.16032014,83.1364972 5.01544207e-16,79.0954192 -8.63200256e-16,67.951435 L8.63200256e-16,32.048565 C-5.01544207e-16,20.9045808 1.16032014,16.8635028 3.3391588,12.7894287 C5.51799746,8.71535463 8.71535463,5.51799746 12.7894287,3.3391588 C16.8635028,1.16032014 20.9045808,7.52316311e-16 32.048565,-1.29480038e-15 Z';
    if (size <= 0) size = 1.0;
    //添加背景图
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
            if(x>=iconPosX && x<iconPosX+iconW && y>=iconPosY && y<iconPosY+iconW&&icon){

            }else{
                if (qrcode.isDark(x, y) === false) continue;

            if (
                typeTable[x][y] === QRPointType.ALIGN_CENTER ||
                typeTable[x][y] === QRPointType.ALIGN_OTHER ||
                typeTable[x][y] === QRPointType.TIMING
            ) {
                if (type === 0)
                    pointList.push(
                        `<rect
                            opacity="${opacity}"
                            width="${size}"
                            height="${size}"
                            key="${id++}"
                            fill="${otherColor}"
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
                            fill="${otherColor}"
                            cx="${x + 0.5}"
                            cy="${y + 0.5}"
                        />`
                    );
                else if (type === 2)
                    pointList.push(
                        `<circle
                            key="${id++}"
                            opacity="${opacity}"
                            fill="${otherColor}"
                            cx="${x + 0.5}"
                            cy="${y + 0.5}"
                            r="${size / 2}"
                        />`
                    );
            } else if (typeTable[x][y] === QRPointType.POS_CENTER) {
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
                } else if (posType === 3) {
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
                        `<path
                            key="${id++}"
                            d="${sq25}"
                            stroke="${posColor}"
                            stroke-width="${(100 / 6) * (1 - (1 - size) * 0.75)}"
                            fill="none"
                            transform="${'translate(' +
                        String(x - 2.5) +
                        ',' +
                        String(y - 2.5) +
                        ') ' +
                        'scale(' +
                        String(6 / 100) +
                        ',' +
                        String(6 / 100) +
                        ')'
                        }"
                        />`
                    );
                }
            } else if (typeTable[x][y] === QRPointType.POS_OTHER) {
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
                if (type === 0)
                    pointList.push(
                        `<rect
                            opacity="${opacity}"
                            width="${size}"
                            height="${size}"
                            key="${id++}"
                            fill="${otherColor}"
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
                            fill="${otherColor}"
                            cx="${x + 0.5}"
                            cy="${y + 0.5}"
                        />`
                    );
                else if (type === 2)
                    pointList.push(
                        `<circle
                            opacity="${opacity}"
                            key="${id++}"
                            fill="${otherColor}"
                            cx="${x + 0.5}"
                            cy="${y + 0.5}"
                            r="${0.5 * rand(0.33, 1.0)}"
                        />`
                    );
            }
            }

            
        }
    }
    //添加图标
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
                    clip-path="url(#clip)"
                    preserveAspectRatio="none"
                />
                <defs>
                    <clipPath id="clip">
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
                clip-path="url(#clip)"
                preserveAspectRatio="none"
                />
                <defs>
                <clipPath id="clip">
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
