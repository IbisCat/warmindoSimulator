/*:
* @target MZ
* @plugindesc Kognitro Text Mage v1.0.0 - Anchor text and images with fade effects.
* @help
*
* ============================================================================
* LICENSE
* ============================================================================
* You may use this plugin for both personal and commercial RMMZ game projects.
* You are free to modify this plugin. 
* I cannot provide support for modified versions.
* Do not attempt to sell this plugin. 
* Do not claim the plugin as your own work.
* Do not repost it here or elsewhere without permission. 
* This includes posting modified versions of the plugin. 
* If you have made improvements and want to release them, 
* please contact me for review. I will consider incorporating your changes. 
* I would add you to the Credits section in this case. 
* ============================================================================
* Credits
* ============================================================================
* (C) Copyright Kognitro Games 2024.
*
* Thanks to Sang Hendrix for providing the basic idea for this plugin:
* https://forums.rpgmakerweb.com/index.php?members/sanghendrix.2104/
*
* This plugin uses the basic concept, 
* but has been entirely re-written from the ground up.
* Credit to caethyril for help when I was graphically challenged:
* https://forums.rpgmakerweb.com/index.php?members/caethyril.118196/
*
* ============================================================================
* Features: 
* (1) Supports custom fonts.
* (2) Fade in/out effects.
* (3) Anchor text/images from different parts of screen.
* (4) Offset text/images from the Anchor points using pixel or percentages.
* ============================================================================
* HELP
* ============================================================================
* Detailed help for the plugin is available on the RPG Maker MZ Forum.
*
* @author Kognitro
*
* @param CustomFonts
* @text [Custom Fonts]
* @desc Defines the custom fonts you want to use from the fonts folder.
* @type struct<CustomFont>[]
*
* @param anchor_Offset_Style
* @type select
* @option Normal Style
* @value Normal
* @option Margin Style
* @value Margin
* @text Anchor Offset Style
* @desc Change how x_Offset / y_Offset behave with anchors. Decide on this setting before you start using the plugin.
* @default Normal
*
* @command ShowText
* @text Show Text
* @desc Show text on the screen anchored to specific location.
*
* @arg text
* @type multiline_string
* @text Text
* @default My Text
* @desc The text to be displayed.
*
* @arg fontRefName
* @type text
* @default rmmz-mainfont
* @text Font Reference Name
* @desc Add custom font references first in the plugin parameters. Default font by specifying: rmmz-mainfont
*
* @arg fontSize
* @type string
* @default 28
* @text Font Size
* @desc The size of the font, depends on the selected Font Size Measurement.
*
*@arg fontMeasurement
* @type select
* @option Normal
* @value Normal
* @option Dynamic Scaled
* @value Dynamic-Scaled
* @text Font Size Measurement
* @desc Measurement used for font sizing. Normal = regular font sizing. Dynamic Scaled = based on Screen width/height.
* @default Normal
*
*@arg Anchor
* @type select
* @option Top Left
* @value Top-Left
* @option Top Center
* @value Top-Center
* @option Top Right
* @value Top-Right
* @option Center Left
* @value Center-Left
* @option Center
* @value Center
* @option Center Right
* @value Center-Right
* @option Bottom Left
* @value Bottom-Left
* @option Bottom Center
* @value Bottom-Center
* @option Bottom Right
* @value Bottom-Right
* @desc Where on the screen the text will be anchored.
* @default Top-Left
*
* @arg X_Offset
* @type string
* @default 0
* @text X offset (Horizontal)
* @desc The X offset of the text from the Anchor (Pixels or Percentage)
*
* @arg Y_Offset
* @type string
* @default 0
* @text Y offset (Vertical)
* @desc The Y offset of the text from the Anchor (Pixels or Percentage)
*
* @arg textColor
* @type string
* @default #FFFFFF
* @text Color
* @desc Text color as a hex code
*
* @arg duration
* @type number
* @min 1
* @default 5000
* @text Display Duration
* @desc How long in milliseconds to display text.
*
* @arg fadeInDuration
* @type number
* @min 1
* @default 1000
* @text Fade in Duration
* @desc How long in milliseconds to fade in the text.
*
* @arg fadeOutDuration
* @type number
* @min 1
* @default 1000
* @text Fade out Duration
* @desc How long in milliseconds to fade out the text.
*
* @command ShowImage
* @text Show Image
* @desc Show an image on the screen anchored to specific location.
*
* @arg image_name
* @type string
* @text Image Name
* @desc Name of png image from the \img\pictures folder, excluding the .png extension.
*
* @arg Anchor
* @type select
* @option Top Left
* @value Top-Left
* @option Top Center
* @value Top-Center
* @option Top Right
* @value Top-Right
* @option Center Left
* @value Center-Left
* @option Center
* @value Center
* @option Center Right
* @value Center-Right
* @option Bottom Left
* @value Bottom-Left
* @option Bottom Center
* @value Bottom-Center
* @option Bottom Right
* @value Bottom-Right
* @desc Where on the screen the image will be anchored.
* @default Top-Left
*
* @arg X_Offset
* @type string
* @default 0
* @text X offset (Horizontal)
* @desc The X offset of the image from the Anchor (Pixels or Percentage)
*
* @arg Y_Offset
* @type string
* @default 0
* @text Y offset (Vertical)
* @desc The Y offset of image from the Anchor (Pixels or Percentage)
*
* @arg image_width
* @type string
* @default 0
* @text Image Width
* @desc The width of the image in pixels, or as a percentage.
*
* @arg image_height
* @type string
* @default 0
* @text Image Height
* @desc The height of the image in pixels, or as a percentage.
*
* @arg duration
* @type number
* @min 1
* @default 5000
* @text Display Duration
* @desc How long in milliseconds to display image.
*
* @arg fadeInDuration
* @type number
* @min 1
* @default 1000
* @text Fade in Duration
* @desc How long in milliseconds to fade in the image.
*
* @arg fadeOutDuration
* @type number
* @min 1
* @default 1000
* @text Fade out Duration
* @desc How long in milliseconds to fade out the image.
*/
/*~struct~CustomFont:
* @param FontFileName
* @text [Font File Name]
* @desc The name of the font file in the fonts folder. For example: MyFont.ttf or mplus-1m-regular.woff
* @default FontName.ttf
* @param FontRefName
* @text [Font Reference Name]
* @desc The name of the font referenced when calling the plugin commands. For example: MyFont
* @default FontName
* 
*/
(() => {
    PluginManager.registerCommand("KOG_TextMage", "ShowText", async (args) => 
    {
        SceneManager._scene.addChild(new ShowTextOrImageSprite(args.text, "", args.X_Offset, args.Y_Offset, 0, 0, args.Anchor, parseInt(args.fontSize), args.fontRefName, args.textColor, 
        args.outlineColor, parseInt(args.outlineWidth), parseInt(args.duration), parseInt(args.fadeInDuration), parseInt(args.fadeOutDuration),KOG_TextMage.anchor_Offset_Style,args.fontMeasurement));
    });
    PluginManager.registerCommand("KOG_TextMage", "ShowImage", async (args) => 
    {
        SceneManager._scene.addChild(new ShowTextOrImageSprite("", args.image_name, args.X_Offset, args.Y_Offset, args.image_width, args.image_height, args.Anchor, -9999, 
        args.fontRefName, args.textColor, args.outlineColor,0, parseInt(args.duration), parseInt(args.fadeInDuration), parseInt(args.fadeOutDuration),KOG_TextMage.anchor_Offset_Style,""));
    });
    const KOG_TextMage = {};
    KOG_TextMage.pluginName = "KOG_TextMage";
    const parameters = PluginManager.parameters('KOG_TextMage');
    KOG_TextMage.anchor_Offset_Style=parameters['anchor_Offset_Style'];
    let TopFontOffset=5;
    if (parameters['CustomFonts'] != "" && parameters['CustomFonts'] != undefined) {
        KOG_TextMage.FontsDefined = true;
        KOG_TextMage.CustomFonts = JSON.parse(parameters['CustomFonts']);
        for (let i = 0; i < KOG_TextMage.CustomFonts.length; ++i) {
            KOG_TextMage.CustomFonts[i] = JSON.parse(KOG_TextMage.CustomFonts[i]);
        }
        Scene_Boot.prototype.CustomFonts = KOG_TextMage.CustomFonts;
        _Scene_Boot_loadGameFonts = Scene_Boot.prototype.loadGameFonts;
        Scene_Boot.prototype.loadGameFonts = function () {
            _Scene_Boot_loadGameFonts.apply(this);
            for (let i = 0; i < this.CustomFonts.length; ++i) {
                FontManager.load(this.CustomFonts[i].FontRefName, this.CustomFonts[i].FontFileName);
            }
        };
    }
    class ShowTextOrImageSprite extends Sprite {
        constructor(text, image_name, X_Offset_str, Y_Offset_str, image_width_str, image_height_str, Anchor, fontSize, fontRefName, textColor, 
            outlineColor, outlineWidth, duration, fadeInDuration, fadeOutDuration,anchor_Offset_Style,fontMeasurement) {
            super();
            function MoveSpriteMarginStyle(inSprite) 
            {
                let final_X_Offset = 0;
                let final_Y_Offset = 0;
                let scaledSprBitmapWidth = inSprite.width * inSprite.scale.x;
                let scaledSprBitmapHeight = inSprite.height * inSprite.scale.y;
                switch (Anchor) {
                    case "Top-Left":
                        final_X_Offset = X_Offset;
                        final_Y_Offset = Y_Offset;
                        break;
                    case "Top-Center":
                        final_X_Offset = ((Graphics.width - scaledSprBitmapWidth) / 2) + X_Offset;
                        break;
                    case "Top-Right":
                        final_X_Offset = Graphics.width - scaledSprBitmapWidth - X_Offset;
                        break;
                    case "Center-Left":
                        final_Y_Offset = ((Graphics.height - scaledSprBitmapHeight) / 2) + Y_Offset;
                        break;
                    case "Center":
                        final_X_Offset = ((Graphics.width - scaledSprBitmapWidth) / 2) + X_Offset;
                        final_Y_Offset = ((Graphics.height - scaledSprBitmapHeight) / 2) + Y_Offset;
                        break;
                    case "Center-Right":
                        final_X_Offset = Graphics.width - scaledSprBitmapWidth - X_Offset
                        final_Y_Offset = ((Graphics.height - scaledSprBitmapHeight) / 2) + Y_Offset;
                        break;
                    case "Bottom-Left":
                        final_Y_Offset = Graphics.height - scaledSprBitmapHeight - Y_Offset;
                        final_X_Offset = X_Offset;
                        break;
                    case "Bottom-Center":
                        final_X_Offset = ((Graphics.width - scaledSprBitmapWidth) / 2) + X_Offset;
                        final_Y_Offset = Graphics.height - scaledSprBitmapHeight - Y_Offset;
                        break;
                    case "Bottom-Right":
                        final_X_Offset = Graphics.width - scaledSprBitmapWidth - X_Offset;
                        final_Y_Offset = Graphics.height - scaledSprBitmapHeight - Y_Offset;
                        break;
                    default:
                        final_X_Offset = X_Offset;
                        final_Y_Offset = Y_Offset;
                }
                inSprite.move(final_X_Offset, final_Y_Offset);
            }
            function MoveSpriteNormalStyle(inSprite) 
            {
                let final_X_Offset = 0;
                let final_Y_Offset = 0;
                let scaledSprBitmapWidth = inSprite.width * inSprite.scale.x;
                let scaledSprBitmapHeight = inSprite.height * inSprite.scale.y;
                switch (Anchor) {
                    case "Top-Left":
                        final_X_Offset = X_Offset;
                        final_Y_Offset = Y_Offset;
                        break;
                    case "Top-Center":
                        final_X_Offset = ((Graphics.width - scaledSprBitmapWidth) / 2) + X_Offset;
                        break;
                    case "Top-Right":
                        final_X_Offset = Graphics.width - scaledSprBitmapWidth - X_Offset;
                        break;
                    case "Center-Left":
                        final_Y_Offset = ((Graphics.height - scaledSprBitmapHeight) / 2) + Y_Offset;
                        break;
                    case "Center":
                        final_X_Offset = ((Graphics.width - scaledSprBitmapWidth) / 2) + X_Offset;
                        final_Y_Offset = ((Graphics.height - scaledSprBitmapHeight) / 2) + Y_Offset;
                        break;
                    case "Center-Right":
                        final_X_Offset = Graphics.width - scaledSprBitmapWidth + X_Offset
                        final_Y_Offset = ((Graphics.height - scaledSprBitmapHeight) / 2) + Y_Offset;
                        break;
                    case "Bottom-Left":
                        final_Y_Offset = Graphics.height - scaledSprBitmapHeight + Y_Offset;
                        final_X_Offset = X_Offset;
                        break;
                    case "Bottom-Center":
                        final_X_Offset = ((Graphics.width - scaledSprBitmapWidth) / 2) + X_Offset;
                        final_Y_Offset = Graphics.height - scaledSprBitmapHeight + Y_Offset;
                        break;
                    case "Bottom-Right":
                        final_X_Offset = Graphics.width - scaledSprBitmapWidth + X_Offset;
                        final_Y_Offset = Graphics.height - scaledSprBitmapHeight + Y_Offset;
                        break;
                    default:
                        final_X_Offset = X_Offset;
                        final_Y_Offset = Y_Offset;
                }
                inSprite.move(final_X_Offset, final_Y_Offset);
            }
            let X_Offset = 0;
            let Y_Offset = 0;
            let image_width = 0;
            let image_height = 0;
      
            let is_text_render = fontSize != -9999;
            if (X_Offset_str.endsWith("%")) {
                X_Offset = (Graphics.width / 100) * parseInt(X_Offset_str.slice(0, -1));
            }
            else {
                X_Offset = parseInt(X_Offset_str);
            }
            if (Y_Offset_str.endsWith("%")) {
                Y_Offset = (Graphics.height / 100) * parseInt(Y_Offset_str.slice(0, -1));
            }
            else {
                Y_Offset = parseInt(Y_Offset_str);
            }
            if (is_text_render) {
                
                if (fontMeasurement==="Dynamic-Scaled") {
                    var ScreenDiag = Math.sqrt(Graphics.width*Graphics.width + Graphics.height*Graphics.height); 
                    fontSize = ((ScreenDiag / 100) * fontSize)/27.6;
                
                }
            }
            else {
                if (image_width_str.endsWith("%")) {
                    image_width = (Graphics.width / 100) * parseInt(image_width_str.slice(0, -1));
                }
                else {
                    image_width = parseInt(image_width_str);
                }
                if (image_height_str.endsWith("%")) {
                    image_height = (Graphics.height / 100) * parseInt(image_height_str.slice(0, -1));
                }
                else {
                    image_height = parseInt(image_height_str);
                }
            }
            this.opacity = 0;
            this.z = 100;
            if (is_text_render) {
                this.bitmap = new Bitmap(Graphics.width, Graphics.height);
                this.bitmap.fontSize = fontSize;
                this.bitmap.fontFace = fontRefName;
                this._TextWidth = this.bitmap.measureTextWidth(text);
  
                this.bitmap.textColor = textColor;
                if (outlineWidth>0) {
                    this.bitmap.outlineColor = outlineColor;
                    this.bitmap.outlineWidth = outlineWidth;
                }
                if (this._TextWidth>Graphics.width) {
                    text="ERROR: Text can't be wider than screen";
                    fontSize=30;
                    this.bitmap.fontSize = fontSize;
                    this._TextWidth = this.bitmap.measureTextWidth(text);
                    this.bitmap.fontFace = "rmmz-mainfont";
                    this.bitmap.outlineColor = "#000000";
                    this.bitmap.outlineWidth =5;
                    this.bitmap.textColor = "#f59a38";
                    
                    Anchor="Center";
                }
                this.width=this._TextWidth+(this.bitmap.outlineWidth);
                this.height=fontSize*1.3;
                this.BottomEdgeCount=0;
                this.TopEdgeCount=0;
                this.bitmap.drawText(text, this.bitmap.outlineWidth/2, (this.bitmap.outlineWidth/2)+TopFontOffset, this._TextWidth, this.bitmap.fontSize, 'left');
                let TopEdge=scanSpriteBMapAlphaEdge(this,false,5,3);
                this.bitmap.clear();
                this.bitmap.drawText(text, this.bitmap.outlineWidth/2, (this.bitmap.outlineWidth/2)+(TopFontOffset-TopEdge), this._TextWidth, this.bitmap.fontSize, 'left');
                
                this.height=scanSpriteBMapAlphaEdge(this,true,parseInt(2),parseInt(2)); //*1.1;
               
                if (anchor_Offset_Style === "Normal") 
                {
                    MoveSpriteNormalStyle(this);
                }
                else 
                {
                    MoveSpriteMarginStyle(this);
                }
                
            }
            else {
                if (image_name != "") {
                    ImageManager.loadPicture(image_name).addLoadListener(
                        bmp => {
                            if (image_width != 0) {
                                this.scale.x = image_width / bmp.width;
                                if (image_height == 0) {
                                    this.scale.y = this.scale.x;
                                }
                            }
                            if (image_height != 0) {
                                this.scale.y = image_height / bmp.height;
                                if (image_width == 0) {
                                    this.scale.x = this.scale.y;
                                }
                            }
                            this.bitmap = bmp;
                            if (anchor_Offset_Style === "Normal") 
                            {
                                MoveSpriteNormalStyle(this);
                            }
                            else 
                            {
                                MoveSpriteMarginStyle(this);
                            }
                        }
                    );
                }
                else {
                    throw new Error('Kognitro Text Mage - No image name was specified calling ShowImage command.')
                }
            }
            const intervalTextImagefadeIn = setInterval(() => {
                this.opacity += 255 / (fadeInDuration / 16.666666);
                if (this.opacity >= 255) {
                    clearInterval(intervalTextImagefadeIn);
                }
            }, 16.666666);
            setTimeout(() => {
                const intervalTextImageFadeOut = setInterval(() => {
                    this.opacity -= 255 / (fadeOutDuration / 16.666666);
                    if (this.opacity <= 0) {
                        clearInterval(intervalTextImageFadeOut);
                        
                        this.bitmap = new Bitmap(1, 1);
                        SceneManager._scene.removeChild(this);
                        this.bitmap.destroy();
                        
                    }
                }, 16.666666);
            }, duration);
            function scanSpriteBMapAlphaEdge(inSprite,IsBottomEdge,XPixSkip, YPixSkip) 
            {
                if (IsBottomEdge) {
                    return scanAlphaEdgeBottom(inSprite,XPixSkip,YPixSkip);
                }
                else 
                {
                    return scanAlphaEdgeTop(inSprite,XPixSkip,YPixSkip);
                }
            }
            function scanAlphaEdgeTop(inSprite,XPixSkip, YPixSkip) 
            {
                let EdgeYPos=0;
                BothLoops:
                for (let YPos = 0; YPos<=inSprite.height; YPos+=XPixSkip) 
                {
                    for (let XPos = 0; XPos < inSprite.width; XPos+=YPixSkip)
                    {
                            inSprite.TopEdgeCount+=1;
                            if (inSprite.bitmap.getAlphaPixel(XPos,YPos)!=0) 
                            {
                                EdgeYPos=YPos;
                                break BothLoops;
                            }
                    }
                }
                return EdgeYPos;
            }
            function scanAlphaEdgeBottom(inSprite,XPixSkip, YPixSkip) 
            {
                let EdgeYPos=inSprite.height;
                BothLoops:
                for (let YPos = inSprite.height; YPos>=0; YPos-=YPixSkip) 
                {
                    for (let XPos = 0; XPos < inSprite.width; XPos+=XPixSkip)
                    {
                            inSprite.BottomEdgeCount+=1;
                            if (inSprite.bitmap.getAlphaPixel(XPos,YPos)!=0) 
                            {
                                EdgeYPos=YPos;
                                break BothLoops;
                            }
                    }
                }
                return EdgeYPos;
            }            
        }
    }
})();    