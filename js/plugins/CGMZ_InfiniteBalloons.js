/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/infiniteballoons/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Allows you to use unlimited balloon sheets
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.0.2
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.8.1
 * ----------------------------------------------------------------------------
 * Description: This plugin allows you to use different balloon sheets for
 * your balloons, removing the restriction of balloons on your game.
 * ----------------------------------------------------------------------------
 * Documentation:
 * To use more balloons, replace the existing balloon image with one that has
 * more balloons vertically in the same format as existing balloons.
 *
 * ICON BALLOONS:
 * Icon Balloons paint the Empty Balloon graphic set in the plugin parameters
 * over the selected balloon frame, and then it paints the selected icon index
 * over the blank balloon. It is recommended to use an index in your balloon
 * sheet that is blank since the icon balloon will paint both the balloon and
 * icon itself. You can find an empty balloon graphic that works with
 * this plugin at my website under the mz resources section:
 * https://www.caspergaming.com/resources/
 * ------------------------------Saved Games-----------------------------------
 * This plugin is fully compatible with saved games. This means you can:
 *
 * ✓ Add this plugin to a saved game and it will work as expected
 * ✓ Change any plugin params and changes will be reflected in saved games
 * ✓ Remove the plugin with no issue to save data
 * -----------------------------Filename---------------------------------------
 * The filename for this plugin MUST remain CGMZ_InfiniteBalloons.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * --------------------------Latest Version------------------------------------
 * Hi all, this latest version allows you to use a blank balloon image from
 * any image folder rather than forcing you to place it in the system folder.
 * 
 * Version 1.0.2
 * - Blank balloon no longer forced to be in system image folder
 *
 * @command showBalloon
 * @text Show Balloon
 * @desc Shows additional balloons.
 *
 * @arg balloonId
 * @text Balloon ID
 * @type number
 * @min 1
 * @default 1
 * @desc The ID of the balloon in the balloon file to show
 *
 * @arg eventId
 * @text Event ID
 * @type number
 * @min -1
 * @default -1
 * @desc Player = -1, This event = 0, any other number = event ID on map
 *
 * @arg wait
 * @text Wait For Completion
 * @type boolean
 * @default false
 * @desc wait for the balloon to complete
 *
 * @command showBalloonIcon
 * @text Show Icon Balloon
 * @desc Shows balloons with icons
 *
 * @arg balloonId
 * @text Balloon ID
 * @type number
 * @min 1
 * @default 1
 * @desc The ID of the balloon in the balloon file to show as background
 *
 * @arg iconId
 * @text Icon ID
 * @type number
 * @min 0
 * @default 0
 * @desc The ID of the icon to show in balloon
 *
 * @arg eventId
 * @text Event ID
 * @type number
 * @min -1
 * @default -1
 * @desc Player = -1, This event = 0, any other number = event ID on map
 *
 * @arg wait
 * @text Wait For Completion
 * @type boolean
 * @default false
 * @desc wait for the balloon to complete
 *
 * @param Icon X Offset
 * @type number
 * @min 0
 * @desc The offset for the x-value of where icons are drawn in balloons
 * @default 12
 *
 * @param Icon Y Offset
 * @type number
 * @min 0
 * @desc The offset for the y-value of where icons are drawn in balloons
 * @default 12
 *
 * @param Icon Balloon Width
 * @type number
 * @min 1
 * @desc The width to draw the icons in the balloon
 * @default 24
 *
 * @param Icon Balloon Height
 * @type number
 * @min 1
 * @desc The height to draw the icons in the balloon
 * @default 24
 *
 * @param Empty Balloon
 * @type file
 * @dir img/
 * @desc The empty balloon file to use when drawing icons
*/
/*:es
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/infiniteballoons/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Te permite usar hojas de globo ilimitadas.
 * @help
 * ============================================================================
 * Para términos y condiciones de uso de este pluging en tu juego, por favor
 * visita:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * ¡Conviértete en un Patrocinador para obtener acceso a los plugings beta y
 * alfa, ademas de otras cosas geniales!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Versión: 1.0.2
 * ----------------------------------------------------------------------------
 * Compatibilidad: Sólo probado con mis CGMZ plugins.
 * Hecho para RPG Maker MZ 1.8.1
 * ----------------------------------------------------------------------------
 * Descripción: Este plugin te permite usar diferentes hojas de globo para
 * tus globos, eliminando la restricción de globos en tu juego.
 * ----------------------------------------------------------------------------
 * Documentación:
 * Para usar más globos, reemplaza la imagen del globo existente con una que
 * tenga más globos en vertical en el mismo formato que los globos existentes.
 *
 * GLOBOS ICONO:
 * Los globos de iconos pintan el conjunto de gráficos de globos vacíos en los
 * parámetros del complemento sobre el marco del globo seleccionado, y luego
 * pinta el índice del icono seleccionado sobre el globo en blanco. Se
 * recomienda utilizar un índice en su globo hoja que está en blanco ya que el
 * icono del globo pintará tanto el globo como el icono mismo. Puede encontrar
 * un gráfico de globo vacío que funciona con este complemento en mi sitio web
 * en la sección de recursos de mz:
 * https://www.caspergaming.com/resources/
 * ------------------------------Saved Games-----------------------------------
 * This plugin is fully compatible with saved games. This means you can:
 *
 * ✓ Add this plugin to a saved game and it will work as expected
 * ✓ Change any plugin params and changes will be reflected in saved games
 * ✓ Remove the plugin with no issue to save data
 * -----------------------------Filename---------------------------------------
 * The filename for this plugin MUST remain CGMZ_InfiniteBalloons.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * --------------------------Latest Version------------------------------------
 * Hi all, this latest version allows you to use a blank balloon image from
 * any image folder rather than forcing you to place it in the system folder.
 * 
 * Version 1.0.2
 * - Blank balloon no longer forced to be in system image folder
 *
 * @command showBalloon
 * @text Mostrar globo
 * @desc Muestra globos adicionales.
 *
 * @arg balloonId
 * @text ID del globo
 * @type number
 * @min 1
 * @default 1
 * @desc El ID del globo en el archivo de globo para mostrar.
 *
 * @arg eventId
 * @text ID de Evento
 * @type number
 * @min -1
 * @default -1
 * @desc Jugador = -1, Este evento = 0, cualquier otro número = ID de evento en el mapa.
 *
 * @arg wait
 * @text Esperar Finalización
 * @type boolean
 * @default false
 * @desc Esperar a que el globo se complete.
 *
 * @command showBalloonIcon
 * @text Mostrar icono de globo
 * @desc Muestra globos con iconos.
 *
 * @arg balloonId
 * @text ID del globo
 * @type number
 * @min 1
 * @default 1
 * @desc El ID de la viñeta en el archivo de viñetas para mostrar como fondo.
 *
 * @arg iconId
 * @text ID de Icono
 * @type number
 * @min 0
 * @default 0
 * @desc El ID del ícono para mostrar en el globo.
 *
 * @arg eventId
 * @text ID de Evento
 * @type number
 * @min -1
 * @default -1
 * @desc Jugador = -1, Este evento = 0, cualquier otro número = ID de evento en el mapa.
 *
 * @arg wait
 * @text Esperar Finalización
 * @type boolean
 * @default false
 * @desc Esperar a que el globo se complete.
 *
 * @param Icon X Offset
 * @text Ícono X de Desplazamiento
 * @type number
 * @min 0
 * @desc El desplazamiento del valor X de donde se dibujan los iconos en los globos.
 * @default 12
 *
 * @param Icon Y Offset
 * @text Ícono Y de Desplazamiento
 * @type number
 * @min 0
 * @desc El desplazamiento del valor Y de donde se dibujan los íconos en los globos.
 * @default 12
 *
 * @param Icon Balloon Width
 * @text Ancho de Icono del Globo
 * @type number
 * @min 1
 * @desc El ancho para dibujar los iconos en el globo.
 * @default 24
 *
 * @param Icon Balloon Height
 * @text Altura de Icono del Globo
 * @type number
 * @min 1
 * @desc La altura para dibujar los iconos en el globo.
 * @default 24
 *
 * @param Empty Balloon
 * @text Globo vacio
 * @type file
 * @dir img/
 * @desc El archivo de globo vacío para usar al dibujar iconos.
*/
Imported.CGMZ_InfiniteBalloons = true;
CGMZ.Versions["Infinite Balloons"] = "1.0.2";
CGMZ.InfiniteBalloons = {};
CGMZ.InfiniteBalloons.parameters = PluginManager.parameters('CGMZ_InfiniteBalloons');
CGMZ.InfiniteBalloons.IconXOffset = Number(CGMZ.InfiniteBalloons.parameters["Icon X Offset"]);
CGMZ.InfiniteBalloons.IconYOffset = Number(CGMZ.InfiniteBalloons.parameters["Icon Y Offset"]);
CGMZ.InfiniteBalloons.IconBalloonWidth = Number(CGMZ.InfiniteBalloons.parameters["Icon Balloon Width"]);
CGMZ.InfiniteBalloons.IconBalloonHeight = Number(CGMZ.InfiniteBalloons.parameters["Icon Balloon Height"]);
CGMZ.InfiniteBalloons.EmptyBalloon = CGMZ.InfiniteBalloons.parameters["Empty Balloon"];
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Add plugin command for showing balloon
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also add new show balloon command
//-----------------------------------------------------------------------------
const alias_CGMZ_InfiniteBalloons_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_InfiniteBalloons_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_InfiniteBalloons", "showBalloon", this.pluginCommandShowBalloon);
	PluginManager.registerCommand("CGMZ_InfiniteBalloons", "showBalloonIcon", this.pluginCommandShowBalloonIcon);
};
//-----------------------------------------------------------------------------
// Show balloon
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandShowBalloon = function(args) {
	this._characterId = Number(args.eventId);
	const character = this.character(this._characterId);
	if(character) {
        $gameTemp.requestBalloon(character, Number(args.balloonId));
        if(args.wait === "true") {
            this.setWaitMode("balloon");
        }
    }
};
//-----------------------------------------------------------------------------
// Show balloon with Icon
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandShowBalloonIcon = function(args) {
	this._characterId = Number(args.eventId);
	const character = this.character(this._characterId);
	if(character) {
        $gameTemp.requestBalloon(character, Number(args.balloonId), Number(args.iconId));
        if(args.wait === "true") {
            this.setWaitMode("balloon");
        }
    }
};
//=============================================================================
// Game_Temp
//-----------------------------------------------------------------------------
// Add ability to handle icon id in request for balloon
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also handle optional icon parameter
//-----------------------------------------------------------------------------
const alias_CGMZ_InfiniteBalloons_GameTemp_requestBallon = Game_Temp.prototype.requestBalloon;
Game_Temp.prototype.requestBalloon = function(target, balloonId, iconId = null) {
	if(iconId) {
		const request = { target: target, balloonId: balloonId, iconId: iconId};
		this._balloonQueue.push(request);
		if (target.startBalloon) {
			target.startBalloon();
		}
	} else {
		alias_CGMZ_InfiniteBalloons_GameTemp_requestBallon.call(this, target, balloonId);
	}
};
//=============================================================================
// Sprite_Balloon
//-----------------------------------------------------------------------------
// Add icon (if applicable) in balloon
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also load iconset
//-----------------------------------------------------------------------------
const alias_CGMZ_InfiniteBalloons_SpriteBalloon_loadBitmap = Sprite_Balloon.prototype.loadBitmap;
Sprite_Balloon.prototype.loadBitmap = function() {
	this._CGMZ_InfiniteBalloons_iconBitmap = ImageManager.loadSystem("IconSet");
	const blankBalloon = CGMZ_Utils.getImageData(CGMZ.InfiniteBalloons.EmptyBalloon, "img");
	this._CGMZ_InfiniteBalloons_blankBitmap = ImageManager.loadBitmap(blankBalloon.folder, blankBalloon.filename);
	alias_CGMZ_InfiniteBalloons_SpriteBalloon_loadBitmap.call(this);
};
//-----------------------------------------------------------------------------
// Alias. Also setup icon
//-----------------------------------------------------------------------------
const alias_CGMZ_InfiniteBalloons_SpriteBalloon_setup = Sprite_Balloon.prototype.setup;
Sprite_Balloon.prototype.setup = function(targetSprite, balloonId, iconId = null) {
	this._CGMZ_InfiniteBalloons_iconId = iconId;
    alias_CGMZ_InfiniteBalloons_SpriteBalloon_setup.call(this, targetSprite, balloonId);
	if(this._CGMZ_InfiniteBalloons_iconId) {
		this.CGMZ_InfiniteBalloons_drawBlank();
	}
};
//-----------------------------------------------------------------------------
// Draw icon bitmap if exists
//-----------------------------------------------------------------------------
const alias_CGMZ_InfiniteBalloons_SpriteBalloon_updateFrame = Sprite_Balloon.prototype.updateFrame;
Sprite_Balloon.prototype.updateFrame = function() {
	const startingX = this._frame.x;
    alias_CGMZ_InfiniteBalloons_SpriteBalloon_updateFrame.call(this);
	if(this._CGMZ_InfiniteBalloons_iconId) {
		const x = this.frameIndex() * 48;
		if(x !== startingX) {
			this.CGMZ_InfiniteBalloons_drawBlank();
			if(this.frameIndex() > 0) {
				this.CGMZ_InfiniteBalloons_drawIcon();
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Draw icon
//-----------------------------------------------------------------------------
Sprite_Balloon.prototype.CGMZ_InfiniteBalloons_drawIcon = function() {
	const iconIndex = this._CGMZ_InfiniteBalloons_iconId;
	// source x, y, w, h
	const sw = ImageManager.iconWidth;
    const sh = ImageManager.iconHeight;
    const sx = (iconIndex % 16) * sw;
    const sy = Math.floor(iconIndex / 16) * sh;
	// x, y offset
	const xoffset = CGMZ.InfiniteBalloons.IconXOffset;
	const yoffset = CGMZ.InfiniteBalloons.IconYOffset;
	// balloon w, h
	const bw = 48;
    const bh = 48;
	// destination x, y, w, h
    const dx = this.frameIndex() * bw + xoffset;
    const dy = (this._balloonId - 1) * bh + yoffset;
	const dw = CGMZ.InfiniteBalloons.IconBalloonWidth;
	const dh = CGMZ.InfiniteBalloons.IconBalloonHeight;
    this.bitmap.blt(this._CGMZ_InfiniteBalloons_iconBitmap, sx, sy, sw, sh, dx, dy, dw, dh);
};
//-----------------------------------------------------------------------------
// Draw blank balloon
//-----------------------------------------------------------------------------
Sprite_Balloon.prototype.CGMZ_InfiniteBalloons_drawBlank = function() {
	const sw = 48;
    const sh = 48;
    const sx = this.frameIndex() * sw;
    const sy = 0;
	// destination x, y, w, h
    const dx = sx
    const dy = (this._balloonId - 1) * 48;
	const dw = 48;
	const dh = 48;
    this.bitmap.blt(this._CGMZ_InfiniteBalloons_blankBitmap, sx, sy, sw, sh, dx, dy, dw, dh);
};
//=============================================================================
// Spriteset_Map
//-----------------------------------------------------------------------------
// Set up balloons for icon ballons (if applicable)
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also send iconId if exists
//-----------------------------------------------------------------------------
const alias_CGMZ_InfiniteBalloons_SpritesetMap_createBalloon = Spriteset_Map.prototype.createBalloon;
Spriteset_Map.prototype.createBalloon = function(request) {
	if(request.iconId) {
		const targetSprite = this.findTargetSprite(request.target);
		if (targetSprite) {
			const sprite = new Sprite_Balloon();
			sprite.targetObject = request.target;
			sprite.setup(targetSprite, request.balloonId, request.iconId);
			this._effectsContainer.addChild(sprite);
			this._balloonSprites.push(sprite);
		}
	} else {
		alias_CGMZ_InfiniteBalloons_SpritesetMap_createBalloon.call(this, request);
	}
};