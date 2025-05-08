/*:
 * @target MZ
 * @plugindesc [v1.4] Plugin for creating and displaying a text list using a custom window. Add and remove text dynamically via plugin commands.
 * 
 * @help
 * This plugin allows you to create a text list and display it using a custom window.
 * You can dynamically add or remove text from the list using plugin commands.
 * 
 * Plugin Commands:
 * - AddTextToList: Adds text (plain or control codes) to the list.
 * - RemoveTextFromList: Removes text from the list by index or matching content.
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
 * @command SetCustomBackground
 * @text Set Custom Background
 * @desc Sets a custom background image for the text list window and adjusts text offsets.
 * 
 * @arg listId
 * @type number
 * @text List ID
 * @desc The ID of the list to set the custom background for.
 * @default 1
 * 
 * @arg image
 * @type file
 * @dir img/pictures
 * @text Background Image
 * @desc The image to use as the custom background.
 * @default 
 * 
 * @arg offsetX
 * @type number
 * @text Offset X
 * @desc The horizontal offset for the text.
 * @default 0
 * 
 * @arg offsetY
 * @type number
 * @text Offset Y
 * @desc The vertical offset for the text.
 * @default 0
 * 
 * @command ManageListVisibility
 * @text Manage List Visibility
 * @desc Allows you to show, hide, or toggle the visibility of a specific list window.
 * 
 * @arg listId
 * @type number
 * @text List ID
 * @desc The ID of the list to manage visibility for.
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
 * @desc Choose whether to show, hide, or toggle the visibility of the list window.
 * @default toggle
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
 */

/*~struct~List:
 * @param id
 * @type number
 * @text List ID
 * @desc The unique ID of the list.
 * @default 1
 * 
 * @param defaultText
 * @type text
 * @text Text Header
 * @desc The default header text displayed above the list.
 * @default <b>Your List :</b>
 * 
 * @param x
 * @text X Position
 * @desc The X position of the window. Can be a negative number or a string expression.
 * @default 0
 * 
 * @param y
 * @text Y Position
 * @desc The Y position of the window. Can be a negative number or a string expression.
 * @default 0
 * 
 * @param padding
 * @type number
 * @text Window Padding
 * @desc The padding around the text inside the window.
 * @default 18
 * 
 * @param backgroundType
 * @type select
 * @option Transparent
 * @value transparent
 * @option Normal
 * @value normal
 * @text Background Type
 * @desc Choose the type of background for this specific list window.
 * @default transparent
 * 
 * @param customBackground
 * @type file
 * @dir img/pictures
 * @text Custom Background Image
 * @desc The image to use as the custom background for this specific list window if 'Bitmap' is selected.
 * @default 
 * 
 * @param customWidth
 * @type number
 * @text Custom Width
 * @desc Set a custom width for the window. Leave blank to calculate automatically.
 * @default 
 * 
 * @param customHeight
 * @type number
 * @text Custom Height
 * @desc Set a custom height for the window. Leave blank to calculate automatically.
 * @default 
 */

(() => {
    const pluginName = "textList";
    const parameters = PluginManager.parameters(pluginName);
    const lists = JSON.parse(parameters.lists || "[]").map(list => {
        const parsedList = JSON.parse(list);
        parsedList.items = []; // Initialize an empty list for items
        parsedList.defaultText = parsedList.defaultText || "<b>Your List :</b>"; // Default header text
        parsedList.x = Number(parsedList.x || 0); // Default X position
        parsedList.y = Number(parsedList.y || 0); // Default Y position
        parsedList.padding = Number(parsedList.padding || 18); // Default padding
        parsedList.backgroundType = parsedList.backgroundType || "transparent"; // Default background type
        parsedList.customBackground = parsedList.customBackground || null; // Default custom background
        parsedList.customWidth = parsedList.customWidth ? Number(parsedList.customWidth) : null; // Default custom width
        parsedList.customHeight = parsedList.customHeight ? Number(parsedList.customHeight) : null; // Default custom height
        return parsedList;
    });

    class TextListWindow extends Window_Base {
        constructor(rect, list) {
            super(rect);
            this._text = ""; // Initialize with empty text
            this._offsetX = 0; // Default text offset X
            this._offsetY = 0; // Default text offset Y
            this._backgroundType = list.backgroundType || "transparent"; // Load background type from list settings
            this._customBackground = list.customBackground || null; // Load custom background from list settings

            this.setBackgroundType(this._backgroundType);
            if (this._customBackground) {
                this.setCustomBackground(this._customBackground);
            }
        }

        setBackgroundType(type) {
            if (type === "transparent") {
                super.setBackgroundType(2); // Transparent background
            } else if (type === "normal") {
                super.setBackgroundType(0); // Normal background
            }
        }

        setText(text) {
            if (this._text !== text) {
                console.log(`[SetText] Updating text to: ${text}`);
                this._text = text;
            }
            this.refresh();
        }

        setOffsets(offsetX, offsetY) {
            this._offsetX = offsetX;
            this._offsetY = offsetY;
            this.refresh();
        }

        setCustomBackground(image) {
            console.log(`[SetCustomBackground] Loading image: ${image}`); // Log the image being loaded
            const bitmap = ImageManager.loadPicture(image);
            this._customBackground = new Bitmap(this.contentsWidth(), this.contentsHeight()); // Create a blank bitmap with the window's size

            bitmap.addLoadListener(() => {
                console.log(`[SetCustomBackground] Image loaded successfully: ${image}`); // Log successful image load
                this._customBackground.blt(
                    bitmap, // Source bitmap
                    0, 0, // Source x, y
                    bitmap.width, bitmap.height, // Source width, height
                    0, 0, // Destination x, y
                    this.contentsWidth(), this.contentsHeight() // Destination width, height (stretch to fit)
                );
                this.refresh(); // Refresh the window after the image is loaded and processed
            });
        }

        refresh() {
            this.contents.clear(); // Clear the window contents
            if (this._customBackground) {
                this.contents.blt(
                    this._customBackground,
                    0,
                    0,
                    this._customBackground.width,
                    this._customBackground.height,
                    0,
                    0,
                    this.contentsWidth(),
                    this.contentsHeight() // Stretch the background to fit the window
                );
            }
            this.drawTextEx(this._text, this._offsetX + this.padding, this._offsetY + this.padding); // Draw the text with control codes and offsets
        }
    }

    let textListWindows = {}; // Store windows by list ID

    function createTextListWindowIfNeeded(listId) {
        if (!textListWindows[listId]) {
            const list = getListById(listId);
            if (!list) return;

            // Generate the text to be displayed
            const listText = generateItemListText(list);

            // Calculate the size of the text
            const textSize = calculateTextSize(listText, list);

            // Create the window with the calculated size
            const rect = new Rectangle(
                list.x,
                list.y,
                Math.max(textSize.width + list.padding * 2, 200), // Minimum width
                Math.max(textSize.height + list.padding * 2, 100) // Minimum height
            );
            console.log(`[CreateTextListWindow] List ID: ${listId}, Rect:`, rect); // Debug the size when window is created
            const window = new TextListWindow(rect, list);

            // Add the window to the current scene
            SceneManager._scene.addWindow(window);
            textListWindows[listId] = window;

            // Ensure the contents area is created
            //window.createContents();

            // Set the text to the window
            //window.setText(listText);
        }
    }

    function updateTextListWindow(listId) {
        const list = getListById(listId);
        if (!list) {
            console.error(`List with ID ${listId} is not defined.`); // Log an error if the list is not found
            return;
        }

        // Ensure the window exists
        if (!textListWindows[listId]) {
            createTextListWindowIfNeeded(listId);
        }

        const window = textListWindows[listId];
        if (window) {
            const listText = generateItemListText(list);
            console.log(`[UpdateTextListWindow] List ID: ${listId}, Content:`, listText); // Log the list content
            
            // Calculate the size of the text
            const textSize = calculateTextSize(listText, list);
           
            // Use a temporary window to calculate the size dynamically
            /*const tempWindow = new Window_Base(new Rectangle(0, 0, 1, 1));
            tempWindow.padding = 0; // Remove padding for accurate size
            tempWindow.move(0, 0, 1, 1); // Initialize with minimal size
            tempWindow.createContents(); // Create contents for text measurement
            const textSize = tempWindow.textSizeEx(listText); // Calculate text size
            tempWindow.destroy(); // Clean up the temporary window

            // Update the actual window rectangle
            const rect = new Rectangle(
                list.x, // X position
                list.y, // Y position
                Math.max(textSize.width + list.padding * 2, 200), // Minimum width
                Math.max(textSize.height + list.padding * 2, 100) // Minimum height
            );*/
            window.move(
                list.x,
                list.y,
                Math.max(textSize.width + list.padding * 2, 200), // Minimum width
                Math.max(textSize.height + list.padding * 2, 100)
             ); // Update the window's rectangle
            window.createContents(); // Recreate the contents area to match the new size
            console.debug(`[UpdateTextListWindow] Window moved to X: ${list.x}, Y: ${list.y}, Width: ${Math.max(textSize.width + list.padding * 2, 200)}, Height: ${Math.max(textSize.height + list.padding * 2, 100)}`); // Debug the move operation

            // Update the text in the window
            window.setText(listText);
        }
    }

    // Function to get a list by its ID
    function getListById(listId) {
        return lists.find(list => Number(list.id) === listId);
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

        // Ensure the window exists and update it
        createTextListWindowIfNeeded(listId); // Create the window if it doesn't exist
        updateTextListWindow(listId); // Update the text in the window
    }

    // Function to remove text from a list by index
    function removeTextFromListByIndex(index, listId) {
        const list = getListById(listId);
        if (!list || !list.items || index < 0 || index >= list.items.length) return;
        console.log(`[RemoveTextFromList] Removing text at index: ${index} from List ID: ${listId}`);
        list.items.splice(index, 1); // Remove the text at the specified index
        updateTextListWindow(listId); // Automatically update the displayed text
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

        updateTextListWindow(listId); // Automatically update the displayed text
    }

    function clearAllItemsFromList(listId) {
        const list = getListById(listId);
        if (!list || !list.items) return;
        console.log(`[ClearAllItemsFromList] Clearing all items from List ID: ${listId}`);
        list.items = []; // Clear all items in the list
        updateTextListWindow(listId); // Automatically update the displayed text
    }

    // Function to generate the text content for a list
    function generateItemListText(list) {
        const header = list.defaultText;
        const items = list.items.join("\n"); // Join all items with a newline
        return `${header}\n${items}`;
    }

    function calculateTextSize(text, list) {
        const tempWindow = new Window_Base(new Rectangle(0, 0, 1, 1)); // Temporary window for calculations
        tempWindow.padding = 0; // Remove padding for accurate size
        const size = tempWindow.textSizeEx(text); // Calculate the size of the text
        const lines = text.split("\n"); // Split text into lines for multi-line support
        let totalHeight = 0;

        lines.forEach(line => {
            const lineSize = tempWindow.textSizeEx(line);
            totalHeight += lineSize.height; // Add the height of each line
            size.width = Math.max(size.width, lineSize.width); // Find the maximum width
        });

        tempWindow.destroy(); // Clean up the temporary window

        // Log the calculated text size for debugging
        // console.log(`Calculated Text Size: Width = ${size.width}, Height = ${totalHeight}`);

        // Use custom width and height if provided, otherwise use calculated size
        const finalWidth = list.customWidth ? Number(list.customWidth) : size.width;
        const finalHeight = list.customHeight ? Number(list.customHeight) : totalHeight;

        console.log(`Final Text Size: Width = ${finalWidth}, Height = ${finalHeight}`); // Log the final size

        return { width: finalWidth, height: finalHeight };
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

    PluginManager.registerCommand(pluginName, "SetCustomBackground", args => {
        const listId = Number(args.listId);
        const image = args.image;
        const offsetX = Number(args.offsetX || 0);
        const offsetY = Number(args.offsetY || 0);

        const window = textListWindows[listId];
        // Ensure the window exists and update it
        createTextListWindowIfNeeded(listId); // Create the window if it doesn't exist
        updateTextListWindow(listId); // Update the text in the window
        if (window) {
            window.setCustomBackground(image);
            window.setOffsets(offsetX, offsetY);
            window.refresh(); // Ensure the window is refreshed to apply the new background
        } else {
            console.error(`Window for List ID ${listId} not found.`);
            createTextListWindowIfNeeded(listId); // Create the window if it doesn't exist
            updateTextListWindow(listId); // Update the text in the window
        }

    });

    PluginManager.registerCommand(pluginName, "ManageListVisibility", args => {
        const listId = Number(args.listId);
        const action = args.action;
        const window = textListWindows[listId];

        // Ensure the window exists and update it
        createTextListWindowIfNeeded(listId); // Create the window if it doesn't exist
        if (window) {
            switch (action) {
                case "show":
                    console.log(`[ManageListVisibility] Showing window for List ID: ${listId}`);
                    window.show();
                    break;
                case "hide":
                    console.log(`[ManageListVisibility] Hiding window for List ID: ${listId}`);
                    window.hide();
                    break;
                case "toggle":
                    if (window.visible) {
                        console.log(`[ManageListVisibility] Hiding window for List ID: ${listId}`);
                        window.hide();
                    } else {
                        console.log(`[ManageListVisibility] Showing window for List ID: ${listId}`);
                        window.show();
                    }
                    break;
            }
        } else {
            console.error(`Window for List ID ${listId} not found.`);
        }
    });

    PluginManager.registerCommand(pluginName, "ClearAllLists", args => {
        const listId = Number(args.listId);
        console.log(`[ClearAllLists] Clearing list with ID: ${listId}`);
        clearAllItemsFromList(listId); // Use the clearAllItemsFromList function to clear the list
    });
})();

