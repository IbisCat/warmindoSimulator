/*:
 * @plugindesc Plugin untuk menginput jumlah item dan membeli item berdasarkan ID, menyimpan hasil input dalam variabel tertentu.
 * @author Nama Anda
 *
 * @command BuyItem
 * @text Membeli Item
 * @desc Membeli item berdasarkan ID dan menyimpan jumlah yang dibeli dalam variabel.
 *
 * @arg itemId
 * @text Item ID
 * @desc ID item yang ingin dibeli.
 * @type item
 *
 * @arg variableId
 * @text Variabel ID
 * @desc ID variabel tempat menyimpan jumlah item yang dibeli.
 * @type variable
 *
 * @help
 * Plugin ini memungkinkan pengguna untuk membeli item berdasarkan ID melalui Plugin Command,
 * kemudian menginput jumlah yang ingin dibeli dan menyimpan hasil input dalam variabel.
 * 
 * Command Plugin:
 *  - `BuyItem <itemId> <variableId>`
 *    - <itemId>: ID item yang ingin dibeli.
 *    - <variableId>: ID variabel tempat menyimpan jumlah yang diinput oleh pemain.
 */

(function() {
    // Mendefinisikan variabel yang akan digunakan
    var selectedItem = null;
    var totalPrice = 0;

    // Membuat jendela input angka untuk jumlah item
    function Window_ItemNumberInput() {
        this.initialize.apply(this, arguments);
    }

    Window_ItemNumberInput.prototype = Object.create(Window_Selectable.prototype);
    Window_ItemNumberInput.prototype.constructor = Window_ItemNumberInput;

    Window_ItemNumberInput.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this._number = 0;
        this._maxValue = 99; // Maksimal input jumlah item
        this.createDigits();
    };

    Window_ItemNumberInput.prototype.createDigits = function() {
        this._buttons = [];
        for (var i = 0; i < 10; i++) {
            var button = new Sprite_Button();
            button.x = i * 50; // Menata tombol input angka
            button.y = 0;
            button.bitmap = ImageManager.loadSystem('Button_' + i);
            button.setClickHandler(this.onButtonClick.bind(this, i));
            this.addChild(button);
        }
    };

    Window_ItemNumberInput.prototype.onButtonClick = function(number) {
        this._number = this._number * 10 + number;
        this.refresh();
    };

    Window_ItemNumberInput.prototype.refresh = function() {
        this.contents.clear();
        this.drawText('Jumlah: ' + this._number, 0, 0, 200);
        totalPrice = this._number * selectedItem.price;
        this.drawText('Total Harga: ' + totalPrice, 0, 40, 200);
    };

    // Menangani command plugin untuk membeli item
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        if (command === 'BuyItem') {
            var itemId = Number(args[0]);
            var variableId = Number(args[1]);
            this.buyItemScene(itemId, variableId);
        } else {
            Game_Interpreter.prototype.pluginCommand.call(this, command, args);
        }
    };

    // Membuka scene input jumlah item
    Game_Interpreter.prototype.buyItemScene = function(itemId, variableId) {
        var item = $dataItems[itemId];
        if (!item) {
            console.log("Item tidak ditemukan! Item ID: " + itemId);  // Debugging log
            return;
        }
        selectedItem = item;
        $gameVariables.setValue(variableId, 0); // Mengatur variabel input menjadi 0
        SceneManager.push(Scene_ItemNumberInput);
    };

    // Membuat scene custom input jumlah item
    function Scene_ItemNumberInput() {
        this.initialize.apply(this, arguments);
    }

    Scene_ItemNumberInput.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_ItemNumberInput.prototype.constructor = Scene_ItemNumberInput;

    // Inisialisasi scene
    Scene_ItemNumberInput.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    // Membuat elemen-elemen scene
    Scene_ItemNumberInput.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createNumberWindow();
    };

    // Membuat jendela input jumlah
    Scene_ItemNumberInput.prototype.createNumberWindow = function() {
        var rect = new Rectangle(0, 0, 240, 100);
        this._numberWindow = new Window_ItemNumberInput(rect);
        this.addWindow(this._numberWindow);
        this._numberWindow.setHandler('ok', this.onNumberOk.bind(this));
        this._numberWindow.setHandler('cancel', this.onNumberCancel.bind(this));
    };

    // Mengonfirmasi jumlah yang dimasukkan
    Scene_ItemNumberInput.prototype.onNumberOk = function() {
        var number = this._numberWindow._number;
        var variableId = 1; // Variable ID untuk menyimpan input (ubah sesuai kebutuhan)
        $gameVariables.setValue(variableId, number);
        this.doBuy(number);
        this.popScene();
    };

    // Membatalkan input jumlah
    Scene_ItemNumberInput.prototype.onNumberCancel = function() {
        this.popScene();
    };

    // Menangani pembelian item
    Scene_ItemNumberInput.prototype.doBuy = function(number) {
        totalPrice = number * selectedItem.price;
        if ($gameParty.gold() >= totalPrice) {
            $gameParty.loseGold(totalPrice);
            $gameParty.gainItem(selectedItem, number);
            console.log('Item dibeli: ' + selectedItem.name + ' x' + number);
        } else {
            console.log('Uang tidak cukup untuk membeli item');
        }
    };
})();
