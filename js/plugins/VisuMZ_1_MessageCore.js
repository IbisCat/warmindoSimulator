//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.54;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.54] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Dim Background Extension
 * 
 * Before, when using the Dim Background as a part of a Show Text event, its
 * size is only the same as the message window's width itself. This looked
 * really ugly because it had hard edges cutting off while gradients are seen
 * elsewhere. To make it look better, we extended the dimmed background to span
 * the width of the screen instead.
 * 
 * ---
 * 
 * Extended Messages
 * 
 * If you decide to expand the size of the message window to allow for more
 * rows to be displayed, you can type in the data for them by chaining together
 * Show Message events. They will take data from each other and display them in
 * the same message window as long as there are enough rows.
 * 
 * ---
 *
 * Extended Choice Lists
 * 
 * Choice lists can be extended by just chaining one Choice List event after
 * the other in succession along the same indentation. They do not extend if
 * there is any event other than a Choice List option between them on the same
 * indentation level.
 *
 * ---
 *
 * ============================================================================
 * Text Language Information
 * ============================================================================
 *
 * As of Message Core version 1.46, Text Language has been added. 
 * 
 * The "Text Language" feature allows your players to switch between different
 * languages for your game to allow people from around the globe to enjoy what
 * story you have to tell.
 * 
 * Disclaimers: This is not an automatic translation tool. Translations made
 * through the "Text Language" feature of the VisuStella MZ Message Core
 * will require manual input by the game developer.
 * 
 * As of Message Core version 1.53, we've decided to add support for TSV.
 * 
 * This is because we have done our research and decided that CSV's are too
 * restricted to use due to their default nature of wanting to use commas as
 * separators. Thus, we've decided to switch to TSV where the default separator
 * is a tab space, something that is almost never used in RPG Maker text.
 *
 * ---
 * 
 * === How to Enable Switching ===
 * 
 * Text Language is NOT enabled by default. Here's what you have to do:
 * 
 * #1. Open up the Message Core's Plugin Parameters
 * #2. Plugin Parameters > Text Language Settings > Enable Switching?
 * #3. Change the "Enable Switching?" parameter setting to "true".
 * #4. Adjust any other settings as needed.
 * #5. Save the Plugin Parameter changes.
 * #6. Save your game.
 * 
 * Now, it's time to get the CSV/TSV file that will contain all of the text
 * used to translate your game's script.
 * 
 * #1. Play test your game. Make sure Play test mode is NOT disabled.
 * #2. A popup will appear asking to create a language CSV/TSV file.
 * #3. Click "OK" and let the plugin do its thing.
 * #4. The project's /data/ folder will appear with Language.csv/tsv made.
 * #5. The plugin will then ask you to restart your game.
 * 
 * '''IMPORTANT!''' The separator used for the CSV file must be a semicolon (;)
 * and not a comma (,) as to reduce the amount of punctuation conflicts. Keep
 * this in mind as most CSV editors will default to comma (,) instead of the
 * semicolon (;) for their separator.
 * 
 * ---
 * 
 * === How to Edit the Language CSV/TSV ===
 * 
 * The Language CSV/TSV is structured as a normal CSV/TSV file would be, which
 * also means it can be modified in programs like Microsoft Excel or Google
 * Sheets. We recommend using either of those programs to modify the text.
 * 
 * We do not recommend modifying the CSV/TSV file in programs like notepad
 * directly due to the way certain things like commas (,) and tabs are handled
 * and how easy it is to be error-prone.
 * 
 * The table will appear something like this at first:
 * 
 *     Key        English    Chinese    Japanese     Korean
 *     Greeting   Hello      你好       こんにちは    안녕하세요
 *     Farewell   Good-bye   再见       さようなら    안녕히
 *     Wow        Wow        哇         ワオ          와우
 * 
 * The "Key" column refers to the reference key used to determine which lines
 * will be inserted into the text. The columns with the languages will utilize
 * the respective phrases for that language.
 * 
 * You can remove columns containing languages that you aren't planning to
 * translate for your game.
 * 
 * ---
 * 
 * === Things to Keep in Mind ===
 * 
 * When adding text to the CSV/TSV file via the spreadsheet editor (Excel or
 * Google Sheets), there's a few things to keep in mind.
 * 
 * ---
 * 
 * ==== How to Load the CSV/TSV in Google Sheets ====
 * 
 * If you are using Google Sheets and wish to edit the CSV/TSV without it
 * converting all the separators into commas, here's what you do:
 * 
 * #1. Go to "https://sheets.google.com"
 * #2. Create a "Blank spreadsheet"
 * #3. File > Import > Upload > Select the CSV/TSV file that was created in
 *     your game project's /data/ folder. You may need to select "All Files"
 *     for file type if uploading a TSV.
 * #4. For "Separator Type", if you are using CSV, change it to "Custom" and
 *     insert the Semicolon ";". Otherwise, if you are using TSV, select "tab"
 *     as your separator type.
 * #5. Uncheck "Convert text to numbers, dates, and formulas"
 * 
 * ==== How to Load the CSV/TSV in VS Code ===
 * 
 * #1. Go to "https://code.visualstudio.com/"
 * #2. Download and install it
 * #3. Open up VS Code and go to View > Extensions
 * #4. Search for an extension called "Edit CSV"
 * #5. Load the CSV/TSV file into VS Code and view with the CSV Editor
 * #6. Click the button that says "Edit CSV" in the upper right
 * 
 * ==== Line Breaks ====
 * 
 * When you want to insert line breaks into the translated phrases, use the
 * <br> text code. This is best used for text that is to be transferred into
 * the message window or help window.
 * 
 * ==== Text Codes ====
 * 
 * Text codes like \C[2] can be inserted normally. However, they only work in
 * windows that support text codes, such as the message window or help window.
 * Otherwise, the text codes will not transfer over properly.
 * 
 * ==== Semicolons (CSV Only) ====
 * 
 * Due to the nature of the CSV file, we used the semicolon (;) as the
 * separator. As such, semicolons should not be used in the text entries.
 * Though some sentences will work with the semicolon, not all of them will. If
 * you do want to use a semicolon, use the text code <semicolon> instead.
 * 
 *   Example:
 * 
 *   "The pancakes were delicious<semicolon> they were fluffy and sweet."
 * 
 * Other variations of the semicolon text code are <semi> and <semi-colon>.
 * The <semicolon> text code and variants only work with the Language CSV and
 * are ignored otherwise when typed in a regular message box entry.
 * 
 * ---
 * 
 * ==== Macros and Language Switches ====
 * 
 * For those using both text macros and text language switches, macros will be
 * converted to text before language switches as it allows for better text
 * transitions that way.
 * 
 * ---
 * 
 * === How to Use the Reference Keys ===
 * 
 * Remember the "Key" column and the reference keys? Those are used to
 * determine which lines will be inserted into the text for the message window
 * and just about any other window. However, there's a specific way these keys
 * must be used in order for them to work.
 * 
 * The "text code" format works like this. Use any of the following:
 * 
 *   \tl{keyName}
 *   \translate{keyName}
 *   \loc{keyName}
 *   \locale{keyName}
 *   \localize{keyName}
 * 
 * or for those coming from different translation plugins but want to switch
 * over to the VisuStella MZ Message Core's translation system:
 * 
 *   ${keyName}
 * 
 * For example, to use one of the default keys made with the Language CSV/TSV:
 * 
 *   \tl{Greeting}
 * 
 * This will yield "Hello" in English, "你好" in Chinese, "こんにちは" in
 * Japanese, and "안녕하세요" in Korean.
 * 
 * Key names are not case sensitive and any trailing spaces will be removed
 * from them in order to make sure the CSV/TSV table is stable to reference any
 * translated text from.
 * 
 * You can insert these language "text codes" into item names, skill names,
 * etc. as well as system entries like for Attack, Defense, etc.
 * 
 * ---
 * 
 * === Naming Weapon Types, Armor Types, Equip Types, Item Categories ===
 * 
 * You might have noticed that if you've decided to use \tl{keyName} for weapon
 * or other database types, other parts of the game will error out. Don't
 * worry, for these, you don't have to change the currently used database name.
 * Go straight to the CSV/TSV and insert in a new key for that particular
 * database name. For example, the equip type "Accessory" will use "Accessory"
 * as the automatic key to look for a translated phrase. If there isn't any in
 * the CSV/TSV file, then the default database text entry will be used.
 * 
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned. *Note1*
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned. *Note1*
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned. *Note1*
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start. Does not work with Word Wrap.
 *
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 * Word Wrap also cannot be used together with <left>, <center>, or <right> and
 * will disable itself if text alignment text codes are detected.
 *
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 * 
 * While these text codes are available globally, they are best suited for use
 * in the message window or any other window that does not change its contents.
 * The reason being is because the picture drawn is drawn into the background
 * of the window.
 * 
 * Therefore, we do not recommend using this in windows that change contents
 * often like Help Windows or Quest Descriptions. Instead, we recommend using
 * icons instead.
 * 
 * As of the version 1.53 update, the Help Window now supports both of these
 * text codes. However, we still recommend using icons over using pictures as
 * there will be loading delays.
 *
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Map Name)
 * ------------------   -------------------------------------------------------
 * <left>               Makes map name align to left side of screen.
 * <center>             Makes map name align to horizontally center of screen.
 * <right>              Makes map name align to right side of screen.
 * 
 * <top>                Makes map name align to top of screen.
 * <middle>             Makes map name align to vertically middle of screen.
 * <bottom>             Makes map name align to bottom of screen.
 * 
 * <X: +n>              Adjusts the horizontal position of map name by n.
 * <X: -n>              Adjusts the horizontal position of map name by n.
 * 
 * <Y: +n>              Adjusts the vertical position of map name by n.
 * <Y: -n>              Adjusts the vertical position of map name by n.
 * 
 * Note: All of these text codes require VisuMZ_0_CoreEngine installed and its
 * "Map Name Text Code" plugin parameter enabled.
 * 
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <Caps>               Makes all text after this capitalized.
 *                      Turns off other auto-text case modes.
 *                      ie: "hello world" becomes "HELLO WORLD"
 * </Caps>              Turns off auto text-casing effects.
 * 
 * <Upper>              Makes the first letter of any word after a space to be
 *                      capitalized. Other letters are left alone.
 *                      Turns off other auto-text case modes.
 *                      ie. "old mcDonald" becomes "Old McDonald"
 * </Upper>             Turns off auto text-casing effects.
 * 
 * <Lower>              Makes all text after this lowercase.
 *                      Turns off other auto-text case modes.
 *                      ie: "THE QUICK BROWN FOX" becomes "the quick brown fox"
 * </Lower>             Turns off auto text-casing effects.
 * 
 * <Alt>                Makes all text after this alternate between uppercase
 *                      and lowercase. Turns off other auto-text case modes.
 *                      ie: "Hello" becomes "HeLlO"
 * </Alt>               Turns off auto text-casing effects.
 * 
 * <Chaos>              Makes all text after this randomize between uppercase
 *                      and lowercase. Turns off other auto-text case modes.
 *                      ie: "Wassup" becomes "waSsUP" or "WasSuP"
 * </Chaos>             Turns off auto text-casing effects.
 * 
 * **Clarity:** In case you're wondering, the text codes </Caps>, </Upper>,
 * </Lower>, </Alt>, and </Chaos> all do the same thing and can be used
 * interchangeably with each other. For example, you can do this:
 * <Caps>hello world</Lower> and it would still accomplish the same effect, but
 * you won't do that because you're not a monster of a developer.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 * 
 * <Next Page>          Ends the current message page at this line. This is
 *                      used for messages when rows are at 5 or above and the
 *                      message lines don't match the amount. This is used to
 *                      prevent grabbing message windows from following message
 *                      events. Any lines following <Next Page> in the same
 *                      message event will be ignored.
 * 
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 * 
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * ----------------------------   ---------------------------------------------
 * Text Code                      Effect (Battle Only)
 * ----------------------------   ---------------------------------------------
 * <Current Battle Target>        Replaces text code with the current target of
 *                                an action in battle.
 * <Current Battle User>          Replaces text code with the currently active
 *                                user in battle.
 * <Current Battle Action>        Replaces text code with the current battle
 *                                action's name with an icon in front.
 * <Current Battle Action Name>   Replaces text code with the current battle
 *                                action's name without an icon.
 * 
 * If there is no battle, no target, no user, or no action, then the text code
 * will just be replaced with no text.
 * 
 * These text codes are NOT recommended to be used inside of Help Descriptions.
 * They are best used with "Show Text" event commands.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 * 
 * <Choice Width: x>              Sets the minimum text area width to x.
 *                                Applies to whole choice window.
 * <Choice Indent: x>             Sets the indent to x value. Applies to
 *                                current choice selection only.
 * 
 * <BgColor: x>                   Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to 'x' text color. This
 *                                will be combined with a fading
 * <BgColor: x,y>                 Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to 'x' to 'y' gradient
 *                                text color.
 * <BgColor: #rrggbb>             Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to '#rrggbb' color using
 *                                hex color values.
 * <BgColor: #rrggbb, #rrggbb>    Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to '#rrggbb' gradient
 *                                using hex color values.
 * 
 * <Help> text </Help>            Makes a help window appear and have it show
 *                                'text' in its contents. The help window will
 *                                disappear if no text is displayed.
 * 
 * <Shuffle>                      Shuffles the order of all choices. Any cancel
 *                                shortcuts other than "Branch" will be undone.
 * <Shuffle: x>                   Shuffles the order of all choices and only
 *                                x number of them will appear. Any cancel
 *                                shortcuts other than "Branch" will be undone.
 *                                Hidden choices do not count towards x number.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Background Effects (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * 
 * <BgImg: filename>              Creates a background image from img/pictures/
 *                                stretched across the choice rectangle.
 * <BgImg LowerLeft: filename>    Creates a background image from img/pictures/
 *                                scaled to the lower left of choice rect.
 * <BgImg LowerCenter: filename>  Creates a background image from img/pictures/
 *                                scaled to the lower center of choice rect.
 * <BgImg LowerRight: filename>   Creates a background image from img/pictures/
 *                                scaled to the lower right of choice rect.
 * <BgImg MidLeft: filename>      Creates a background image from img/pictures/
 *                                scaled to the middle left of choice rect.
 * <BgImg Center: filename>       Creates a background image from img/pictures/
 *                                scaled to the center of choice rect.
 * <BgImg MidRight: filename>     Creates a background image from img/pictures/
 *                                scaled to the middle right of choice rect.
 * <BgImg UpperLeft: filename>    Creates a background image from img/pictures/
 *                                scaled to the upper left of choice rect.
 * <BgImg UpperCenter: filename>  Creates a background image from img/pictures/
 *                                scaled to the upper center of choice rect.
 * <BgImg UpperRight: filename>   Creates a background image from img/pictures/
 *                                scaled to the upper right of choice rect.
 * 
 * *Note:* For the <BgImg: filename> text code variants, even if the background
 * image is smaller than the choice contents, it will overscale to match its
 * choice rectangle dimensions.
 * 
 * *Note:* Using a background image will clear the dimmed background rectangle
 * that is normally behind each selectable choice.
 * 
 * *Note:* Each choice can only have one background image but can use a
 * combination of one background and one foreground image.
 * 
 * *Note:* Images in the background will appear behind the select cursor.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Foreground Effects (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * 
 * <FgImg: filename>              Creates a foreground image from img/pictures/
 *                                stretched across the choice rectangle.
 * <FgImg LowerLeft: filename>    Creates a foreground image from img/pictures/
 *                                scaled to the lower left of choice rect.
 * <FgImg LowerCenter: filename>  Creates a foreground image from img/pictures/
 *                                scaled to the lower center of choice rect.
 * <FgImg LowerRight: filename>   Creates a foreground image from img/pictures/
 *                                scaled to the lower right of choice rect.
 * <FgImg MidLeft: filename>      Creates a foreground image from img/pictures/
 *                                scaled to the middle left of choice rect.
 * <FgImg Center: filename>       Creates a foreground image from img/pictures/
 *                                scaled to the center of choice rect.
 * <FgImg MidRight: filename>     Creates a foreground image from img/pictures/
 *                                scaled to the middle right of choice rect.
 * <FgImg UpperLeft: filename>    Creates a foreground image from img/pictures/
 *                                scaled to the upper left of choice rect.
 * <FgImg UpperCenter: filename>  Creates a foreground image from img/pictures/
 *                                scaled to the upper center of choice rect.
 * <FgImg UpperRight: filename>   Creates a foreground image from img/pictures/
 *                                scaled to the upper right of choice rect.
 * 
 * *Note:* For the <FgImg: filename> text code variants, unlike the background
 * variant, the foreground image will not overscale past its original size.
 * Instead, it will maintain its original size or be smaller, so long as it can
 * be scaled to exist within the choice rectangle unless it is intended to be
 * stretched by using the <FgImg: filename> variant.
 * 
 * *Note:* Text is then written on top of the foreground image.
 * 
 * *Note:* Each choice can only have one foreground image but can use a
 * combination of one background and one foreground image.
 * 
 * *Note:* Images in the foreground will appear behind the select cursor.
 *
 * ---
 *
 * -----------------  ---------------------------------------------------------
 * Text Code          Effect (Name Window Only)
 * -----------------  ---------------------------------------------------------
 * <Left>             Positions the name box window to the left.
 * <Center>           Positions the name box window to the center.
 * <Right>            Positions the name box window to the right.
 * <Position: x>      Replace 'x' with a number from 0 to 10. This positions
 *                    the name box window on the screen relative to the
 *                    position of the value 'x' represents.
 * \NormalBG          Changes background type of window to normal type.
 * \DimBG             Changes background type of window to dim type.
 * \TransparentBG     Changes background type of window to transparent type.
 *
 * ---
 * 
 * -------------------------------   ------------------------------------------
 * Text Code                         Effect (Message Window Only)
 * -------------------------------   ------------------------------------------
 * 
 * <Position: x, y, width, height>   Forces the message window to exact listed
 *                                   coordinates and dimensions. Replace each
 *                                   of the arguments with numbers. *Note*
 * 
 * <Coordinates: x, y>               Forces the message window to the exact
 *                                   listed coordinates. Replace each of the
 *                                   arguments with numbers. *Note*
 * 
 * <Dimensions: width, height>       Forces the message window size to the
 *                                   exact listed dimensions. Replace each of
 *                                   the arguments with numbers. *Note*
 * 
 * <Offset: +x, +y>                  Quickly adjust the message window offset
 * <Offset: -x, -y>                  values to the x and y amounts. The values
 * <Offset: +x, -y>                  will replace the previous offset settings
 * <Offset: -x, +y>                  if there were any.
 * 
 * *NOTE* These text codes do not work with Word Wrap.
 * 
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Requires VisuMZ_0_CoreEngine)
 * ------------------   -------------------------------------------------------
 * <Up Button>          Display's VisuMZ_0_CoreEngine's button assist text.
 * <Left Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * <Right Button>       Display's VisuMZ_0_CoreEngine's button assist text.
 * <Down Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * <Ok Button>          Display's VisuMZ_0_CoreEngine's button assist text.
 * <Cancel Button>      Display's VisuMZ_0_CoreEngine's button assist text.
 * <Shift Button>       Display's VisuMZ_0_CoreEngine's button assist text.
 * <Menu Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * <Page Up Button>     Display's VisuMZ_0_CoreEngine's button assist text.
 * <Page Down Button>   Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * ---
 * 
 * === Random Text Pool ===
 * 
 * <RNG> text1 | text2 | text3 </RNG>
 * 
 * Using the above text code format in a Show Message entry, you can get a
 * random result out of the various inserted texts. Use "|" (without quotes) as
 * a separator between text entries. You can have unlimited entries. The result
 * will have any excess white space trimmed.
 * 
 * This text code cannot be inserted into a macro and parsed properly.
 * 
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<?>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<?>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace '?' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments. These will only alter the
 *   window dimensions when the text has arrived at that point. They will not
 *   alter the window preemptively. This is not used as a window positioner.
 *   Use the <Position: x, y, width, height> text code for that.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * Note: These text codes only work with the Message Window. Keep in mind that
 *   even if some windows might look like the Message Window, it may not
 *   necessarily be one.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
 * 
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 * 
 * Message: X/Y Offsets
 * - Change the X and Y Offsets of the Message Window.
 * - The offset value(s) will be saved and stored.
 * 
 *   Offset X:
 *   - Offset Message Window horizontally.
 *   - Negative: Left; Positive: Right
 *   - Message Window coordinates are still restricted via clamping.
 * 
 *   Offset Y:
 *   - Offset Message Window vertically.
 *   - Negative: Up; Positive: Down
 *   - Message Window coordinates are still restricted via clamping.
 * 
 * ---
 * 
 * === Choice Plugin Commands ===
 * 
 * ---
 * 
 * Choices: Distance
 * - Change the distance from choice window to the message window.
 * 
 *   Distance:
 *   - Change distance between the choice and message windows.
 *   - Default distance is 0.
 *   - Use negative to center align with remaining space.
 * 
 * ---
 *
 * Choices: Properties
 * - Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 * 
 *   Minimum Choice Width:
 *   - What is the minimum width size for each choice?
 *   - 96 is the default width.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 * 
 * === Select Plugin Commands ===
 * 
 * ---
 * 
 * Select: Weapon
 * - Opens the Event Select Item Window to let the player pick a weapon to
 *   choose from.
 * - Can be opened while the Message Window is open.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected weapon.
 *   - It will result in 0 otherwise.
 * 
 *   Weapon Type ID:
 *   - Reduce all the weapons to a specific weapon type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * Select: Armor
 * - Opens the Event Select Item Window to let the player pick an armor to
 *   choose from.
 * - Can be opened while the Message Window is open.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected armor.
 *   - It will result in 0 otherwise.
 * 
 *   Armor Type ID:
 *   - Reduce all the armors to a specific armor type.
 *   - Leave at 0 to not use filters.
 * 
 *   Equip Type ID:
 *   - Reduce all the armors to a specific equip type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * Select: Skill
 * - Opens the Event Select Item Window to let the player pick a skill to
 *   choose from.
 * - Requires VisuMZ_1_SkillsStatesCore!
 * - Can be opened while the Message Window is open.
 * - Skills will not be listed if they are hidden by the actor.
 * - Skills will not be listed if the actor lacks access to their Skill Type.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected skill.
 *   - It will result in 0 otherwise.
 * 
 *   Actor ID:
 *   - Select an actor to get the skill list from.
 *   - Use 0 to select from the party leader.
 * 
 *   Skill Type ID:
 *   - Reduce all the skills to a specific skill type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Change Text
 * - Change text for target picture(s) to show.
 * - You may use text codes.
 * - Text will adapt to picture's properties.
 * - Settings will be erased if picture is erased.
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to set text to.
 * 
 *   Padding:
 *   - How much padding from the sides should there be?
 * 
 *   Text:
 * 
 *     Upper Left:
 *     Upper Center:
 *     Upper Right:
 *     Middle Left:
 *     Middle Center:
 *     Middle Right:
 *     Lower Left:
 *     Lower Center:
 *     Lower Right:
 *     - The text that's aligned to this picture's side.
 *     - You may use text codes.
 * 
 * ---
 * 
 * Picture: Erase Text
 * - Erase all text for target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to erase text for.
 * 
 * ---
 * 
 * Picture: Refresh Text
 * - Refreshes the text used for all on-screen pictures.
 * - To be used if any dynamic text codes are updated like \n[x].
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *   - WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset Message Window horizontally or vertically.
 *   - Horizontal: Left; Positive: Right
 *   - Veritcal: Negative: Up; Positive: Down
 * 
 *   Stretch Dimmed BG:
 *   - Stretch dimmed window background to fit the whole screen.
 * 
 *   Default Outline Width:
 *   - Changes the default outline width to this many pixels thick.
 * 
 *   Each Message Start:
 *   Each Message End:
 *   - This is text that is added at the start/end of each message.
 *   - You may use text codes.
 *   - Keep in mind that if a message extends to a different page (due to word
 *     wrap, excess lines, etc), that does not mean the starting text will
 *     be added to where the next page begins or the ending text will be added
 *     where the previous page ends.
 *   - Can be used for things like adding "<center>" to the start of each 
 *     message without having to type it every time.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 * 
 *   Minimum Choice Width:
 *   - What is the minimum choice width for each choice?
 *   - 96 is the default width.
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Font Manager
 * ============================================================================
 *
 * Custom fonts that aren't the message or number fonts cannot be used without
 * registration. If you try to use custom fonts in RPG Maker MZ without
 * registering their font family first, you will find out that they will not
 * work. These plugin parameters allow you to register your game's custom fonts
 * here.
 * 
 * ---
 * 
 * Settings:
 * 
 *   Font Family:
 *   - This will be what's used by RPG Maker MZ and plugins to reference this
 *     specific font.
 *   - NO filename extensions!
 * 
 *   Filename:
 *   - What is the filename of the custom font you would like to use?
 *   - Located inside the project's "fonts" folder.
 * 
 * ---
 * 
 * Examples:
 * 
 *   Font Family: WildWords
 *   Filename: WildWords-Regular.ttf
 * 
 * How you would use this in other plugins as a preface to the font face or
 * font family would be to use "WildWords" as the font face/family name. Then
 * RPG Maker MZ will use its own innate FontManager to refer that to the
 * "WildWords-Regular.ttf" file found in the game's "fonts" folder.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 * 
 * This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 * Use the method stated before with the brackets to [MacroName] instead.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Language Settings
 * ============================================================================
 *
 * The "Text Language" feature allows your players to switch between different
 * languages for your game to allow people from around the globe to enjoy what
 * story you have to tell.
 * 
 * Disclaimers: This is not an automatic translation tool. Translations made
 * through the "Text Language" feature of the VisuStella MZ Message Core
 * will require manual input by the game developer.
 * 
 * See the "Text Language Information" for more information.
 *
 * ---
 * 
 * Main Settings:
 * 
 *   Enable Switching?:
 *   - Enable language switching settings for this plugin?
 * 
 *   File Type:
 *   - Which file type do you wish to use?
 *     - CSV (Legacy)
 *     - TSV (Recommended)
 * 
 *   CSV Filename:
 *   - What is the filename of the CSV file to read from?
 *   - Located within the project's /data/ folder.
 * 
 *   TSV Filename:
 *   - What is the filename of the TSV file to read from?
 *   - Located within the project's /data/ folder.
 * 
 * ---
 * 
 * Options:
 * 
 *   Add Option?:
 *   - Add the 'Text Language' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
 * 
 * ---
 * 
 * Languages:
 * 
 *   Default Language:
 *   - What is the default language used for this game?
 * 
 *   Supported Languages:
 *   - What are all the supported languages supported by this game's
 *     script?
 *   - Remove any that aren't translated.
 * 
 * ---
 * 
 * Language Names:
 * 
 *   Bengali:
 *   Chinese (Simplified):
 *   Chinese (Traditional):
 *   Czech:
 *   Danish:
 *   Dutch:
 *   English:
 *   Finnish:
 *   French:
 *   German:
 *   Greek:
 *   Hindi:
 *   Hungarian:
 *   Indonesian:
 *   Italian:
 *   Japanese:
 *   Korean:
 *   Norwegian:
 *   Polish:
 *   Portuguese:
 *   Romanian:
 *   Russian:
 *   Slovak:
 *   Spanish:
 *   Swedish:
 *   Tamil:
 *   Thai:
 *   Turkish:
 *   - How does this language appear in the in-game options?
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Language Fonts
 * ============================================================================
 *
 * Different default fonts used for different languages. This allows different
 * stylistic choices to be made for different languages in case the current
 * font you're using doesn't have support for other language types.
 * 
 * Keep in mind that players can override this with Options Core if they select
 * a text option other than 'Default' for the 'Text Font' option.
 * 
 * Make sure any new custom fonts used for different languages are registered
 * with the 'Custom Font Manager' found in this plugin's Plugin Parameters.
 *
 * ---
 * 
 * Languages:
 * 
 *   Bengali:
 *   Chinese (Simplified):
 *   Chinese (Traditional):
 *   Czech:
 *   Danish:
 *   Dutch:
 *   English:
 *   Finnish:
 *   French:
 *   German:
 *   Greek:
 *   Hindi:
 *   Hungarian:
 *   Indonesian:
 *   Italian:
 *   Japanese:
 *   Korean:
 *   Norwegian:
 *   Polish:
 *   Portuguese:
 *   Romanian:
 *   Russian:
 *   Slovak:
 *   Spanish:
 *   Swedish:
 *   Tamil:
 *   Thai:
 *   Turkish:
 *   - What font face is used for this language?
 *   - Make sure it is registered under Custom Font Manager.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Language Images
 * ============================================================================
 *
 * Allows different images to be used when different languages are used. This
 * is for images that have text on it that you want to appear in different
 * languages based on the text language selected by the player.
 * 
 * There are two ways this works:
 * 
 *   #1: Folder Name
 *   - The name of the folder containing those images will be named something
 *     like "Scrolls[XX]"
 *   - When a different language is picked, like English, it can reference
 *     the 'Scrolls[EN]' folder instead. If Japanese is used, it can refer to
 *     the 'Scrolls[JP]' folder as well.
 *   - The text used to replace the [XX] in the folder name can be determined
 *     in the Plugin Parameters.
 *     - Make sure you change the settings for each language you wish to use to
 *       have translated images for.
 * 
 *   #2: Filename
 *   - The filename of the image to be translated can be named something like
 *     ReidProfile[XX].png
 *   - When a different language is picked, like English, it will reference the
 *     'ReidProfile[EN].png' image instead. For Japanese, it will reference the
 *     'ReidProfile[JP].png' as well.
 *   - The text used to replace the [XX] in the filename can be determined in
 *     the Plugin Parameters.
 *     - Make sure you change the settings for each language you wish to use to
 *       have translated images for.
 *
 * ---
 * 
 * Settings
 * 
 *   Convert Default?
 *   - ON: Default language uses converted marker.
 *   - OFF: Default languages uses [XX] as marker.
 * 
 * Here's an explanation of what this does:
 * 
 *   - The default language picked is English and the player has English picked
 *     as their desired language.
 *   - If the "Convert Default?" Plugin Parameter is ON, then 'ReidProfile[XX]'
 *     will reference and look for the 'ReidProfile[EN]' image.
 *   - If the "Convert Default?" Plugin Parameter is OFF, 'ReidProfile[XX]' is
 *     then used for the English language instead of 'ReidProfile[EN]'.
 *     - This is to avoid duplicate images and save on file space.
 *   - The reasoning behind the [XX] is that there needs to be an anchor image
 *     used for the RPG Maker MZ client in order to have something to reference
 *     before branching out to different languages.
 * 
 * ---
 * 
 * Languages 
 * 
 *   Bengali:
 *   Chinese (Simplified):
 *   Chinese (Traditional):
 *   Czech:
 *   Danish:
 *   Dutch:
 *   English:
 *   Finnish:
 *   French:
 *   German:
 *   Greek:
 *   Hindi:
 *   Hungarian:
 *   Indonesian:
 *   Italian:
 *   Japanese:
 *   Korean:
 *   Norwegian:
 *   Polish:
 *   Portuguese:
 *   Romanian:
 *   Russian:
 *   Slovak:
 *   Spanish:
 *   Swedish:
 *   Tamil:
 *   Thai:
 *   Turkish:
 *   - This text will replace [XX] with in image folder names and filenames
 *     when this language is selected.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 * 
 * Word wrap only supports left-to-right alphabetical languages that utilize
 * spaces.
 * 
 * Word Wrap also cannot be used together with <left>, <center>, or <right> and
 * will disable itself if text alignment text codes are detected.
 * 
 * As of the v1.44 update, some Asian languages such as Chinese and Japanese
 * are now supported for word wrap. Korean language is only supported if spaces
 * are used.
 * 
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
 * 
 *   End Padding:
 *   - Add extra padding to your window to make text wrap further away from the
 *     end of the window.
 *   - This will default to 0.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.54: May 15, 2025
 * * Bug Fixes!
 * ** Fixed a bug where the text width of translated text was not taken into
 *    account. Fix made by Arisu
 * 
 * Version 1.53: February 20, 2025, 2025
 * * Bug Fixes!
 * ** Fixed an error with text language translations not working properly for
 *    the last listed language in the translation sheet. Fix made by Irina.
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Removed picture limit of 100 from Picture-related Plugin Commands.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Text Language Information section included for TSV.
 * ** Updated text code note for \picture<x> and \CenterPicture<x>
 * *** As of the version 1.53 update, the Help Window now supports both of
 *     these text codes. However, we still recommend using icons over using
 *     pictures as there will be loading delays.
 * * Plugin Parameters
 * ** New plugin parameters added by Irina:
 * *** Parameters > Text Language Settings > File Type:
 * **** Which file type do you wish to use?
 * ***** CSV (Legacy)
 * ***** TSV (Recommended)
 * *** Parameters > Text Language Settings > TSV Filename
 * **** What is the filename of the TSV file to read from?
 * **** Located within the project's /data/ folder.
 * * Feature Updates!
 * ** We have done our research and decided that CSV's are too restricted to
 *    use due to their default nature of wanting to use commas as separators.
 *    Thus, we've decided to switch to TSV where the default separator is a tab
 *    space, something that is almost never used in RPG Maker text.
 * ** CSV support will remain as a legacy option but TSV will be recommended as
 *    the main text languaging switching filetype.
 * ** When creating a new Language TSV, the plugin will check if a Language CSV
 *    exists and asks you if you wish to convert the existing CSV to TSV. The
 *    original CSV file will remain intact as a backup.
 * 
 * Version 1.52: December 19, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Text Codes added by Arisu:
 * *** <left>
 * *** <center>
 * *** <right>
 * **** When used in the Map Name, instead of aligning the text which is
 *      centered by default, the text code will align the horizontal position
 *      of the name displayed on the screen.
 * *** <top>
 * *** <middle>
 * *** <bottom>
 * **** When used in the Map Name, the text code will align the vertical
 *      position of the name displayed on the screen.
 * *** <X: +n>
 * *** <X: -n>
 * *** <Y: +n>
 * *** <Y: -n>
 * **** Adjusts the horizontal/vertical position of map name by 'n' value.
 * *** All of these text codes require VisuMZ_0_CoreEngine installed and its
 *     "Map Name Text Code" plugin parameter enabled.
 * 
 * Version 1.51: October 17, 2024
 * * Bug Fixes!
 * ** Fixed a bug where \LastGainObj text code did not work with text language
 *    key codes. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added note to Text Language Information > How to Enable Switching
 * *** IMPORTANT! The separator used for the CSV file must be a semicolon (;)
 *     and not a comma (,) as to reduce the amount of punctuation conflicts.
 *     Keep this in mind as most CSV editors will default to comma (,) instead
 *     of the semicolon (;) for their separator.
 * ** Added note to Text Language Information > Naming Weapon Types, etc:
 * *** You might have noticed that if you've decided to use \tl{keyName} for
 *     weapon or other database types, other parts of the game will error out.
 *     Don't worry, for these, you don't have to change the currently used
 *     database name. Go straight to the CSV and insert in a new key for that
 *     particular database name. For example, the equip type "Accessory" will
 *     use "Accessory" as the automatic key to look for a translated phrase. If
 *     there isn't any in the CSV file, then the default database text entry
 *     will be used.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Parameters > Text Language Settings > Language Fonts
 * **** Different default fonts used for different languages. This allows
 *      different stylistic choices to be made for different languages in case
 *      the current font you're using doesn't have support for other language
 *      types.
 * **** Keep in mind that players can override this with Options Core if they
 *      select a text option other than 'Default' for the 'Text Font' option.
 * **** Make sure any new custom fonts used for different languages are
 *      registered with the 'Custom Font Manager' found in this plugin's Plugin
 *      Parameters.
 * *** Parameters > Text Language Settings > Language Images
 * **** Allows different images to be used when different languages are used.
 *      This is for images that have text on it that you want to appear in
 *      different languages based on the text language selected by the player.
 * 
 * Version 1.50: July 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New text codes added by Irina:
 * *** <Caps> </Caps>
 * *** <Upper> </Upper>
 * *** <Lower> </Lower>
 * **** Auto-text case textcodes will automatically adjust text inserted
 *      between them to respectively be completely capitalized, first-letter
 *      capitalized, or completely lowercase.
 * **** More information in the help file.
 * *** <Alt> </Alt>
 * **** Alternates between uppercase and lowercase for letters.
 * *** <Chaos> </Chaos>
 * **** Randomly uses uppercase and lowercase for letters.
 * 
 * 
 * Version 1.49: May 16, 2024
 * * Bug Fixes!
 * ** Fixed a problem where using text codes to get database object names did
 *    not apply translated text.
 * * Documentation Update!
 * ** Added note for Message Window Only text code effects:
 * *** These text codes only work with the Message Window. Keep in mind that
 *     even if some windows might look like the Message Window, it may not
 *     necessarily be one.
 * * Feature Update!
 * ** Added a failsafe for when Choice List Window doesn't have any viable
 *    options (due to being hidden or disabled). Update made by Irina.
 * ** Added a failsafe for Language CSV when empty rows are added.
 * ** Updated some default Text Code actions in order to make sure they're only
 *    used by the Message Window and not anything else. Update made by Irina.
 * 
 * Version 1.48: April 18, 2024
 * * Bug Fixes!
 * ** Added fail safe for help description checks parsing from objects without
 *    help descriptions normally. Fix made by Irina.
 * 
 * Version 1.47: February 15, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > Custom Font Manager
 * **** Register custom fonts here.
 * **** Custom fonts that aren't the message or number fonts cannot be used
 *      without registration.
 * **** See help file for more information.
 * 
 * Version 1.46: January 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where script calls used to create message choices would not
 *    work properly. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Text Language Switching added by Irina:
 * *** Plugin Parameters > Text Language Settings
 * **** The "Text Language" feature allows your players to switch between
 *      different languages for your game to allow people from around the globe
 *      to enjoy what story you have to tell.
 * **** Disclaimers: This is not an automatic translation tool. Translations
 *      made through the "Text Language" feature of the VisuStella MZ Message
 *      Core will require manual input by the game developer.
 * **** Read more about it in detail within the "Text Language Information"
 *      section in the help file.
 * ** New Plugin Parameter added by Irina:
 * *** Choices: Distance
 * **** Change the distance from choice window to the message window.
 * ** New parameter added to Plugin Command "Choices: Properties" by Irina:
 * *** Minimum Choice Width
 * **** What is the minimum width size for each choice?
 * ** New Plugin Parameter for "Message Window" added by Irina:
 * *** Parameters > Message Window: Choice List Window> Minimum Choice Width
 * **** What is the minimum width size for each choice?
 * ** New Text Codes for Choice Window added by Irina:
 * *** <BgImg: filename> and variants
 * *** <FgImg: filename> and variants
 * **** These text codes allow adding a background or foreground image to a
 *      choice rectangle in stretched/scaled size.
 * 
 * Version 1.45: December 14, 2023
 * * Bug Fixes!
 * ** Punctuation was, for some reason, excluded when using Wordwrap with
 *    Japanese and Chinese languages. This should be fixed now. Fixed by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added clarity to the <left>, <center>, and <right> being unable to be
 *    used together with word wrap.
 * *** Word Wrap also cannot be used together with <left>, <center>, or <right>
 *     and will disable itself if text alignment text codes are detected.
 * * Feature Update!
 * ** Wordwrap <br> now works properly with Japanese and Chinese languages.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > General Settings > Each Message Start
 * *** Plugin Parameters > General Settings > Each Message End
 * **** This is text that is added at the start/end of each message.
 * **** Keep in mind that if a message extends to a different page (due to word
 *      wrap, excess lines, etc), that does not mean the starting text will
 *      be added to where the next page begins or the ending text will be added
 *      where the previous page ends.
 * **** Can be used for things like adding "<center>" to the start of each 
 *      message without having to type it every time.
 * 
 * Version 1.44: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated "Plugin Parameters: Word Wrap Settings" section:
 * *** As of the v1.44 update, some Asian languages such as Chinese and
 *     Japanese are now supported for word wrap. Korean language is only
 *     supported if spaces are used.
 * * Feature Update!
 * ** Word Wrap is now supported for Japanese and Chinese languages.
 * ** Feature updated by Irina and sponsored by AndyL.
 * * New Features!
 * ** New text codes added by Irina for "Show Choices" event command.
 * *** <Shuffle>
 * **** Shuffles the order of all choices. Any cancel shortcuts other than
 *      "Branch" will be undone.
 * *** <Shuffle: x>
 * **** Shuffles the order of all choices and only x number of them appear. Any
 *      cancel shortcuts other than "Branch" will be undone. Hidden choices do
 *      not count towards x number.
 * 
 * Version 1.43: April 13, 2023
 * * Compatibility Update!
 * ** Fixed incompatibilities with auto message positioning with the Map Zoom
 *    plugin. Update made by Irina.
 * 
 * Version 1.42: March 16, 2023
 * * Bug Fixes!
 * ** Fixed some text codes that would capture way too much data than intended.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New text code added by Irina for Show Choice Window only:
 * *** <Help> text </Help>
 * **** Makes a help window appear and have it show 'text' in its contents.
 * **** The help window will disappear if no text is displayed.
 * ** New Plugin Commands added by Arisu:
 * *** Select: Weapon
 * *** Select: Armor
 * *** Select: Skill
 * **** Opens the Event Select Item Window to let the player pick a weapon,
 *      armor, or skill to choose from. The selected object will have its ID
 *      recorded in a variable. These can be opened while the Message Window is
 *      opened just like the event "Select Item".
 * 
 * Version 1.41: December 15, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New text codes added by Irina!
 * *** For the Choice Window Only text codes:
 * **** <BgColor: x>
 * **** <BgColor: x, y>
 * **** <BgColor: #rrggbb>
 * **** <BgColor: #rrggbb, #rrggbb>
 * ***** Requires VisuMZ_0_CoreEngine! Sets the background color of this choice
 *       to 'x' text color, 'x' to 'y' gradient text color, or using '#rrggbb'
 *       hex color values.
 * 
 * Version 1.40: November 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New text code added by Irina:
 * *** <RNG> text1 | text2 | text3 </RNG>
 * **** Using the above text code format in a Show Message entry, you can get a
 *      random result out of the various inserted texts. Use "|" (without
 *      quotes) as a separator between text entries. You can have unlimited
 *      entries. The result will have any excess white space trimmed.
 * **** This text code cannot be inserted into a macro and parsed properly.
 * 
 * Version 1.39: September 22, 2022
 * * Bug Fixes!
 * ** Macros now support quotes (' and ") in the STR: Text. Fix made by Irina.
 * 
 * Version 1.38: July 21, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.37: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Picture texts with \v[x] text codes are now updated automatically.
 * ** This is the only dynamic text code that updates this way for optimization
 *    purposes and to prevent overabundant CPU usage.
 * ** Everything else will require the new Plugin Command.
 * * New Features!
 * ** New Plugin Command added by Irina:
 * *** Picture: Refresh Text
 * **** Refreshes the text used for all on-screen pictures.
 * **** To be used if any dynamic text codes are updated like \n[x].
 * * New Features!
 * ** New text codes added by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** <Up Button>, <Left Button>, <Right Button>, <Down Button>
 * *** <Ok Button>, <Cancel Button>, <Shift Button>, <Menu Button>
 * *** <Page Up Button>, <Page Down Button>
 * **** Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * Version 1.36: April 7, 2022
 * * Feature Update!
 * ** Auto size related text codes should now automatically disable word wrap
 *    effects as they should have before. Update made by Irina.
 * 
 * Version 1.35: March 31, 2022
 * * Bug Fixes!
 * ** Bug fixed where if autosizing is used and it goes from a message that is
 *    shorter to longer, an extra key press is needed. This should no longer be
 *    the case. Fix made by Irina.
 * 
 * Version 1.34: February 24, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Choice Window Text Codes made by Irina and sponsored by AndyL:
 * *** <Choice Width: x>
 * **** Sets the minimum text area width to x. Applies to whole choice window.
 * *** <Choice Indent: x>
 * **** Sets the indent to x value. Applies to current choice selection only.
 * 
 * Version 1.33: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Picture: Change Text
 * **** This new plugin command allows you to place text on top of pictures
 *      (usually in the form of empty pages or cards) to function as stationary
 *      or other uses. Text codes are allowed.
 * **** Text codes are supported.
 * *** Picture: Erase Text
 * **** Removes text from target picture(s).
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Extra Show Choice notetags will now be properly hidden. Fix by Irina.
 * * Compatibility Update!
 * ** Self Switches are now made compatible with work with Show Choices. Update
 *    made by Irina.
 * 
 * Version 1.31: December 9, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New hard-coded message-only text code added by Irina:
 * *** <Next Page>
 * **** Ends the current message page at this line. This is used for messages
 *      when rows are at 5 or above and the message lines don't match the
 *      amount. This is used to prevent grabbing message windows from following
 *      message events. Any lines following <Next Page> in the same message
 *      event will be ignored.
 * 
 * Version 1.30: November 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for removed "Center Window X" bit.
 * * Feature Update!
 * ** Message: Properties now has "Center Window X?" removed
 * *** Changes will now be automatically centered.
 * *** This change is made for the new Plugin Command added for offsets which
 *     more or less replaces them.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Puddor:
 * *** Message: X/Y Offsets
 * **** Change the X and Y Offsets of the Message Window.
 * **** The offset value(s) will be saved and stored.
 * ** New Plugin Parameters added by Irina and sponsored by Puddor:
 * *** Plugin Parameters > General Settings > Message Window > Offset X
 * *** Plugin Parameters > General Settings > Message Window > Offset Y
 * **** Allows you to offset the horizontal and/or vertical positions of the
 *      message window accordingly.
 * ** New Text Codes added by Irina and sponsored by Puddor:
 * *** <Offset: +x, +y>
 * *** <Offset: -x, -y>
 * *** <Offset: +x, -y>
 * *** <Offset: -x, +y>
 * **** Quickly adjust the message window offset values to the x and y amounts.
 *      The values will replace the previous offset settings if there were any.
 * 
 * Version 1.29: October 21, 2021
 * * Feature Update
 * ** Word Wrap flags are now properly adjusted when converting macros and
 *    adding bypasses towards regular messages. Update by Irina.
 * 
 * Version 1.28: October 14, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.27: October 7, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** Macros should now work properly with any \x<n> based text codes.
 *    Fix made by Irina.
 * 
 * Version 1.25: August 27, 2021
 * * Feature Update!
 * ** Macros should now work with the <WordWrap> text code. Update by Irina.
 * 
 * Version 1.24: August 20, 2021
 * * Feature Update!
 * ** Macros should now work with window placement and resize options.
 *    Update made by Irina.
 * ** Macros should now work with choice-related enable and visibility options.
 *    Update made by Irina.
 * 
 * Version 1.23: July 16, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Word Wrap Settings > End Padding
 * **** Add extra padding to your window to make text wrap further away from
 *      the end of the window. This will default to 0.
 * 
 * Version 1.22: July 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Text Codes added by Irina and sponsored by AndyL:
 * *** <Current Battle Target>
 * *** <Current Battle User>
 * **** Replaces the text code with the current target or current user's name
 *      in-battle. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * *** <Current Battle Action>
 * *** <Current Battle Action Name>
 * **** Replaces the text code with the current battle action's name with the
 *      icon or without it respectively. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * 
 * Version 1.21: June 4, 2021
 * * Documentation Update!
 * ** Added extra note to the new <Position: x, y, width, height> text codes
 *    that they do not work with Word Wrap.
 * * Feature Update!
 * ** Added fail safe for preventing Common Events that don't exist from being
 *    ran at all by the Message Window. Added by Arisu.
 * 
 * Version 1.20: May 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added additional clarity for \WindowMoveTo<?> and \WindowMoveBy<?> and
 *    \WindowReset text codes with "Note 2".
 * *** Replace '?' with the following format: targetX, targetY, targetWidth,
 *     targetHeight, duration, easingType. Only targetX and targetY are
 *     required arguments. These will only alter the window dimensions when the
 *     text has arrived at that point. They will not alter the window
 *     preemptively. This is not used as a window positioner. Use the
 *     <Position: x, y, width, height> text code for that.
 * * New Features!
 * ** New hard-coded text codes added for Message Window Only. Added by Irina.
 * *** <Position: x, y, width, height>
 * *** <Coordinates: x, y>
 * *** <Dimensions: width, height>
 * 
 * Version 1.19: May 14, 2021
 * * Feature Updates!
 * ** <br> line breaks can now be used by Show Choices. Make sure that there is
 *    enough room to contain the text through Plugin Commands. Update by Irina.
 * 
 * Version 1.18: April 30, 2021
 * * Bug Fixes!
 * ** Moving windows with 0 duration via text code should now instantly move
 *    the windows to the desired location with no delay. Fix made by Olivia.
 * 
 * Version 1.17: April 9, 2021
 * * Feature Update!
 * ** <Auto> text codes for message windows will round up calculations for the
 *    message width to the nearest even number for better calculations.
 * 
 * Version 1.16: April 2, 2021
 * * Bug Fixes!
 * ** \CommonEvent[x] text code will no longer run upon message window size
 *    calculation. Fix made by Arisu.
 * * Documentation Update!
 * ** Added further clarification for "Text Macros" section.
 * *** This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 *     Use the method stated before with the brackets to [MacroName] instead.
 * 
 * Version 1.15: March 5, 2021
 * * Bug Fixes!
 * ** Hidden choices by switches will no longer count towards the maximum line
 *    count for Show Choice options. Fix made by Irina.
 * 
 * Version 1.14: February 12, 2021
 * * Bug Fixes!
 * ** Auto positioned messages in battle will no longer cover the battler in
 *    question. Fix made by Irina.
 * 
 * Version 1.13: February 5, 2021
 * * Bug Fixes!
 * ** Choice List Window with a dimmed background should now have a more
 *    consistent sized dim sprite. Fix made by Irina.
 * 
 * Version 1.12: January 22, 2021
 * * Feature Update!
 * ** Name Box Window Default Color is now disabled by default to 0 because
 *    users do not understand why their names are showing up yellow and did not
 *    bother reading the documentation. If users want this feature turned on,
 *    they will have to do it manually from now on. Update made by Irina.
 * 
 * Version 1.11: January 15, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 8, 2021
 * * Bug Fixes!
 * ** <Auto Actor: x> and <Auto Party: x> text codes should now work properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Auto Color Plugin Parameters now have their default settings set to 0.
 *    This is due to an influx of "bug reports" from users who do not
 *    understand how this feature works, and the VisuStella team has decided it
 *    is better for the feature to default to an inactive state until users
 *    decide to search and utilize it themselves. Update made by Irina.
 * 
 * Version 1.09: January 1, 2021
 * * Feature Update!
 * ** Auto-color no longer applies to database names that are only numbers.
 *    Auto-color entries that are only numbers will also be ignored. This is to
 *    prevent breaking the text code parsing. Update made by Yanfly.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Some text codes left for the Name Box Window have been accidentally left
 *    out. These text codes allow for the positioning of the Name Box Window.
 *    Also, added to this section are the \NormalBG, \DimBG, and \TransparentBG
 *    text codes since people have been asking for how to change the name box
 *    window's background, but have skimmed over those text codes in different
 *    sections of the help file.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 8, 2020
 * * Bug Fixes!
 * ** When using auto size functions, the message pause symbol will no longer
 *    appear semi-transparent the whole time. Fix made by Irina.
 * 
 * Version 1.06: October 25, 2020
 * * Documentation Update!
 * ** Added a warning message to the Fast Forward Key plugin parameter:
 * *** WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 * ** Updated help file for new features.
 * * Feature Update!
 * ** The default Fast Forward Key setting has now been changed from "Shift" to
 *    "Page Down". Change made by Yanfly
 * * New Feature!
 * ** New Plugin Parameter added by Irina.
 * *** Plugin Parameters > General > Default Outline Width
 * **** Changes the default outline width to this many pixels thick.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
 *    text codes. Fix made by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Auto Position text codes not place positions properly if the screen width
 *    and height differ from the box width and box height. Fix made by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 * 
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageWindowXyOffsets
 * @text Message: X/Y Offsets
 * @desc Change the X and Y Offsets of the Message Window.
 * The offset value(s) will be saved and stored.
 *
 * @arg OffsetX:eval
 * @text Offset X
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @arg OffsetY:eval
 * @text Offset Y
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Choice
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowDistance
 * @text Choices: Distance
 * @desc Change the distance from choice window to the message window.
 *
 * @arg Distance:eval
 * @text Distance
 * @desc Change distance between the choice and message windows.
 * Default distance is 0. Use negative to center align.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Choice Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MinWidth:num
 * @text Minimum Choice Width
 * @type number
 * @min 0
 * @desc What is the minimum width size for each choice?
 * 96 is the default width.
 * @default 96
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Select
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectWeapon
 * @text Select: Weapon
 * @desc Opens the Event Select Item Window to let the player
 * pick a weapon to choose from.
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected weapon. It will result in 0 otherwise.
 * @default 1
 *
 * @arg WeaponTypeID:num
 * @text Weapon Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the weapons to a specific weapon type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectArmor
 * @text Select: Armor
 * @desc Opens the Event Select Item Window to let the player
 * pick an armor to choose from.
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected armor. It will result in 0 otherwise.
 * @default 1
 *
 * @arg ArmorTypeID:num
 * @text Armor Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the armors to a specific armor type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @arg EquipTypeID:num
 * @text Equip Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the armors to a specific equip type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectSkill
 * @text Select: Skill
 * @desc Opens the Event Select Item Window to let the player
 * pick a skill to choose from. Requires VisuMZ_1_SkillsStatesCore!
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected skill. It will result in 0 otherwise.
 * @default 1
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select an actor to get the skill list from.
 * Use 0 to select from the party leader.
 * @default 0
 *
 * @arg SkillTypeID:num
 * @text Skill Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the skills to a specific skill type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextChange
 * @text Picture: Change Text
 * @desc Change text for target picture(s) to show.
 * You may use text codes.
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @desc The ID(s) of the picture(s) to set text to.
 * @default ["1"]
 *
 * @arg Padding:eval
 * @text Padding
 * @parent PictureIDs:arraynum
 * @desc How much padding from the sides should there be?
 * @default $gameSystem.windowPadding()
 * 
 * @arg Text
 *
 * @arg upperleft:json
 * @text Upper Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg up:json
 * @text Upper Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg upperright:json
 * @text Upper Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg left:json
 * @text Middle Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg center:json
 * @text Middle Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg right:json
 * @text Middle Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerleft:json
 * @text Lower Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg down:json
 * @text Lower Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerright:json
 * @text Lower Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextErase
 * @text Picture: Erase Text
 * @desc Erase all text for target picture(s).
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @desc The ID(s) of the picture(s) to erase text for.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextRefresh
 * @text Picture: Refresh Text
 * @desc Refreshes the text used for all on-screen pictures.
 * To be used if any dynamic text codes are updated like \n[x].
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param MessageCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"0","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param CustomFonts:arraystruct
 * @text Custom Font Manager
 * @type struct<CustomFont>[]
 * @desc Register custom fonts here. Custom fonts that aren't the
 * message or number fonts cannot be used without this.
 * @default []
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (this instanceof Window_Message) {\\\\n    if (textState.drawing) {\\\\n        const filename = data[0].trim();\\\\n        const index = parseInt(data[1] || '0');\\\\n        $gameMessage.setFaceImage(filename, index);\\\\n        this.loadMessageFace();\\\\n        const rtl = $gameMessage.isRTL();\\\\n        const width = ImageManager.faceWidth;\\\\n        const height = this.innerHeight;\\\\n        const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n        this.contents.clearRect(x, 0, width, height);\\\\n        this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n    }\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (this instanceof Window_Message) {\\\\n    if (textState.drawing) {\\\\n        const filename = $gameMessage.faceName();\\\\n        $gameMessage.setFaceImage(filename, index);\\\\n        this.loadMessageFace();\\\\n        const rtl = $gameMessage.isRTL();\\\\n        const width = ImageManager.faceWidth;\\\\n        const height = this.innerHeight;\\\\n        const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n        this.contents.clearRect(x, 0, width, height);\\\\n        this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n    }\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (this instanceof Window_Message) {\\\\n    if (textState.drawing && this.constructor === Window_Message) {\\\\n        this.setTextDelay(delay);\\\\n    }\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"heart\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"3\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjIcon\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectIcon();\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Code Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * Format style: [MacroName]
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param Localization:struct
 * @text Text Language Settings
 * @type struct<Localization>
 * @desc Text Language settings for this plugin.
 * @default {"Main":"","Enable:eval":"false","CsvFilename:str":"Languages.csv","Options":"","AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Language","Localized":"","DefaultLocale:str":"English","Languages:arraystr":"[\"Bengali\",\"Chinese(Simplified)\",\"Chinese(Traditional)\",\"Czech\",\"Danish\",\"Dutch\",\"English\",\"Finnish\",\"French\",\"German\",\"Greek\",\"Hindi\",\"Hungarian\",\"Indonesian\",\"Italian\",\"Japanese\",\"Korean\",\"Norwegian\",\"Polish\",\"Portuguese\",\"Romanian\",\"Russian\",\"Slovak\",\"Spanish\",\"Swedish\",\"Tamil\",\"Thai\",\"Turkish\"]","LangNames":"","Bengali:str":"বাংলা","Chinese(Simplified):str":"简体中文","Chinese(Traditional):str":"繁體中文","Czech:str":"Čeština","Danish:str":"Dansk","Dutch:str":"Nederlands","English:str":"English","Finnish:str":"Suomi","French:str":"Français","German:str":"Deutsch","Greek:str":"Ελληνικά","Hindi:str":"हिन्दी","Hungarian:str":"Magyar","Indonesian:str":"Bahasa Indo","Italian:str":"Italiano","Japanese:str":"日本語","Korean:str":"한국어","Norwegian:str":"Norsk","Polish:str":"Polski","Portuguese:str":"Português","Romanian:str":"Română","Russian:str":"Русский","Slovak:str":"Slovenčina","Spanish:str":"Español","Swedish:str":"Svenska","Tamil:str":"தமிழ்","Thai:str":"ไทย","Turkish:str":"Türkçe"}
 *
 * @param LanguageFonts:struct
 * @text Language Fonts
 * @parent Localization:struct
 * @type struct<LanguageFonts>
 * @desc Different default fonts used for different languages.
 * Players can override this with Options Core.
 * @default {"Bengali:str":"rmmz-mainfont","Chinese(Simplified):str":"rmmz-mainfont","Chinese(Traditional):str":"rmmz-mainfont","Czech:str":"rmmz-mainfont","Danish:str":"rmmz-mainfont","Dutch:str":"rmmz-mainfont","English:str":"rmmz-mainfont","Finnish:str":"rmmz-mainfont","French:str":"rmmz-mainfont","German:str":"rmmz-mainfont","Greek:str":"rmmz-mainfont","Hindi:str":"rmmz-mainfont","Hungarian:str":"rmmz-mainfont","Indonesian:str":"rmmz-mainfont","Italian:str":"rmmz-mainfont","Japanese:str":"rmmz-mainfont","Korean:str":"rmmz-mainfont","Norwegian:str":"rmmz-mainfont","Polish:str":"rmmz-mainfont","Portuguese:str":"rmmz-mainfont","Romanian:str":"rmmz-mainfont","Russian:str":"rmmz-mainfont","Slovak:str":"rmmz-mainfont","Spanish:str":"rmmz-mainfont","Swedish:str":"rmmz-mainfont","Tamil:str":"rmmz-mainfont","Thai:str":"rmmz-mainfont","Turkish:str":"rmmz-mainfont"}
 *
 * @param LanguageImages:struct
 * @text Language Images
 * @parent Localization:struct
 * @type struct<LanguageImages>
 * @desc Allows different images to be used when different
 * languages are used. See help for more information.
 * @default {"ConvertDefault:eval":"false","Languages":"","Bengali:str":"[XX]","Chinese(Simplified):str":"[XX]","Chinese(Traditional):str":"[XX]","Czech:str":"[XX]","Danish:str":"[XX]","Dutch:str":"[XX]","English:str":"[XX]","Finnish:str":"[XX]","French:str":"[XX]","German:str":"[XX]","Greek:str":"[XX]","Hindi:str":"[XX]","Hungarian:str":"[XX]","Indonesian:str":"[XX]","Italian:str":"[XX]","Japanese:str":"[XX]","Korean:str":"[XX]","Norwegian:str":"[XX]","Polish:str":"[XX]","Portuguese:str":"[XX]","Romanian:str":"[XX]","Russian:str":"[XX]","Slovak:str":"[XX]","Spanish:str":"[XX]","Swedish:str":"[XX]","Tamil:str":"[XX]","Thai:str":"[XX]","Turkish:str":"[XX]"}
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false","EndPadding:num":"0"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param MsgWindowOffsetX:num
 * @text Offset X
 * @parent MessageWindow
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @param MsgWindowOffsetY:num
 * @text Offset Y
 * @parent MessageWindow
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 *
 * @param EachMessageStart:json
 * @text Each Message Start
 * @parent MessageWindow
 * @type note
 * @desc This is text that is added at the start of each message.
 * You may use text codes.
 * @default ""
 *
 * @param EachMessageEnd:json
 * @text Each Message End
 * @parent MessageWindow
 * @type note
 * @desc This is text that is added at the end of each message.
 * You may use text codes.
 * @default ""
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 0
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMinWidth:num
 * @text Minimum Choice Width
 * @parent ChoiceListWindow
 * @type number
 * @min 0
 * @desc What is the minimum choice width for each choice?
 * 96 is the default width.
 * @default 96
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default rmmz-mainfont
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Font Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomFont:
 *
 * @param FontFamily:str
 * @text Font Family
 * @desc This will be what's used by RPG Maker MZ and plugins to
 * reference this specific font. NO filename extensions!
 * @default Unnamed
 *
 * @param Filename:str
 * @text Filename
 * @desc What is the filename of the font you would like to use?
 * Located inside the project's "fonts" folder.
 * @default Unnamed.ttf
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Localization Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Localization:
 *
 * @param Main
 * @text Main Settings
 *
 * @param Enable:eval
 * @text Enable Switching?
 * @parent Main
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Enable language switching settings for this plugin?
 * @default false
 *
 * @param LangFiletype:str
 * @text File Type
 * @parent Main
 * @type select
 * @option CSV (Legacy)
 * @value csv
 * @option TSV (Recommended)
 * @value tsv
 * @desc Which file type do you wish to use?
 * @default tsv
 *
 * @param CsvFilename:str
 * @text CSV Filename
 * @parent Main
 * @desc What is the filename of the CSV file to read from?
 * Located within the project's /data/ folder.
 * @default Languages.csv
 *
 * @param TsvFilename:str
 * @text TSV Filename
 * @parent Main
 * @desc What is the filename of the TSV file to read from?
 * Located within the project's /data/ folder.
 * @default Languages.tsv
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Language' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Text Language
 *
 * @param Localized
 * @text Languages
 *
 * @param DefaultLocale:str
 * @text Default Language
 * @parent Localized
 * @type select
 * @option Bengali
 * @option Chinese(Simplified)
 * @option Chinese(Traditional)
 * @option Czech
 * @option Danish
 * @option Dutch
 * @option English
 * @option Finnish
 * @option French
 * @option German
 * @option Greek
 * @option Hindi
 * @option Hungarian
 * @option Indonesian
 * @option Italian
 * @option Japanese
 * @option Korean
 * @option Norwegian
 * @option Polish
 * @option Portuguese
 * @option Romanian
 * @option Russian
 * @option Slovak
 * @option Spanish
 * @option Swedish
 * @option Tamil
 * @option Thai
 * @option Turkish
 * @desc What is the default language used for this game?
 * @default English
 *
 * @param Languages:arraystr
 * @text Supported Languages
 * @parent Localized
 * @type select[]
 * @option Bengali
 * @option Chinese(Simplified)
 * @option Chinese(Traditional)
 * @option Czech
 * @option Danish
 * @option Dutch
 * @option English
 * @option Finnish
 * @option French
 * @option German
 * @option Greek
 * @option Hindi
 * @option Hungarian
 * @option Indonesian
 * @option Italian
 * @option Japanese
 * @option Korean
 * @option Norwegian
 * @option Polish
 * @option Portuguese
 * @option Romanian
 * @option Russian
 * @option Slovak
 * @option Spanish
 * @option Swedish
 * @option Tamil
 * @option Thai
 * @option Turkish
 * @desc What are all the supported languages supported by this
 * game's script? Remove any that aren't translated.
 * @default ["Bengali","Chinese(Simplified)","Chinese(Traditional)","Czech","Danish","Dutch","English","Finnish","French","German","Greek","Hindi","Hungarian","Indonesian","Italian","Japanese","Korean","Norwegian","Polish","Portuguese","Romanian","Russian","Slovak","Spanish","Swedish","Tamil","Thai","Turkish"]
 *
 * @param LangNames
 * @text Language Names
 *
 * @param Bengali:str
 * @text Bengali
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default বাংলা
 * 
 * @param Chinese(Simplified):str
 * @text Chinese (Simplified)
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 简体中文
 * 
 * @param Chinese(Traditional):str
 * @text Chinese (Traditional)
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 繁體中文
 * 
 * @param Czech:str
 * @text Czech
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Čeština
 * 
 * @param Danish:str
 * @text Danish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Dansk
 * 
 * @param Dutch:str
 * @text Dutch
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Nederlands
 * 
 * @param English:str
 * @text English
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default English
 * 
 * @param Finnish:str
 * @text Finnish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Suomi
 * 
 * @param French:str
 * @text French
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Français
 * 
 * @param German:str
 * @text German
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Deutsch
 * 
 * @param Greek:str
 * @text Greek
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Ελληνικά
 * 
 * @param Hindi:str
 * @text Hindi
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default हिन्दी
 * 
 * @param Hungarian:str
 * @text Hungarian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Magyar
 * 
 * @param Indonesian:str
 * @text Indonesian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Bahasa Indo
 * 
 * @param Italian:str
 * @text Italian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Italiano
 * 
 * @param Japanese:str
 * @text Japanese
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 日本語
 * 
 * @param Korean:str
 * @text Korean
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 한국어
 * 
 * @param Norwegian:str
 * @text Norwegian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Norsk
 * 
 * @param Polish:str
 * @text Polish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Polski
 * 
 * @param Portuguese:str
 * @text Portuguese
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Português
 * 
 * @param Romanian:str
 * @text Romanian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Română
 * 
 * @param Russian:str
 * @text Russian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Русский
 * 
 * @param Slovak:str
 * @text Slovak
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Slovenčina
 * 
 * @param Spanish:str
 * @text Spanish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Español
 * 
 * @param Swedish:str
 * @text Swedish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Svenska
 * 
 * @param Tamil:str
 * @text Tamil
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default தமிழ்
 * 
 * @param Thai:str
 * @text Thai
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default ไทย
 * 
 * @param Turkish:str
 * @text Turkish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Türkçe
 *
 */
/* ----------------------------------------------------------------------------
 * Language Fonts Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LanguageFonts:
 *
 * @param Bengali:str
 * @text Bengali
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Chinese(Simplified):str
 * @text Chinese (Simplified)
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Chinese(Traditional):str
 * @text Chinese (Traditional)
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Czech:str
 * @text Czech
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Danish:str
 * @text Danish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Dutch:str
 * @text Dutch
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param English:str
 * @text English
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Finnish:str
 * @text Finnish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param French:str
 * @text French
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param German:str
 * @text German
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Greek:str
 * @text Greek
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Hindi:str
 * @text Hindi
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Hungarian:str
 * @text Hungarian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Indonesian:str
 * @text Indonesian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Italian:str
 * @text Italian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Japanese:str
 * @text Japanese
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Korean:str
 * @text Korean
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Norwegian:str
 * @text Norwegian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Polish:str
 * @text Polish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Portuguese:str
 * @text Portuguese
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Romanian:str
 * @text Romanian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Russian:str
 * @text Russian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Slovak:str
 * @text Slovak
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Spanish:str
 * @text Spanish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Swedish:str
 * @text Swedish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Tamil:str
 * @text Tamil
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Thai:str
 * @text Thai
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Turkish:str
 * @text Turkish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 *
 */
/* ----------------------------------------------------------------------------
 * Language Images Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LanguageImages:
 *
 * @param ConvertDefault:eval
 * @text Convert Default?
 * @type boolean
 * @on Convert
 * @off Don't
 * @desc ON: Default language uses converted marker.
 * OFF: Default languages uses [XX] as marker.
 * @default false
 *
 * @param Languages
 * @text Languages
 *
 * @param Bengali:str
 * @text Bengali
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Chinese(Simplified):str
 * @text Chinese (Simplified)
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Chinese(Traditional):str
 * @text Chinese (Traditional)
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Czech:str
 * @text Czech
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Danish:str
 * @text Danish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Dutch:str
 * @text Dutch
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param English:str
 * @text English
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Finnish:str
 * @text Finnish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param French:str
 * @text French
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param German:str
 * @text German
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Greek:str
 * @text Greek
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Hindi:str
 * @text Hindi
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Hungarian:str
 * @text Hungarian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Indonesian:str
 * @text Indonesian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Italian:str
 * @text Italian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Japanese:str
 * @text Japanese
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Korean:str
 * @text Korean
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Norwegian:str
 * @text Norwegian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Polish:str
 * @text Polish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Portuguese:str
 * @text Portuguese
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Romanian:str
 * @text Romanian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Russian:str
 * @text Russian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Slovak:str
 * @text Slovak
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Spanish:str
 * @text Spanish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Swedish:str
 * @text Swedish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Tamil:str
 * @text Tamil
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Thai:str
 * @text Thai
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Turkish:str
 * @text Turkish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 * @param EndPadding:num
 * @text End Padding
 * @parent Rules
 * @type number
 * @desc Add extra padding to your window to make text wrap further away from the end of the window.
 * @default 0
 *
 */
//=============================================================================

const _0x53794b=_0x49d2;function _0x49d2(_0x377c6e,_0x4e1b0e){const _0xc17cfe=_0xc17c();return _0x49d2=function(_0x49d21e,_0x112d26){_0x49d21e=_0x49d21e-0x1d5;let _0x48f79a=_0xc17cfe[_0x49d21e];return _0x48f79a;},_0x49d2(_0x377c6e,_0x4e1b0e);}(function(_0x58f9b9,_0x23b52d){const _0x1241e3=_0x49d2,_0x4a56f3=_0x58f9b9();while(!![]){try{const _0x39ff78=-parseInt(_0x1241e3(0x20d))/0x1+parseInt(_0x1241e3(0x47c))/0x2+-parseInt(_0x1241e3(0x2b4))/0x3*(-parseInt(_0x1241e3(0x4dd))/0x4)+parseInt(_0x1241e3(0x4f8))/0x5*(parseInt(_0x1241e3(0x2b9))/0x6)+-parseInt(_0x1241e3(0x3c0))/0x7+parseInt(_0x1241e3(0x56e))/0x8+parseInt(_0x1241e3(0x2d0))/0x9*(parseInt(_0x1241e3(0x2b5))/0xa);if(_0x39ff78===_0x23b52d)break;else _0x4a56f3['push'](_0x4a56f3['shift']());}catch(_0x59fb60){_0x4a56f3['push'](_0x4a56f3['shift']());}}}(_0xc17c,0xdf75b));function _0xc17c(){const _0x30faf1=['Auf\x20Wiedersehen','English','Window_Options_isVolumeSymbol','min','postConvertEscapeCharacters','constructor','ParseAddedText','parseChoiceText','MaxRows','messageCoreTextSpeed','_action','initMessageCore','_moveTargetY','CSV','FontChangeValue','battle\x20enemy','actor','Ciao','some','lineHeight','max','upperleft','Game_System_initialize','Enemies','Match','isAutoColorAffected','MessageCore','lowerleft','defeat','ActionJS','path','%1\x20file\x20detected.\x0a','fontFace','resetRect','strokeRect','upper-left','LineBreakSpace','itemBackColor1','isChoiceWindow','ActorID','</CENTER>','send','messageCoreWindowX','getPictureTextBuffer','TextCodeReplace','Window_Options_addGeneralOptions','FastForwardKey','ConvertTextAutoColorRegExpFriendly','outputHeight','textColor','PICTURE','setLastGainedItemData','maxLines','down\x20left','Hola','faceWidth','clearActorNameAutoColor','EquipTypeID','paintOpacity','upright','ওহে','setChoices','Localization','Key','prepareAutoSizeEscapeCharacters','processTextCasing','clearRect','loadMessageFace','clearPictureTextRefresh','_list','createPictureText','<CENTER>','DefaultOutlineWidth','clearAllPictureTexts','leader','Guau','midleft','textSpeed','drawChoiceLocationImage','HelpWindow','setWaitMode','अलविदा','iconIndex','drawPictureTextZone','prepareShowTextFollowups','parse','WordWrap','clearChoiceHelpDescriptions','isSkill','start','Hejdå','LocalizationType','parameters','setupItemChoice','getPictureTextData','realPictureId','itemChoiceItypeId','filename','map\x20event','ITALIC','TextColor','OffsetX','TSV\x20file\x20is\x20now\x20created\x20and\x20stored\x20in\x20data\x20folder.','Press\x20Cancel\x20to\x20create\x20new\x20TSV.','_choiceListWindow','isRTL','processControlCharacter','setMessageWindowWidth','Szia','General','addedHeight','createChoiceListHelpWindow','setMessageWindowRows','calcMoveEasing','convertEscapeCharacters','getMessageWindowXyOffsets','_textDelay','GET','equipSlots','getPictureText','STR','needsNewPage','getLanguageAt','synchronizeNameBox','FontBiggerCap','code','_nameBoxWindow','processAutoColorWords','battleUserName','MinWidth','charCodeAt','\x1bCASING[0]','fallbackFonts','hasPictureText','_resetRect','prepareWordWrapEscapeCharacters','</LEFT>','placeCancelButton','হ্যালো','ArmorTypeID','Hej','gainItem','orange','NameBoxWindowDefaultColor','Window_Base_textSizeEx','_autoSizeRegexp','addExtraShowChoices','Window_Message_synchronizeNameBox','DefaultLocale','itemChoiceAtypeId','gradientFillRect','trim','clampPlacementPosition','loadBitmap','itemChoiceWtypeId','fontBold','obtainGold','Items','CENTERPICTURE','Ahoj','moveBy','in\x20order\x20for\x20VisuMZ_1_MessageCore\x20to\x20work.','requestChoiceForegroundImage','1519492InFHYv','substring','yellow','grey','LineHeight','MessageWindowProperties','updateTransform','_pictureTextRefresh','battle\x20actor','ว้าว','process_VisuMZ_MessageCore_TextCodes_Replace','</COLORLOCK>','getChoiceListMaxColumns','obtainEscapeParam','ExtraEnemyDrops','callOkHandler','map\x20party','AddAutoColor','#6dcff6','outlineColor','application/%1','Uau','EndPadding','isChoiceEnabled','#ffffff','applyMoveEasing','loadDatabase','<%1>','Bitmap_drawText','applyData','process_VisuMZ_MessageCore_AutoColor','Classes','dirname','addWrapBreakAfterPunctuation','SelectSkill','updateAutoPosition','_dimmerSprite','\x1bi[%1]','MaxCols','textLocale','Rows','lower-right','_spriteset','powerUpColor','statusText','isVisuMzLocalizationEnabled','currentExt','eraseAllPictureTexts','applyDatabaseAutoColor','shift','Thai','updateEvents','dimColor2','Window_Message_clearFlags','outLineColor','Zbohom','center','_eventId','itemChoiceEtypeId','changeChoiceBackgroundColor','upper\x20left','innerHeight','setChoiceListHelpWindow','erasePicture','CreateAutoColorRegExpLists','ENABLE','CsvFilename','Halo','anyPictureTextChanges','वाह','#fbaf5d','drawCustomBackgroundColor','map\x20player','_itemChoiceVariableId','_textAlignment','Scene_Boot_loadGameFonts','<WORDWRAP>','StretchDimmedBg','Languages','lastGainedObjectQuantity','\x1bCOLORLOCK[0]','_itemChoiceEtypeId','Game_Map_setupEvents','green','choiceIndexArray','AutoColorBypassList','ParseStateNotetags','textSizeExTextAlignment','\x1bBOLD[0]','up-right','downleft','VisuMZ_1_EventsMoveCore','join','Type','Näkemiin','Window_Base_processNewLine','MsgWindowOffsetY','20WCblHP','Вау','getRandomTextFromPool','parseLocalizedText','_textColorStack','maxChoiceWidth','choices','_pictureTextHeight','obtainExp','addMessageCoreCommands','contents','Wah','measureTextWidth','isCommandEnabled','Bitmap_drawTextTopAligned','setMessageWindowWordWrap','isHelpWindowWordWrap','_itemChoiceWtypeId','openLocalizationFolder','Tamil','setHelpWindowWordWrap','_messageOffsetX','Wauw','autoPositionOffsetX','crisisColor','CreateAutoColorFor','Window_ChoiceList_callCancelHandler','33265fDWFEv','_autoColorActorNames','exec','TextStr','isTriggered','States','loadGameFonts','processAutoSize','<COLORLOCK>','preConvertEscapeCharacters','description','TextColor%1','setTextDelay','requestPictureTextRefreshAll','registerCommand','itemPadding','AddOption','makeItemList','EachMessageEnd','Sprite_Picture_updateBitmap','PictureIDs','updateAutoSizePosition','Norwegian','easeOut','_moveEasingType','loadPicture','\x1bCASING[2]','anchorPictureText','zoomScale','convertHardcodedEscapeReplacements','drawBackground','partyMemberName','\x1bi[%1]%2','_moveTargetX','normalColor','isSceneMap','yes','setChoiceListLineHeight','processActorNameAutoColorChanges','setupChoices','autoPositionOffsetY','newPage','clear','selectDefault','midright','_textCasing','drawTextTopAligned','onChoice','fontSize','Game_Screen_clearPictures','isSceneBattle','setPictureTextBuffer','_choiceListHelpWindow','processFailsafeChoice','Czech','_forcedPosition','clearFlags','pageup','VisuMZ_0_CoreEngine','Wow','drawing','instantTextSpeed','French','Hallo','onerror','Hoşça\x20kal','SplitJpCnCharacters','Window_MessageLog','Portuguese','#f26c4f','ANY','processDrawCenteredPicture','down-left','enabled','onDatabaseLoaded','Window_Message_updatePlacement','indent','_colorLock','follower','push','Width','changeVolume','onLocalizationXhrError','choiceListHelpWindowRect','_lastPluginCommandInterpreter','TextMacros','registerSelfEvent','drawBackPicture','Window_EventItem_includes','NameBoxWindowOffsetX','match','type','messageRows','addChildAt','Romanian','Window_Base_processAllText','convertFontSettingsEscapeCharacters','escapeStart','_itemChoiceAtypeId','item','round','\x1bC[%1]%2\x1bPREVCOLOR[0]','processFsTextCode','नमस्ते','visuMzTextLocaleStatusText','_data','_texts','NUM','convertTextMacros','processColorLock','_relativePosition','_helpWindow','addMessageCoreTextSpeedCommand','processCommonEvent','வணக்கம்','_indent','Bonjour','ShuffleArray','4131856FZbDlP','helpWordWrap','\x1bCOLORLOCK[1]','downright','Undefined','up-center','getPreservedFontSettings','preFlushTextState','_refreshPauseSign','<LEFT>','getMessageWindowWidth','Game_Map_initialize','upleft','processWrapBreak','getInputButtonString','Greek','Sbohem','Weapons','SHOW','canMove','_messageCommonEvents','buffer','red','\x1bWrapBreak[0]','maxCols','prepareForcedPositionEscapeCharacters','LanguageImages','ceil','Cześć','none','ParseArmorNotetags','convertMessageCoreEscapeActions','itemChoiceActorId','choiceAlignText','moveTo','Window_NameBox_updatePlacement','Scene_Message_createChoiceListWindow','setChoiceListMaxRows','Instant','indexOf','isBreakShowTextCommands','FontFamily','TextAlign','menu','_messageWindow','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','adjustShowChoiceExtension','Languages.csv','resetWordWrap','down\x20center','command357','\x1bITALIC[1]','pagedown','_interpreter','isRunning','child_process','setHelpWindow','Hűha','_pictures','changeTextSpeed','middlecenter','TsvFilename','_target','startX','scale','itemRect','textSizeEx','\x1bTEXTALIGNMENT','До\x20свидания','\x1bTEXTALIGNMENT[0]','Window_Command_addCommand','_itemChoiceActorId','getChoiceMessageDistance','_index','random','drawItemContents','drawText','contentsBack','data/','setupShuffleChoices','ARRAYSTRUCT','processAllText','apply','SelectArmor','Game_Interpreter_PluginCommand','convertNewPageTextStateMacros','\x1bITALIC[0]','itemHeight','changeOutlineColor','setSpeakerName','battleActionName','visible','Γειά\x20σου','windowPadding','anchor','numVisibleRows','addContinuousShowChoices','textSizeExRaw','updateNameBoxMove','onProcessCharacter','levelUp','FontSmallerCap','hide','choiceLineHeight','isChoiceVisible','changePaintOpacity','black','map\x20actor','addContinuousShowTextCommands','startPause','_choiceIndexArray','process_VisuMZ_MessageCore_TextMacros','makeFontBigger','addGeneralOptions','white','padding','Bengali','innerWidth','faceName','Polish','COLORLOCK','close','isMessageWindowWordWrap','setWeaponChoice','makeDeepCopy','format','choiceCancelType','ARRAYEVAL','adjustShowChoiceDefault','Window_Base_update','setLastPluginCommandInterpreter','processPxTextCode','ALL','processFontChangeBold','createLocalizationCsvFile','안녕하세요','mainFontFace','543138fQfzSD','RelativePXPY','makeCommandListShuffle','VisuMZ_3_ActSeqCamera','Window_Help_refresh','ParseClassNotetags','getSkillTypes','makeSkillList','getTextAlignment','add','toUpperCase','[XX]','isWeapon','안녕히\x20가세요','windowX','drawMessageFace','_moveTargetWidth','convertVariableEscapeCharacters','setupNumInput','slice','followers','substr','nextEventCode','maxFontSizeInLine','addMessageCommonEvent','Window_Message_terminateMessage','sort','updateChoiceListHelpWindowPlacement','isWordWrapEnabled','prepareShowTextCommand','clamp','filter','பிரியாவிடை','VisuMZ_4_ExtraEnemyDrops','setPositionType','WAIT','createChoiceListWindow','upperright','down-center','choicePositionType','changeVisuMzTextLocale','processMessageCoreEscapeActions','blue','actorName','updateDimensions','message','erasePictureTextBuffer','down','_lastAltCase','Ουάου','name','Russian','skills','powerDownColor','blt','_wordWrap','height','calcWindowHeight','convertBackslashCharacters','postFlushTextState','setColorLock','String_format','EachMessageStart','update','itemRectWithPadding','Window_Message_isTriggered','csv','Selamat\x20tinggal','Game_Interpreter_setupChoices','</B>','makeData','list','Korean','convertMessageCoreEscapeReplacements','Good-bye','updateXyOffsets','ParseAllNotetags','lowerright','surprise','_centerMessageWindow','Languages.tsv','\x1bCASING[1]','windowWidth','Greeting','Armors','Привет','_pictureTextCache','realignMapName','Game_Screen_erasePicture','isInputting','OffsetY','Waouh','attachPictureText','rtl','TextCodeActions','convertShowChoiceEscapeCodes','mainModule','processCustomWait','databaseObjectName','VisuMZ_4_ExtraEnemyDrops\x20needs\x20to\x20be\x20updated\x20','processStoredAutoColorChanges','ParseWeaponNotetags','choiceCols','resetTextColor','prototype','CASING','setChoiceMessageDistance','unnamed','_textDelayCount','inputtingAction','(((','Swedish','getLanguageName','_lastGainedItemData','TextSpeed','easeIn','isClosing','NameBoxWindowOffsetY','boxHeight','updateOffsetPosition','Turkish','updateMessageCommonEvents','Game_Map_updateEvents','process_VisuMZ_MessageCore_TextCodes_Action','initTextAlignement','Window_Base_processEscapeCharacter','systemColor','Hungarian','changeValue','stringify','width','obtainEscapeString','Distance','setTextAlignment','onNewPageMessageCore','replace','_scene','convertButtonAssistEscapeCharacters','onload','clearCommandList','maxCommands','_pictureTextWidth','textWidth','Hindi','messagePositionReset','choiceMinWidth','textSpeedStatusText','value','#c69c6d','ParseItemNotetags','ConvertParams','_macroBypassWordWrap','Window_Base_processControlCharacter','isSkillHidden','_MessageCoreSettings','Window_Message_needsNewPage','_maxShuffleChoices','responseText','ஆஹா','processTextAlignmentChange','isContinuePrepareShowTextCommands','Merhaba','purple','MessageTextDelay','setChoiceListMinChoiceWidth','choiceRows','_itemChoiceItypeId','186036TWwSna','15380kHpMyr','getMessageWindowRows','\x1bTEXTALIGNMENT[1]','defaultColor','324xQPTKd','launchMessageCommonEvent','Padding','ParseEnemyNotetags','battle\x20party','system','maxShuffleChoices','Viszontlátásra','STRUCT','Scene_Boot_onDatabaseLoaded','addMessageCoreLocalizationCommand','_pictureTextBuffer','_choiceHelpDescriptions','left','_messageOffsetY','WORD_WRAP_PADDING','Sprite_Picture_update','uppercenter','_scriptCall','boxWidth','Game_Party_gainItem','_moveTargetHeight','Default','2430geXBlC','Chinese(Simplified)','needsPictureTextRefresh','commandName','getChoiceIndent','TextJS','_currentAutoSize','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','setupEvents','initialize','flushTextState','getChoiceListMinChoiceWidth','Slovak','Please\x20restart\x20the\x20game.','setChoiceListTextAlign','fontItalic','Window_ItemList_drawItemNumber','up\x20center','ARRAYFUNC','convertTextAlignmentEscapeCharacters','addChoiceDistance','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','right','randomInt','MsgWindowOffsetX','event','upper\x20center','checkConvertCsvToTsv','adjustShowChoiceCancel','DataManager_loadDatabase','setArmorChoice','processAutoPosition','ChoiceWindowTextAlign','getCurrentLanguage','unshift','includes','atypeId','Window_Message_newPage','_textCasingUpperState','Press\x20OK\x20to\x20convert\x20to\x20TSV.\x0a','messageCoreLocalization','Window_Options_changeVolume','addedWidth','lower\x20left','setRelativePosition','call','application/csv','quantity','_choices','upper-center','ChoiceWindowProperties','Adeus','currencyUnit','SortObjectByKeyLength','LangFiletype','processPyTextCode','textCodeCheck','weapon','getColor','command101','Danish','_commonEventId','makeCommandList','isSkillTypeMatchForUse','_targets','VariableID','textCodeResult','Window_ChoiceList','etypeId','convertButtonAssistText','ChoiceWindowDistance','version','_positionType','choice','#ffc8e0','Window_Options_statusText','changeTextColor','getChoiceListLineHeight','floor','German','default','convertCasingEscapeCharacters','returnPreservedFontSettings','pink','createContents','log','requestPictureTextRefresh','false','drawItem','tsv','applyChoiceHelpDescriptions','true','COMMONEVENT','</I>','map','getChoiceListMaxRows','isPlaytest','refresh','Actors','lower-center','processDrawPicture','SkillTypeID','contentsHeight','\x1bWrapJpBreak[0]','processFontChangeItalic','AutoColor','openness','itemChoiceActor','isColorLocked','getConfigValue','test','TextManager_message','setBackground','</WORDWRAP>','updateForcedPlacement','setFaceImage','convertLockColorsEscapeCharacters','Chinese(Traditional)','every','_pictureText','_autoPosRegExp','Game_System_mainFontFace','PictureTextRefresh','Farvel','messageWidth','drawPictureText','getLocalizedText','AutoColorRegExp','ConvertDefault','updatePlacement','Bitmap_measureTextWidth','startY','Enable','_wholeMoveDuration','advanced','UNDEFINED!','displayName','CheckCompatibility','choiceTextAlign','resetPositionX','You\x20do\x20not\x20have\x20a\x20language\x20%1\x20set\x20up.\x0a','outputWidth','#acacac','getLastPluginCommandInterpreter','getLastGainedItemData','length','Hei','SWITCH','WRAPBREAK','setMessageWindowXyOffsets','clearPictures','registerActorNameAutoColorChanges','terminateMessage','Farewell','open','split','addCommand','reduce','processCharacter','BOLD','stretchDimmerSprite','index','lower-left','convertCsvToTsvFile','remove','MESSAGE_CORE_PLUGIN_NAME','Window_ChoiceList_updatePlacement','commandSymbol','_textMacroFound','createTextState','setWordWrap','updateBitmap','\x1bTEXTALIGNMENT[3]','updateMove','members','isOpen','$dataLocalization','processEscapeCharacter','Adiós','refreshDimmerBitmap','load','\x5c%1','_moveDuration','confirmConvertCsvToTsv','prepareShowTextPluginCommandFollowups','PictureTextChange','switchOutTextForLocalization','drawTextEx','messageWordWrap','SWITCHES','Game_Map_refresh','getStartingChoiceWidth','_autoPositionTarget','cancel','<BR>','#707070','processNewLine','สวัสดี','MessageWindow','setChoiceListMaxColumns','_pictureTextSprite','textFont','PictureTextErase','_autoSizeCheck','_messagePositionReset','armor','open\x20.\x5cdata','WeaponTypeID','convertChoiceMacros','processTextAlignmentX','ParseLocalizationCsv','Hello','onLocalizationXhrLoad','Game_Party_initialize','return\x20\x27','choiceDistance','Settings','Finnish','exit','NonSupportedTextCodes','callCancelHandler','outlineWidth','Skills','return\x200','setSkillChoice','Unnamed.ttf','overrideMimeType','status','createTsvFile','addLoadListener','#a186be','convertBaseEscapeCharacters','loadLocalization','Window_Base_changeTextColor','obtainItem','_pictureId','currentCommand','toLowerCase','updatePictureText','centered','6316667pIKCvG','Window_Base_initialize','itemChoiceStypeId',')))','getChoiceListTextAlign','Scene_Options_maxCommands','setText','_pictureTextWindow','setup','Window_Message_processEscapeCharacter','ParseSkillNotetags','\x1bBOLD[1]','processPreviousColor','drawBackCenteredPicture','SelectWeapon','updateOverlappingY','_cancelButton','ConfigManager_makeData','Dutch','skill','text','ConfigManager_applyData','Window_NameBox_refresh','%1\x20file\x20has\x20not\x20been\x20made.\x0a','bind'];_0xc17c=function(){return _0x30faf1;};return _0xc17c();}var label=_0x53794b(0x3f3),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x53794b(0x22c)](function(_0x200a1e){const _0x1ae41a=_0x53794b;return _0x200a1e[_0x1ae41a(0x3b3)]&&_0x200a1e[_0x1ae41a(0x502)][_0x1ae41a(0x2f3)]('['+label+']');})[0x0];VisuMZ[label][_0x53794b(0x3a8)]=VisuMZ[label][_0x53794b(0x3a8)]||{},VisuMZ['ConvertParams']=function(_0x397cbc,_0x11f838){const _0x2bd55b=_0x53794b;for(const _0x297e5f in _0x11f838){if(_0x297e5f[_0x2bd55b(0x552)](/(.*):(.*)/i)){const _0x4a9683=String(RegExp['$1']),_0x1eaefd=String(RegExp['$2'])['toUpperCase']()[_0x2bd55b(0x470)]();let _0x5e57c1,_0x241958,_0x1233ec;switch(_0x1eaefd){case _0x2bd55b(0x563):_0x5e57c1=_0x11f838[_0x297e5f]!==''?Number(_0x11f838[_0x297e5f]):0x0;break;case'ARRAYNUM':_0x241958=_0x11f838[_0x297e5f]!==''?JSON[_0x2bd55b(0x42e)](_0x11f838[_0x297e5f]):[],_0x5e57c1=_0x241958[_0x2bd55b(0x32e)](_0x474bcb=>Number(_0x474bcb));break;case'EVAL':_0x5e57c1=_0x11f838[_0x297e5f]!==''?eval(_0x11f838[_0x297e5f]):null;break;case _0x2bd55b(0x203):_0x241958=_0x11f838[_0x297e5f]!==''?JSON[_0x2bd55b(0x42e)](_0x11f838[_0x297e5f]):[],_0x5e57c1=_0x241958[_0x2bd55b(0x32e)](_0x45f9ca=>eval(_0x45f9ca));break;case'JSON':_0x5e57c1=_0x11f838[_0x297e5f]!==''?JSON[_0x2bd55b(0x42e)](_0x11f838[_0x297e5f]):'';break;case'ARRAYJSON':_0x241958=_0x11f838[_0x297e5f]!==''?JSON[_0x2bd55b(0x42e)](_0x11f838[_0x297e5f]):[],_0x5e57c1=_0x241958[_0x2bd55b(0x32e)](_0x17d5de=>JSON[_0x2bd55b(0x42e)](_0x17d5de));break;case'FUNC':_0x5e57c1=_0x11f838[_0x297e5f]!==''?new Function(JSON['parse'](_0x11f838[_0x297e5f])):new Function(_0x2bd55b(0x3af));break;case _0x2bd55b(0x2e2):_0x241958=_0x11f838[_0x297e5f]!==''?JSON[_0x2bd55b(0x42e)](_0x11f838[_0x297e5f]):[],_0x5e57c1=_0x241958[_0x2bd55b(0x32e)](_0x2faf7a=>new Function(JSON[_0x2bd55b(0x42e)](_0x2faf7a)));break;case _0x2bd55b(0x451):_0x5e57c1=_0x11f838[_0x297e5f]!==''?String(_0x11f838[_0x297e5f]):'';break;case'ARRAYSTR':_0x241958=_0x11f838[_0x297e5f]!==''?JSON['parse'](_0x11f838[_0x297e5f]):[],_0x5e57c1=_0x241958[_0x2bd55b(0x32e)](_0x478a1c=>String(_0x478a1c));break;case _0x2bd55b(0x2c1):_0x1233ec=_0x11f838[_0x297e5f]!==''?JSON['parse'](_0x11f838[_0x297e5f]):{},_0x397cbc[_0x4a9683]={},VisuMZ[_0x2bd55b(0x2a3)](_0x397cbc[_0x4a9683],_0x1233ec);continue;case _0x2bd55b(0x5be):_0x241958=_0x11f838[_0x297e5f]!==''?JSON[_0x2bd55b(0x42e)](_0x11f838[_0x297e5f]):[],_0x5e57c1=_0x241958[_0x2bd55b(0x32e)](_0x322652=>VisuMZ[_0x2bd55b(0x2a3)]({},JSON[_0x2bd55b(0x42e)](_0x322652)));break;default:continue;}_0x397cbc[_0x4a9683]=_0x5e57c1;}}return _0x397cbc;},(_0x369ac0=>{const _0x5a769a=_0x53794b,_0x3b6554=_0x369ac0[_0x5a769a(0x23f)];for(const _0x1ccc38 of dependencies){if(!Imported[_0x1ccc38]){alert(_0x5a769a(0x2e5)['format'](_0x3b6554,_0x1ccc38)),SceneManager[_0x5a769a(0x3aa)]();break;}}const _0x284c97=_0x369ac0[_0x5a769a(0x502)];if(_0x284c97[_0x5a769a(0x552)](/\[Version[ ](.*?)\]/i)){const _0x5206aa=Number(RegExp['$1']);_0x5206aa!==VisuMZ[label][_0x5a769a(0x317)]&&(alert(_0x5a769a(0x59b)[_0x5a769a(0x201)](_0x3b6554,_0x5206aa)),SceneManager['exit']());}if(_0x284c97[_0x5a769a(0x552)](/\[Tier[ ](\d+)\]/i)){const _0x2ef550=Number(RegExp['$1']);_0x2ef550<tier?(alert(_0x5a769a(0x2d7)['format'](_0x3b6554,_0x2ef550,tier)),SceneManager[_0x5a769a(0x3aa)]()):tier=Math[_0x5a769a(0x3ed)](_0x2ef550,tier);}VisuMZ[_0x5a769a(0x2a3)](VisuMZ[label][_0x5a769a(0x3a8)],_0x369ac0[_0x5a769a(0x435)]);})(pluginData),PluginManager[_0x53794b(0x506)](pluginData[_0x53794b(0x23f)],_0x53794b(0x316),_0x2f074e=>{const _0x13a45f=_0x53794b;VisuMZ[_0x13a45f(0x2a3)](_0x2f074e,_0x2f074e);const _0x2bfcfc=Number(_0x2f074e[_0x13a45f(0x291)])||0x0;$gameSystem[_0x13a45f(0x277)](_0x2bfcfc);}),PluginManager[_0x53794b(0x506)](pluginData[_0x53794b(0x23f)],_0x53794b(0x302),_0x10e807=>{const _0x295749=_0x53794b;VisuMZ[_0x295749(0x2a3)](_0x10e807,_0x10e807);const _0x47a8e2=_0x10e807[_0x295749(0x480)]||$gameSystem['getChoiceListLineHeight']()||0x1,_0x1a1fb5=_0x10e807[_0x295749(0x45a)]??0x60,_0x105f49=_0x10e807[_0x295749(0x3e1)]||$gameSystem[_0x295749(0x32f)]()||0x1,_0x2b81a1=_0x10e807[_0x295749(0x4a2)]||$gameSystem['getChoiceListMaxColumns']()||0x1,_0x14459d=_0x10e807[_0x295749(0x598)]['toLowerCase']()||'default';$gameSystem[_0x295749(0x51d)](_0x47a8e2),$gameSystem[_0x295749(0x2b1)](_0x1a1fb5),$gameSystem[_0x295749(0x593)](_0x105f49),$gameSystem[_0x295749(0x397)](_0x2b81a1),$gameSystem[_0x295749(0x2de)](_0x14459d);}),PluginManager[_0x53794b(0x506)](pluginData[_0x53794b(0x23f)],_0x53794b(0x481),_0x1bfff7=>{const _0x5796b4=_0x53794b;VisuMZ[_0x5796b4(0x2a3)](_0x1bfff7,_0x1bfff7);const _0x56e163=_0x1bfff7[_0x5796b4(0x4a4)]||$gameSystem[_0x5796b4(0x2b6)]()||0x1,_0x5d26fd=_0x1bfff7[_0x5796b4(0x548)]||$gameSystem['getMessageWindowWidth']()||0x1;$gameTemp[_0x5796b4(0x25c)]=!![];const _0x5a2aba=_0x1bfff7['WordWrap'][_0x5796b4(0x3bd)]();$gameSystem[_0x5796b4(0x449)](_0x56e163),$gameSystem['setMessageWindowWidth'](_0x5d26fd);[_0x5796b4(0x32b),_0x5796b4(0x327)][_0x5796b4(0x2f3)](_0x5a2aba)&&$gameSystem[_0x5796b4(0x4ec)](eval(_0x5a2aba));const _0x3294dc=SceneManager[_0x5796b4(0x295)]['_messageWindow'];_0x3294dc&&(_0x3294dc[_0x5796b4(0x59e)](),_0x3294dc['updateDimensions'](),_0x3294dc[_0x5796b4(0x324)]());}),PluginManager[_0x53794b(0x506)](pluginData['name'],'MessageWindowXyOffsets',_0x4a72b7=>{const _0x2848b9=_0x53794b;VisuMZ[_0x2848b9(0x2a3)](_0x4a72b7,_0x4a72b7),$gameSystem[_0x2848b9(0x365)](_0x4a72b7[_0x2848b9(0x43e)],_0x4a72b7[_0x2848b9(0x267)]);const _0xe6139e=SceneManager['_scene'][_0x2848b9(0x59a)];_0xe6139e&&(_0xe6139e[_0x2848b9(0x59e)](),_0xe6139e[_0x2848b9(0x239)](),_0xe6139e[_0x2848b9(0x324)]());}),PluginManager[_0x53794b(0x506)](pluginData[_0x53794b(0x23f)],_0x53794b(0x3ce),_0x3a316e=>{const _0x2eb37b=_0x53794b;VisuMZ[_0x2eb37b(0x2a3)](_0x3a316e,_0x3a316e),$gameMessage['setWeaponChoice'](_0x3a316e['VariableID']||0x0,_0x3a316e['WeaponTypeID']||0x0);const _0x242ea6=$gameTemp[_0x2eb37b(0x35f)]();if(_0x242ea6)_0x242ea6[_0x2eb37b(0x429)](_0x2eb37b(0x23a));}),PluginManager[_0x53794b(0x506)](pluginData[_0x53794b(0x23f)],_0x53794b(0x1d7),_0x67d266=>{const _0x4fe950=_0x53794b;VisuMZ[_0x4fe950(0x2a3)](_0x67d266,_0x67d266),$gameMessage[_0x4fe950(0x2ee)](_0x67d266[_0x4fe950(0x311)]||0x0,_0x67d266[_0x4fe950(0x464)]||0x0,_0x67d266['EquipTypeID']||0x0);const _0x21e311=$gameTemp[_0x4fe950(0x35f)]();if(_0x21e311)_0x21e311[_0x4fe950(0x429)](_0x4fe950(0x23a));}),PluginManager['registerCommand'](pluginData[_0x53794b(0x23f)],'SelectSkill',_0xaa5bd7=>{const _0x432611=_0x53794b;VisuMZ[_0x432611(0x2a3)](_0xaa5bd7,_0xaa5bd7),$gameMessage['setSkillChoice'](_0xaa5bd7[_0x432611(0x311)]||0x0,_0xaa5bd7[_0x432611(0x400)]||0x0,_0xaa5bd7[_0x432611(0x335)]||0x0);const _0x46ed4c=$gameTemp[_0x432611(0x35f)]();if(_0x46ed4c)_0x46ed4c[_0x432611(0x429)](_0x432611(0x23a));}),PluginManager['registerCommand'](pluginData[_0x53794b(0x23f)],_0x53794b(0x389),_0x7bf147=>{const _0x3d75b9=_0x53794b;VisuMZ[_0x3d75b9(0x2a3)](_0x7bf147,_0x7bf147);const _0x2b7715=_0x7bf147[_0x3d75b9(0x50c)]||[],_0xe2fe23=_0x7bf147[_0x3d75b9(0x2bb)]||0x0,_0x4ae164=[_0x3d75b9(0x3ee),'up','upperright',_0x3d75b9(0x2c6),'center',_0x3d75b9(0x2e6),'lowerleft','down',_0x3d75b9(0x25a)];for(const _0x5c28c8 of _0x2b7715){$gameScreen[_0x3d75b9(0x52b)](_0x5c28c8,_0xe2fe23);for(const _0x416690 of _0x4ae164){if(_0x7bf147[_0x416690]===undefined)continue;$gameScreen['setPictureText'](_0x5c28c8,_0x7bf147[_0x416690],_0x416690);}}}),PluginManager[_0x53794b(0x506)](pluginData['name'],_0x53794b(0x39a),_0x436b6c=>{const _0x181704=_0x53794b;VisuMZ[_0x181704(0x2a3)](_0x436b6c,_0x436b6c);const _0x56d173=_0x436b6c['PictureIDs']||[];for(const _0x5af900 of _0x56d173){$gameScreen[_0x181704(0x4ab)](_0x5af900),$gameScreen[_0x181704(0x23b)](_0x5af900);}}),PluginManager[_0x53794b(0x506)](pluginData[_0x53794b(0x23f)],_0x53794b(0x34a),_0xc3da1e=>{const _0x583488=_0x53794b;$gameScreen[_0x583488(0x505)]();}),VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x2c2)]=Scene_Boot[_0x53794b(0x275)][_0x53794b(0x542)],Scene_Boot[_0x53794b(0x275)][_0x53794b(0x542)]=function(){const _0x32d36f=_0x53794b;VisuMZ[_0x32d36f(0x3f3)]['Scene_Boot_onDatabaseLoaded'][_0x32d36f(0x2fd)](this),VisuMZ['MessageCore']['CheckCompatibility'](),this['process_VisuMZ_MessageCore_TextCodes_Action'](),this[_0x32d36f(0x486)](),this[_0x32d36f(0x1f3)](),this['process_VisuMZ_MessageCore_AutoColor']();},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x359)]=function(){const _0x3d2636=_0x53794b;if(Imported[_0x3d2636(0x22e)]&&VisuMZ[_0x3d2636(0x48a)][_0x3d2636(0x317)]<1.09){let _0x32ed9a='';_0x32ed9a+=_0x3d2636(0x270),_0x32ed9a+=_0x3d2636(0x47a),alert(_0x32ed9a),SceneManager[_0x3d2636(0x3aa)]();}},VisuMZ[_0x53794b(0x3f3)]['SortObjectByKeyLength']=function(_0x1e1f5c){const _0x452d52=VisuMZ['MessageCore']['Settings'][_0x1e1f5c];_0x452d52['sort']((_0x133786,_0x57f12e)=>{const _0x5c7217=_0x49d2;if(!_0x133786||!_0x57f12e)return-0x1;return _0x57f12e[_0x5c7217(0x3f1)]['length']-_0x133786['Match'][_0x5c7217(0x361)];});},Scene_Boot[_0x53794b(0x275)][_0x53794b(0x288)]=function(){const _0x2ce1f8=_0x53794b;VisuMZ[_0x2ce1f8(0x3f3)][_0x2ce1f8(0x305)](_0x2ce1f8(0x26b));for(const _0x25e5b2 of VisuMZ[_0x2ce1f8(0x3f3)][_0x2ce1f8(0x3a8)][_0x2ce1f8(0x26b)]){_0x25e5b2[_0x2ce1f8(0x3f1)]=_0x25e5b2[_0x2ce1f8(0x3f1)][_0x2ce1f8(0x217)](),_0x25e5b2['textCodeCheck']=new RegExp('\x1b'+_0x25e5b2[_0x2ce1f8(0x3f1)],'gi'),_0x25e5b2[_0x2ce1f8(0x312)]='\x1b'+_0x25e5b2[_0x2ce1f8(0x3f1)];if(_0x25e5b2[_0x2ce1f8(0x4d9)]==='')_0x25e5b2[_0x2ce1f8(0x312)]+='[0]';}},Scene_Boot[_0x53794b(0x275)][_0x53794b(0x486)]=function(){const _0x17e272=_0x53794b;VisuMZ[_0x17e272(0x3f3)][_0x17e272(0x305)]('TextCodeReplace');for(const _0x3a67b9 of VisuMZ[_0x17e272(0x3f3)][_0x17e272(0x3a8)][_0x17e272(0x405)]){_0x3a67b9[_0x17e272(0x308)]=new RegExp('\x1b'+_0x3a67b9[_0x17e272(0x3f1)]+_0x3a67b9[_0x17e272(0x4d9)],'gi'),_0x3a67b9[_0x17e272(0x4fb)]!==''&&_0x3a67b9['TextStr']!=='Undefined'?_0x3a67b9[_0x17e272(0x312)]=new Function(_0x17e272(0x3a6)+_0x3a67b9[_0x17e272(0x4fb)]['replace'](/\\/g,'\x1b')+'\x27'):_0x3a67b9[_0x17e272(0x312)]=_0x3a67b9[_0x17e272(0x2d5)];}},Scene_Boot['prototype'][_0x53794b(0x1f3)]=function(){const _0x40109f=_0x53794b;for(const _0x975fbc of VisuMZ['MessageCore'][_0x40109f(0x3a8)][_0x40109f(0x54d)]){_0x975fbc['textCodeCheck']=new RegExp('\x5c['+_0x975fbc[_0x40109f(0x3f1)]+'\x5c]','gi');if(_0x975fbc[_0x40109f(0x4fb)]!==''&&_0x975fbc['TextStr']!==_0x40109f(0x572)){let _0x32ff08=_0x975fbc[_0x40109f(0x4fb)];_0x32ff08=_0x32ff08[_0x40109f(0x294)](/\\/g,'\x1b'),_0x32ff08=_0x32ff08[_0x40109f(0x294)]('\x27','\x5c\x27'),_0x32ff08=_0x32ff08['replace']('\x22','\x5c\x22'),_0x975fbc[_0x40109f(0x312)]=new Function(_0x40109f(0x3a6)+_0x32ff08+'\x27');}else _0x975fbc[_0x40109f(0x312)]=_0x975fbc[_0x40109f(0x2d5)];}},Scene_Boot[_0x53794b(0x275)][_0x53794b(0x49a)]=function(){const _0x440e0e=_0x53794b,_0x5a29de=VisuMZ[_0x440e0e(0x3f3)][_0x440e0e(0x3a8)][_0x440e0e(0x339)];!VisuMZ[_0x440e0e(0x259)]&&(VisuMZ[_0x440e0e(0x3f3)]['AddAutoColor']($dataClasses,_0x5a29de[_0x440e0e(0x49b)]),VisuMZ['MessageCore']['AddAutoColor']($dataSkills,_0x5a29de[_0x440e0e(0x3ae)]),VisuMZ['MessageCore'][_0x440e0e(0x48d)]($dataItems,_0x5a29de['Items']),VisuMZ['MessageCore'][_0x440e0e(0x48d)]($dataWeapons,_0x5a29de[_0x440e0e(0x57f)]),VisuMZ[_0x440e0e(0x3f3)][_0x440e0e(0x48d)]($dataArmors,_0x5a29de[_0x440e0e(0x261)]),VisuMZ[_0x440e0e(0x3f3)][_0x440e0e(0x48d)]($dataEnemies,_0x5a29de[_0x440e0e(0x3f0)]),VisuMZ[_0x440e0e(0x3f3)][_0x440e0e(0x48d)]($dataStates,_0x5a29de[_0x440e0e(0x4fd)])),VisuMZ[_0x440e0e(0x3f3)][_0x440e0e(0x4bc)]();},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x4d1)]=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^','<B>',_0x53794b(0x252),'<I>',_0x53794b(0x32d),_0x53794b(0x577),_0x53794b(0x461),_0x53794b(0x420),_0x53794b(0x401),'<RIGHT>','</RIGHT>',_0x53794b(0x500),_0x53794b(0x487),_0x53794b(0x27b),_0x53794b(0x3c3),_0x53794b(0x4c8),'</WORDWRAP>',_0x53794b(0x392),'<LINE\x20BREAK>','PICTURE','CENTERPICTURE',_0x53794b(0x32c),_0x53794b(0x230),_0x53794b(0x580),'HIDE',_0x53794b(0x4bd),'DISABLE',_0x53794b(0x363),_0x53794b(0x38d),_0x53794b(0x208),_0x53794b(0x53e)],VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x48d)]=function(_0x402ae3,_0x3fff88){const _0x4fa946=_0x53794b;if(_0x3fff88<=0x0)return;const _0x49b91a=_0x402ae3;for(const _0x2d88c5 of _0x49b91a){if(!_0x2d88c5)continue;VisuMZ[_0x4fa946(0x3f3)][_0x4fa946(0x4f6)](_0x2d88c5,_0x3fff88);}},VisuMZ[_0x53794b(0x3f3)]['CreateAutoColorRegExpLists']=function(){const _0x2bac4c=_0x53794b;VisuMZ['MessageCore'][_0x2bac4c(0x34f)]=[];for(let _0x1edfbb=0x1;_0x1edfbb<=0x1f;_0x1edfbb++){const _0x3ac584=_0x2bac4c(0x503)['format'](_0x1edfbb),_0x27c5ee=VisuMZ[_0x2bac4c(0x3f3)][_0x2bac4c(0x3a8)]['AutoColor'][_0x3ac584];_0x27c5ee[_0x2bac4c(0x227)]((_0x3ddc5f,_0x57b28b)=>{const _0x1787bc=_0x2bac4c;if(!_0x3ddc5f||!_0x57b28b)return-0x1;return _0x57b28b['length']-_0x3ddc5f[_0x1787bc(0x361)];}),this['CreateAutoColorRegExpListEntries'](_0x27c5ee,_0x1edfbb);}},VisuMZ[_0x53794b(0x3f3)]['CreateAutoColorRegExpListEntries']=function(_0x1043dd,_0x426468){const _0x48b694=_0x53794b;for(const _0x5765c4 of _0x1043dd){if(_0x5765c4['length']<=0x0)continue;if(/^\d+$/[_0x48b694(0x33e)](_0x5765c4))continue;let _0x5cf7eb=VisuMZ['MessageCore'][_0x48b694(0x408)](_0x5765c4);if(_0x5765c4['match'](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g))var _0x285b0b=new RegExp(_0x5cf7eb,'i');else var _0x285b0b=new RegExp('\x5cb'+_0x5cf7eb+'\x5cb','g');VisuMZ['MessageCore']['AutoColorRegExp'][_0x48b694(0x547)]([_0x285b0b,'\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x48b694(0x201)](_0x426468,_0x5765c4)]);}},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x408)]=function(_0x1a8c36){const _0x53cd5e=_0x53794b;return _0x1a8c36=_0x1a8c36[_0x53cd5e(0x294)](/(\W)/gi,(_0xf1f640,_0x445ff2)=>_0x53cd5e(0x385)['format'](_0x445ff2)),_0x1a8c36;},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x212)]=VisuMZ[_0x53794b(0x212)],VisuMZ[_0x53794b(0x212)]=function(_0xc3876d){const _0x320968=_0x53794b;VisuMZ[_0x320968(0x3f3)][_0x320968(0x212)][_0x320968(0x2fd)](this,_0xc3876d);const _0x45afaf=VisuMZ[_0x320968(0x3f3)]['Settings'][_0x320968(0x339)];VisuMZ[_0x320968(0x3f3)][_0x320968(0x4f6)](_0xc3876d,_0x45afaf[_0x320968(0x49b)]);},VisuMZ['MessageCore'][_0x53794b(0x3ca)]=VisuMZ[_0x53794b(0x3ca)],VisuMZ[_0x53794b(0x3ca)]=function(_0x5e9df1){const _0x44c217=_0x53794b;VisuMZ[_0x44c217(0x3f3)]['ParseSkillNotetags']['call'](this,_0x5e9df1);const _0x249153=VisuMZ[_0x44c217(0x3f3)]['Settings'][_0x44c217(0x339)];VisuMZ['MessageCore'][_0x44c217(0x4f6)](_0x5e9df1,_0x249153[_0x44c217(0x3ae)]);},0x7,VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x2a2)]=VisuMZ[_0x53794b(0x2a2)],VisuMZ['ParseItemNotetags']=function(_0x4847a5){const _0x221e46=_0x53794b;VisuMZ[_0x221e46(0x3f3)][_0x221e46(0x2a2)][_0x221e46(0x2fd)](this,_0x4847a5);const _0x18c3fa=VisuMZ['MessageCore'][_0x221e46(0x3a8)]['AutoColor'];VisuMZ[_0x221e46(0x3f3)]['CreateAutoColorFor'](_0x4847a5,_0x18c3fa['Items']);},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x272)]=VisuMZ[_0x53794b(0x272)],VisuMZ[_0x53794b(0x272)]=function(_0xb4b095){const _0x38e593=_0x53794b;VisuMZ[_0x38e593(0x3f3)][_0x38e593(0x272)]['call'](this,_0xb4b095);const _0x44ed96=VisuMZ['MessageCore'][_0x38e593(0x3a8)][_0x38e593(0x339)];VisuMZ[_0x38e593(0x3f3)]['CreateAutoColorFor'](_0xb4b095,_0x44ed96[_0x38e593(0x57f)]);},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x58c)]=VisuMZ['ParseArmorNotetags'],VisuMZ[_0x53794b(0x58c)]=function(_0x199159){const _0x165169=_0x53794b;VisuMZ[_0x165169(0x3f3)][_0x165169(0x58c)][_0x165169(0x2fd)](this,_0x199159);const _0x47ec93=VisuMZ[_0x165169(0x3f3)]['Settings'][_0x165169(0x339)];VisuMZ['MessageCore']['CreateAutoColorFor'](_0x199159,_0x47ec93[_0x165169(0x261)]);},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x2bc)]=VisuMZ[_0x53794b(0x2bc)],VisuMZ['ParseEnemyNotetags']=function(_0x254adf){const _0x15093a=_0x53794b;VisuMZ[_0x15093a(0x3f3)]['ParseEnemyNotetags'][_0x15093a(0x2fd)](this,_0x254adf);const _0x400cc3=VisuMZ[_0x15093a(0x3f3)][_0x15093a(0x3a8)][_0x15093a(0x339)];VisuMZ[_0x15093a(0x3f3)][_0x15093a(0x4f6)](_0x254adf,_0x400cc3[_0x15093a(0x3f0)]);},VisuMZ['MessageCore']['ParseStateNotetags']=VisuMZ[_0x53794b(0x4d2)],VisuMZ[_0x53794b(0x4d2)]=function(_0xb59cd3){const _0x19d39f=_0x53794b;VisuMZ[_0x19d39f(0x3f3)][_0x19d39f(0x4d2)][_0x19d39f(0x2fd)](this,_0xb59cd3);const _0x3e7bd9=VisuMZ['MessageCore'][_0x19d39f(0x3a8)][_0x19d39f(0x339)];VisuMZ[_0x19d39f(0x3f3)]['CreateAutoColorFor'](_0xb59cd3,_0x3e7bd9['States']);},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x4f6)]=function(_0x26befc,_0xe74ad5){const _0x384c2b=_0x53794b;if(_0xe74ad5<=0x0)return;const _0x4665f3=VisuMZ['MessageCore'][_0x384c2b(0x3a8)][_0x384c2b(0x339)][_0x384c2b(0x43d)+_0xe74ad5];let _0x15b9bc=_0x26befc[_0x384c2b(0x23f)]['trim']();if(/^\d+$/[_0x384c2b(0x33e)](_0x15b9bc))return;if(VisuMZ[_0x384c2b(0x3f3)]['AutoColorBypassList'][_0x384c2b(0x2f3)](_0x15b9bc[_0x384c2b(0x217)]()))return;_0x15b9bc=_0x15b9bc[_0x384c2b(0x294)](/\\I\[(\d+)\]/gi,''),_0x15b9bc=_0x15b9bc[_0x384c2b(0x294)](/\x1bI\[(\d+)\]/gi,'');if(_0x15b9bc[_0x384c2b(0x361)]<=0x0)return;if(_0x15b9bc[_0x384c2b(0x552)](/-----/i))return;_0x4665f3[_0x384c2b(0x547)](_0x15b9bc);},VisuMZ['MessageCore'][_0x53794b(0x4c7)]=Scene_Boot[_0x53794b(0x275)][_0x53794b(0x4fe)],Scene_Boot[_0x53794b(0x275)][_0x53794b(0x4fe)]=function(){const _0x2c4181=_0x53794b;VisuMZ[_0x2c4181(0x3f3)][_0x2c4181(0x4c7)][_0x2c4181(0x2fd)](this),this['loadCustomFontsMessageCore']();},Scene_Boot['prototype']['loadCustomFontsMessageCore']=function(){const _0x492006=_0x53794b,_0x1c99c7=VisuMZ[_0x492006(0x3f3)][_0x492006(0x3a8)]['CustomFonts']||[];for(const _0x1ddf00 of _0x1c99c7){if(!_0x1ddf00)continue;const _0x352799=_0x1ddf00[_0x492006(0x597)];if(_0x352799[_0x492006(0x470)]()==='')continue;if(_0x352799[_0x492006(0x3bd)]()[_0x492006(0x470)]()===_0x492006(0x278))continue;const _0x16385c=_0x1ddf00['Filename'];if(_0x16385c===_0x492006(0x3b1))continue;FontManager[_0x492006(0x384)](_0x352799,_0x16385c);}},VisuMZ['MessageCore']['LocalizationType']=VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x3a8)][_0x53794b(0x417)][_0x53794b(0x306)]??_0x53794b(0x329),VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x2ed)]=DataManager[_0x53794b(0x496)],DataManager[_0x53794b(0x496)]=function(){const _0x4c329f=_0x53794b;VisuMZ[_0x4c329f(0x3f3)][_0x4c329f(0x2ed)]['call'](this),this['loadLocalization']();},DataManager[_0x53794b(0x3b8)]=function(){const _0x3d4e72=_0x53794b;if(!TextManager[_0x3d4e72(0x4a9)]())return;const _0x4fd889=VisuMZ[_0x3d4e72(0x3f3)][_0x3d4e72(0x3a8)][_0x3d4e72(0x417)];let _0x161134='';const _0x1c3297=VisuMZ[_0x3d4e72(0x3f3)][_0x3d4e72(0x434)]??'tsv';if(_0x1c3297===_0x3d4e72(0x24f))_0x161134=(_0x4fd889[_0x3d4e72(0x4be)]??_0x3d4e72(0x59d))||'';if(_0x1c3297==='tsv')_0x161134=(_0x4fd889[_0x3d4e72(0x5ab)]??_0x3d4e72(0x25d))||'';if(!_0x161134)return;const _0x13615a=_0x3d4e72(0x380),_0x39a26d=new XMLHttpRequest(),_0x4aa468=_0x3d4e72(0x5bc)+_0x161134;window[_0x13615a]=null,_0x39a26d[_0x3d4e72(0x36a)](_0x3d4e72(0x44e),_0x4aa468),_0x39a26d[_0x3d4e72(0x3b2)](_0x3d4e72(0x490)[_0x3d4e72(0x201)](_0x1c3297[_0x3d4e72(0x3bd)]())),_0x39a26d[_0x3d4e72(0x297)]=()=>this[_0x3d4e72(0x3a4)](_0x39a26d,_0x13615a),_0x39a26d[_0x3d4e72(0x538)]=()=>this[_0x3d4e72(0x54a)](),_0x39a26d[_0x3d4e72(0x402)]();},DataManager['onLocalizationXhrLoad']=function(_0x5e48df,_0x6e0025){const _0x3e6b58=_0x53794b;if(_0x5e48df[_0x3e6b58(0x3b3)]>=0x190)return;const _0x197d9d=_0x5e48df[_0x3e6b58(0x2aa)];window[_0x6e0025]=VisuMZ['MessageCore'][_0x3e6b58(0x3a2)](_0x197d9d);},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x3a2)]=function(_0x199b8d){const _0x487858=_0x53794b,_0x20547a=VisuMZ[_0x487858(0x3f3)][_0x487858(0x434)]??'tsv',_0x52546e=_0x20547a===_0x487858(0x24f)?';':'\x09',_0xc2feff=_0x199b8d[_0x487858(0x36b)]('\x0a'),_0x16f868=_0xc2feff[0x0][_0x487858(0x36b)](_0x52546e),_0x241d18={};return _0xc2feff[_0x487858(0x220)](0x1)['forEach'](_0x30275c=>{const _0x3ee7c3=_0x487858;let _0x14af3b=[],_0x492d0e='',_0xf91022=![];for(let _0x91965a=0x0;_0x91965a<_0x30275c[_0x3ee7c3(0x361)];_0x91965a++){let _0x3caae9=_0x30275c[_0x91965a];if(_0x3caae9==='\x22')_0xf91022&&_0x30275c[_0x91965a+0x1]==='\x22'?(_0x492d0e+=_0x3caae9,_0x91965a++):_0xf91022=!_0xf91022;else _0x3caae9===_0x52546e&&!_0xf91022?(_0x14af3b[_0x3ee7c3(0x547)](_0x492d0e),_0x492d0e=''):_0x492d0e+=_0x3caae9;}if(_0x492d0e)_0x14af3b[_0x3ee7c3(0x547)](_0x492d0e);if(!_0x14af3b[0x0])_0x14af3b[0x0]='';const _0x27d228=_0x14af3b[0x0][_0x3ee7c3(0x294)](/^"|"$/g,'')[_0x3ee7c3(0x3bd)]()['trim']();_0x241d18[_0x27d228]=_0x16f868[_0x3ee7c3(0x220)](0x1)[_0x3ee7c3(0x36d)]((_0x468887,_0x3eee45,_0x2b5ffd)=>{const _0x579d23=_0x3ee7c3;return _0x468887[_0x3eee45[_0x579d23(0x470)]()]=(_0x14af3b[_0x2b5ffd+0x1]||'')[_0x579d23(0x294)](/^"|"$/g,''),_0x468887;},{});}),_0x241d18;},DataManager['onLocalizationXhrError']=function(){const _0x43ad0a=_0x53794b,_0x3ae427=(VisuMZ[_0x43ad0a(0x3f3)][_0x43ad0a(0x434)]??_0x43ad0a(0x329))[_0x43ad0a(0x217)]();let _0x212be3='';_0x212be3+=_0x43ad0a(0x35c),_0x212be3+='Would\x20you\x20like\x20the\x20plugin\x20to\x20create\x20the\x20base\x20%1\x20file?\x0a\x0a',_0x212be3=_0x212be3[_0x43ad0a(0x201)](_0x3ae427);if(confirm(_0x212be3)){if(Utils['isOptionValid']('test')){if(_0x3ae427===_0x43ad0a(0x3e6))_0x212be3='%1\x20file\x20is\x20now\x20created\x20and\x20stored\x20in\x20data\x20folder.\x0a',_0x212be3=_0x212be3[_0x43ad0a(0x201)](_0x3ae427),alert(_0x212be3),this[_0x43ad0a(0x20a)](),this[_0x43ad0a(0x4ef)]();else return this[_0x43ad0a(0x2eb)]();_0x212be3='';}else _0x212be3='%1\x20file\x20cannot\x20be\x20created.\x0aPlease\x20enter\x20Playtest\x20mode.\x0a';}else _0x212be3=_0x43ad0a(0x3d7);_0x212be3+=_0x43ad0a(0x2dd),_0x212be3=_0x212be3[_0x43ad0a(0x201)](_0x3ae427),alert(_0x212be3),SceneManager['exit']();},DataManager[_0x53794b(0x2eb)]=function(){const _0x56e8ae=_0x53794b,_0xbb2b43=VisuMZ['MessageCore'][_0x56e8ae(0x3a8)]['Localization'],_0x4530a2=_0xbb2b43['CsvFilename']??'Languages.csv',_0x276185=new XMLHttpRequest(),_0x3b91ad='data/'+_0x4530a2;_0x276185['open']('GET',_0x3b91ad),_0x276185[_0x56e8ae(0x3b2)](_0x56e8ae(0x2fe)),_0x276185[_0x56e8ae(0x297)]=()=>this[_0x56e8ae(0x387)](_0x276185),_0x276185[_0x56e8ae(0x538)]=()=>this[_0x56e8ae(0x3b4)](),_0x276185[_0x56e8ae(0x402)]();},DataManager['confirmConvertCsvToTsv']=function(_0x31183b){const _0x128474=_0x53794b,_0x2737e3=VisuMZ['MessageCore'][_0x128474(0x3a8)]['Localization'],_0x44060e=_0x2737e3['CsvFilename']??'Languages.csv';let _0x2fb393=_0x128474(0x3f8)[_0x128474(0x201)](_0x44060e);_0x2fb393+=_0x128474(0x2f7),_0x2fb393+=_0x128474(0x440),confirm(_0x2fb393)?this[_0x128474(0x373)](_0x31183b):this[_0x128474(0x3b4)]();},DataManager[_0x53794b(0x373)]=function(_0xad0095){const _0x2b0412=_0x53794b;if(_0xad0095[_0x2b0412(0x3b3)]>=0x190)return;const _0x287ba5=_0xad0095[_0x2b0412(0x2aa)],_0x435513=_0x287ba5[_0x2b0412(0x294)](/\;/gi,'\x09'),_0x10de45=VisuMZ[_0x2b0412(0x3f3)][_0x2b0412(0x3a8)][_0x2b0412(0x417)],_0x5a0e42=_0x10de45[_0x2b0412(0x5ab)]||'Languages.tsv',_0x28c6e6=require(_0x2b0412(0x3f7)),_0x5a9ed0=_0x28c6e6[_0x2b0412(0x49c)](process['mainModule'][_0x2b0412(0x43a)]),_0x3e2e38=_0x28c6e6[_0x2b0412(0x4d8)](_0x5a9ed0,_0x2b0412(0x5bc)),_0x4c4465=_0x3e2e38+_0x5a0e42,_0x34638d=require('fs');_0x34638d['writeFileSync'](_0x4c4465,_0x435513);let _0x18e5b5=_0x2b0412(0x43f);alert(_0x18e5b5),_0x18e5b5=_0x2b0412(0x2dd),alert(_0x18e5b5),SceneManager[_0x2b0412(0x3aa)]();},DataManager[_0x53794b(0x3b4)]=function(){const _0x581425=_0x53794b;let _0x8c38e4=_0x581425(0x43f);alert(_0x8c38e4),this[_0x581425(0x20a)](),this[_0x581425(0x4ef)](),_0x8c38e4=_0x581425(0x2dd),alert(_0x8c38e4),SceneManager['exit']();},DataManager[_0x53794b(0x20a)]=function(){const _0x14f357=_0x53794b,_0x1358e3=[_0x14f357(0x418),_0x14f357(0x3da),_0x14f357(0x1f8),_0x14f357(0x2d1),_0x14f357(0x345),_0x14f357(0x52e),_0x14f357(0x30c),_0x14f357(0x3d2),_0x14f357(0x3a9),_0x14f357(0x536),_0x14f357(0x31f),_0x14f357(0x57d),_0x14f357(0x29c),_0x14f357(0x28c),'Indonesian','Italian','Japanese',_0x14f357(0x255),_0x14f357(0x50e),_0x14f357(0x1fb),_0x14f357(0x53c),_0x14f357(0x556),_0x14f357(0x240),_0x14f357(0x2dc),'Spanish',_0x14f357(0x27c),_0x14f357(0x4f0),_0x14f357(0x4ae),_0x14f357(0x285)],_0x3542a9=[_0x14f357(0x260),_0x14f357(0x3a3),_0x14f357(0x463),'你好','你好',_0x14f357(0x478),_0x14f357(0x465),_0x14f357(0x537),_0x14f357(0x362),_0x14f357(0x56c),'Hallo',_0x14f357(0x1e0),_0x14f357(0x55f),_0x14f357(0x445),_0x14f357(0x4bf),_0x14f357(0x3ea),'こんにちは',_0x14f357(0x20b),_0x14f357(0x362),_0x14f357(0x58a),'Olá','Salut',_0x14f357(0x262),_0x14f357(0x478),_0x14f357(0x40f),_0x14f357(0x465),_0x14f357(0x56a),_0x14f357(0x395),_0x14f357(0x2ae)],_0x475e3c=[_0x14f357(0x369),_0x14f357(0x257),'বিদায়','再见','再見',_0x14f357(0x57e),_0x14f357(0x34b),'Tot\x20ziens',_0x14f357(0x4da),'Au\x20revoir',_0x14f357(0x3d9),'Αντίο',_0x14f357(0x42a),_0x14f357(0x2c0),_0x14f357(0x250),'Arrivederci','さようなら',_0x14f357(0x21a),'Ha\x20det','Do\x20widzenia',_0x14f357(0x303),'La\x20revedere',_0x14f357(0x5b2),_0x14f357(0x4b3),_0x14f357(0x382),_0x14f357(0x433),_0x14f357(0x22d),'ลาก่อน',_0x14f357(0x539)],_0x3fa664=[_0x14f357(0x533),_0x14f357(0x533),_0x14f357(0x415),'哇','哇','Ó',_0x14f357(0x533),_0x14f357(0x4f3),'Vau',_0x14f357(0x268),'Wow',_0x14f357(0x23e),_0x14f357(0x4c1),_0x14f357(0x5a7),_0x14f357(0x4e8),_0x14f357(0x533),'ワオ','와우','Oi','O',_0x14f357(0x491),_0x14f357(0x491),_0x14f357(0x4de),'Ó',_0x14f357(0x424),'Oj',_0x14f357(0x2ab),_0x14f357(0x485),'Vay'],_0x3662e2=[_0x1358e3,_0x3542a9,_0x475e3c,_0x3fa664],_0x31ba25=VisuMZ['MessageCore'][_0x14f357(0x434)]??'tsv',_0x3ec893=_0x31ba25===_0x14f357(0x24f)?';':'\x09',_0x3d4e37=_0x3662e2[_0x14f357(0x32e)](_0x42347b=>_0x42347b['join'](_0x3ec893))[_0x14f357(0x4d8)]('\x0a'),_0x536e91=VisuMZ['MessageCore'][_0x14f357(0x3a8)][_0x14f357(0x417)];let _0x441068='';if(_0x31ba25===_0x14f357(0x24f))_0x441068=_0x536e91[_0x14f357(0x4be)]||_0x14f357(0x59d);if(_0x31ba25===_0x14f357(0x329))_0x441068=_0x536e91[_0x14f357(0x5ab)]||_0x14f357(0x25d);const _0x53d676=require(_0x14f357(0x3f7)),_0x33debe=_0x53d676[_0x14f357(0x49c)](process[_0x14f357(0x26d)][_0x14f357(0x43a)]),_0x3f8f64=_0x53d676[_0x14f357(0x4d8)](_0x33debe,_0x14f357(0x5bc)),_0x1b2300=_0x3f8f64+_0x441068,_0x1d89c3=require('fs');return _0x1d89c3['writeFileSync'](_0x1b2300,_0x3d4e37),_0x1b2300;},DataManager[_0x53794b(0x4ef)]=function(){const _0x7904ff=_0x53794b,{exec:_0x1b9c8d}=require(_0x7904ff(0x5a5));_0x1b9c8d('start\x20.\x5cdata'),_0x1b9c8d(_0x7904ff(0x39e));},VisuMZ[_0x53794b(0x3f3)]['ImageManager_loadBitmap']=ImageManager[_0x53794b(0x472)],ImageManager[_0x53794b(0x472)]=function(_0x206ca2,_0x2bf656){const _0x46137e=_0x53794b;if(ConfigManager['textLocale']!==undefined){const _0x58fc7f=VisuMZ['MessageCore']['Settings'][_0x46137e(0x417)]||{},_0x5d2bde=_0x58fc7f[_0x46137e(0x46d)]||_0x46137e(0x3da),_0x55b749=VisuMZ['MessageCore'][_0x46137e(0x3a8)][_0x46137e(0x588)]||{},_0x55096f=ConfigManager[_0x46137e(0x4a3)]||_0x5d2bde;if(_0x55096f===_0x5d2bde&&!_0x55b749[_0x46137e(0x350)]){}else{const _0x520437=_0x55b749[_0x55096f]||_0x46137e(0x218);_0x206ca2&&_0x206ca2[_0x46137e(0x552)](/\[XX\]/g)&&console[_0x46137e(0x325)](_0x206ca2,_0x2bf656),_0x2bf656&&_0x2bf656['match'](/\[XX\]/g)&&(_0x2bf656=_0x2bf656['replace'](/\[XX\]/g,_0x520437));}}return VisuMZ[_0x46137e(0x3f3)]['ImageManager_loadBitmap']['call'](this,_0x206ca2,_0x2bf656);},SceneManager[_0x53794b(0x52a)]=function(){const _0x4264e1=_0x53794b;return this[_0x4264e1(0x295)]&&this[_0x4264e1(0x295)][_0x4264e1(0x3de)]===Scene_Battle;},SceneManager[_0x53794b(0x51b)]=function(){const _0x5dfc4d=_0x53794b;return this[_0x5dfc4d(0x295)]&&this['_scene'][_0x5dfc4d(0x3de)]===Scene_Map;},ConfigManager[_0x53794b(0x4a3)]=VisuMZ[_0x53794b(0x3f3)]['Settings'][_0x53794b(0x417)][_0x53794b(0x46d)]||_0x53794b(0x3da),ConfigManager[_0x53794b(0x426)]=VisuMZ[_0x53794b(0x3f3)]['Settings'][_0x53794b(0x27f)][_0x53794b(0x2cf)],VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x3d1)]=ConfigManager['makeData'],ConfigManager[_0x53794b(0x253)]=function(){const _0x23a075=_0x53794b,_0x586d6c=VisuMZ[_0x23a075(0x3f3)]['ConfigManager_makeData'][_0x23a075(0x2fd)](this);return TextManager[_0x23a075(0x4a9)]()&&(_0x586d6c[_0x23a075(0x4a3)]=this[_0x23a075(0x4a3)]),_0x586d6c[_0x23a075(0x426)]=this[_0x23a075(0x426)],_0x586d6c;},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x3d5)]=ConfigManager['applyData'],ConfigManager[_0x53794b(0x499)]=function(_0x16e32a){const _0x345a09=_0x53794b;VisuMZ[_0x345a09(0x3f3)][_0x345a09(0x3d5)][_0x345a09(0x2fd)](this,_0x16e32a),TextManager[_0x345a09(0x4a9)]()&&(_0x345a09(0x4a3)in _0x16e32a?this[_0x345a09(0x4a3)]=String(_0x16e32a[_0x345a09(0x4a3)]):this['textLocale']=VisuMZ[_0x345a09(0x3f3)][_0x345a09(0x3a8)][_0x345a09(0x417)][_0x345a09(0x46d)]||_0x345a09(0x3da)),_0x345a09(0x426)in _0x16e32a?this[_0x345a09(0x426)]=Number(_0x16e32a[_0x345a09(0x426)])[_0x345a09(0x22b)](0x1,0xb):this[_0x345a09(0x426)]=VisuMZ[_0x345a09(0x3f3)][_0x345a09(0x3a8)][_0x345a09(0x27f)][_0x345a09(0x2cf)];},TextManager[_0x53794b(0x2f8)]=VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x3a8)]['Localization']['Name'],TextManager[_0x53794b(0x3e2)]=VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x3a8)]['TextSpeed']['Name'],TextManager['instantTextSpeed']=VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x3a8)][_0x53794b(0x27f)][_0x53794b(0x594)],VisuMZ[_0x53794b(0x3f3)]['TextManager_message']=TextManager[_0x53794b(0x23a)],TextManager[_0x53794b(0x23a)]=function(_0x311eeb){const _0x23098c=_0x53794b,_0x311447=[_0x23098c(0x1e8),'emerge','preemptive',_0x23098c(0x25b),'victory',_0x23098c(0x3f5),_0x23098c(0x559),_0x23098c(0x4e5),_0x23098c(0x475),_0x23098c(0x3ba)];let _0x2cd211=VisuMZ[_0x23098c(0x3f3)][_0x23098c(0x33f)][_0x23098c(0x2fd)](this,_0x311eeb);return _0x311447[_0x23098c(0x2f3)](_0x311eeb)&&(_0x2cd211=_0x23098c(0x341)+_0x2cd211),_0x2cd211;},TextManager[_0x53794b(0x4a9)]=function(){const _0x5c9939=_0x53794b;return VisuMZ[_0x5c9939(0x3f3)][_0x5c9939(0x3a8)]['Localization'][_0x5c9939(0x354)];},TextManager[_0x53794b(0x4e0)]=function(_0x28ba95){const _0x614b0d=_0x53794b;if(!this[_0x614b0d(0x4a9)]())return _0x28ba95;return _0x28ba95=String(_0x28ba95)[_0x614b0d(0x294)](/\$(?:\[|\<|\{)(.*?)(?:\]|\>|\})/gi,(_0x491502,_0x2e8bc6)=>this[_0x614b0d(0x34e)](String(_0x2e8bc6))),_0x28ba95=String(_0x28ba95)[_0x614b0d(0x294)](/\\(?:KEY|TL|TRANSLATE|LOC|LOCALIZE|LOCALE)(?:\[|\<|\{)(.*?)(?:\]|\>|\})/gi,(_0x294d86,_0x51f2cb)=>this[_0x614b0d(0x34e)](String(_0x51f2cb))),_0x28ba95=String(_0x28ba95)[_0x614b0d(0x294)](/\x1b(?:KEY|TL|TRANSLATE|LOC|LOCALIZE|LOCALE)(?:\[|\<|\{)(.*?)(?:\]|\>|\})/gi,(_0x23e6fc,_0x40cd9f)=>this[_0x614b0d(0x34e)](String(_0x40cd9f))),_0x28ba95;},VisuMZ[_0x53794b(0x3f3)]['Bitmap_measureTextWidth']=Bitmap['prototype'][_0x53794b(0x4e9)],Bitmap[_0x53794b(0x275)][_0x53794b(0x4e9)]=function(_0x49dd56){const _0x591f12=_0x53794b;return _0x49dd56=TextManager[_0x591f12(0x4e0)](_0x49dd56),VisuMZ[_0x591f12(0x3f3)][_0x591f12(0x352)][_0x591f12(0x2fd)](this,_0x49dd56);},TextManager[_0x53794b(0x34e)]=function(_0x2ed4a3){const _0x49cda7=_0x53794b;if(!$dataLocalization)return'';const _0x32d35b=$dataLocalization[_0x2ed4a3[_0x49cda7(0x3bd)]()[_0x49cda7(0x470)]()];if(!_0x32d35b)return;const _0x16dc36=ConfigManager['textLocale']||_0x49cda7(0x3da);let _0x408774=_0x32d35b[_0x16dc36]||'UNDEFINED!';return _0x408774=_0x408774[_0x49cda7(0x294)](/\\/g,'\x1b'),_0x408774=_0x408774[_0x49cda7(0x294)](/<SEMI(?:|-COLON|COLON)>/gi,';'),_0x408774;},TextManager[_0x53794b(0x27d)]=function(_0x34d7ca){const _0x863d87=_0x53794b;return VisuMZ[_0x863d87(0x3f3)]['Settings']['Localization'][_0x34d7ca]||'';},TextManager[_0x53794b(0x2f1)]=function(){const _0x171546=_0x53794b,_0x317b06=ConfigManager[_0x171546(0x4a3)]||'English';return this[_0x171546(0x27d)](_0x317b06);},TextManager[_0x53794b(0x453)]=function(_0x2f39b5){const _0x3f0200=_0x53794b,_0x3f424e=VisuMZ[_0x3f0200(0x3f3)][_0x3f0200(0x3a8)][_0x3f0200(0x417)][_0x3f0200(0x4ca)]||[];let _0x1d14c5=_0x3f424e[_0x3f0200(0x595)](ConfigManager[_0x3f0200(0x4a3)]||_0x3f0200(0x3da));_0x1d14c5+=_0x2f39b5;const _0x7b2d2=_0x3f424e[_0x1d14c5]||'';return this[_0x3f0200(0x27d)](_0x7b2d2);},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x349)]=Game_System[_0x53794b(0x275)][_0x53794b(0x20c)],Game_System['prototype'][_0x53794b(0x20c)]=function(){const _0x198bf4=_0x53794b;let _0x1b9c44=VisuMZ[_0x198bf4(0x3f3)][_0x198bf4(0x349)][_0x198bf4(0x2fd)](this);if(ConfigManager&&ConfigManager['textFont']!==undefined&&ConfigManager[_0x198bf4(0x399)]>0x0)return _0x1b9c44;else{const _0x445fe1=ConfigManager[_0x198bf4(0x4a3)]||_0x198bf4(0x3da),_0x506ec6=VisuMZ[_0x198bf4(0x3f3)][_0x198bf4(0x3a8)]['LanguageFonts'];return _0x506ec6[_0x445fe1]!==undefined&&(_0x1b9c44=_0x506ec6[_0x445fe1]+',\x20'+$dataSystem[_0x198bf4(0x356)][_0x198bf4(0x45d)]),_0x1b9c44;}},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x5b4)]=Window_Command[_0x53794b(0x275)][_0x53794b(0x36c)],Window_Command[_0x53794b(0x275)][_0x53794b(0x36c)]=function(_0x17a117,_0x2a7087,_0x5067f9,_0x28604d){const _0x55acdc=_0x53794b;if(TextManager['parseLocalizedText']&&TextManager['isVisuMzLocalizationEnabled']()){const _0x4fb3c9=String(_0x17a117)[_0x55acdc(0x3bd)]()['trim']();if($dataLocalization[_0x4fb3c9]&&_0x4fb3c9[_0x55acdc(0x361)]>0x0){const _0x166a90=ConfigManager[_0x55acdc(0x4a3)]||'English';_0x17a117=$dataLocalization[_0x4fb3c9][_0x166a90]||_0x55acdc(0x357);}}VisuMZ['MessageCore'][_0x55acdc(0x5b4)]['call'](this,_0x17a117,_0x2a7087,_0x5067f9,_0x28604d);},Window_StatusBase[_0x53794b(0x275)]['actorSlotName']=function(_0x4da514,_0x1cbdc2){const _0x55fb0d=_0x53794b,_0x197185=_0x4da514[_0x55fb0d(0x44f)]();let _0x579b3d=$dataSystem['equipTypes'][_0x197185[_0x1cbdc2]];if(TextManager[_0x55fb0d(0x4e0)]){const _0x169b6f=String(_0x579b3d)['toLowerCase']()['trim']();if(TextManager[_0x55fb0d(0x4a9)]()&&$dataLocalization[_0x169b6f]){const _0xd3a378=ConfigManager['textLocale']||'English';_0x579b3d=$dataLocalization[_0x169b6f][_0xd3a378]||_0x55fb0d(0x357);}}return _0x579b3d;},Game_Temp['prototype']['setLastPluginCommandInterpreter']=function(_0x292243){const _0xa5ae91=_0x53794b;this[_0xa5ae91(0x54c)]=_0x292243;},Game_Temp[_0x53794b(0x275)][_0x53794b(0x35f)]=function(){return this['_lastPluginCommandInterpreter'];},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x1d8)]=Game_Interpreter['prototype'][_0x53794b(0x5a0)],Game_Interpreter[_0x53794b(0x275)][_0x53794b(0x5a0)]=function(_0x9b1155){const _0x265204=_0x53794b;return $gameTemp[_0x265204(0x206)](this),VisuMZ[_0x265204(0x3f3)][_0x265204(0x1d8)][_0x265204(0x2fd)](this,_0x9b1155);},VisuMZ['MessageCore'][_0x53794b(0x3ef)]=Game_System[_0x53794b(0x275)][_0x53794b(0x2d9)],Game_System[_0x53794b(0x275)]['initialize']=function(){const _0x1ea115=_0x53794b;VisuMZ[_0x1ea115(0x3f3)]['Game_System_initialize']['call'](this),this[_0x1ea115(0x3e4)]();},Game_System['prototype']['initMessageCore']=function(){const _0x1c5b29=_0x53794b,_0x52d7ee=VisuMZ['MessageCore']['Settings'][_0x1c5b29(0x446)],_0x55f5df=VisuMZ[_0x1c5b29(0x3f3)]['Settings'][_0x1c5b29(0x42f)];this[_0x1c5b29(0x2a7)]={'messageRows':_0x52d7ee['MessageRows'],'messageWidth':_0x52d7ee['MessageWidth'],'messageWordWrap':_0x55f5df[_0x1c5b29(0x396)],'helpWordWrap':_0x55f5df[_0x1c5b29(0x428)],'choiceLineHeight':_0x52d7ee['ChoiceWindowLineHeight'],'choiceMinWidth':_0x52d7ee['ChoiceWindowMinWidth']??0x60,'choiceRows':_0x52d7ee['ChoiceWindowMaxRows'],'choiceCols':_0x52d7ee['ChoiceWindowMaxCols'],'choiceTextAlign':_0x52d7ee[_0x1c5b29(0x2f0)],'choiceDistance':0x0},this['_messageOffsetX']===undefined&&(this[_0x1c5b29(0x4f2)]=_0x52d7ee[_0x1c5b29(0x2e8)],this[_0x1c5b29(0x2c7)]=_0x52d7ee[_0x1c5b29(0x4dc)]);},Game_System[_0x53794b(0x275)]['getMessageWindowRows']=function(){const _0xbc9c3d=_0x53794b;if(this[_0xbc9c3d(0x2a7)]===undefined)this['initMessageCore']();if(this[_0xbc9c3d(0x2a7)][_0xbc9c3d(0x554)]===undefined)this['initMessageCore']();return this[_0xbc9c3d(0x2a7)]['messageRows'];},Game_System[_0x53794b(0x275)]['setMessageWindowRows']=function(_0x258ba0){const _0x22cdab=_0x53794b;if(this['_MessageCoreSettings']===undefined)this[_0x22cdab(0x3e4)]();if(this[_0x22cdab(0x2a7)]['messageRows']===undefined)this[_0x22cdab(0x3e4)]();this[_0x22cdab(0x2a7)][_0x22cdab(0x554)]=_0x258ba0||0x1;},Game_System[_0x53794b(0x275)]['getMessageWindowWidth']=function(){const _0x39cedb=_0x53794b;if(this[_0x39cedb(0x2a7)]===undefined)this[_0x39cedb(0x3e4)]();if(this[_0x39cedb(0x2a7)][_0x39cedb(0x34c)]===undefined)this[_0x39cedb(0x3e4)]();return this['_MessageCoreSettings'][_0x39cedb(0x34c)];},Game_System[_0x53794b(0x275)][_0x53794b(0x444)]=function(_0x34fd9c){const _0x3df672=_0x53794b;if(this[_0x3df672(0x2a7)]===undefined)this[_0x3df672(0x3e4)]();if(this[_0x3df672(0x2a7)][_0x3df672(0x34c)]===undefined)this['initMessageCore']();_0x34fd9c=Math[_0x3df672(0x589)](_0x34fd9c);if(_0x34fd9c%0x2!==0x0)_0x34fd9c+=0x1;this[_0x3df672(0x2a7)][_0x3df672(0x34c)]=_0x34fd9c||0x2;},Game_System['prototype'][_0x53794b(0x1fe)]=function(){const _0x22aff2=_0x53794b;if(this[_0x22aff2(0x2a7)]===undefined)this[_0x22aff2(0x3e4)]();if(this['_MessageCoreSettings'][_0x22aff2(0x38c)]===undefined)this[_0x22aff2(0x3e4)]();return this['_MessageCoreSettings'][_0x22aff2(0x38c)];},Game_System['prototype'][_0x53794b(0x4ec)]=function(_0x1dcf5c){const _0x58b63b=_0x53794b;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x58b63b(0x2a7)][_0x58b63b(0x38c)]===undefined)this[_0x58b63b(0x3e4)]();this[_0x58b63b(0x2a7)][_0x58b63b(0x38c)]=_0x1dcf5c;},Game_System['prototype']['getMessageWindowXyOffsets']=function(){const _0x44c829=_0x53794b;if(this[_0x44c829(0x4f2)]===undefined){const _0x56b8ca=VisuMZ[_0x44c829(0x3f3)][_0x44c829(0x3a8)][_0x44c829(0x446)];this[_0x44c829(0x4f2)]=_0x56b8ca[_0x44c829(0x2e8)],this[_0x44c829(0x2c7)]=_0x56b8ca[_0x44c829(0x4dc)];}return{'x':this[_0x44c829(0x4f2)]||0x0,'y':this[_0x44c829(0x2c7)]||0x0};},Game_System[_0x53794b(0x275)][_0x53794b(0x365)]=function(_0x1f0517,_0x3819ef){const _0x12907a=_0x53794b;if(this[_0x12907a(0x2a7)]===undefined)this[_0x12907a(0x3e4)]();this[_0x12907a(0x4f2)]=_0x1f0517,this['_messageOffsetY']=_0x3819ef;},Game_System['prototype'][_0x53794b(0x4ed)]=function(){const _0x27d2cc=_0x53794b;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x27d2cc(0x2a7)][_0x27d2cc(0x56f)]===undefined)this[_0x27d2cc(0x3e4)]();return this[_0x27d2cc(0x2a7)][_0x27d2cc(0x56f)];},Game_System['prototype'][_0x53794b(0x4f1)]=function(_0x51da53){const _0x117715=_0x53794b;if(this['_MessageCoreSettings']===undefined)this[_0x117715(0x3e4)]();if(this[_0x117715(0x2a7)][_0x117715(0x56f)]===undefined)this[_0x117715(0x3e4)]();this[_0x117715(0x2a7)][_0x117715(0x56f)]=_0x51da53;},Game_System['prototype'][_0x53794b(0x31d)]=function(){const _0x3658c3=_0x53794b;if(this[_0x3658c3(0x2a7)]===undefined)this[_0x3658c3(0x3e4)]();if(this['_MessageCoreSettings'][_0x3658c3(0x1eb)]===undefined)this[_0x3658c3(0x3e4)]();return this[_0x3658c3(0x2a7)][_0x3658c3(0x1eb)];},Game_System[_0x53794b(0x275)][_0x53794b(0x51d)]=function(_0x407202){const _0x126753=_0x53794b;if(this[_0x126753(0x2a7)]===undefined)this[_0x126753(0x3e4)]();if(this[_0x126753(0x2a7)][_0x126753(0x1eb)]===undefined)this[_0x126753(0x3e4)]();this[_0x126753(0x2a7)][_0x126753(0x1eb)]=_0x407202||0x1;},Game_System[_0x53794b(0x275)]['getChoiceListMinChoiceWidth']=function(){const _0x2eed8b=_0x53794b;if(this['_MessageCoreSettings']===undefined)this[_0x2eed8b(0x3e4)]();return this[_0x2eed8b(0x2a7)][_0x2eed8b(0x29e)]??0x60;},Game_System[_0x53794b(0x275)][_0x53794b(0x2b1)]=function(_0xdc71a9){const _0xc4da50=_0x53794b;if(this[_0xc4da50(0x2a7)]===undefined)this[_0xc4da50(0x3e4)]();this[_0xc4da50(0x2a7)][_0xc4da50(0x29e)]=_0xdc71a9||0x0;},Game_System[_0x53794b(0x275)]['getChoiceListMaxRows']=function(){const _0x53edb1=_0x53794b;if(this[_0x53edb1(0x2a7)]===undefined)this['initMessageCore']();if(this['_MessageCoreSettings']['choiceRows']===undefined)this[_0x53edb1(0x3e4)]();return this[_0x53edb1(0x2a7)][_0x53edb1(0x2b2)];},Game_System[_0x53794b(0x275)]['setChoiceListMaxRows']=function(_0x2e9886){const _0x46b5af=_0x53794b;if(this[_0x46b5af(0x2a7)]===undefined)this[_0x46b5af(0x3e4)]();if(this[_0x46b5af(0x2a7)][_0x46b5af(0x2b2)]===undefined)this[_0x46b5af(0x3e4)]();this[_0x46b5af(0x2a7)]['choiceRows']=_0x2e9886||0x1;},Game_System[_0x53794b(0x275)][_0x53794b(0x488)]=function(){const _0x4ef625=_0x53794b;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x4ef625(0x2a7)][_0x4ef625(0x273)]===undefined)this[_0x4ef625(0x3e4)]();return this[_0x4ef625(0x2a7)][_0x4ef625(0x273)];},Game_System[_0x53794b(0x275)]['setChoiceListMaxColumns']=function(_0x4582e5){const _0x4225e4=_0x53794b;if(this['_MessageCoreSettings']===undefined)this[_0x4225e4(0x3e4)]();if(this[_0x4225e4(0x2a7)][_0x4225e4(0x273)]===undefined)this['initMessageCore']();this[_0x4225e4(0x2a7)]['choiceCols']=_0x4582e5||0x1;},Game_System['prototype'][_0x53794b(0x3c4)]=function(){const _0x40c70c=_0x53794b;if(this[_0x40c70c(0x2a7)]===undefined)this[_0x40c70c(0x3e4)]();if(this['_MessageCoreSettings']['choiceTextAlign']===undefined)this[_0x40c70c(0x3e4)]();return this['_MessageCoreSettings'][_0x40c70c(0x35a)];},Game_System[_0x53794b(0x275)][_0x53794b(0x2de)]=function(_0x167ff6){const _0x120b5d=_0x53794b;if(this[_0x120b5d(0x2a7)]===undefined)this[_0x120b5d(0x3e4)]();if(this[_0x120b5d(0x2a7)][_0x120b5d(0x35a)]===undefined)this[_0x120b5d(0x3e4)]();this[_0x120b5d(0x2a7)][_0x120b5d(0x35a)]=_0x167ff6['toLowerCase']();},Game_System['prototype']['getChoiceMessageDistance']=function(){const _0x21903f=_0x53794b;if(this[_0x21903f(0x2a7)]===undefined)this[_0x21903f(0x3e4)]();return this[_0x21903f(0x2a7)][_0x21903f(0x3a7)]||0x0;},Game_System[_0x53794b(0x275)][_0x53794b(0x277)]=function(_0x4ec20a){const _0x200ad3=_0x53794b;if(this[_0x200ad3(0x2a7)]===undefined)this[_0x200ad3(0x3e4)]();this[_0x200ad3(0x2a7)][_0x200ad3(0x3a7)]=_0x4ec20a||0x0;},Game_Message['prototype'][_0x53794b(0x1ff)]=function(_0x15dcc5,_0x38ac70){const _0x39b640=_0x53794b;this[_0x39b640(0x4c5)]=_0x15dcc5,this[_0x39b640(0x2b3)]=_0x39b640(0x309),this['_itemChoiceWtypeId']=_0x38ac70,this[_0x39b640(0x4cd)]=0x0;},Game_Message[_0x53794b(0x275)]['itemChoiceWtypeId']=function(){const _0x4cc924=_0x53794b;return this[_0x4cc924(0x4ee)]||0x0;},Game_Message[_0x53794b(0x275)]['setArmorChoice']=function(_0x5ed124,_0x39e6f4,_0x1da1e8){const _0x1fd941=_0x53794b;this['_itemChoiceVariableId']=_0x5ed124,this[_0x1fd941(0x2b3)]='armor',this[_0x1fd941(0x55a)]=_0x39e6f4,this[_0x1fd941(0x4cd)]=_0x1da1e8;},Game_Message[_0x53794b(0x275)][_0x53794b(0x46e)]=function(){const _0x17c37e=_0x53794b;return this[_0x17c37e(0x55a)]||0x0;},Game_Message['prototype']['itemChoiceEtypeId']=function(){return this['_itemChoiceEtypeId']||0x0;},Game_Message['prototype']['setSkillChoice']=function(_0x52df10,_0x299bff,_0x5d619a){const _0x4d4f42=_0x53794b;this['_itemChoiceVariableId']=_0x52df10,this['_itemChoiceItypeId']='skill',this[_0x4d4f42(0x5b5)]=_0x299bff,this['_itemChoiceStypeId']=_0x5d619a;},Game_Message[_0x53794b(0x275)][_0x53794b(0x58e)]=function(){return this['_itemChoiceActorId']||0x0;},Game_Message[_0x53794b(0x275)][_0x53794b(0x33b)]=function(){const _0x18c23b=_0x53794b;return $gameActors[_0x18c23b(0x3e9)](this['itemChoiceActorId']())||$gameParty[_0x18c23b(0x423)]()||null;},Game_Message[_0x53794b(0x275)][_0x53794b(0x3c2)]=function(){return this['_itemChoiceStypeId']||0x0;},VisuMZ[_0x53794b(0x3f3)]['Game_Message_setChoices']=Game_Message[_0x53794b(0x275)]['setChoices'],Game_Message[_0x53794b(0x275)][_0x53794b(0x416)]=function(_0x374661,_0x320fae,_0x23768a){const _0xd49b59=_0x53794b;this[_0xd49b59(0x2cb)]=!![],VisuMZ[_0xd49b59(0x3f3)]['Game_Message_setChoices'][_0xd49b59(0x2fd)](this,_0x374661,_0x320fae,_0x23768a);},Game_Message[_0x53794b(0x275)][_0x53794b(0x5bd)]=function(){const _0x5dc617=_0x53794b;this[_0x5dc617(0x2cb)]=![],this[_0x5dc617(0x1f2)]=[];const _0x21b73b=this[_0x5dc617(0x300)][_0x5dc617(0x361)];this[_0x5dc617(0x2a9)]=_0x21b73b;let _0x348ed1=![];for(let _0x3f9583=0x0;_0x3f9583<_0x21b73b;_0x3f9583++){let _0x1ce266=this[_0x5dc617(0x300)][_0x3f9583];_0x1ce266[_0x5dc617(0x552)](/<SHUFFLE>/gi)&&(_0x348ed1=!![],_0x1ce266=_0x1ce266[_0x5dc617(0x294)](/<SHUFFLE>/gi,'')),_0x1ce266['match'](/<SHUFFLE:[ ](\d+)>/gi)&&(_0x348ed1=!![],this[_0x5dc617(0x2a9)]=Math['min'](Number(RegExp['$1']),this[_0x5dc617(0x2a9)]),_0x1ce266=_0x1ce266[_0x5dc617(0x294)](/<SHUFFLE:[ ](\d+)>/gi,'')),_0x1ce266['match'](/<SHUFFLE: VAR[ ](\d+)>/gi)&&(_0x348ed1=!![],this[_0x5dc617(0x2a9)]=Math['min']($gameVariables['value'](Number(RegExp['$1']))||0x1,this[_0x5dc617(0x2a9)]),_0x1ce266=_0x1ce266['replace'](/<SHUFFLE:[ ]VAR (\d+)>/gi,'')),this[_0x5dc617(0x1f2)]['push'](_0x3f9583),this[_0x5dc617(0x300)][_0x3f9583]=_0x1ce266;}if(_0x348ed1){this[_0x5dc617(0x1f2)]=VisuMZ[_0x5dc617(0x3f3)][_0x5dc617(0x56d)](this[_0x5dc617(0x1f2)]);if(this[_0x5dc617(0x202)]()!==-0x2)this['_choiceCancelType']=-0x1;}},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x56d)]=function(_0xb82f6a){const _0x51e66b=_0x53794b;var _0x38f6e9,_0x2871bf,_0x597a02;for(_0x597a02=_0xb82f6a[_0x51e66b(0x361)]-0x1;_0x597a02>0x0;_0x597a02--){_0x38f6e9=Math[_0x51e66b(0x31e)](Math['random']()*(_0x597a02+0x1)),_0x2871bf=_0xb82f6a[_0x597a02],_0xb82f6a[_0x597a02]=_0xb82f6a[_0x38f6e9],_0xb82f6a[_0x38f6e9]=_0x2871bf;}return _0xb82f6a;},Game_Message['prototype'][_0x53794b(0x4d0)]=function(){const _0x3c2d14=_0x53794b;if(!this['_choiceIndexArray'])this[_0x3c2d14(0x5bd)]();return this[_0x3c2d14(0x1f2)];},Game_Message[_0x53794b(0x275)]['maxShuffleChoices']=function(){const _0x146982=_0x53794b;if(this[_0x146982(0x2a9)]===undefined)this[_0x146982(0x5bd)]();return this[_0x146982(0x2a9)];},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x529)]=Game_Screen[_0x53794b(0x275)]['clearPictures'],Game_Screen[_0x53794b(0x275)][_0x53794b(0x366)]=function(){const _0x32dc82=_0x53794b;VisuMZ[_0x32dc82(0x3f3)]['Game_Screen_clearPictures'][_0x32dc82(0x2fd)](this),this['clearAllPictureTexts']();},Game_Screen[_0x53794b(0x275)][_0x53794b(0x422)]=function(){const _0x11ef11=_0x53794b;this[_0x11ef11(0x347)]=[],this['_pictureTextBuffer']=[],this[_0x11ef11(0x483)]=[];},Game_Screen[_0x53794b(0x275)][_0x53794b(0x437)]=function(_0x4cbb9d){const _0x467809=_0x53794b;if(this[_0x467809(0x347)]===undefined)this['clearAllPictureTexts']();const _0x2be312=this[_0x467809(0x438)](_0x4cbb9d);return this[_0x467809(0x347)][_0x2be312]=this[_0x467809(0x347)][_0x2be312]||{},this[_0x467809(0x347)][_0x2be312];},Game_Screen['prototype'][_0x53794b(0x450)]=function(_0x58a4c3,_0x1be743){const _0x18943e=_0x53794b;return _0x1be743=_0x1be743[_0x18943e(0x3bd)]()[_0x18943e(0x470)](),this['getPictureTextData'](_0x58a4c3)[_0x1be743]||'';},Game_Screen['prototype']['setPictureText']=function(_0xe6c8bf,_0x49c19b,_0x361f1f){const _0x3b17bd=_0x53794b;_0x361f1f=_0x361f1f[_0x3b17bd(0x3bd)]()[_0x3b17bd(0x470)](),this[_0x3b17bd(0x437)](_0xe6c8bf)[_0x361f1f]=_0x49c19b||'',this[_0x3b17bd(0x326)](_0xe6c8bf,!![]);},Game_Screen[_0x53794b(0x275)][_0x53794b(0x4ab)]=function(_0x360259){const _0x10ab45=_0x53794b;if(this['_pictureText']===undefined)this['clearAllPictureTexts']();const _0x51a1f4=this[_0x10ab45(0x438)](_0x360259);this[_0x10ab45(0x347)][_0x51a1f4]=null,this['requestPictureTextRefresh'](_0x360259,!![]);},Game_Screen['prototype']['getPictureTextBuffer']=function(_0x357790){const _0x5a6b91=_0x53794b;if(this[_0x5a6b91(0x347)]===undefined)this[_0x5a6b91(0x422)]();const _0x6b6dea=this[_0x5a6b91(0x438)](_0x357790);return this[_0x5a6b91(0x2c4)][_0x6b6dea]||0x0;},Game_Screen[_0x53794b(0x275)][_0x53794b(0x52b)]=function(_0x226f6d,_0x3f6879){const _0x18640c=_0x53794b;if(this[_0x18640c(0x347)]===undefined)this[_0x18640c(0x422)]();const _0xa4efba=this[_0x18640c(0x438)](_0x226f6d);this['_pictureTextBuffer'][_0xa4efba]=Math[_0x18640c(0x3ed)](0x0,_0x3f6879);},Game_Screen[_0x53794b(0x275)][_0x53794b(0x23b)]=function(_0x5a9c76){const _0x1e76b1=_0x53794b;if(this[_0x1e76b1(0x347)]===undefined)this[_0x1e76b1(0x422)]();const _0x4ef4c4=this[_0x1e76b1(0x438)](_0x5a9c76);this[_0x1e76b1(0x2c4)][_0x4ef4c4]=undefined;},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x265)]=Game_Screen[_0x53794b(0x275)][_0x53794b(0x4bb)],Game_Screen['prototype']['erasePicture']=function(_0x48d63f){const _0x4f44f8=_0x53794b;VisuMZ[_0x4f44f8(0x3f3)][_0x4f44f8(0x265)]['call'](this,_0x48d63f),this[_0x4f44f8(0x4ab)](_0x48d63f),this[_0x4f44f8(0x23b)](_0x48d63f),this[_0x4f44f8(0x326)](_0x48d63f,!![]);},Game_Screen[_0x53794b(0x275)][_0x53794b(0x505)]=function(){const _0xe73cc7=_0x53794b;for(const _0x4cdae6 of this[_0xe73cc7(0x5a8)]){if(_0x4cdae6){let _0x2d88c8=this[_0xe73cc7(0x5a8)][_0xe73cc7(0x595)](_0x4cdae6);this[_0xe73cc7(0x326)](_0x2d88c8);}}},Game_Screen[_0x53794b(0x275)][_0x53794b(0x326)]=function(_0x148bda,_0x3fe08b){const _0x2272f9=_0x53794b;this[_0x2272f9(0x483)]=this[_0x2272f9(0x483)]||[],(this[_0x2272f9(0x45e)](_0x148bda)||_0x3fe08b)&&this[_0x2272f9(0x483)][_0x2272f9(0x547)](_0x148bda);},Game_Screen[_0x53794b(0x275)][_0x53794b(0x2d2)]=function(_0x2e0f29){const _0x4b6650=_0x53794b;return this['_pictureTextRefresh']=this['_pictureTextRefresh']||[],this[_0x4b6650(0x483)]['includes'](_0x2e0f29);},Game_Screen['prototype'][_0x53794b(0x41d)]=function(_0x336d96){const _0x6d1246=_0x53794b;this[_0x6d1246(0x483)]=this[_0x6d1246(0x483)]||[],this['_pictureTextRefresh']['remove'](_0x336d96);},Game_Screen['prototype']['hasPictureText']=function(_0x279995){const _0x18c7b3=_0x53794b,_0x470834=[_0x18c7b3(0x3ee),'up',_0x18c7b3(0x232),'left',_0x18c7b3(0x4b4),_0x18c7b3(0x2e6),'lowerleft',_0x18c7b3(0x23c),'lowerright'];return _0x470834[_0x18c7b3(0x3eb)](_0x33bdf5=>this[_0x18c7b3(0x450)](_0x279995,_0x33bdf5)!=='');},VisuMZ['MessageCore'][_0x53794b(0x3a5)]=Game_Party['prototype'][_0x53794b(0x2d9)],Game_Party[_0x53794b(0x275)][_0x53794b(0x2d9)]=function(){const _0x408dd1=_0x53794b;VisuMZ['MessageCore'][_0x408dd1(0x3a5)]['call'](this),this[_0x408dd1(0x3e4)]();},Game_Party[_0x53794b(0x275)][_0x53794b(0x3e4)]=function(){const _0x4ae918=_0x53794b;this[_0x4ae918(0x27e)]={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party[_0x53794b(0x275)][_0x53794b(0x360)]=function(){const _0x458971=_0x53794b;if(this[_0x458971(0x27e)]===undefined)this[_0x458971(0x3e4)]();return this[_0x458971(0x27e)];},Game_Party[_0x53794b(0x275)]['setLastGainedItemData']=function(_0x8d426f,_0x14d3b3){const _0xc74e03=_0x53794b;if(this[_0xc74e03(0x27e)]===undefined)this[_0xc74e03(0x3e4)]();if(!_0x8d426f)return;if(DataManager['isItem'](_0x8d426f))this['_lastGainedItemData'][_0xc74e03(0x553)]=0x0;else{if(DataManager['isWeapon'](_0x8d426f))this['_lastGainedItemData'][_0xc74e03(0x553)]=0x1;else DataManager['isArmor'](_0x8d426f)&&(this[_0xc74e03(0x27e)][_0xc74e03(0x553)]=0x2);}this[_0xc74e03(0x27e)]['id']=_0x8d426f['id'],this[_0xc74e03(0x27e)][_0xc74e03(0x2ff)]=_0x14d3b3;},VisuMZ['MessageCore'][_0x53794b(0x2cd)]=Game_Party[_0x53794b(0x275)][_0x53794b(0x466)],Game_Party['prototype'][_0x53794b(0x466)]=function(_0x148e29,_0x27bfb4,_0x589f6e){const _0x1117b9=_0x53794b;VisuMZ[_0x1117b9(0x3f3)][_0x1117b9(0x2cd)][_0x1117b9(0x2fd)](this,_0x148e29,_0x27bfb4,_0x589f6e),_0x27bfb4>0x0&&this[_0x1117b9(0x40c)](_0x148e29,_0x27bfb4);},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x579)]=Game_Map['prototype'][_0x53794b(0x2d9)],Game_Map[_0x53794b(0x275)][_0x53794b(0x2d9)]=function(){const _0x17509e=_0x53794b;VisuMZ[_0x17509e(0x3f3)][_0x17509e(0x579)][_0x17509e(0x2fd)](this),this[_0x17509e(0x582)]=[];},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x4ce)]=Game_Map[_0x53794b(0x275)][_0x53794b(0x2d8)],Game_Map[_0x53794b(0x275)][_0x53794b(0x2d8)]=function(){const _0x4eff94=_0x53794b;VisuMZ[_0x4eff94(0x3f3)]['Game_Map_setupEvents']['call'](this),this[_0x4eff94(0x582)]=[];},VisuMZ[_0x53794b(0x3f3)]['Game_Map_updateEvents']=Game_Map['prototype'][_0x53794b(0x4af)],Game_Map['prototype'][_0x53794b(0x4af)]=function(){const _0x86be7e=_0x53794b;VisuMZ[_0x86be7e(0x3f3)][_0x86be7e(0x287)]['call'](this),this[_0x86be7e(0x286)]();},Game_Map['prototype'][_0x53794b(0x225)]=function(_0x14ff8a){const _0x4b0198=_0x53794b;if(!$dataCommonEvents[_0x14ff8a])return;this[_0x4b0198(0x582)]=this['_messageCommonEvents']||[];const _0x317595=this['_interpreter'][_0x4b0198(0x4b5)],_0x3eb97d=new Game_MessageCommonEvent(_0x14ff8a,_0x317595);this[_0x4b0198(0x582)][_0x4b0198(0x547)](_0x3eb97d);},Game_Map[_0x53794b(0x275)][_0x53794b(0x286)]=function(){const _0x352700=_0x53794b;this[_0x352700(0x582)]=this[_0x352700(0x582)]||[];for(const _0x2cac66 of this['_messageCommonEvents']){!_0x2cac66[_0x352700(0x5a3)]?this[_0x352700(0x582)][_0x352700(0x374)](_0x2cac66):_0x2cac66[_0x352700(0x24c)]();}},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x38e)]=Game_Map[_0x53794b(0x275)][_0x53794b(0x331)],Game_Map['prototype'][_0x53794b(0x331)]=function(){const _0x1ead2b=_0x53794b;VisuMZ['MessageCore'][_0x1ead2b(0x38e)][_0x1ead2b(0x2fd)](this),$gameScreen[_0x1ead2b(0x505)]();},Game_Interpreter[_0x53794b(0x375)]=pluginData[_0x53794b(0x23f)],Game_Interpreter[_0x53794b(0x275)][_0x53794b(0x30b)]=function(_0x167e10){const _0x3050b8=_0x53794b;if($gameMessage['isBusy']())return![];return this[_0x3050b8(0x22a)](_0x167e10),this[_0x3050b8(0x1f0)](_0x167e10),this[_0x3050b8(0x42d)](_0x167e10),this[_0x3050b8(0x429)]('message'),!![];},Game_Interpreter[_0x53794b(0x275)][_0x53794b(0x22a)]=function(_0x222f6b){const _0x12ab1e=_0x53794b;$gameMessage[_0x12ab1e(0x343)](_0x222f6b[0x0],_0x222f6b[0x1]),$gameMessage[_0x12ab1e(0x340)](_0x222f6b[0x2]),$gameMessage[_0x12ab1e(0x22f)](_0x222f6b[0x3]),$gameMessage[_0x12ab1e(0x1dd)](_0x222f6b[0x4]);},Game_Interpreter['prototype'][_0x53794b(0x1f0)]=function(_0x39a081){const _0x273a08=_0x53794b;while(this[_0x273a08(0x2ad)]()){this[_0x273a08(0x5b7)]++;if(this[_0x273a08(0x3bc)]()[_0x273a08(0x456)]===0x191){let _0x4fc01d=this[_0x273a08(0x3bc)]()[_0x273a08(0x435)][0x0];_0x4fc01d=VisuMZ[_0x273a08(0x3f3)][_0x273a08(0x3df)](_0x4fc01d),$gameMessage[_0x273a08(0x216)](_0x4fc01d);}if(this[_0x273a08(0x596)]())break;}},Game_Interpreter[_0x53794b(0x275)][_0x53794b(0x2ad)]=function(){const _0x51275e=_0x53794b;return this[_0x51275e(0x223)]()===0x65&&$gameSystem[_0x51275e(0x2b6)]()>0x4?!![]:this['nextEventCode']()===0x191;},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x3df)]=function(_0x5e7e49){const _0x1d27ff=_0x53794b,_0x3a9a84=VisuMZ['MessageCore'][_0x1d27ff(0x3a8)][_0x1d27ff(0x446)];return _0x5e7e49=(_0x3a9a84[_0x1d27ff(0x24b)]||'')+_0x5e7e49+(_0x3a9a84[_0x1d27ff(0x50a)]||''),_0x5e7e49=_0x5e7e49[_0x1d27ff(0x294)](/<(?:NEXT PAGE|NEXTPAGE)>/gi,''),_0x5e7e49=_0x5e7e49[_0x1d27ff(0x294)](/<(?:RNG|RAND|RANDOM)>(.*?)<\/(?:RNG|RAND|RANDOM)>/gi,(_0x10f895,_0x272254)=>this[_0x1d27ff(0x4df)](_0x272254)),_0x5e7e49;},VisuMZ['MessageCore'][_0x53794b(0x4df)]=function(_0x5adf20){const _0x447a55=_0x53794b,_0xe42061=_0x5adf20[_0x447a55(0x36b)]('|')[_0x447a55(0x32e)](_0x32d8f3=>_0x32d8f3[_0x447a55(0x470)]())[_0x447a55(0x374)]('')[_0x447a55(0x374)](null);return _0xe42061[Math[_0x447a55(0x2e7)](_0xe42061['length'])];},Game_Interpreter[_0x53794b(0x275)][_0x53794b(0x596)]=function(){const _0x29cca3=_0x53794b;if(this[_0x29cca3(0x3bc)]()&&this[_0x29cca3(0x3bc)]()[_0x29cca3(0x435)][0x0][_0x29cca3(0x552)](/<(?:NEXT PAGE|NEXTPAGE)>/gi))return!![];return $gameMessage[_0x29cca3(0x562)]['length']>=$gameSystem[_0x29cca3(0x2b6)]()&&this[_0x29cca3(0x223)]()!==0x191;},Game_Interpreter[_0x53794b(0x275)]['prepareShowTextFollowups']=function(_0x33eb0b){const _0x263876=_0x53794b;switch(this['nextEventCode']()){case 0x66:this['_index']++,this[_0x263876(0x51f)](this[_0x263876(0x3bc)]()[_0x263876(0x435)]);break;case 0x67:this[_0x263876(0x5b7)]++,this[_0x263876(0x21f)](this[_0x263876(0x3bc)]()[_0x263876(0x435)]);break;case 0x68:this[_0x263876(0x5b7)]++,this[_0x263876(0x436)](this['currentCommand']()[_0x263876(0x435)]);break;case 0x165:const _0x1053ec=this[_0x263876(0x41e)][this[_0x263876(0x5b7)]+0x1],_0x5d599f=_0x1053ec[_0x263876(0x435)];_0x5d599f[0x0]===Game_Interpreter[_0x263876(0x375)]&&this[_0x263876(0x388)](_0x5d599f);break;}},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x251)]=Game_Interpreter[_0x53794b(0x275)][_0x53794b(0x51f)],Game_Interpreter['prototype']['setupChoices']=function(_0x3d9385){const _0x846574=_0x53794b;_0x3d9385=this['addContinuousShowChoices'](),VisuMZ['MessageCore'][_0x846574(0x251)][_0x846574(0x2fd)](this,_0x3d9385),$gameMessage[_0x846574(0x5bd)]();},Game_Interpreter[_0x53794b(0x275)][_0x53794b(0x1e4)]=function(){const _0x54acd4=_0x53794b,_0x22e1a7=this[_0x54acd4(0x5b7)],_0x16b2ec=[];let _0x276347=0x0;this[_0x54acd4(0x5b7)]++;while(this[_0x54acd4(0x5b7)]<this[_0x54acd4(0x41e)][_0x54acd4(0x361)]){if(this[_0x54acd4(0x3bc)]()[_0x54acd4(0x544)]===this[_0x54acd4(0x56b)]){if(this[_0x54acd4(0x3bc)]()[_0x54acd4(0x456)]===0x194&&this['nextEventCode']()!==0x66)break;else{if(this[_0x54acd4(0x3bc)]()[_0x54acd4(0x456)]===0x66)this['adjustShowChoiceExtension'](_0x276347,this[_0x54acd4(0x3bc)](),_0x22e1a7),this[_0x54acd4(0x5b7)]-=0x2;else this['currentCommand']()[_0x54acd4(0x456)]===0x192&&(this[_0x54acd4(0x3bc)]()['parameters'][0x0]=_0x276347,_0x276347++);}}this['_index']++;}return this[_0x54acd4(0x5b7)]=_0x22e1a7,this['currentCommand']()[_0x54acd4(0x435)];},Game_Interpreter['prototype'][_0x53794b(0x59c)]=function(_0x55851c,_0x76ecb4,_0x23126a){const _0x459c52=_0x53794b;this[_0x459c52(0x204)](_0x55851c,_0x76ecb4,_0x23126a),this[_0x459c52(0x2ec)](_0x55851c,_0x76ecb4,_0x23126a),this[_0x459c52(0x46b)](_0x76ecb4,_0x23126a);},Game_Interpreter[_0x53794b(0x275)]['adjustShowChoiceDefault']=function(_0x16b78f,_0x521430,_0x69351){const _0x93cc18=_0x53794b;if(_0x521430[_0x93cc18(0x435)][0x2]<0x0)return;const _0x5179dd=_0x521430[_0x93cc18(0x435)][0x2]+_0x16b78f;this['_list'][_0x69351][_0x93cc18(0x435)][0x2]=_0x5179dd;},Game_Interpreter[_0x53794b(0x275)][_0x53794b(0x2ec)]=function(_0x313a4b,_0x4c71eb,_0x324a50){const _0x3f0999=_0x53794b;if(_0x4c71eb[_0x3f0999(0x435)][0x1]>=0x0){var _0x25cc64=_0x4c71eb[_0x3f0999(0x435)][0x1]+_0x313a4b;this[_0x3f0999(0x41e)][_0x324a50]['parameters'][0x1]=_0x25cc64;}else _0x4c71eb['parameters'][0x1]===-0x2&&(this['_list'][_0x324a50][_0x3f0999(0x435)][0x1]=_0x4c71eb[_0x3f0999(0x435)][0x1]);},Game_Interpreter[_0x53794b(0x275)][_0x53794b(0x46b)]=function(_0x4c3d5d,_0x21bbce){const _0x5ea6a1=_0x53794b;for(const _0x2a1006 of _0x4c3d5d['parameters'][0x0]){this[_0x5ea6a1(0x41e)][_0x21bbce][_0x5ea6a1(0x435)][0x0]['push'](_0x2a1006);}this[_0x5ea6a1(0x41e)]['splice'](this['_index']-0x1,0x2);},Game_Interpreter[_0x53794b(0x275)][_0x53794b(0x388)]=function(_0xe5edaf){const _0x298c98=_0x53794b,_0x3f129c=_0xe5edaf[0x1];if(_0x3f129c==='SelectWeapon')this['_index']++,this[_0x298c98(0x1ff)](_0xe5edaf);else{if(_0x3f129c===_0x298c98(0x1d7))this[_0x298c98(0x5b7)]++,this['setArmorChoice'](_0xe5edaf);else _0x3f129c===_0x298c98(0x49e)&&Imported['VisuMZ_1_SkillsStatesCore']&&(this[_0x298c98(0x5b7)]++,this[_0x298c98(0x3b0)](_0xe5edaf));}},Game_Interpreter[_0x53794b(0x275)][_0x53794b(0x1ff)]=function(_0x9fb31a){const _0x3a15d7=_0x53794b,_0x248af7=JSON[_0x3a15d7(0x42e)](JSON['stringify'](_0x9fb31a[0x3]));VisuMZ[_0x3a15d7(0x2a3)](_0x248af7,_0x248af7),$gameMessage[_0x3a15d7(0x1ff)](_0x248af7[_0x3a15d7(0x311)]||0x0,_0x248af7[_0x3a15d7(0x39f)]||0x0);},Game_Interpreter['prototype'][_0x53794b(0x2ee)]=function(_0x49200e){const _0x2e27cc=_0x53794b,_0x2217a8=JSON['parse'](JSON[_0x2e27cc(0x28e)](_0x49200e[0x3]));VisuMZ[_0x2e27cc(0x2a3)](_0x2217a8,_0x2217a8),$gameMessage[_0x2e27cc(0x2ee)](_0x2217a8[_0x2e27cc(0x311)]||0x0,_0x2217a8[_0x2e27cc(0x464)]||0x0,_0x2217a8[_0x2e27cc(0x412)]||0x0);},Game_Interpreter[_0x53794b(0x275)][_0x53794b(0x3b0)]=function(_0x39cfae){const _0x3bd861=_0x53794b,_0x14fef7=JSON[_0x3bd861(0x42e)](JSON[_0x3bd861(0x28e)](_0x39cfae[0x3]));VisuMZ[_0x3bd861(0x2a3)](_0x14fef7,_0x14fef7),$gameMessage['setSkillChoice'](_0x14fef7[_0x3bd861(0x311)]||0x0,_0x14fef7[_0x3bd861(0x400)]||0x0,_0x14fef7[_0x3bd861(0x335)]||0x0);};function Game_MessageCommonEvent(){const _0x4b760b=_0x53794b;this[_0x4b760b(0x2d9)](...arguments);}Game_MessageCommonEvent['prototype'][_0x53794b(0x2d9)]=function(_0x26940d,_0x58c28d){const _0x512d2a=_0x53794b;this['_commonEventId']=_0x26940d,this[_0x512d2a(0x4b5)]=_0x58c28d||0x0,this['refresh']();},Game_MessageCommonEvent[_0x53794b(0x275)][_0x53794b(0x2e9)]=function(){const _0x126777=_0x53794b;return $dataCommonEvents[this[_0x126777(0x30d)]];},Game_MessageCommonEvent['prototype']['list']=function(){return this['event']()['list'];},Game_MessageCommonEvent[_0x53794b(0x275)][_0x53794b(0x331)]=function(){const _0x580de7=_0x53794b;this[_0x580de7(0x5a3)]=new Game_Interpreter(),this[_0x580de7(0x5a3)][_0x580de7(0x3c8)](this[_0x580de7(0x254)](),this[_0x580de7(0x4b5)]);},Game_MessageCommonEvent[_0x53794b(0x275)][_0x53794b(0x24c)]=function(){const _0x242770=_0x53794b;this[_0x242770(0x5a3)]&&(this['_interpreter'][_0x242770(0x5a4)]()?this[_0x242770(0x5a3)][_0x242770(0x24c)]():this['clear']());},Game_MessageCommonEvent['prototype'][_0x53794b(0x522)]=function(){const _0x45a2ac=_0x53794b;this[_0x45a2ac(0x5a3)]=null;},Scene_Message[_0x53794b(0x275)]['messageWindowRect']=function(){const _0x249b88=_0x53794b,_0x34dd4a=Math[_0x249b88(0x3dc)](Graphics[_0x249b88(0x28f)],$gameSystem['getMessageWindowWidth']()),_0x5424be=$gameSystem['getMessageWindowRows'](),_0x1585b6=this[_0x249b88(0x246)](_0x5424be,![]),_0x24ec54=(Graphics[_0x249b88(0x2cc)]-_0x34dd4a)/0x2,_0x412999=0x0;return new Rectangle(_0x24ec54,_0x412999,_0x34dd4a,_0x1585b6);},VisuMZ['MessageCore'][_0x53794b(0x592)]=Scene_Message['prototype'][_0x53794b(0x231)],Scene_Message[_0x53794b(0x275)][_0x53794b(0x231)]=function(){const _0x834c57=_0x53794b;VisuMZ[_0x834c57(0x3f3)]['Scene_Message_createChoiceListWindow'][_0x834c57(0x2fd)](this),this[_0x834c57(0x448)]();},Scene_Message[_0x53794b(0x275)][_0x53794b(0x448)]=function(){const _0x4df5f9=_0x53794b,_0x1c8808=this[_0x4df5f9(0x54b)](),_0x45c58d=new Window_Help(_0x1c8808);_0x45c58d[_0x4df5f9(0x1ea)](),this[_0x4df5f9(0x441)][_0x4df5f9(0x5a6)](_0x45c58d),this['_messageWindow'][_0x4df5f9(0x4ba)](_0x45c58d),this['addWindow'](_0x45c58d),this['_choiceListHelpWindow']=_0x45c58d;},Scene_Message[_0x53794b(0x275)][_0x53794b(0x54b)]=function(){const _0x4690d5=_0x53794b,_0xa2a6e4=0x0,_0x279c81=0x0,_0x28ccec=Graphics[_0x4690d5(0x2cc)],_0x2cee44=this[_0x4690d5(0x246)](0x2,![]);return new Rectangle(_0xa2a6e4,_0x279c81,_0x28ccec,_0x2cee44);},Window_Message[_0x53794b(0x275)][_0x53794b(0x4ba)]=function(_0x3853e5){const _0x3dc762=_0x53794b;this[_0x3dc762(0x52c)]=_0x3853e5;},Window_Message['prototype']['updateChoiceListHelpWindowPlacement']=function(){const _0x500b6c=_0x53794b;if(!this[_0x500b6c(0x52c)])return;const _0x19fff4=this[_0x500b6c(0x52c)];_0x19fff4&&(_0x19fff4['y']=this['y']>0x0?0x0:Graphics[_0x500b6c(0x283)]-_0x19fff4['height']);},VisuMZ['MessageCore'][_0x53794b(0x3c5)]=Scene_Options[_0x53794b(0x275)][_0x53794b(0x299)],Scene_Options['prototype'][_0x53794b(0x299)]=function(){const _0x3efc1c=_0x53794b;let _0x3ff495=VisuMZ[_0x3efc1c(0x3f3)][_0x3efc1c(0x3c5)][_0x3efc1c(0x2fd)](this);const _0x2407b8=VisuMZ['MessageCore'][_0x3efc1c(0x3a8)];if(_0x2407b8['TextSpeed']['AdjustRect']){_0x2407b8[_0x3efc1c(0x417)][_0x3efc1c(0x508)]&&TextManager['isVisuMzLocalizationEnabled']()&&_0x3ff495++;if(_0x2407b8[_0x3efc1c(0x27f)][_0x3efc1c(0x508)])_0x3ff495++;}return _0x3ff495;},VisuMZ[_0x53794b(0x3f3)]['Sprite_Picture_updateBitmap']=Sprite_Picture[_0x53794b(0x275)][_0x53794b(0x37b)],Sprite_Picture[_0x53794b(0x275)][_0x53794b(0x37b)]=function(){const _0x1b7553=_0x53794b;VisuMZ[_0x1b7553(0x3f3)][_0x1b7553(0x50b)][_0x1b7553(0x2fd)](this),this[_0x1b7553(0x41f)]();},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x2c9)]=Sprite_Picture[_0x53794b(0x275)][_0x53794b(0x24c)],Sprite_Picture['prototype'][_0x53794b(0x24c)]=function(){const _0x4c4f57=_0x53794b;VisuMZ[_0x4c4f57(0x3f3)]['Sprite_Picture_update'][_0x4c4f57(0x2fd)](this),this['updatePictureText']();},Sprite_Picture['prototype'][_0x53794b(0x3be)]=function(){const _0x39246=_0x53794b;if(!this[_0x39246(0x1df)])return;this['resizePictureText'](),this['anchorPictureText'](),this[_0x39246(0x34d)](),this['attachPictureText']();},Sprite_Picture[_0x53794b(0x275)]['createPictureText']=function(){const _0x12af3d=_0x53794b;if(this[_0x12af3d(0x3c7)])return;if(this[_0x12af3d(0x398)])return;const _0x37cd55=new Rectangle(0x0,0x0,0x0,0x0);this[_0x12af3d(0x3c7)]=new Window_Base(_0x37cd55),this[_0x12af3d(0x3c7)][_0x12af3d(0x1f7)]=0x0,this[_0x12af3d(0x398)]=new Sprite(),this[_0x12af3d(0x555)](this[_0x12af3d(0x398)],0x0),this[_0x12af3d(0x29a)]=0x0,this['_pictureTextHeight']=0x0,this[_0x12af3d(0x263)]={};},Sprite_Picture[_0x53794b(0x275)]['resizePictureText']=function(){const _0x282353=_0x53794b;if(!this[_0x282353(0x3c7)])return;if(this[_0x282353(0x29a)]===this[_0x282353(0x28f)]&&this['_pictureTextHeight']===this[_0x282353(0x245)])return;this[_0x282353(0x29a)]=this[_0x282353(0x28f)],this[_0x282353(0x4e4)]=this[_0x282353(0x245)],this[_0x282353(0x263)]={},this[_0x282353(0x3c7)]['move'](0x0,0x0,this[_0x282353(0x28f)],this['height']);},Sprite_Picture[_0x53794b(0x275)][_0x53794b(0x513)]=function(){const _0x381107=_0x53794b;if(!this[_0x381107(0x398)])return;this['_pictureTextSprite']['anchor']['x']=this[_0x381107(0x1e2)]['x'],this['_pictureTextSprite']['anchor']['y']=this[_0x381107(0x1e2)]['y'];},Sprite_Picture[_0x53794b(0x275)][_0x53794b(0x34d)]=function(){const _0xa38fb8=_0x53794b;if(!this['_pictureTextWindow'])return;if(!this['anyPictureTextChanges']())return;const _0x135fbc=['upperleft','up',_0xa38fb8(0x232),'left',_0xa38fb8(0x4b4),_0xa38fb8(0x2e6),_0xa38fb8(0x3f4),'down',_0xa38fb8(0x25a)];this[_0xa38fb8(0x3c7)]['createContents']();for(const _0x11474a of _0x135fbc){this['drawPictureTextZone'](_0x11474a);}},Sprite_Picture[_0x53794b(0x275)][_0x53794b(0x4c0)]=function(){const _0x39f57c=_0x53794b;if($gameScreen[_0x39f57c(0x2d2)](this[_0x39f57c(0x3bb)]))return!![];const _0xf4095b=[_0x39f57c(0x3ee),'up','upperright',_0x39f57c(0x2c6),'center',_0x39f57c(0x2e6),'lowerleft',_0x39f57c(0x23c),'lowerright'];for(const _0x35b10b of _0xf4095b){const _0x554c72=$gameScreen[_0x39f57c(0x450)](this[_0x39f57c(0x3bb)],_0x35b10b);if(this[_0x39f57c(0x263)][_0x35b10b]===_0x554c72)continue;return!![];}return![];},Sprite_Picture[_0x53794b(0x275)][_0x53794b(0x42c)]=function(_0x8784d2){const _0xf6122a=_0x53794b;$gameScreen[_0xf6122a(0x41d)](this[_0xf6122a(0x3bb)]);const _0x3fc9a6=$gameScreen['getPictureText'](this[_0xf6122a(0x3bb)],_0x8784d2);this['_pictureTextCache'][_0x8784d2]=_0x3fc9a6;const _0x1feefa=this['_pictureTextWindow'][_0xf6122a(0x5b0)](_0x3fc9a6);let _0x5e98d9=$gameScreen[_0xf6122a(0x404)](this[_0xf6122a(0x3bb)]),_0x40ea4d=_0x5e98d9,_0x4d9858=_0x5e98d9;if(['up',_0xf6122a(0x4b4),_0xf6122a(0x23c)]['includes'](_0x8784d2))_0x40ea4d=Math[_0xf6122a(0x31e)]((this['width']-_0x1feefa[_0xf6122a(0x28f)])/0x2);else[_0xf6122a(0x232),_0xf6122a(0x2e6),'lowerright'][_0xf6122a(0x2f3)](_0x8784d2)&&(_0x40ea4d=Math[_0xf6122a(0x31e)](this[_0xf6122a(0x28f)]-_0x1feefa[_0xf6122a(0x28f)]-_0x5e98d9));if([_0xf6122a(0x2c6),'center','right'][_0xf6122a(0x2f3)](_0x8784d2))_0x4d9858=Math[_0xf6122a(0x31e)]((this[_0xf6122a(0x245)]-_0x1feefa[_0xf6122a(0x245)])/0x2);else['lowerleft',_0xf6122a(0x23c),'lowerright'][_0xf6122a(0x2f3)](_0x8784d2)&&(_0x4d9858=Math[_0xf6122a(0x31e)](this[_0xf6122a(0x245)]-_0x1feefa['height']-_0x5e98d9));this[_0xf6122a(0x3c7)][_0xf6122a(0x38b)](_0x3fc9a6,_0x40ea4d,_0x4d9858);},Sprite_Picture[_0x53794b(0x275)][_0x53794b(0x269)]=function(){const _0x2cc496=_0x53794b;if(!this[_0x2cc496(0x3c7)])return;if(!this[_0x2cc496(0x398)])return;this[_0x2cc496(0x398)]['bitmap']=this[_0x2cc496(0x3c7)][_0x2cc496(0x4e7)];},VisuMZ['MessageCore'][_0x53794b(0x3c1)]=Window_Base[_0x53794b(0x275)][_0x53794b(0x2d9)],Window_Base[_0x53794b(0x275)][_0x53794b(0x2d9)]=function(_0xd6e17){const _0x45fba4=_0x53794b;this[_0x45fba4(0x3e4)](_0xd6e17),VisuMZ[_0x45fba4(0x3f3)][_0x45fba4(0x3c1)][_0x45fba4(0x2fd)](this,_0xd6e17);},Window_Base['prototype'][_0x53794b(0x3e4)]=function(_0x2457c4){const _0x69f30d=_0x53794b;this[_0x69f30d(0x289)](),this[_0x69f30d(0x59e)](),this['registerResetRect'](_0x2457c4);},Window_Base[_0x53794b(0x275)][_0x53794b(0x289)]=function(){const _0x4b6d45=_0x53794b;this[_0x4b6d45(0x292)](_0x4b6d45(0x320));},Window_Base[_0x53794b(0x275)]['setTextAlignment']=function(_0x3e9526){const _0x2ec620=_0x53794b;this[_0x2ec620(0x4c6)]=_0x3e9526;},Window_Base[_0x53794b(0x275)][_0x53794b(0x215)]=function(){const _0x478261=_0x53794b;return this[_0x478261(0x4c6)];},VisuMZ['MessageCore'][_0x53794b(0x469)]=Window_Base['prototype']['textSizeEx'],Window_Base[_0x53794b(0x275)][_0x53794b(0x5b0)]=function(_0x4f52f4){const _0x11fa9c=_0x53794b;return this[_0x11fa9c(0x59e)](),VisuMZ['MessageCore']['Window_Base_textSizeEx'][_0x11fa9c(0x2fd)](this,_0x4f52f4);},Window_Base['prototype'][_0x53794b(0x1e5)]=function(_0x1ddb79){const _0x4d7737=_0x53794b;return VisuMZ[_0x4d7737(0x3f3)][_0x4d7737(0x469)][_0x4d7737(0x2fd)](this,_0x1ddb79);},VisuMZ[_0x53794b(0x3f3)]['Window_Base_processAllText']=Window_Base[_0x53794b(0x275)][_0x53794b(0x1d5)],Window_Base[_0x53794b(0x275)][_0x53794b(0x1d5)]=function(_0x10727c){const _0x33d0e0=_0x53794b;VisuMZ[_0x33d0e0(0x3f3)][_0x33d0e0(0x557)][_0x33d0e0(0x2fd)](this,_0x10727c);if(_0x10727c['drawing'])this[_0x33d0e0(0x292)](_0x33d0e0(0x320));},Window_Base[_0x53794b(0x275)]['resetWordWrap']=function(){const _0x4377f7=_0x53794b;this[_0x4377f7(0x37a)](![]);},Window_Base[_0x53794b(0x275)][_0x53794b(0x229)]=function(){const _0x43c980=_0x53794b;return this[_0x43c980(0x244)];},Window_Base[_0x53794b(0x275)]['setWordWrap']=function(_0x34d124){const _0x57a1e8=_0x53794b;return this[_0x57a1e8(0x244)]=_0x34d124,'';},Window_Base[_0x53794b(0x275)]['registerResetRect']=function(_0x6988d5){const _0x40952e=_0x53794b;this[_0x40952e(0x45f)]=JsonEx[_0x40952e(0x200)](_0x6988d5);},Window_Base[_0x53794b(0x275)]['resetFontSettings']=function(){const _0x9da721=_0x53794b;this['contents'][_0x9da721(0x3f9)]=$gameSystem[_0x9da721(0x20c)](),this[_0x9da721(0x4e7)][_0x9da721(0x528)]=$gameSystem['mainFontSize'](),this[_0x9da721(0x4e7)][_0x9da721(0x474)]=![],this[_0x9da721(0x4e7)][_0x9da721(0x2df)]=![],this['_textCasing']=0x0,this[_0x9da721(0x2f6)]=!![],this['resetTextColor']();},Window_Base['prototype'][_0x53794b(0x274)]=function(){const _0x518dbc=_0x53794b;this['changeTextColor'](ColorManager['normalColor']()),this[_0x518dbc(0x1dc)](ColorManager[_0x518dbc(0x48f)]());const _0x149ca7=VisuMZ[_0x518dbc(0x3f3)][_0x518dbc(0x3a8)][_0x518dbc(0x446)];_0x149ca7[_0x518dbc(0x421)]===undefined&&(_0x149ca7[_0x518dbc(0x421)]=0x3),this[_0x518dbc(0x4e7)][_0x518dbc(0x3ad)]=_0x149ca7['DefaultOutlineWidth'],this[_0x518dbc(0x249)](![]);},Window_Base[_0x53794b(0x275)][_0x53794b(0x249)]=function(_0x2a7397){const _0x599e83=_0x53794b;this[_0x599e83(0x545)]=_0x2a7397;},Window_Base[_0x53794b(0x275)][_0x53794b(0x33c)]=function(){const _0x1615ad=_0x53794b;return this[_0x1615ad(0x545)];},Window_Base['prototype']['isAutoColorAffected']=function(){return![];},Window_Base['prototype']['getPreservedFontSettings']=function(){const _0x3735e8=_0x53794b,_0x126a1c=[_0x3735e8(0x3f9),_0x3735e8(0x528),'fontBold',_0x3735e8(0x2df),_0x3735e8(0x40a),_0x3735e8(0x4b2),_0x3735e8(0x3ad),_0x3735e8(0x413)];let _0x508666={};for(const _0x11bc31 of _0x126a1c){_0x508666[_0x11bc31]=this[_0x3735e8(0x4e7)][_0x11bc31];}return _0x508666;},Window_Base['prototype'][_0x53794b(0x322)]=function(_0x475253){const _0x3d55c6=_0x53794b;for(const _0x31d8d7 in _0x475253){this[_0x3d55c6(0x4e7)][_0x31d8d7]=_0x475253[_0x31d8d7];}},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x205)]=Window_Base['prototype']['update'],Window_Base['prototype'][_0x53794b(0x24c)]=function(){const _0x540f20=_0x53794b;VisuMZ[_0x540f20(0x3f3)][_0x540f20(0x205)]['call'](this),this['updateMove']();},Window_Base[_0x53794b(0x275)][_0x53794b(0x581)]=function(){return![];},Window_Base['prototype']['updateMove']=function(){const _0x1731bf=_0x53794b;this[_0x1731bf(0x386)]>0x0&&(this[_0x1731bf(0x581)]()&&(this['x']=this[_0x1731bf(0x495)](this['x'],this[_0x1731bf(0x519)]),this['y']=this[_0x1731bf(0x495)](this['y'],this['_moveTargetY']),this[_0x1731bf(0x28f)]=this[_0x1731bf(0x495)](this[_0x1731bf(0x28f)],this[_0x1731bf(0x21d)]),this[_0x1731bf(0x245)]=this[_0x1731bf(0x495)](this['height'],this[_0x1731bf(0x2ce)]),this[_0x1731bf(0x471)]()),this[_0x1731bf(0x386)]--);},Window_Base[_0x53794b(0x275)][_0x53794b(0x471)]=function(_0x382ec9,_0x2473cc){const _0x4e7e32=_0x53794b;!_0x382ec9&&(this[_0x4e7e32(0x28f)]=Math[_0x4e7e32(0x3dc)](this[_0x4e7e32(0x28f)],Graphics['width']),this[_0x4e7e32(0x245)]=Math[_0x4e7e32(0x3dc)](this['height'],Graphics['height']));if(!_0x2473cc){const _0x314d61=-(Math[_0x4e7e32(0x31e)](Graphics['width']-Graphics[_0x4e7e32(0x2cc)])/0x2),_0x2febe8=_0x314d61+Graphics['width']-this[_0x4e7e32(0x28f)],_0x21014d=-(Math['floor'](Graphics[_0x4e7e32(0x245)]-Graphics[_0x4e7e32(0x283)])/0x2),_0x4d3656=_0x21014d+Graphics['height']-this['height'];this['x']=this['x']['clamp'](_0x314d61,_0x2febe8),this['y']=this['y'][_0x4e7e32(0x22b)](_0x21014d,_0x4d3656);}},Window_Base[_0x53794b(0x275)][_0x53794b(0x495)]=function(_0x6644c1,_0xe58965){const _0x23b598=_0x53794b,_0x2e9f7a=this[_0x23b598(0x386)],_0x17f011=this[_0x23b598(0x355)],_0x2fed7c=this[_0x23b598(0x44a)]((_0x17f011-_0x2e9f7a)/_0x17f011),_0x59d75b=this[_0x23b598(0x44a)]((_0x17f011-_0x2e9f7a+0x1)/_0x17f011),_0x1e942d=(_0x6644c1-_0xe58965*_0x2fed7c)/(0x1-_0x2fed7c);return _0x1e942d+(_0xe58965-_0x1e942d)*_0x59d75b;},Window_Base[_0x53794b(0x275)][_0x53794b(0x44a)]=function(_0x3542cf){const _0x445282=_0x53794b,_0xccc76f=0x2;switch(this[_0x445282(0x510)]){case 0x0:return _0x3542cf;case 0x1:return this[_0x445282(0x280)](_0x3542cf,_0xccc76f);case 0x2:return this[_0x445282(0x50f)](_0x3542cf,_0xccc76f);case 0x3:return this['easeInOut'](_0x3542cf,_0xccc76f);default:return Imported[_0x445282(0x532)]?VisuMZ[_0x445282(0x495)](_0x3542cf,this[_0x445282(0x510)]):_0x3542cf;}},Window_Base['prototype']['moveTo']=function(_0x15e2eb,_0x361a11,_0x5f54b6,_0x10283d,_0x350048,_0x1eb62c){const _0x2e0d44=_0x53794b;this[_0x2e0d44(0x519)]=_0x15e2eb,this[_0x2e0d44(0x3e5)]=_0x361a11,this[_0x2e0d44(0x21d)]=_0x5f54b6||this[_0x2e0d44(0x28f)],this[_0x2e0d44(0x2ce)]=_0x10283d||this[_0x2e0d44(0x245)],this[_0x2e0d44(0x386)]=_0x350048||0x1;if(this[_0x2e0d44(0x386)]<=0x0)this[_0x2e0d44(0x386)]=0x1;this[_0x2e0d44(0x355)]=this['_moveDuration'],this[_0x2e0d44(0x510)]=_0x1eb62c||0x0;if(_0x350048<=0x0)this[_0x2e0d44(0x37d)]();},Window_Base[_0x53794b(0x275)][_0x53794b(0x479)]=function(_0x22fc99,_0x2e140d,_0x9f111c,_0x21439d,_0x3e8e1e,_0x1de6af){const _0x45e1e0=_0x53794b;this[_0x45e1e0(0x519)]=this['x']+_0x22fc99,this[_0x45e1e0(0x3e5)]=this['y']+_0x2e140d,this['_moveTargetWidth']=this['width']+(_0x9f111c||0x0),this[_0x45e1e0(0x2ce)]=this[_0x45e1e0(0x245)]+(_0x21439d||0x0),this['_moveDuration']=_0x3e8e1e||0x1;if(this[_0x45e1e0(0x386)]<=0x0)this[_0x45e1e0(0x386)]=0x1;this[_0x45e1e0(0x355)]=this[_0x45e1e0(0x386)],this['_moveEasingType']=_0x1de6af||0x0;if(_0x3e8e1e<=0x0)this[_0x45e1e0(0x37d)]();},Window_Base['prototype'][_0x53794b(0x3fa)]=function(_0x29d279,_0x597c11){const _0x15beaa=_0x53794b;this[_0x15beaa(0x590)](this[_0x15beaa(0x45f)]['x'],this[_0x15beaa(0x45f)]['y'],this['_resetRect']['width'],this[_0x15beaa(0x45f)][_0x15beaa(0x245)],_0x29d279,_0x597c11);},VisuMZ['MessageCore'][_0x53794b(0x3b9)]=Window_Base[_0x53794b(0x275)][_0x53794b(0x31c)],Window_Base['prototype'][_0x53794b(0x31c)]=function(_0x22ce56){const _0x1f8553=_0x53794b;if(this[_0x1f8553(0x33c)]())return;_0x22ce56=_0x22ce56[_0x1f8553(0x294)](/\,/g,''),this[_0x1f8553(0x4e1)]=this[_0x1f8553(0x4e1)]||[],this[_0x1f8553(0x4e1)][_0x1f8553(0x2f2)](this['contents'][_0x1f8553(0x40a)]),VisuMZ[_0x1f8553(0x3f3)][_0x1f8553(0x3b9)][_0x1f8553(0x2fd)](this,_0x22ce56);},Window_Base[_0x53794b(0x275)][_0x53794b(0x3cc)]=function(_0x4fb153){const _0x3d95d7=_0x53794b;this[_0x3d95d7(0x489)](_0x4fb153);if(this[_0x3d95d7(0x33c)]())return;_0x4fb153['drawing']&&(this[_0x3d95d7(0x4e1)]=this[_0x3d95d7(0x4e1)]||[],this[_0x3d95d7(0x4e7)][_0x3d95d7(0x40a)]=this[_0x3d95d7(0x4e1)][_0x3d95d7(0x4ad)]()||ColorManager[_0x3d95d7(0x51a)]());},Window_Base[_0x53794b(0x275)][_0x53794b(0x44b)]=function(_0x5d86fa){const _0x52e550=_0x53794b;return _0x5d86fa=this[_0x52e550(0x564)](_0x5d86fa),_0x5d86fa=this[_0x52e550(0x247)](_0x5d86fa),_0x5d86fa=this['convertVariableEscapeCharacters'](_0x5d86fa),_0x5d86fa=this[_0x52e550(0x296)](_0x5d86fa),_0x5d86fa=this[_0x52e550(0x501)](_0x5d86fa),_0x5d86fa=this[_0x52e550(0x26c)](_0x5d86fa),_0x5d86fa=this[_0x52e550(0x558)](_0x5d86fa),_0x5d86fa=this[_0x52e550(0x2e3)](_0x5d86fa),_0x5d86fa=this[_0x52e550(0x344)](_0x5d86fa),_0x5d86fa=this[_0x52e550(0x321)](_0x5d86fa),_0x5d86fa=this[_0x52e550(0x3b7)](_0x5d86fa),_0x5d86fa=this[_0x52e550(0x515)](_0x5d86fa),_0x5d86fa=this[_0x52e550(0x58d)](_0x5d86fa),_0x5d86fa=this[_0x52e550(0x256)](_0x5d86fa),_0x5d86fa=this[_0x52e550(0x3dd)](_0x5d86fa),_0x5d86fa=this['convertVariableEscapeCharacters'](_0x5d86fa),_0x5d86fa=this[_0x52e550(0x458)](_0x5d86fa),_0x5d86fa=this[_0x52e550(0x460)](_0x5d86fa),_0x5d86fa;},Window_Base[_0x53794b(0x275)][_0x53794b(0x564)]=function(_0x874877){const _0x3daeb7=_0x53794b;this[_0x3daeb7(0x378)]=![];for(const _0x5abd2b of VisuMZ['MessageCore']['Settings']['TextMacros']){_0x874877&&_0x874877[_0x3daeb7(0x552)](_0x5abd2b[_0x3daeb7(0x308)])&&(this['_textMacroFound']=!![],_0x874877=_0x874877[_0x3daeb7(0x294)](_0x5abd2b[_0x3daeb7(0x308)],_0x5abd2b[_0x3daeb7(0x312)]['bind'](this)));}return _0x874877||'';},Window_Base[_0x53794b(0x275)][_0x53794b(0x247)]=function(_0x284164){const _0x29de2d=_0x53794b;return _0x284164=_0x284164[_0x29de2d(0x294)](/\\/g,'\x1b'),_0x284164=_0x284164['replace'](/\x1b\x1b/g,'\x5c'),_0x284164;},Window_Base['prototype'][_0x53794b(0x21e)]=function(_0x4ccddf){const _0x3e5877=_0x53794b;for(;;){if(_0x4ccddf['match'](/\\V\[(\d+)\]/gi))_0x4ccddf=_0x4ccddf[_0x3e5877(0x294)](/\\V\[(\d+)\]/gi,(_0x561de,_0x35b297)=>this[_0x3e5877(0x247)](String($gameVariables[_0x3e5877(0x2a0)](parseInt(_0x35b297)))));else{if(_0x4ccddf[_0x3e5877(0x552)](/\x1bV\[(\d+)\]/gi))_0x4ccddf=_0x4ccddf[_0x3e5877(0x294)](/\x1bV\[(\d+)\]/gi,(_0x55fc60,_0x50fa41)=>this['convertBackslashCharacters'](String($gameVariables[_0x3e5877(0x2a0)](parseInt(_0x50fa41)))));else break;}}return _0x4ccddf;},Window_Base[_0x53794b(0x275)][_0x53794b(0x296)]=function(_0x4ab595){const _0x4ff7f2=_0x53794b;return Imported['VisuMZ_0_CoreEngine']&&(_0x4ab595=_0x4ab595['replace'](/<Up (?:KEY|BUTTON)>/gi,this['convertButtonAssistText']('up')),_0x4ab595=_0x4ab595['replace'](/<Left (?:KEY|BUTTON)>/gi,this[_0x4ff7f2(0x315)](_0x4ff7f2(0x2c6))),_0x4ab595=_0x4ab595[_0x4ff7f2(0x294)](/<Right (?:KEY|BUTTON)>/gi,this[_0x4ff7f2(0x315)]('right')),_0x4ab595=_0x4ab595[_0x4ff7f2(0x294)](/<Down (?:KEY|BUTTON)>/gi,this['convertButtonAssistText']('down')),_0x4ab595=_0x4ab595[_0x4ff7f2(0x294)](/<Ok (?:KEY|BUTTON)>/gi,this[_0x4ff7f2(0x315)]('ok')),_0x4ab595=_0x4ab595[_0x4ff7f2(0x294)](/<Cancel (?:KEY|BUTTON)>/gi,this[_0x4ff7f2(0x315)](_0x4ff7f2(0x391))),_0x4ab595=_0x4ab595[_0x4ff7f2(0x294)](/<Menu (?:KEY|BUTTON)>/gi,this[_0x4ff7f2(0x315)](_0x4ff7f2(0x599))),_0x4ab595=_0x4ab595[_0x4ff7f2(0x294)](/<Shift (?:KEY|BUTTON)>/gi,this[_0x4ff7f2(0x315)]('shift')),_0x4ab595=_0x4ab595['replace'](/<(?:PAGEUP|PAGE UP) (?:KEY|BUTTON)>/gi,this[_0x4ff7f2(0x315)](_0x4ff7f2(0x531))),_0x4ab595=_0x4ab595[_0x4ff7f2(0x294)](/<(?:PAGEDOWN|PAGEDN|PAGE DOWN) (?:KEY|BUTTON)>/gi,this['convertButtonAssistText'](_0x4ff7f2(0x5a2)))),_0x4ab595;},Window_Base[_0x53794b(0x275)][_0x53794b(0x315)]=function(_0x221e6c){const _0x3c6900=_0x53794b;let _0x289f81=TextManager[_0x3c6900(0x57c)](_0x221e6c)||'';return _0x289f81=this[_0x3c6900(0x247)](_0x289f81),_0x289f81=this[_0x3c6900(0x21e)](_0x289f81),_0x289f81['trim']();},Window_Base[_0x53794b(0x275)]['preConvertEscapeCharacters']=function(_0x201734){const _0x366f01=_0x53794b;return _0x201734=this['switchOutTextForLocalization'](_0x201734),this[_0x366f01(0x367)](),_0x201734;},Window_Base[_0x53794b(0x275)][_0x53794b(0x38a)]=function(_0xc80c84){return _0xc80c84=TextManager['parseLocalizedText'](_0xc80c84),_0xc80c84;},VisuMZ['MessageCore'][_0x53794b(0x24a)]=String[_0x53794b(0x275)][_0x53794b(0x201)],String[_0x53794b(0x275)]['format']=function(){const _0x3901ac=_0x53794b;let _0x515bfb=this;return _0x515bfb=TextManager[_0x3901ac(0x4e0)](_0x515bfb),VisuMZ['MessageCore'][_0x3901ac(0x24a)][_0x3901ac(0x1d6)](_0x515bfb,arguments);},VisuMZ[_0x53794b(0x3f3)]['Bitmap_drawText']=Bitmap[_0x53794b(0x275)][_0x53794b(0x5ba)],Bitmap[_0x53794b(0x275)][_0x53794b(0x5ba)]=function(_0x51f746,_0x25a379,_0x5c20f3,_0x1eb7b6,_0x269b77,_0x27fec2){const _0x21bc6c=_0x53794b;_0x51f746=TextManager['parseLocalizedText'](_0x51f746),VisuMZ[_0x21bc6c(0x3f3)][_0x21bc6c(0x498)]['call'](this,_0x51f746,_0x25a379,_0x5c20f3,_0x1eb7b6,_0x269b77,_0x27fec2);},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x4eb)]=Bitmap[_0x53794b(0x275)][_0x53794b(0x526)],Bitmap[_0x53794b(0x275)]['drawTextTopAligned']=function(_0x1475df,_0x34795a,_0x4208bb,_0x444fbf,_0x5610ed,_0x58dc12){const _0x11052d=_0x53794b;_0x1475df=TextManager[_0x11052d(0x4e0)](_0x1475df),VisuMZ[_0x11052d(0x3f3)][_0x11052d(0x4eb)][_0x11052d(0x2fd)](this,_0x1475df,_0x34795a,_0x4208bb,_0x444fbf,_0x5610ed,_0x58dc12);},Window_Base['prototype'][_0x53794b(0x3dd)]=function(_0x81467){return _0x81467;},Window_Base[_0x53794b(0x275)][_0x53794b(0x26c)]=function(_0x3db96a){const _0x2626a3=_0x53794b;return this[_0x2626a3(0x3ff)]()&&(_0x3db96a=_0x3db96a[_0x2626a3(0x294)](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/gi,''),_0x3db96a=_0x3db96a['replace'](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x3db96a=_0x3db96a[_0x2626a3(0x294)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x3db96a=_0x3db96a['replace'](/<CHOICE WIDTH:[ ](\d+)>/gi,''),_0x3db96a=_0x3db96a[_0x2626a3(0x294)](/<CHOICE INDENT:[ ](\d+)>/gi,''),_0x3db96a=_0x3db96a[_0x2626a3(0x294)](/<(?:BGCOLOR|BG COLOR):[ ](.*?)>/gi,''),_0x3db96a=_0x3db96a['replace'](/<(?:FG|BG)(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/gi,''),_0x3db96a=_0x3db96a['replace'](/<(?:FG|BG)(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/gi,'')),_0x3db96a;},Window_Base['prototype']['isChoiceWindow']=function(){const _0x4f2505=_0x53794b,_0x5a3aa1=[_0x4f2505(0x313),_0x4f2505(0x53b)];return _0x5a3aa1[_0x4f2505(0x2f3)](this[_0x4f2505(0x3de)]['name']);},Window_Base[_0x53794b(0x275)][_0x53794b(0x558)]=function(_0x5d2c48){const _0x2850b9=_0x53794b;return _0x5d2c48=_0x5d2c48[_0x2850b9(0x294)](/<B>/gi,_0x2850b9(0x3cb)),_0x5d2c48=_0x5d2c48[_0x2850b9(0x294)](/<\/B>/gi,_0x2850b9(0x4d4)),_0x5d2c48=_0x5d2c48[_0x2850b9(0x294)](/<I>/gi,_0x2850b9(0x5a1)),_0x5d2c48=_0x5d2c48[_0x2850b9(0x294)](/<\/I>/gi,_0x2850b9(0x1da)),_0x5d2c48;},Window_Base[_0x53794b(0x275)][_0x53794b(0x2e3)]=function(_0x23d8ec){const _0x223c09=_0x53794b;return _0x23d8ec=_0x23d8ec['replace'](/<LEFT>/gi,_0x223c09(0x2b7)),_0x23d8ec=_0x23d8ec[_0x223c09(0x294)](/<\/LEFT>/gi,_0x223c09(0x5b3)),_0x23d8ec=_0x23d8ec[_0x223c09(0x294)](/<CENTER>/gi,'\x1bTEXTALIGNMENT[2]'),_0x23d8ec=_0x23d8ec[_0x223c09(0x294)](/<\/CENTER>/gi,'\x1bTEXTALIGNMENT[0]'),_0x23d8ec=_0x23d8ec[_0x223c09(0x294)](/<RIGHT>/gi,_0x223c09(0x37c)),_0x23d8ec=_0x23d8ec[_0x223c09(0x294)](/<\/RIGHT>/gi,_0x223c09(0x5b3)),_0x23d8ec;},Window_Base[_0x53794b(0x275)][_0x53794b(0x344)]=function(_0x52b0f7){const _0x4af0c6=_0x53794b;return _0x52b0f7=_0x52b0f7[_0x4af0c6(0x294)](/<COLORLOCK>/gi,_0x4af0c6(0x570)),_0x52b0f7=_0x52b0f7[_0x4af0c6(0x294)](/<\/COLORLOCK>/gi,_0x4af0c6(0x4cc)),_0x52b0f7=_0x52b0f7['replace'](/\(\(\(/gi,_0x4af0c6(0x570)),_0x52b0f7=_0x52b0f7[_0x4af0c6(0x294)](/\)\)\)/gi,_0x4af0c6(0x4cc)),_0x52b0f7;},Window_Base[_0x53794b(0x275)][_0x53794b(0x321)]=function(_0x260ffa){const _0x38e485=_0x53794b;return _0x260ffa=_0x260ffa[_0x38e485(0x294)](/<(?:LC|LOWERCASE|LOWER CASE|LOWER)>/gi,_0x38e485(0x25e)),_0x260ffa=_0x260ffa['replace'](/<\/(?:LC|LOWERCASE|LOWER CASE|LOWER)>/gi,'\x1bCASING[0]'),_0x260ffa=_0x260ffa[_0x38e485(0x294)](/<(?:UC|UPPERCASE|UPPER CASE|UPPER)>/gi,_0x38e485(0x512)),_0x260ffa=_0x260ffa[_0x38e485(0x294)](/<\/(?:UC|UPPERCASE|UPPER CASE|UPPER)>/gi,'\x1bCASING[0]'),_0x260ffa=_0x260ffa[_0x38e485(0x294)](/<(?:CAPS|CAPSLOCK|CAPS LOCK|CAP)>/gi,'\x1bCASING[3]'),_0x260ffa=_0x260ffa['replace'](/<\/(?:CAPS|CAPSLOCK|CAPS LOCK|CAP)>/gi,_0x38e485(0x45c)),_0x260ffa=_0x260ffa[_0x38e485(0x294)](/<(?:ALT|ALTERNATE|ALT CASE)>/gi,'\x1bCASING[4]'),_0x260ffa=_0x260ffa['replace'](/<\/(?:ALT|ALTERNATE|ALT CASE)>/gi,_0x38e485(0x45c)),_0x260ffa=_0x260ffa['replace'](/<(?:CHAOS|CHAOSCASE|CHAOS CASE)>/gi,'\x1bCASING[5]'),_0x260ffa=_0x260ffa['replace'](/<\/(?:CHAOS|CHAOSCASE|CHAOS CASE)>/gi,_0x38e485(0x45c)),_0x260ffa;},Window_Base[_0x53794b(0x275)][_0x53794b(0x3b7)]=function(_0x244fbc){const _0x500212=_0x53794b;return _0x244fbc=_0x244fbc[_0x500212(0x294)](/\x1bN\[(\d+)\]/gi,(_0x1b1a53,_0x527459)=>this[_0x500212(0x238)](parseInt(_0x527459))),_0x244fbc=_0x244fbc[_0x500212(0x294)](/\x1bP\[(\d+)\]/gi,(_0x3b414d,_0x1b191a)=>this[_0x500212(0x517)](parseInt(_0x1b191a))),_0x244fbc=_0x244fbc['replace'](/\x1bG/gi,TextManager[_0x500212(0x304)]),_0x244fbc;},Window_Base[_0x53794b(0x275)][_0x53794b(0x515)]=function(_0x5ebfe1){const _0x13f322=_0x53794b;return _0x5ebfe1=_0x5ebfe1[_0x13f322(0x294)](/\<(?:BATTLE|CURRENT BATTLE) TARGET\>/gi,this['battleTargetName']()),_0x5ebfe1=_0x5ebfe1[_0x13f322(0x294)](/\<(?:BATTLE|CURRENT BATTLE) (?:USER|SUBJECT)\>/gi,this[_0x13f322(0x459)]()),_0x5ebfe1=_0x5ebfe1[_0x13f322(0x294)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION)\>/gi,this[_0x13f322(0x1de)](!![])),_0x5ebfe1=_0x5ebfe1[_0x13f322(0x294)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION) NAME\>/gi,this[_0x13f322(0x1de)](![])),_0x5ebfe1;},Window_Base[_0x53794b(0x275)]['battleTargetName']=function(){const _0x197761=_0x53794b;if(!SceneManager[_0x197761(0x52a)]())return'';if(BattleManager[_0x197761(0x5ac)])return BattleManager[_0x197761(0x5ac)][_0x197761(0x23f)]();if(BattleManager[_0x197761(0x310)][0x0])return BattleManager[_0x197761(0x310)][0x0][_0x197761(0x23f)]();return'';},Window_Base[_0x53794b(0x275)][_0x53794b(0x459)]=function(){const _0x13949b=_0x53794b;if(!SceneManager[_0x13949b(0x52a)]())return'';let _0x570e80=null;return _0x570e80=BattleManager['_subject'],!_0x570e80&&BattleManager[_0x13949b(0x266)]()&&(_0x570e80=BattleManager[_0x13949b(0x3e9)]()),_0x570e80?_0x570e80['name']():'';},Window_Base[_0x53794b(0x275)][_0x53794b(0x1de)]=function(_0x18ca27){const _0x2215a3=_0x53794b;if(!SceneManager['isSceneBattle']())return'';let _0x5b5de3=BattleManager[_0x2215a3(0x3e3)]||null;!_0x5b5de3&&BattleManager[_0x2215a3(0x266)]()&&(_0x5b5de3=BattleManager[_0x2215a3(0x27a)]());if(_0x5b5de3&&_0x5b5de3[_0x2215a3(0x55b)]()){let _0x4853c5='';if(_0x18ca27)_0x4853c5+='\x1bI[%1]'[_0x2215a3(0x201)](_0x5b5de3[_0x2215a3(0x55b)]()[_0x2215a3(0x42b)]);return _0x4853c5+=_0x5b5de3['item']()[_0x2215a3(0x23f)],_0x4853c5;}return'';},Window_Base[_0x53794b(0x275)][_0x53794b(0x58d)]=function(_0xa2eb5d){const _0x13412c=_0x53794b;for(const _0xa9e809 of VisuMZ[_0x13412c(0x3f3)][_0x13412c(0x3a8)][_0x13412c(0x26b)]){_0xa2eb5d['match'](_0xa9e809[_0x13412c(0x308)])&&(_0xa2eb5d=_0xa2eb5d[_0x13412c(0x294)](_0xa9e809['textCodeCheck'],_0xa9e809[_0x13412c(0x312)]),_0xa2eb5d=this['convertVariableEscapeCharacters'](_0xa2eb5d));}return _0xa2eb5d;},Window_Base[_0x53794b(0x275)][_0x53794b(0x256)]=function(_0x2818d9){const _0x56a392=_0x53794b;for(const _0x413908 of VisuMZ[_0x56a392(0x3f3)][_0x56a392(0x3a8)]['TextCodeReplace']){_0x2818d9[_0x56a392(0x552)](_0x413908[_0x56a392(0x308)])&&(_0x2818d9=_0x2818d9[_0x56a392(0x294)](_0x413908[_0x56a392(0x308)],_0x413908['textCodeResult']['bind'](this)),_0x2818d9=this[_0x56a392(0x21e)](_0x2818d9));}return _0x2818d9;},Window_Base['prototype']['actorName']=function(_0x3591db){const _0x6f5b23=_0x53794b,_0x131b22=_0x3591db>=0x1?$gameActors[_0x6f5b23(0x3e9)](_0x3591db):null,_0x407385=_0x131b22?_0x131b22[_0x6f5b23(0x23f)]():'',_0x12500f=Number(VisuMZ[_0x6f5b23(0x3f3)][_0x6f5b23(0x3a8)]['AutoColor']['Actors']);return this[_0x6f5b23(0x3f2)]()&&_0x12500f!==0x0?_0x6f5b23(0x55d)[_0x6f5b23(0x201)](_0x12500f,_0x407385):_0x407385;},Window_Base[_0x53794b(0x275)]['partyMemberName']=function(_0x78ce13){const _0x282983=_0x53794b,_0xe7095b=_0x78ce13>=0x1?$gameParty['members']()[_0x78ce13-0x1]:null,_0x472357=_0xe7095b?_0xe7095b[_0x282983(0x23f)]():'',_0x58ed31=Number(VisuMZ[_0x282983(0x3f3)][_0x282983(0x3a8)][_0x282983(0x339)][_0x282983(0x332)]);return this[_0x282983(0x3f2)]()&&_0x58ed31!==0x0?'\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x282983(0x201)](_0x58ed31,_0x472357):_0x472357;},Window_Base[_0x53794b(0x275)][_0x53794b(0x458)]=function(_0x2ab608){const _0x44bdcd=_0x53794b;return this[_0x44bdcd(0x3f2)]()&&(_0x2ab608=this['processStoredAutoColorChanges'](_0x2ab608),_0x2ab608=this['processActorNameAutoColorChanges'](_0x2ab608)),_0x2ab608;},Window_Base[_0x53794b(0x275)][_0x53794b(0x271)]=function(_0x4d3ea9){const _0x41dda4=_0x53794b;for(autoColor of VisuMZ[_0x41dda4(0x3f3)][_0x41dda4(0x34f)]){_0x4d3ea9=_0x4d3ea9['replace'](autoColor[0x0],autoColor[0x1]);}return _0x4d3ea9;},Window_Base[_0x53794b(0x275)][_0x53794b(0x411)]=function(){const _0x5bd625=_0x53794b;this[_0x5bd625(0x4f9)]=[];},Window_Base[_0x53794b(0x275)][_0x53794b(0x367)]=function(){const _0x5328a4=_0x53794b;this['clearActorNameAutoColor']();const _0x47fdd0=VisuMZ['MessageCore'][_0x5328a4(0x3a8)][_0x5328a4(0x339)],_0x4ef5ab=_0x47fdd0[_0x5328a4(0x332)];if(_0x4ef5ab<=0x0)return;for(const _0x3be316 of $gameActors[_0x5328a4(0x561)]){if(!_0x3be316)continue;const _0x3ee7ff=_0x3be316[_0x5328a4(0x23f)]();if(_0x3ee7ff['trim']()[_0x5328a4(0x361)]<=0x0)continue;if(/^\d+$/[_0x5328a4(0x33e)](_0x3ee7ff))continue;if(_0x3ee7ff[_0x5328a4(0x552)](/-----/i))continue;let _0x712ef1=VisuMZ[_0x5328a4(0x3f3)][_0x5328a4(0x408)](_0x3ee7ff);const _0x5124a3=new RegExp('\x5cb'+_0x712ef1+'\x5cb','g'),_0x14a423='\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x5328a4(0x201)](_0x4ef5ab,_0x3ee7ff);this[_0x5328a4(0x4f9)][_0x5328a4(0x547)]([_0x5124a3,_0x14a423]);}},Window_Base[_0x53794b(0x275)][_0x53794b(0x51e)]=function(_0x54280b){const _0x296d98=_0x53794b;this['_autoColorActorNames']===undefined&&this[_0x296d98(0x367)]();for(autoColor of this[_0x296d98(0x4f9)]){_0x54280b=_0x54280b[_0x296d98(0x294)](autoColor[0x0],autoColor[0x1]);}return _0x54280b;},Window_Base[_0x53794b(0x275)][_0x53794b(0x26f)]=function(_0x5a0b88,_0x164995,_0x40f023){const _0x354410=_0x53794b;if(!_0x5a0b88)return'';const _0x37563d=_0x5a0b88[_0x164995];let _0x3e8cb5='';if(_0x37563d&&_0x40f023&&_0x37563d['iconIndex']){const _0x5d17ea=_0x354410(0x518);_0x3e8cb5=_0x5d17ea[_0x354410(0x201)](_0x37563d[_0x354410(0x42b)],_0x37563d[_0x354410(0x23f)]);}else _0x37563d?_0x3e8cb5=_0x37563d[_0x354410(0x23f)]:_0x3e8cb5='';return _0x3e8cb5=TextManager['parseLocalizedText'](_0x3e8cb5),this['isAutoColorAffected']()&&(_0x3e8cb5=this[_0x354410(0x4ac)](_0x3e8cb5,_0x5a0b88)),_0x3e8cb5;},Window_Base[_0x53794b(0x275)]['lastGainedObjectIcon']=function(){const _0x954c82=_0x53794b,_0x4af50b=$gameParty[_0x954c82(0x360)]();if(_0x4af50b['id']<0x0)return'';let _0x56a4d4=null;if(_0x4af50b['type']===0x0)_0x56a4d4=$dataItems[_0x4af50b['id']];if(_0x4af50b[_0x954c82(0x553)]===0x1)_0x56a4d4=$dataWeapons[_0x4af50b['id']];if(_0x4af50b[_0x954c82(0x553)]===0x2)_0x56a4d4=$dataArmors[_0x4af50b['id']];if(!_0x56a4d4)return'';return _0x954c82(0x4a1)[_0x954c82(0x201)](_0x56a4d4[_0x954c82(0x42b)]);},Window_Base[_0x53794b(0x275)]['lastGainedObjectName']=function(_0x238910){const _0x305055=_0x53794b,_0x5336ab=$gameParty['getLastGainedItemData']();if(_0x5336ab['id']<0x0)return'';let _0x2b5bc8=null;if(_0x5336ab[_0x305055(0x553)]===0x0)_0x2b5bc8=$dataItems[_0x5336ab['id']];if(_0x5336ab[_0x305055(0x553)]===0x1)_0x2b5bc8=$dataWeapons[_0x5336ab['id']];if(_0x5336ab['type']===0x2)_0x2b5bc8=$dataArmors[_0x5336ab['id']];if(!_0x2b5bc8)return'';let _0x3b5c86=_0x2b5bc8[_0x305055(0x23f)]||'';return TextManager[_0x305055(0x4a9)]()&&(_0x3b5c86=TextManager['parseLocalizedText'](_0x3b5c86)),_0x238910?'\x1bi[%1]%2'[_0x305055(0x201)](_0x2b5bc8['iconIndex'],_0x3b5c86):_0x3b5c86;},Window_Base[_0x53794b(0x275)][_0x53794b(0x4cb)]=function(){const _0x4fdc42=$gameParty['getLastGainedItemData']();if(_0x4fdc42['id']<=0x0)return'';return _0x4fdc42['quantity'];},Window_Base[_0x53794b(0x275)][_0x53794b(0x4ac)]=function(_0x5424a2,_0x28d706){const _0x3506de=_0x53794b,_0x100238=VisuMZ[_0x3506de(0x3f3)]['Settings'][_0x3506de(0x339)];let _0x18ed74=0x0;if(_0x28d706===$dataActors)_0x18ed74=_0x100238['Actors'];if(_0x28d706===$dataClasses)_0x18ed74=_0x100238['Classes'];if(_0x28d706===$dataSkills)_0x18ed74=_0x100238['Skills'];if(_0x28d706===$dataItems)_0x18ed74=_0x100238[_0x3506de(0x476)];if(_0x28d706===$dataWeapons)_0x18ed74=_0x100238[_0x3506de(0x57f)];if(_0x28d706===$dataArmors)_0x18ed74=_0x100238[_0x3506de(0x261)];if(_0x28d706===$dataEnemies)_0x18ed74=_0x100238[_0x3506de(0x3f0)];if(_0x28d706===$dataStates)_0x18ed74=_0x100238[_0x3506de(0x4fd)];return _0x18ed74>0x0&&(_0x5424a2='\x1bC[%1]%2\x1bPREVCOLOR[0]'['format'](_0x18ed74,_0x5424a2)),_0x5424a2;},Window_Base[_0x53794b(0x275)][_0x53794b(0x460)]=function(_0xd58d40){const _0x7c4da9=_0x53794b;if(_0xd58d40['includes'](_0x7c4da9(0x5b1)))return this[_0x7c4da9(0x37a)](![]),_0xd58d40=_0xd58d40[_0x7c4da9(0x294)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a'),_0xd58d40=_0xd58d40[_0x7c4da9(0x294)](/<(?:WORDWRAP|WORD WRAP)>/gi,''),_0xd58d40=_0xd58d40[_0x7c4da9(0x294)](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,''),_0xd58d40=_0xd58d40[_0x7c4da9(0x294)](/<\/(?:NOWORDWRAP|NO WORD WRAP)>/gi,''),_0xd58d40;_0xd58d40=_0xd58d40[_0x7c4da9(0x294)](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x181689,_0x194e57)=>this['setWordWrap'](!![])),_0xd58d40=_0xd58d40['replace'](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x402560,_0x38da3e)=>this[_0x7c4da9(0x37a)](![])),_0xd58d40=_0xd58d40['replace'](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x4b7d71,_0x62b144)=>this[_0x7c4da9(0x37a)](![]));if(_0xd58d40[_0x7c4da9(0x552)](Window_Message[_0x7c4da9(0x46a)]))this['setWordWrap'](![]);else _0xd58d40[_0x7c4da9(0x552)](Window_Message['_autoPosRegExp'])&&this['setWordWrap'](![]);if(!this['isWordWrapEnabled']())return _0xd58d40=_0xd58d40['replace'](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a'),_0xd58d40;if(_0xd58d40[_0x7c4da9(0x361)]<=0x0)return _0xd58d40;return _0xd58d40[_0x7c4da9(0x552)](/[\u3040-\u30FF\u4E00-\u9FFF]/g)&&(_0xd58d40=VisuMZ[_0x7c4da9(0x3f3)]['SplitJpCnCharacters'](_0xd58d40)['join']('')),VisuMZ[_0x7c4da9(0x3f3)][_0x7c4da9(0x3a8)]['WordWrap'][_0x7c4da9(0x3fd)]?(_0xd58d40=_0xd58d40[_0x7c4da9(0x294)](/[\n\r]+/g,'\x20'),_0xd58d40=_0xd58d40[_0x7c4da9(0x294)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a')):(_0xd58d40=_0xd58d40[_0x7c4da9(0x294)](/[\n\r]+/g,''),_0xd58d40=_0xd58d40[_0x7c4da9(0x294)](/<(?:BR|LINEBREAK)>/gi,'\x0a')),_0xd58d40=this[_0x7c4da9(0x49d)](_0xd58d40),_0xd58d40=_0xd58d40['split']('\x20')['join']('\x1bWrapBreak[0]'),_0xd58d40=_0xd58d40[_0x7c4da9(0x294)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0xd58d40=_0xd58d40[_0x7c4da9(0x294)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0xd58d40;},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x53a)]=function(_0x169e88){const _0x240563=_0x53794b;let _0x244df3=[],_0x327518='';while(_0x169e88['length']>0x0){const _0xd28034=_0x169e88['charAt'](0x0);_0x169e88=_0x169e88[_0x240563(0x220)](0x1),_0xd28034[_0x240563(0x552)](/[\u3040-\u30FF\u4E00-\u9FFF]/g)?(_0x327518[_0x240563(0x361)]>0x0&&(_0x244df3['push'](_0x327518),_0x327518=''),_0x244df3[_0x240563(0x547)](_0xd28034+_0x240563(0x337))):_0x327518+=_0xd28034;}return _0x327518['length']>0x0&&(_0x244df3[_0x240563(0x547)](_0x327518),_0x327518=''),_0x244df3;},Window_Base[_0x53794b(0x275)]['addWrapBreakAfterPunctuation']=function(_0x1ab459){return _0x1ab459;},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x4db)]=Window_Base[_0x53794b(0x275)][_0x53794b(0x394)],Window_Base[_0x53794b(0x275)][_0x53794b(0x394)]=function(_0x328441){const _0x48521b=_0x53794b;VisuMZ[_0x48521b(0x3f3)][_0x48521b(0x4db)]['call'](this,_0x328441),this[_0x48521b(0x3a1)](_0x328441);},Window_Base[_0x53794b(0x275)][_0x53794b(0x36e)]=function(_0x1ca381){const _0x15b3a7=_0x53794b;let _0x3a0f23=_0x1ca381['text'][_0x1ca381[_0x15b3a7(0x371)]++];if(_0x3a0f23[_0x15b3a7(0x45b)](0x0)<0x20)this[_0x15b3a7(0x2da)](_0x1ca381),this[_0x15b3a7(0x443)](_0x1ca381,_0x3a0f23);else{if(this[_0x15b3a7(0x525)]===0x1)_0x3a0f23=_0x3a0f23[_0x15b3a7(0x3bd)]();if(this[_0x15b3a7(0x525)]===0x2){if(this[_0x15b3a7(0x2f6)])_0x3a0f23=_0x3a0f23[_0x15b3a7(0x217)]();this[_0x15b3a7(0x2f6)]=/\s/['test'](_0x3a0f23);}if(this[_0x15b3a7(0x525)]===0x3)_0x3a0f23=_0x3a0f23[_0x15b3a7(0x217)]();this[_0x15b3a7(0x525)]===0x4&&(_0x3a0f23=this[_0x15b3a7(0x23d)]?_0x3a0f23[_0x15b3a7(0x217)]():_0x3a0f23['toLowerCase'](),this['_lastAltCase']=!this['_lastAltCase']),this[_0x15b3a7(0x525)]===0x5&&(_0x3a0f23=Math[_0x15b3a7(0x5b8)]()<0.5?_0x3a0f23['toUpperCase']():_0x3a0f23[_0x15b3a7(0x3bd)]()),_0x1ca381[_0x15b3a7(0x583)]+=_0x3a0f23;}},VisuMZ['MessageCore']['Window_Base_processControlCharacter']=Window_Base[_0x53794b(0x275)][_0x53794b(0x443)],Window_Base['prototype'][_0x53794b(0x443)]=function(_0x1a5a40,_0x3c255a){const _0x2c6883=_0x53794b;VisuMZ[_0x2c6883(0x3f3)][_0x2c6883(0x2a5)][_0x2c6883(0x2fd)](this,_0x1a5a40,_0x3c255a);if(_0x3c255a===_0x2c6883(0x585))this['processWrapBreak'](_0x1a5a40);else _0x3c255a===_0x2c6883(0x337)&&this[_0x2c6883(0x57b)](_0x1a5a40,!![]);},Window_Base[_0x53794b(0x275)][_0x53794b(0x290)]=function(_0x2df6cc){const _0x5a95d9=_0x53794b;var _0x43045e=/^\<(.*?)\>/['exec'](_0x2df6cc[_0x5a95d9(0x3d4)][_0x5a95d9(0x220)](_0x2df6cc[_0x5a95d9(0x371)]));return _0x43045e?(_0x2df6cc[_0x5a95d9(0x371)]+=_0x43045e[0x0][_0x5a95d9(0x361)],String(_0x43045e[0x0][_0x5a95d9(0x220)](0x1,_0x43045e[0x0]['length']-0x1))):'';},VisuMZ[_0x53794b(0x3f3)]['Window_Base_processEscapeCharacter']=Window_Base[_0x53794b(0x275)]['processEscapeCharacter'],Window_Base['prototype'][_0x53794b(0x381)]=function(_0x3831fe,_0xf91fc2){const _0xb4cd7d=_0x53794b;switch(_0x3831fe){case'C':_0xf91fc2[_0xb4cd7d(0x534)]?VisuMZ[_0xb4cd7d(0x3f3)][_0xb4cd7d(0x28a)][_0xb4cd7d(0x2fd)](this,_0x3831fe,_0xf91fc2):this[_0xb4cd7d(0x489)](_0xf91fc2);break;case'I':case'{':case'}':VisuMZ[_0xb4cd7d(0x3f3)][_0xb4cd7d(0x28a)][_0xb4cd7d(0x2fd)](this,_0x3831fe,_0xf91fc2);break;case'FS':this[_0xb4cd7d(0x55e)](_0xf91fc2);break;case'PX':this['processPxTextCode'](_0xf91fc2);break;case'PY':this['processPyTextCode'](_0xf91fc2);break;case _0xb4cd7d(0x36f):this[_0xb4cd7d(0x209)](this[_0xb4cd7d(0x489)](_0xf91fc2));break;case _0xb4cd7d(0x276):this[_0xb4cd7d(0x41a)](_0xf91fc2);break;case _0xb4cd7d(0x477):this[_0xb4cd7d(0x53f)](_0xf91fc2);break;case _0xb4cd7d(0x1fc):this[_0xb4cd7d(0x565)](_0xf91fc2);break;case _0xb4cd7d(0x32c):this[_0xb4cd7d(0x569)](_0xf91fc2);break;case _0xb4cd7d(0x43c):this[_0xb4cd7d(0x338)](this[_0xb4cd7d(0x489)](_0xf91fc2));break;case _0xb4cd7d(0x40b):this[_0xb4cd7d(0x334)](_0xf91fc2);break;case'PREVCOLOR':this[_0xb4cd7d(0x3cc)](_0xf91fc2);break;case'TEXTALIGNMENT':this[_0xb4cd7d(0x2ac)](_0xf91fc2);break;case'WAIT':this[_0xb4cd7d(0x26e)](_0xf91fc2);break;case _0xb4cd7d(0x364):this[_0xb4cd7d(0x57b)](_0xf91fc2);break;case'WRAPJPBREAK':this[_0xb4cd7d(0x57b)](_0xf91fc2,!![]);break;default:this[_0xb4cd7d(0x236)](_0x3831fe,_0xf91fc2);}},Window_Base[_0x53794b(0x275)][_0x53794b(0x236)]=function(_0x24afd5,_0x35fdb5){const _0x585b77=_0x53794b;for(const _0x59fda3 of VisuMZ[_0x585b77(0x3f3)][_0x585b77(0x3a8)][_0x585b77(0x26b)]){if(_0x59fda3['Match']===_0x24afd5){if(_0x59fda3['Type']==='')this[_0x585b77(0x489)](_0x35fdb5);_0x59fda3[_0x585b77(0x3f6)][_0x585b77(0x2fd)](this,_0x35fdb5);if(this[_0x585b77(0x3de)]===Window_Message){const _0x16f7c0=_0x59fda3['CommonEvent']||0x0;if(_0x16f7c0>0x0)this[_0x585b77(0x2ba)](_0x16f7c0);}}}},Window_Base['prototype'][_0x53794b(0x1f4)]=function(){const _0x230de7=_0x53794b;this['contents'][_0x230de7(0x528)]+=VisuMZ[_0x230de7(0x3f3)][_0x230de7(0x3a8)]['General'][_0x230de7(0x3e7)],this[_0x230de7(0x4e7)][_0x230de7(0x528)]=Math[_0x230de7(0x3dc)](this['contents'][_0x230de7(0x528)],VisuMZ['MessageCore'][_0x230de7(0x3a8)][_0x230de7(0x446)][_0x230de7(0x455)]);},Window_Base[_0x53794b(0x275)]['makeFontSmaller']=function(){const _0xb5a4ee=_0x53794b;this[_0xb5a4ee(0x4e7)]['fontSize']-=VisuMZ['MessageCore'][_0xb5a4ee(0x3a8)][_0xb5a4ee(0x446)]['FontChangeValue'],this[_0xb5a4ee(0x4e7)][_0xb5a4ee(0x528)]=Math['max'](this[_0xb5a4ee(0x4e7)][_0xb5a4ee(0x528)],VisuMZ[_0xb5a4ee(0x3f3)][_0xb5a4ee(0x3a8)][_0xb5a4ee(0x446)]['FontSmallerCap']);},Window_Base[_0x53794b(0x275)][_0x53794b(0x55e)]=function(_0xa9ff69){const _0x4f7f6a=_0x53794b,_0x164cf2=this[_0x4f7f6a(0x489)](_0xa9ff69);this['contents'][_0x4f7f6a(0x528)]=_0x164cf2['clamp'](VisuMZ[_0x4f7f6a(0x3f3)]['Settings'][_0x4f7f6a(0x446)][_0x4f7f6a(0x1e9)],VisuMZ[_0x4f7f6a(0x3f3)][_0x4f7f6a(0x3a8)][_0x4f7f6a(0x446)][_0x4f7f6a(0x455)]);},Window_Base['prototype'][_0x53794b(0x224)]=function(_0x2ddb4a){const _0x5ebb66=_0x53794b;let _0x5bdfd1=this[_0x5ebb66(0x4e7)][_0x5ebb66(0x528)];const _0x2a75cb=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){const _0x5b4315=_0x2a75cb[_0x5ebb66(0x4fa)](_0x2ddb4a);if(!_0x5b4315)break;const _0x4f288d=String(_0x5b4315[0x1])['toUpperCase']();if(_0x4f288d==='{')this[_0x5ebb66(0x1f4)]();else{if(_0x4f288d==='}')this['makeFontSmaller']();else _0x4f288d==='FS'&&(this['contents'][_0x5ebb66(0x528)]=parseInt(_0x5b4315[0x3])['clamp'](VisuMZ['MessageCore']['Settings']['General']['FontSmallerCap'],VisuMZ['MessageCore']['Settings'][_0x5ebb66(0x446)][_0x5ebb66(0x455)]));}this[_0x5ebb66(0x4e7)][_0x5ebb66(0x528)]>_0x5bdfd1&&(_0x5bdfd1=this['contents']['fontSize']);}return _0x5bdfd1;},Window_Base[_0x53794b(0x275)][_0x53794b(0x207)]=function(_0x169bcb){const _0x5010c6=_0x53794b;_0x169bcb['x']=this[_0x5010c6(0x489)](_0x169bcb),VisuMZ[_0x5010c6(0x3f3)][_0x5010c6(0x3a8)][_0x5010c6(0x446)][_0x5010c6(0x20e)]&&(_0x169bcb['x']+=_0x169bcb[_0x5010c6(0x5ad)]);},Window_Base[_0x53794b(0x275)][_0x53794b(0x307)]=function(_0x34d3ab){const _0x1ab6e4=_0x53794b;_0x34d3ab['y']=this[_0x1ab6e4(0x489)](_0x34d3ab),VisuMZ[_0x1ab6e4(0x3f3)]['Settings']['General'][_0x1ab6e4(0x20e)]&&(_0x34d3ab['y']+=_0x34d3ab[_0x1ab6e4(0x353)]);},Window_Base[_0x53794b(0x275)][_0x53794b(0x209)]=function(_0x13f623){const _0x179dda=_0x53794b;this[_0x179dda(0x4e7)]['fontBold']=!!_0x13f623;},Window_Base[_0x53794b(0x275)][_0x53794b(0x338)]=function(_0x46113f){const _0x3e1830=_0x53794b;this[_0x3e1830(0x4e7)][_0x3e1830(0x2df)]=!!_0x46113f;},Window_Base['prototype'][_0x53794b(0x2ac)]=function(_0x15ecfb){const _0x57ade4=_0x53794b,_0x5e6259=this[_0x57ade4(0x489)](_0x15ecfb);if(!_0x15ecfb[_0x57ade4(0x534)])return;switch(_0x5e6259){case 0x0:this['setTextAlignment'](_0x57ade4(0x320));return;case 0x1:this[_0x57ade4(0x292)](_0x57ade4(0x2c6));break;case 0x2:this[_0x57ade4(0x292)](_0x57ade4(0x4b4));break;case 0x3:this[_0x57ade4(0x292)](_0x57ade4(0x2e6));break;}this[_0x57ade4(0x3a1)](_0x15ecfb);},Window_Base['prototype'][_0x53794b(0x3a1)]=function(_0x5050b9){const _0x37fd06=_0x53794b;if(!_0x5050b9[_0x37fd06(0x534)])return;if(_0x5050b9['rtl'])return;if(this[_0x37fd06(0x215)]()===_0x37fd06(0x320))return;let _0x437d3c=_0x5050b9[_0x37fd06(0x3d4)]['indexOf'](_0x37fd06(0x5b1),_0x5050b9[_0x37fd06(0x371)]+0x1),_0x1c3603=_0x5050b9['text'][_0x37fd06(0x595)]('\x0a',_0x5050b9['index']+0x1);if(_0x437d3c<0x0)_0x437d3c=_0x5050b9[_0x37fd06(0x3d4)]['length']+0x1;if(_0x1c3603>0x0)_0x437d3c=Math[_0x37fd06(0x3dc)](_0x437d3c,_0x1c3603);const _0x403e06=_0x5050b9[_0x37fd06(0x3d4)][_0x37fd06(0x47d)](_0x5050b9[_0x37fd06(0x371)],_0x437d3c),_0x4890ea=this[_0x37fd06(0x4d3)](_0x403e06)[_0x37fd06(0x28f)],_0x14a2f2=_0x5050b9[_0x37fd06(0x28f)]||this[_0x37fd06(0x1f9)]-0x8,_0x36a3c2=this[_0x37fd06(0x3de)]===Window_Message&&$gameMessage['faceName']()!=='';switch(this[_0x37fd06(0x215)]()){case _0x37fd06(0x2c6):_0x5050b9['x']=_0x5050b9['startX'];break;case'center':_0x5050b9['x']=_0x5050b9['startX'],_0x5050b9['x']+=Math['floor']((_0x14a2f2-_0x4890ea)/0x2);_0x36a3c2&&(_0x5050b9['x']-=_0x5050b9[_0x37fd06(0x5ad)]/0x2);break;case _0x37fd06(0x2e6):_0x5050b9['x']=_0x14a2f2-_0x4890ea+_0x5050b9[_0x37fd06(0x5ad)];_0x36a3c2&&(_0x5050b9['x']-=_0x5050b9[_0x37fd06(0x5ad)]);break;}},Window_Base[_0x53794b(0x275)]['textSizeExTextAlignment']=function(_0x1e204f){const _0x452e13=_0x53794b;_0x1e204f=_0x1e204f['replace'](/\x1b!/g,''),_0x1e204f=_0x1e204f[_0x452e13(0x294)](/\x1b\|/g,''),_0x1e204f=_0x1e204f[_0x452e13(0x294)](/\x1b\./g,'');const _0x4fcbfe=this[_0x452e13(0x379)](_0x1e204f,0x0,0x0,0x0),_0x3bbe08=this[_0x452e13(0x574)]();return _0x4fcbfe[_0x452e13(0x534)]=![],this[_0x452e13(0x1d5)](_0x4fcbfe),this[_0x452e13(0x322)](_0x3bbe08),{'width':_0x4fcbfe[_0x452e13(0x35d)],'height':_0x4fcbfe['outputHeight']};},Window_Base[_0x53794b(0x2c8)]=VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x3a8)]['WordWrap'][_0x53794b(0x492)]||0x0,Window_Base[_0x53794b(0x275)][_0x53794b(0x57b)]=function(_0x1e4317,_0x4f9f09){const _0x187d64=_0x53794b,_0x16aa16=(_0x1e4317[_0x187d64(0x26a)]?-0x1:0x1)*this[_0x187d64(0x29b)]('\x20');if(!_0x4f9f09)_0x1e4317['x']+=_0x16aa16;if(this[_0x187d64(0x489)](_0x1e4317)>0x0&&!_0x4f9f09)_0x1e4317['x']+=_0x16aa16;if(_0x1e4317[_0x187d64(0x26a)])return;let _0x5a3c2d;_0x4f9f09?_0x5a3c2d=_0x1e4317[_0x187d64(0x3d4)][_0x187d64(0x595)](_0x187d64(0x337),_0x1e4317['index']+0x1):_0x5a3c2d=_0x1e4317['text'][_0x187d64(0x595)](_0x187d64(0x585),_0x1e4317[_0x187d64(0x371)]+0x1);let _0x402544=_0x1e4317['text'][_0x187d64(0x595)]('\x0a',_0x1e4317[_0x187d64(0x371)]+0x1);if(_0x5a3c2d<0x0)_0x5a3c2d=_0x1e4317[_0x187d64(0x3d4)]['length']+0x1;if(_0x402544>0x0)_0x5a3c2d=Math[_0x187d64(0x3dc)](_0x5a3c2d,_0x402544);const _0x546cde=_0x1e4317[_0x187d64(0x3d4)][_0x187d64(0x47d)](_0x1e4317[_0x187d64(0x371)],_0x5a3c2d),_0x3ecaf7=this['textSizeExWordWrap'](_0x546cde)['width'];let _0x3ca0ed=_0x1e4317[_0x187d64(0x28f)]||this[_0x187d64(0x1f9)];_0x3ca0ed-=Window_Base['WORD_WRAP_PADDING'];if(this['constructor']===Window_Message){const _0x3bb874=$gameMessage[_0x187d64(0x1fa)]()===''?0x0:ImageManager[_0x187d64(0x410)]+0x14;_0x3ca0ed-=_0x3bb874,VisuMZ[_0x187d64(0x3f3)]['Settings'][_0x187d64(0x42f)]['TightWrap']&&(_0x3ca0ed-=_0x3bb874);}let _0x451177=![];_0x1e4317['x']+_0x3ecaf7>_0x1e4317[_0x187d64(0x5ad)]+_0x3ca0ed&&(_0x451177=!![]),_0x3ecaf7===0x0&&(_0x451177=![]),_0x451177&&(_0x1e4317['text']=_0x1e4317[_0x187d64(0x3d4)]['slice'](0x0,_0x1e4317[_0x187d64(0x371)])+'\x0a'+_0x1e4317[_0x187d64(0x3d4)][_0x187d64(0x222)](_0x1e4317[_0x187d64(0x371)]));},Window_Base[_0x53794b(0x275)]['textSizeExWordWrap']=function(_0x27e8af){const _0x790092=_0x53794b,_0x537180=this[_0x790092(0x379)](_0x27e8af,0x0,0x0,0x0),_0x230402=this[_0x790092(0x574)]();return _0x537180[_0x790092(0x534)]=![],this['setWordWrap'](![]),this[_0x790092(0x1d5)](_0x537180),this[_0x790092(0x37a)](!![]),this[_0x790092(0x322)](_0x230402),{'width':_0x537180[_0x790092(0x35d)],'height':_0x537180[_0x790092(0x409)]};},Window_Base[_0x53794b(0x275)][_0x53794b(0x569)]=function(_0x401d0f){const _0x4f3d24=_0x53794b;return this[_0x4f3d24(0x489)](_0x401d0f);},Window_Base[_0x53794b(0x275)][_0x53794b(0x334)]=function(_0x2829fa){const _0x574c8d=_0x53794b,_0x3a0e39=this[_0x574c8d(0x290)](_0x2829fa)['split'](',');if(!_0x2829fa[_0x574c8d(0x534)])return;const _0x3df4e0=_0x3a0e39[0x0][_0x574c8d(0x470)](),_0x49e9e6=_0x3a0e39[0x1]||0x0,_0x833872=_0x3a0e39[0x2]||0x0,_0x1fc99e=ImageManager['loadPicture'](_0x3df4e0),_0x3946a9=this[_0x574c8d(0x4e7)][_0x574c8d(0x413)];_0x1fc99e[_0x574c8d(0x3b5)](this[_0x574c8d(0x54f)][_0x574c8d(0x3d8)](this,_0x1fc99e,_0x2829fa['x'],_0x2829fa['y'],_0x49e9e6,_0x833872,_0x3946a9));},Window_Base['prototype'][_0x53794b(0x54f)]=function(_0x3b0066,_0xcb252b,_0xab69bb,_0x2c9b23,_0x530c21,_0x2c576d){const _0x10b148=_0x53794b;_0x2c9b23=_0x2c9b23||_0x3b0066[_0x10b148(0x28f)],_0x530c21=_0x530c21||_0x3b0066[_0x10b148(0x245)],this[_0x10b148(0x5bb)][_0x10b148(0x413)]=_0x2c576d,this['contentsBack'][_0x10b148(0x243)](_0x3b0066,0x0,0x0,_0x3b0066[_0x10b148(0x28f)],_0x3b0066['height'],_0xcb252b,_0xab69bb,_0x2c9b23,_0x530c21),this[_0x10b148(0x5bb)][_0x10b148(0x413)]=0xff;},Window_Base[_0x53794b(0x275)][_0x53794b(0x53f)]=function(_0x550d68){const _0x5adee1=_0x53794b,_0x22b0ff=this['obtainEscapeString'](_0x550d68)[_0x5adee1(0x36b)](',');if(!_0x550d68[_0x5adee1(0x534)])return;const _0x21e10c=_0x22b0ff[0x0]['trim'](),_0x51c278=ImageManager['loadPicture'](_0x21e10c),_0x4a816c=JsonEx['makeDeepCopy'](_0x550d68),_0x3c9105=this[_0x5adee1(0x4e7)][_0x5adee1(0x413)];_0x51c278[_0x5adee1(0x3b5)](this[_0x5adee1(0x3cd)][_0x5adee1(0x3d8)](this,_0x51c278,_0x4a816c,_0x3c9105));},Window_Base['prototype']['drawBackCenteredPicture']=function(_0x38e60d,_0x4e0490,_0x1d1974){const _0x5256df=_0x53794b,_0x24fec1=_0x4e0490[_0x5256df(0x28f)]||this[_0x5256df(0x1f9)],_0x21e3fc=this[_0x5256df(0x5b7)]!==undefined?this['itemHeight']():this[_0x5256df(0x4b9)],_0x4b351b=_0x24fec1/_0x38e60d[_0x5256df(0x28f)],_0x342a05=_0x21e3fc/_0x38e60d[_0x5256df(0x245)],_0x271661=Math['min'](_0x4b351b,_0x342a05,0x1),_0x2f8994=this[_0x5256df(0x5b7)]!==undefined?(this[_0x5256df(0x24d)](0x0)['height']-this[_0x5256df(0x3ec)]())/0x2:0x0,_0x291001=_0x38e60d[_0x5256df(0x28f)]*_0x271661,_0x16f862=_0x38e60d[_0x5256df(0x245)]*_0x271661,_0x2bcac7=Math[_0x5256df(0x31e)]((_0x24fec1-_0x291001)/0x2)+_0x4e0490[_0x5256df(0x5ad)],_0x25f709=Math[_0x5256df(0x31e)]((_0x21e3fc-_0x16f862)/0x2)+_0x4e0490[_0x5256df(0x353)]-_0x2f8994*0x2;this[_0x5256df(0x5bb)][_0x5256df(0x413)]=_0x1d1974,this['contentsBack'][_0x5256df(0x243)](_0x38e60d,0x0,0x0,_0x38e60d[_0x5256df(0x28f)],_0x38e60d[_0x5256df(0x245)],_0x2bcac7,_0x25f709,_0x291001,_0x16f862),this[_0x5256df(0x5bb)]['paintOpacity']=0xff;},Window_Base[_0x53794b(0x275)][_0x53794b(0x565)]=function(_0x13afe6){const _0x144912=this['obtainEscapeParam'](_0x13afe6);if(_0x13afe6['drawing'])this['setColorLock'](_0x144912>0x0);},Window_Base[_0x53794b(0x275)]['processCustomWait']=function(_0x232cea){const _0x591787=_0x53794b,_0x5a2eb7=this['obtainEscapeParam'](_0x232cea);this[_0x591787(0x3de)]===Window_Message&&_0x232cea[_0x591787(0x534)]&&this['startWait'](_0x5a2eb7);},Window_Base[_0x53794b(0x275)]['processTextCasing']=function(_0x46596a){const _0x379103=_0x53794b;this[_0x379103(0x525)]=this[_0x379103(0x489)](_0x46596a),this[_0x379103(0x2f6)]=!![],this[_0x379103(0x23d)]=!![];},VisuMZ[_0x53794b(0x3f3)]['NonSupportedTextCodes']=function(_0x2c3bc2){const _0x52b337=_0x53794b;if($gameTemp[_0x52b337(0x330)]()){let _0xf03fae='%1,\x20does\x20not\x20support\x20attempted\x20text\x20code\x20usage.'['format'](_0x2c3bc2['constructor'][_0x52b337(0x23f)]);alert(_0xf03fae),SceneManager['exit']();}},Window_Base['prototype'][_0x53794b(0x41c)]=function(){const _0x33e7eb=_0x53794b;VisuMZ[_0x33e7eb(0x3f3)]['NonSupportedTextCodes'](this);},Window_Base[_0x53794b(0x275)][_0x53794b(0x21c)]=function(){VisuMZ['MessageCore']['NonSupportedTextCodes'](this);},Window_Base['prototype'][_0x53794b(0x504)]=function(){const _0x1ca32b=_0x53794b;VisuMZ[_0x1ca32b(0x3f3)][_0x1ca32b(0x3ab)](this);},Window_Help[_0x53794b(0x275)][_0x53794b(0x59e)]=function(){const _0x2f6840=_0x53794b;this[_0x2f6840(0x37a)]($gameSystem[_0x2f6840(0x4ed)]());},Window_Help[_0x53794b(0x275)][_0x53794b(0x3f2)]=function(){return!![];},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x211)]=Window_Help[_0x53794b(0x275)][_0x53794b(0x331)],Window_Help[_0x53794b(0x275)][_0x53794b(0x331)]=function(){const _0x805596=_0x53794b;this['clearActorNameAutoColor']();if(this[_0x805596(0x5bb)])this[_0x805596(0x5bb)][_0x805596(0x522)]();VisuMZ[_0x805596(0x3f3)][_0x805596(0x211)][_0x805596(0x2fd)](this),this[_0x805596(0x59e)]();},VisuMZ['MessageCore'][_0x53794b(0x406)]=Window_Options[_0x53794b(0x275)][_0x53794b(0x1f5)],Window_Options[_0x53794b(0x275)]['addGeneralOptions']=function(){const _0x2de486=_0x53794b;VisuMZ[_0x2de486(0x3f3)][_0x2de486(0x406)][_0x2de486(0x2fd)](this),this['addMessageCoreCommands']();},Window_Options[_0x53794b(0x275)][_0x53794b(0x4e6)]=function(){const _0x3bda99=_0x53794b;VisuMZ['MessageCore'][_0x3bda99(0x3a8)][_0x3bda99(0x417)]['AddOption']&&TextManager[_0x3bda99(0x4a9)]()&&this[_0x3bda99(0x2c3)](),VisuMZ[_0x3bda99(0x3f3)]['Settings'][_0x3bda99(0x27f)]['AddOption']&&this['addMessageCoreTextSpeedCommand']();},Window_Options['prototype']['addMessageCoreLocalizationCommand']=function(){const _0x577233=_0x53794b,_0x415f67=TextManager['messageCoreLocalization'],_0x39a646=_0x577233(0x4a3);this['addCommand'](_0x415f67,_0x39a646);},Window_Options['prototype'][_0x53794b(0x568)]=function(){const _0x4036a9=_0x53794b,_0x54831a=TextManager[_0x4036a9(0x3e2)],_0x20680f=_0x4036a9(0x426);this['addCommand'](_0x54831a,_0x20680f);},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x31b)]=Window_Options[_0x53794b(0x275)][_0x53794b(0x4a8)],Window_Options['prototype']['statusText']=function(_0x4c28d1){const _0x1640be=_0x53794b,_0x1d2545=this[_0x1640be(0x377)](_0x4c28d1);if(_0x1d2545===_0x1640be(0x4a3))return this[_0x1640be(0x560)]();if(_0x1d2545==='textSpeed')return this[_0x1640be(0x29f)]();return VisuMZ[_0x1640be(0x3f3)][_0x1640be(0x31b)][_0x1640be(0x2fd)](this,_0x4c28d1);},Window_Options['prototype']['visuMzTextLocaleStatusText']=function(){const _0x1f2146=_0x53794b,_0x123bf5=ConfigManager[_0x1f2146(0x4a3)];return TextManager[_0x1f2146(0x27d)](_0x123bf5);},Window_Options[_0x53794b(0x275)][_0x53794b(0x29f)]=function(){const _0x125b7a=_0x53794b,_0x16be44=this[_0x125b7a(0x33d)](_0x125b7a(0x426));return _0x16be44>0xa?TextManager[_0x125b7a(0x535)]:_0x16be44;},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x3db)]=Window_Options[_0x53794b(0x275)]['isVolumeSymbol'],Window_Options[_0x53794b(0x275)]['isVolumeSymbol']=function(_0x56e72a){const _0x5b9a6a=_0x53794b;if(_0x56e72a===_0x5b9a6a(0x4a3))return!![];if(_0x56e72a===_0x5b9a6a(0x426))return!![];return VisuMZ[_0x5b9a6a(0x3f3)][_0x5b9a6a(0x3db)]['call'](this,_0x56e72a);},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x2f9)]=Window_Options[_0x53794b(0x275)][_0x53794b(0x549)],Window_Options[_0x53794b(0x275)][_0x53794b(0x549)]=function(_0x23dc6f,_0x9f5c0d,_0x55db69){const _0x52b0e2=_0x53794b;if(_0x23dc6f===_0x52b0e2(0x4a3))return this[_0x52b0e2(0x235)](_0x9f5c0d,_0x55db69);if(_0x23dc6f===_0x52b0e2(0x426))return this[_0x52b0e2(0x5a9)](_0x23dc6f,_0x9f5c0d,_0x55db69);VisuMZ[_0x52b0e2(0x3f3)][_0x52b0e2(0x2f9)][_0x52b0e2(0x2fd)](this,_0x23dc6f,_0x9f5c0d,_0x55db69);},Window_Options[_0x53794b(0x275)]['changeVisuMzTextLocale']=function(_0x4f5ccc,_0x22eb58){const _0x1673da=_0x53794b,_0x28ca29=VisuMZ[_0x1673da(0x3f3)][_0x1673da(0x3a8)][_0x1673da(0x417)][_0x1673da(0x4ca)]||[],_0x5f2690=ConfigManager[_0x1673da(0x4a3)];let _0x137ff7=_0x28ca29[_0x1673da(0x595)](_0x5f2690);_0x137ff7+=_0x4f5ccc?0x1:-0x1;if(_0x137ff7>=_0x28ca29[_0x1673da(0x361)])_0x137ff7=_0x22eb58?0x0:_0x28ca29['length']-0x1;if(_0x137ff7<0x0)_0x137ff7=_0x22eb58?_0x28ca29[_0x1673da(0x361)]-0x1:0x0;this[_0x1673da(0x28d)](_0x1673da(0x4a3),_0x28ca29[_0x137ff7]);},Window_Options[_0x53794b(0x275)][_0x53794b(0x5a9)]=function(_0x2f8374,_0x4afa40,_0x3f603e){const _0x48d380=_0x53794b,_0x22a6f7=this['getConfigValue'](_0x2f8374),_0x5c29f1=0x1,_0x4a5025=_0x22a6f7+(_0x4afa40?_0x5c29f1:-_0x5c29f1);_0x4a5025>0xb&&_0x3f603e?this[_0x48d380(0x28d)](_0x2f8374,0x1):this[_0x48d380(0x28d)](_0x2f8374,_0x4a5025['clamp'](0x1,0xb));},Window_Message['prototype']['contentsHeight']=function(){const _0x2fe089=_0x53794b;let _0x292486=Window_Base['prototype'][_0x2fe089(0x336)]['call'](this);return _0x292486-=this['addedHeight'](),_0x292486;},Window_Message[_0x53794b(0x275)][_0x53794b(0x383)]=function(){const _0x3f1d3e=_0x53794b;Window_Base[_0x3f1d3e(0x275)]['refreshDimmerBitmap'][_0x3f1d3e(0x2fd)](this),VisuMZ[_0x3f1d3e(0x3f3)][_0x3f1d3e(0x3a8)][_0x3f1d3e(0x446)][_0x3f1d3e(0x4c9)]&&this[_0x3f1d3e(0x370)]();},Window_Message['prototype']['stretchDimmerSprite']=function(){const _0x632de7=_0x53794b;this[_0x632de7(0x4a0)]['x']=Math[_0x632de7(0x55c)](this['width']/0x2),this[_0x632de7(0x4a0)][_0x632de7(0x1e2)]['x']=0.5,this[_0x632de7(0x4a0)][_0x632de7(0x5ae)]['x']=Graphics[_0x632de7(0x28f)];},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x4b1)]=Window_Message['prototype'][_0x53794b(0x530)],Window_Message[_0x53794b(0x275)][_0x53794b(0x530)]=function(){const _0x14c937=_0x53794b;VisuMZ[_0x14c937(0x3f3)]['Window_Message_clearFlags'][_0x14c937(0x2fd)](this),this[_0x14c937(0x411)](),this[_0x14c937(0x59e)](),this[_0x14c937(0x249)](![]),this[_0x14c937(0x292)]('default'),this[_0x14c937(0x504)](VisuMZ[_0x14c937(0x3f3)][_0x14c937(0x3a8)][_0x14c937(0x446)][_0x14c937(0x2b0)]);},Window_Message['prototype'][_0x53794b(0x59e)]=function(){const _0x51e9d3=_0x53794b;this['setWordWrap']($gameSystem[_0x51e9d3(0x1fe)]());},Window_Message[_0x53794b(0x275)][_0x53794b(0x3f2)]=function(){return!![];},Window_Message[_0x53794b(0x275)][_0x53794b(0x504)]=function(_0x528e8e){const _0x3e557c=_0x53794b,_0x418b07=0xb-ConfigManager[_0x3e557c(0x426)];_0x528e8e=Math[_0x3e557c(0x55c)](_0x528e8e*_0x418b07),this[_0x3e557c(0x279)]=_0x528e8e,this[_0x3e557c(0x44d)]=_0x528e8e;},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x24e)]=Window_Message[_0x53794b(0x275)][_0x53794b(0x4fc)],Window_Message[_0x53794b(0x275)]['isTriggered']=function(){const _0x1083b5=_0x53794b;return VisuMZ[_0x1083b5(0x3f3)][_0x1083b5(0x24e)][_0x1083b5(0x2fd)](this)||Input['isPressed'](VisuMZ[_0x1083b5(0x3f3)][_0x1083b5(0x3a8)]['General'][_0x1083b5(0x407)]);},VisuMZ[_0x53794b(0x3f3)]['Window_Message_updatePlacement']=Window_Message[_0x53794b(0x275)]['updatePlacement'],Window_Message[_0x53794b(0x275)]['updatePlacement']=function(){const _0xd57a39=_0x53794b;let _0x1de5ab=this['y'];this['x']=Math[_0xd57a39(0x55c)]((Graphics[_0xd57a39(0x2cc)]-this['width'])/0x2),VisuMZ[_0xd57a39(0x3f3)][_0xd57a39(0x543)][_0xd57a39(0x2fd)](this);if(this[_0xd57a39(0x390)])this['y']=_0x1de5ab;this[_0xd57a39(0x258)](),this[_0xd57a39(0x342)](),this[_0xd57a39(0x471)](),this[_0xd57a39(0x228)]();},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x2f5)]=Window_Message[_0x53794b(0x275)]['newPage'],Window_Message[_0x53794b(0x275)][_0x53794b(0x521)]=function(_0x3119d0){const _0x4d11c0=_0x53794b;this[_0x4d11c0(0x1d9)](_0x3119d0),this[_0x4d11c0(0x293)](_0x3119d0),VisuMZ['MessageCore']['Window_Message_newPage'][_0x4d11c0(0x2fd)](this,_0x3119d0),this[_0x4d11c0(0x324)]();},Window_Message[_0x53794b(0x275)][_0x53794b(0x1d9)]=function(_0x40b7a4){const _0x577e95=_0x53794b;if(!_0x40b7a4)return;this[_0x577e95(0x2a4)]=![],_0x40b7a4[_0x577e95(0x3d4)]=this[_0x577e95(0x564)](_0x40b7a4[_0x577e95(0x3d4)]),this['_textMacroFound']&&(_0x40b7a4[_0x577e95(0x3d4)]=this[_0x577e95(0x460)](_0x40b7a4[_0x577e95(0x3d4)]),this[_0x577e95(0x2a4)]=!![]);},Window_Message[_0x53794b(0x275)]['prepareWordWrapEscapeCharacters']=function(_0x137a03){const _0x3186d8=_0x53794b;if(this[_0x3186d8(0x2a4)])return _0x137a03;return Window_Base[_0x3186d8(0x275)][_0x3186d8(0x460)]['call'](this,_0x137a03);},Window_Message[_0x53794b(0x275)][_0x53794b(0x293)]=function(_0x344aa8){const _0x139081=_0x53794b;this[_0x139081(0x587)](_0x344aa8),this[_0x139081(0x419)](_0x344aa8),this[_0x139081(0x239)]();},VisuMZ['MessageCore'][_0x53794b(0x226)]=Window_Message[_0x53794b(0x275)][_0x53794b(0x368)],Window_Message[_0x53794b(0x275)]['terminateMessage']=function(){const _0x31a9c7=_0x53794b;VisuMZ['MessageCore'][_0x31a9c7(0x226)]['call'](this),this['clearFlags']();if(this['_messagePositionReset'])this[_0x31a9c7(0x29d)]();},Window_Message['prototype'][_0x53794b(0x239)]=function(){const _0x2f3f0e=_0x53794b;this[_0x2f3f0e(0x28f)]=$gameSystem[_0x2f3f0e(0x578)]()+this[_0x2f3f0e(0x2fa)]();;this[_0x2f3f0e(0x28f)]=Math[_0x2f3f0e(0x3dc)](Graphics[_0x2f3f0e(0x28f)],this[_0x2f3f0e(0x28f)]);const _0x35a324=$gameSystem[_0x2f3f0e(0x2b6)]();this[_0x2f3f0e(0x245)]=SceneManager[_0x2f3f0e(0x295)][_0x2f3f0e(0x246)](_0x35a324,![])+this[_0x2f3f0e(0x447)](),this[_0x2f3f0e(0x245)]=Math['min'](Graphics[_0x2f3f0e(0x245)],this[_0x2f3f0e(0x245)]);if($gameTemp[_0x2f3f0e(0x25c)])this[_0x2f3f0e(0x35b)]();},Window_Message[_0x53794b(0x275)][_0x53794b(0x2fa)]=function(){return 0x0;},Window_Message[_0x53794b(0x275)][_0x53794b(0x447)]=function(){return 0x0;},Window_Message[_0x53794b(0x275)][_0x53794b(0x35b)]=function(){const _0xd6fe93=_0x53794b;this['x']=(Graphics[_0xd6fe93(0x2cc)]-this[_0xd6fe93(0x28f)])/0x2,$gameTemp[_0xd6fe93(0x25c)]=undefined,this[_0xd6fe93(0x471)]();},Window_Message[_0x53794b(0x275)][_0x53794b(0x37d)]=function(){const _0x2905b4=_0x53794b,_0x2608eb={'x':this['x'],'y':this['y']};Window_Base[_0x2905b4(0x275)][_0x2905b4(0x37d)][_0x2905b4(0x2fd)](this),this[_0x2905b4(0x1e6)](_0x2608eb);},Window_Message[_0x53794b(0x275)][_0x53794b(0x581)]=function(){return!![];},Window_Message['prototype']['updateNameBoxMove']=function(_0x45ba97){const _0x5d939c=_0x53794b;this[_0x5d939c(0x457)]&&(this[_0x5d939c(0x457)]['x']+=this['x']-_0x45ba97['x'],this['_nameBoxWindow']['y']+=this['y']-_0x45ba97['y']);},Window_Message['prototype'][_0x53794b(0x3fa)]=function(_0xc85731,_0x1733c2){const _0xbba8c1=_0x53794b;this[_0xbba8c1(0x590)](this[_0xbba8c1(0x45f)]['x'],this[_0xbba8c1(0x318)]*(Graphics[_0xbba8c1(0x283)]-this['height'])/0x2,this[_0xbba8c1(0x45f)]['width'],this[_0xbba8c1(0x45f)][_0xbba8c1(0x245)],_0xc85731,_0x1733c2);},Window_Message['prototype'][_0x53794b(0x569)]=function(_0x455cd2){const _0x135fb7=_0x53794b,_0x551276=Window_Base[_0x135fb7(0x275)][_0x135fb7(0x569)][_0x135fb7(0x2fd)](this,_0x455cd2);_0x455cd2[_0x135fb7(0x534)]&&this[_0x135fb7(0x2ba)](_0x551276);},Window_Message['prototype'][_0x53794b(0x2ba)]=function(_0x5bfcb8){const _0x2053ea=_0x53794b;if($gameParty['inBattle']()){}else $gameMap[_0x2053ea(0x225)](_0x5bfcb8);},Window_Message['prototype']['processCharacter']=function(_0x421c9b){const _0x33f518=_0x53794b;this[_0x33f518(0x279)]--,this[_0x33f518(0x279)]<=0x0&&(this['onProcessCharacter'](_0x421c9b),Window_Base['prototype']['processCharacter']['call'](this,_0x421c9b));},Window_Message[_0x53794b(0x275)][_0x53794b(0x1e7)]=function(_0x165cdc){const _0x286dc1=_0x53794b;this[_0x286dc1(0x279)]=this[_0x286dc1(0x44d)];if(this[_0x286dc1(0x44d)]<=0x0)this['_showFast']=!![];},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x3c9)]=Window_Message[_0x53794b(0x275)][_0x53794b(0x381)],Window_Message[_0x53794b(0x275)]['processEscapeCharacter']=function(_0x173734,_0x2f1fba){const _0x5de133=_0x53794b;!_0x2f1fba[_0x5de133(0x534)]?Window_Base[_0x5de133(0x275)]['processEscapeCharacter'][_0x5de133(0x2fd)](this,_0x173734,_0x2f1fba):VisuMZ[_0x5de133(0x3f3)][_0x5de133(0x3c9)][_0x5de133(0x2fd)](this,_0x173734,_0x2f1fba);},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x2a8)]=Window_Message[_0x53794b(0x275)]['needsNewPage'],Window_Message[_0x53794b(0x275)][_0x53794b(0x452)]=function(_0x4c0bf4){const _0x43e9be=_0x53794b;if(this[_0x43e9be(0x2d6)])return![];return VisuMZ[_0x43e9be(0x3f3)][_0x43e9be(0x2a8)][_0x43e9be(0x2fd)](this,_0x4c0bf4);},Window_Message[_0x53794b(0x275)][_0x53794b(0x587)]=function(_0x10996c){const _0x4f38d1=_0x53794b;let _0x25d810=_0x10996c['text'];this[_0x4f38d1(0x52f)]={};if(this['isWordWrapEnabled']())return _0x25d810;_0x25d810=_0x25d810[_0x4f38d1(0x294)](/<POSITION:[ ]*(.*?)>/gi,(_0x4d7468,_0x5a56ea)=>{const _0x46defd=_0x4f38d1,_0x49c256=_0x5a56ea[_0x46defd(0x36b)](',')[_0x46defd(0x32e)](_0x40faa6=>Number(_0x40faa6)||0x0);if(_0x49c256[0x0]!==undefined)this[_0x46defd(0x52f)]['x']=Number(_0x49c256[0x0]);if(_0x49c256[0x1]!==undefined)this[_0x46defd(0x52f)]['y']=Number(_0x49c256[0x1]);if(_0x49c256[0x2]!==undefined)this['_forcedPosition']['width']=Number(_0x49c256[0x2]);if(_0x49c256[0x3]!==undefined)this['_forcedPosition'][_0x46defd(0x245)]=Number(_0x49c256[0x3]);return'';}),_0x25d810=_0x25d810[_0x4f38d1(0x294)](/<COORDINATES:[ ]*(.*?)>/gi,(_0x18a45e,_0x5414e4)=>{const _0x350656=_0x4f38d1,_0x189374=_0x5414e4['split'](',')['map'](_0x32c804=>Number(_0x32c804)||0x0);if(_0x189374[0x0]!==undefined)this['_forcedPosition']['x']=Number(_0x189374[0x0]);if(_0x189374[0x1]!==undefined)this[_0x350656(0x52f)]['y']=Number(_0x189374[0x1]);return'';}),_0x25d810=_0x25d810[_0x4f38d1(0x294)](/<DIMENSIONS:[ ]*(.*?)>/gi,(_0x2cde75,_0xee55d2)=>{const _0x3e348f=_0x4f38d1,_0x30c6ea=_0xee55d2[_0x3e348f(0x36b)](',')[_0x3e348f(0x32e)](_0x34c87f=>Number(_0x34c87f)||0x0);if(_0x30c6ea[0x0]!==undefined)this[_0x3e348f(0x52f)][_0x3e348f(0x28f)]=Number(_0x30c6ea[0x2]);if(_0x30c6ea[0x1]!==undefined)this['_forcedPosition'][_0x3e348f(0x245)]=Number(_0x30c6ea[0x3]);return'';}),_0x25d810=_0x25d810[_0x4f38d1(0x294)](/<OFFSET:[ ]*(.*?)>/gi,(_0x24ae78,_0x2a49c9)=>{const _0x3be61f=_0x4f38d1,_0x1ccae1=_0x2a49c9[_0x3be61f(0x36b)](',')['map'](_0x3bf040=>Number(_0x3bf040)||0x0);let _0x86ffc=_0x1ccae1[0x0]||0x0,_0x41bfee=_0x1ccae1[0x1]||0x0;return $gameSystem[_0x3be61f(0x365)](_0x86ffc,_0x41bfee),'';}),_0x10996c[_0x4f38d1(0x3d4)]=_0x25d810;},Window_Message[_0x53794b(0x275)][_0x53794b(0x258)]=function(){const _0x4d592d=_0x53794b,_0x163693=$gameSystem[_0x4d592d(0x44c)]();this['x']+=_0x163693['x'],this['y']+=_0x163693['y'];},Window_Message[_0x53794b(0x275)][_0x53794b(0x342)]=function(){const _0x59c708=_0x53794b;this[_0x59c708(0x52f)]=this[_0x59c708(0x52f)]||{};const _0x4d2816=['x','y',_0x59c708(0x28f),_0x59c708(0x245)];for(const _0x4b5e1f of _0x4d2816){this['_forcedPosition'][_0x4b5e1f]!==undefined&&(this[_0x4b5e1f]=Number(this[_0x59c708(0x52f)][_0x4b5e1f]));}},Window_Message[_0x53794b(0x275)][_0x53794b(0x419)]=function(_0xe62087){const _0x2eadc2=_0x53794b;this[_0x2eadc2(0x2d6)]=![];let _0x307354=_0xe62087['text'];_0x307354=_0x307354[_0x2eadc2(0x294)](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0x54d346=_0x2eadc2;return this[_0x54d346(0x4ff)](_0x307354,!![],!![]),this[_0x54d346(0x2ef)](_0x54d346(0x58b)),'';}),_0x307354=_0x307354[_0x2eadc2(0x294)](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x58d8f0=_0x2eadc2;return this[_0x58d8f0(0x4ff)](_0x307354,!![],![]),this[_0x58d8f0(0x2ef)](_0x58d8f0(0x58b)),'';}),_0x307354=_0x307354[_0x2eadc2(0x294)](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0x29789e=_0x2eadc2;return this[_0x29789e(0x4ff)](_0x307354,![],!![]),this[_0x29789e(0x2ef)]('none'),'';});if(SceneManager[_0x2eadc2(0x52a)]())_0x307354=_0x307354[_0x2eadc2(0x294)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x19fd56,_0x2674e6)=>{const _0x5ea81a=_0x2eadc2;return this[_0x5ea81a(0x4ff)](_0x307354,!![],!![]),this['processAutoPosition'](_0x5ea81a(0x484),Number(_0x2674e6)||0x1),'';}),_0x307354=_0x307354['replace'](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x56c42b,_0xdd64eb)=>{const _0x4eb423=_0x2eadc2;return this[_0x4eb423(0x4ff)](_0x307354,!![],!![]),this[_0x4eb423(0x2ef)]('battle\x20party',Number(_0xdd64eb)||0x0),'';}),_0x307354=_0x307354[_0x2eadc2(0x294)](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x506572,_0x35819c)=>{const _0x5529be=_0x2eadc2;return this[_0x5529be(0x4ff)](_0x307354,!![],!![]),this[_0x5529be(0x2ef)]('battle\x20enemy',Number(_0x35819c)||0x0),'';});else SceneManager[_0x2eadc2(0x51b)]()&&(_0x307354=_0x307354[_0x2eadc2(0x294)](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0x3eb425,_0x2b7943)=>{const _0x481d26=_0x2eadc2;return this[_0x481d26(0x4ff)](_0x307354,!![],!![]),this[_0x481d26(0x2ef)](_0x481d26(0x4c4),0x0),'';}),_0x307354=_0x307354['replace'](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x136334,_0x350c55)=>{const _0x4f7c55=_0x2eadc2;return this[_0x4f7c55(0x4ff)](_0x307354,!![],!![]),this[_0x4f7c55(0x2ef)]('map\x20actor',Number(_0x350c55)||0x1),'';}),_0x307354=_0x307354[_0x2eadc2(0x294)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x3f6493,_0x42cb10)=>{const _0x50b20d=_0x2eadc2;return this[_0x50b20d(0x4ff)](_0x307354,!![],!![]),this[_0x50b20d(0x2ef)](_0x50b20d(0x48c),Number(_0x42cb10)||0x0),'';}),_0x307354=_0x307354['replace'](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x38ff08,_0x2ffc41)=>{const _0x1a1fe0=_0x2eadc2;return this[_0x1a1fe0(0x4ff)](_0x307354,!![],!![]),this[_0x1a1fe0(0x2ef)](_0x1a1fe0(0x43b),Number(_0x2ffc41)||0x0),'';}));_0xe62087[_0x2eadc2(0x3d4)]=_0x307354;},Window_Message[_0x53794b(0x46a)]=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message[_0x53794b(0x348)]=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message[_0x53794b(0x275)][_0x53794b(0x4ff)]=function(_0x160573,_0x46c0eb,_0x4ae1a7){const _0x357fe2=_0x53794b;_0x160573=_0x160573['replace'](Window_Message['_autoSizeRegexp'],''),_0x160573=_0x160573['replace'](Window_Message[_0x357fe2(0x348)],''),this[_0x357fe2(0x39b)]=!![],this[_0x357fe2(0x2d6)]=!![],this[_0x357fe2(0x37a)](![]);const _0x37c93b=this['textSizeExRaw'](_0x160573);if(_0x46c0eb){let _0x382b54=_0x37c93b[_0x357fe2(0x28f)]+$gameSystem[_0x357fe2(0x1e1)]()*0x2+0x6;const _0x29456e=$gameMessage['faceName']()!=='',_0x1c8e1b=ImageManager[_0x357fe2(0x410)],_0x277744=0x14;_0x382b54+=_0x29456e?_0x1c8e1b+_0x277744:0x4;if(_0x382b54%0x2!==0x0)_0x382b54+=0x1;$gameSystem[_0x357fe2(0x444)](_0x382b54);}if(_0x4ae1a7){let _0x49ea39=Math[_0x357fe2(0x589)](_0x37c93b[_0x357fe2(0x245)]/this[_0x357fe2(0x3ec)]());$gameSystem[_0x357fe2(0x449)](_0x49ea39);}this['updateAutoSizePosition'](),this[_0x357fe2(0x576)](),this[_0x357fe2(0x39b)]=![],this[_0x357fe2(0x39c)]=!![];},Window_Message['prototype'][_0x53794b(0x50d)]=function(){const _0x24f77a=_0x53794b;this['updateDimensions'](),this['updatePlacement'](),this[_0x24f77a(0x35b)](),this[_0x24f77a(0x482)](),this[_0x24f77a(0x4e7)][_0x24f77a(0x522)](),this[_0x24f77a(0x324)]();},Window_Message[_0x53794b(0x275)][_0x53794b(0x2ef)]=function(_0x166dae,_0x2e70fe){const _0x422335=_0x53794b;switch(_0x166dae['toLowerCase']()[_0x422335(0x470)]()){case _0x422335(0x484):this['_autoPositionTarget']=$gameActors[_0x422335(0x3e9)](_0x2e70fe);break;case _0x422335(0x2bd):this[_0x422335(0x390)]=$gameParty[_0x422335(0x37e)]()[_0x2e70fe-0x1];break;case _0x422335(0x3e8):this[_0x422335(0x390)]=$gameTroop[_0x422335(0x37e)]()[_0x2e70fe-0x1];break;case _0x422335(0x4c4):this['_autoPositionTarget']=$gamePlayer;break;case _0x422335(0x1ef):const _0x53c816=$gameActors[_0x422335(0x3e9)](_0x2e70fe)[_0x422335(0x371)]();_0x53c816===0x0?this['_autoPositionTarget']=$gamePlayer:this[_0x422335(0x390)]=$gamePlayer[_0x422335(0x221)]()[_0x422335(0x546)](_0x53c816-0x1);break;case _0x422335(0x48c):_0x2e70fe===0x1?this[_0x422335(0x390)]=$gamePlayer:this[_0x422335(0x390)]=$gamePlayer['followers']()[_0x422335(0x546)](_0x2e70fe-0x2);break;case _0x422335(0x43b):this[_0x422335(0x390)]=$gameMap[_0x422335(0x2e9)](_0x2e70fe);break;}this[_0x422335(0x390)]&&this['updateAutoPosition']();},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x46c)]=Window_Message[_0x53794b(0x275)][_0x53794b(0x454)],Window_Message[_0x53794b(0x275)][_0x53794b(0x454)]=function(){const _0x361b99=_0x53794b;this[_0x361b99(0x49f)](),VisuMZ['MessageCore']['Window_Message_synchronizeNameBox'][_0x361b99(0x2fd)](this);},Window_Message['prototype'][_0x53794b(0x49f)]=function(){const _0x254ede=_0x53794b;if(!this[_0x254ede(0x390)])return;const _0x113f8f=SceneManager['_scene'];if(!_0x113f8f)return;const _0xa24b85=_0x113f8f[_0x254ede(0x4a6)];if(!_0xa24b85)return;const _0x502a73=_0xa24b85['findTargetSprite'](this[_0x254ede(0x390)]);if(!_0x502a73)return;let _0x4fb1ec=_0x502a73['x'];if(SceneManager['isSceneMap']())_0x4fb1ec*=$gameScreen[_0x254ede(0x514)]();else{if(SceneManager[_0x254ede(0x52a)]()&&Imported[_0x254ede(0x210)]){let _0x581f93=_0x502a73['x']-Graphics[_0x254ede(0x2cc)]*_0xa24b85[_0x254ede(0x1e2)]['x'];_0x4fb1ec+=_0x581f93*(_0xa24b85[_0x254ede(0x5ae)]['x']-0x1);}}_0x4fb1ec-=this[_0x254ede(0x28f)]/0x2,_0x4fb1ec-=(Graphics[_0x254ede(0x28f)]-Graphics[_0x254ede(0x2cc)])/0x2,_0x4fb1ec+=this[_0x254ede(0x4f4)]();let _0xfa42a4=_0x502a73['y'];if(SceneManager['isSceneMap']())_0xfa42a4-=_0x502a73[_0x254ede(0x245)]+0x8,_0xfa42a4*=$gameScreen[_0x254ede(0x514)](),_0xfa42a4-=this['height']*$gameScreen[_0x254ede(0x514)]();else{if(SceneManager['isSceneBattle']()&&Imported['VisuMZ_3_ActSeqCamera']){let _0x2157c3=_0x502a73[_0x254ede(0x245)]*_0xa24b85['scale']['y'];_0xfa42a4-=this[_0x254ede(0x245)]*_0xa24b85[_0x254ede(0x5ae)]['y']+_0x2157c3+0x8;let _0x565bfe=_0x502a73['y']-Graphics['boxHeight']*_0xa24b85[_0x254ede(0x1e2)]['y'];_0xfa42a4+=_0x565bfe*(_0xa24b85[_0x254ede(0x5ae)]['y']-0x1);}else _0xfa42a4-=_0x502a73[_0x254ede(0x245)]+0x8,_0xfa42a4-=this[_0x254ede(0x245)];}_0xfa42a4-=(Graphics[_0x254ede(0x245)]-Graphics[_0x254ede(0x283)])/0x2,_0xfa42a4+=this[_0x254ede(0x520)]();const _0x36a341=$gameSystem[_0x254ede(0x44c)]();_0x4fb1ec+=_0x36a341['x'],_0xfa42a4+=_0x36a341['y'],this['x']=Math[_0x254ede(0x55c)](_0x4fb1ec),this['y']=Math[_0x254ede(0x55c)](_0xfa42a4),this['clampPlacementPosition'](!![],![]),this[_0x254ede(0x52f)]=this[_0x254ede(0x52f)]||{},this[_0x254ede(0x52f)]['x']=this['x'],this[_0x254ede(0x52f)]['y']=this['y'],this[_0x254ede(0x52f)]['width']=this[_0x254ede(0x28f)],this['_forcedPosition'][_0x254ede(0x245)]=this[_0x254ede(0x245)],this['_nameBoxWindow'][_0x254ede(0x351)]();},Window_Message['prototype'][_0x53794b(0x4f4)]=function(){return 0x0;},Window_Message[_0x53794b(0x275)][_0x53794b(0x520)]=function(){return 0x0;},Window_Message['prototype'][_0x53794b(0x29d)]=function(){const _0xae99c7=_0x53794b;this[_0xae99c7(0x39c)]=![],this[_0xae99c7(0x390)]=undefined,$gameSystem[_0xae99c7(0x3e4)](),this['updateAutoSizePosition'](),this[_0xae99c7(0x33a)]=0x0;},Window_Message['prototype'][_0x53794b(0x501)]=function(_0x882dbd){const _0x1839b9=_0x53794b;return Window_Base['prototype']['preConvertEscapeCharacters'][_0x1839b9(0x2fd)](this,_0x882dbd);},Window_Message['prototype']['postConvertEscapeCharacters']=function(_0x356d60){const _0x44d186=_0x53794b;return Window_Base[_0x44d186(0x275)][_0x44d186(0x3dd)][_0x44d186(0x2fd)](this,_0x356d60);},Window_Message[_0x53794b(0x275)]['flushTextState']=function(_0x496310){const _0x16cd63=_0x53794b;this[_0x16cd63(0x575)](_0x496310),Window_Base['prototype'][_0x16cd63(0x2da)][_0x16cd63(0x2fd)](this,_0x496310),this[_0x16cd63(0x248)](_0x496310);},Window_Message[_0x53794b(0x275)][_0x53794b(0x575)]=function(_0x104c38){},Window_Message[_0x53794b(0x275)][_0x53794b(0x248)]=function(_0x96acb2){},Window_NameBox[_0x53794b(0x275)][_0x53794b(0x3f2)]=function(){return![];},Window_NameBox['prototype']['resetTextColor']=function(){const _0x531350=_0x53794b;Window_Base['prototype'][_0x531350(0x274)]['call'](this),this['changeTextColor'](this['defaultColor']());},Window_NameBox[_0x53794b(0x275)][_0x53794b(0x2b8)]=function(){const _0x94ec9b=_0x53794b,_0x425cb6=VisuMZ['MessageCore'][_0x94ec9b(0x3a8)][_0x94ec9b(0x446)][_0x94ec9b(0x468)];return ColorManager[_0x94ec9b(0x40a)](_0x425cb6);},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x591)]=Window_NameBox['prototype'][_0x53794b(0x351)],Window_NameBox['prototype'][_0x53794b(0x351)]=function(){const _0x3520c1=_0x53794b;VisuMZ[_0x3520c1(0x3f3)]['Window_NameBox_updatePlacement']['call'](this),this['updateRelativePosition'](),this[_0x3520c1(0x284)](),this[_0x3520c1(0x471)](),this[_0x3520c1(0x3cf)]();},Window_NameBox[_0x53794b(0x275)][_0x53794b(0x501)]=function(_0x5b87e0){const _0x1b4500=_0x53794b;return _0x5b87e0=_0x5b87e0[_0x1b4500(0x294)](/<LEFT>/gi,this[_0x1b4500(0x2fc)]['bind'](this,0x0)),_0x5b87e0=_0x5b87e0[_0x1b4500(0x294)](/<CENTER>/gi,this[_0x1b4500(0x2fc)][_0x1b4500(0x3d8)](this,0x5)),_0x5b87e0=_0x5b87e0['replace'](/<RIGHT>/gi,this['setRelativePosition'][_0x1b4500(0x3d8)](this,0xa)),_0x5b87e0=_0x5b87e0['replace'](/<POSITION:[ ](\d+)>/gi,(_0x502142,_0x5920b5)=>this[_0x1b4500(0x2fc)](parseInt(_0x5920b5))),_0x5b87e0=_0x5b87e0[_0x1b4500(0x294)](/<\/LEFT>/gi,''),_0x5b87e0=_0x5b87e0[_0x1b4500(0x294)](/<\/CENTER>/gi,''),_0x5b87e0=_0x5b87e0[_0x1b4500(0x294)](/<\/RIGHT>/gi,''),_0x5b87e0=_0x5b87e0[_0x1b4500(0x470)](),Window_Base[_0x1b4500(0x275)][_0x1b4500(0x501)]['call'](this,_0x5b87e0);},Window_NameBox[_0x53794b(0x275)]['setRelativePosition']=function(_0x420f87){const _0x4b625e=_0x53794b;return this[_0x4b625e(0x566)]=_0x420f87,'';},Window_NameBox[_0x53794b(0x275)]['updateRelativePosition']=function(){const _0xfe9933=_0x53794b;if($gameMessage[_0xfe9933(0x442)]())return;this[_0xfe9933(0x566)]=this[_0xfe9933(0x566)]||0x0;const _0x13f0cc=this['_messageWindow'],_0xebb540=Math['floor'](_0x13f0cc[_0xfe9933(0x28f)]*this[_0xfe9933(0x566)]/0xa);this['x']=_0x13f0cc['x']+_0xebb540-Math['floor'](this[_0xfe9933(0x28f)]/0x2),this['x']=this['x'][_0xfe9933(0x22b)](_0x13f0cc['x'],_0x13f0cc['x']+_0x13f0cc['width']-this['width']);},Window_NameBox[_0x53794b(0x275)][_0x53794b(0x284)]=function(){const _0x4fbe55=_0x53794b;if($gameMessage['isRTL']())return;this[_0x4fbe55(0x566)]=this[_0x4fbe55(0x566)]||0x0;const _0x3e6d27=VisuMZ['MessageCore'][_0x4fbe55(0x3a8)]['General'][_0x4fbe55(0x551)],_0x81c397=VisuMZ[_0x4fbe55(0x3f3)]['Settings'][_0x4fbe55(0x446)]['NameBoxWindowOffsetY'],_0x2d7b6b=(0x5-this['_relativePosition'])/0x5;this['x']+=Math[_0x4fbe55(0x31e)](_0x3e6d27*_0x2d7b6b),this['y']+=_0x81c397;},Window_NameBox[_0x53794b(0x275)][_0x53794b(0x3cf)]=function(){const _0x2b22b8=_0x53794b,_0x911baf=this[_0x2b22b8(0x59a)],_0x43e433=_0x911baf['y'],_0x1a34ff=VisuMZ[_0x2b22b8(0x3f3)][_0x2b22b8(0x3a8)][_0x2b22b8(0x446)][_0x2b22b8(0x282)];_0x43e433>this['y']&&_0x43e433<this['y']+this[_0x2b22b8(0x245)]-_0x1a34ff&&(this['y']=_0x911baf['y']+_0x911baf[_0x2b22b8(0x245)]);},VisuMZ[_0x53794b(0x3f3)][_0x53794b(0x3d6)]=Window_NameBox[_0x53794b(0x275)][_0x53794b(0x331)],Window_NameBox[_0x53794b(0x275)][_0x53794b(0x331)]=function(){const _0x20c562=_0x53794b;this[_0x20c562(0x566)]=0x0,VisuMZ['MessageCore']['Window_NameBox_refresh'][_0x20c562(0x2fd)](this);},Window_ChoiceList['prototype'][_0x53794b(0x229)]=function(){return![];},Window_ChoiceList[_0x53794b(0x275)][_0x53794b(0x3f2)]=function(){return!![];},Window_ChoiceList[_0x53794b(0x275)][_0x53794b(0x1db)]=function(){return $gameSystem['getChoiceListLineHeight']()+0x8;},Window_ChoiceList[_0x53794b(0x275)][_0x53794b(0x586)]=function(){return $gameSystem['getChoiceListMaxColumns']();},Window_ChoiceList[_0x53794b(0x275)][_0x53794b(0x432)]=function(){const _0x4243a8=_0x53794b;this[_0x4243a8(0x331)](),this[_0x4243a8(0x523)](),this[_0x4243a8(0x36a)](),this['activate'](),this[_0x4243a8(0x52d)]();},Window_ChoiceList['prototype'][_0x53794b(0x48b)]=function(){const _0x30839c=_0x53794b;$gameMessage[_0x30839c(0x527)](this[_0x30839c(0x4aa)]()),this[_0x30839c(0x59a)][_0x30839c(0x368)](),this['close'](),this[_0x30839c(0x567)]&&(this[_0x30839c(0x567)]['clear'](),this[_0x30839c(0x567)][_0x30839c(0x1ea)]());},VisuMZ[_0x53794b(0x3f3)]['Window_ChoiceList_callCancelHandler']=Window_ChoiceList['prototype'][_0x53794b(0x3ac)],Window_ChoiceList[_0x53794b(0x275)]['callCancelHandler']=function(){const _0x2515fa=_0x53794b;VisuMZ[_0x2515fa(0x3f3)][_0x2515fa(0x4f7)][_0x2515fa(0x2fd)](this),this[_0x2515fa(0x567)]&&(this['_helpWindow'][_0x2515fa(0x522)](),this['_helpWindow'][_0x2515fa(0x1ea)]());},Window_ChoiceList[_0x53794b(0x275)][_0x53794b(0x331)]=function(){const _0x26b89d=_0x53794b;this[_0x26b89d(0x298)](),this['makeCommandList'](),this[_0x26b89d(0x59a)]&&(this['updatePlacement'](),this[_0x26b89d(0x462)]()),this[_0x26b89d(0x324)](),this['updateBackground'](),this[_0x26b89d(0x383)](),Window_Selectable[_0x26b89d(0x275)][_0x26b89d(0x331)][_0x26b89d(0x2fd)](this);},Window_ChoiceList['prototype'][_0x53794b(0x30e)]=function(){const _0x24a7df=_0x53794b;$gameMessage['_scriptCall']?this['makeCommandListScriptCall']():this[_0x24a7df(0x20f)](),this['clearChoiceHelpDescriptions'](),this['applyChoiceHelpDescriptions']();},Window_ChoiceList[_0x53794b(0x275)]['makeCommandListScriptCall']=function(){const _0x3e22af=_0x53794b,_0x5e525d=$gameMessage[_0x3e22af(0x4e3)]();let _0x305f0d=0x0;for(let _0x5498ce of _0x5e525d){_0x5498ce=this[_0x3e22af(0x3a0)](_0x5498ce);if(this[_0x3e22af(0x1ec)](_0x5498ce)){const _0x31d6a6=this[_0x3e22af(0x3e0)](_0x5498ce),_0x15b16d=this['isChoiceEnabled'](_0x5498ce);this['addCommand'](_0x31d6a6,'choice',_0x15b16d,_0x305f0d);}_0x305f0d++;}},Window_ChoiceList[_0x53794b(0x275)]['makeCommandListShuffle']=function(){const _0x122046=_0x53794b,_0x45173f=$gameMessage[_0x122046(0x4e3)](),_0x2d10f7=$gameMessage['choiceIndexArray'](),_0x161af8=$gameMessage['maxShuffleChoices'](),_0x500207=_0x45173f['length'];let _0x14f5e7=0x0;for(let _0x1cba69=0x0;_0x1cba69<_0x500207;_0x1cba69++){if(this[_0x122046(0x41e)]['length']>=_0x161af8)break;const _0x4678fe=_0x2d10f7[_0x1cba69];let _0x546abc=_0x45173f[_0x4678fe];if(_0x546abc===undefined)continue;_0x546abc=this[_0x122046(0x3a0)](_0x546abc);if(this[_0x122046(0x1ec)](_0x546abc)){const _0x3f76d1=this[_0x122046(0x3e0)](_0x546abc),_0x3d0248=this[_0x122046(0x493)](_0x546abc);this[_0x122046(0x36c)](_0x3f76d1,_0x122046(0x319),_0x3d0248,_0x4678fe);}_0x14f5e7++;}},Window_ChoiceList[_0x53794b(0x275)][_0x53794b(0x3a0)]=function(_0x27d29c){const _0x159b62=_0x53794b;return Window_Base[_0x159b62(0x275)][_0x159b62(0x564)][_0x159b62(0x2fd)](this,_0x27d29c);},Window_ChoiceList[_0x53794b(0x275)][_0x53794b(0x1ec)]=function(_0x510f57){const _0x1b5cfe=_0x53794b;if(Imported[_0x1b5cfe(0x4d7)])$gameMessage[_0x1b5cfe(0x54e)]();if(_0x510f57['match'](/<HIDE>/i))return![];if(_0x510f57['match'](/<SHOW>/i))return!![];if(_0x510f57[_0x1b5cfe(0x552)](/<SHOW[ ](?:|ALL )(?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x3d4c7b=RegExp['$1']['split'](',')[_0x1b5cfe(0x32e)](_0x2bba5b=>Number(_0x2bba5b)||0x0);if(_0x3d4c7b[_0x1b5cfe(0x3eb)](_0x5be86a=>!$gameSwitches[_0x1b5cfe(0x2a0)](_0x5be86a)))return![];}if(_0x510f57['match'](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x29a276=RegExp['$1'][_0x1b5cfe(0x36b)](',')[_0x1b5cfe(0x32e)](_0xdab3a6=>Number(_0xdab3a6)||0x0);if(_0x29a276[_0x1b5cfe(0x346)](_0x48ea07=>!$gameSwitches[_0x1b5cfe(0x2a0)](_0x48ea07)))return![];}if(_0x510f57[_0x1b5cfe(0x552)](/<HIDE[ ](?:|ALL )(?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x19f985=RegExp['$1'][_0x1b5cfe(0x36b)](',')[_0x1b5cfe(0x32e)](_0x565ffe=>Number(_0x565ffe)||0x0);if(_0x19f985[_0x1b5cfe(0x346)](_0x44c5b6=>$gameSwitches['value'](_0x44c5b6)))return![];}if(_0x510f57[_0x1b5cfe(0x552)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x3d0a86=RegExp['$1'][_0x1b5cfe(0x36b)](',')[_0x1b5cfe(0x32e)](_0x2758fe=>Number(_0x2758fe)||0x0);if(_0x3d0a86[_0x1b5cfe(0x3eb)](_0x6aa15a=>$gameSwitches[_0x1b5cfe(0x2a0)](_0x6aa15a)))return![];}return!![];},Window_ChoiceList[_0x53794b(0x275)][_0x53794b(0x3e0)]=function(_0x57c64c){const _0x20220f=_0x53794b;let _0x1c5db6=_0x57c64c;return _0x1c5db6=_0x1c5db6[_0x20220f(0x294)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x1c5db6=_0x1c5db6[_0x20220f(0x294)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x1c5db6;},Window_ChoiceList[_0x53794b(0x275)][_0x53794b(0x493)]=function(_0x19cffa){const _0x33e0ea=_0x53794b;if(Imported[_0x33e0ea(0x4d7)])$gameMessage[_0x33e0ea(0x54e)]();if(_0x19cffa['match'](/<DISABLE>/i))return![];if(_0x19cffa[_0x33e0ea(0x552)](/<ENABLE>/i))return!![];if(_0x19cffa[_0x33e0ea(0x552)](/<ENABLE[ ](?:|ALL )(?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x5e873f=RegExp['$1'][_0x33e0ea(0x36b)](',')[_0x33e0ea(0x32e)](_0x5b4e81=>Number(_0x5b4e81)||0x0);if(_0x5e873f[_0x33e0ea(0x3eb)](_0x10daa6=>!$gameSwitches['value'](_0x10daa6)))return![];}if(_0x19cffa[_0x33e0ea(0x552)](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x14a516=RegExp['$1']['split'](',')[_0x33e0ea(0x32e)](_0x394b0c=>Number(_0x394b0c)||0x0);if(_0x14a516[_0x33e0ea(0x346)](_0x30a05b=>!$gameSwitches[_0x33e0ea(0x2a0)](_0x30a05b)))return![];}if(_0x19cffa[_0x33e0ea(0x552)](/<DISABLE[ ](?:|ALL )(?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x174f3a=RegExp['$1'][_0x33e0ea(0x36b)](',')[_0x33e0ea(0x32e)](_0x293f6a=>Number(_0x293f6a)||0x0);if(_0x174f3a[_0x33e0ea(0x346)](_0x24082e=>$gameSwitches[_0x33e0ea(0x2a0)](_0x24082e)))return![];}if(_0x19cffa[_0x33e0ea(0x552)](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x107f88=RegExp['$1'][_0x33e0ea(0x36b)](',')[_0x33e0ea(0x32e)](_0xfbd238=>Number(_0xfbd238)||0x0);if(_0x107f88[_0x33e0ea(0x3eb)](_0x32f4ce=>$gameSwitches[_0x33e0ea(0x2a0)](_0x32f4ce)))return![];}return!![];},Window_ChoiceList[_0x53794b(0x275)][_0x53794b(0x430)]=function(){const _0x6951fe=_0x53794b;this[_0x6951fe(0x2c5)]={},this[_0x6951fe(0x567)]&&(this[_0x6951fe(0x567)]['clear'](),this[_0x6951fe(0x567)][_0x6951fe(0x1ea)]());},Window_ChoiceList[_0x53794b(0x275)][_0x53794b(0x32a)]=function(){const _0x53a914=_0x53794b,_0x557e9c=/<(?:HELP|HELP DESCRIPTION|DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:HELP|HELP DESCRIPTION|DESCRIPTION)>/i;for(const _0x43835e of this[_0x53a914(0x41e)]){if(!_0x43835e)continue;const _0xee596e=this['_list'][_0x53a914(0x595)](_0x43835e);if(_0x43835e['name'][_0x53a914(0x552)](_0x557e9c)){const _0x7ba158=String(RegExp['$1']);this[_0x53a914(0x2c5)][_0xee596e]=_0x7ba158[_0x53a914(0x470)](),_0x43835e[_0x53a914(0x23f)]=_0x43835e['name']['replace'](_0x557e9c,'')[_0x53a914(0x470)]();}else this[_0x53a914(0x2c5)][_0xee596e]='';}},Window_ChoiceList['prototype']['processFailsafeChoice']=function(){const _0x238a96=_0x53794b;if(this[_0x238a96(0x41e)][_0x238a96(0x3eb)](_0x487042=>_0x487042[_0x238a96(0x541)]))return;this['deactivate'](),this[_0x238a96(0x1fd)](),$gameMessage[_0x238a96(0x300)]=[],this[_0x238a96(0x59a)][_0x238a96(0x37f)]()&&this[_0x238a96(0x59a)][_0x238a96(0x1f1)]();},VisuMZ['MessageCore'][_0x53794b(0x376)]=Window_ChoiceList[_0x53794b(0x275)][_0x53794b(0x351)],Window_ChoiceList['prototype'][_0x53794b(0x351)]=function(){const _0x4d4fce=_0x53794b;VisuMZ[_0x4d4fce(0x3f3)][_0x4d4fce(0x376)][_0x4d4fce(0x2fd)](this),this['addChoiceDistance'](),this[_0x4d4fce(0x471)]();},Window_ChoiceList[_0x53794b(0x275)]['placeCancelButton']=function(){const _0x1fee1e=_0x53794b;if(!this[_0x1fee1e(0x3d0)])return;const _0x500f18=0x8,_0x2e0925=this[_0x1fee1e(0x3d0)],_0x4382ef=this['x']+this['width'],_0x31424b=Math[_0x1fee1e(0x31e)]((Graphics[_0x1fee1e(0x28f)]-Graphics[_0x1fee1e(0x2cc)])/0x2);_0x4382ef>=Graphics[_0x1fee1e(0x2cc)]+_0x31424b-_0x2e0925['width']+_0x500f18?_0x2e0925['x']=-_0x2e0925[_0x1fee1e(0x28f)]-_0x500f18:_0x2e0925['x']=this[_0x1fee1e(0x28f)]+_0x500f18,_0x2e0925['y']=this[_0x1fee1e(0x245)]/0x2-_0x2e0925[_0x1fee1e(0x245)]/0x2;},VisuMZ['MessageCore']['Window_ChoiceList_windowX']=Window_ChoiceList[_0x53794b(0x275)][_0x53794b(0x21b)],Window_ChoiceList['prototype']['windowX']=function(){const _0x31c9f5=_0x53794b;return this[_0x31c9f5(0x59a)]?this[_0x31c9f5(0x403)]():VisuMZ[_0x31c9f5(0x3f3)]['Window_ChoiceList_windowX']['call'](this);},Window_ChoiceList[_0x53794b(0x275)][_0x53794b(0x403)]=function(){const _0x5b6838=_0x53794b,_0x316db0=$gameMessage[_0x5b6838(0x234)]();if(_0x316db0===0x1)return(Graphics['boxWidth']-this[_0x5b6838(0x25f)]())/0x2;else return _0x316db0===0x2?this[_0x5b6838(0x59a)]['x']+this[_0x5b6838(0x59a)][_0x5b6838(0x28f)]-this['windowWidth']():this[_0x5b6838(0x59a)]['x'];},Window_ChoiceList[_0x53794b(0x275)]['windowWidth']=function(){const _0x53f7fd=_0x53794b,_0x448cd8=(this[_0x53f7fd(0x4e2)]()+this['colSpacing']())*this[_0x53f7fd(0x586)]()+this[_0x53f7fd(0x1f7)]*0x2;return Math['min'](_0x448cd8,Graphics['width']);},Window_ChoiceList[_0x53794b(0x275)][_0x53794b(0x1e3)]=function(){const _0x27f2a0=_0x53794b,_0x41f360=$gameMessage[_0x27f2a0(0x4e3)]()[_0x27f2a0(0x32e)](_0x50243d=>this['convertChoiceMacros'](_0x50243d))['filter'](_0x2379ad=>this[_0x27f2a0(0x1ec)](_0x2379ad));let _0x4d96b3=Math[_0x27f2a0(0x589)](_0x41f360['length']/this[_0x27f2a0(0x586)]());if(!$gameMessage[_0x27f2a0(0x2cb)]){const _0x3de1c3=$gameMessage[_0x27f2a0(0x2bf)]();_0x4d96b3=Math['ceil'](Math['min'](_0x3de1c3,_0x41f360[_0x27f2a0(0x361)])/this['maxCols']());}return Math['max'](0x1,Math[_0x27f2a0(0x3dc)](_0x4d96b3,this[_0x27f2a0(0x40d)]()));},Window_ChoiceList[_0x53794b(0x275)][_0x53794b(0x40d)]=function(){const _0x3ce05d=_0x53794b,_0x2efe19=this['_messageWindow'],_0x3b8120=_0x2efe19?_0x2efe19['y']:0x0,_0x42873c=_0x2efe19?_0x2efe19[_0x3ce05d(0x245)]:0x0,_0x8ccb50=Graphics[_0x3ce05d(0x283)]/0x2;return _0x3b8120<_0x8ccb50&&_0x3b8120+_0x42873c>_0x8ccb50?0x4:$gameSystem[_0x3ce05d(0x32f)]();},Window_ChoiceList['prototype'][_0x53794b(0x4e2)]=function(){const _0x211ba1=_0x53794b;let _0x2b391b=this[_0x211ba1(0x38f)]();for(const _0x3d55e9 of this[_0x211ba1(0x41e)]){const _0x3c869c=_0x3d55e9[_0x211ba1(0x23f)],_0x781389=this[_0x211ba1(0x2d4)](_0x3c869c),_0x80c131=this[_0x211ba1(0x5b0)](_0x3c869c)[_0x211ba1(0x28f)]+_0x781389,_0x467e3a=Math['ceil'](_0x80c131)+this[_0x211ba1(0x507)]()*0x2;_0x2b391b=Math[_0x211ba1(0x3ed)](_0x2b391b,_0x467e3a);}return _0x2b391b;},Window_ChoiceList[_0x53794b(0x275)][_0x53794b(0x38f)]=function(){const _0x12e6c3=_0x53794b;let _0x475574=$gameSystem[_0x12e6c3(0x2db)]();const _0x2b4b8b=$gameMessage['choices']();for(const _0x3b59eb of _0x2b4b8b){_0x3b59eb[_0x12e6c3(0x552)](/<CHOICE WIDTH:[ ](\d+)>/gi)&&(_0x475574=Math[_0x12e6c3(0x3ed)](_0x475574,Number(RegExp['$1'])));}return Math[_0x12e6c3(0x3ed)](_0x475574,0x1);},Window_ChoiceList['prototype'][_0x53794b(0x2e4)]=function(){const _0x445cba=_0x53794b,_0x1415e5=$gameSystem[_0x445cba(0x5b6)]()||0x0,_0x2b398c=this[_0x445cba(0x59a)]['y'],_0x2a5814=this[_0x445cba(0x59a)][_0x445cba(0x245)],_0x19bb39=this['_messageWindow']['_nameBoxWindow'],_0x5d4866=_0x19bb39[_0x445cba(0x33a)]>0x0&&_0x19bb39[_0x445cba(0x28f)]>0x0,_0x20faca=_0x5d4866?_0x19bb39[_0x445cba(0x245)]:0x0;if(_0x1415e5<0x0&&(this[_0x445cba(0x59a)]['isClosed']()||this[_0x445cba(0x59a)][_0x445cba(0x281)]()))this['y']=Math[_0x445cba(0x55c)]((Graphics[_0x445cba(0x283)]-this['height'])/0x2);else{if(_0x2b398c>=Graphics['boxHeight']/0x2)_0x1415e5>=0x0?this['y']-=_0x1415e5:this['y']=Math[_0x445cba(0x31e)]((_0x2b398c-this[_0x445cba(0x245)]-_0x20faca)/0x2);else{if(_0x1415e5>=0x0)this['y']+=_0x1415e5;else{const _0x2164cf=Graphics[_0x445cba(0x283)]-(_0x2b398c+_0x2a5814+_0x20faca);this['y']+=Math[_0x445cba(0x31e)]((_0x2164cf-this[_0x445cba(0x245)])/0x2)+_0x20faca;}}}},Window_ChoiceList[_0x53794b(0x275)][_0x53794b(0x328)]=function(_0xc67f65){const _0x3e781a=_0x53794b,_0x4ff3a6=this['requestChoiceForegroundImage'](_0xc67f65);if(_0x4ff3a6){const _0x1c555d=ImageManager['loadPicture'](_0x4ff3a6),_0xd7a1f3=this[_0x3e781a(0x58f)](),_0x2b85a5=_0xd7a1f3+this['commandName'](_0xc67f65),_0x14c4de=this[_0x3e781a(0x24d)](_0xc67f65);_0x1c555d['addLoadListener'](this[_0x3e781a(0x427)][_0x3e781a(0x3d8)](this,_0xc67f65,!![],_0x2b85a5,_0x14c4de,_0x1c555d));return;}this[_0x3e781a(0x5b9)](_0xc67f65);},Window_ChoiceList[_0x53794b(0x275)]['drawItemContents']=function(_0x1572fe){const _0x480cd4=_0x53794b,_0x44acac=this['itemRectWithPadding'](_0x1572fe),_0x2dcc38=this['choiceAlignText'](),_0x36f0c4=_0x2dcc38+this[_0x480cd4(0x2d3)](_0x1572fe);this[_0x480cd4(0x1ed)](this[_0x480cd4(0x4ea)](_0x1572fe));const _0x313272=this[_0x480cd4(0x5b0)](_0x36f0c4)[_0x480cd4(0x245)],_0x5f1fc7=_0x44acac['x']+this[_0x480cd4(0x2d4)](_0x36f0c4),_0x200946=Math[_0x480cd4(0x3ed)](_0x44acac['y'],_0x44acac['y']+Math['round']((_0x44acac['height']-_0x313272)/0x2));this['drawTextEx'](_0x36f0c4,_0x5f1fc7,_0x200946,_0x44acac[_0x480cd4(0x28f)]),this[_0x480cd4(0x4b7)](_0x1572fe),this['requestChoiceBackgroundImage'](_0x1572fe,_0x36f0c4,_0x44acac);},Window_ChoiceList[_0x53794b(0x275)]['choiceAlignText']=function(){const _0x56d9b8=_0x53794b;return $gameSystem[_0x56d9b8(0x3c4)]()!==_0x56d9b8(0x320)?_0x56d9b8(0x497)[_0x56d9b8(0x201)]($gameSystem[_0x56d9b8(0x3c4)]()):'';},Window_ChoiceList[_0x53794b(0x275)][_0x53794b(0x2d4)]=function(_0x4416bd){const _0x429cfb=_0x53794b;let _0x4776cb=0x0;return _0x4416bd[_0x429cfb(0x552)](/<(?:CHOICE|CHOICE |)INDENT:[ ](\d+)>/gi)&&(_0x4776cb=Number(RegExp['$1'])),_0x4776cb;},Window_ChoiceList[_0x53794b(0x275)][_0x53794b(0x4b7)]=function(_0x58bf9a){const _0x195c44=_0x53794b;if(!Imported['VisuMZ_0_CoreEngine'])return;const _0x597c99=this[_0x195c44(0x2d3)](_0x58bf9a);let _0x190865=![],_0x4c0325=![],_0x2824e5=ColorManager[_0x195c44(0x3fe)](),_0x3814ea=ColorManager['itemBackColor2']();if(_0x597c99[_0x195c44(0x552)](/<(?:BGCOLOR|BG COLOR):[ ](.*?),(.*?)>/gi))_0x2824e5=ColorManager[_0x195c44(0x30a)](RegExp['$1'])[_0x195c44(0x470)](),_0x3814ea=ColorManager[_0x195c44(0x30a)](RegExp['$2'])[_0x195c44(0x470)](),_0x190865=!![];else{if(_0x597c99[_0x195c44(0x552)](/<(?:BGCOLOR|BG COLOR):[ ](.*?)>/gi)){let _0xc8dad4=String(RegExp['$1'])[_0x195c44(0x3bd)]()[_0x195c44(0x470)]();switch(_0xc8dad4){case _0x195c44(0x584):_0x2824e5=_0x3814ea=_0x195c44(0x53d),_0x4c0325=!![];break;case _0x195c44(0x467):_0x2824e5=_0x3814ea=_0x195c44(0x4c2),_0x4c0325=!![];break;case _0x195c44(0x47e):_0x2824e5=_0x3814ea='#fff799',_0x4c0325=!![];break;case _0x195c44(0x4cf):_0x2824e5=_0x3814ea='#7cc576',_0x4c0325=!![];break;case _0x195c44(0x237):_0x2824e5=_0x3814ea=_0x195c44(0x48e),_0x4c0325=!![];break;case _0x195c44(0x2af):case'violet':_0x2824e5=_0x3814ea=_0x195c44(0x3b6),_0x4c0325=!![];break;case'brown':_0x2824e5=_0x3814ea=_0x195c44(0x2a1),_0x4c0325=!![];break;case _0x195c44(0x323):_0x2824e5=_0x3814ea=_0x195c44(0x31a),_0x4c0325=!![];break;case _0x195c44(0x1f6):_0x2824e5=_0x3814ea=_0x195c44(0x494),_0x4c0325=!![];break;case'gray':case _0x195c44(0x47f):_0x2824e5=_0x3814ea=_0x195c44(0x35e),_0x4c0325=!![];break;case _0x195c44(0x1ee):_0x2824e5=_0x3814ea=_0x195c44(0x393),_0x4c0325=!![];break;case _0x195c44(0x51c):_0x2824e5=_0x3814ea=ColorManager[_0x195c44(0x4a7)](),_0x4c0325=!![];break;case'no':_0x2824e5=_0x3814ea=ColorManager[_0x195c44(0x242)](),_0x4c0325=!![];break;case _0x195c44(0x2be):_0x2824e5=_0x3814ea=ColorManager[_0x195c44(0x28b)](),_0x4c0325=!![];break;case'crisis':_0x2824e5=_0x3814ea=ColorManager[_0x195c44(0x4f5)](),_0x4c0325=!![];break;default:_0x2824e5=_0x3814ea=ColorManager['getColor'](_0xc8dad4),_0x4c0325=!![];break;}_0x190865=!![];}}if(!_0x190865)return;const _0x38545c=this[_0x195c44(0x5af)](_0x58bf9a);this[_0x195c44(0x5bb)][_0x195c44(0x41b)](_0x38545c['x'],_0x38545c['y'],_0x38545c['width'],_0x38545c[_0x195c44(0x245)]),this[_0x195c44(0x4c3)](_0x38545c,_0x2824e5,_0x3814ea,_0x4c0325);},Window_ChoiceList[_0x53794b(0x275)][_0x53794b(0x4c3)]=function(_0x11d06a,_0x4c9f98,_0x226665,_0x5250b5){const _0x241fe9=_0x53794b,_0x70d5b=ColorManager[_0x241fe9(0x3fe)](),_0x271805=ColorManager[_0x241fe9(0x4b0)](),_0x251e5b=_0x4c9f98??ColorManager[_0x241fe9(0x3fe)](),_0x9e3eb4=_0x226665??_0x4c9f98,_0xa549ae=_0x11d06a['x'],_0x28f75b=_0x11d06a['y'],_0x1434c0=_0x11d06a[_0x241fe9(0x28f)],_0x20240d=_0x11d06a['height'];this[_0x241fe9(0x5bb)][_0x241fe9(0x46f)](_0xa549ae,_0x28f75b,_0x1434c0,_0x20240d,_0x251e5b,_0x9e3eb4,!![]),_0x5250b5&&this[_0x241fe9(0x5bb)][_0x241fe9(0x46f)](_0xa549ae,_0x28f75b,_0x1434c0,_0x20240d,_0x70d5b,_0x9e3eb4,!![]),this[_0x241fe9(0x5bb)][_0x241fe9(0x3fb)](_0xa549ae,_0x28f75b,_0x1434c0,_0x20240d,_0x70d5b);},Window_ChoiceList[_0x53794b(0x275)][_0x53794b(0x47b)]=function(_0x50fced){const _0x4ecc07=_0x53794b,_0x50d1d6=this[_0x4ecc07(0x58f)](),_0x341365=_0x50d1d6+this[_0x4ecc07(0x2d3)](_0x50fced);let _0x444d73='';if(_0x341365['match'](/<FG(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/i))_0x444d73=String(RegExp['$1'])[_0x4ecc07(0x470)]();else _0x341365[_0x4ecc07(0x552)](/<FG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i)&&(_0x444d73=String(RegExp['$2'])[_0x4ecc07(0x470)]());return _0x444d73;},Window_ChoiceList[_0x53794b(0x275)]['requestChoiceBackgroundImage']=function(_0x56fdeb,_0x51d2b8,_0x52776a){const _0x14bf03=_0x53794b;let _0x448f1b='';if(_0x51d2b8['match'](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/i))_0x448f1b=String(RegExp['$1'])[_0x14bf03(0x470)]();else _0x51d2b8['match'](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i)&&(_0x448f1b=String(RegExp['$2'])[_0x14bf03(0x470)]());if(_0x448f1b){const _0x4eb72f=ImageManager[_0x14bf03(0x511)](_0x448f1b);_0x4eb72f['addLoadListener'](this['drawChoiceLocationImage'][_0x14bf03(0x3d8)](this,_0x56fdeb,![],_0x51d2b8,_0x52776a,_0x4eb72f));}},Window_ChoiceList[_0x53794b(0x275)][_0x53794b(0x427)]=function(_0x32b94c,_0x4615f2,_0x4a0e16,_0xfdb21,_0x2c3fe7){const _0x1126a3=_0x53794b,_0x196a55=this[_0x1126a3(0x58f)](),_0x4f67b4=_0x196a55+this['commandName'](_0x32b94c);if(_0x4a0e16!==_0x4f67b4)return;const _0x56d35f=this[_0x1126a3(0x24d)](_0x32b94c);if(['x','y',_0x1126a3(0x28f),'height'][_0x1126a3(0x3eb)](_0x38d42f=>_0x56d35f[_0x38d42f]!==_0xfdb21[_0x38d42f]))return;let _0x38e3c3=0x0,_0xd7d278='';if(_0x4615f2&&_0x4f67b4['match'](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/i)){}else{if(_0x4615f2&&_0x4f67b4[_0x1126a3(0x552)](/<FG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i))_0xd7d278=String(RegExp['$1'])[_0x1126a3(0x3bd)]()[_0x1126a3(0x470)]();else!_0x4615f2&&_0x4f67b4[_0x1126a3(0x552)](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i)&&(_0xd7d278=String(RegExp['$1'])[_0x1126a3(0x3bd)]()['trim']());}switch(_0xd7d278){case'lowerleft':case _0x1126a3(0x372):case _0x1126a3(0x2fb):case _0x1126a3(0x4d6):case _0x1126a3(0x540):case _0x1126a3(0x40e):case'1':_0x38e3c3=0x1;break;case'lowercenter':case _0x1126a3(0x333):case'lower\x20center':case'downcenter':case _0x1126a3(0x233):case _0x1126a3(0x59f):case'down':case'2':_0x38e3c3=0x2;break;case _0x1126a3(0x25a):case _0x1126a3(0x4a5):case'lower\x20right':case _0x1126a3(0x571):case'down-right':case'down\x20right':case'3':_0x38e3c3=0x3;break;case _0x1126a3(0x425):case'middleleft':case _0x1126a3(0x2c6):case'4':_0x38e3c3=0x4;break;case'midcenter':case _0x1126a3(0x5aa):case _0x1126a3(0x4b4):case _0x1126a3(0x3bf):case'5':_0x38e3c3=0x5;break;case _0x1126a3(0x524):case'middleright':case _0x1126a3(0x2e6):case'6':_0x38e3c3=0x6;break;case _0x1126a3(0x3ee):case _0x1126a3(0x3fc):case _0x1126a3(0x4b8):case _0x1126a3(0x57a):case'up-left':case'up\x20left':case'7':_0x38e3c3=0x7;break;case _0x1126a3(0x2ca):case _0x1126a3(0x301):case _0x1126a3(0x2ea):case'upcenter':case _0x1126a3(0x573):case _0x1126a3(0x2e1):case'up':case'8':_0x38e3c3=0x8;break;case'upperright':case'upper-right':case'upper\x20right':case _0x1126a3(0x414):case _0x1126a3(0x4d5):case'up\x20right':case'9':_0x38e3c3=0x9;break;}const _0x17790c=_0x4615f2?this[_0x1126a3(0x4e7)]:this['contentsBack'],_0x1e6ca0=this['itemRect'](_0x32b94c);!_0x4615f2&&_0x17790c[_0x1126a3(0x41b)](_0x1e6ca0['x']-0x1,_0x1e6ca0['y']-0x1,_0x1e6ca0[_0x1126a3(0x28f)]+0x2,_0x1e6ca0[_0x1126a3(0x245)]+0x2);const _0x1e9b87=_0x1e6ca0['x']+0x2,_0x4676aa=_0x1e6ca0['y']+0x2,_0x1fde1f=_0x1e6ca0[_0x1126a3(0x28f)]-0x4,_0x45e72b=_0x1e6ca0[_0x1126a3(0x245)]-0x4,_0x41fb7d=_0x2c3fe7['width'],_0x1843ed=_0x2c3fe7['height'];let _0x161075=_0x1e9b87,_0x4b7ea4=_0x4676aa,_0x205a93=_0x1fde1f,_0x3c22f0=_0x45e72b;const _0x3b956b=_0x1fde1f/_0x41fb7d,_0x2fc2dd=_0x45e72b/_0x1843ed;let _0x5e4407=Math['min'](_0x3b956b,_0x2fc2dd);if(_0x4615f2)_0x5e4407=Math[_0x1126a3(0x3dc)](_0x5e4407,0x1);_0x38e3c3!==0x0&&(_0x205a93=Math['round'](_0x41fb7d*_0x5e4407),_0x3c22f0=Math[_0x1126a3(0x55c)](_0x1843ed*_0x5e4407));switch(_0x38e3c3){case 0x1:case 0x4:case 0x7:_0x161075=_0x1e9b87;break;case 0x2:case 0x5:case 0x8:_0x161075+=Math['round']((_0x1fde1f-_0x205a93)/0x2);break;case 0x3:case 0x6:case 0x9:_0x161075+=_0x1fde1f-_0x205a93;break;}switch(_0x38e3c3){case 0x7:case 0x8:case 0x9:_0x4b7ea4=_0x4676aa;break;case 0x4:case 0x5:case 0x6:_0x4b7ea4+=Math[_0x1126a3(0x55c)]((_0x45e72b-_0x3c22f0)/0x2);break;case 0x1:case 0x2:case 0x3:_0x4b7ea4+=_0x45e72b-_0x3c22f0;break;}_0x17790c[_0x1126a3(0x243)](_0x2c3fe7,0x0,0x0,_0x41fb7d,_0x1843ed,_0x161075,_0x4b7ea4,_0x205a93,_0x3c22f0),_0x4615f2&&this[_0x1126a3(0x5b9)](_0x32b94c);},Window_ChoiceList[_0x53794b(0x275)]['updateHelp']=function(){const _0x4ff728=_0x53794b;this['_helpWindow'][_0x4ff728(0x522)]();if(!this['_choiceHelpDescriptions'])return;const _0x4551c6=this[_0x4ff728(0x371)]();this[_0x4ff728(0x2c5)][_0x4551c6]?(this[_0x4ff728(0x567)][_0x4ff728(0x3c6)](this[_0x4ff728(0x2c5)][_0x4551c6]),this['_helpWindow']['show']()):(this['_helpWindow'][_0x4ff728(0x522)](),this[_0x4ff728(0x567)]['hide']());},Window_EventItem[_0x53794b(0x275)][_0x53794b(0x509)]=function(){const _0x3471ca=_0x53794b,_0x1014aa=$gameMessage['itemChoiceItypeId']();_0x1014aa===_0x3471ca(0x3d3)&&Imported['VisuMZ_1_SkillsStatesCore']?this[_0x3471ca(0x214)]():Window_ItemList[_0x3471ca(0x275)][_0x3471ca(0x509)]['call'](this);},Window_EventItem[_0x53794b(0x275)][_0x53794b(0x214)]=function(){const _0x38212c=_0x53794b,_0x14d228=$gameMessage[_0x38212c(0x33b)]();this[_0x38212c(0x561)]=_0x14d228?_0x14d228[_0x38212c(0x241)]()[_0x38212c(0x22c)](_0x9b26cc=>this[_0x38212c(0x2f3)](_0x9b26cc)):[],this[_0x38212c(0x2f3)](null)&&this[_0x38212c(0x561)]['push'](null);},VisuMZ['MessageCore'][_0x53794b(0x550)]=Window_EventItem[_0x53794b(0x275)][_0x53794b(0x2f3)],Window_EventItem[_0x53794b(0x275)][_0x53794b(0x2f3)]=function(_0x2d66a8){const _0x1c5203=_0x53794b,_0x321423=$gameMessage[_0x1c5203(0x439)]();if(_0x321423===_0x1c5203(0x309)){if(!DataManager[_0x1c5203(0x219)](_0x2d66a8))return![];const _0x908ee6=$gameMessage[_0x1c5203(0x473)]();if(_0x908ee6>0x0){if(_0x2d66a8['wtypeId']!==_0x908ee6)return![];}return!![];}else{if(_0x321423===_0x1c5203(0x39d)){if(!DataManager['isArmor'](_0x2d66a8))return![];const _0xf3a2a4=$gameMessage[_0x1c5203(0x46e)]();if(_0xf3a2a4>0x0){if(_0x2d66a8[_0x1c5203(0x2f4)]!==_0xf3a2a4)return![];}const _0x1cd565=$gameMessage[_0x1c5203(0x4b6)]();if(_0x1cd565>0x0){if(_0x2d66a8[_0x1c5203(0x314)]!==_0x1cd565)return![];}return!![];}else{if(_0x321423===_0x1c5203(0x3d3)){if(!DataManager[_0x1c5203(0x431)](_0x2d66a8))return![];const _0x56303f=$gameMessage['itemChoiceActor']();if(_0x56303f[_0x1c5203(0x2a6)](_0x2d66a8))return![];if(!_0x56303f[_0x1c5203(0x30f)](_0x2d66a8))return![];const _0x3f5c06=$gameMessage[_0x1c5203(0x3c2)]();if(_0x3f5c06>0x0){const _0x3f6d6b=DataManager[_0x1c5203(0x213)](_0x2d66a8);if(!_0x3f6d6b['includes'](_0x3f5c06))return![];}return!![];}else return VisuMZ[_0x1c5203(0x3f3)]['Window_EventItem_includes'][_0x1c5203(0x2fd)](this,_0x2d66a8);}}},VisuMZ['MessageCore'][_0x53794b(0x2e0)]=Window_ItemList['prototype']['drawItemNumber'],Window_ItemList[_0x53794b(0x275)]['drawItemNumber']=function(_0x2046bd,_0x3e2831,_0x1340db,_0x324753){const _0x2b872c=_0x53794b,_0x3bb4de=$gameMessage['itemChoiceItypeId']();if(_0x3bb4de===_0x2b872c(0x3d3)){const _0x115298=$gameMessage[_0x2b872c(0x33b)]();this['drawSkillCost'](_0x115298,_0x2046bd,_0x3e2831,_0x1340db,_0x324753);}else VisuMZ[_0x2b872c(0x3f3)]['Window_ItemList_drawItemNumber'][_0x2b872c(0x2fd)](this,_0x2046bd,_0x3e2831,_0x1340db,_0x324753);},Window_MapName['prototype']['refreshWithTextCodeSupport']=function(){const _0x32e485=_0x53794b;this[_0x32e485(0x4e7)][_0x32e485(0x522)]();let _0x2f8fde=$gameMap[_0x32e485(0x358)]();if(_0x2f8fde){const _0x3b54c=this['innerWidth'];this[_0x32e485(0x516)](0x0,0x0,_0x3b54c,this[_0x32e485(0x3ec)]()),_0x2f8fde=this['realignMapName'](_0x2f8fde);const _0x542adc=this[_0x32e485(0x5b0)](_0x2f8fde)[_0x32e485(0x28f)];this[_0x32e485(0x38b)](_0x2f8fde,Math[_0x32e485(0x31e)]((_0x3b54c-_0x542adc)/0x2),0x0);}},Window_MapName[_0x53794b(0x275)][_0x53794b(0x264)]=function(_0x42af76){const _0x658537=_0x53794b;if(_0x42af76[_0x658537(0x552)](/<LEFT>/gi))this['x']=0x0;else{if(_0x42af76['match'](/<CENTER>/gi))this['x']=Math[_0x658537(0x31e)]((Graphics[_0x658537(0x2cc)]-this[_0x658537(0x28f)])/0x2);else _0x42af76[_0x658537(0x552)](/<RIGHT>/gi)&&(this['x']=Graphics['boxWidth']-this['width']);}_0x42af76=_0x42af76[_0x658537(0x294)](/<(?:LEFT|CENTER|RIGHT)>/gi,''),_0x42af76=_0x42af76[_0x658537(0x294)](/<\/(?:LEFT|CENTER|RIGHT)>/gi,'');if(_0x42af76[_0x658537(0x552)](/<TOP>/gi))this['y']=0x0;else{if(_0x42af76[_0x658537(0x552)](/<MIDDLE>/gi))this['y']=Math[_0x658537(0x31e)]((Graphics['boxHeight']-this[_0x658537(0x245)])/0x2);else _0x42af76[_0x658537(0x552)](/<BOTTOM>/gi)&&(this['y']=Graphics['boxHeight']-this[_0x658537(0x245)]);}return _0x42af76=_0x42af76[_0x658537(0x294)](/<(?:TOP|MIDDLE|BOTTOM)>/gi,''),_0x42af76=_0x42af76['replace'](/<\/(?:TOP|MIDDLE|BOTTOM)>/gi,''),_0x42af76[_0x658537(0x552)](/<X:[ ]([\+\-]\d+)>/gi)&&(this['x']+=Number(RegExp['$1']),_0x42af76=_0x42af76['replace'](/<X:[ ]([\+\-]\d+)>/gi,'')),_0x42af76['match'](/<Y:[ ]([\+\-]\d+)>/gi)&&(this['y']+=Number(RegExp['$1']),_0x42af76=_0x42af76[_0x658537(0x294)](/<Y:[ ]([\+\-]\d+)>/gi,'')),_0x42af76;};