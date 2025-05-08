/*:
 * @target MZ
 * @plugindesc [v1.4] Plugin untuk menampilkan daftar item menggunakan Text Picture Plugin. Mendukung input angka atau script.
 * @author Antika
 * 
 * @help
 * Plugin ini memungkinkan Anda untuk menambahkan atau menghapus item dari daftar
 * dan menampilkan daftar tersebut menggunakan Text Picture Plugin.
 * 
 * **PENTING**: Plugin ini membutuhkan Text Picture Plugin agar dapat berfungsi.
 * Pastikan Text Picture Plugin sudah diaktifkan di proyek Anda.
 * 
 * Plugin Commands:
 * - AddItemToList: Menambahkan item ke daftar. Input berupa angka atau script.
 * - RemoveItemFromList: Menghapus item dari daftar. Input berupa angka atau script.
 * 
 * Script Commands:
 * - Gunakan `addItemToList(itemId)` untuk menambahkan item ke daftar.
 * - Gunakan `removeItemFromList(itemId)` untuk menghapus item dari daftar.
 * - Gunakan `updateTextPicture()` untuk memperbarui teks yang ditampilkan.
 * 
 * @param lists
 * @type struct<List>[]

 * @text Lists Configuration
 * @desc Configure multiple lists with unique settings.
 * @default []
 * 
 * @command AddTextToList
 * @text Add Text to List
 * @desc Adds text (plain or control codes) to a specific list.
 * 
 * @arg listId
 * @type number
 * @text List ID
 * @desc The ID of the list to which the text will be added.
 * @default 1
 * 
 * @arg text
 * @type text
 * @text Text Content
 * @desc The text to add to the list (e.g., \Item[21]). Leave empty for default text.
 * @default \Item[1]
 * 
 * @command RemoveTextFromList
 * @text Remove Text from List
 * @desc Removes text from the list by index or matching content.
 * 
 * @arg listId
 * @type number
 * @text List ID
 * @desc The ID of the list from which the text will be removed.
 * @default 1
 * 
 * @arg index
 * @type number
 * @text Index
 * @desc The index of the text to remove (starting from 0). Leave blank to use content matching.
 * @default 
 * 
 * @arg content
 * @type text
 * @text Text Content
 * @desc The text content to remove. Leave blank to use index.
 * @default 
 * 
 * @command ClearAllLists
 * @text Clear All Lists
 * @desc Clears all items from the lists without removing their windows.
 * 
 * @arg listId
 * @type number
 * @text List ID
 * @desc The ID of the list to clear. Leave blank to clear all lists.
 * @default
 * 
 * @command ManageImageVisibility
 * @text Manage Image Visibility
 * @desc Show, hide, or toggle the visibility of an image by its list ID.
 * 
 * @arg listId
 * @type number
 * @text List ID
 * @desc The ID of the list whose image visibility will be managed.
 * @default 1
 * 
 * @arg action
 * @type select
 * @option Show
 * @value show
 * @option Hide
 * @value hide
 * @option Toggle
 * @value toggle
 * @text Action
 * @desc Choose whether to show, hide, or toggle the visibility of the image.
 * @default toggle
 */

/*~struct~List:
 * 
 * @param pictureId
 * @type number
 * @text Picture ID
 * @desc ID gambar yang digunakan untuk menampilkan teks.
 * @default 81
 * 
 * @param pictureX
 * @type number
 * @text Picture X Position
 * @desc Posisi X untuk menampilkan gambar.
 * @default 24
 * 
 * @param pictureY
 * @type number
 * @text Picture Y Position
 * @desc Posisi Y untuk menampilkan gambar.
 * @default 103
 * 
 * @param pictureScaleX
 * @type number
 * @text Picture Scale X
 * @desc Skala horizontal gambar (dalam persen).
 * @default 100
 * 
 * @param pictureScaleY
 * @type number
 * @text Picture Scale Y
 * @desc Skala vertikal gambar (dalam persen).
 * @default 100
 * 
 * @param pictureOpacity
 * @type number
 * @text Picture Opacity
 * @desc Opasitas gambar (0-255).
 * @default 255
 * 
 * @param pictureBlendMode
 * @type number
 * @text Picture Blend Mode
 * @desc Mode pencampuran gambar (0: Normal, 1: Add, 2: Multiply, 3: Screen).
 * @default 0
 * 
 * @param headerText
 * @type text
 * @text Text Header
 * @desc The default header text displayed above the list.
 * @default <b>Your List :</b>
 * 
 */

(() => {
    const pluginName = "itemlist"; // Gunakan variabel untuk nama plugin

    const parameters = PluginManager.parameters(pluginName);
    const lists = JSON.parse(parameters.lists || "[]").map(list => {
        const parsedList = JSON.parse(list);
        parsedList.items = []; // Initialize an empty list for items
        parsedList.pictureId = Number(parsedList.pictureId || 81); // Default picture ID
        parsedList.pictureX = Number(parsedList.pictureX || 24); // Default X position 
        parsedList.pictureY = Number(parsedList.pictureY || 103); // Default Y position
        parsedList.pictureScaleX = Number(parsedList.pictureScaleX || 100); // Default scale X 
        parsedList.pictureScaleY = Number(parsedList.pictureScaleY || 100); // Default scale Y
        parsedList.pictureOpacity = Number(parsedList.pictureOpacity || 255); // Default opacity
        parsedList.pictureBlendMode = Number(parsedList.pictureBlendMode || 0); // Default blend mode
        parsedList.headerText = parsedList.headerText || "<b>Your List :</b>"; // Default header text
        return parsedList;
    });

    let listText = "";

    const _Game_Picture_show = Game_Picture.prototype.show;
    Game_Picture.prototype.show = function() {
        _Game_Picture_show.apply(this, arguments);
        if (this._name === "" && listText) {
            this.mzkp_text = listText;
            this.mzkp_textChanged = true;
            listText = "";
        }
    };

    const _Sprite_Picture_destroy = Sprite_Picture.prototype.destroy;
    Sprite_Picture.prototype.destroy = function() {
        destroyTextPictureBitmap(this.bitmap);
        _Sprite_Picture_destroy.apply(this, arguments);
    };

    const _Sprite_Picture_updateBitmap = Sprite_Picture.prototype.updateBitmap;
    Sprite_Picture.prototype.updateBitmap = function() {
        _Sprite_Picture_updateBitmap.apply(this, arguments);
        if (this.visible && this._pictureName === "") {
            const picture = this.picture();
            const text = picture ? picture.mzkp_text || "" : "";
            const textChanged = picture && picture.mzkp_textChanged;
            if (this.mzkp_text !== text || textChanged) {
                this.mzkp_text = text;
                destroyTextPictureBitmap(this.bitmap);
                this.bitmap = createTextPictureBitmap(text);
                picture.mzkp_textChanged = false;
            }
        } else {
            this.mzkp_text = "";
        }
    };

    function createTextPictureBitmap(text) {
        const tempWindow = new Window_Base(new Rectangle());
        const size = tempWindow.textSizeEx(text);
        tempWindow.padding = 0;
        tempWindow.move(0, 0, size.width, size.height + 10);
        tempWindow.createContents();
        tempWindow.drawTextEx(text, 0, 0, 0);
        const bitmap = tempWindow.contents;
        tempWindow.contents = null;
        tempWindow.destroy();
        bitmap.mzkp_isTextPicture = true;
        return bitmap;
    }

    function destroyTextPictureBitmap(bitmap) {
        if (bitmap && bitmap.mzkp_isTextPicture) {
            bitmap.destroy();
        }
    }

    // Function to get a list by its ID
    function getListById(listId) {
        return lists[listId - 1]; // List ID is 1-based, so we subtract 1 for 0-based index
    }

    // Function to add text to a list
    function addTextToList(text, listId) {
        const list = getListById(listId);
        if (!list) return;

        // Process the text to evaluate any embedded script
        const processedText = text.replace(/\${(.*?)}/g, (_, script) => {
            try {
                return eval(script); // Evaluate the script inside ${}
            } catch (e) {
                console.error(`[AddTextToList] Error evaluating script: ${script}`, e);
                return ""; // Return an empty string if there's an error
            }
        });

        // Convert text codes like \V[x] to their actual values
        const finalText = Window_Base.prototype.convertEscapeCharacters(processedText);

        console.log(`[AddTextToList] Adding text: "${finalText}" to List ID: ${listId}`);
        list.items.push(finalText); // Add the processed text to the list

        updateTextPicture(listId); // Update the text
    }

    // Function to remove text from a list by index
    function removeTextFromListByIndex(index, listId) {
        const list = getListById(listId);
        if (!list || !list.items || index < 0 || index >= list.items.length) return;
        console.log(`[RemoveTextFromList] Removing text at index: ${index} from List ID: ${listId}`);
        list.items.splice(index, 1); // Remove the text at the specified index
        updateTextPicture(listId); // Automatically update the displayed text
    }

    // Function to remove text from a list by matching content
    function removeTextFromListByContent(content, listId) {
        const list = getListById(listId);
        if (!list || !list.items) return;

        // Process the content to evaluate any embedded script
        const processedContent = content.replace(/\${(.*?)}/g, (_, script) => {
            try {
                return eval(script); // Evaluate the script inside ${}
            } catch (e) {
                console.error(`[RemoveTextFromList] Error evaluating script: ${script}`, e);
                return ""; // Return an empty string if there's an error
            }
        });

        // Convert text codes like \V[x] to their actual values
        const finalContent = Window_Base.prototype.convertEscapeCharacters(processedContent);

        // Find the first matching content
        const index = list.items.indexOf(finalContent);
        if (index !== -1) {
            console.log(`[RemoveTextFromList] Removing text: "${finalContent}" from List ID: ${listId}`);
            list.items.splice(index, 1); // Remove the matching text
        } else {
            console.log(`[RemoveTextFromList] Text: "${finalContent}" not found in List ID: ${listId}`);
        }

        updateTextPicture(listId); // Automatically update the displayed text
    }

    function clearAllItemsFromList(listId) {
        const list = getListById(listId);
        if (!list || !list.items) return;
        console.log(`[ClearAllItemsFromList] Clearing all items from List ID: ${listId}`);
        list.items = []; // Clear all items in the list
        updateTextPicture(listId); // Automatically update the displayed text
    }

    // Function to generate the text content for a list
    function generateItemListText(list) {
        const header = list.headerText;
        const items = list.items.join("\n"); // Join all items with a newline
        return `${header}\n${items}`;
    }
    

    // Fungsi untuk memperbarui Text Picture
       function updateTextPicture(listId) {
        const list = getListById(listId); // Ambil data list berdasarkan listId
        if (!list) {
            console.error(`[updateTextPicture] List dengan ID ${listId} tidak ditemukan.`);
            return;
        }
    
        listText = generateItemListText(list); // Buat teks dari daftar
    
        // Tampilkan gambar menggunakan parameter dari list
        $gameScreen.showPicture(
            list.pictureId, // ID gambar dari list
            "", // Nama file gambar (kosong untuk teks)
            list.pictureBlendMode, // Mode pencampuran dari list
            list.pictureX, // Posisi X dari list
            list.pictureY, // Posisi Y dari list
            list.pictureScaleX, // Skala X dari list
            list.pictureScaleY, // Skala Y dari list
            list.pictureOpacity, // Opasitas dari list
            0 // Rotasi
        );
    }

    // Plugin Command: AddTextToList
    PluginManager.registerCommand(pluginName, "AddTextToList", args => {
        const listId = Number(args.listId);
        const text = args.text;
        addTextToList(text, listId);
    });

    // Plugin Command: RemoveTextFromList
    PluginManager.registerCommand(pluginName, "RemoveTextFromList", args => {
        const listId = Number(args.listId);
        const index = args.index ? Number(args.index) : null;
        const content = args.content || null;

        if (index !== null) {
            removeTextFromListByIndex(index, listId);
        } else if (content) {
            removeTextFromListByContent(content, listId);
        }
    });

    // Plugin Command: ClearAllLists
    PluginManager.registerCommand(pluginName, "ClearAllLists", args => {
        console.log(`[RemoveItemFromList] Command dipanggil dengan args:`, args);
        const listId = Number(args.listId); // Mengambil listId dari argumen
        clearAllItemsFromList(listId); // Hapus item dari daftar
    });

    // Plugin Command: ManageImageVisibility
    PluginManager.registerCommand(pluginName, "ManageImageVisibility", args => {
        const listId = Number(args.listId); // Get the list ID from the arguments
        const action = args.action; // Get the action (show, hide, toggle)
        const list = getListById(listId); // Retrieve the list by its ID
    
        if (!list) {
            console.error(`[ManageImageVisibility] List with ID ${listId} not found.`);
            return;
        }
    
        const pictureId = list.pictureId; // Get the picture ID from the list
    
        switch (action) {
            case "show":
                updateTextPicture(listId); // Update the text picture to show it again
                console.log(`[ManageImageVisibility] Showing picture with ID ${pictureId} for List ID ${listId}`);
                break;
    
            case "hide":
                $gameScreen.erasePicture(pictureId);
                console.log(`[ManageImageVisibility] Hiding picture with ID ${pictureId} for List ID ${listId}`);
                break;
    
            case "toggle":
                const picture = $gameScreen.picture(pictureId);
                if (picture) {
                    $gameScreen.erasePicture(pictureId);
                    console.log(`[ManageImageVisibility] Toggling picture: Hiding picture with ID ${pictureId} for List ID ${listId}`);
                } else {
                    updateTextPicture(listId); // Update the text picture to show it again
                    console.log(`[ManageImageVisibility] Toggling picture: Showing picture with ID ${pictureId} for List ID ${listId}`);
                }
                break;
    
            default:
                console.error(`[ManageImageVisibility] Invalid action: ${action}`);
                break;
        }
    });
})();