//=============================================================================
// NumberInputMaxMin.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc (1.0.0) Number Input MaxMin
 * 
 * @param MaxValue
 * @type variable
 * @text Max Value
 * @desc The maximum value for the number input. Use -1 to disable the maximum
 * limit.
 * @default 0
 * 
 * @param MinValue
 * @type variable
 * @text Min Value
 * @desc The minimum value for the number input. Use -1 to disable the maximum
 * limit.
 * @default 0
 *
 * @author PbJelly246
 * @help
 * This is a conversion of Dragon3025's Number Input Extremum.
 * 
 * This plugin allows you to set a maximum and minimum value for the number
 * input command in RPG Maker MZ. Max and Min values can be disabled by setting
 * them below 0.
 * 
 * The digits will also increment each other, so:
 * 
 * 1 0 0  ->  0 9 9		0 9 9  ->  1 0 0
 *    -1				   +1
 * 
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * Set the variables you want to use for your Max and Min values in Plugin
 * parameters. When you want to update them, just change the variable then run
 * number input.
 * 
 * Max and Min can be cancelled by setting the variables below 0.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.0:
 * - Finished plugin.
 * 
 * ============================================================================
 * Terms of Use
 * ============================================================================
 * This plugin is released under the MIT License.
 * https://opensource.org/licenses/MIT
 * 
 */

(() => {

  const params = PluginManager.parameters('NumberInputMaxMin');
  const varMax = params['MaxValue'] || 100;
  const varMin  = params['MinValue'] || 0;


    const _Window_NumberInput_start = Window_NumberInput.prototype.start;
    Window_NumberInput.prototype.start = function () {
      this._maxDigits = $gameMessage.numInputMaxDigits();
      this._number = $gameVariables.value($gameMessage.numInputVariableId());
      this._number = this._number.clamp(0, Math.pow(10, this._maxDigits) - 1);
      let max = $gameVariables.value(varMax);
      let maxfit = 0;
      for (let i = 1; i <= this._maxDigits; i++) {
        maxfit += 9 * Math.pow(10, i - 1);
      }
      if (max < 0 || max > maxfit) {
        max = maxfit;
      }
      const min = Math.max(0, $gameVariables.value(varMin) );
      this._number = this._number.clamp(min, max);
      this.updatePlacement();
      this.placeButtons();
      this.createContents();
      this.refresh();
      this.open();
      this.activate();
      this.select(0);
    };
  
    Window_NumberInput.prototype.changeDigit = function (up) {
      const index = this.index();
      const place = Math.pow(10, this._maxDigits - 1 - index);
      let n = Math.floor(this._number / place) % 10;
      let max = $gameVariables.value(varMax);
      let maxfit = 0;
      for (let i = 1; i <= this._maxDigits; i++) {
        maxfit += 9 * Math.pow(10, i - 1);
      }
      if (max < 0 || max > maxfit) {
        max = maxfit;
    }
    const min = Math.max(0, $gameVariables.value(varMin) );
    this._number -= n * place;
    if (up) {
      n += 1;
    } else {
      n -= 1;
    }
    this._number += n * place;
    this._number = this._number.clamp(min, max);
    this.refresh();
    SoundManager.playCursor();
};

const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
_Game_Interpreter_pluginCommand.call(this, command, args);
if (command === "Changelimit") {
const extremum = args[0].toLowerCase();
const variableId = parseInt(args[1]);
if (extremum === max) {
$gameVariables.value(varMax) = value;
} else if (extremum === min) {
$gameVariables.value(varMin) = value;
}
}
};
})();
