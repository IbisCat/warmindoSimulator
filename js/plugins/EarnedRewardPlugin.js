/*:
 * @target MZ
 * @plugindesc Plugin untuk mendefinisikan fungsi global EarnedReward untuk pengelolaan reward.
 * @help
 * Fungsi `EarnedReward` dapat dipanggil secara global di RPG Maker MZ.
 * 
 * @param none
 */

(function() {
    // Menentukan fungsi global EarnedReward
    window.EarnedReward = function(event) {
        if (event === "open_store") {
            // Menambahkan pesan ke dalam Message Window
            $gameMessage.add("\tl{reward1}");
            
            // Mengubah Switch 32 menjadi ON setelah mendapatkan reward
            $gameSwitches.setValue(32, true);  // Switch 32 ON
        }
    };
})();
