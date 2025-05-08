/*:
 * @plugindesc A window for inputting quantity of items to restock in the game.
 * @author Your Name
 *
 * @param ItemVarId
 * @text Item Variable ID
 * @desc The ID of the variable that stores the Item ID to restock.
 * @default 1
 * @type variable
 *
 * @param QuantityVarId
 * @text Quantity Variable ID
 * @desc The ID of the variable that stores the quantity of items restocked.
 * @default 1
 * @type variable
 *
 * @param PromoVarId
 * @text Promo Variable ID
 * @desc The ID of the variable that stores the promo percentage.
 * @default 0
 * @type variable
 *
 * @param TotalPriceVarId
 * @text Total Price Variable ID
 * @desc The ID of the variable that stores the total price after calculation.
 * @default 0
 * @type variable
 *
 * @command openRestockWindow
 * @text Open Restock Window
 * @desc Opens the restock window and allows the player to input the quantity of the item.
 *
 * @help
 * This plugin creates a window for inputting the number of items to restock in the game.
 * It replicates the functionality of the original Window_ShopNumber class, but it's
 * designed for the restocking scenario.
 * 
 * Usage:
 * Call the activateRestockNumberWindow function to open the restock window, which will
 * use the Item ID stored in the ItemVarId variable and store the restocked quantity in
 * the QuantityVarId variable.
 */

(function() {
    const parameters = PluginManager.parameters('RestockInput');
    const itemVarId = Number(parameters['ItemVarId'] || 1);
    const quantityVarId = Number(parameters['QuantityVarId'] || 1);
    const promoVarId = Number(parameters['PromoVarId'] || 0); // Parameter untuk promo
    const totalPriceVarId = Number(parameters['TotalPriceVarId'] || 0);

    // Extend Game_Message to handle the restock window
    Game_Message.prototype.showRestockWindow = function(item, maxBuy, price) {
        this._restockWindowActive = true;

        const rect = new Rectangle(
            (Graphics.boxWidth - 450) / 2,
            (Graphics.boxHeight - 250) / 2,
            450,
            250
        );

        this._restockWindow = new Window_RestockNumber(rect);
        this._restockWindow.setup(item, maxBuy, price);
        this._restockWindow.setCurrencyUnit(TextManager.currencyUnit);

        // Add handlers for OK and Cancel actions
        this._restockWindow.setHandler("ok", () => {
            const quantity = this._restockWindow.number();
            const total = quantity * price; // Harga sudah termasuk diskon

            $gameVariables.setValue(totalPriceVarId, total);
            $gameParty.loseGold(total); // Kurangi gold berdasarkan total harga
            $gameParty.gainItem(item, quantity); // Tambahkan item ke inventaris
            $gameVariables.setValue(quantityVarId, quantity); // Simpan jumlah item ke variabel
            SoundManager.playShop();
            this.closeRestockWindow();
        });

        this._restockWindow.setHandler("cancel", () => {
            SoundManager.playCancel();
            $gameVariables.setValue(totalPriceVarId, 0);
            $gameVariables.setValue(quantityVarId, 0);
            this.closeRestockWindow();
        });

        // Add the restock window to the window layer
        const windowLayer = SceneManager._scene._windowLayer;
        if (windowLayer) {
            windowLayer.addChild(this._restockWindow);
        } else {
            console.error("Window layer not found!");
        }

        this._restockWindow.activate();
    };

    Game_Message.prototype.closeRestockWindow = function() {
        if (this._restockWindow) {
            // Remove the restock window from the window layer
            const windowLayer = SceneManager._scene._windowLayer;
            if (windowLayer) {
                windowLayer.removeChild(this._restockWindow);
            }
            this._restockWindow = null;
        }
        this._restockWindowActive = false;
    };

    Game_Message.prototype.isRestockWindowActive = function() {
        return this._restockWindowActive;
    };

    // Update the plugin command to show the restock window
    PluginManager.registerCommand('RestockInput', 'openRestockWindow', function () {
        const itemId = $gameVariables.value(itemVarId);
        const item = $dataItems[itemId];

        if (!item) {
            console.log("Item not found!");
            return;
        }

        const basePrice = item.price; // Harga dasar item
        const promoPercentage = $gameVariables.value(promoVarId) || 0; // Nilai promo dari variabel
        const discount = basePrice * (promoPercentage / 100); // Hitung diskon
        const finalPrice = Math.max(0, basePrice - discount); // Harga setelah diskon (tidak boleh negatif)

        const gold = $gameParty.gold();
        const maxBuy = Math.floor(gold / finalPrice); // Hitung jumlah maksimum yang bisa dibeli berdasarkan harga setelah diskon

        // Show the restock window and wait for input
        $gameMessage.showRestockWindow(item, maxBuy, finalPrice);

        // Pause the event until the restock window is closed
        this.setWaitMode('restock');
    });

    // Extend Game_Interpreter to handle the wait mode for the restock window
    const _Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function () {
        if (this._waitMode === 'restock') {
            if (!$gameMessage.isRestockWindowActive()) {
                this._waitMode = ''; // Clear the wait mode when the window is closed
                return false; // Continue event processing
            }
            return true; // Keep waiting
        }
        return _Game_Interpreter_updateWaitMode.call(this);
    };

    // Prevent player movement while the restock window is active
    const _Game_Player_canMove = Game_Player.prototype.canMove;
    Game_Player.prototype.canMove = function() {
        if ($gameMessage.isRestockWindowActive()) {
            return false; // Disable player movement
        }
        return _Game_Player_canMove.call(this);
    };

    // Create the Window_RestockNumber class, replicating Window_ShopNumber
    function Window_RestockNumber() {
        this.initialize(...arguments);
    }

    Window_RestockNumber.prototype = Object.create(Window_Selectable.prototype);
    Window_RestockNumber.prototype.constructor = Window_RestockNumber;

    Window_RestockNumber.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this._item = null;
        this._max = 1;
        this._price = 0;
        this._number = 1;
        this._currencyUnit = TextManager.currencyUnit;
        this.createButtons();
        this.select(0);
        this._canRepeat = false;
    };

    Window_RestockNumber.prototype.isScrollEnabled = function() {
        return false;
    };

    Window_RestockNumber.prototype.number = function() {
        return this._number;
    };

    Window_RestockNumber.prototype.setup = function(item, max, price) {
        this._item = item;
        this._max = Math.floor(max);
        this._price = price;
        this._number = 1;
        this._promo = $gameVariables.value(promoVarId) || 0; // Ambil nilai promo dari variabel
        this.placeButtons();
        this.refresh();
    };

    Window_RestockNumber.prototype.setCurrencyUnit = function(currencyUnit) {
        this._currencyUnit = currencyUnit;
        this.refresh();
    };

	// Create buttons including the "Cancel" button
    Window_RestockNumber.prototype.createButtons = function() {
        this._buttons = [];
        if (ConfigManager.touchUI) {
            for (const type of ["cancel", "down2", "down", "up", "up2", "ok"]) {
                const button = new Sprite_Button(type);
                this._buttons.push(button);
                this.addInnerChild(button);
            }

            // Set click handlers for each button
            this._buttons[0].setClickHandler(this.onButtonCancel.bind(this)); // Cancel button (leftmost)
            this._buttons[1].setClickHandler(this.onButtonDown2.bind(this));
            this._buttons[2].setClickHandler(this.onButtonDown.bind(this));
            this._buttons[3].setClickHandler(this.onButtonUp.bind(this));
            this._buttons[4].setClickHandler(this.onButtonUp2.bind(this));
            this._buttons[5].setClickHandler(this.onButtonOk.bind(this));
        }
    };

    Window_RestockNumber.prototype.placeButtons = function() {
        const sp = this.buttonSpacing();
        const totalWidth = this.totalButtonWidth();
        let x = (this.innerWidth - totalWidth) / 2;
        for (const button of this._buttons) {
            button.x = x;
            button.y = this.buttonY();
            x += button.width + sp;
        }
    };

    Window_RestockNumber.prototype.totalButtonWidth = function() {
        const sp = this.buttonSpacing();
        return this._buttons.reduce((r, button) => r + button.width + sp, -sp);
    };

    Window_RestockNumber.prototype.buttonSpacing = function() {
        return 8;
    };

    Window_RestockNumber.prototype.refresh = function() {
        Window_Selectable.prototype.refresh.call(this);
        this.drawItemBackground(0);
        this.drawCurrentItemName();
        this.drawMultiplicationSign();
        this.drawNumber();
        this.drawHorzLine();
        this.drawTotalPrice();
    };

    Window_RestockNumber.prototype.drawCurrentItemName = function() {
        const padding = this.itemPadding();
        const x = padding * 2;
        const y = this.itemNameY();
        const width = this.multiplicationSignX() - padding * 3;
        
        // Dapatkan jumlah item yang dimiliki
        const itemCount = $gameParty.numItems(this._item);

        // Tambahkan jumlah item ke nama item jika jumlahnya tidak 0
        const itemName =  itemCount > 0 ? `${this._item.name} (${itemCount})` : this._item.name;

    // Gambar nama item beserta ikon
    this.drawItemName(this._item, x, y, width);

    // Gambar jumlah item di sebelah kanan nama item (opsional)
    if (itemCount > 0) {
        const countX = x + this.textWidth(this._item.name) + 36; // Offset untuk ikon
        this.drawTextEx(`\\C[9](${itemCount})`, countX, y, width - countX, "left");
    }
    };

    Window_RestockNumber.prototype.drawMultiplicationSign = function() {
        const sign = this.multiplicationSign();
        const width = this.textWidth(sign);
        const x = this.multiplicationSignX();
        const y = this.itemNameY();
        this.resetTextColor();
        this.drawText(sign, x, y, width);
    };

    Window_RestockNumber.prototype.multiplicationSign = function() {
        return "\u00d7";
    };

    Window_RestockNumber.prototype.multiplicationSignX = function() {
        const sign = this.multiplicationSign();
        const width = this.textWidth(sign);
        return this.cursorX() - width * 2;
    };

    Window_RestockNumber.prototype.drawNumber = function() {
        const x = this.cursorX();
        const y = this.itemNameY();
        const width = this.cursorWidth() - this.itemPadding();
        this.resetTextColor();
        this.drawText(this._number, x, y, width, "right");
    };

    Window_RestockNumber.prototype.drawHorzLine = function() {
        const padding = this.itemPadding();
        const lineHeight = this.lineHeight();
        const itemY = this.itemNameY();
        const totalY = this.totalPriceY();
        const x = padding;
        const y = Math.floor((itemY + totalY + lineHeight) / 2);
        const width = this.innerWidth - padding * 2;
        this.drawRect(x, y, width, 5);
    };

    Window_RestockNumber.prototype.drawTotalPrice = function() {
        const padding = this.itemPadding();
        const total = this._price * this._number; // Harga sudah termasuk diskon
        const width = this.innerWidth - padding * 2;
        const y = this.totalPriceY();

        // Hitung persentase diskon
        const promoPercentage = this._promo || 0; // Ambil nilai promo dari variabel
        const discountText = promoPercentage > 0 ? `\\FS[20]\\C[18](${promoPercentage}% OFF!)` : ""; // Tampilkan diskon jika ada
       
        const totalText = `Total: ${total}\\G${discountText}`;
        const textWidth = promoPercentage > 0 ? this.textWidth(`Total: ${total}\\G(${promoPercentage}% OFF!)`) - 30 : this.textWidth(`Total: ${total}\\G`);      
        const x = this.innerWidth  - textWidth - padding; // - textWidth - padding * 2;
        this.drawTextEx(totalText, x, y, width);
    };

    Window_RestockNumber.prototype.itemNameY = function() {
        return Math.floor(this.innerHeight / 2 - this.lineHeight() * 2.2);
    };

    Window_RestockNumber.prototype.totalPriceY = function() {
        return Math.floor(this.itemNameY() + this.lineHeight() * 2);
    };

    Window_RestockNumber.prototype.buttonY = function() {
        return Math.floor(this.totalPriceY() + this.lineHeight() * 1.5);
    };

    Window_RestockNumber.prototype.cursorWidth = function() {
        const padding = this.itemPadding();
        const digitWidth = this.textWidth("0");
        return this.maxDigits() * digitWidth + padding * 2;
    };

    Window_RestockNumber.prototype.cursorX = function() {
        const padding = this.itemPadding();
        return this.innerWidth - this.cursorWidth() - padding * 2;
    };

    Window_RestockNumber.prototype.maxDigits = function() {
        return 2;
    };

    Window_RestockNumber.prototype.update = function() {
        Window_Selectable.prototype.update.call(this);
        this.processNumberChange();
    };

    Window_RestockNumber.prototype.playOkSound = function() {
        //
    };

    Window_RestockNumber.prototype.processNumberChange = function() {
        if (this.isOpenAndActive()) {
            if (Input.isRepeated("right")) {
                this.changeNumber(1);
            }
            if (Input.isRepeated("left")) {
                this.changeNumber(-1);
            }
            if (Input.isRepeated("up")) {
                this.changeNumber(10);
            }
            if (Input.isRepeated("down")) {
                this.changeNumber(-10);
            }
        }
    };

    Window_RestockNumber.prototype.changeNumber = function(amount) {
        const lastNumber = this._number;
        this._number = (this._number + amount).clamp(1, this._max);
        if (this._number !== lastNumber) {
            this.playCursorSound();
            this.refresh();
        }
    };

    Window_RestockNumber.prototype.itemRect = function() {
        const rect = new Rectangle();
        rect.x = this.cursorX();
        rect.y = this.itemNameY();
        rect.width = this.cursorWidth();
        rect.height = this.lineHeight();
        return rect;
    };

    Window_RestockNumber.prototype.isTouchOkEnabled = function() {
        return false;
    };

    Window_RestockNumber.prototype.onButtonUp = function() {
        this.changeNumber(1);
    };

    Window_RestockNumber.prototype.onButtonUp2 = function() {
        this.changeNumber(10);
    };

    Window_RestockNumber.prototype.onButtonDown = function() {
        this.changeNumber(-1);
    };

    Window_RestockNumber.prototype.onButtonDown2 = function() {
        this.changeNumber(-10);
    };

    Window_RestockNumber.prototype.onButtonOk = function() {
        this.processOk();
    };
	
	Window_RestockNumber.prototype.onButtonCancel = function() {
    this.processCancel();
	};
	
})();
