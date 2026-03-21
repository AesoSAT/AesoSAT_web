const gameState = {},
      PADDING = 20,
      HEIGHT = 791,
      WIDTH = 1536,
      IHEIGHT = HEIGHT - 2*PADDING,
      IWIDTH = WIDTH - 2*PADDING,
      MARGIN = 10,
      SWIDTH = (IWIDTH - 5*MARGIN) / 6,
      SHEIGHT = (IHEIGHT - 2*MARGIN) / 3,
      DHTTHERMOMETERRANGEMIN = -20,
      DHTTHERMOMETERRANGEMAX = 50,
      BMPTHERMOMETERRANGEMIN = -20,
      BMPTHERMOMETERRANGEMAX = 50,
      BMPPRESSURERANGEMIN = 500,
      BMPPRESSURERANGEMAX = 1100;
var graphics, DHTHUMIDITYgraphics, BMPPRESSUREgraphics;

function createSection(c, options){
    // Creating the whole section --> options[FROM 0-4]=sectionname,xindex,yindex,wmultiplier,hmultiplier
    gameState[options[0]] = c.add.rectangle(PADDING + SWIDTH*options[1] + MARGIN*options[1], PADDING + SHEIGHT*options[2] + MARGIN*options[2], SWIDTH*options[3] + MARGIN*(options[3]-1), SHEIGHT*options[4] + MARGIN*(options[4]-1), 0x00000a);
    gameState[options[0]].setOrigin(0, 0);
    gameState[options[0]].setStrokeStyle(1, 0xfffffa, 1);
    // Creating the header --> options[5]=titletext
    gameState[`${options[0]}_h`] = c.add.rectangle(PADDING + SWIDTH*options[1] + MARGIN*options[1], PADDING + SHEIGHT*options[2] + MARGIN*options[2], SWIDTH*options[3] + MARGIN*(options[3]-1), SHEIGHT*0.2, 0x00000a);
    gameState[`${options[0]}_h`].setOrigin(0, 0);
    gameState[`${options[0]}_h`].setStrokeStyle(1, 0xfffffa, 1);
    gameState[`${options[0]}_ht`] = c.add.text(PADDING + (SWIDTH*options[1]) + (SWIDTH*options[3])/2 + MARGIN*options[1], PADDING + (SHEIGHT*options[2]) + SHEIGHT*0.1 + MARGIN*options[2], options[5], {fill: "#fffffa", fontSize: "20px"});
    gameState[`${options[0]}_ht`].setOrigin(.5, .5);
    // Create graphics
    graphics = c.add.graphics();
    DHTHUMIDITYgraphics = c.add.graphics();
    BMPPRESSUREgraphics = c.add.graphics();
    // Creating section by section
    switch(options[0]){
        case 'dht': (function(){
            // Thermometer layout
            graphics.lineStyle(1, 0xfffffa, 1);
            graphics.beginPath();
            gameState['DHT_THERMOMETER_BOTTOM_ARC'] = graphics.arc(PADDING + (SWIDTH*options[1]) + (SWIDTH*options[3])/4 + MARGIN*options[1], (SHEIGHT*options[2]) + SHEIGHT*(0.2+0.8*0.75), 10, Phaser.Math.DegToRad(303.75), Phaser.Math.DegToRad(236.25), false);
            graphics.strokePath();
            // X and Y points
            let Xbl = (PADDING + (SWIDTH*options[1]) + (SWIDTH*options[3])/4 + MARGIN*options[1]) + 10 * Math.cos(Phaser.Math.DegToRad(236.25));
            let Ybl = ((SHEIGHT*options[2]) + SHEIGHT*(0.2 + 0.8*0.75)) + 10 * Math.sin(Phaser.Math.DegToRad(236.25));
            let Xbr = (PADDING + (SWIDTH*options[1]) + (SWIDTH*options[3])/4 + MARGIN*options[1]) + 10 * Math.cos(Phaser.Math.DegToRad(303.75));
            let Ybr = ((SHEIGHT*options[2]) + SHEIGHT*(0.2 + 0.8*0.75)) + 10 * Math.sin(Phaser.Math.DegToRad(303.75));
            let Xtl = (PADDING + (SWIDTH*options[1]) + (SWIDTH*options[3])/4 + MARGIN*options[1]) + (10 * Math.sin((3/16) * Math.PI)) * Math.cos(Math.PI);
            let Ytl = ((SHEIGHT*options[2]) + SHEIGHT*(0.2 + 0.25*0.75)) + (10 * Math.sin((3/16) * Math.PI)) * Math.sin(Math.PI);
            let Xtr = (PADDING + (SWIDTH*options[1]) + (SWIDTH*options[3])/4 + MARGIN*options[1]) + (10 * Math.sin((3/16) * Math.PI)) * Math.cos(0);
            let Ytr = ((SHEIGHT*options[2]) + SHEIGHT*(0.2 + 0.25*0.75)) + (10 * Math.sin((3/16) * Math.PI)) * Math.sin(0);
            graphics.beginPath();
            gameState['DHT_THERMOMETER_LEFT_LINE'] = graphics.lineBetween(Xbl, Ybl, Xtl, Ytl);
            gameState['DHT_THERMOMETER_RIGHT_LINE'] = graphics.lineBetween(Xbr, Ybr, Xtr, Ytr);
            graphics.beginPath();
            gameState['DHT_THERMOMETER_TOP_ARC'] = graphics.arc(PADDING + (SWIDTH*options[1]) + (SWIDTH*options[3])/4 + MARGIN*options[1], (SHEIGHT*options[2]) + SHEIGHT*(0.2+0.25*0.75), 10*Math.sin((3/16)*Math.PI), Phaser.Math.DegToRad(180), Phaser.Math.DegToRad(0), false);
            graphics.strokePath();
            // Thermometer fill
            gameState['DHT_THERMOMETER_FILL_BOTTOM_CIRCLE'] = c.add.circle(PADDING + (SWIDTH*options[1]) + (SWIDTH*options[3])/4 + MARGIN*options[1], (SHEIGHT*options[2]) + SHEIGHT*(0.2+0.8*0.75), 7);
            gameState['DHT_THERMOMETER_FILL_BOTTOM_CIRCLE'].setOrigin(.5, .5);
            gameState['DHT_THERMOMETER_FILL_BOTTOM_CIRCLE'].setStrokeStyle(1, 0xfa0000, 1);
            gameState['DHT_THERMOMETER_FILL_BOTTOM_CIRCLE'].setFillStyle(0xfa0000, 1);
            gameState['DHT_THERMOMETER_FILL_RECTANGLE'] = c.add.rectangle(PADDING + (SWIDTH*options[1]) + (SWIDTH*options[3])/4 + MARGIN*options[1], (SHEIGHT*options[2]) + SHEIGHT*(0.2+0.8*0.75), 10*Math.sin((3/16)*Math.PI)-0.5, 0);
            gameState['DHT_THERMOMETER_FILL_RECTANGLE'].setOrigin(.5, 1);
            gameState['DHT_THERMOMETER_FILL_RECTANGLE'].setStrokeStyle(1, 0xfa0000, 1);
            gameState['DHT_THERMOMETER_FILL_RECTANGLE'].setFillStyle(0xfa0000, 1);
            gameState['DHT_THERMOMETER_FILL_TOP_CIRCLE'] = c.add.circle(PADDING + (SWIDTH*options[1]) + (SWIDTH*options[3])/4 + MARGIN*options[1], (SHEIGHT*options[2]) + SHEIGHT*(0.2+0.8*0.75), (10*Math.sin((3/16)*Math.PI)-1.5)/2);
            gameState['DHT_THERMOMETER_FILL_TOP_CIRCLE'].setOrigin(.5, .5);
            gameState['DHT_THERMOMETER_FILL_TOP_CIRCLE'].setStrokeStyle(1, 0xfa0000, 1);
            gameState['DHT_THERMOMETER_FILL_TOP_CIRCLE'].setFillStyle(0xfa0000, 1);
            // Thermometer text
            gameState['DHT_THERMOMETER_TEXT'] = c.add.text(PADDING + (SWIDTH*options[1]) + (SWIDTH*options[3])/4 + MARGIN*options[1], (SHEIGHT*options[2]) + SHEIGHT*(0.2+0.8*0.75+0.8*0.25*0.75), "-20 ºC", {fill: "#fffffa", fontSize: "15px"});
            gameState['DHT_THERMOMETER_TEXT'].setOrigin(.5, .5);
            //Humidity layout
            graphics.beginPath();
            gameState['DHT_HUMIDITY_ARC'] = graphics.arc(PADDING + (SWIDTH*options[1]) + (SWIDTH*options[3])/4*2.65 + MARGIN*options[1], (SHEIGHT*options[2]) + SHEIGHT*(0.2+0.8*0.75) + 10 - 65*Math.sin(Phaser.Math.DegToRad(135)), 65, Phaser.Math.DegToRad(135), Phaser.Math.DegToRad(45), false);
            graphics.strokePath();
            function BMPPressureArcX(a,r){
                return (PADDING + (SWIDTH*options[1]) + (SWIDTH*options[3])/4*2.65 + MARGIN*options[1] + r*Math.cos(Phaser.Math.DegToRad(a)));
            }
            function BMPPressureArcY(a,r){
                return (PADDING + ((SHEIGHT*options[2]) + SHEIGHT*(0.2+0.8*0.75) + 10 - Math.sqrt(2)*65*Math.sin(Phaser.Math.DegToRad(135)) - r*Math.sin(Phaser.Math.DegToRad(a))));
            }
            graphics.beginPath();
            for(let i=0;i<11;i++){
                gameState[`DHT_HUMIDITY_LINE_${i}`] = graphics.lineBetween(BMPPressureArcX(220-26*i, 65), BMPPressureArcY(220-26*i, 65), BMPPressureArcX(220-26*i, 55), BMPPressureArcY(220-26*i, 55));
            }
            graphics.strokePath();
            gameState['DHT_HUMIDITY_TEXT'] = c.add.text(PADDING + (SWIDTH*options[1]) + (SWIDTH*options[3])/4*2.65 + MARGIN*options[1], (SHEIGHT*options[2]) + SHEIGHT*(0.2+0.8*0.75+0.8*0.25*0.75), "0 %", {fill: "#fffffa", fontSize: "15px"});
            gameState['DHT_HUMIDITY_TEXT'].setOrigin(.5, .5);
        })();
        break;
        case 'bmp1': (function(){
            gameState['BMP1_AESOSAT'] = c.add.image(100, 100, 'aesosat');
        })();
        break;
        case 'bmp2': (function(){
            // Thermometer layout
            graphics.lineStyle(1, 0xfffffa, 1);
            graphics.beginPath();
            gameState['BMP2_THERMOMETER_BOTTOM_ARC'] = graphics.arc(PADDING + (SWIDTH*options[1]) + (SWIDTH*options[3])/4 + MARGIN*options[1], (SHEIGHT*options[2]) + SHEIGHT*(0.2+0.8*0.75), 10, Phaser.Math.DegToRad(303.75), Phaser.Math.DegToRad(236.25), false);
            graphics.strokePath();
            // X and Y points
            let Xbl = (PADDING + (SWIDTH*options[1]) + (SWIDTH*options[3])/4 + MARGIN*options[1]) + 10 * Math.cos(Phaser.Math.DegToRad(236.25));
            let Ybl = ((SHEIGHT*options[2]) + SHEIGHT*(0.2 + 0.8*0.75)) + 10 * Math.sin(Phaser.Math.DegToRad(236.25));
            let Xbr = (PADDING + (SWIDTH*options[1]) + (SWIDTH*options[3])/4 + MARGIN*options[1]) + 10 * Math.cos(Phaser.Math.DegToRad(303.75));
            let Ybr = ((SHEIGHT*options[2]) + SHEIGHT*(0.2 + 0.8*0.75)) + 10 * Math.sin(Phaser.Math.DegToRad(303.75));
            let Xtl = (PADDING + (SWIDTH*options[1]) + (SWIDTH*options[3])/4 + MARGIN*options[1]) + (10 * Math.sin((3/16) * Math.PI)) * Math.cos(Math.PI);
            let Ytl = ((SHEIGHT*options[2]) + SHEIGHT*(0.2 + 0.25*0.75)) + (10 * Math.sin((3/16) * Math.PI)) * Math.sin(Math.PI);
            let Xtr = (PADDING + (SWIDTH*options[1]) + (SWIDTH*options[3])/4 + MARGIN*options[1]) + (10 * Math.sin((3/16) * Math.PI)) * Math.cos(0);
            let Ytr = ((SHEIGHT*options[2]) + SHEIGHT*(0.2 + 0.25*0.75)) + (10 * Math.sin((3/16) * Math.PI)) * Math.sin(0);
            graphics.beginPath();
            gameState['BMP2_THERMOMETER_LEFT_LINE'] = graphics.lineBetween(Xbl, Ybl, Xtl, Ytl);
            gameState['BMP2_THERMOMETER_RIGHT_LINE'] = graphics.lineBetween(Xbr, Ybr, Xtr, Ytr);
            graphics.beginPath();
            gameState['BMP2_THERMOMETER_TOP_ARC'] = graphics.arc(PADDING + (SWIDTH*options[1]) + (SWIDTH*options[3])/4 + MARGIN*options[1], (SHEIGHT*options[2]) + SHEIGHT*(0.2+0.25*0.75), 10*Math.sin((3/16)*Math.PI), Phaser.Math.DegToRad(180), Phaser.Math.DegToRad(0), false);
            graphics.strokePath();
            // Thermometer fill
            gameState['BMP2_THERMOMETER_FILL_BOTTOM_CIRCLE'] = c.add.circle(PADDING + (SWIDTH*options[1]) + (SWIDTH*options[3])/4 + MARGIN*options[1], (SHEIGHT*options[2]) + SHEIGHT*(0.2+0.8*0.75), 7);
            gameState['BMP2_THERMOMETER_FILL_BOTTOM_CIRCLE'].setOrigin(.5, .5);
            gameState['BMP2_THERMOMETER_FILL_BOTTOM_CIRCLE'].setStrokeStyle(1, 0xfa0000, 1);
            gameState['BMP2_THERMOMETER_FILL_BOTTOM_CIRCLE'].setFillStyle(0xfa0000, 1);
            gameState['BMP2_THERMOMETER_FILL_RECTANGLE'] = c.add.rectangle(PADDING + (SWIDTH*options[1]) + (SWIDTH*options[3])/4 + MARGIN*options[1], (SHEIGHT*options[2]) + SHEIGHT*(0.2+0.8*0.75), 10*Math.sin((3/16)*Math.PI)-0.5, 0);
            gameState['BMP2_THERMOMETER_FILL_RECTANGLE'].setOrigin(.5, 1);
            gameState['BMP2_THERMOMETER_FILL_RECTANGLE'].setStrokeStyle(1, 0xfa0000, 1);
            gameState['BMP2_THERMOMETER_FILL_RECTANGLE'].setFillStyle(0xfa0000, 1);
            gameState['BMP2_THERMOMETER_FILL_TOP_CIRCLE'] = c.add.circle(PADDING + (SWIDTH*options[1]) + (SWIDTH*options[3])/4 + MARGIN*options[1], (SHEIGHT*options[2]) + SHEIGHT*(0.2+0.8*0.75), (10*Math.sin((3/16)*Math.PI)-1.5)/2);
            gameState['BMP2_THERMOMETER_FILL_TOP_CIRCLE'].setOrigin(.5, .5);
            gameState['BMP2_THERMOMETER_FILL_TOP_CIRCLE'].setStrokeStyle(1, 0xfa0000, 1);
            gameState['BMP2_THERMOMETER_FILL_TOP_CIRCLE'].setFillStyle(0xfa0000, 1);
            // Thermometer text
            gameState['BMP2_THERMOMETER_TEXT'] = c.add.text(PADDING + (SWIDTH*options[1]) + (SWIDTH*options[3])/4 + MARGIN*options[1], (SHEIGHT*options[2]) + SHEIGHT*(0.2+0.8*0.75+0.8*0.25*0.75), "-20 ºC", {fill: "#fffffa", fontSize: "15px"});
            gameState['BMP2_THERMOMETER_TEXT'].setOrigin(.5, .5);
            //Humidity layout
            graphics.beginPath();
            gameState['BMP2_PRESSURE_ARC'] = graphics.arc(PADDING + (SWIDTH*options[1]) + (SWIDTH*options[3])/4*2.65 + MARGIN*options[1], (SHEIGHT*options[2]) + SHEIGHT*(0.2+0.8*0.75) + 10 - 65*Math.sin(Phaser.Math.DegToRad(135)), 65, Phaser.Math.DegToRad(135), Phaser.Math.DegToRad(45), false);
            graphics.strokePath();
            function BMP2HumidityArcX(a,r){
                return (PADDING + (SWIDTH*options[1]) + (SWIDTH*options[3])/4*2.65 + MARGIN*options[1] + r*Math.cos(Phaser.Math.DegToRad(a)));
            }
            function BMP2HumidityArcY(a,r){
                return (PADDING + ((SHEIGHT*options[2]) + SHEIGHT*(0.2+0.8*0.75) + 10 - Math.sqrt(2)*65*Math.sin(Phaser.Math.DegToRad(135)) - r*Math.sin(Phaser.Math.DegToRad(a))));
            }
            graphics.beginPath();
            for(let i=0;i<11;i++){
                gameState[`BMP2_PRESSURE_LINE_${i}`] = graphics.lineBetween(BMP2HumidityArcX(220-26*i, 65), BMP2HumidityArcY(220-26*i, 65), BMP2HumidityArcX(220-26*i, 55), BMP2HumidityArcY(220-26*i, 55));
            }
            graphics.strokePath();
            gameState['BMP2_PRESSURE_TEXT'] = c.add.text(PADDING + (SWIDTH*options[1]) + (SWIDTH*options[3])/4*2.65 + MARGIN*options[1], (SHEIGHT*options[2]) + SHEIGHT*(0.2+0.8*0.75+0.8*0.25*0.75), "0 %", {fill: "#fffffa", fontSize: "15px"});
            gameState['BMP2_PRESSURE_TEXT'].setOrigin(.5, .5);
        })();
        break;
        // ...
    }
}

function updateDHT(t, h){
    let tc = Math.max(DHTTHERMOMETERRANGEMIN, Math.min(DHTTHERMOMETERRANGEMAX, t)),
        tp = (tc - DHTTHERMOMETERRANGEMIN) / (DHTTHERMOMETERRANGEMAX - DHTTHERMOMETERRANGEMIN),
        tl = ((SHEIGHT*0) + SHEIGHT*(0.2 + 0.8*0.75)) + 10 * Math.sin(Phaser.Math.DegToRad(236.25)) - ((SHEIGHT*0) + SHEIGHT*(0.2 + 0.25*0.75)) + (10 * Math.sin((3/16) * Math.PI)) * Math.sin(Math.PI) + 9,
        tr = tl*tp;
    gameState['DHT_THERMOMETER_FILL_RECTANGLE'].height = tr;
    gameState['DHT_THERMOMETER_FILL_RECTANGLE'].y = (SHEIGHT*0) + SHEIGHT*(0.2+0.8*0.75) - tr;
    gameState['DHT_THERMOMETER_FILL_TOP_CIRCLE'].y = (SHEIGHT*0) + SHEIGHT*(0.2+0.8*0.75) - tr;
    gameState['DHT_THERMOMETER_TEXT'].text = `${t} ºC`;
    DHTHUMIDITYgraphics.clear();
    DHTHUMIDITYgraphics.beginPath();
    DHTHUMIDITYgraphics.lineStyle(2, 0xfffffa, 1);
    gameState['DHT_HUMIDITY_LINE'] = DHTHUMIDITYgraphics.lineBetween(PADDING + (SWIDTH*0) + (SWIDTH*1)/4*2.65 + MARGIN*0, SHEIGHT*0 + SHEIGHT*(0.2+0.8*0.75) + 10 - 65*Math.sin(Phaser.Math.DegToRad(135)), PADDING + (SWIDTH*0) + (SWIDTH*1)/4*2.65 + MARGIN*0 + 45*Math.cos(Phaser.Math.DegToRad(220-h/100*260)), PADDING + ((SHEIGHT*0) + SHEIGHT*(0.2+0.8*0.75) + 10 - Math.sqrt(2)*65*Math.sin(Phaser.Math.DegToRad(135)) - 45*Math.sin(Phaser.Math.DegToRad(220-h/100*260))));
    DHTHUMIDITYgraphics.strokePath();
    gameState['DHT_HUMIDITY_TEXT'].text = `${h} %`;
}

function updateBMP2(t, p){
    let tc = Math.max(BMPTHERMOMETERRANGEMIN, Math.min(BMPTHERMOMETERRANGEMAX, t)),
        tp = (tc - BMPTHERMOMETERRANGEMIN) / (BMPTHERMOMETERRANGEMAX - BMPTHERMOMETERRANGEMIN),
        tl = ((SHEIGHT*0) + SHEIGHT*(0.2 + 0.8*0.75)) + 10 * Math.sin(Phaser.Math.DegToRad(236.25)) - ((SHEIGHT*0) + SHEIGHT*(0.2 + 0.25*0.75)) + (10 * Math.sin((3/16) * Math.PI)) * Math.sin(Math.PI) + 9,
        tr = tl*tp;
    gameState['BMP2_THERMOMETER_FILL_RECTANGLE'].height = tr;
    gameState['BMP2_THERMOMETER_FILL_RECTANGLE'].y = (SHEIGHT*1) + SHEIGHT*(0.2+0.8*0.75) - tr;
    gameState['BMP2_THERMOMETER_FILL_TOP_CIRCLE'].y = (SHEIGHT*1) + SHEIGHT*(0.2+0.8*0.75) - tr;
    gameState['BMP2_THERMOMETER_TEXT'].text = `${t} ºC`;
    let pc = Math.max(BMPPRESSURERANGEMIN, Math.min(BMPPRESSURERANGEMAX, p)),
        pp = (pc - BMPPRESSURERANGEMIN) / (BMPPRESSURERANGEMAX - BMPPRESSURERANGEMIN);
    BMPPRESSUREgraphics.clear();
    BMPPRESSUREgraphics.beginPath();
    BMPPRESSUREgraphics.lineStyle(2, 0xfffffa, 1);
    gameState['BMP2_PRESSURE_LINE'] = BMPPRESSUREgraphics.lineBetween(PADDING + (SWIDTH*0) + (SWIDTH*1)/4*2.65 + MARGIN*0, SHEIGHT*1 + SHEIGHT*(0.2+0.8*0.75) + 10 - 65*Math.sin(Phaser.Math.DegToRad(135)), PADDING + (SWIDTH*0) + (SWIDTH*1)/4*2.65 + MARGIN*0 + 45*Math.cos(Phaser.Math.DegToRad(220-pp*260)), PADDING + ((SHEIGHT*1) + SHEIGHT*(0.2+0.8*0.75) + 10 - Math.sqrt(2)*65*Math.sin(Phaser.Math.DegToRad(135)) - 45*Math.sin(Phaser.Math.DegToRad(220-pp*260))));
    BMPPRESSUREgraphics.strokePath();
    gameState['BMP2_PRESSURE_TEXT'].text = `${p} hPa`;
}

function preload(){
    this.load.image('aesosat', '../img/white_aesosat.png');
}

function create(){
    gameState.sections = [
        ['dht',0,0,1,1,'DHT11'],
        ['bmp1',1,0,1,2,'BMP280'],
        ['mpu1',2,0,1,2,'MPU6050'],
        ['mpu2',3,0,1,2,'MPU6050'],
        ['lnd',4,0,2,3,'ATERRATGE CONTROLAT'],
        ['bmp2',0,1,1,1,'BMP280'],
        ['apc',0,2,2,1,'APC220'],
        ['yml',2,2,1,1,'YM-655'],
        ['neo',3,2,1,1,'NEO-6M']
    ];
    for(let i=0;i<gameState.sections.length;i++){
        createSection(this, gameState.sections[i]);
        // console.log("created section: ", gameState.sections[i]);
        console.log(SHEIGHT)
    }
    updateDHT(-20, 0);
    updateBMP2(-20, 500);
}

const config = {
    height: 791,
    width: 1536,
    parent: 'main',
    backgroundColor: 0x00000a,
    type: Phaser.AUTO,
    scene: {
        preload,
        create,
    }
}

const game = new Phaser.Game(config);