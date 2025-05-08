/*:
 * @target MZ
 * @plugindesc Menyiapkan data untuk pembelian barang menggunakan Window_ShopNumber
 * @command PreparePurchase
 * @text Menyiapkan Data Pembelian
 * 
 * @param itemId
 * @text Item ID
 * @desc ID Item yang ingin dibeli
 * @type item
 * @default 1
 * 
 * @param maxAmount
 * @text Max Jumlah
 * @desc Jumlah maksimum item yang bisa dibeli
 * @type number
 * @default 99
 * 
 * @param price
 * @text Harga per Item
 * @desc Harga per item yang akan dibeli
 * @type number
 * @default 100
 * 
 * @help
 * Perintah Plugin untuk menyiapkan Window_ShopNumber dengan data item, jumlah maksimum,
 * dan harga untuk pembelian barang.
 * 
 * Contoh:
 *   PreparePurchase 1 99 100
 *   Ini akan menyiapkan jendela ShopNumber dengan item ID 1, jumlah maksimum 99, dan harga 100
 */

(function() {
    // Mendefinisikan perintah plugin PreparePurchase
    PluginManager.registerCommand('PreparePurchase', function(args) {
        const itemId = Number(args.itemId);    // Mengambil ID Item
        const maxAmount = Number(args.maxAmount); // Mengambil jumlah maksimum
        const price = Number(args.price); // Mengambil harga per item
        
        const item = $dataItems[itemId]; // Mengambil item berdasarkan ID
        if (!item) {
            console.error(`Item dengan ID ${itemId} tidak ditemukan.`);
            return;
        }

        // Menyiapkan data untuk Window_ShopNumber di scene toko
        const scene = SceneManager._scene;
        if (scene && scene._numberWindow) {
            scene._numberWindow.setup(item, maxAmount, price); // Mengatur Window_ShopNumber
            scene._numberWindow.setCurrencyUnit(TextManager.currencyUnit); // Menentukan unit mata uang
            scene._numberWindow.show(); // Tampilkan Window_ShopNumber
            scene._numberWindow.activate(); // Aktifkan Window_ShopNumber
        }
    });
})();

Scene_Shop.prototype.onNumberOk = function() {
    SoundManager.playShop();
    const number = this._numberWindow.number(); // Ambil jumlah yang dipilih
    this.doBuy(number); // Proses pembelian
    this.endNumberInput();
    this._goldWindow.refresh();
    this._statusWindow.refresh();
};

// Fungsi untuk menangani proses pembelian
Scene_Shop.prototype.doBuy = function(number) {
    const price = this._numberWindow._price; // Harga per item
    const totalPrice = price * number; // Total harga pembelian
    if ($gameParty.gold() >= totalPrice) {
        $gameParty.loseGold(totalPrice); // Kurangi uang pemain
        $gameParty.gainItem(this._numberWindow._item, number); // Tambahkan item ke inventaris
        this._goldWindow.refresh(); // Update tampilan gold
    } else {
        SoundManager.playBuzzer(); // Jika uang tidak cukup, bunyi error
        this._helpWindow.setText("Uang tidak cukup!"); // Tampilkan pesan kesalahan
    }
};
