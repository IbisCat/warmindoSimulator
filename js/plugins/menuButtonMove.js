/*:
 * @target MZ
 * @plugindesc Make the map menu button (Touch UI) appear on the left.
 * @help Terms of use: free to use and/or modify for any project.
 * 
 * @param X
 * @text X position
 * @type number
 * @desc x position of the menu button.
 * @default 4
 * 
 * @param Y
 * @text Y position
 * @type number
 * @desc y position of the menu button.
 * @default 4
 * 
 */


(alias => {
    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const x = Number(parameters['X'] || 4);
    const y = Number(parameters['Y'] || 4);

  Scene_Map.prototype.createMenuButton = function() {
    alias.apply(this, arguments);
    this._menuButton.x = x;
    this._menuButton.y = y;
  };
})(Scene_Map.prototype.createMenuButton);