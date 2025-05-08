//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.87;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.87] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Auto Save After New Game
 * 
 * Normally, when starting a new game through the "New Game" option, there is
 * no auto save trigger. However, if you start a new game or load a saved game,
 * then go to the Game End screen, return back to the title screen, then start
 * a New Game, the auto save trigger occurs when it shouldn't. The Core Engine
 * will now patch this and prevent the trigger from taking place.
 * 
 * ---
 * 
 * Battle Forced End Action Crash
 * 
 * Depending on various circumstances, currently active battlers can be cleared
 * from the battle system at will due to a number of reasons. However, if it
 * just so happens that the targets are cleared, too, with actions remaining,
 * then a crash will follow up. This plugin will prevent that change. Fix made
 * by Olivia.
 * 
 * ---
 * 
 * Debug Console Refresh Bug
 * 
 * When pressing F5 to refresh while the debug console (DevTools) is open,
 * some graphics will fail to load properly. This started occurring since the
 * RPG Maker MZ 1.5.0 update and the code for loading the images has now been
 * reverted to the 1.4.4 version where it was last stable.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Overly-Protective Substitute
 * 
 * When an ally with critical health is being targeted by a friendly non-
 * Certain Hit skill (such as a heal or buff) and another ally has the
 * substitute state, the other ally would "protect" the originally targeted
 * ally and take the heal or buff.
 * 
 * The new changed behavior is that now, substitute will not trigger for any
 * actions whose scope targets allies.
 * 
 * ---
 * 
 * Skill List Active After Party Member Change
 * 
 * If the skill list is active (ie. the player can move the cursor around) and
 * the party member currently being viewed is changed via the button commands,
 * then previously, RPG Maker MZ would still have that window be active despite
 * having the cursor hidden temporarily. Upon pressing direction buttons, the
 * cursor reveals itself and both the skill type window and skill list window
 * are both active, making way for lots of potential problems to happen.
 * 
 * ---
 * 
 * Sprite Removal and Destroy Crash
 * 
 * A texture check will now occur for sprites that are being removed and
 * destroyed in order to prevent crashes. In the off chance that someone
 * creates a sprite through a script call and removes it through such, the
 * likelihood of this occurance becomes higher. This makes the "destroy"
 * property take into account a texture check in order to see if the sprite
 * removal is taking extra steps and will reduce those extra steps.
 * 
 * ---
 * 
 * Status Window Name Vertical Cutoffs
 * 
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Water Tile Bug
 * 
 * It seems like there's a new bug that occurs if you create a tileset from
 * scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 * does is it causes many tiles to become water tiles without intending to.
 * You can find this out by turning off all the plugins in your project,
 * putting a Ship or Boat on what are normally ground tiles, and then seeing
 * the Ship or Boat traverse through it.
 * 
 * There are two ways to fix this. We cannot fix it through code in this plugin
 * as it's a problem that involves the tileset json data there are ways to work
 * around it so that you can get the proper water-flags to go where they need
 * to be at.
 * 
 * 1. Copy a working un-bugged tileset onto the currently bugged one and
 *    reapply the tile features like passability, terrain tags, etc. This will
 *    make sure the water-passability tiles get copied over correctly.
 * 
 * 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *    un-bugged tileset (usually a pre-existing tileset when a new project is
 *    made), click the "Copy Page" button, go to the bugged tileset and press
 *    "Paste Page". You'll have to reapply any different properties like
 *    passabilities and terrain tags, but the water tile flags should now be
 *    working properly.
 * 
 * The plugin will not fix the problem itself since flag data is delicate and
 * should not be tampered with midgame as the changes made by the plugin might
 * not match the desired settings.
 * 
 * This plugin, however, will also send out an alert message when coming across
 * such a tile. Pay attention to it and do one of the following two steps above
 * to fix the problem.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 * 
 * ---
 *
 * === Actors-Related Notetags ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes-Related Notetags ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies-Related Notetags ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations-Related Notetags ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 * 
 * <Rate: x>
 * 
 * - Used for: MV Animation Name Tags
 * - Allows you to adjust the update for this MV Animation.
 *   - Does NOT work with Effekseer animations.
 * - The lower the number, the faster.
 * - Replace 'x' with a number representing the animation update rate.
 *   - Default rate: 4.
 *   - Minimum rate: 1.
 *   - Maximum rate: 10.
 * 
 * ---
 *
 * === Quality of Life-Related Notetags ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 * 
 * <Scroll Lock X>
 * <Scroll Lock Y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - This will use the display nudge setting found in the Plugin Parameters.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 * 
 * <Scroll Lock X: x>
 * <Scroll Lock Y: y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present and will nudge the map camera slightly.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - Replace 'x' and 'y' with numbers between 0 and 1 to represent how much is
 *   being judged.
 *   - For example, for a 1280x720 resolution, a 27 tile wide map will benefit
 *     from a nudge of 0.15625. Play with these numbers to determine the best
 *     value for your maps.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 *
 * === Basic, X, and S Parameters-Related Notetags ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 * - This does NOT set the max cap to be lower than the default cap.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * 
 * ---
 * 
 * === Tileset-Related Notetags ===
 * 
 * ---
 * 
 * <Taller By x: id>
 * 
 * - Used for: Tileset Notetags
 * - Changes any page B, C, D, E tile marked by terrain tag 'id' to be taller
 *   by 'x' tiles.
 *   - Replace 'x' with a number representing the tiles to be taller by.
 *   - Replace 'id' with a number representing the Terrain Tag you will use to
 *     mark this tile with in the Database editor.
 * - When placing these tiles on the map, all you have to do is just place the
 *   bottom tile.
 *   - ie.: For a tree that's one tile taller, just place the tile at the
 *     bottom where you see the trunk.
 *   - Then, in-game, the tree will appear taller by one tile as marked.
 * - Depending on the priority settings, the tile will appear on different
 *   layers.
 *   - O will place the tile on the below player layer.
 *   - X will place the tile on the same level as the player.
 *   - ★ will place the tile on the above player layer.
 *   - O/X layer tiles have a special property where tall sprites standing in
 *     front of it will no longer clip the top of the sprite, while sprites
 *     standing behind it will be covered by it.
 *   - The X layer sprite will only have a hitbox of 1x1 at the base.
 * - This does not work with events using tiles as graphics. Instead, if you
 *   want to do similar, use the Event & Movement Core's <Tile Expand> notetags
 *   for better control.
 * 
 * ---
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <Grid>
 * <Battle Grid>
 * 
 * <No Grid>
 * <No Battle Grid>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Requires VisuMZ_2_BattleGridSystem!
 * - Changes the battle system to utilize the Battle Grid System or not.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * - If none of these notetags or comment tags are found, refer to the default
 *   settings found in the Plugin Parameters.
 * 
 * ---
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
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Audio Plugin Commands ===
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGS Volume
 * - Changes the current BGS volume without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Volume:
 *   - Change the current BGS's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGS Pitch
 * - Changes the current BGS pitch without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Pitch:
 *   - Change the current BGS's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGS Pan
 * - Changes the current BGS pan without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Pan:
 *   - Change the current BGS's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * === Debug Plugin Commands ===
 * 
 * ---
 * 
 * Debug: Current Controller ID
 * - PLAY TEST ONLY.
 * - Shows current controller ID in debug console.
 * - If you press a key on the keyboard, this data will be erased.
 * - Also copies to computer clipboard if possible.
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Rotate by Angle
 * - Rotates target picture by a amount angle over a set duration instead of
 *   continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Adjust Angle:
 *   - What is the angle you wish to rotate the picture by?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Rotate to Angle
 * - Rotates target picture to a certain angle over a set duration
 *   instead of continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Target Angle:
 *   - What is the target angle you wish to rotate the picture?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 * 
 * === Text Popup Command ===
 * 
 * ---
 * 
 * Text Popup: Show Text
 * - Adds text to a text popup window to briefly appear.
 * - Multiple text popups will be queued.
 * - Does not halt the game and works parallel to game activity.
 * 
 *   Text:
 *   - Write the text that you want to appear here.
 *   - You may use text codes.
 * 
 * ---
 * 
 * === Variable Plugin Commands ===
 * 
 * ---
 * 
 * Variable: JS Eval
 * - Pick a variable ID and value to alter through JS.
 * - Allows one line of code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 * 
 * Variable: JS Block
 * - Pick a variable ID and value to alter through JS.
 * - Allows JS block code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 * 
 *   CTRL + n: Quick Load:
 *   - CTRL + a number from 1 to 9 will yield a quick load of that safe file.
 *   - Does not count auto saves.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 *   Shift+R: Recover All:
 *   - For Play Test only!
 *   - During battle, pressing SHIFT + R will refill the whole party's HP
 *     and MP and status.
 * 
 *   Shift+T: Full TP
 *   - For Play Test only! 
 *   - During battle, pressing SHIFT + T will refill the whole party's TP.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 * 
 * Picture-Related
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 * 
 *   Picture Containers > Detach in Battle:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the battle scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 *   Picture Containers > Detach in Map:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the map scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 * 
 *   Map Name Text Code:
 *   - If on, map names will use text codes.
 *   - If off, only the raw map name will be used.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   MV Animation Rate:
 *   - Adjusts the rate at which MV animations play.
 *   - Default: 4.
 *   - Lower for faster.
 *   - Higher for slower.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 * 
 *   Shortcut Scripts:
 *   - Enables shortcut-based script variables and functions that can be used
 *     for script calls.
 *   - Shortcut list enabled for this is as follows:
 * 
 *     $commonEvent(id)
 *     - Queues a common event.
 *     - This does not interrupt the current event to run the desired common
 *       event. Any queued common events will run after the current event list
 *       has finished.
 *     - Replace 'id' with the ID of the common event you wish to queue.
 *     - Common events only run in the map scene and battle scene.
 * 
 *     $onceParallel(id)
 *     - Runs a common event in the background as a once parallel event.
 *     - Once parallel events will run in the background like a parallel
 *       process, except that it does not repeat after finishing.
 *     - Replace 'id' with the ID of the common event you wish to run.
 *     - Only works in the map scene and battle scene. Battle scene usage will
 *       require VisuMZ_1_BattleCore.
 * 
 *     $scene
 *     - Returns current scene.
 * 
 *     $spriteset
 *     - Returns current scene's spriteset if there is one.
 * 
 *     $subject
 *     - Returns last recorded identity of the battle's subject/user.
 * 
 *     $targets
 *     - Returns last recorded targets marked in battle.
 * 
 *     $target
 *     - Returns last recorded target marked in battle.
 *     - If multiple targets are recorded, then the first of the recorded
 *       targets will be set for this variable.
 *     - Works better with VisuMZ_1_BattleCore.
 * 
 *     $event
 *     - Returns currently initiated map event.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Finish Entry:
 *   - Text used to describe finish entry.
 * 
 *   Page Change:
 *   - Text used to describe character page changing.
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 * 
 *   Blur Strength:
 *   - Strength used for menu background snapshots.
 *   - Default: 8. Higher is stronger. Lower is weaker.
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Split "Escape":
 *   - Used ONLY for those making their own custom keyboard key input maps.
 *     - This means you need to go to your own project's rmmz_core.js and
 *       modify Input.keyMapper to have buttons with "cancel" and "menu"
 *       instead of only "escape".
 *     - If there are none found, an error message will appear telling you to
 *       do so, or set the 'Split "Escape"' option to false.
 *     - If you are using Options Core's Rebind Keyboard option, be sure to
 *       have those have "cancel" and "menu" options inside there, too.
 *   - "Split" option makes separate instances of "Cancel" and "Menu" keys.
 *   - "Don't" option will consolidate both into "Escape" keys.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Controller Button Assist Settings
 * ============================================================================
 *
 * These are sub-settings for the Button Assist Window Plugin Parameters. Where
 * the Button Assist Window Plugin Parameters are focused on keyboard entries,
 * these sections are focused on gamepad controllers.
 * 
 * Add multiple gamepads to the list to give them different button assist text.
 * If a gamepad is being used but not listed here, the button assist text will
 * default to the keyboard version.
 * 
 * For those looking for more information regarding controllers, visit this
 * site: https://gamepad-tester.com/
 *
 * ---
 *
 * ID Information
 * 
 *   Controller ID Name:
 *   - Exact string used for this controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - Example: Xbox 360 Controller (XInput STANDARD GAMEPAD)
 * 
 *   Similarity Match:
 *   - Partial string used to check for controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - This check occurs secondary to the exact name.
 *   - Example: Xbox
 *
 * ---
 *
 * Directions
 * 
 *   Up:
 *   Left:
 *   Right:
 *   Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * Actions
 * 
 *   OK:
 *   Cancel:
 *   Menu:
 *   Shift:
 *   Page Up:
 *   Page Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *   - *NOTE*: Controllers use a different mapping scheme from keyboards.
 *     - The "cancel" button is separate from the "menu" button though, for the
 *       majority of the button assist window help text, we'll be referring to
 *       the cancel button usually.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 * 
 *   Show Actor Level?:
 *   - Show the actor level when displaying actors?
 *   - Affects for most windows in-game.
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 * 
 * Maps
 * 
 *   Scroll Lock Small X?:
 *   Scroll Lock Small Y?:
 *   - Automatically scroll lock X/Y scrolling if the map is too small?
 *   - Useful for 1280x720 resolutions when the map is 27 tiles wide.
 *     - This will get rid of the subtle scrolling when moving from one half of
 *       the screen to the other.
 *   - This setting will be disabled if the map is zoomed in.
 * 
 *   Locked Display X?:
 *   Locked Display Y?:
 *   - What display X/Y value do you want for auto-scroll locked maps?
 *   - Use a number between 0 and 1 for best results.
 * 
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 * 
 *   State Icons Non-Frame:
 *   - Replace sprite frame system for non-frame.
 *   - Better for any instances where icons are zoomed.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 * 
 * These settings also allow you to add scroll bars to scrollable windows,
 * letting the player know how much of the window's contents there are left for
 * scrolling. The scroll bar can be enabled, disabled, have its thickness
 * changed, colors changed, etc.
 *
 * ---
 *
 * Window Defaults
 * 
 *   Enable Masking:
 *   - Enable window masking (windows hide other windows behind them)?
 *   - WARNING: Turning it on can obscure data.
 * 
 *   Correct Skin Bleed:
 *   - Allows you to enable/disable the window skin bleeding correction for
 *     those who wish to use the 95 calculator instead of 96 to augment higher
 *     and larger screen resolutions.
 *   - Read the "Bug Fixes" section if you don't understand what the window
 *     skin bleeding problem is.
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Scroll Bar
 * 
 *   Show Scroll Bar?:
 *   - Show the scroll bar for scrollable windows?
 * 
 *   Thickness:
 *   - How thick do you want the scroll bar to be?
 * 
 *   Offset:
 *   - How much do you want to offset the scroll bar by?
 * 
 *   Bar Body Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Opacity:
 *   - What opacity value do you want the off bar opacity to be?
 *   - Use a number between 0 and 255.
 * 
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
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
 * Version 1.87: February 20, 2025
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Removed picture limit of 100 from Picture-related Plugin Commands.
 * *** Better compatibility with different icon sizes.
 * * Documentation Update!
 * ** Under Plugin Parameters: Menu Button Assist Window
 * *** Added text segments under Split "Escape"
 * **** This means you need to go to your own project's rmmz_core.js and
 *      modify Input.keyMapper to have buttons with "cancel" and "menu"
 *      instead of only "escape".
 * **** If there are none found, an error message will appear telling you to
 *      do so, or set the 'Split "Escape"' option to false.
 * **** If you are using Options Core's Rebind Keyboard option, be sure to
 *      have those have "cancel" and "menu" options inside there, too.
 * * Feature Update!
 * ** Plugin Parameters > Button Assist > Split "Escape" will now show an error
 *    message if a custom Input.keyMapper is not found with the "cancel" and
 *    "menu" keys implemented. Update made by Irina.
 * ** Updated Plugin Parameters > Button Assist > Split "Escape" description
 *    for Plugin Parameters to add in the following text: Requires custom
 *    Input.keyMapper with "cancel" and "menu".
 * ** Added better compatibility with WASD controls as to prioritize showing
 *    the arrow keys rather than the W, A, S, D keys. Also applies to any other
 *    rebindings.
 * 
 * Version 1.86: January 16, 2025
 * * Bug Fixes!
 * ** Fixed an issue where certain icons were not aligning properly at
 *    different line height settings. Fix made by Olivia.
 * 
 * Version 1.85: October 17, 2024
 * * Feature Updates!
 * ** Updated to fit RPG Maker MZ's updated 1.8.1 version better.
 * 
 * Version 1.84: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New notetags added by Arisu:
 * *** Tileset Notetag: <Taller By x: id>
 * **** Changes any page B, C, D, E tile marked by terrain tag 'id' to be
 *      taller by 'x' tiles.
 * **** When placing these tiles on the map, all you have to do is just place
 *      the bottom tile.
 * ***** ie.: For a tree that's one tile taller, just place the tile at the
 *       bottom where you see the trunk. Then, in-game, the tree will appear
 *       taller by one tile as marked.
 * **** O/X layer tiles have a special property where tall sprites standing in
 *      front of it will no longer clip the top of the sprite, while sprites
 *      standing behind it will be covered by it.
 * **** This does not work with events using tiles as graphics. Instead, if
 *      you want to do similar, use the Event & Movement Core's <Tile Expand>
 *      notetags for better control.
 * 
 * Version 1.83: June 13, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated documentation for <param Max: x> notetag.
 * *** This does not set the max cap to be lower than the default cap.
 * * New Feature!
 * ** New Plugin Parameters added by Olivia:
 * *** Plugin Parameters > UI Settings > State Icons Non-Frame
 * **** Replace sprite frame system for non-frame.
 * **** Better for any instances where icons are zoomed.
 * 
 * Version 1.82: April 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added failsafe for $textPopup when some windows have not been initialized
 *    and requesting the text popup.
 * * New Feature!
 * ** New Plugin Parameter and playtest shortcut added by Arisu:
 * *** Plugin Parameters > QoL Settings > Playtest > CTRL + n: Quick Load
 * **** CTRL + a number from 1 to 9 will yield a quick load of that save file.
 * **** Does not count auto saves.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.81: February 15, 2024
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added for future plugin: VisuMZ_2_BattleGridSystem
 * *** <Grid>
 * *** <No Grid>
 * **** Requires the future plugin VisuMZ_2_BattleGridSystem!
 * **** Read the help section for more information on these.
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > Window > Correct Skin Bleed
 * **** Allows you to enable/disable the window skin bleeding correction for
 *      those who wish to use the 95 calculator instead of 96 to augment higher
 *      and larger screen resolutions.
 * **** Read the "Bug Fixes" section if you don't understand what the window
 *      skin bleeding problem is.
 * 
 * Version 1.80: January 18, 2024
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Auto Save After New Game
 * **** Normally, when starting a new game through the "New Game" option, there
 *      is no auto save trigger. However, if you start a new game or load a
 *      saved game, then go to the Game End screen, return back to the title
 *      screen, then start a New Game, the auto save trigger occurs when it
 *      shouldn't. The Core Engine will now patch this and prevent the trigger
 *      from taking place.
 * 
 * Version 1.79: November 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Plugin Command added by Arisu:
 * ** Text Popup: Show Text
 * *** Adds text to a text popup window to briefly appear.
 * *** Multiple text popups will be queued.
 * *** Does not halt the game and works parallel to game activity.
 * 
 * Version 1.78: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia and sponsored by AndyL:
 * *** QoL Settings > Battle Test > Shift+R: Recover All
 * **** For Play Test only! During battle, pressing SHIFT + R will refill the
 *      whole party's HP and MP and status.
 * *** QoL Settings > Battle Test > Shift+T: Full TP
 * **** For Play Test only! During battle, pressing SHIFT + T will refill the
 *      whole party's TP.
 * 
 * Version 1.77: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause the BGS related Plugin Commands to crash.
 *    Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Scroll-Linked Pictures now work if the image file are in a folder within
 *    the img/pictures/ folder without the folder needing a ! at the start.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Picture: Rotate by Angle
 * **** Rotates target picture by a amount angle over a set duration instead of
 *      continuously.
 * **** View help file for more information on the Plugin Command.
 * *** Picture: Rotate to Angle
 * **** Rotates target picture to a certain angle over a set duration instead
 *      of continuously.
 * **** View help file for more information on the Plugin Command.
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Menu Button Assist > General > Split "Escape":
 * **** Used ONLY for those making their own custom keyboard key input maps.
 * **** "Split" option makes separate instances of "Cancel" and "Menu" keys.
 * **** "Don't" option will consolidate both into "Escape" keys.
 * 
 * Version 1.76: June 15, 2023
 * * Bug Fixes!
 * ** Fixed a bug that displayed the incorrect button press key for name input
 *    processing's cancel action. Fix made by Olivia.
 * 
 * Version 1.75: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** In Scene_Name, when using the Keyboard Input, the button assist windows
 *    will no longer display the keyboard shortcuts for Ok and Cancel, but
 *    instead, show them for ENTER and BKSP. Update made by Arisu.
 * ** In Scene_Name, when manual inputting, the Page Up/Dn keys are now
 *    displayed to show changing character pages.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and sponsored by AndyL:
 * *** Params > Keyboard Input > Button Assist > Finish Entry
 * **** Text used to describe finish entry.
 * *** Params > Keyboard Input > Button Assist > Page Change
 * **** Text used to describe changing character pages.
 * *** Params > Window Settings > Scroll Bar
 * **** These settings also allow you to add scroll bars to scrollable windows,
 *      letting the player know how much of the window's contents there are
 *      left for scrolling. The scroll bar can be enabled, disabled, have its
 *      thickness changed, colors changed, etc.
 * 
 * Version 1.74: February 16, 2023
 * * Compatibility Update!
 * ** Plugin Commands for: Audio: Change Current BGM/BGS Volume/Pitch/Pan
 *    should now work properly with the updated RPG Maker MZ version and
 *    WebAudio changes. Update made by Arisu.
 * 
 * Version 1.73: January 20, 2023
 * * Compatibility Update!
 * ** Added better Effekseer version compatibility.
 * 
 * Version 1.72: December 15, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Skill List Active After Party Member Change
 * **** If the skill list is active (ie. the player can move the cursor around)
 *      and the party member currently being viewed is changed via the button
 *      commands, then previously, RPG Maker MZ would still have that window be
 *      active despite having the cursor hidden temporarily. Upon pressing
 *      direction buttons, the cursor reveals itself and both the skill type
 *      window and skill list window are both active, making way for lots of
 *      potential problems to happen.
 * ** Water Tile Bug
 * *** It seems like there's a new bug that occurs if you create a tileset from
 *     scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 *     does is it causes many tiles to become water tiles without intending to.
 *     You can find this out by turning off all the plugins in your project,
 *     putting a Ship or Boat on what are normally ground tiles, and then
 *     seeing the Ship or Boat traverse through it.
 * *** There are two ways to fix this. We cannot fix it through code in this
 *     plugin as it's a problem that involves the tileset json data there are
 *     ways to work around it so that you can get the proper water-flags to go
 *     where they need to be at.
 * **** 1. Copy a working un-bugged tileset onto the currently bugged one and
 *      reapply the tile features like passability, terrain tags, etc. This
 *      will make sure the water-passability tiles get copied over correctly.
 * **** 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *      un-bugged tileset (usually a pre-existing tileset when a new project is
 *      made), click the "Copy Page" button, go to the bugged tileset and press
 *      "Paste Page". You'll have to reapply any different properties like
 *      passabilities and terrain tags, but the water tile flags should now be
 *      working properly.
 * *** The plugin will not fix the problem itself since flag data is delicate
 *     and should not be tampered with midgame as the changes made by the
 *     plugin might not match the desired settings.
 * *** This plugin, however, will also send out an alert message when coming
 *     across such a tile. Pay attention to it and do one of the following two
 *     steps above to fix the problem.
 * * Documentation Update!
 * ** Added "Skill List Active After Party Member Change" section to the
 *    "Important Changes: Bug Fixes" section of the help file.
 * ** Added "Water Tile Bug" section to the "Important Changes: Bug Fixes"
 *    section of the help file.
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Menu Backgrounds > Blur Strength
 * **** Strength used for menu background snapshots.
 * 
 * Version 1.71: November 10, 2022
 * * Bug Fixes!
 * ** Title Command Window should now allow for more than 4 custom commands
 *    without hidden commands. Fix made by Irina.
 * ** Fixed a problem with repeating animations from Visual State Effects
 *    causing softlocks. Fix made by Olivia.
 * 
 * Version 1.70: October 6, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** A texture check will now occur for sprites that are being removed and
 *     destroyed in order to prevent crashes. In the off chance that someone
 *     creates a sprite through a script call and removes it through such, the
 *     likelihood of this occurance becomes higher. This makes the destroy
 *     property take into account a texture check in order to see if the sprite
 *     removal is taking extra steps and will reduce those extra steps.
 * * Documentation Update!
 * ** Added "Sprite Removal and Destroy Crash" section to the "Important
 *    Changes: Bug Fixes" section.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.69: September 8, 2022
 * * Bug Fixes!
 * ** Fixed the combination of Button Assist Location: Top with Help Location:
 *    Bottom combination not working properly. Fix made by Irina.
 * 
 * Version 1.68: August 4, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Olivia and sponsored by Archeia:
 * *** Audio: Change Current BGM Volume
 * *** Audio: Change Current BGM Pitch
 * *** Audio: Change Current BGM Pan
 * *** Audio: Change Current BGS Volume
 * *** Audio: Change Current BGS Pitch
 * *** Audio: Change Current BGS Pan
 * **** Changes the current BGM/BGS volume/pitch/pan without changing any of
 *      the current BGM/BGS's other properties and without restarting BGM/BGS.
 * 
 * Version 1.67: July 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added notes for Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * *** This setting will be disabled if the map is zoomed in.
 * * New Features!
 * ** New map notetags added by Irina and sponsored by AndyL:
 * *** <Scroll Lock X>
 * *** <Scroll Lock X: x>
 * *** <Scroll Lock Y>
 * *** <Scroll Lock Y: y>
 * **** Causes the map to not scroll left/right(x) or up/down(y). Useful for
 *      when maps are just slightly smaller than normal and the tiny scrolling
 *      is distracting.
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small X?
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small Y?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display X?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display Y?
 * **** Automatically scroll locks small maps to prevent them from scrolling
 *      horizontally/vertically. Useful for 1280x720 resolutions when the map
 *      is 27 tiles wide. This will get rid of the subtle scrolling when moving
 *      from one half of the screen to the other.
 * **** This setting will be disabled if the map is zoomed in.
 * * Feature Update!
 * ** Warnings added to Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 * Version 1.66: July 14, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Debug Console Refresh Bug
 * **** When pressing F5 to refresh while the debug console (DevTools) is open,
 *      some graphics will fail to load properly. This started occurring since
 *      the RPG Maker MZ 1.5.0 update and the code for loading the images has
 *      now been reverted to the 1.4.4 version where it was last stable.
 * * Documentation Update!
 * ** Help file updated for new major bug fix.
 * 
 * Version 1.65: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Parameter Settings > Show Actor Level?
 * **** Show the actor level when displaying actors?
 * **** Used for most windows in-game.
 * 
 * Version 1.64: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Debug: Current Controller ID
 * **** PLAY TEST ONLY. Shows current controller ID in debug console.
 * **** Also copies to computer clipboard if possible.
 * ** New Plugin Parameters made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Subsettings for Button Assist Window: Controller Button Assist
 * **** These are sub-settings for the Button Assist Window Plugin Parameters.
 *      Where the Button Assist Window Plugin Parameters are focused on
 *      keyboard entries, these sections are focused on gamepad controllers.
 * **** Add multiple gamepads to the list to give them different button assist
 *      text. If a gamepad is being used but not listed here, the button assist
 *      text will default to the keyboard version.
 * 
 * Version 1.63: May 2, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > QoL Settings > Misc > Map Name Text Code
 * **** If on, map names will use text codes.
 * **** If off, only the raw map name will be used.
 * * Feature Update!
 * ** The map name text code change will no longer be on forcefully. It is now
 *    something that can be toggled by Plugin Parameters. Update by Irina.
 * 
 * Version 1.62: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu and sponsored by Archeia:
 * *** Variable: JS Eval
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows one line of code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * *** Variable: JS Block
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows JS block code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * ** Map names can now use text codes. Made by Arisu and sponsored by Archeia.
 * 
 * Version 1.61: April 21, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Battle Forced End Action Crash
 * **** Depending on various circumstances, currently active battlers can be
 *      cleared from the battle system at will due to a number of reasons.
 *      However, if it just so happens that the targets are cleared, too, with
 *      actions remaining, then a crash will follow up. This plugin will
 *      prevent that change. Fix made by Olivia.
 * 
 * Version 1.60: April 14, 2022
 * * Bug Fixes!
 * ** Number Input window will now respond to Home/End keys properly.
 *    Fix made by Olivia.
 * 
 * Version 1.59: April 7, 2022
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.4 compatibility update!
 * *** "Shutdown" command should now be more compatible with other aspects of
 *     the client when running from Node JS client on other OS's.
 * 
 * Version 1.58: March 24, 2022
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.57: March 3, 2022
 * * Compatibility Update!
 * ** The "Shutdown" command from the title screen should now be compatible
 *    with RPG Maker MZ 1.4.4 and up. Update made by Olivia.
 * 
 * Version 1.56: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Arisu and sponsored by Anon:
 * *** Plugin Parameters > QoL > Misc > Shortcut Scripts
 * **** Enables shortcut-based script variables and functions that can be used
 *      for script calls.
 * **** Shortcut list enabled for this is as follows:
 * ***** $commonEvent(id), $onceParallel(id), $scene, $spriteset, $subject, 
 *       $targets, $target, $event
 * ***** For more information on how to use them, review the help file.
 * 
 * Version 1.55: January 27, 2022
 * * Feature Update!
 * ** Once Parallels for the map are now able to update even while other events
 *    are running. Update made by Arisu.
 * 
 * Version 1.54: January 13, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Overly-Protective Substitute
 * *** When an ally with critical health is being targeted by a friendly non-
 *     Certain Hit skill (such as a heal or buff) and another ally has the
 *     substitute state, the other ally would "protect" the originally targeted
 *     ally and take the heal or buff.
 * *** The new changed behavior is that now, substitute will not trigger for
 *     any actions whose scope targets allies.
 * *** Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new MZ Bug: Overly-Protective Substitute.
 * * Feature Update!
 * ** Added a failsafe for those who did not update the plugin parameter
 *    settings and are using MV Animations.
 * 
 * Version 1.53: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <Rate: x>
 * **** Allows you to adjust the update for this MV Animation.
 * ***** Does NOT work with Effekseer animations.
 * **** The lower the number, the faster.
 * **** Replace 'x' with a number representing the animation update rate.
 * ***** Default rate: 4.
 * ***** Minimum rate: 1.
 * ***** Maximum rate: 10.
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Qualify of Life Settings > MV Animation Rate
 * **** Adjusts the rate at which MV animations play.
 * **** Default: 4. Lower for faster. Higher for slower.
 * * Optimization Update!
 * ** MV Animations should run more optimized.
 * 
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 * 
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
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
 * @command Separator_Animation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Audio
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmVolume
 * @text Audio: Change Current BGM Volume
 * @desc Changes the current BGM volume without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGM's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPitch
 * @text Audio: Change Current BGM Pitch
 * @desc Changes the current BGM pitch without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGM's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPan
 * @text Audio: Change Current BGM Pan
 * @desc Changes the current BGM pan without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGM's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsVolume
 * @text Audio: Change Current BGS Volume
 * @desc Changes the current BGS volume without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGS's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPitch
 * @text Audio: Change Current BGS Pitch
 * @desc Changes the current BGS pitch without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGS's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPan
 * @text Audio: Change Current BGS Pan
 * @desc Changes the current BGS pan without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGS's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Debug
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DebugConsoleLastControllerID
 * @text Debug: Current Controller ID
 * @desc PLAY TEST ONLY. Shows current controller ID in debug console.
 * Also copies to computer clipboard if possible.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Export
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Game
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Gold
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold. You may use JS.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Map
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotateBy
 * @text Picture: Rotate By Angle
 * @desc Rotates target picture by a amount angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg AdjustAngle:eval
 * @text Adjust Angle
 * @desc What is the angle you wish to rotate the picture by?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotate
 * @text Picture: Rotate to Angle
 * @desc Rotates target picture to a certain angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg TargetAngle:eval
 * @text Target Angle
 * @desc What is the target angle you wish to rotate the picture?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ScreenShake
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Switch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_TextPopup
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TextPopupShow
 * @text Text Popup: Show Text
 * @desc Adds text to a text popup window to briefly appear.
 * Multiple text popups will be queued.
 *
 * @arg text:json
 * @text Text
 * @type note
 * @desc Write the text that you want to appear here.
 * You may use text codes.
 * @default "Insert message here."
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Variable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableEvalReference
 * @text Variable: JS Eval
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:eval
 * @text Variable ID
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 1
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:eval
 * @text Operand Modifier
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableJsBlock
 * @text Variable: JS Block
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:func
 * @text Variable ID
 * @type note
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet varID = 1;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn varID;"
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:func
 * @text Operand Modifier
 * @type note
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet value = 0;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn value;"
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
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","BattleTest":"","BTestItems:eval":"true","BTestWeapons:eval":"true","BTestArmors:eval":"true","BTestAddedQuantity:num":"90","ShiftR_Toggle:eval":"true","ShiftT_Toggle:eval":"true","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Pictures":"","AntiZoomPictures:eval":"true","PictureContainers":"","DetachBattlePictureContainer:eval":"false","DetachMapPictureContainer:eval":"false","Misc":"","AnimationMirrorOffset:eval":"false","AutoStretch:str":"default","FontShadows:eval":"false","FontSmoothing:eval":"true","FontWidthFix:eval":"true","KeyItemProtect:eval":"true","MapNameTextCode:eval":"true","ModernControls:eval":"true","MvAnimationRate:num":"4","NewGameCommonEventAll:num":"0","NoTileShadows:eval":"false","PixelateImageRendering:eval":"false","RequireFocus:eval":"false","ShortcutScripts:eval":"true","SmartEventCollisionPriority:eval":"true","SubfolderParse:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param ControllerButtons:arraystruct
 * @text Controller Button Assist
 * @parent ButtonAssist:struct
 * @type struct<ControllerButtons>[]
 * @desc Make different icons appear for the Button Assist window when using different controllers.
 * @default []
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Maps":"","AutoScrollLockX:eval":"true","AutoScrollLockY:eval":"true","DisplayLockX:num":"0.15625","DisplayLockY:num":"0.00000","Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4","ScrollBar":"","ShowScrollBar:eval":"true","BarThickness:num":"2","BarOffset:num":"+2","BarBodyColor:str":"0","OffBarColor:str":"7","OffBarOpacity:num":"128","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","TextPopup":"","DurationPerChat:num":"1.5","MinDuration:num":"90","MaxDuration:num":"300"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomBetween(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param CtrlQuickLoad:eval
 * @text CTRL + n: Quick Load
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc CTRL + a number from 1 to 9 will yield a quick load of
 * that safe file. Does not count auto saves.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param ShiftR_Toggle:eval
 * @text Shift+R: Recover All
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + R will refill the whole party's HP and MP and status.
 * @default true
 *
 * @param ShiftT_Toggle:eval
 * @text Shift+T: Full TP
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + T will refill the whole party's TP.
 * @default true
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Pictures
 * @text Picture-Related
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Pictures
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 * 
 * @param PictureContainers
 * @text Picture Containers
 * @parent Pictures
 *
 * @param DetachBattlePictureContainer:eval
 * @text Detach in Battle
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the battle scene.
 * @default false
 *
 * @param DetachMapPictureContainer:eval
 * @text Detach in Map
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the map scene.
 * @default false
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param MapNameTextCode:eval
 * @text Map Name Text Code
 * @parent Misc
 * @type boolean
 * @on Text Codes
 * @off Raw Text
 * @desc If on, map names will use text codes.
 * If off, only the raw map name will be used.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param MvAnimationRate:num
 * @text MV Animation Rate
 * @parent Misc
 * @min 1
 * @max 10
 * @desc Adjusts the rate at which MV animations play.
 * Default: 4. Lower for faster. Higher for slower.
 * @default 4
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param ShortcutScripts:eval
 * @text Shortcut Scripts
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables shortcut-based scripts.
 * View the helpfile for more information.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Finish:str
 * @text Finish Entry
 * @parent ButtonAssist
 * @desc Text used to describe finish entry.
 * @default Finish
 * 
 * @param PageChange:str
 * @text Page Change
 * @parent ButtonAssist
 * @desc Text used to describe character page changing.
 * @default Page
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 * 
 * @param BlurStrength:num
 * @text Blur Strength
 * @desc Strength used for menu background snapshots.
 * Default: 8. Higher is stronger. Lower is weaker.
 * @default 8
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SplitEscape:eval
 * @text Split "Escape"
 * @parent General
 * @type boolean
 * @on Split
 * @off Don't
 * @desc "Split" makes separate instances of "Cancel" and "Menu".
 * Requires custom Input.keyMapper with "cancel" and "menu".
 * @default false
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Controller Buttons Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ControllerButtons:
 *
 * @param ID
 * @text ID Information
 *
 * @param Name:str
 * @text Controller ID Name
 * @parent ID
 * @desc Exact string used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 *
 * @param Match:str
 * @text Similarity Match
 * @parent ID
 * @desc Similar text used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 * 
 * @param Directions
 *
 * @param up:str
 * @text Up
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param left:str
 * @text Left
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param right:str
 * @text Right
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param down:str
 * @text Down
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 * 
 * @param Actions
 *
 * @param ok:str
 * @text OK
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param cancel:str
 * @text Cancel
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param menu:str
 * @text Menu
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param shift:str
 * @text Shift
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pageup:str
 * @text Page Up
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pagedown:str
 * @text Page Down
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param ShowActorLevel:eval
 * @text Show Actor Level?
 * @parent BasicParameters
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor level when displaying actors?
 * Affects for most windows in-game.
 * @default true
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param StateIconsNonFrame:eval
 * @text State Icons Non-Frame
 * @parent UIArea
 * @type boolean
 * @on Non-Frame
 * @off Normal
 * @desc Replace sprite frame system for non-frame.
 * Better for any instances where icons are zoomed.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param CorrectSkinBleeding:eval
 * @text Correct Skin Bleed
 * @parent WindowDefaults
 * @type boolean
 * @on Correct
 * @off Don't Correct
 * @desc Corrects window skin bleeding bug when used with higher
 * screen resolutions?
 * @default true
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36. Avoid using odd numbers.
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param ScrollBar
 * @text Scroll Bar
 *
 * @param ShowScrollBar:eval
 * @text Show Scroll Bar?
 * @parent ScrollBar
 * @type boolean
 * @on Show Scroll Bar
 * @off Don't Show
 * @desc Show the scroll bar for scrollable windows?
 * @default true
 *
 * @param BarThickness:num
 * @text Thickness
 * @parent ScrollBar
 * @type number
 * @min 1
 * @desc How thick do you want the scroll bar to be?
 * @default 2
 *
 * @param BarOffset:num
 * @text Offset
 * @parent ScrollBar
 * @desc How much do you want to offset the scroll bar by?
 * @default +2
 *
 * @param BarBodyColor:str
 * @text Bar Body Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param OffBarColor:str
 * @text Off Bar Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param OffBarOpacity:num
 * @text Off Bar Opacity
 * @parent ScrollBar
 * @type number
 * @min 1
 * @max 255
 * @desc What opacity value do you want the off bar opacity
 * to be? Use a number between 0 and 255.
 * @default 128
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No Backgrounds
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 *
 * @param TextPopup
 * @text Text Popup Window
 *
 * @param DurationPerChat:num
 * @text Duration Per Text
 * @parent TextPopup
 * @desc What is the increase in duration per text character?
 * @default 1.5
 *
 * @param MinDuration:num
 * @text Minimum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Minimum duration for window to stay on the screen.
 * @default 90
 *
 * @param MaxDuration:num
 * @text Maximum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Maximum duration for window to stay on the screen.
 * @default 300
 * 
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Maps
 * 
 * @param AutoScrollLockX:eval
 * @text Scroll Lock Small X?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock X scrolling if the map is too small?
 * @default true
 * 
 * @param AutoScrollLockY:eval
 * @text Scroll Lock Small Y?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock Y scrolling if the map is too small?
 * @default true
 * 
 * @param DisplayLockX:num
 * @text Locked Display X?
 * @parent Maps
 * @desc What display X value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.15625
 * 
 * @param DisplayLockY:num
 * @text Locked Display Y?
 * @parent Maps
 * @desc What display Y value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.00000
 * 
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x55f97b=_0x2f79;(function(_0x1c9071,_0x557b4d){const _0x4f18ea=_0x2f79,_0x484c13=_0x1c9071();while(!![]){try{const _0x575e35=-parseInt(_0x4f18ea(0x8cf))/0x1+-parseInt(_0x4f18ea(0x8b3))/0x2+parseInt(_0x4f18ea(0x738))/0x3+-parseInt(_0x4f18ea(0x341))/0x4+-parseInt(_0x4f18ea(0x1a3))/0x5+-parseInt(_0x4f18ea(0x895))/0x6*(-parseInt(_0x4f18ea(0x948))/0x7)+parseInt(_0x4f18ea(0x4b9))/0x8;if(_0x575e35===_0x557b4d)break;else _0x484c13['push'](_0x484c13['shift']());}catch(_0x28b938){_0x484c13['push'](_0x484c13['shift']());}}}(_0x10b9,0x7560f));var label='CoreEngine',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x55f97b(0x217)](function(_0x22af9c){const _0x778d33=_0x55f97b;return _0x22af9c[_0x778d33(0x59d)]&&_0x22af9c['description'][_0x778d33(0x3e4)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ[_0x55f97b(0x1dc)]=function(_0x5e0e53,_0x52ce14){const _0x2906d1=_0x55f97b;for(const _0x23dbe8 in _0x52ce14){if(_0x23dbe8[_0x2906d1(0x4f2)](/(.*):(.*)/i)){const _0x495c65=String(RegExp['$1']),_0x4e404a=String(RegExp['$2'])[_0x2906d1(0x427)]()[_0x2906d1(0x8e9)]();let _0x56b692,_0x558903,_0x525133;switch(_0x4e404a){case'NUM':_0x56b692=_0x52ce14[_0x23dbe8]!==''?Number(_0x52ce14[_0x23dbe8]):0x0;break;case _0x2906d1(0x54a):_0x558903=_0x52ce14[_0x23dbe8]!==''?JSON[_0x2906d1(0x401)](_0x52ce14[_0x23dbe8]):[],_0x56b692=_0x558903[_0x2906d1(0x5f9)](_0x2ab5de=>Number(_0x2ab5de));break;case _0x2906d1(0x8af):_0x56b692=_0x52ce14[_0x23dbe8]!==''?eval(_0x52ce14[_0x23dbe8]):null;break;case _0x2906d1(0x23e):_0x558903=_0x52ce14[_0x23dbe8]!==''?JSON[_0x2906d1(0x401)](_0x52ce14[_0x23dbe8]):[],_0x56b692=_0x558903['map'](_0x39bd55=>eval(_0x39bd55));break;case _0x2906d1(0x741):_0x56b692=_0x52ce14[_0x23dbe8]!==''?JSON[_0x2906d1(0x401)](_0x52ce14[_0x23dbe8]):'';break;case _0x2906d1(0x1fd):_0x558903=_0x52ce14[_0x23dbe8]!==''?JSON['parse'](_0x52ce14[_0x23dbe8]):[],_0x56b692=_0x558903['map'](_0x5b6178=>JSON[_0x2906d1(0x401)](_0x5b6178));break;case _0x2906d1(0x68f):_0x56b692=_0x52ce14[_0x23dbe8]!==''?new Function(JSON['parse'](_0x52ce14[_0x23dbe8])):new Function(_0x2906d1(0x4ff));break;case _0x2906d1(0x497):_0x558903=_0x52ce14[_0x23dbe8]!==''?JSON['parse'](_0x52ce14[_0x23dbe8]):[],_0x56b692=_0x558903['map'](_0x284ebc=>new Function(JSON['parse'](_0x284ebc)));break;case _0x2906d1(0x559):_0x56b692=_0x52ce14[_0x23dbe8]!==''?String(_0x52ce14[_0x23dbe8]):'';break;case _0x2906d1(0x45b):_0x558903=_0x52ce14[_0x23dbe8]!==''?JSON[_0x2906d1(0x401)](_0x52ce14[_0x23dbe8]):[],_0x56b692=_0x558903['map'](_0x3d2e1f=>String(_0x3d2e1f));break;case'STRUCT':_0x525133=_0x52ce14[_0x23dbe8]!==''?JSON[_0x2906d1(0x401)](_0x52ce14[_0x23dbe8]):{},_0x5e0e53[_0x495c65]={},VisuMZ[_0x2906d1(0x1dc)](_0x5e0e53[_0x495c65],_0x525133);continue;case _0x2906d1(0x2fa):_0x558903=_0x52ce14[_0x23dbe8]!==''?JSON[_0x2906d1(0x401)](_0x52ce14[_0x23dbe8]):[],_0x56b692=_0x558903[_0x2906d1(0x5f9)](_0x4ec504=>VisuMZ[_0x2906d1(0x1dc)]({},JSON[_0x2906d1(0x401)](_0x4ec504)));break;default:continue;}_0x5e0e53[_0x495c65]=_0x56b692;}}return _0x5e0e53;},VisuMZ['CoreEngine'][_0x55f97b(0x485)]=SceneManager['exit'],SceneManager[_0x55f97b(0x878)]=function(){const _0x4aa1e1=_0x55f97b;VisuMZ['CoreEngine'][_0x4aa1e1(0x485)][_0x4aa1e1(0x8a8)](this);if(Utils['RPGMAKER_VERSION']>='1.4.4'){if(typeof nw===_0x4aa1e1(0x5c9))nw[_0x4aa1e1(0x978)]['quit']();}},(_0x477677=>{const _0x20695b=_0x55f97b,_0x226938=_0x477677[_0x20695b(0x1bc)];for(const _0x517fb9 of dependencies){if(!Imported[_0x517fb9]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x20695b(0x55a)](_0x226938,_0x517fb9)),SceneManager[_0x20695b(0x878)]();break;}}const _0x37abf0=_0x477677[_0x20695b(0x3ec)];if(_0x37abf0[_0x20695b(0x4f2)](/\[Version[ ](.*?)\]/i)){const _0x4f8617=Number(RegExp['$1']);_0x4f8617!==VisuMZ[label]['version']&&(alert(_0x20695b(0x74c)['format'](_0x226938,_0x4f8617)),SceneManager[_0x20695b(0x878)]());}if(_0x37abf0[_0x20695b(0x4f2)](/\[Tier[ ](\d+)\]/i)){const _0x450b26=Number(RegExp['$1']);_0x450b26<tier?(alert(_0x20695b(0x81a)['format'](_0x226938,_0x450b26,tier)),SceneManager[_0x20695b(0x878)]()):tier=Math[_0x20695b(0x1fb)](_0x450b26,tier);}VisuMZ[_0x20695b(0x1dc)](VisuMZ[label]['Settings'],_0x477677[_0x20695b(0x87d)]);})(pluginData),((()=>{const _0xd5f9de=_0x55f97b;if(VisuMZ['CoreEngine'][_0xd5f9de(0x386)][_0xd5f9de(0x585)][_0xd5f9de(0x8a3)]??!![])for(const _0x2b9c50 in $plugins){const _0x504e19=$plugins[_0x2b9c50];_0x504e19[_0xd5f9de(0x1bc)][_0xd5f9de(0x4f2)](/(.*)\/(.*)/i)&&(_0x504e19[_0xd5f9de(0x1bc)]=String(RegExp['$2']['trim']()));}})()),PluginManager['registerCommand'](pluginData['name'],'AnimationPoint',_0x545699=>{const _0x2deb0f=_0x55f97b;if(!SceneManager[_0x2deb0f(0x49f)])return;if(!SceneManager[_0x2deb0f(0x49f)][_0x2deb0f(0x891)])return;VisuMZ[_0x2deb0f(0x1dc)](_0x545699,_0x545699);const _0x3e7162=Math[_0x2deb0f(0x7dd)](_0x545699[_0x2deb0f(0x231)]),_0x293729=Math[_0x2deb0f(0x7dd)](_0x545699[_0x2deb0f(0x965)]);$gameTemp[_0x2deb0f(0x722)](_0x3e7162,_0x293729,_0x545699['AnimationID'],_0x545699[_0x2deb0f(0x3f1)],_0x545699['Mute']);}),PluginManager[_0x55f97b(0x77a)](pluginData['name'],_0x55f97b(0x241),_0xdd69cf=>{const _0x12bc7c=_0x55f97b;VisuMZ[_0x12bc7c(0x1dc)](_0xdd69cf,_0xdd69cf);const _0xc20d86=Math[_0x12bc7c(0x7dd)](_0xdd69cf[_0x12bc7c(0x909)])[_0x12bc7c(0x60e)](0x0,0x64),_0x54557c=AudioManager[_0x12bc7c(0x785)];_0x54557c&&(_0x54557c[_0x12bc7c(0x909)]=_0xc20d86,_0x54557c[_0x12bc7c(0x8ff)]=AudioManager[_0x12bc7c(0x1cd)][_0x12bc7c(0x6c5)](),AudioManager['updateBgmParameters'](_0x54557c),AudioManager['playBgm'](_0x54557c,_0x54557c['pos']),AudioManager['_bgmBuffer'][_0x12bc7c(0x4e3)](_0x54557c[_0x12bc7c(0x8ff)]));}),PluginManager[_0x55f97b(0x77a)](pluginData[_0x55f97b(0x1bc)],_0x55f97b(0x7d5),_0x27b354=>{const _0x3c5d2f=_0x55f97b;VisuMZ[_0x3c5d2f(0x1dc)](_0x27b354,_0x27b354);const _0x4e8a03=Math[_0x3c5d2f(0x7dd)](_0x27b354[_0x3c5d2f(0x4cf)])[_0x3c5d2f(0x60e)](0x32,0x96),_0x34346a=AudioManager[_0x3c5d2f(0x785)];_0x34346a&&(_0x34346a['pitch']=_0x4e8a03,_0x34346a[_0x3c5d2f(0x8ff)]=AudioManager[_0x3c5d2f(0x1cd)][_0x3c5d2f(0x6c5)](),AudioManager[_0x3c5d2f(0x953)](_0x34346a),AudioManager[_0x3c5d2f(0x652)](_0x34346a,_0x34346a[_0x3c5d2f(0x8ff)]),AudioManager['_bgmBuffer'][_0x3c5d2f(0x4e3)](_0x34346a[_0x3c5d2f(0x8ff)]));}),PluginManager['registerCommand'](pluginData['name'],_0x55f97b(0x4a4),_0x5570c0=>{const _0x220f4b=_0x55f97b;VisuMZ[_0x220f4b(0x1dc)](_0x5570c0,_0x5570c0);const _0x1fb507=Math[_0x220f4b(0x7dd)](_0x5570c0[_0x220f4b(0x8e1)])['clamp'](-0x64,0x64),_0x5a3b14=AudioManager[_0x220f4b(0x785)];_0x5a3b14&&(_0x5a3b14['pan']=_0x1fb507,_0x5a3b14[_0x220f4b(0x8ff)]=AudioManager[_0x220f4b(0x1cd)][_0x220f4b(0x6c5)](),AudioManager[_0x220f4b(0x953)](_0x5a3b14),AudioManager[_0x220f4b(0x652)](_0x5a3b14,_0x5a3b14['pos']),AudioManager[_0x220f4b(0x1cd)][_0x220f4b(0x4e3)](_0x5a3b14['pos']));}),PluginManager[_0x55f97b(0x77a)](pluginData[_0x55f97b(0x1bc)],_0x55f97b(0x515),_0x4de0fb=>{const _0x57c5d6=_0x55f97b;VisuMZ[_0x57c5d6(0x1dc)](_0x4de0fb,_0x4de0fb);const _0x302930=Math[_0x57c5d6(0x7dd)](_0x4de0fb[_0x57c5d6(0x909)])['clamp'](0x0,0x64),_0x2c433f=AudioManager[_0x57c5d6(0x270)];_0x2c433f&&(_0x2c433f[_0x57c5d6(0x909)]=_0x302930,_0x2c433f[_0x57c5d6(0x8ff)]=AudioManager['_bgsBuffer'][_0x57c5d6(0x6c5)](),AudioManager[_0x57c5d6(0x5de)](_0x2c433f),AudioManager[_0x57c5d6(0x2ff)](_0x2c433f,_0x2c433f['pos']),AudioManager['_bgsBuffer'][_0x57c5d6(0x4e3)](_0x2c433f['pos']));}),PluginManager[_0x55f97b(0x77a)](pluginData[_0x55f97b(0x1bc)],'AudioChangeBgsPitch',_0x2d5772=>{const _0x1b7532=_0x55f97b;VisuMZ['ConvertParams'](_0x2d5772,_0x2d5772);const _0x565037=Math[_0x1b7532(0x7dd)](_0x2d5772['pitch'])[_0x1b7532(0x60e)](0x32,0x96),_0x536918=AudioManager[_0x1b7532(0x270)];_0x536918&&(_0x536918[_0x1b7532(0x4cf)]=_0x565037,_0x536918[_0x1b7532(0x8ff)]=AudioManager['_bgsBuffer'][_0x1b7532(0x6c5)](),AudioManager[_0x1b7532(0x5de)](_0x536918),AudioManager[_0x1b7532(0x2ff)](_0x536918,_0x536918[_0x1b7532(0x8ff)]),AudioManager['_bgsBuffer'][_0x1b7532(0x4e3)](_0x536918[_0x1b7532(0x8ff)]));}),PluginManager[_0x55f97b(0x77a)](pluginData[_0x55f97b(0x1bc)],_0x55f97b(0x6bd),_0xa1010e=>{const _0x4bf4ec=_0x55f97b;VisuMZ['ConvertParams'](_0xa1010e,_0xa1010e);const _0x32ffae=Math['round'](_0xa1010e[_0x4bf4ec(0x8e1)])[_0x4bf4ec(0x60e)](-0x64,0x64),_0x23b823=AudioManager[_0x4bf4ec(0x270)];_0x23b823&&(_0x23b823[_0x4bf4ec(0x8e1)]=_0x32ffae,_0x23b823[_0x4bf4ec(0x8ff)]=AudioManager[_0x4bf4ec(0x7f3)][_0x4bf4ec(0x6c5)](),AudioManager[_0x4bf4ec(0x5de)](_0x23b823),AudioManager[_0x4bf4ec(0x2ff)](_0x23b823,_0x23b823[_0x4bf4ec(0x8ff)]),AudioManager[_0x4bf4ec(0x7f3)][_0x4bf4ec(0x4e3)](_0x23b823[_0x4bf4ec(0x8ff)]));}),PluginManager[_0x55f97b(0x77a)](pluginData[_0x55f97b(0x1bc)],'DebugConsoleLastControllerID',_0x3cdc66=>{const _0x2678f9=_0x55f97b;if(!$gameTemp[_0x2678f9(0x206)]())return;const _0xf8f1b4=Input[_0x2678f9(0x69c)]();console[_0x2678f9(0x84b)](_0xf8f1b4);}),PluginManager[_0x55f97b(0x77a)](pluginData[_0x55f97b(0x1bc)],_0x55f97b(0x7b2),_0x2fd5bb=>{const _0x4677ec=_0x55f97b;if(!$gameTemp[_0x4677ec(0x206)]())return;if(!Utils[_0x4677ec(0x28b)]())return;SceneManager['_scene'][_0x4677ec(0x321)]=![],VisuMZ[_0x4677ec(0x4af)][_0x4677ec(0x313)]();}),PluginManager[_0x55f97b(0x77a)](pluginData[_0x55f97b(0x1bc)],_0x55f97b(0x76a),_0x555a7b=>{const _0x129d80=_0x55f97b;if(!$gameTemp['isPlaytest']())return;if(!Utils['isNwjs']())return;SceneManager[_0x129d80(0x49f)][_0x129d80(0x321)]=![],VisuMZ[_0x129d80(0x4af)][_0x129d80(0x3ae)]();}),PluginManager[_0x55f97b(0x77a)](pluginData[_0x55f97b(0x1bc)],_0x55f97b(0x249),_0x1cc765=>{const _0x2046d4=_0x55f97b;if(!$gameTemp[_0x2046d4(0x206)]())return;if(!Utils[_0x2046d4(0x28b)]())return;if(!$gameMap)return;if($gameMap['mapId']()<=0x0)return;VisuMZ[_0x2046d4(0x1dc)](_0x1cc765,_0x1cc765);const _0x3687aa=_0x2046d4(0x83f)[_0x2046d4(0x55a)]($gameMap[_0x2046d4(0x314)]()[_0x2046d4(0x96b)](0x3)),_0x3bac03=VisuMZ[_0x2046d4(0x4af)][_0x2046d4(0x746)]($gameMap[_0x2046d4(0x314)]());VisuMZ['CoreEngine']['ExportString'](_0x3bac03,_0x3687aa,!![]);}),PluginManager[_0x55f97b(0x77a)](pluginData['name'],'ExportCurTroopText',_0x4fec8e=>{const _0x448268=_0x55f97b;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x448268(0x28b)]())return;if(!$gameParty[_0x448268(0x4d5)]())return;VisuMZ['ConvertParams'](_0x4fec8e,_0x4fec8e);const _0x1c933b=_0x448268(0x80c)['format']($gameTroop[_0x448268(0x2ec)]['padZero'](0x4)),_0x69c9f9=VisuMZ[_0x448268(0x4af)][_0x448268(0x7f4)]($gameTroop[_0x448268(0x2ec)]);VisuMZ[_0x448268(0x4af)]['ExportString'](_0x69c9f9,_0x1c933b,!![]);}),VisuMZ['CoreEngine']['ExportString']=function(_0x5f51f6,_0x5213a2,_0x3732ce){const _0x65ba4=_0x55f97b,_0x424e2=require('fs');let _0x32a332=_0x65ba4(0x59f)[_0x65ba4(0x55a)](_0x5213a2||'0');_0x424e2['writeFile'](_0x32a332,_0x5f51f6,_0x88d729=>{const _0x405e84=_0x65ba4;if(_0x88d729)throw err;else _0x3732ce&&alert(_0x405e84(0x525)[_0x405e84(0x55a)](_0x32a332));});},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x313)]=function(){const _0x396513=_0x55f97b,_0x437b69=[];for(const _0x1c186f of $dataMapInfos){if(!_0x1c186f)continue;_0x437b69[_0x396513(0x35b)](_0x1c186f['id']);}const _0x25ca37=_0x437b69['length']*0x64+Math[_0x396513(0x793)](0x64);alert(_0x396513(0x257)[_0x396513(0x55a)](_0x25ca37)),this[_0x396513(0x848)]=[],this['_currentMap']=$dataMap;for(const _0x106845 of _0x437b69){VisuMZ[_0x396513(0x4af)][_0x396513(0x6b7)](_0x106845);}setTimeout(VisuMZ[_0x396513(0x4af)][_0x396513(0x805)][_0x396513(0x5cb)](this),_0x25ca37);},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x6b7)]=function(_0x540b71){const _0x472f10=_0x55f97b,_0x2f0c7c='Map%1.json'[_0x472f10(0x55a)](_0x540b71[_0x472f10(0x96b)](0x3)),_0xe5c375=new XMLHttpRequest(),_0x2283d0=_0x472f10(0x4c9)+_0x2f0c7c;_0xe5c375[_0x472f10(0x4f8)](_0x472f10(0x85c),_0x2283d0),_0xe5c375[_0x472f10(0x8c6)]('application/json'),_0xe5c375[_0x472f10(0x236)]=()=>this['storeMapData'](_0xe5c375,_0x540b71,_0x2f0c7c,_0x2283d0),_0xe5c375[_0x472f10(0x66f)]=()=>DataManager[_0x472f10(0x220)](_0x472f10(0x896),_0x2f0c7c,_0x2283d0),_0xe5c375['send']();},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x8cd)]=function(_0x5e6cc8,_0x5a15f9,_0x17a5f2,_0x5078f0){const _0xf82e=_0x55f97b;$dataMap=JSON[_0xf82e(0x401)](_0x5e6cc8['responseText']),DataManager[_0xf82e(0x316)]($dataMap),this[_0xf82e(0x848)][_0x5a15f9]=VisuMZ[_0xf82e(0x4af)][_0xf82e(0x746)](_0x5a15f9),$dataMap=this[_0xf82e(0x7ea)];},VisuMZ[_0x55f97b(0x4af)]['exportAllMapStrings']=function(){const _0x1eced8=_0x55f97b,_0x8a3e9a=_0x1eced8(0x683);this[_0x1eced8(0x848)]['remove'](undefined)[_0x1eced8(0x7a7)]('')['remove'](null);const _0x2cfb6a=this['_storedMapText'][_0x1eced8(0x724)](_0x1eced8(0x2b1))['trim']();VisuMZ[_0x1eced8(0x4af)]['ExportString'](_0x2cfb6a,_0x8a3e9a,!![]),SceneManager[_0x1eced8(0x49f)][_0x1eced8(0x321)]=!![];},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x746)]=function(_0xb46959){const _0x4d1e3e=_0x55f97b;if(!$dataMap)return'';let _0x25c30b='█'['repeat'](0x46)+'\x0a\x0a',_0x474489='═'[_0x4d1e3e(0x556)](0x46)+'\x0a\x0a',_0x32ad2b='';this['_commonEventLayers']=0x0;for(const _0x12e055 of $dataMap[_0x4d1e3e(0x7ee)]){if(!_0x12e055)continue;let _0x2124a8=_0x12e055['id'],_0x3b5c58=_0x12e055[_0x4d1e3e(0x1bc)],_0x2e4d06=_0x12e055['pages'];for(const _0x566ee9 of _0x2e4d06){const _0x3ccbb0=_0x2e4d06['indexOf'](_0x566ee9)+0x1;let _0x1878be=_0x474489+_0x4d1e3e(0x778),_0x3bfcc4=VisuMZ[_0x4d1e3e(0x4af)]['ExtractStrFromList'](_0x566ee9[_0x4d1e3e(0x255)]);if(_0x3bfcc4['length']>0x0){if(_0x32ad2b[_0x4d1e3e(0x382)]>0x0)_0x32ad2b+=_0x474489+_0x4d1e3e(0x2b1);else{const _0x2037b1=$dataMapInfos[_0xb46959]['name'];_0x32ad2b+=_0x25c30b+_0x4d1e3e(0x493)[_0x4d1e3e(0x55a)](_0xb46959,_0x2037b1||'Unnamed')+_0x25c30b;}_0x32ad2b+=_0x1878be[_0x4d1e3e(0x55a)](_0x2124a8,_0x3b5c58,_0x3ccbb0,_0x3bfcc4);}}}return _0x32ad2b[_0x4d1e3e(0x382)]>0x0&&(_0x32ad2b+=_0x474489),_0x32ad2b;},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x3ae)]=function(){const _0x7d9cd4=_0x55f97b,_0x489594=$dataTroops[_0x7d9cd4(0x382)]*0xa+Math[_0x7d9cd4(0x793)](0xa);alert('Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)'[_0x7d9cd4(0x55a)](_0x489594));const _0x26c3bd=[];for(const _0x2c7cb8 of $dataTroops){if(!_0x2c7cb8)continue;const _0x39d46d=_0x2c7cb8['id'];_0x26c3bd[_0x39d46d]=VisuMZ[_0x7d9cd4(0x4af)]['ExtractStrFromTroop'](_0x39d46d);}setTimeout(VisuMZ[_0x7d9cd4(0x4af)][_0x7d9cd4(0x96c)][_0x7d9cd4(0x5cb)](this,_0x26c3bd),_0x489594);},VisuMZ['CoreEngine']['ExtractStrFromTroop']=function(_0x436638){const _0x4968ae=_0x55f97b;if(!$dataTroops[_0x436638])return'';let _0x5b7eef='█'[_0x4968ae(0x556)](0x46)+'\x0a\x0a',_0x27028f='═'[_0x4968ae(0x556)](0x46)+'\x0a\x0a',_0x100899='';this[_0x4968ae(0x6e6)]=0x0;const _0x3d3574=$dataTroops[_0x436638];let _0x258805=_0x3d3574[_0x4968ae(0x49c)];for(const _0x1244e3 of _0x258805){const _0x308049=_0x258805[_0x4968ae(0x776)](_0x1244e3)+0x1;let _0x2f8b42=_0x27028f+_0x4968ae(0x30f),_0x64b8d9=VisuMZ[_0x4968ae(0x4af)]['ExtractStrFromList'](_0x1244e3['list']);_0x64b8d9['length']>0x0&&(_0x100899[_0x4968ae(0x382)]>0x0?_0x100899+=_0x27028f+_0x4968ae(0x2b1):_0x100899+=_0x5b7eef+_0x4968ae(0x73f)[_0x4968ae(0x55a)](_0x436638,_0x3d3574[_0x4968ae(0x1bc)]||_0x4968ae(0x610))+_0x5b7eef,_0x100899+=_0x2f8b42[_0x4968ae(0x55a)](_0x308049,_0x64b8d9));}return _0x100899[_0x4968ae(0x382)]>0x0&&(_0x100899+=_0x27028f),_0x100899;},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x96c)]=function(_0x252fae){const _0x41b670=_0x55f97b,_0x128cb7=_0x41b670(0x57a);_0x252fae[_0x41b670(0x7a7)](undefined)[_0x41b670(0x7a7)]('')[_0x41b670(0x7a7)](null);const _0x5b0c46=_0x252fae[_0x41b670(0x724)]('\x0a\x0a\x0a\x0a\x0a')[_0x41b670(0x8e9)]();VisuMZ['CoreEngine'][_0x41b670(0x747)](_0x5b0c46,_0x128cb7,!![]),SceneManager[_0x41b670(0x49f)][_0x41b670(0x321)]=!![];},VisuMZ[_0x55f97b(0x4af)]['ExtractStrFromList']=function(_0x478ef9){const _0x5175f1=_0x55f97b;let _0xffbcf1='\x0a'+'─'['repeat'](0x46)+'\x0a',_0x1e39a7='\x0a'+'┄'[_0x5175f1(0x556)](0x46)+'\x0a',_0x35132d='';for(const _0x53b7ea of _0x478ef9){if(!_0x53b7ea)continue;if(_0x53b7ea['code']===0x65)_0x35132d+=_0xffbcf1+'\x0a',_0x35132d+='〘Show\x20Text〙\x0a',_0x53b7ea['parameters'][0x4]!==''&&_0x53b7ea[_0x5175f1(0x87d)][0x4]!==undefined&&(_0x35132d+=_0x5175f1(0x786)[_0x5175f1(0x55a)](_0x53b7ea[_0x5175f1(0x87d)][0x4]));else{if(_0x53b7ea[_0x5175f1(0x879)]===0x191)_0x35132d+=_0x5175f1(0x957)[_0x5175f1(0x55a)](_0x53b7ea[_0x5175f1(0x87d)][0x0]);else{if(_0x53b7ea['code']===0x192)_0x35132d+=_0xffbcf1,_0x35132d+=_0x5175f1(0x1fc)['format'](_0x1e39a7,_0x53b7ea[_0x5175f1(0x87d)][0x0]+0x1,_0x53b7ea[_0x5175f1(0x87d)][0x1]);else{if(_0x53b7ea[_0x5175f1(0x879)]===0x193)_0x35132d+=_0xffbcf1,_0x35132d+=_0x5175f1(0x5c7)[_0x5175f1(0x55a)](_0x1e39a7);else{if(_0x53b7ea[_0x5175f1(0x879)]===0x194)_0x35132d+=_0xffbcf1,_0x35132d+=_0x5175f1(0x239)[_0x5175f1(0x55a)](_0x1e39a7);else{if(_0x53b7ea[_0x5175f1(0x879)]===0x69)_0x35132d+=_0xffbcf1+'\x0a',_0x35132d+=_0x5175f1(0x825);else{if(_0x53b7ea[_0x5175f1(0x879)]===0x6c)_0x35132d+=_0xffbcf1+'\x0a',_0x35132d+='》Comment《\x0a%1\x0a'[_0x5175f1(0x55a)](_0x53b7ea[_0x5175f1(0x87d)][0x0]);else{if(_0x53b7ea[_0x5175f1(0x879)]===0x198)_0x35132d+=_0x5175f1(0x957)[_0x5175f1(0x55a)](_0x53b7ea[_0x5175f1(0x87d)][0x0]);else{if(_0x53b7ea[_0x5175f1(0x879)]===0x75){const _0x322cf=$dataCommonEvents[_0x53b7ea[_0x5175f1(0x87d)][0x0]];if(_0x322cf&&this[_0x5175f1(0x6e6)]<=0xa){this[_0x5175f1(0x6e6)]++;let _0x4a8e49=VisuMZ['CoreEngine']['ExtractStrFromList'](_0x322cf[_0x5175f1(0x255)]);_0x4a8e49[_0x5175f1(0x382)]>0x0&&(_0x35132d+=_0xffbcf1,_0x35132d+=_0x1e39a7,_0x35132d+=_0x5175f1(0x1db)[_0x5175f1(0x55a)](_0x322cf['id'],_0x322cf[_0x5175f1(0x1bc)]),_0x35132d+=_0x1e39a7,_0x35132d+=_0x4a8e49,_0x35132d+=_0x1e39a7,_0x35132d+=_0x5175f1(0x603)[_0x5175f1(0x55a)](_0x322cf['id'],_0x322cf[_0x5175f1(0x1bc)]),_0x35132d+=_0x1e39a7),this[_0x5175f1(0x6e6)]--;}}}}}}}}}}}return _0x35132d[_0x5175f1(0x382)]>0x0&&(_0x35132d+=_0xffbcf1),_0x35132d;},PluginManager[_0x55f97b(0x77a)](pluginData[_0x55f97b(0x1bc)],_0x55f97b(0x56d),_0x224a8c=>{const _0x1bb446=_0x55f97b;VisuMZ['ConvertParams'](_0x224a8c,_0x224a8c);const _0x402dba=_0x224a8c[_0x1bb446(0x958)];VisuMZ[_0x1bb446(0x942)](_0x402dba);}),PluginManager['registerCommand'](pluginData[_0x55f97b(0x1bc)],_0x55f97b(0x2d6),_0x852185=>{const _0x4bdf52=_0x55f97b;VisuMZ[_0x4bdf52(0x1dc)](_0x852185,_0x852185);const _0x4c19c2=_0x852185[_0x4bdf52(0x808)]||0x0;$gameParty[_0x4bdf52(0x769)](_0x4c19c2);}),PluginManager[_0x55f97b(0x77a)](pluginData['name'],_0x55f97b(0x5a1),_0x2bb3d1=>{const _0x38a36d=_0x55f97b;if(!SceneManager[_0x38a36d(0x732)]())return;VisuMZ[_0x38a36d(0x1dc)](_0x2bb3d1,_0x2bb3d1);const _0x45340a=_0x2bb3d1[_0x38a36d(0x8eb)];SceneManager[_0x38a36d(0x49f)]['playOnceParallelInterpreter'](_0x45340a);}),PluginManager[_0x55f97b(0x77a)](pluginData[_0x55f97b(0x1bc)],_0x55f97b(0x694),_0x478f8f=>{const _0x2f7a56=_0x55f97b;if(!$gameTemp[_0x2f7a56(0x206)]())return;if(!Utils[_0x2f7a56(0x28b)]())return;VisuMZ[_0x2f7a56(0x1dc)](_0x478f8f,_0x478f8f);const _0x1a39e5=_0x478f8f[_0x2f7a56(0x8d2)]||0x1;$gameTemp[_0x2f7a56(0x89f)]=_0x1a39e5;}),PluginManager[_0x55f97b(0x77a)](pluginData['name'],_0x55f97b(0x639),_0x364161=>{const _0x9d5d00=_0x55f97b;VisuMZ[_0x9d5d00(0x1dc)](_0x364161,_0x364161);const _0x336152=_0x364161['pictureId']||0x1,_0x30dcad=_0x364161[_0x9d5d00(0x472)]||_0x9d5d00(0x8e3),_0x2ed383=$gameScreen[_0x9d5d00(0x32b)](_0x336152);_0x2ed383&&_0x2ed383[_0x9d5d00(0x35c)](_0x30dcad);}),PluginManager[_0x55f97b(0x77a)](pluginData[_0x55f97b(0x1bc)],'PictureEraseAll',_0x162155=>{for(let _0x5c7858=0x1;_0x5c7858<=$gameScreen['maxPictures']();_0x5c7858++){$gameScreen['erasePicture'](_0x5c7858);}}),PluginManager['registerCommand'](pluginData[_0x55f97b(0x1bc)],'PictureEraseRange',_0x52e624=>{const _0x12dca2=_0x55f97b;VisuMZ[_0x12dca2(0x1dc)](_0x52e624,_0x52e624);const _0x5080a9=Math['min'](_0x52e624[_0x12dca2(0x2e8)],_0x52e624[_0x12dca2(0x8e0)]),_0x434cca=Math[_0x12dca2(0x1fb)](_0x52e624[_0x12dca2(0x2e8)],_0x52e624['EndingID']);for(let _0x266f11=_0x5080a9;_0x266f11<=_0x434cca;_0x266f11++){$gameScreen['erasePicture'](_0x266f11);}}),PluginManager[_0x55f97b(0x77a)](pluginData['name'],_0x55f97b(0x46a),_0x24d3b8=>{const _0x12ed17=_0x55f97b;VisuMZ[_0x12ed17(0x1dc)](_0x24d3b8,_0x24d3b8);const _0x2df7a4=Math['round'](_0x24d3b8[_0x12ed17(0x8d2)])[_0x12ed17(0x60e)](0x1,0x64),_0x483628=-Number(_0x24d3b8[_0x12ed17(0x89a)]||0x0),_0x41cd01=Math[_0x12ed17(0x1fb)](_0x24d3b8['Duration']||0x0,0x0),_0x2670c4=_0x24d3b8[_0x12ed17(0x472)]||_0x12ed17(0x8e3),_0xda42ce=_0x24d3b8[_0x12ed17(0x532)],_0x581ce1=$gameScreen[_0x12ed17(0x32b)](_0x2df7a4);if(!_0x581ce1)return;_0x581ce1[_0x12ed17(0x6a5)](_0x483628,_0x41cd01,_0x2670c4);if(_0xda42ce){const _0x10ae2e=$gameTemp[_0x12ed17(0x5a6)]();if(_0x10ae2e)_0x10ae2e[_0x12ed17(0x7c4)](_0x41cd01);}}),PluginManager[_0x55f97b(0x77a)](pluginData[_0x55f97b(0x1bc)],_0x55f97b(0x7b9),_0x24494c=>{const _0x24bca1=_0x55f97b;VisuMZ[_0x24bca1(0x1dc)](_0x24494c,_0x24494c);const _0x5375bf=Math['round'](_0x24494c[_0x24bca1(0x8d2)])[_0x24bca1(0x60e)](0x1,0x64),_0x2d6bba=-Number(_0x24494c[_0x24bca1(0x5d3)]||0x0),_0x5712b8=Math[_0x24bca1(0x1fb)](_0x24494c[_0x24bca1(0x1e1)]||0x0,0x0),_0x5cdf54=_0x24494c['easingType']||_0x24bca1(0x8e3),_0x509f11=_0x24494c[_0x24bca1(0x532)],_0x3d7069=$gameScreen[_0x24bca1(0x32b)](_0x5375bf);if(!_0x3d7069)return;_0x3d7069[_0x24bca1(0x42b)](_0x2d6bba,_0x5712b8,_0x5cdf54);if(_0x509f11){const _0x5e93b7=$gameTemp['getLastPluginCommandInterpreter']();if(_0x5e93b7)_0x5e93b7[_0x24bca1(0x7c4)](_0x5712b8);}}),PluginManager[_0x55f97b(0x77a)](pluginData[_0x55f97b(0x1bc)],_0x55f97b(0x7a5),_0x16ef49=>{const _0x1684a5=_0x55f97b;VisuMZ[_0x1684a5(0x1dc)](_0x16ef49,_0x16ef49);const _0x5bbcda=Math['round'](_0x16ef49[_0x1684a5(0x8d2)])[_0x1684a5(0x60e)](0x1,0x64),_0x1a9f35=_0x16ef49[_0x1684a5(0x386)],_0xdd48f6=_0x1a9f35['Origin'][_0x1684a5(0x60e)](0x0,0x1),_0x2fae9f=Math['round'](_0x1a9f35[_0x1684a5(0x2bf)]||0x0),_0x2353b6=Math[_0x1684a5(0x7dd)](_0x1a9f35[_0x1684a5(0x1d7)]||0x0),_0x1346b3=Math[_0x1684a5(0x7dd)](_0x1a9f35[_0x1684a5(0x465)]||0x0),_0x465cb7=Math[_0x1684a5(0x7dd)](_0x1a9f35['ScaleY']||0x0),_0x5663de=Math[_0x1684a5(0x7dd)](_0x1a9f35[_0x1684a5(0x494)])[_0x1684a5(0x60e)](0x0,0xff),_0x58f20c=_0x1a9f35[_0x1684a5(0x813)],_0x30d484='VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2',_0x50b8bf=_0x16ef49[_0x1684a5(0x2e7)]?_0x1684a5(0x2e7):_0x1684a5(0x96f),_0x1b9bbe=_0x30d484['format'](_0x16ef49[_0x1684a5(0x353)],_0x50b8bf);$gameScreen[_0x1684a5(0x59b)](_0x5bbcda,_0x1b9bbe,_0xdd48f6,_0x2fae9f,_0x2353b6,_0x1346b3,_0x465cb7,_0x5663de,_0x58f20c);}),PluginManager[_0x55f97b(0x77a)](pluginData['name'],_0x55f97b(0x88c),_0xe3f44a=>{const _0x585957=_0x55f97b;VisuMZ[_0x585957(0x1dc)](_0xe3f44a,_0xe3f44a);const _0x4a3388=_0xe3f44a['Type']||_0x585957(0x300),_0x57fd94=_0xe3f44a[_0x585957(0x558)][_0x585957(0x60e)](0x1,0x9),_0x5536e9=_0xe3f44a[_0x585957(0x29c)][_0x585957(0x60e)](0x1,0x9),_0x19a15e=_0xe3f44a[_0x585957(0x1e1)]||0x1,_0x5cc38b=_0xe3f44a['Wait'];$gameScreen['setCoreEngineScreenShakeStyle'](_0x4a3388),$gameScreen[_0x585957(0x591)](_0x57fd94,_0x5536e9,_0x19a15e);if(_0x5cc38b){const _0x3e7790=$gameTemp[_0x585957(0x5a6)]();if(_0x3e7790)_0x3e7790[_0x585957(0x7c4)](_0x19a15e);}}),PluginManager[_0x55f97b(0x77a)](pluginData[_0x55f97b(0x1bc)],_0x55f97b(0x8ba),_0x3de2c8=>{const _0x5372d5=_0x55f97b;if($gameParty[_0x5372d5(0x4d5)]())return;VisuMZ[_0x5372d5(0x1dc)](_0x3de2c8,_0x3de2c8);const _0x32d0db=_0x3de2c8['IDs'],_0x44a39d=(_0x3de2c8[_0x5372d5(0x713)]||0x0)/0x64;for(const _0x4503b4 of _0x32d0db){const _0x1dcc89=Math[_0x5372d5(0x300)]()<=_0x44a39d;$gameSwitches['setValue'](_0x4503b4,_0x1dcc89);}}),PluginManager[_0x55f97b(0x77a)](pluginData[_0x55f97b(0x1bc)],'SwitchRandomizeRange',_0x828f90=>{const _0x1d3a8e=_0x55f97b;if($gameParty[_0x1d3a8e(0x4d5)]())return;VisuMZ['ConvertParams'](_0x828f90,_0x828f90);const _0x25986c=Math['min'](_0x828f90['StartID'],_0x828f90['EndingID']),_0x3baf27=Math[_0x1d3a8e(0x1fb)](_0x828f90['StartID'],_0x828f90[_0x1d3a8e(0x8e0)]),_0x2d3f99=(_0x828f90['Chance']||0x0)/0x64;for(let _0x3632ae=_0x25986c;_0x3632ae<=_0x3baf27;_0x3632ae++){const _0x39c654=Math['random']()<=_0x2d3f99;$gameSwitches[_0x1d3a8e(0x48e)](_0x3632ae,_0x39c654);}}),PluginManager[_0x55f97b(0x77a)](pluginData[_0x55f97b(0x1bc)],_0x55f97b(0x906),_0x36ae56=>{const _0xc96b0f=_0x55f97b;if($gameParty['inBattle']())return;VisuMZ[_0xc96b0f(0x1dc)](_0x36ae56,_0x36ae56);const _0x5b0238=_0x36ae56[_0xc96b0f(0x4fd)];for(const _0x504281 of _0x5b0238){const _0x189fc6=$gameSwitches[_0xc96b0f(0x808)](_0x504281);$gameSwitches[_0xc96b0f(0x48e)](_0x504281,!_0x189fc6);}}),PluginManager[_0x55f97b(0x77a)](pluginData[_0x55f97b(0x1bc)],_0x55f97b(0x94c),_0x3f6589=>{const _0x2a8492=_0x55f97b;if($gameParty[_0x2a8492(0x4d5)]())return;VisuMZ[_0x2a8492(0x1dc)](_0x3f6589,_0x3f6589);const _0x2b8402=Math[_0x2a8492(0x43e)](_0x3f6589['StartID'],_0x3f6589['EndingID']),_0x5f48ee=Math[_0x2a8492(0x1fb)](_0x3f6589['StartID'],_0x3f6589[_0x2a8492(0x8e0)]);for(let _0xabbb4b=_0x2b8402;_0xabbb4b<=_0x5f48ee;_0xabbb4b++){const _0x1810a3=$gameSwitches['value'](_0xabbb4b);$gameSwitches[_0x2a8492(0x48e)](_0xabbb4b,!_0x1810a3);}}),PluginManager[_0x55f97b(0x77a)](pluginData[_0x55f97b(0x1bc)],_0x55f97b(0x911),_0x21164c=>{const _0x14005e=_0x55f97b;VisuMZ[_0x14005e(0x1dc)](_0x21164c,_0x21164c);const _0x2b0019=_0x21164c[_0x14005e(0x69f)]||0x1;$gameSystem['setMainFontSize'](_0x2b0019);}),PluginManager[_0x55f97b(0x77a)](pluginData[_0x55f97b(0x1bc)],'SystemSetSideView',_0x430e81=>{const _0x52df73=_0x55f97b;if($gameParty[_0x52df73(0x4d5)]())return;VisuMZ[_0x52df73(0x1dc)](_0x430e81,_0x430e81);const _0x18b0ad=_0x430e81[_0x52df73(0x69f)];if(_0x18b0ad[_0x52df73(0x4f2)](/Front/i))$gameSystem['setSideView'](![]);else _0x18b0ad[_0x52df73(0x4f2)](/Side/i)?$gameSystem[_0x52df73(0x7ae)](!![]):$gameSystem['setSideView'](!$gameSystem[_0x52df73(0x19e)]());}),PluginManager['registerCommand'](pluginData[_0x55f97b(0x1bc)],'SystemLoadAudio',_0xfcd379=>{const _0x296e5b=_0x55f97b;if($gameParty[_0x296e5b(0x4d5)]())return;VisuMZ[_0x296e5b(0x1dc)](_0xfcd379,_0xfcd379);const _0x77d4c6=[_0x296e5b(0x5b5),'bgs','me','se'];for(const _0x3d40e3 of _0x77d4c6){const _0x348863=_0xfcd379[_0x3d40e3],_0x40426f=_0x296e5b(0x5e8)[_0x296e5b(0x55a)](_0x3d40e3);for(const _0x6d556b of _0x348863){AudioManager[_0x296e5b(0x7f9)](_0x40426f,_0x6d556b);}}}),PluginManager['registerCommand'](pluginData[_0x55f97b(0x1bc)],'SystemLoadImages',_0x38519e=>{const _0x1a1f9e=_0x55f97b;if($gameParty['inBattle']())return;VisuMZ[_0x1a1f9e(0x1dc)](_0x38519e,_0x38519e);const _0x365bf9=[_0x1a1f9e(0x2f3),_0x1a1f9e(0x576),_0x1a1f9e(0x2a7),_0x1a1f9e(0x2e9),_0x1a1f9e(0x82b),_0x1a1f9e(0x71c),'parallaxes',_0x1a1f9e(0x7c3),_0x1a1f9e(0x782),_0x1a1f9e(0x69d),'system',_0x1a1f9e(0x960),_0x1a1f9e(0x4c0),'titles2'];for(const _0x4a5f94 of _0x365bf9){const _0x203d91=_0x38519e[_0x4a5f94],_0x156a3c='img/%1/'[_0x1a1f9e(0x55a)](_0x4a5f94);for(const _0x38313c of _0x203d91){ImageManager[_0x1a1f9e(0x954)](_0x156a3c,_0x38313c);}}}),PluginManager[_0x55f97b(0x77a)](pluginData['name'],'SystemSetBattleSystem',_0x234766=>{const _0x3ee7dc=_0x55f97b;if($gameParty[_0x3ee7dc(0x4d5)]())return;VisuMZ[_0x3ee7dc(0x1dc)](_0x234766,_0x234766);const _0x5b040e=_0x234766[_0x3ee7dc(0x69f)][_0x3ee7dc(0x427)]()[_0x3ee7dc(0x8e9)](),_0x174a40=VisuMZ[_0x3ee7dc(0x4af)][_0x3ee7dc(0x83c)](_0x5b040e);$gameSystem['setBattleSystem'](_0x174a40);}),VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x83c)]=function(_0xf70c87){const _0x517d12=_0x55f97b;_0xf70c87=_0xf70c87||_0x517d12(0x527),_0xf70c87=String(_0xf70c87)[_0x517d12(0x427)]()[_0x517d12(0x8e9)]();switch(_0xf70c87){case _0x517d12(0x6aa):return 0x0;case'TPB\x20ACTIVE':Imported[_0x517d12(0x755)]&&(ConfigManager[_0x517d12(0x70e)]=!![]);return 0x1;case'TPB\x20WAIT':Imported[_0x517d12(0x755)]&&(ConfigManager[_0x517d12(0x70e)]=![]);return 0x2;case _0x517d12(0x52d):if(Imported[_0x517d12(0x618)])return _0x517d12(0x52d);break;case _0x517d12(0x1c9):if(Imported[_0x517d12(0x5b2)])return _0x517d12(0x1c9);break;case _0x517d12(0x727):if(Imported[_0x517d12(0x869)])return _0x517d12(0x727);break;case _0x517d12(0x4a7):if(Imported[_0x517d12(0x437)])return _0x517d12(0x4a7);break;case _0x517d12(0x914):if(Imported['VisuMZ_2_BattleSystemOTB'])return'OTB';break;case _0x517d12(0x7a6):if(Imported[_0x517d12(0x936)])return _0x517d12(0x7a6);break;case _0x517d12(0x66e):if(Imported[_0x517d12(0x4de)])return _0x517d12(0x66e);break;}return $dataSystem['battleSystem'];},PluginManager['registerCommand'](pluginData[_0x55f97b(0x1bc)],'SystemSetWindowPadding',_0xcf259d=>{const _0x3075d0=_0x55f97b;VisuMZ[_0x3075d0(0x1dc)](_0xcf259d,_0xcf259d);const _0x20bba0=_0xcf259d[_0x3075d0(0x69f)]||0x1;$gameSystem[_0x3075d0(0x3f2)](_0x20bba0);}),PluginManager['registerCommand'](pluginData['name'],_0x55f97b(0x1b8),_0x2a5cb3=>{VisuMZ['ConvertParams'](_0x2a5cb3,_0x2a5cb3);const _0x536f9a=_0x2a5cb3['text']||'';$textPopup(_0x536f9a);}),PluginManager[_0x55f97b(0x77a)](pluginData[_0x55f97b(0x1bc)],_0x55f97b(0x3fe),_0x244a3b=>{const _0x1acdf4=_0x55f97b;VisuMZ[_0x1acdf4(0x1dc)](_0x244a3b,_0x244a3b);const _0xb39749=_0x244a3b['id']||0x1,_0xf60767=_0x244a3b[_0x1acdf4(0x441)],_0x1d95f7=_0x244a3b['operand']||0x0;let _0x1c0b08=$gameVariables[_0x1acdf4(0x808)](_0xb39749)||0x0;switch(_0xf60767){case'=':_0x1c0b08=_0x1d95f7;break;case'+':_0x1c0b08+=_0x1d95f7;break;case'-':_0x1c0b08-=_0x1d95f7;break;case'*':_0x1c0b08*=_0x1d95f7;break;case'/':_0x1c0b08/=_0x1d95f7;break;case'%':_0x1c0b08%=_0x1d95f7;break;}_0x1c0b08=_0x1c0b08||0x0,$gameVariables[_0x1acdf4(0x48e)](_0xb39749,_0x1c0b08);}),PluginManager['registerCommand'](pluginData[_0x55f97b(0x1bc)],_0x55f97b(0x92e),_0x59a0dc=>{const _0x54e897=_0x55f97b;VisuMZ[_0x54e897(0x1dc)](_0x59a0dc,_0x59a0dc);const _0x4f1f56=_0x59a0dc['id']()||0x1,_0x1bf036=_0x59a0dc[_0x54e897(0x441)],_0x4b5198=_0x59a0dc[_0x54e897(0x1ed)]()||0x0;let _0x2734c2=$gameVariables['value'](_0x4f1f56)||0x0;switch(_0x1bf036){case'=':_0x2734c2=_0x4b5198;break;case'+':_0x2734c2+=_0x4b5198;break;case'-':_0x2734c2-=_0x4b5198;break;case'*':_0x2734c2*=_0x4b5198;break;case'/':_0x2734c2/=_0x4b5198;break;case'%':_0x2734c2%=_0x4b5198;break;}_0x2734c2=_0x2734c2||0x0,$gameVariables[_0x54e897(0x48e)](_0x4f1f56,_0x2734c2);}),VisuMZ['CoreEngine']['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x55f97b(0x616)][_0x55f97b(0x5cf)],Scene_Boot[_0x55f97b(0x616)][_0x55f97b(0x5cf)]=function(){const _0x1400c4=_0x55f97b;VisuMZ[_0x1400c4(0x4af)]['Scene_Boot_onDatabaseLoaded'][_0x1400c4(0x8a8)](this),this['process_VisuMZ_CoreEngine_RegExp'](),this[_0x1400c4(0x3f6)](),this[_0x1400c4(0x44f)](),this['process_VisuMZ_CoreEngine_Functions'](),this[_0x1400c4(0x442)](),this[_0x1400c4(0x3d2)](),VisuMZ['ParseAllNotetags']();},VisuMZ['CoreEngine'][_0x55f97b(0x8bb)]={},Scene_Boot[_0x55f97b(0x616)][_0x55f97b(0x36d)]=function(){const _0x5c3a75=_0x55f97b,_0x4f4c63=['MAXHP',_0x5c3a75(0x2bc),_0x5c3a75(0x832),'DEF',_0x5c3a75(0x6d7),_0x5c3a75(0x8f2),'AGI',_0x5c3a75(0x6e4)],_0x5454b9=[_0x5c3a75(0x64d),'EVA',_0x5c3a75(0x34c),_0x5c3a75(0x3d4),'MEV',_0x5c3a75(0x4e4),'CNT',_0x5c3a75(0x77c),_0x5c3a75(0x8bc),_0x5c3a75(0x63f)],_0x146dcf=[_0x5c3a75(0x818),'GRD',_0x5c3a75(0x4f4),_0x5c3a75(0x6f2),_0x5c3a75(0x19c),'TCR','PDR',_0x5c3a75(0x5ff),_0x5c3a75(0x6ef),_0x5c3a75(0x78d)],_0x271489=[_0x4f4c63,_0x5454b9,_0x146dcf],_0x5c902e=['Plus',_0x5c3a75(0x6c3),_0x5c3a75(0x372),_0x5c3a75(0x23f),_0x5c3a75(0x3f7),_0x5c3a75(0x345),_0x5c3a75(0x921),_0x5c3a75(0x8c0),_0x5c3a75(0x892),_0x5c3a75(0x672)];for(const _0x2446b8 of _0x271489){let _0x3439b8='';if(_0x2446b8===_0x4f4c63)_0x3439b8=_0x5c3a75(0x65f);if(_0x2446b8===_0x5454b9)_0x3439b8=_0x5c3a75(0x2a1);if(_0x2446b8===_0x146dcf)_0x3439b8=_0x5c3a75(0x881);for(const _0x5c6718 of _0x5c902e){let _0x2a789a=_0x5c3a75(0x8e5)[_0x5c3a75(0x55a)](_0x3439b8,_0x5c6718);VisuMZ[_0x5c3a75(0x4af)]['RegExp'][_0x2a789a]=[],VisuMZ[_0x5c3a75(0x4af)][_0x5c3a75(0x8bb)][_0x2a789a+'JS']=[];let _0x1bf6da=_0x5c3a75(0x6d2);if([_0x5c3a75(0x232),'Flat'][_0x5c3a75(0x3e4)](_0x5c6718))_0x1bf6da+=_0x5c3a75(0x23a);else{if([_0x5c3a75(0x6c3),_0x5c3a75(0x892)][_0x5c3a75(0x3e4)](_0x5c6718))_0x1bf6da+=_0x5c3a75(0x81e);else{if([_0x5c3a75(0x372),_0x5c3a75(0x672)][_0x5c3a75(0x3e4)](_0x5c6718))_0x1bf6da+=_0x5c3a75(0x761);else{if(_0x5c6718===_0x5c3a75(0x23f))_0x1bf6da+=_0x5c3a75(0x695);else{if(_0x5c6718==='Rate1')_0x1bf6da+='(\x5cd+)([%％])>';else _0x5c6718==='Rate2'&&(_0x1bf6da+=_0x5c3a75(0x25c));}}}}for(const _0x2132d2 of _0x2446b8){let _0x4e4301=_0x5c6718[_0x5c3a75(0x4ac)](/[\d+]/g,'')['toUpperCase']();const _0x2d88fe=_0x1bf6da[_0x5c3a75(0x55a)](_0x2132d2,_0x4e4301);VisuMZ[_0x5c3a75(0x4af)][_0x5c3a75(0x8bb)][_0x2a789a][_0x5c3a75(0x35b)](new RegExp(_0x2d88fe,'i'));const _0x599cd5='<JS\x20%1\x20%2:[\x20](.*)>'[_0x5c3a75(0x55a)](_0x2132d2,_0x4e4301);VisuMZ[_0x5c3a75(0x4af)]['RegExp'][_0x2a789a+'JS'][_0x5c3a75(0x35b)](new RegExp(_0x599cd5,'i'));}}}},Scene_Boot[_0x55f97b(0x616)][_0x55f97b(0x3f6)]=function(){const _0x59ff5a=_0x55f97b;if(VisuMZ[_0x59ff5a(0x43f)])return;},Scene_Boot['prototype'][_0x55f97b(0x44f)]=function(){const _0x755340=_0x55f97b,_0x2b00f6=VisuMZ[_0x755340(0x4af)][_0x755340(0x386)];_0x2b00f6[_0x755340(0x585)][_0x755340(0x8fc)]&&VisuMZ[_0x755340(0x622)](!![]);_0x2b00f6['QoL'][_0x755340(0x310)]&&(Input['keyMapper'][0x23]='end',Input['keyMapper'][0x24]=_0x755340(0x658));if(_0x2b00f6[_0x755340(0x6ec)]){const _0x182459=_0x2b00f6[_0x755340(0x6ec)];_0x182459[_0x755340(0x60a)]=_0x182459[_0x755340(0x60a)]||'\x5c}❪SHIFT❫\x5c{',_0x182459[_0x755340(0x7ef)]=_0x182459[_0x755340(0x7ef)]||_0x755340(0x283);}_0x2b00f6['KeyboardInput']['WASD']&&(Input['keyMapper'][0x57]='up',Input[_0x755340(0x39a)][0x41]=_0x755340(0x55f),Input[_0x755340(0x39a)][0x53]=_0x755340(0x931),Input[_0x755340(0x39a)][0x44]=_0x755340(0x7bf),Input[_0x755340(0x39a)][0x45]='pagedown'),_0x2b00f6[_0x755340(0x4d6)][_0x755340(0x3bb)]&&(Input['keyMapper'][0x52]=_0x755340(0x8e8)),_0x2b00f6[_0x755340(0x91f)][_0x755340(0x3f4)]=_0x2b00f6[_0x755340(0x91f)][_0x755340(0x3f4)][_0x755340(0x5f9)](_0x21efd2=>_0x21efd2[_0x755340(0x427)]()[_0x755340(0x8e9)]()),_0x2b00f6[_0x755340(0x91f)][_0x755340(0x31c)]=_0x2b00f6[_0x755340(0x91f)][_0x755340(0x31c)][_0x755340(0x5f9)](_0x837dbb=>_0x837dbb[_0x755340(0x427)]()[_0x755340(0x8e9)]()),_0x2b00f6[_0x755340(0x585)][_0x755340(0x36b)]=_0x2b00f6['QoL'][_0x755340(0x36b)]??!![],_0x2b00f6[_0x755340(0x585)]['ShiftT_Toggle']=_0x2b00f6[_0x755340(0x585)][_0x755340(0x795)]??!![],_0x2b00f6['ButtonAssist']['SplitEscape']&&VisuMZ[_0x755340(0x4af)][_0x755340(0x2f4)]();},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x2f4)]=function(){const _0x2a8ced=_0x55f97b;let _0x2cb5ac=![],_0x451ec6=![];for(let _0x154af0 in Input['keyMapper']){const _0x4554b5=Input['keyMapper'][_0x154af0];if(_0x4554b5===_0x2a8ced(0x547))_0x2cb5ac=!![];if(_0x4554b5===_0x2a8ced(0x8ce))_0x451ec6=!![];if(_0x2cb5ac&&_0x451ec6)return;}let _0x2024c1=_0x2a8ced(0x7af);_0x2024c1+=_0x2a8ced(0x35d),_0x2024c1+='buttons!\x20Go\x20to\x20project\x27s\x20rmmz_core.js\x20and\x20modify\x20Input.keyMapper\x20',_0x2024c1+='keys\x20for\x20both\x20\x22cancel\x22\x20and\x20\x22menu\x22!\x0a\x0a',_0x2024c1+=_0x2a8ced(0x951),alert(_0x2024c1),SceneManager['exit']();},Scene_Boot[_0x55f97b(0x616)][_0x55f97b(0x950)]=function(){const _0x42182b=_0x55f97b;this[_0x42182b(0x1c1)]();},Scene_Boot[_0x55f97b(0x616)][_0x55f97b(0x1c1)]=function(){const _0x540683=_0x55f97b,_0xeeef6b=VisuMZ[_0x540683(0x4af)][_0x540683(0x386)][_0x540683(0x526)];for(const _0x5d9d33 of _0xeeef6b){const _0x378f5b=_0x5d9d33['FunctionName'][_0x540683(0x4ac)](/[ ]/g,''),_0x170a81=_0x5d9d33[_0x540683(0x5ab)];VisuMZ['CoreEngine'][_0x540683(0x80f)](_0x378f5b,_0x170a81);}},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x80f)]=function(_0x47881b,_0x2575d6){const _0x59460c=_0x55f97b;if(!!window[_0x47881b]){if($gameTemp[_0x59460c(0x206)]())console[_0x59460c(0x84b)](_0x59460c(0x59a)[_0x59460c(0x55a)](_0x47881b));}const _0x11593a=_0x59460c(0x751)[_0x59460c(0x55a)](_0x47881b,_0x2575d6);window[_0x47881b]=new Function(_0x11593a);},Scene_Boot[_0x55f97b(0x616)][_0x55f97b(0x442)]=function(){const _0x1b681a=_0x55f97b,_0x10f06d=VisuMZ['CoreEngine'][_0x1b681a(0x386)][_0x1b681a(0x7e1)];if(!_0x10f06d)return;for(const _0x5600d9 of _0x10f06d){if(!_0x5600d9)continue;VisuMZ['CoreEngine'][_0x1b681a(0x5a0)](_0x5600d9);}},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x654)]={},VisuMZ[_0x55f97b(0x4af)]['CustomParamIcons']={},VisuMZ[_0x55f97b(0x4af)]['CustomParamType']={},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x943)]={},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x5a0)]=function(_0x209113){const _0x14eb22=_0x55f97b,_0x5d96f8=_0x209113[_0x14eb22(0x844)],_0x4f2139=_0x209113[_0x14eb22(0x701)],_0x7e954a=_0x209113[_0x14eb22(0x31a)],_0xea66f5=_0x209113[_0x14eb22(0x54e)],_0x165f86=new Function(_0x209113[_0x14eb22(0x326)]);VisuMZ[_0x14eb22(0x4af)][_0x14eb22(0x654)][_0x5d96f8['toUpperCase']()[_0x14eb22(0x8e9)]()]=_0x4f2139,VisuMZ[_0x14eb22(0x4af)]['CustomParamIcons'][_0x5d96f8[_0x14eb22(0x427)]()[_0x14eb22(0x8e9)]()]=_0x7e954a,VisuMZ[_0x14eb22(0x4af)][_0x14eb22(0x780)][_0x5d96f8[_0x14eb22(0x427)]()[_0x14eb22(0x8e9)]()]=_0xea66f5,VisuMZ['CoreEngine'][_0x14eb22(0x943)][_0x5d96f8[_0x14eb22(0x427)]()[_0x14eb22(0x8e9)]()]=_0x5d96f8,Object[_0x14eb22(0x85a)](Game_BattlerBase['prototype'],_0x5d96f8,{'get'(){const _0xf482b=_0x14eb22,_0x46366b=_0x165f86['call'](this);return _0xea66f5==='integer'?Math[_0xf482b(0x7dd)](_0x46366b):_0x46366b;}});},VisuMZ[_0x55f97b(0x4af)]['ControllerButtons']={},VisuMZ[_0x55f97b(0x4af)]['ControllerMatches']={},Scene_Boot['prototype'][_0x55f97b(0x3d2)]=function(){const _0x5cd9fd=_0x55f97b,_0x4d3a67=VisuMZ[_0x5cd9fd(0x4af)]['Settings'][_0x5cd9fd(0x637)];for(const _0x2eaeda of _0x4d3a67){const _0x5cc172=(_0x2eaeda[_0x5cd9fd(0x1ca)]||'')[_0x5cd9fd(0x5ac)]()['trim'](),_0x7e674e=(_0x2eaeda[_0x5cd9fd(0x210)]||'')['toLowerCase']()[_0x5cd9fd(0x8e9)]();VisuMZ[_0x5cd9fd(0x4af)][_0x5cd9fd(0x637)][_0x5cc172]=_0x2eaeda,VisuMZ[_0x5cd9fd(0x4af)][_0x5cd9fd(0x3ee)][_0x7e674e]=_0x5cc172;}},VisuMZ[_0x55f97b(0x43f)]=function(){const _0x764fc5=_0x55f97b;for(const _0x4911ee of $dataActors){if(_0x4911ee)VisuMZ[_0x764fc5(0x856)](_0x4911ee);}for(const _0x432ce2 of $dataClasses){if(_0x432ce2)VisuMZ[_0x764fc5(0x849)](_0x432ce2);}for(const _0x526213 of $dataSkills){if(_0x526213)VisuMZ[_0x764fc5(0x64a)](_0x526213);}for(const _0x1882f9 of $dataItems){if(_0x1882f9)VisuMZ[_0x764fc5(0x647)](_0x1882f9);}for(const _0x17efcc of $dataWeapons){if(_0x17efcc)VisuMZ[_0x764fc5(0x269)](_0x17efcc);}for(const _0x39a3ec of $dataArmors){if(_0x39a3ec)VisuMZ[_0x764fc5(0x4a1)](_0x39a3ec);}for(const _0x59432f of $dataEnemies){if(_0x59432f)VisuMZ[_0x764fc5(0x279)](_0x59432f);}for(const _0x21bda1 of $dataStates){if(_0x21bda1)VisuMZ[_0x764fc5(0x5fc)](_0x21bda1);}for(const _0x457cfe of $dataTilesets){if(_0x457cfe)VisuMZ[_0x764fc5(0x3cf)](_0x457cfe);}},VisuMZ[_0x55f97b(0x856)]=function(_0x1f755c){},VisuMZ[_0x55f97b(0x849)]=function(_0x57dc9c){},VisuMZ[_0x55f97b(0x64a)]=function(_0x6102b0){},VisuMZ[_0x55f97b(0x647)]=function(_0x1981f7){},VisuMZ[_0x55f97b(0x269)]=function(_0x3915b5){},VisuMZ[_0x55f97b(0x4a1)]=function(_0x550b4b){},VisuMZ[_0x55f97b(0x279)]=function(_0x2eb20e){},VisuMZ[_0x55f97b(0x5fc)]=function(_0x3af270){},VisuMZ[_0x55f97b(0x3cf)]=function(_0x356dee){},VisuMZ['CoreEngine']['ParseActorNotetags']=VisuMZ['ParseActorNotetags'],VisuMZ[_0x55f97b(0x856)]=function(_0x287afc){const _0x4b2ad3=_0x55f97b;VisuMZ[_0x4b2ad3(0x4af)]['ParseActorNotetags'][_0x4b2ad3(0x8a8)](this,_0x287afc);const _0x492c5a=_0x287afc[_0x4b2ad3(0x584)];if(_0x492c5a['match'](/<MAX LEVEL:[ ](\d+)>/i)){_0x287afc[_0x4b2ad3(0x6a3)]=Number(RegExp['$1']);if(_0x287afc[_0x4b2ad3(0x6a3)]===0x0)_0x287afc[_0x4b2ad3(0x6a3)]=Number['MAX_SAFE_INTEGER'];}_0x492c5a[_0x4b2ad3(0x4f2)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x287afc[_0x4b2ad3(0x62e)]=Math[_0x4b2ad3(0x43e)](Number(RegExp['$1']),_0x287afc[_0x4b2ad3(0x6a3)]));},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x849)]=VisuMZ['ParseClassNotetags'],VisuMZ[_0x55f97b(0x849)]=function(_0x5bef40){const _0x44450b=_0x55f97b;VisuMZ[_0x44450b(0x4af)][_0x44450b(0x849)][_0x44450b(0x8a8)](this,_0x5bef40);if(_0x5bef40['learnings'])for(const _0x26f8c5 of _0x5bef40[_0x44450b(0x421)]){_0x26f8c5['note'][_0x44450b(0x4f2)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x26f8c5[_0x44450b(0x2f9)]=Math['max'](Number(RegExp['$1']),0x1));}},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x279)]=VisuMZ[_0x55f97b(0x279)],VisuMZ[_0x55f97b(0x279)]=function(_0x349c75){const _0x1a6bb1=_0x55f97b;VisuMZ[_0x1a6bb1(0x4af)][_0x1a6bb1(0x279)][_0x1a6bb1(0x8a8)](this,_0x349c75),_0x349c75[_0x1a6bb1(0x2f9)]=0x1;const _0x59d7de=_0x349c75[_0x1a6bb1(0x584)];if(_0x59d7de['match'](/<LEVEL:[ ](\d+)>/i))_0x349c75[_0x1a6bb1(0x2f9)]=Number(RegExp['$1']);if(_0x59d7de[_0x1a6bb1(0x4f2)](/<MAXHP:[ ](\d+)>/i))_0x349c75[_0x1a6bb1(0x8bf)][0x0]=Number(RegExp['$1']);if(_0x59d7de[_0x1a6bb1(0x4f2)](/<MAXMP:[ ](\d+)>/i))_0x349c75['params'][0x1]=Number(RegExp['$1']);if(_0x59d7de['match'](/<ATK:[ ](\d+)>/i))_0x349c75[_0x1a6bb1(0x8bf)][0x2]=Number(RegExp['$1']);if(_0x59d7de[_0x1a6bb1(0x4f2)](/<DEF:[ ](\d+)>/i))_0x349c75[_0x1a6bb1(0x8bf)][0x3]=Number(RegExp['$1']);if(_0x59d7de['match'](/<MAT:[ ](\d+)>/i))_0x349c75[_0x1a6bb1(0x8bf)][0x4]=Number(RegExp['$1']);if(_0x59d7de[_0x1a6bb1(0x4f2)](/<MDF:[ ](\d+)>/i))_0x349c75[_0x1a6bb1(0x8bf)][0x5]=Number(RegExp['$1']);if(_0x59d7de[_0x1a6bb1(0x4f2)](/<AGI:[ ](\d+)>/i))_0x349c75[_0x1a6bb1(0x8bf)][0x6]=Number(RegExp['$1']);if(_0x59d7de[_0x1a6bb1(0x4f2)](/<LUK:[ ](\d+)>/i))_0x349c75['params'][0x7]=Number(RegExp['$1']);if(_0x59d7de['match'](/<EXP:[ ](\d+)>/i))_0x349c75[_0x1a6bb1(0x7a9)]=Number(RegExp['$1']);if(_0x59d7de[_0x1a6bb1(0x4f2)](/<GOLD:[ ](\d+)>/i))_0x349c75[_0x1a6bb1(0x39e)]=Number(RegExp['$1']);},VisuMZ['CoreEngine'][_0x55f97b(0x546)]=Graphics[_0x55f97b(0x5d2)],Graphics[_0x55f97b(0x5d2)]=function(){const _0x54ba6e=_0x55f97b;switch(VisuMZ['CoreEngine'][_0x54ba6e(0x386)][_0x54ba6e(0x585)][_0x54ba6e(0x538)]){case _0x54ba6e(0x5d8):return!![];case'normal':return![];default:return VisuMZ[_0x54ba6e(0x4af)][_0x54ba6e(0x546)][_0x54ba6e(0x8a8)](this);}},VisuMZ[_0x55f97b(0x4af)]['Graphics_printError']=Graphics[_0x55f97b(0x3e1)],Graphics[_0x55f97b(0x3e1)]=function(_0x1f18f8,_0x74e49a,_0x4baec2=null){const _0x3bd6a2=_0x55f97b;VisuMZ[_0x3bd6a2(0x4af)][_0x3bd6a2(0x4e5)][_0x3bd6a2(0x8a8)](this,_0x1f18f8,_0x74e49a,_0x4baec2),VisuMZ[_0x3bd6a2(0x622)](![]);},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x900)]=Graphics[_0x55f97b(0x3b3)],Graphics[_0x55f97b(0x3b3)]=function(_0x531282){const _0x3e6bcb=_0x55f97b;VisuMZ[_0x3e6bcb(0x4af)]['Graphics_centerElement'][_0x3e6bcb(0x8a8)](this,_0x531282),this[_0x3e6bcb(0x91a)](_0x531282);},Graphics[_0x55f97b(0x91a)]=function(_0x58cd49){const _0x3a6be1=_0x55f97b;VisuMZ[_0x3a6be1(0x4af)][_0x3a6be1(0x386)]['QoL'][_0x3a6be1(0x71d)]&&(_0x58cd49['style'][_0x3a6be1(0x24c)]=_0x3a6be1(0x8a9));VisuMZ[_0x3a6be1(0x4af)]['Settings']['QoL'][_0x3a6be1(0x842)]&&(_0x58cd49[_0x3a6be1(0x21f)][_0x3a6be1(0x2d9)]='pixelated');const _0x2f3d0f=Math[_0x3a6be1(0x1fb)](0x0,Math['floor'](_0x58cd49[_0x3a6be1(0x7cc)]*this['_realScale'])),_0x42b8f1=Math[_0x3a6be1(0x1fb)](0x0,Math[_0x3a6be1(0x8d7)](_0x58cd49[_0x3a6be1(0x4f7)]*this[_0x3a6be1(0x902)]));_0x58cd49['style'][_0x3a6be1(0x7cc)]=_0x2f3d0f+'px',_0x58cd49[_0x3a6be1(0x21f)][_0x3a6be1(0x4f7)]=_0x42b8f1+'px';},VisuMZ['CoreEngine'][_0x55f97b(0x5d4)]=Bitmap[_0x55f97b(0x616)][_0x55f97b(0x374)],Bitmap['prototype'][_0x55f97b(0x374)]=function(_0x457183,_0x4c5425){const _0x228714=_0x55f97b;VisuMZ[_0x228714(0x4af)][_0x228714(0x5d4)][_0x228714(0x8a8)](this,_0x457183,_0x4c5425),this[_0x228714(0x60f)]=!(VisuMZ['CoreEngine'][_0x228714(0x386)][_0x228714(0x585)][_0x228714(0x842)]??!![]);},Bitmap['prototype'][_0x55f97b(0x5f2)]=function(){const _0x36d0d0=_0x55f97b;this[_0x36d0d0(0x3e2)]=!![];},VisuMZ['CoreEngine'][_0x55f97b(0x256)]=Sprite[_0x55f97b(0x616)]['destroy'],Sprite[_0x55f97b(0x616)]['destroy']=function(){const _0x3a2b41=_0x55f97b;if(this[_0x3a2b41(0x528)])VisuMZ[_0x3a2b41(0x4af)][_0x3a2b41(0x256)][_0x3a2b41(0x8a8)](this);this['destroyCoreEngineMarkedBitmaps']();},Sprite['prototype']['destroyCoreEngineMarkedBitmaps']=function(){const _0x20ff64=_0x55f97b;if(!this[_0x20ff64(0x1ef)])return;if(!this[_0x20ff64(0x1ef)]['_customModified'])return;this['bitmap']['_baseTexture']&&!this[_0x20ff64(0x90d)][_0x20ff64(0x506)][_0x20ff64(0x2c1)]&&this[_0x20ff64(0x1ef)][_0x20ff64(0x26a)]();},VisuMZ['CoreEngine']['Bitmap_resize']=Bitmap[_0x55f97b(0x616)][_0x55f97b(0x5c6)],Bitmap['prototype'][_0x55f97b(0x5c6)]=function(_0xc74e53,_0x5cbb61){const _0x64ab3a=_0x55f97b;VisuMZ[_0x64ab3a(0x4af)][_0x64ab3a(0x19d)][_0x64ab3a(0x8a8)](this,_0xc74e53,_0x5cbb61),this[_0x64ab3a(0x5f2)]();},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x5cd)]=Bitmap[_0x55f97b(0x616)][_0x55f97b(0x7f8)],Bitmap[_0x55f97b(0x616)][_0x55f97b(0x7f8)]=function(_0x2726d2,_0x318164,_0x55d38b,_0x43ee81,_0x254a87,_0xe1a40,_0x42ddd9,_0x57c8e6,_0x37f052){const _0x189ff6=_0x55f97b;_0x318164=Math[_0x189ff6(0x7dd)](_0x318164),_0x55d38b=Math[_0x189ff6(0x7dd)](_0x55d38b),_0x43ee81=Math['round'](_0x43ee81),_0x254a87=Math[_0x189ff6(0x7dd)](_0x254a87),_0xe1a40=Math[_0x189ff6(0x7dd)](_0xe1a40),_0x42ddd9=Math[_0x189ff6(0x7dd)](_0x42ddd9),VisuMZ[_0x189ff6(0x4af)][_0x189ff6(0x5cd)][_0x189ff6(0x8a8)](this,_0x2726d2,_0x318164,_0x55d38b,_0x43ee81,_0x254a87,_0xe1a40,_0x42ddd9,_0x57c8e6,_0x37f052),this[_0x189ff6(0x5f2)]();},VisuMZ['CoreEngine']['Bitmap_clearRect']=Bitmap[_0x55f97b(0x616)][_0x55f97b(0x40c)],Bitmap[_0x55f97b(0x616)]['clearRect']=function(_0x498047,_0x40ca99,_0x58869f,_0x3bfc89){const _0x32b6e1=_0x55f97b;VisuMZ[_0x32b6e1(0x4af)][_0x32b6e1(0x245)][_0x32b6e1(0x8a8)](this,_0x498047,_0x40ca99,_0x58869f,_0x3bfc89),this[_0x32b6e1(0x5f2)]();},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x324)]=Bitmap[_0x55f97b(0x616)][_0x55f97b(0x5ba)],Bitmap[_0x55f97b(0x616)][_0x55f97b(0x5ba)]=function(_0x32e536,_0x270c71,_0x54ba1f,_0x725e3,_0x405cd2){const _0x4ea764=_0x55f97b;VisuMZ[_0x4ea764(0x4af)][_0x4ea764(0x324)][_0x4ea764(0x8a8)](this,_0x32e536,_0x270c71,_0x54ba1f,_0x725e3,_0x405cd2),this[_0x4ea764(0x5f2)]();},VisuMZ[_0x55f97b(0x4af)]['Bitmap_strokeRect']=Bitmap[_0x55f97b(0x616)][_0x55f97b(0x40e)],Bitmap[_0x55f97b(0x616)][_0x55f97b(0x40e)]=function(_0x13b90e,_0x11689d,_0x242e22,_0x5485cf,_0x3a306e){const _0x5047a1=_0x55f97b;VisuMZ['CoreEngine'][_0x5047a1(0x39d)][_0x5047a1(0x8a8)](this,_0x13b90e,_0x11689d,_0x242e22,_0x5485cf,_0x3a306e),this['markCoreEngineModified']();},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x833)]=Bitmap[_0x55f97b(0x616)][_0x55f97b(0x87a)],Bitmap[_0x55f97b(0x616)][_0x55f97b(0x87a)]=function(_0x2b0c9d,_0x258045,_0x30c8f5,_0x9d1b2d,_0xd2f9cd,_0x1112a0,_0x1926ce){const _0xa9fd04=_0x55f97b;VisuMZ[_0xa9fd04(0x4af)][_0xa9fd04(0x833)][_0xa9fd04(0x8a8)](this,_0x2b0c9d,_0x258045,_0x30c8f5,_0x9d1b2d,_0xd2f9cd,_0x1112a0,_0x1926ce),this[_0xa9fd04(0x5f2)]();},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x8a4)]=Bitmap[_0x55f97b(0x616)]['drawCircle'],Bitmap[_0x55f97b(0x616)][_0x55f97b(0x3d5)]=function(_0x540abd,_0x348726,_0x15c19c,_0x31f194){const _0x456e8e=_0x55f97b;_0x540abd=Math[_0x456e8e(0x7dd)](_0x540abd),_0x348726=Math['round'](_0x348726),_0x15c19c=Math['round'](_0x15c19c),VisuMZ[_0x456e8e(0x4af)]['Bitmap_drawCircle'][_0x456e8e(0x8a8)](this,_0x540abd,_0x348726,_0x15c19c,_0x31f194),this[_0x456e8e(0x5f2)]();},VisuMZ['CoreEngine'][_0x55f97b(0x24a)]=Bitmap['prototype'][_0x55f97b(0x85d)],Bitmap[_0x55f97b(0x616)][_0x55f97b(0x85d)]=function(_0xb2f938){const _0x54bab0=_0x55f97b;return Math['ceil'](VisuMZ[_0x54bab0(0x4af)]['Bitmap_measureTextWidth']['call'](this,_0xb2f938));},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x562)]=Bitmap['prototype']['drawText'],Bitmap[_0x55f97b(0x616)][_0x55f97b(0x590)]=function(_0x4c5391,_0x472914,_0x47a8b4,_0x2c25fb,_0x16a939,_0x3c0ae7){const _0x33fbae=_0x55f97b;_0x472914=Math[_0x33fbae(0x7dd)](_0x472914),_0x47a8b4=Math['round'](_0x47a8b4),_0x2c25fb=Math[_0x33fbae(0x6af)](_0x2c25fb),_0x16a939=Math['ceil'](_0x16a939),VisuMZ['CoreEngine'][_0x33fbae(0x562)][_0x33fbae(0x8a8)](this,_0x4c5391,_0x472914,_0x47a8b4,_0x2c25fb,_0x16a939,_0x3c0ae7),this[_0x33fbae(0x5f2)]();},VisuMZ['CoreEngine'][_0x55f97b(0x94d)]=Bitmap[_0x55f97b(0x616)]['_drawTextOutline'],Bitmap[_0x55f97b(0x616)][_0x55f97b(0x7e3)]=function(_0x59a433,_0x41f4cb,_0x2eb702,_0x2cbb73){const _0x137f97=_0x55f97b;VisuMZ[_0x137f97(0x4af)]['Settings'][_0x137f97(0x585)][_0x137f97(0x819)]?this[_0x137f97(0x2d0)](_0x59a433,_0x41f4cb,_0x2eb702,_0x2cbb73):VisuMZ[_0x137f97(0x4af)][_0x137f97(0x94d)][_0x137f97(0x8a8)](this,_0x59a433,_0x41f4cb,_0x2eb702,_0x2cbb73);},Bitmap['prototype']['_drawTextShadow']=function(_0x4594c0,_0x5f0ee4,_0x350f5f,_0x329f20){const _0x5c1284=_0x55f97b,_0x1d066e=this['context'];_0x1d066e[_0x5c1284(0x56f)]=this['outlineColor'],_0x1d066e['fillText'](_0x4594c0,_0x5f0ee4+0x2,_0x350f5f+0x2,_0x329f20);},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x7d0)]=Input[_0x55f97b(0x4fc)],Input[_0x55f97b(0x4fc)]=function(){const _0x2bcd6d=_0x55f97b;VisuMZ[_0x2bcd6d(0x4af)][_0x2bcd6d(0x7d0)][_0x2bcd6d(0x8a8)](this),this[_0x2bcd6d(0x2c7)]=undefined,this[_0x2bcd6d(0x775)]=undefined,this[_0x2bcd6d(0x841)]=Input['keyRepeatWait'];},VisuMZ['CoreEngine'][_0x55f97b(0x4d1)]=Input[_0x55f97b(0x94f)],Input[_0x55f97b(0x94f)]=function(){const _0x1e6e67=_0x55f97b;VisuMZ[_0x1e6e67(0x4af)][_0x1e6e67(0x4d1)][_0x1e6e67(0x8a8)](this);if(this[_0x1e6e67(0x841)])this[_0x1e6e67(0x841)]--;},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x2b6)]=Input[_0x55f97b(0x218)],Input['_pollGamepads']=function(){const _0x40ff4f=_0x55f97b;if(this[_0x40ff4f(0x841)])return;VisuMZ[_0x40ff4f(0x4af)][_0x40ff4f(0x2b6)][_0x40ff4f(0x8a8)](this);},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x2b3)]=Input[_0x55f97b(0x970)],Input[_0x55f97b(0x970)]=function(){const _0x3ff197=_0x55f97b;VisuMZ[_0x3ff197(0x4af)][_0x3ff197(0x2b3)][_0x3ff197(0x8a8)](this),document[_0x3ff197(0x673)]('keypress',this[_0x3ff197(0x204)]['bind'](this));},VisuMZ[_0x55f97b(0x4af)]['Input_onKeyDown']=Input[_0x55f97b(0x30b)],Input[_0x55f97b(0x30b)]=function(_0x13d7d1){const _0x50fcab=_0x55f97b;this[_0x50fcab(0x775)]=_0x13d7d1['keyCode'],VisuMZ[_0x50fcab(0x4af)]['Input_onKeyDown'][_0x50fcab(0x8a8)](this,_0x13d7d1),this['setLastGamepadUsed'](null);},Input['_onKeyPress']=function(_0x412831){this['_registerKeyInput'](_0x412831);},Input[_0x55f97b(0x339)]=function(_0x3f0221){const _0x2194dc=_0x55f97b;this[_0x2194dc(0x775)]=_0x3f0221['keyCode'];let _0x381826=String['fromCharCode'](_0x3f0221[_0x2194dc(0x51e)]);this['_inputString']===undefined?this[_0x2194dc(0x2c7)]=_0x381826:this[_0x2194dc(0x2c7)]+=_0x381826;},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x66a)]=Input[_0x55f97b(0x7de)],Input[_0x55f97b(0x7de)]=function(_0x12b997){const _0xd3d6e=_0x55f97b;if(_0x12b997===0x8)return![];return VisuMZ[_0xd3d6e(0x4af)]['Input_shouldPreventDefault'][_0xd3d6e(0x8a8)](this,_0x12b997);},Input[_0x55f97b(0x216)]=function(_0xe55746){const _0x24b097=_0x55f97b;if(_0xe55746['match'](/backspace/i))return this['_inputSpecialKeyCode']===0x8;if(_0xe55746[_0x24b097(0x4f2)](/enter/i))return this[_0x24b097(0x775)]===0xd;if(_0xe55746[_0x24b097(0x4f2)](/escape/i))return this['_inputSpecialKeyCode']===0x1b;},Input[_0x55f97b(0x53a)]=function(){const _0x32c8fa=_0x55f97b;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39]['contains'](this[_0x32c8fa(0x775)]);},Input[_0x55f97b(0x893)]=function(){const _0x2f1b3f=_0x55f97b;return[0x25,0x26,0x27,0x28][_0x2f1b3f(0x3cd)](this[_0x2f1b3f(0x775)]);},Input['isGamepadConnected']=function(){const _0x2bdfd1=_0x55f97b;if(navigator[_0x2bdfd1(0x7e9)]){const _0xa772ca=navigator[_0x2bdfd1(0x7e9)]();if(_0xa772ca)for(const _0x542f7f of _0xa772ca){if(_0x542f7f&&_0x542f7f[_0x2bdfd1(0x396)])return!![];}}return![];},Input[_0x55f97b(0x626)]=function(){const _0x2f5ccc=_0x55f97b;if(navigator[_0x2f5ccc(0x7e9)]){const _0x1df303=navigator[_0x2f5ccc(0x7e9)]();if(_0x1df303)for(const _0x3e73bf of _0x1df303){if(_0x3e73bf&&_0x3e73bf['connected']){if(this['isGamepadButtonPressed'](_0x3e73bf))return!![];if(this[_0x2f5ccc(0x5dd)](_0x3e73bf))return!![];}}}return![];},Input[_0x55f97b(0x315)]=function(_0x221755){const _0x34634f=_0x55f97b,_0x915dcd=_0x221755['buttons'];for(let _0x1881f1=0x0;_0x1881f1<_0x915dcd[_0x34634f(0x382)];_0x1881f1++){if(_0x915dcd[_0x1881f1]['pressed'])return!![];}return![];},Input[_0x55f97b(0x5dd)]=function(_0x19bbfb){const _0x1515f3=_0x55f97b,_0x47ecf4=_0x19bbfb[_0x1515f3(0x511)],_0x29aee3=0.5;if(_0x47ecf4[0x0]<-_0x29aee3)return!![];if(_0x47ecf4[0x0]>_0x29aee3)return!![];if(_0x47ecf4[0x1]<-_0x29aee3)return!![];if(_0x47ecf4[0x1]>_0x29aee3)return!![];return![];},Input[_0x55f97b(0x962)]=function(){return this['_lastGamepad']||null;},Input[_0x55f97b(0x301)]=function(_0x4d7ec4){this['_lastGamepad']=_0x4d7ec4;},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x38d)]=Input[_0x55f97b(0x8b7)],Input[_0x55f97b(0x8b7)]=function(_0x58d72a){const _0x462691=_0x55f97b;VisuMZ[_0x462691(0x4af)]['Input_updateGamepadState'][_0x462691(0x8a8)](this,_0x58d72a),(this[_0x462691(0x315)](_0x58d72a)||this[_0x462691(0x5dd)](_0x58d72a))&&this[_0x462691(0x301)](_0x58d72a);},Input[_0x55f97b(0x69c)]=function(){const _0x39c2cc=_0x55f97b;return this[_0x39c2cc(0x47a)]?this[_0x39c2cc(0x47a)]['id']:_0x39c2cc(0x1e7);},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x4c3)]=Tilemap[_0x55f97b(0x616)][_0x55f97b(0x307)],Tilemap['prototype']['_addShadow']=function(_0x1e55b0,_0x50c49b,_0x2eb1e2,_0x1238bb){const _0xf056a3=_0x55f97b;if($gameMap&&$gameMap[_0xf056a3(0x7d3)]())return;VisuMZ[_0xf056a3(0x4af)][_0xf056a3(0x4c3)][_0xf056a3(0x8a8)](this,_0x1e55b0,_0x50c49b,_0x2eb1e2,_0x1238bb);},Tilemap[_0x55f97b(0x337)][_0x55f97b(0x616)][_0x55f97b(0x49d)]=function(){const _0x6a21c=_0x55f97b;this[_0x6a21c(0x8ea)]();for(let _0x37b349=0x0;_0x37b349<Tilemap['Layer']['MAX_GL_TEXTURES'];_0x37b349++){const _0x5e88aa=new PIXI[(_0x6a21c(0x8fe))]();_0x5e88aa[_0x6a21c(0x1eb)](0x800,0x800),VisuMZ[_0x6a21c(0x4af)]['Settings'][_0x6a21c(0x585)][_0x6a21c(0x842)]&&(_0x5e88aa['scaleMode']=PIXI[_0x6a21c(0x765)][_0x6a21c(0x4a8)]),this['_internalTextures'][_0x6a21c(0x35b)](_0x5e88aa);}},WindowLayer[_0x55f97b(0x616)][_0x55f97b(0x6fc)]=function(){const _0x2c9ff7=_0x55f97b;return SceneManager&&SceneManager[_0x2c9ff7(0x49f)]?SceneManager[_0x2c9ff7(0x49f)][_0x2c9ff7(0x918)]():!![];},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x5ad)]=WindowLayer[_0x55f97b(0x616)]['render'],WindowLayer[_0x55f97b(0x616)]['render']=function render(_0x588027){const _0x2af167=_0x55f97b;this[_0x2af167(0x6fc)]()?VisuMZ[_0x2af167(0x4af)][_0x2af167(0x5ad)][_0x2af167(0x8a8)](this,_0x588027):this[_0x2af167(0x904)](_0x588027);},WindowLayer[_0x55f97b(0x616)][_0x55f97b(0x904)]=function render(_0x2747b0){const _0xbdac13=_0x55f97b;if(!this['visible'])return;const _0x38997c=new PIXI[(_0xbdac13(0x5b3))](),_0x5f3765=_0x2747b0['gl'],_0xecef62=this['children'][_0xbdac13(0x47b)]();_0x2747b0['framebuffer']['forceStencil'](),_0x38997c['transform']=this[_0xbdac13(0x439)],_0x2747b0[_0xbdac13(0x6f1)]['flush'](),_0x5f3765['enable'](_0x5f3765[_0xbdac13(0x908)]);while(_0xecef62[_0xbdac13(0x382)]>0x0){const _0x2462ee=_0xecef62[_0xbdac13(0x4c6)]();_0x2462ee[_0xbdac13(0x3ff)]&&_0x2462ee[_0xbdac13(0x292)]&&_0x2462ee[_0xbdac13(0x725)]>0x0&&(_0x5f3765[_0xbdac13(0x83b)](_0x5f3765[_0xbdac13(0x530)],0x0,~0x0),_0x5f3765[_0xbdac13(0x865)](_0x5f3765[_0xbdac13(0x570)],_0x5f3765['KEEP'],_0x5f3765[_0xbdac13(0x570)]),_0x2462ee['render'](_0x2747b0),_0x2747b0[_0xbdac13(0x6f1)][_0xbdac13(0x522)](),_0x38997c[_0xbdac13(0x4fc)](),_0x5f3765[_0xbdac13(0x83b)](_0x5f3765['ALWAYS'],0x1,~0x0),_0x5f3765[_0xbdac13(0x865)](_0x5f3765[_0xbdac13(0x550)],_0x5f3765[_0xbdac13(0x550)],_0x5f3765[_0xbdac13(0x550)]),_0x5f3765['blendFunc'](_0x5f3765[_0xbdac13(0x1a9)],_0x5f3765[_0xbdac13(0x662)]),_0x38997c[_0xbdac13(0x975)](_0x2747b0),_0x2747b0[_0xbdac13(0x6f1)]['flush'](),_0x5f3765[_0xbdac13(0x6da)](_0x5f3765['ONE'],_0x5f3765[_0xbdac13(0x959)]));}_0x5f3765[_0xbdac13(0x986)](_0x5f3765[_0xbdac13(0x908)]),_0x5f3765[_0xbdac13(0x4fc)](_0x5f3765[_0xbdac13(0x5cc)]),_0x5f3765[_0xbdac13(0x983)](0x0),_0x2747b0[_0xbdac13(0x6f1)][_0xbdac13(0x522)]();for(const _0x2d1d7e of this[_0xbdac13(0x94e)]){!_0x2d1d7e[_0xbdac13(0x3ff)]&&_0x2d1d7e[_0xbdac13(0x292)]&&_0x2d1d7e[_0xbdac13(0x975)](_0x2747b0);}_0x2747b0['batch'][_0xbdac13(0x522)]();},DataManager[_0x55f97b(0x98a)]=function(_0x5e4da8){const _0x56c134=_0x55f97b;return this[_0x56c134(0x2d5)](_0x5e4da8)&&_0x5e4da8[_0x56c134(0x2e0)]===0x2;},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x54d)]=DataManager['setupNewGame'],DataManager[_0x55f97b(0x420)]=function(){const _0x3ee396=_0x55f97b;VisuMZ['CoreEngine'][_0x3ee396(0x54d)]['call'](this),this[_0x3ee396(0x367)](),this['reserveNewGameCommonEvent']();},DataManager['reservePlayTestNewGameCommonEvent']=function(){const _0x5b6d1d=_0x55f97b;if($gameTemp['isPlaytest']()){const _0x3cd197=VisuMZ[_0x5b6d1d(0x4af)]['Settings'][_0x5b6d1d(0x585)][_0x5b6d1d(0x804)];if(_0x3cd197>0x0)$gameTemp['reserveCommonEvent'](_0x3cd197);}},DataManager[_0x55f97b(0x7d9)]=function(){const _0x214f95=_0x55f97b,_0x3548cb=VisuMZ['CoreEngine'][_0x214f95(0x386)][_0x214f95(0x585)][_0x214f95(0x816)]||0x0;if(_0x3548cb>0x0)$gameTemp['reserveCommonEvent'](_0x3548cb);},DataManager['createTroopNote']=function(_0x2cd04b){const _0x2c5d2d=_0x55f97b,_0x56dcd4=$dataTroops[_0x2cd04b];if(!_0x56dcd4)return'';let _0x1888e1='';_0x1888e1+=_0x56dcd4[_0x2c5d2d(0x1bc)];for(const _0x8fe638 of _0x56dcd4['pages']){for(const _0x30c04b of _0x8fe638[_0x2c5d2d(0x255)]){[0x6c,0x198][_0x2c5d2d(0x3e4)](_0x30c04b[_0x2c5d2d(0x879)])&&(_0x1888e1+='\x0a',_0x1888e1+=_0x30c04b[_0x2c5d2d(0x87d)][0x0]);}}return _0x1888e1;};(VisuMZ[_0x55f97b(0x4af)]['Settings'][_0x55f97b(0x585)][_0x55f97b(0x737)]??!![])&&($scene=null,VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x1d4)]=Scene_Base[_0x55f97b(0x616)]['create'],Scene_Base[_0x55f97b(0x616)]['create']=function(){const _0x33724d=_0x55f97b;VisuMZ['CoreEngine'][_0x33724d(0x1d4)]['call'](this),$scene=this;},$spriteset=null,VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x4c2)]=Scene_Map[_0x55f97b(0x616)][_0x55f97b(0x26e)],Scene_Map[_0x55f97b(0x616)]['createSpriteset']=function(){const _0x2b3a53=_0x55f97b;VisuMZ['CoreEngine'][_0x2b3a53(0x4c2)][_0x2b3a53(0x8a8)](this),$spriteset=this[_0x2b3a53(0x891)];},VisuMZ['CoreEngine'][_0x55f97b(0x578)]=Scene_Battle['prototype'][_0x55f97b(0x26e)],Scene_Battle[_0x55f97b(0x616)][_0x55f97b(0x26e)]=function(){const _0x356f37=_0x55f97b;VisuMZ[_0x356f37(0x4af)]['Scene_Battle_createSpriteset'][_0x356f37(0x8a8)](this),$spriteset=this[_0x356f37(0x891)];},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x8f4)]=Scene_Base['prototype'][_0x55f97b(0x3ef)],Scene_Base[_0x55f97b(0x616)][_0x55f97b(0x3ef)]=function(){const _0x453dd3=_0x55f97b;VisuMZ[_0x453dd3(0x4af)][_0x453dd3(0x8f4)]['call'](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x523)]=BattleManager[_0x55f97b(0x94f)],BattleManager[_0x55f97b(0x94f)]=function(_0x22c6d3){const _0xa518a2=_0x55f97b;VisuMZ[_0xa518a2(0x4af)][_0xa518a2(0x523)][_0xa518a2(0x8a8)](this,_0x22c6d3),this[_0xa518a2(0x63e)]();},BattleManager[_0x55f97b(0x63e)]=function(){const _0x967da0=_0x55f97b;$subject=this[_0x967da0(0x46c)],$targets=this[_0x967da0(0x88d)],$target=this[_0x967da0(0x84f)]||this[_0x967da0(0x88d)][0x0];},$event=null,VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x781)]=Game_Event[_0x55f97b(0x616)][_0x55f97b(0x35f)],Game_Event[_0x55f97b(0x616)][_0x55f97b(0x35f)]=function(){const _0x345ce6=_0x55f97b;VisuMZ[_0x345ce6(0x4af)]['Game_Event_start'][_0x345ce6(0x8a8)](this),$event=this;},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x717)]=Scene_Map[_0x55f97b(0x616)]['update'],Scene_Map[_0x55f97b(0x616)][_0x55f97b(0x94f)]=function(){const _0x25ca00=_0x55f97b;VisuMZ[_0x25ca00(0x4af)][_0x25ca00(0x717)]['call'](this),$gameMap['updateCurrentEvent']();},Game_Map[_0x55f97b(0x616)][_0x55f97b(0x961)]=function(){const _0x5dd9d4=_0x55f97b;!this[_0x5dd9d4(0x6db)]()&&$event!==null&&($event=null);},$commonEvent=function(_0x2f9f92){if($gameTemp)$gameTemp['reserveCommonEvent'](_0x2f9f92);});;$onceParallel=function(_0x4d33c0,_0x49a3de){const _0x2f8793=_0x55f97b;if(SceneManager[_0x2f8793(0x732)]())SceneManager[_0x2f8793(0x49f)]['playOnceParallelInterpreter'](_0x4d33c0,_0x49a3de);else{if(SceneManager[_0x2f8793(0x985)]()){if(Imported['VisuMZ_1_BattleCore'])SceneManager[_0x2f8793(0x49f)]['playOnceParallelInterpreter'](_0x4d33c0);else $gameTemp&&$gameTemp['isPlaytest']()&&alert(_0x2f8793(0x733));}else $gameTemp&&$gameTemp[_0x2f8793(0x206)]()&&alert('This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!');}},StorageManager[_0x55f97b(0x331)]=function(_0x2642e2){return new Promise((_0x504f2c,_0x41646b)=>{const _0x2e738d=_0x2f79;try{const _0xd4524d=pako[_0x2e738d(0x8e6)](_0x2642e2,{'to':_0x2e738d(0x81b),'level':0x1});if(_0xd4524d[_0x2e738d(0x382)]>=0xc350){}_0x504f2c(_0xd4524d);}catch(_0x43a7a0){_0x41646b(_0x43a7a0);}});},TextManager[_0x55f97b(0x536)]=['','','','CANCEL','','',_0x55f97b(0x711),'','BACKSPACE',_0x55f97b(0x566),'','',_0x55f97b(0x663),'ENTER',_0x55f97b(0x1cf),'',_0x55f97b(0x507),_0x55f97b(0x397),_0x55f97b(0x613),'PAUSE',_0x55f97b(0x25a),_0x55f97b(0x926),'EISU','JUNJA',_0x55f97b(0x458),_0x55f97b(0x87f),'','ESC','CONVERT','NONCONVERT',_0x55f97b(0x5af),_0x55f97b(0x51a),_0x55f97b(0x52c),_0x55f97b(0x4ed),_0x55f97b(0x91b),_0x55f97b(0x3dc),_0x55f97b(0x3c2),_0x55f97b(0x5b8),'UP',_0x55f97b(0x634),_0x55f97b(0x858),_0x55f97b(0x712),_0x55f97b(0x1b9),_0x55f97b(0x783),_0x55f97b(0x208),_0x55f97b(0x874),_0x55f97b(0x517),'','0','1','2','3','4','5','6','7','8','9',_0x55f97b(0x574),_0x55f97b(0x93a),_0x55f97b(0x8f0),_0x55f97b(0x4aa),_0x55f97b(0x686),_0x55f97b(0x7bb),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x55f97b(0x980),'',_0x55f97b(0x934),'',_0x55f97b(0x688),_0x55f97b(0x55d),_0x55f97b(0x2b8),_0x55f97b(0x6ae),'NUMPAD3',_0x55f97b(0x356),'NUMPAD5','NUMPAD6','NUMPAD7','NUMPAD8','NUMPAD9',_0x55f97b(0x89e),_0x55f97b(0x4bd),_0x55f97b(0x38b),_0x55f97b(0x5fa),_0x55f97b(0x4bc),_0x55f97b(0x223),'F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x55f97b(0x251),'F11','F12','F13',_0x55f97b(0x561),'F15','F16',_0x55f97b(0x377),'F18',_0x55f97b(0x38a),_0x55f97b(0x4d4),_0x55f97b(0x387),_0x55f97b(0x4f1),_0x55f97b(0x3e3),_0x55f97b(0x799),'','','','','','','','',_0x55f97b(0x6e7),'SCROLL_LOCK',_0x55f97b(0x62a),_0x55f97b(0x47f),_0x55f97b(0x801),_0x55f97b(0x3c9),_0x55f97b(0x392),'','','','','','','','','','CIRCUMFLEX',_0x55f97b(0x457),_0x55f97b(0x710),_0x55f97b(0x3b9),_0x55f97b(0x6fd),_0x55f97b(0x406),_0x55f97b(0x3c8),_0x55f97b(0x62d),_0x55f97b(0x45c),_0x55f97b(0x7d7),_0x55f97b(0x632),_0x55f97b(0x70f),_0x55f97b(0x68b),_0x55f97b(0x274),_0x55f97b(0x72b),'CLOSE_CURLY_BRACKET',_0x55f97b(0x243),'','','','',_0x55f97b(0x967),'VOLUME_DOWN',_0x55f97b(0x8dd),'','',_0x55f97b(0x93a),_0x55f97b(0x4aa),'COMMA','MINUS',_0x55f97b(0x969),_0x55f97b(0x3a2),_0x55f97b(0x6cb),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x55f97b(0x565),_0x55f97b(0x6e8),_0x55f97b(0x7bc),_0x55f97b(0x2bd),'','META',_0x55f97b(0x542),'',_0x55f97b(0x306),_0x55f97b(0x6f4),'',_0x55f97b(0x1a6),'','',_0x55f97b(0x504),'WIN_OEM_JUMP',_0x55f97b(0x3c1),_0x55f97b(0x82a),_0x55f97b(0x72d),_0x55f97b(0x69e),_0x55f97b(0x304),_0x55f97b(0x7be),_0x55f97b(0x7fa),_0x55f97b(0x405),_0x55f97b(0x63d),_0x55f97b(0x67b),_0x55f97b(0x410),_0x55f97b(0x95d),_0x55f97b(0x508),_0x55f97b(0x435),_0x55f97b(0x920),_0x55f97b(0x4ee),_0x55f97b(0x3fc),'',_0x55f97b(0x411),'WIN_OEM_CLEAR',''],TextManager['buttonAssistOk']=VisuMZ[_0x55f97b(0x4af)]['Settings'][_0x55f97b(0x6ec)][_0x55f97b(0x736)],TextManager['buttonAssistCancel']=VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x386)][_0x55f97b(0x6ec)]['CancelText'],TextManager[_0x55f97b(0x726)]=VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x386)][_0x55f97b(0x6ec)][_0x55f97b(0x749)],VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x416)]=TextManager['param'],TextManager[_0x55f97b(0x65f)]=function(_0x16cfd3){const _0xa908ac=_0x55f97b;return typeof _0x16cfd3==='number'?VisuMZ[_0xa908ac(0x4af)][_0xa908ac(0x416)]['call'](this,_0x16cfd3):this['paramName'](_0x16cfd3);},TextManager[_0x55f97b(0x291)]=function(_0x2f35eb){const _0x67538a=_0x55f97b;_0x2f35eb=String(_0x2f35eb||'')[_0x67538a(0x427)]();const _0xc6e2ef=VisuMZ['CoreEngine'][_0x67538a(0x386)][_0x67538a(0x91f)];if(_0x2f35eb===_0x67538a(0x6de))return $dataSystem[_0x67538a(0x5dc)][_0x67538a(0x8bf)][0x0];if(_0x2f35eb==='MAXMP')return $dataSystem[_0x67538a(0x5dc)][_0x67538a(0x8bf)][0x1];if(_0x2f35eb===_0x67538a(0x832))return $dataSystem['terms']['params'][0x2];if(_0x2f35eb===_0x67538a(0x261))return $dataSystem[_0x67538a(0x5dc)][_0x67538a(0x8bf)][0x3];if(_0x2f35eb===_0x67538a(0x6d7))return $dataSystem['terms'][_0x67538a(0x8bf)][0x4];if(_0x2f35eb===_0x67538a(0x8f2))return $dataSystem[_0x67538a(0x5dc)]['params'][0x5];if(_0x2f35eb===_0x67538a(0x385))return $dataSystem[_0x67538a(0x5dc)][_0x67538a(0x8bf)][0x6];if(_0x2f35eb===_0x67538a(0x6e4))return $dataSystem[_0x67538a(0x5dc)][_0x67538a(0x8bf)][0x7];if(_0x2f35eb===_0x67538a(0x64d))return _0xc6e2ef[_0x67538a(0x476)];if(_0x2f35eb==='EVA')return _0xc6e2ef[_0x67538a(0x5f1)];if(_0x2f35eb===_0x67538a(0x34c))return _0xc6e2ef[_0x67538a(0x612)];if(_0x2f35eb===_0x67538a(0x3d4))return _0xc6e2ef[_0x67538a(0x73b)];if(_0x2f35eb===_0x67538a(0x399))return _0xc6e2ef[_0x67538a(0x6b6)];if(_0x2f35eb===_0x67538a(0x4e4))return _0xc6e2ef['XParamVocab5'];if(_0x2f35eb===_0x67538a(0x44d))return _0xc6e2ef['XParamVocab6'];if(_0x2f35eb===_0x67538a(0x77c))return _0xc6e2ef[_0x67538a(0x5ee)];if(_0x2f35eb===_0x67538a(0x8bc))return _0xc6e2ef['XParamVocab8'];if(_0x2f35eb==='TRG')return _0xc6e2ef[_0x67538a(0x5a8)];if(_0x2f35eb===_0x67538a(0x818))return _0xc6e2ef[_0x67538a(0x53f)];if(_0x2f35eb==='GRD')return _0xc6e2ef[_0x67538a(0x7ab)];if(_0x2f35eb===_0x67538a(0x4f4))return _0xc6e2ef[_0x67538a(0x7eb)];if(_0x2f35eb===_0x67538a(0x6f2))return _0xc6e2ef[_0x67538a(0x488)];if(_0x2f35eb===_0x67538a(0x19c))return _0xc6e2ef[_0x67538a(0x28d)];if(_0x2f35eb===_0x67538a(0x23d))return _0xc6e2ef[_0x67538a(0x268)];if(_0x2f35eb===_0x67538a(0x756))return _0xc6e2ef['SParamVocab6'];if(_0x2f35eb==='MDR')return _0xc6e2ef[_0x67538a(0x7c5)];if(_0x2f35eb===_0x67538a(0x6ef))return _0xc6e2ef[_0x67538a(0x2ae)];if(_0x2f35eb===_0x67538a(0x78d))return _0xc6e2ef[_0x67538a(0x38c)];if(VisuMZ['CoreEngine'][_0x67538a(0x654)][_0x2f35eb])return VisuMZ[_0x67538a(0x4af)]['CustomParamNames'][_0x2f35eb];return'';},TextManager[_0x55f97b(0x39b)]=function(_0x368ad3){const _0x212084=_0x55f97b,_0x5b8fcf=Input[_0x212084(0x69c)]();return _0x5b8fcf===_0x212084(0x1e7)?this[_0x212084(0x2ab)](_0x368ad3):this[_0x212084(0x734)](_0x5b8fcf,_0x368ad3);},TextManager[_0x55f97b(0x2ab)]=function(_0x5468c0){const _0x20a75=_0x55f97b;let _0x380f90=VisuMZ[_0x20a75(0x4af)]['Settings'][_0x20a75(0x6ec)][_0x20a75(0x473)];if(!_0x380f90){if(_0x5468c0===_0x20a75(0x8ce))_0x5468c0=_0x20a75(0x36f);if(_0x5468c0===_0x20a75(0x547))_0x5468c0=_0x20a75(0x36f);}let _0x5626ea=[];for(let _0x2ba293 in Input['keyMapper']){_0x2ba293=Number(_0x2ba293);if(_0x2ba293>=0x60&&_0x2ba293<=0x69)continue;if([0x12,0x20][_0x20a75(0x3e4)](_0x2ba293))continue;_0x5468c0===Input[_0x20a75(0x39a)][_0x2ba293]&&_0x5626ea[_0x20a75(0x35b)](_0x2ba293);}for(let _0x2f1011=0x0;_0x2f1011<_0x5626ea[_0x20a75(0x382)];_0x2f1011++){_0x5626ea[_0x2f1011]=TextManager[_0x20a75(0x536)][_0x5626ea[_0x2f1011]];}return this[_0x20a75(0x8f3)](_0x5626ea);},TextManager['makeInputButtonString']=function(_0x40c560){const _0x59ba8e=_0x55f97b,_0x1de21a=VisuMZ['CoreEngine'][_0x59ba8e(0x386)][_0x59ba8e(0x6ec)],_0x3f4287=_0x1de21a[_0x59ba8e(0x859)];let _0x3fbf1d='';if(_0x40c560[_0x59ba8e(0x3e4)]('UP'))_0x3fbf1d='UP';else{if(_0x40c560[_0x59ba8e(0x3e4)](_0x59ba8e(0x858)))_0x3fbf1d=_0x59ba8e(0x858);else{if(_0x40c560[_0x59ba8e(0x3e4)](_0x59ba8e(0x5b8)))_0x3fbf1d='LEFT';else _0x40c560[_0x59ba8e(0x3e4)](_0x59ba8e(0x634))?_0x3fbf1d=_0x59ba8e(0x634):_0x3fbf1d=_0x40c560[_0x59ba8e(0x21a)]();}}const _0x3d3aea=_0x59ba8e(0x601)['format'](_0x3fbf1d);return _0x1de21a[_0x3d3aea]?_0x1de21a[_0x3d3aea]:_0x3f4287[_0x59ba8e(0x55a)](_0x3fbf1d);},TextManager[_0x55f97b(0x45a)]=function(_0x44735f,_0x1b56cc){const _0x652ef8=_0x55f97b,_0x2db45d=VisuMZ['CoreEngine']['Settings'][_0x652ef8(0x6ec)],_0x4ab4b0=_0x2db45d['MultiKeyFmt'],_0x3b3a93=this[_0x652ef8(0x39b)](_0x44735f),_0x302b7c=this[_0x652ef8(0x39b)](_0x1b56cc);return _0x4ab4b0[_0x652ef8(0x55a)](_0x3b3a93,_0x302b7c);},TextManager[_0x55f97b(0x734)]=function(_0x19bb7f,_0x2dd104){const _0x528e3f=_0x55f97b,_0x8ae522=_0x19bb7f[_0x528e3f(0x5ac)]()[_0x528e3f(0x8e9)](),_0x1b0cb4=VisuMZ[_0x528e3f(0x4af)][_0x528e3f(0x637)][_0x8ae522];if(!_0x1b0cb4)return this['getControllerInputButtonMatch'](_0x19bb7f,_0x2dd104);return _0x1b0cb4[_0x2dd104]||this[_0x528e3f(0x2ab)](_0x19bb7f,_0x2dd104);},TextManager[_0x55f97b(0x899)]=function(_0x541013,_0x459398){const _0x5e1d99=_0x55f97b,_0x5ae691=_0x541013['toLowerCase']()[_0x5e1d99(0x8e9)]();for(const _0x278c61 in VisuMZ['CoreEngine'][_0x5e1d99(0x3ee)]){if(_0x5ae691[_0x5e1d99(0x3e4)](_0x278c61)){const _0x24b605=VisuMZ[_0x5e1d99(0x4af)][_0x5e1d99(0x3ee)][_0x278c61],_0x815926=VisuMZ['CoreEngine'][_0x5e1d99(0x637)][_0x24b605];return _0x815926[_0x459398]||this[_0x5e1d99(0x2ab)](_0x459398);}}return this[_0x5e1d99(0x2ab)](_0x459398);},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x552)]=ColorManager['loadWindowskin'],ColorManager[_0x55f97b(0x4ae)]=function(){const _0x3765cd=_0x55f97b;VisuMZ[_0x3765cd(0x4af)]['ColorManager_loadWindowskin'][_0x3765cd(0x8a8)](this),this[_0x3765cd(0x5e1)]=this[_0x3765cd(0x5e1)]||{};},ColorManager[_0x55f97b(0x22b)]=function(_0x3439da,_0x19fe0a){const _0x5f3ac5=_0x55f97b;return _0x19fe0a=String(_0x19fe0a),this[_0x5f3ac5(0x5e1)]=this['_colorCache']||{},_0x19fe0a[_0x5f3ac5(0x4f2)](/#(.*)/i)?this[_0x5f3ac5(0x5e1)][_0x3439da]=_0x5f3ac5(0x61d)[_0x5f3ac5(0x55a)](String(RegExp['$1'])):this[_0x5f3ac5(0x5e1)][_0x3439da]=this[_0x5f3ac5(0x4c7)](Number(_0x19fe0a)),this[_0x5f3ac5(0x5e1)][_0x3439da];},ColorManager[_0x55f97b(0x445)]=function(_0x2817f3){const _0x91cf38=_0x55f97b;return _0x2817f3=String(_0x2817f3),_0x2817f3[_0x91cf38(0x4f2)](/#(.*)/i)?_0x91cf38(0x61d)[_0x91cf38(0x55a)](String(RegExp['$1'])):this[_0x91cf38(0x4c7)](Number(_0x2817f3));},ColorManager[_0x55f97b(0x2dc)]=function(){const _0x596fed=_0x55f97b;this[_0x596fed(0x5e1)]={};},ColorManager[_0x55f97b(0x244)]=function(){const _0x47c904=_0x55f97b,_0x78283='_stored_normalColor';this[_0x47c904(0x5e1)]=this[_0x47c904(0x5e1)]||{};if(this[_0x47c904(0x5e1)][_0x78283])return this[_0x47c904(0x5e1)][_0x78283];const _0x2df4d4=VisuMZ[_0x47c904(0x4af)][_0x47c904(0x386)][_0x47c904(0x4e0)][_0x47c904(0x97e)];return this['getColorDataFromPluginParameters'](_0x78283,_0x2df4d4);},ColorManager[_0x55f97b(0x8e4)]=function(){const _0x325ed1=_0x55f97b,_0x553967=_0x325ed1(0x1a8);this[_0x325ed1(0x5e1)]=this['_colorCache']||{};if(this['_colorCache'][_0x553967])return this[_0x325ed1(0x5e1)][_0x553967];const _0xf74519=VisuMZ['CoreEngine'][_0x325ed1(0x386)][_0x325ed1(0x4e0)][_0x325ed1(0x470)];return this[_0x325ed1(0x22b)](_0x553967,_0xf74519);},ColorManager[_0x55f97b(0x79d)]=function(){const _0x2d6e7f=_0x55f97b,_0x6b604e=_0x2d6e7f(0x1e4);this[_0x2d6e7f(0x5e1)]=this[_0x2d6e7f(0x5e1)]||{};if(this[_0x2d6e7f(0x5e1)][_0x6b604e])return this[_0x2d6e7f(0x5e1)][_0x6b604e];const _0x551667=VisuMZ[_0x2d6e7f(0x4af)][_0x2d6e7f(0x386)][_0x2d6e7f(0x4e0)][_0x2d6e7f(0x27d)];return this['getColorDataFromPluginParameters'](_0x6b604e,_0x551667);},ColorManager['deathColor']=function(){const _0x115141=_0x55f97b,_0x1a8729=_0x115141(0x7fb);this['_colorCache']=this['_colorCache']||{};if(this[_0x115141(0x5e1)][_0x1a8729])return this[_0x115141(0x5e1)][_0x1a8729];const _0xbdef70=VisuMZ[_0x115141(0x4af)][_0x115141(0x386)][_0x115141(0x4e0)][_0x115141(0x29f)];return this[_0x115141(0x22b)](_0x1a8729,_0xbdef70);},ColorManager[_0x55f97b(0x53e)]=function(){const _0x344b14=_0x55f97b,_0x414fd4=_0x344b14(0x2c3);this[_0x344b14(0x5e1)]=this[_0x344b14(0x5e1)]||{};if(this[_0x344b14(0x5e1)][_0x414fd4])return this[_0x344b14(0x5e1)][_0x414fd4];const _0x1e8762=VisuMZ[_0x344b14(0x4af)][_0x344b14(0x386)][_0x344b14(0x4e0)][_0x344b14(0x50e)];return this[_0x344b14(0x22b)](_0x414fd4,_0x1e8762);},ColorManager[_0x55f97b(0x2fe)]=function(){const _0x436b98=_0x55f97b,_0x5aa2f=_0x436b98(0x956);this[_0x436b98(0x5e1)]=this[_0x436b98(0x5e1)]||{};if(this[_0x436b98(0x5e1)][_0x5aa2f])return this[_0x436b98(0x5e1)][_0x5aa2f];const _0x3ddbf0=VisuMZ[_0x436b98(0x4af)][_0x436b98(0x386)]['Color']['ColorHPGauge1'];return this[_0x436b98(0x22b)](_0x5aa2f,_0x3ddbf0);},ColorManager[_0x55f97b(0x679)]=function(){const _0x89dae0=_0x55f97b,_0x18fd2b=_0x89dae0(0x5e9);this[_0x89dae0(0x5e1)]=this[_0x89dae0(0x5e1)]||{};if(this[_0x89dae0(0x5e1)][_0x18fd2b])return this[_0x89dae0(0x5e1)][_0x18fd2b];const _0x20b93d=VisuMZ['CoreEngine'][_0x89dae0(0x386)]['Color'][_0x89dae0(0x86b)];return this[_0x89dae0(0x22b)](_0x18fd2b,_0x20b93d);},ColorManager[_0x55f97b(0x95c)]=function(){const _0x28c302=_0x55f97b,_0x58bc3a=_0x28c302(0x6dd);this['_colorCache']=this[_0x28c302(0x5e1)]||{};if(this[_0x28c302(0x5e1)][_0x58bc3a])return this[_0x28c302(0x5e1)][_0x58bc3a];const _0x50b276=VisuMZ['CoreEngine']['Settings'][_0x28c302(0x4e0)][_0x28c302(0x8a5)];return this[_0x28c302(0x22b)](_0x58bc3a,_0x50b276);},ColorManager[_0x55f97b(0x6d4)]=function(){const _0x5b20d4=_0x55f97b,_0x139132='_stored_mpGaugeColor2';this['_colorCache']=this[_0x5b20d4(0x5e1)]||{};if(this[_0x5b20d4(0x5e1)][_0x139132])return this[_0x5b20d4(0x5e1)][_0x139132];const _0x1937ff=VisuMZ[_0x5b20d4(0x4af)][_0x5b20d4(0x386)][_0x5b20d4(0x4e0)][_0x5b20d4(0x51c)];return this[_0x5b20d4(0x22b)](_0x139132,_0x1937ff);},ColorManager[_0x55f97b(0x469)]=function(){const _0x31bffc=_0x55f97b,_0x2e81b4=_0x31bffc(0x92f);this['_colorCache']=this[_0x31bffc(0x5e1)]||{};if(this[_0x31bffc(0x5e1)][_0x2e81b4])return this[_0x31bffc(0x5e1)][_0x2e81b4];const _0x118c7f=VisuMZ[_0x31bffc(0x4af)][_0x31bffc(0x386)][_0x31bffc(0x4e0)][_0x31bffc(0x977)];return this[_0x31bffc(0x22b)](_0x2e81b4,_0x118c7f);},ColorManager[_0x55f97b(0x604)]=function(){const _0x23dcc8=_0x55f97b,_0x4cffe3=_0x23dcc8(0x719);this[_0x23dcc8(0x5e1)]=this['_colorCache']||{};if(this[_0x23dcc8(0x5e1)][_0x4cffe3])return this[_0x23dcc8(0x5e1)][_0x4cffe3];const _0x389532=VisuMZ[_0x23dcc8(0x4af)][_0x23dcc8(0x386)][_0x23dcc8(0x4e0)][_0x23dcc8(0x6b3)];return this['getColorDataFromPluginParameters'](_0x4cffe3,_0x389532);},ColorManager[_0x55f97b(0x4dc)]=function(){const _0x87f0ae=_0x55f97b,_0x45cac6=_0x87f0ae(0x8b0);this[_0x87f0ae(0x5e1)]=this[_0x87f0ae(0x5e1)]||{};if(this['_colorCache'][_0x45cac6])return this[_0x87f0ae(0x5e1)][_0x45cac6];const _0x2c91ca=VisuMZ[_0x87f0ae(0x4af)][_0x87f0ae(0x386)][_0x87f0ae(0x4e0)][_0x87f0ae(0x890)];return this[_0x87f0ae(0x22b)](_0x45cac6,_0x2c91ca);},ColorManager[_0x55f97b(0x4e9)]=function(){const _0x1f87ac=_0x55f97b,_0x5ec1be='_stored_ctGaugeColor1';this[_0x1f87ac(0x5e1)]=this['_colorCache']||{};if(this[_0x1f87ac(0x5e1)][_0x5ec1be])return this[_0x1f87ac(0x5e1)][_0x5ec1be];const _0x568172=VisuMZ[_0x1f87ac(0x4af)]['Settings'][_0x1f87ac(0x4e0)]['ColorCTGauge1'];return this['getColorDataFromPluginParameters'](_0x5ec1be,_0x568172);},ColorManager[_0x55f97b(0x1e3)]=function(){const _0x182cb1=_0x55f97b,_0xf709c0=_0x182cb1(0x19f);this[_0x182cb1(0x5e1)]=this[_0x182cb1(0x5e1)]||{};if(this[_0x182cb1(0x5e1)][_0xf709c0])return this['_colorCache'][_0xf709c0];const _0x19781e=VisuMZ[_0x182cb1(0x4af)][_0x182cb1(0x386)]['Color'][_0x182cb1(0x4bf)];return this[_0x182cb1(0x22b)](_0xf709c0,_0x19781e);},ColorManager[_0x55f97b(0x359)]=function(){const _0x1001a8=_0x55f97b,_0x6f39a7='_stored_tpGaugeColor1';this[_0x1001a8(0x5e1)]=this[_0x1001a8(0x5e1)]||{};if(this[_0x1001a8(0x5e1)][_0x6f39a7])return this['_colorCache'][_0x6f39a7];const _0x44d3e7=VisuMZ[_0x1001a8(0x4af)]['Settings'][_0x1001a8(0x4e0)][_0x1001a8(0x46f)];return this[_0x1001a8(0x22b)](_0x6f39a7,_0x44d3e7);},ColorManager['tpGaugeColor2']=function(){const _0x3cf0e=_0x55f97b,_0x4dec33=_0x3cf0e(0x5e2);this[_0x3cf0e(0x5e1)]=this[_0x3cf0e(0x5e1)]||{};if(this[_0x3cf0e(0x5e1)][_0x4dec33])return this[_0x3cf0e(0x5e1)][_0x4dec33];const _0xdb0b60=VisuMZ[_0x3cf0e(0x4af)]['Settings'][_0x3cf0e(0x4e0)][_0x3cf0e(0x6d9)];return this[_0x3cf0e(0x22b)](_0x4dec33,_0xdb0b60);},ColorManager[_0x55f97b(0x963)]=function(){const _0x284ba8=_0x55f97b,_0x248276=_0x284ba8(0x70d);this[_0x284ba8(0x5e1)]=this[_0x284ba8(0x5e1)]||{};if(this[_0x284ba8(0x5e1)][_0x248276])return this[_0x284ba8(0x5e1)][_0x248276];const _0xbbde31=VisuMZ[_0x284ba8(0x4af)][_0x284ba8(0x386)][_0x284ba8(0x4e0)][_0x284ba8(0x580)];return this[_0x284ba8(0x22b)](_0x248276,_0xbbde31);},ColorManager[_0x55f97b(0x31d)]=function(){const _0x5cea1d=_0x55f97b,_0x2f81bd='_stored_pendingColor';this[_0x5cea1d(0x5e1)]=this[_0x5cea1d(0x5e1)]||{};if(this[_0x5cea1d(0x5e1)][_0x2f81bd])return this[_0x5cea1d(0x5e1)][_0x2f81bd];const _0x111874=VisuMZ[_0x5cea1d(0x4af)][_0x5cea1d(0x386)][_0x5cea1d(0x4e0)][_0x5cea1d(0x580)];return this['getColorDataFromPluginParameters'](_0x2f81bd,_0x111874);},ColorManager['expGaugeColor1']=function(){const _0x1f508d=_0x55f97b,_0x58f96a=_0x1f508d(0x44c);this[_0x1f508d(0x5e1)]=this[_0x1f508d(0x5e1)]||{};if(this[_0x1f508d(0x5e1)][_0x58f96a])return this[_0x1f508d(0x5e1)][_0x58f96a];const _0x466372=VisuMZ[_0x1f508d(0x4af)][_0x1f508d(0x386)]['Color'][_0x1f508d(0x55c)];return this[_0x1f508d(0x22b)](_0x58f96a,_0x466372);},ColorManager['expGaugeColor2']=function(){const _0x493693=_0x55f97b,_0x510197=_0x493693(0x784);this[_0x493693(0x5e1)]=this[_0x493693(0x5e1)]||{};if(this['_colorCache'][_0x510197])return this[_0x493693(0x5e1)][_0x510197];const _0x47bedc=VisuMZ['CoreEngine'][_0x493693(0x386)][_0x493693(0x4e0)][_0x493693(0x90a)];return this[_0x493693(0x22b)](_0x510197,_0x47bedc);},ColorManager[_0x55f97b(0x563)]=function(){const _0x3ca46e=_0x55f97b,_0x350bff=_0x3ca46e(0x4b0);this[_0x3ca46e(0x5e1)]=this['_colorCache']||{};if(this['_colorCache'][_0x350bff])return this[_0x3ca46e(0x5e1)][_0x350bff];const _0x413697=VisuMZ[_0x3ca46e(0x4af)][_0x3ca46e(0x386)][_0x3ca46e(0x4e0)][_0x3ca46e(0x888)];return this[_0x3ca46e(0x22b)](_0x350bff,_0x413697);},ColorManager[_0x55f97b(0x3e5)]=function(){const _0x2b21f4=_0x55f97b,_0x4a849e=_0x2b21f4(0x763);this[_0x2b21f4(0x5e1)]=this['_colorCache']||{};if(this[_0x2b21f4(0x5e1)][_0x4a849e])return this['_colorCache'][_0x4a849e];const _0x269279=VisuMZ['CoreEngine']['Settings'][_0x2b21f4(0x4e0)][_0x2b21f4(0x8de)];return this[_0x2b21f4(0x22b)](_0x4a849e,_0x269279);},ColorManager[_0x55f97b(0x827)]=function(_0x53d5a5){const _0x238590=_0x55f97b;return VisuMZ['CoreEngine'][_0x238590(0x386)][_0x238590(0x4e0)]['ActorHPColor']['call'](this,_0x53d5a5);},ColorManager[_0x55f97b(0x987)]=function(_0x1d4707){const _0x2dfa4f=_0x55f97b;return VisuMZ[_0x2dfa4f(0x4af)][_0x2dfa4f(0x386)]['Color'][_0x2dfa4f(0x5a7)][_0x2dfa4f(0x8a8)](this,_0x1d4707);},ColorManager['tpColor']=function(_0x1cf4ad){const _0x4add44=_0x55f97b;return VisuMZ['CoreEngine'][_0x4add44(0x386)][_0x4add44(0x4e0)][_0x4add44(0x872)][_0x4add44(0x8a8)](this,_0x1cf4ad);},ColorManager[_0x55f97b(0x772)]=function(_0x3e78ef){const _0x1c213c=_0x55f97b;return VisuMZ[_0x1c213c(0x4af)][_0x1c213c(0x386)][_0x1c213c(0x4e0)][_0x1c213c(0x598)]['call'](this,_0x3e78ef);},ColorManager[_0x55f97b(0x3c0)]=function(_0xe46338){const _0x5ef66a=_0x55f97b;return VisuMZ[_0x5ef66a(0x4af)][_0x5ef66a(0x386)][_0x5ef66a(0x4e0)][_0x5ef66a(0x787)][_0x5ef66a(0x8a8)](this,_0xe46338);},ColorManager[_0x55f97b(0x838)]=function(){const _0x2dc718=_0x55f97b;return VisuMZ['CoreEngine'][_0x2dc718(0x386)][_0x2dc718(0x4e0)][_0x2dc718(0x79a)];},ColorManager[_0x55f97b(0x376)]=function(){const _0x5278c4=_0x55f97b;return VisuMZ[_0x5278c4(0x4af)][_0x5278c4(0x386)][_0x5278c4(0x4e0)][_0x5278c4(0x1d3)]||_0x5278c4(0x699);},ColorManager[_0x55f97b(0x629)]=function(){const _0x4560da=_0x55f97b;return VisuMZ[_0x4560da(0x4af)][_0x4560da(0x386)][_0x4560da(0x4e0)][_0x4560da(0x7ac)]||_0x4560da(0x8a0);},ColorManager[_0x55f97b(0x89c)]=function(){const _0x2d006=_0x55f97b;return VisuMZ[_0x2d006(0x4af)]['Settings']['Color'][_0x2d006(0x79c)];},ColorManager[_0x55f97b(0x2bb)]=function(){const _0x2f00a8=_0x55f97b;return VisuMZ[_0x2f00a8(0x4af)]['Settings'][_0x2f00a8(0x4e0)][_0x2f00a8(0x412)];},ColorManager[_0x55f97b(0x84d)]=function(){const _0x450c70=_0x55f97b;return VisuMZ[_0x450c70(0x4af)][_0x450c70(0x386)][_0x450c70(0x4e0)][_0x450c70(0x809)];},ColorManager[_0x55f97b(0x4e6)]=function(){const _0x5e15b3=_0x55f97b;return VisuMZ[_0x5e15b3(0x4af)][_0x5e15b3(0x386)][_0x5e15b3(0x4e0)][_0x5e15b3(0x82c)];},SceneManager[_0x55f97b(0x38e)]=[],SceneManager[_0x55f97b(0x985)]=function(){const _0x5dc314=_0x55f97b;return this[_0x5dc314(0x49f)]&&this[_0x5dc314(0x49f)][_0x5dc314(0x6ac)]===Scene_Battle;},SceneManager[_0x55f97b(0x732)]=function(){const _0x41aaf6=_0x55f97b;return this['_scene']&&this[_0x41aaf6(0x49f)]['constructor']===Scene_Map;},SceneManager['isInstanceOfSceneMap']=function(){const _0x13900a=_0x55f97b;return this[_0x13900a(0x49f)]&&this[_0x13900a(0x49f)]instanceof Scene_Map;},VisuMZ[_0x55f97b(0x4af)]['SceneManager_initialize']=SceneManager['initialize'],SceneManager['initialize']=function(){const _0xa71166=_0x55f97b;VisuMZ[_0xa71166(0x4af)][_0xa71166(0x8dc)]['call'](this),this[_0xa71166(0x395)]();},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x4b7)]=SceneManager[_0x55f97b(0x5fe)],SceneManager[_0x55f97b(0x5fe)]=function(_0x5e3f86){const _0x45fb09=_0x55f97b;if($gameTemp)this['onKeyDownKeysF6F7'](_0x5e3f86);VisuMZ[_0x45fb09(0x4af)][_0x45fb09(0x4b7)]['call'](this,_0x5e3f86);},SceneManager[_0x55f97b(0x5df)]=function(_0x1b2103){const _0xa473d3=_0x55f97b;if(!_0x1b2103[_0xa473d3(0x328)]&&!_0x1b2103[_0xa473d3(0x3db)])switch(_0x1b2103[_0xa473d3(0x20a)]){case 0x52:this[_0xa473d3(0x36a)]();break;case 0x54:this[_0xa473d3(0x594)]();break;case 0x75:this['playTestF6']();break;case 0x76:if(Input['isPressed']('shift')||Input[_0xa473d3(0x6d5)](_0xa473d3(0x4d2)))return;this[_0xa473d3(0x23c)]();break;}else{if(_0x1b2103[_0xa473d3(0x328)]){let _0x38a471=_0x1b2103[_0xa473d3(0x20a)];if(_0x38a471>=0x31&&_0x38a471<=0x39){const _0x39e6a8=_0x38a471-0x30;return SceneManager[_0xa473d3(0x855)](_0x39e6a8);}else{if(_0x38a471>=0x61&&_0x38a471<=0x69){const _0x52b1a5=_0x38a471-0x60;return SceneManager[_0xa473d3(0x855)](_0x52b1a5);}}}}},SceneManager[_0x55f97b(0x425)]=function(){const _0x10428e=_0x55f97b;if($gameTemp[_0x10428e(0x206)]()&&VisuMZ[_0x10428e(0x4af)][_0x10428e(0x386)][_0x10428e(0x585)][_0x10428e(0x3c7)]){ConfigManager[_0x10428e(0x533)]!==0x0?(ConfigManager['bgmVolume']=0x0,ConfigManager[_0x10428e(0x753)]=0x0,ConfigManager[_0x10428e(0x348)]=0x0,ConfigManager[_0x10428e(0x533)]=0x0):(ConfigManager[_0x10428e(0x915)]=0x64,ConfigManager[_0x10428e(0x753)]=0x64,ConfigManager[_0x10428e(0x348)]=0x64,ConfigManager[_0x10428e(0x533)]=0x64);ConfigManager[_0x10428e(0x6f3)]();if(this[_0x10428e(0x49f)]['constructor']===Scene_Options){if(this[_0x10428e(0x49f)][_0x10428e(0x393)])this[_0x10428e(0x49f)]['_optionsWindow']['refresh']();if(this[_0x10428e(0x49f)][_0x10428e(0x2e3)])this[_0x10428e(0x49f)][_0x10428e(0x2e3)]['refresh']();}}},SceneManager[_0x55f97b(0x23c)]=function(){const _0x35ea69=_0x55f97b;$gameTemp[_0x35ea69(0x206)]()&&VisuMZ['CoreEngine'][_0x35ea69(0x386)][_0x35ea69(0x585)]['F7key']&&($gameTemp[_0x35ea69(0x4b6)]=!$gameTemp[_0x35ea69(0x4b6)]);},SceneManager[_0x55f97b(0x36a)]=function(){const _0x136518=_0x55f97b;if(!VisuMZ[_0x136518(0x4af)][_0x136518(0x386)][_0x136518(0x585)][_0x136518(0x36b)])return;if(!$gameTemp[_0x136518(0x206)]())return;if(!SceneManager[_0x136518(0x985)]())return;if(!Input[_0x136518(0x6d5)](_0x136518(0x4c6)))return;for(const _0x375eb2 of $gameParty[_0x136518(0x588)]()){if(!_0x375eb2)continue;_0x375eb2[_0x136518(0x6c9)]();}},SceneManager['playTestShiftT']=function(){const _0x3fb6f7=_0x55f97b;if(!VisuMZ[_0x3fb6f7(0x4af)]['Settings'][_0x3fb6f7(0x585)][_0x3fb6f7(0x795)])return;if(!$gameTemp[_0x3fb6f7(0x206)]())return;if(!SceneManager[_0x3fb6f7(0x985)]())return;if(!Input[_0x3fb6f7(0x6d5)](_0x3fb6f7(0x4c6)))return;for(const _0x88d808 of $gameParty[_0x3fb6f7(0x588)]()){if(!_0x88d808)continue;_0x88d808[_0x3fb6f7(0x363)](_0x88d808[_0x3fb6f7(0x4be)]());}},SceneManager[_0x55f97b(0x855)]=function(_0x1e81de){const _0xd04263=_0x55f97b;if(!$gameTemp[_0xd04263(0x206)]())return;if(!DataManager[_0xd04263(0x4fa)](_0x1e81de))return;if(!(VisuMZ[_0xd04263(0x4af)][_0xd04263(0x386)]['QoL'][_0xd04263(0x67d)]??!![]))return;this['push'](Scene_QuickLoad),this['prepareNextScene'](_0x1e81de);},SceneManager[_0x55f97b(0x395)]=function(){const _0x3adf4d=_0x55f97b;this[_0x3adf4d(0x834)]=![],this[_0x3adf4d(0x271)]=!VisuMZ[_0x3adf4d(0x4af)][_0x3adf4d(0x386)]['UI']['ShowButtons'];},SceneManager['setSideButtonLayout']=function(_0x405a8a){const _0x1a5029=_0x55f97b;VisuMZ[_0x1a5029(0x4af)][_0x1a5029(0x386)]['UI'][_0x1a5029(0x32c)]&&(this[_0x1a5029(0x834)]=_0x405a8a);},SceneManager[_0x55f97b(0x1bf)]=function(){return this['_sideButtonLayout'];},SceneManager[_0x55f97b(0x8f7)]=function(){const _0x2be4be=_0x55f97b;return this[_0x2be4be(0x271)];},SceneManager[_0x55f97b(0x72c)]=function(){const _0x5797be=_0x55f97b;return this[_0x5797be(0x8f7)]()||this['isSideButtonLayout']();},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x50a)]=SceneManager[_0x55f97b(0x7c0)],SceneManager[_0x55f97b(0x7c0)]=function(){const _0x58fc00=_0x55f97b;return VisuMZ[_0x58fc00(0x4af)][_0x58fc00(0x386)]['QoL'][_0x58fc00(0x5d5)]?VisuMZ[_0x58fc00(0x4af)]['SceneManager_isGameActive'][_0x58fc00(0x8a8)](this):!![];},SceneManager[_0x55f97b(0x80a)]=function(_0x590b68){const _0x7274bb=_0x55f97b;if(_0x590b68 instanceof Error)this['catchNormalError'](_0x590b68);else _0x590b68 instanceof Array&&_0x590b68[0x0]===_0x7274bb(0x2fc)?this[_0x7274bb(0x669)](_0x590b68):this['catchUnknownError'](_0x590b68);this['stop']();},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x284)]=BattleManager[_0x55f97b(0x789)],BattleManager[_0x55f97b(0x789)]=function(){const _0x4d1b80=_0x55f97b;return VisuMZ['CoreEngine'][_0x4d1b80(0x386)][_0x4d1b80(0x585)][_0x4d1b80(0x5a4)]?this['processAlwaysEscape']():VisuMZ[_0x4d1b80(0x4af)]['BattleManager_processEscape'][_0x4d1b80(0x8a8)](this);},BattleManager['processAlwaysEscape']=function(){const _0x5da174=_0x55f97b;return $gameParty[_0x5da174(0x455)](),SoundManager[_0x5da174(0x361)](),this[_0x5da174(0x335)](),!![];},BattleManager[_0x55f97b(0x58f)]=function(){const _0x368853=_0x55f97b;return $gameSystem[_0x368853(0x7ed)]()>=0x1;},BattleManager[_0x55f97b(0x4fb)]=function(){return $gameSystem['getBattleSystem']()===0x1;},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x583)]=Game_Temp[_0x55f97b(0x616)][_0x55f97b(0x374)],Game_Temp[_0x55f97b(0x616)][_0x55f97b(0x374)]=function(){const _0x208d1f=_0x55f97b;VisuMZ[_0x208d1f(0x4af)][_0x208d1f(0x583)][_0x208d1f(0x8a8)](this),this[_0x208d1f(0x3b0)](),this[_0x208d1f(0x6ca)](),this[_0x208d1f(0x44e)]();},Game_Temp[_0x55f97b(0x616)][_0x55f97b(0x3b0)]=function(){const _0x59a994=_0x55f97b;VisuMZ['CoreEngine'][_0x59a994(0x386)][_0x59a994(0x585)]['ForceNoPlayTest']&&(this[_0x59a994(0x6ed)]=![]);},Game_Temp[_0x55f97b(0x616)][_0x55f97b(0x545)]=function(_0x15e296){const _0x56b06e=_0x55f97b;this[_0x56b06e(0x740)]=_0x15e296;},Game_Temp[_0x55f97b(0x616)]['getLastPluginCommandInterpreter']=function(){const _0x5e4561=_0x55f97b;return this[_0x5e4561(0x740)];},Game_Temp[_0x55f97b(0x616)][_0x55f97b(0x325)]=function(){const _0x3590ab=_0x55f97b;this[_0x3590ab(0x3d8)]=undefined,this[_0x3590ab(0x770)]=undefined,this['_forcedBattleGridSystem']=undefined;},Game_Temp[_0x55f97b(0x616)][_0x55f97b(0x968)]=function(_0x442c1f){const _0x4effe6=_0x55f97b;$gameMap&&$dataMap&&$dataMap['note']&&this[_0x4effe6(0x729)]($dataMap[_0x4effe6(0x584)]);const _0x5ada27=$dataTroops[_0x442c1f];if(_0x5ada27){let _0x353aa3=DataManager[_0x4effe6(0x40f)](_0x5ada27['id']);this['parseForcedGameTroopSettingsCoreEngine'](_0x353aa3);}},Game_Temp[_0x55f97b(0x616)][_0x55f97b(0x729)]=function(_0x1110f4){const _0x1573ef=_0x55f97b;if(!_0x1110f4)return;if(_0x1110f4[_0x1573ef(0x4f2)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this['_forcedTroopView']='FV';else{if(_0x1110f4[_0x1573ef(0x4f2)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this['_forcedTroopView']='SV';else{if(_0x1110f4['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x4fcaec=String(RegExp['$1']);if(_0x4fcaec[_0x1573ef(0x4f2)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0x1573ef(0x3d8)]='FV';else _0x4fcaec[_0x1573ef(0x4f2)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0x1573ef(0x3d8)]='SV');}}}if(_0x1110f4[_0x1573ef(0x4f2)](/<(?:DTB)>/i))this[_0x1573ef(0x770)]=0x0;else{if(_0x1110f4['match'](/<(?:TPB|ATB)[ ]ACTIVE>/i))this['_forcedBattleSys']=0x1;else{if(_0x1110f4[_0x1573ef(0x4f2)](/<(?:TPB|ATB)[ ]WAIT>/i))this[_0x1573ef(0x770)]=0x2;else{if(_0x1110f4[_0x1573ef(0x4f2)](/<(?:TPB|ATB)>/i))this[_0x1573ef(0x770)]=0x2;else{if(_0x1110f4['match'](/<(?:CTB)>/i))Imported[_0x1573ef(0x618)]&&(this[_0x1573ef(0x770)]='CTB');else{if(_0x1110f4[_0x1573ef(0x4f2)](/<(?:STB)>/i))Imported[_0x1573ef(0x5b2)]&&(this[_0x1573ef(0x770)]='STB');else{if(_0x1110f4[_0x1573ef(0x4f2)](/<(?:BTB)>/i))Imported[_0x1573ef(0x869)]&&(this[_0x1573ef(0x770)]='BTB');else{if(_0x1110f4['match'](/<(?:FTB)>/i))Imported[_0x1573ef(0x437)]&&(this['_forcedBattleSys']='FTB');else{if(_0x1110f4['match'](/<(?:OTB)>/i))Imported[_0x1573ef(0x589)]&&(this[_0x1573ef(0x770)]='OTB');else{if(_0x1110f4[_0x1573ef(0x4f2)](/<(?:ETB)>/i))Imported[_0x1573ef(0x936)]&&(this[_0x1573ef(0x770)]='ETB');else{if(_0x1110f4[_0x1573ef(0x4f2)](/<(?:PTB)>/i))Imported[_0x1573ef(0x4de)]&&(this[_0x1573ef(0x770)]='PTB');else{if(_0x1110f4[_0x1573ef(0x4f2)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x8a919=String(RegExp['$1']);if(_0x8a919[_0x1573ef(0x4f2)](/DTB/i))this[_0x1573ef(0x770)]=0x0;else{if(_0x8a919[_0x1573ef(0x4f2)](/(?:TPB|ATB)[ ]ACTIVE/i))this['_forcedBattleSys']=0x1;else{if(_0x8a919[_0x1573ef(0x4f2)](/(?:TPB|ATB)[ ]WAIT/i))this[_0x1573ef(0x770)]=0x2;else{if(_0x8a919[_0x1573ef(0x4f2)](/CTB/i))Imported[_0x1573ef(0x618)]&&(this[_0x1573ef(0x770)]='CTB');else{if(_0x8a919[_0x1573ef(0x4f2)](/STB/i))Imported[_0x1573ef(0x5b2)]&&(this[_0x1573ef(0x770)]=_0x1573ef(0x1c9));else{if(_0x8a919['match'](/BTB/i))Imported[_0x1573ef(0x869)]&&(this['_forcedBattleSys']='BTB');else{if(_0x8a919[_0x1573ef(0x4f2)](/FTB/i))Imported[_0x1573ef(0x437)]&&(this['_forcedBattleSys']='FTB');else{if(_0x8a919[_0x1573ef(0x4f2)](/OTB/i))Imported[_0x1573ef(0x589)]&&(this[_0x1573ef(0x770)]='OTB');else{if(_0x8a919[_0x1573ef(0x4f2)](/ETB/i))Imported[_0x1573ef(0x936)]&&(this['_forcedBattleSys']=_0x1573ef(0x7a6));else _0x8a919['match'](/PTB/i)&&(Imported[_0x1573ef(0x4de)]&&(this[_0x1573ef(0x770)]=_0x1573ef(0x66e)));}}}}}}}}}}}}}}}}}}}}if(_0x1110f4[_0x1573ef(0x4f2)](/<(?:|BATTLE )GRID>/i))this[_0x1573ef(0x577)]=!![];else _0x1110f4[_0x1573ef(0x4f2)](/<NO (?:|BATTLE )GRID>/i)&&(this['_forcedBattleGridSystem']=![]);},Game_Temp[_0x55f97b(0x616)][_0x55f97b(0x6ca)]=function(){const _0x4fc6fa=_0x55f97b;this[_0x4fc6fa(0x37a)]=[];},Game_Temp[_0x55f97b(0x616)][_0x55f97b(0x6a6)]=function(_0x1f23e0,_0x46236c,_0x53b205,_0x13269a){const _0x62de8a=_0x55f97b;if(!this[_0x62de8a(0x8a2)]())return;_0x53b205=_0x53b205||![],_0x13269a=_0x13269a||![];if($dataAnimations[_0x46236c]){const _0x4f9a01={'targets':_0x1f23e0,'animationId':_0x46236c,'mirror':_0x53b205,'mute':_0x13269a};this[_0x62de8a(0x37a)][_0x62de8a(0x35b)](_0x4f9a01);for(const _0x276b59 of _0x1f23e0){_0x276b59[_0x62de8a(0x2aa)]&&_0x276b59[_0x62de8a(0x2aa)]();}}},Game_Temp[_0x55f97b(0x616)][_0x55f97b(0x8a2)]=function(){return!![];},Game_Temp[_0x55f97b(0x616)]['retrieveFauxAnimation']=function(){const _0xca9f9e=_0x55f97b;return this[_0xca9f9e(0x37a)]['shift']();},Game_Temp[_0x55f97b(0x616)][_0x55f97b(0x44e)]=function(){const _0x202213=_0x55f97b;this[_0x202213(0x46b)]=[];},Game_Temp['prototype']['requestPointAnimation']=function(_0x2f1923,_0x343380,_0x4f5ef6,_0x38aa16,_0x3087ba){const _0x11f1cb=_0x55f97b;if(!this['showPointAnimations']())return;_0x38aa16=_0x38aa16||![],_0x3087ba=_0x3087ba||![];if($dataAnimations[_0x4f5ef6]){const _0xc2aba3={'x':_0x2f1923,'y':_0x343380,'animationId':_0x4f5ef6,'mirror':_0x38aa16,'mute':_0x3087ba};this[_0x11f1cb(0x46b)][_0x11f1cb(0x35b)](_0xc2aba3);}},Game_Temp[_0x55f97b(0x616)][_0x55f97b(0x592)]=function(){return!![];},Game_Temp['prototype'][_0x55f97b(0x417)]=function(){const _0x160939=_0x55f97b;return this[_0x160939(0x46b)]['shift']();},VisuMZ['CoreEngine']['Game_System_initialize']=Game_System['prototype'][_0x55f97b(0x374)],Game_System[_0x55f97b(0x616)][_0x55f97b(0x374)]=function(){const _0x304c58=_0x55f97b;VisuMZ['CoreEngine'][_0x304c58(0x76e)][_0x304c58(0x8a8)](this),this['initCoreEngine']();},Game_System[_0x55f97b(0x616)][_0x55f97b(0x940)]=function(){const _0x2e54e3=_0x55f97b;this[_0x2e54e3(0x68c)]={'SideView':$dataSystem[_0x2e54e3(0x2ed)],'BattleSystem':this[_0x2e54e3(0x7c7)](),'FontSize':$dataSystem[_0x2e54e3(0x91c)][_0x2e54e3(0x697)],'Padding':0xc};},Game_System[_0x55f97b(0x616)][_0x55f97b(0x19e)]=function(){const _0x224a23=_0x55f97b;if($gameTemp['_forcedTroopView']==='SV')return!![];else{if($gameTemp[_0x224a23(0x3d8)]==='FV')return![];}if(this[_0x224a23(0x68c)]===undefined)this[_0x224a23(0x940)]();if(this['_CoreEngineSettings'][_0x224a23(0x6fa)]===undefined)this[_0x224a23(0x940)]();return this['_CoreEngineSettings']['SideView'];},Game_System['prototype'][_0x55f97b(0x7ae)]=function(_0x22f3f5){const _0x1b2531=_0x55f97b;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this[_0x1b2531(0x68c)][_0x1b2531(0x6fa)]===undefined)this[_0x1b2531(0x940)]();this[_0x1b2531(0x68c)]['SideView']=_0x22f3f5;},Game_System[_0x55f97b(0x616)][_0x55f97b(0x880)]=function(){const _0xb6a896=_0x55f97b;if(this[_0xb6a896(0x68c)]===undefined)this[_0xb6a896(0x940)]();this[_0xb6a896(0x68c)][_0xb6a896(0x823)]=this['initialBattleSystem']();},Game_System['prototype']['initialBattleSystem']=function(){const _0x3f50df=_0x55f97b,_0x19f610=(VisuMZ['CoreEngine'][_0x3f50df(0x386)][_0x3f50df(0x823)]||_0x3f50df(0x527))[_0x3f50df(0x427)]()[_0x3f50df(0x8e9)]();return VisuMZ[_0x3f50df(0x4af)][_0x3f50df(0x83c)](_0x19f610);},Game_System[_0x55f97b(0x616)][_0x55f97b(0x7ed)]=function(){const _0x420905=_0x55f97b;if($gameTemp[_0x420905(0x770)]!==undefined)return $gameTemp[_0x420905(0x770)];if(this[_0x420905(0x68c)]===undefined)this[_0x420905(0x940)]();if(this[_0x420905(0x68c)][_0x420905(0x823)]===undefined)this['resetBattleSystem']();return this[_0x420905(0x68c)][_0x420905(0x823)];},Game_System['prototype']['setBattleSystem']=function(_0x2f25d5){const _0x390692=_0x55f97b;if(this[_0x390692(0x68c)]===undefined)this[_0x390692(0x940)]();if(this[_0x390692(0x68c)][_0x390692(0x823)]===undefined)this[_0x390692(0x880)]();this[_0x390692(0x68c)]['BattleSystem']=_0x2f25d5;},Game_System[_0x55f97b(0x616)][_0x55f97b(0x42e)]=function(){const _0x3af15b=_0x55f97b;if(this['_CoreEngineSettings']===undefined)this[_0x3af15b(0x940)]();if(this['_CoreEngineSettings'][_0x3af15b(0x6c4)]===undefined)this[_0x3af15b(0x940)]();return this['_CoreEngineSettings'][_0x3af15b(0x6c4)];},Game_System[_0x55f97b(0x616)]['setMainFontSize']=function(_0x342557){const _0x53ecb7=_0x55f97b;if(this['_CoreEngineSettings']===undefined)this[_0x53ecb7(0x940)]();if(this[_0x53ecb7(0x68c)][_0x53ecb7(0x602)]===undefined)this['initCoreEngine']();this[_0x53ecb7(0x68c)][_0x53ecb7(0x6c4)]=_0x342557;},Game_System[_0x55f97b(0x616)][_0x55f97b(0x3af)]=function(){const _0x2f8dd3=_0x55f97b;if(this[_0x2f8dd3(0x68c)]===undefined)this['initCoreEngine']();if(this[_0x2f8dd3(0x68c)]['Padding']===undefined)this[_0x2f8dd3(0x940)]();return this[_0x2f8dd3(0x68c)][_0x2f8dd3(0x7b3)];},Game_System[_0x55f97b(0x616)]['setWindowPadding']=function(_0x5518d3){const _0x1f1a31=_0x55f97b;if(this[_0x1f1a31(0x68c)]===undefined)this[_0x1f1a31(0x940)]();if(this[_0x1f1a31(0x68c)][_0x1f1a31(0x602)]===undefined)this[_0x1f1a31(0x940)]();this[_0x1f1a31(0x68c)][_0x1f1a31(0x7b3)]=_0x5518d3;},VisuMZ['CoreEngine']['Game_Screen_initialize']=Game_Screen[_0x55f97b(0x616)][_0x55f97b(0x374)],Game_Screen[_0x55f97b(0x616)]['initialize']=function(){const _0xbbf0ed=_0x55f97b;VisuMZ['CoreEngine']['Game_Screen_initialize'][_0xbbf0ed(0x8a8)](this),this[_0xbbf0ed(0x415)]();},Game_Screen[_0x55f97b(0x616)][_0x55f97b(0x415)]=function(){const _0xa269b9=_0x55f97b,_0x20407b=VisuMZ['CoreEngine'][_0xa269b9(0x386)][_0xa269b9(0x88c)];this['_coreEngineShakeStyle']=_0x20407b?.[_0xa269b9(0x72f)]||_0xa269b9(0x300);},Game_Screen[_0x55f97b(0x616)][_0x55f97b(0x894)]=function(){const _0x16db5d=_0x55f97b;if(this[_0x16db5d(0x8be)]===undefined)this[_0x16db5d(0x415)]();return this[_0x16db5d(0x8be)];},Game_Screen[_0x55f97b(0x616)][_0x55f97b(0x2a6)]=function(_0x1bf6ee){const _0x1019f9=_0x55f97b;if(this[_0x1019f9(0x8be)]===undefined)this[_0x1019f9(0x415)]();this[_0x1019f9(0x8be)]=_0x1bf6ee['toLowerCase']()[_0x1019f9(0x8e9)]();},Game_Picture['prototype'][_0x55f97b(0x62f)]=function(){const _0x9ca8c2=_0x55f97b;if($gameParty[_0x9ca8c2(0x4d5)]())return![];return this[_0x9ca8c2(0x5bb)]()&&this[_0x9ca8c2(0x5bb)]()[_0x9ca8c2(0x1e5)](0x0)==='!';},Game_Picture[_0x55f97b(0x616)][_0x55f97b(0x5bb)]=function(){const _0x3805b5=_0x55f97b;return this[_0x3805b5(0x6b0)]['split']('/')[_0x3805b5(0x21a)]();},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x233)]=Game_Picture[_0x55f97b(0x616)]['x'],Game_Picture['prototype']['x']=function(){const _0x79c604=_0x55f97b;return this[_0x79c604(0x62f)]()?this[_0x79c604(0x262)]():VisuMZ[_0x79c604(0x4af)][_0x79c604(0x233)][_0x79c604(0x8a8)](this);},Game_Picture[_0x55f97b(0x616)]['xScrollLinkedOffset']=function(){const _0x4aec36=_0x55f97b,_0x41d1cd=$gameMap[_0x4aec36(0x7b4)]()*$gameMap[_0x4aec36(0x400)]();return(this['_x']-_0x41d1cd)*$gameScreen[_0x4aec36(0x3b5)]();},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x593)]=Game_Picture[_0x55f97b(0x616)]['y'],Game_Picture[_0x55f97b(0x616)]['y']=function(){const _0x131823=_0x55f97b;return this[_0x131823(0x62f)]()?this[_0x131823(0x434)]():VisuMZ[_0x131823(0x4af)]['Game_Picture_y'][_0x131823(0x8a8)](this);},Game_Picture[_0x55f97b(0x616)][_0x55f97b(0x434)]=function(){const _0x43ef0b=_0x55f97b,_0x515b42=$gameMap[_0x43ef0b(0x531)]()*$gameMap[_0x43ef0b(0x317)]();return(this['_y']-_0x515b42)*$gameScreen[_0x43ef0b(0x3b5)]();},VisuMZ[_0x55f97b(0x4af)]['Game_Picture_scaleX']=Game_Picture[_0x55f97b(0x616)][_0x55f97b(0x7f0)],Game_Picture['prototype'][_0x55f97b(0x7f0)]=function(){const _0x3e1c8b=_0x55f97b;let _0x33fb09=VisuMZ[_0x3e1c8b(0x4af)][_0x3e1c8b(0x670)][_0x3e1c8b(0x8a8)](this);return this[_0x3e1c8b(0x62f)]()&&(_0x33fb09*=$gameScreen[_0x3e1c8b(0x3b5)]()),_0x33fb09;},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x638)]=Game_Picture[_0x55f97b(0x616)][_0x55f97b(0x75e)],Game_Picture[_0x55f97b(0x616)][_0x55f97b(0x75e)]=function(){const _0x1bef08=_0x55f97b;let _0x573a6c=VisuMZ[_0x1bef08(0x4af)][_0x1bef08(0x638)][_0x1bef08(0x8a8)](this);return this['isMapScrollLinked']()&&(_0x573a6c*=$gameScreen[_0x1bef08(0x3b5)]()),_0x573a6c;},Game_Picture['prototype'][_0x55f97b(0x35c)]=function(_0x4a990b){const _0x344bb2=_0x55f97b;this[_0x344bb2(0x810)]=_0x4a990b;},VisuMZ['CoreEngine']['Game_Picture_calcEasing']=Game_Picture['prototype'][_0x55f97b(0x20e)],Game_Picture['prototype'][_0x55f97b(0x20e)]=function(_0x11e69b){const _0x5bcd28=_0x55f97b;return this[_0x5bcd28(0x810)]=this['_coreEasingType']||0x0,[0x0,0x1,0x2,0x3]['includes'](this[_0x5bcd28(0x810)])?VisuMZ[_0x5bcd28(0x4af)][_0x5bcd28(0x33a)][_0x5bcd28(0x8a8)](this,_0x11e69b):VisuMZ['ApplyEasing'](_0x11e69b,this[_0x5bcd28(0x810)]);},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x299)]=Game_Picture[_0x55f97b(0x616)][_0x55f97b(0x614)],Game_Picture[_0x55f97b(0x616)][_0x55f97b(0x614)]=function(){const _0x566a07=_0x55f97b;VisuMZ[_0x566a07(0x4af)][_0x566a07(0x299)][_0x566a07(0x8a8)](this),this[_0x566a07(0x225)]();},Game_Picture['prototype']['initRotationCoreEngine']=function(){const _0x107f4c=_0x55f97b;this[_0x107f4c(0x3c4)]={'current':0x0,'target':0x0,'duration':0x0,'wholeDuration':0x0,'easingType':_0x107f4c(0x8e3)};},VisuMZ[_0x55f97b(0x4af)]['Game_Picture_angle']=Game_Picture[_0x55f97b(0x616)][_0x55f97b(0x228)],Game_Picture[_0x55f97b(0x616)][_0x55f97b(0x228)]=function(){const _0x187e56=_0x55f97b;let _0x619652=VisuMZ[_0x187e56(0x4af)]['Game_Picture_angle'][_0x187e56(0x8a8)](this);return _0x619652+=this['anglePlus'](),_0x619652;},Game_Picture[_0x55f97b(0x616)][_0x55f97b(0x77d)]=function(){const _0x329f76=_0x55f97b;if(this[_0x329f76(0x3c4)]===undefined)this[_0x329f76(0x225)]();return this[_0x329f76(0x3c4)]['current']||0x0;},Game_Picture[_0x55f97b(0x616)]['setAnglePlusData']=function(_0x5e39e3,_0x3cd3c6,_0x519d29){const _0x53c9ce=_0x55f97b;if(this[_0x53c9ce(0x3c4)]===undefined)this[_0x53c9ce(0x225)]();this[_0x53c9ce(0x3c4)][_0x53c9ce(0x520)]=_0x5e39e3||0x0,this[_0x53c9ce(0x3c4)][_0x53c9ce(0x2b5)]=_0x3cd3c6||0x0,this[_0x53c9ce(0x3c4)][_0x53c9ce(0x87e)]=_0x3cd3c6||0x0,this[_0x53c9ce(0x3c4)][_0x53c9ce(0x472)]=_0x519d29||_0x53c9ce(0x8e3),_0x3cd3c6<=0x0&&(this[_0x53c9ce(0x3c4)][_0x53c9ce(0x807)]=this[_0x53c9ce(0x3c4)][_0x53c9ce(0x520)]);},Game_Picture[_0x55f97b(0x616)]['changeAnglePlusData']=function(_0x577ab8,_0xaaec36,_0xfb2274){const _0x983a8a=_0x55f97b;if(this[_0x983a8a(0x3c4)]===undefined)this['initRotationCoreEngine']();this[_0x983a8a(0x3c4)][_0x983a8a(0x520)]+=_0x577ab8||0x0,this[_0x983a8a(0x3c4)][_0x983a8a(0x2b5)]=_0xaaec36||0x0,this[_0x983a8a(0x3c4)][_0x983a8a(0x87e)]=_0xaaec36||0x0,this['_anglePlus'][_0x983a8a(0x472)]=_0xfb2274||_0x983a8a(0x8e3),_0xaaec36<=0x0&&(this['_anglePlus'][_0x983a8a(0x807)]=this[_0x983a8a(0x3c4)][_0x983a8a(0x520)]);},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x3f8)]=Game_Picture['prototype'][_0x55f97b(0x41c)],Game_Picture['prototype'][_0x55f97b(0x41c)]=function(){const _0x2b8d45=_0x55f97b;VisuMZ[_0x2b8d45(0x4af)][_0x2b8d45(0x3f8)][_0x2b8d45(0x8a8)](this),this[_0x2b8d45(0x3a3)]();},Game_Picture[_0x55f97b(0x616)][_0x55f97b(0x3a3)]=function(){const _0x566a93=_0x55f97b;if(this[_0x566a93(0x3c4)]===undefined)this['initRotationCoreEngine']();const _0x2ab30a=this[_0x566a93(0x3c4)];if(_0x2ab30a[_0x566a93(0x2b5)]<=0x0)return;_0x2ab30a[_0x566a93(0x807)]=this[_0x566a93(0x87b)](_0x2ab30a[_0x566a93(0x807)],_0x2ab30a[_0x566a93(0x520)]),_0x2ab30a[_0x566a93(0x2b5)]--,_0x2ab30a[_0x566a93(0x2b5)]<=0x0&&(_0x2ab30a['current']=_0x2ab30a['target']);},Game_Picture[_0x55f97b(0x616)][_0x55f97b(0x87b)]=function(_0x1782ef,_0x43e6d6){const _0x3bcfbf=_0x55f97b,_0x5c2b64=this[_0x3bcfbf(0x3c4)],_0xacbe7c=_0x5c2b64[_0x3bcfbf(0x472)],_0x49fcf9=_0x5c2b64[_0x3bcfbf(0x2b5)],_0xe11b14=_0x5c2b64[_0x3bcfbf(0x87e)],_0x165433=VisuMZ[_0x3bcfbf(0x22a)]((_0xe11b14-_0x49fcf9)/_0xe11b14,_0xacbe7c),_0x17de16=VisuMZ[_0x3bcfbf(0x22a)]((_0xe11b14-_0x49fcf9+0x1)/_0xe11b14,_0xacbe7c),_0x23ebb5=(_0x1782ef-_0x43e6d6*_0x165433)/(0x1-_0x165433);return _0x23ebb5+(_0x43e6d6-_0x23ebb5)*_0x17de16;},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x81c)]=Game_Action[_0x55f97b(0x616)][_0x55f97b(0x2ca)],Game_Action[_0x55f97b(0x616)][_0x55f97b(0x2ca)]=function(_0x1f9d91){const _0x1cd0cb=_0x55f97b;return VisuMZ[_0x1cd0cb(0x4af)][_0x1cd0cb(0x386)][_0x1cd0cb(0x585)][_0x1cd0cb(0x1f7)]?this[_0x1cd0cb(0x5c8)](_0x1f9d91):VisuMZ[_0x1cd0cb(0x4af)][_0x1cd0cb(0x81c)][_0x1cd0cb(0x8a8)](this,_0x1f9d91);},Game_Action['prototype'][_0x55f97b(0x5c8)]=function(_0x3f4e07){const _0x35e6f7=_0x55f97b,_0x57ab65=this[_0x35e6f7(0x857)](_0x3f4e07),_0x388780=this[_0x35e6f7(0x1e8)](_0x3f4e07),_0x554950=this['targetEvaRate'](_0x3f4e07);return _0x57ab65*(_0x388780-_0x554950);},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x31b)]=Game_Action[_0x55f97b(0x616)][_0x55f97b(0x692)],Game_Action[_0x55f97b(0x616)][_0x55f97b(0x692)]=function(_0x540ca6){const _0x12247d=_0x55f97b;return VisuMZ['CoreEngine'][_0x12247d(0x386)]['QoL'][_0x12247d(0x1f7)]?0x0:VisuMZ['CoreEngine'][_0x12247d(0x31b)][_0x12247d(0x8a8)](this,_0x540ca6);},Game_Action['prototype']['itemSuccessRate']=function(_0x1d1e07){const _0x2d6ec3=_0x55f97b;return this['item']()[_0x2d6ec3(0x1cb)]*0.01;},Game_Action[_0x55f97b(0x616)]['subjectHitRate']=function(_0x5d88aa){const _0x3f2f4e=_0x55f97b;if(VisuMZ['CoreEngine'][_0x3f2f4e(0x386)][_0x3f2f4e(0x585)][_0x3f2f4e(0x88b)]&&this['isItem']())return 0x1;return this[_0x3f2f4e(0x2af)]()?VisuMZ[_0x3f2f4e(0x4af)][_0x3f2f4e(0x386)][_0x3f2f4e(0x585)][_0x3f2f4e(0x88b)]&&this[_0x3f2f4e(0x433)]()[_0x3f2f4e(0x4ad)]()?this[_0x3f2f4e(0x433)]()['hit']+0.05:this['subject']()[_0x3f2f4e(0x383)]:0x1;},Game_Action[_0x55f97b(0x616)][_0x55f97b(0x790)]=function(_0x43c825){const _0x33241c=_0x55f97b;if(this[_0x33241c(0x433)]()[_0x33241c(0x4ad)]()===_0x43c825[_0x33241c(0x4ad)]())return 0x0;if(this[_0x33241c(0x2af)]())return VisuMZ['CoreEngine'][_0x33241c(0x386)]['QoL'][_0x33241c(0x88b)]&&_0x43c825[_0x33241c(0x4dd)]()?_0x43c825['eva']-0.05:_0x43c825[_0x33241c(0x564)];else return this[_0x33241c(0x7c1)]()?_0x43c825[_0x33241c(0x203)]:0x0;},VisuMZ[_0x55f97b(0x4af)]['Game_Action_updateLastTarget']=Game_Action['prototype'][_0x55f97b(0x79e)],Game_Action[_0x55f97b(0x616)][_0x55f97b(0x79e)]=function(_0x56dbe0){const _0x14affc=_0x55f97b;VisuMZ[_0x14affc(0x4af)][_0x14affc(0x31f)][_0x14affc(0x8a8)](this,_0x56dbe0);if(VisuMZ[_0x14affc(0x4af)]['Settings'][_0x14affc(0x585)]['ImprovedAccuracySystem'])return;const _0x2bcc64=_0x56dbe0[_0x14affc(0x95b)]();_0x2bcc64[_0x14affc(0x4ea)]&&(0x1-this[_0x14affc(0x692)](_0x56dbe0)>this['itemHit'](_0x56dbe0)&&(_0x2bcc64['missed']=![],_0x2bcc64[_0x14affc(0x275)]=!![]));},VisuMZ['CoreEngine'][_0x55f97b(0x5ca)]=Game_BattlerBase[_0x55f97b(0x616)]['initMembers'],Game_BattlerBase[_0x55f97b(0x616)][_0x55f97b(0x207)]=function(){const _0x59d6ab=_0x55f97b;this['_cache']={},VisuMZ[_0x59d6ab(0x4af)][_0x59d6ab(0x5ca)]['call'](this);},VisuMZ[_0x55f97b(0x4af)]['Game_BattlerBase_refresh']=Game_BattlerBase[_0x55f97b(0x616)]['refresh'],Game_BattlerBase[_0x55f97b(0x616)][_0x55f97b(0x285)]=function(){const _0x503568=_0x55f97b;this[_0x503568(0x687)]={},VisuMZ[_0x503568(0x4af)][_0x503568(0x4cd)][_0x503568(0x8a8)](this);},Game_BattlerBase[_0x55f97b(0x616)]['checkCacheKey']=function(_0x39b8ef){const _0x279078=_0x55f97b;return this[_0x279078(0x687)]=this[_0x279078(0x687)]||{},this[_0x279078(0x687)][_0x39b8ef]!==undefined;},Game_BattlerBase[_0x55f97b(0x616)][_0x55f97b(0x681)]=function(_0x284876){const _0x1639cf=_0x55f97b,_0xab9d01=(_0x5dc6d1,_0x2dfc7f)=>{const _0x4c01d7=_0x2f79;if(!_0x2dfc7f)return _0x5dc6d1;if(_0x2dfc7f[_0x4c01d7(0x584)][_0x4c01d7(0x4f2)](VisuMZ['CoreEngine'][_0x4c01d7(0x8bb)][_0x4c01d7(0x681)][_0x284876])){var _0x1ef8ef=Number(RegExp['$1']);_0x5dc6d1+=_0x1ef8ef;}if(_0x2dfc7f[_0x4c01d7(0x584)][_0x4c01d7(0x4f2)](VisuMZ[_0x4c01d7(0x4af)]['RegExp'][_0x4c01d7(0x73e)][_0x284876])){var _0x10c038=String(RegExp['$1']);try{_0x5dc6d1+=eval(_0x10c038);}catch(_0x280384){if($gameTemp[_0x4c01d7(0x206)]())console[_0x4c01d7(0x84b)](_0x280384);}}return _0x5dc6d1;};return this[_0x1639cf(0x24f)]()[_0x1639cf(0x544)](_0xab9d01,this[_0x1639cf(0x3fb)][_0x284876]);},Game_BattlerBase[_0x55f97b(0x616)][_0x55f97b(0x93e)]=function(_0x5dd560){const _0x3e4b66=_0x55f97b;var _0x41128b=_0x3e4b66(0x83e)+(this['isActor']()?_0x3e4b66(0x75f):_0x3e4b66(0x680))+_0x3e4b66(0x398)+_0x5dd560;if(this[_0x3e4b66(0x883)](_0x41128b))return this[_0x3e4b66(0x687)][_0x41128b];this[_0x3e4b66(0x687)][_0x41128b]=eval(VisuMZ['CoreEngine'][_0x3e4b66(0x386)][_0x3e4b66(0x91f)][_0x41128b]);const _0x105d26=(_0x39e8d2,_0x56c105)=>{const _0x5bc53b=_0x3e4b66;if(!_0x56c105)return _0x39e8d2;if(_0x56c105[_0x5bc53b(0x584)][_0x5bc53b(0x4f2)](VisuMZ[_0x5bc53b(0x4af)]['RegExp']['paramMax'][_0x5dd560])){var _0x130a66=Number(RegExp['$1']);if(_0x130a66===0x0)_0x130a66=Number[_0x5bc53b(0x757)];_0x39e8d2=Math[_0x5bc53b(0x1fb)](_0x39e8d2,_0x130a66);}if(_0x56c105[_0x5bc53b(0x584)][_0x5bc53b(0x4f2)](VisuMZ[_0x5bc53b(0x4af)][_0x5bc53b(0x8bb)][_0x5bc53b(0x32d)][_0x5dd560])){var _0x4335b7=String(RegExp['$1']);try{_0x39e8d2=Math['max'](_0x39e8d2,Number(eval(_0x4335b7)));}catch(_0x269489){if($gameTemp[_0x5bc53b(0x206)]())console[_0x5bc53b(0x84b)](_0x269489);}}return _0x39e8d2;};if(this[_0x3e4b66(0x687)][_0x41128b]===0x0)this[_0x3e4b66(0x687)][_0x41128b]=Number[_0x3e4b66(0x757)];return this[_0x3e4b66(0x687)][_0x41128b]=this[_0x3e4b66(0x24f)]()[_0x3e4b66(0x544)](_0x105d26,this[_0x3e4b66(0x687)][_0x41128b]),this[_0x3e4b66(0x687)][_0x41128b];},Game_BattlerBase[_0x55f97b(0x616)][_0x55f97b(0x541)]=function(_0x3be766){const _0x302bb5=_0x55f97b,_0x278b22=this[_0x302bb5(0x600)](Game_BattlerBase['TRAIT_PARAM'],_0x3be766),_0xd08bb=(_0x466aec,_0x1811ef)=>{const _0x819da=_0x302bb5;if(!_0x1811ef)return _0x466aec;if(_0x1811ef[_0x819da(0x584)]['match'](VisuMZ[_0x819da(0x4af)]['RegExp'][_0x819da(0x607)][_0x3be766])){var _0x30bcfc=Number(RegExp['$1'])/0x64;_0x466aec*=_0x30bcfc;}if(_0x1811ef['note']['match'](VisuMZ[_0x819da(0x4af)][_0x819da(0x8bb)][_0x819da(0x202)][_0x3be766])){var _0x30bcfc=Number(RegExp['$1']);_0x466aec*=_0x30bcfc;}if(_0x1811ef['note']['match'](VisuMZ['CoreEngine'][_0x819da(0x8bb)][_0x819da(0x224)][_0x3be766])){var _0x1fed8b=String(RegExp['$1']);try{_0x466aec*=eval(_0x1fed8b);}catch(_0x253407){if($gameTemp[_0x819da(0x206)]())console['log'](_0x253407);}}return _0x466aec;};return this[_0x302bb5(0x24f)]()[_0x302bb5(0x544)](_0xd08bb,_0x278b22);},Game_BattlerBase[_0x55f97b(0x616)][_0x55f97b(0x95a)]=function(_0x421db1){const _0x7e0e3f=_0x55f97b,_0x5b43c8=(_0x38c7a4,_0x55dd04)=>{const _0x2e1114=_0x2f79;if(!_0x55dd04)return _0x38c7a4;if(_0x55dd04[_0x2e1114(0x584)]['match'](VisuMZ[_0x2e1114(0x4af)][_0x2e1114(0x8bb)][_0x2e1114(0x45d)][_0x421db1])){var _0x29adf1=Number(RegExp['$1']);_0x38c7a4+=_0x29adf1;}if(_0x55dd04[_0x2e1114(0x584)][_0x2e1114(0x4f2)](VisuMZ[_0x2e1114(0x4af)][_0x2e1114(0x8bb)][_0x2e1114(0x33d)][_0x421db1])){var _0x1f0cd2=String(RegExp['$1']);try{_0x38c7a4+=eval(_0x1f0cd2);}catch(_0x16e52d){if($gameTemp[_0x2e1114(0x206)]())console[_0x2e1114(0x84b)](_0x16e52d);}}return _0x38c7a4;};return this[_0x7e0e3f(0x24f)]()['reduce'](_0x5b43c8,0x0);},Game_BattlerBase[_0x55f97b(0x616)][_0x55f97b(0x65f)]=function(_0x96cf9b){const _0x28ac6e=_0x55f97b;let _0x25648d='param'+_0x96cf9b+_0x28ac6e(0x57d);if(this[_0x28ac6e(0x883)](_0x25648d))return this[_0x28ac6e(0x687)][_0x25648d];return this[_0x28ac6e(0x687)][_0x25648d]=Math[_0x28ac6e(0x7dd)](VisuMZ[_0x28ac6e(0x4af)]['Settings'][_0x28ac6e(0x91f)][_0x28ac6e(0x1b7)]['call'](this,_0x96cf9b)),this[_0x28ac6e(0x687)][_0x25648d];},Game_BattlerBase['prototype']['xparamPlus']=function(_0x4c014d){const _0x4adab=_0x55f97b,_0x280c63=(_0x49e590,_0x2d8162)=>{const _0x3a6187=_0x2f79;if(!_0x2d8162)return _0x49e590;if(_0x2d8162['note'][_0x3a6187(0x4f2)](VisuMZ[_0x3a6187(0x4af)]['RegExp'][_0x3a6187(0x340)][_0x4c014d])){var _0x1d1aca=Number(RegExp['$1'])/0x64;_0x49e590+=_0x1d1aca;}if(_0x2d8162[_0x3a6187(0x584)]['match'](VisuMZ[_0x3a6187(0x4af)][_0x3a6187(0x8bb)][_0x3a6187(0x642)][_0x4c014d])){var _0x1d1aca=Number(RegExp['$1']);_0x49e590+=_0x1d1aca;}if(_0x2d8162[_0x3a6187(0x584)][_0x3a6187(0x4f2)](VisuMZ['CoreEngine'][_0x3a6187(0x8bb)][_0x3a6187(0x684)][_0x4c014d])){var _0x1ce9a8=String(RegExp['$1']);try{_0x49e590+=eval(_0x1ce9a8);}catch(_0x2ca6cf){if($gameTemp[_0x3a6187(0x206)]())console['log'](_0x2ca6cf);}}return _0x49e590;};return this[_0x4adab(0x24f)]()[_0x4adab(0x544)](_0x280c63,0x0);},Game_BattlerBase[_0x55f97b(0x616)][_0x55f97b(0x5a9)]=function(_0x411a96){const _0x27fb24=_0x55f97b,_0x37a9d0=(_0x5d43c2,_0x18aea7)=>{const _0xaf0809=_0x2f79;if(!_0x18aea7)return _0x5d43c2;if(_0x18aea7[_0xaf0809(0x584)][_0xaf0809(0x4f2)](VisuMZ['CoreEngine']['RegExp'][_0xaf0809(0x70c)][_0x411a96])){var _0x29beca=Number(RegExp['$1'])/0x64;_0x5d43c2*=_0x29beca;}if(_0x18aea7['note'][_0xaf0809(0x4f2)](VisuMZ['CoreEngine'][_0xaf0809(0x8bb)][_0xaf0809(0x617)][_0x411a96])){var _0x29beca=Number(RegExp['$1']);_0x5d43c2*=_0x29beca;}if(_0x18aea7[_0xaf0809(0x584)][_0xaf0809(0x4f2)](VisuMZ['CoreEngine'][_0xaf0809(0x8bb)][_0xaf0809(0x560)][_0x411a96])){var _0x384925=String(RegExp['$1']);try{_0x5d43c2*=eval(_0x384925);}catch(_0x30bdd1){if($gameTemp[_0xaf0809(0x206)]())console[_0xaf0809(0x84b)](_0x30bdd1);}}return _0x5d43c2;};return this[_0x27fb24(0x24f)]()[_0x27fb24(0x544)](_0x37a9d0,0x1);},Game_BattlerBase[_0x55f97b(0x616)][_0x55f97b(0x68e)]=function(_0x1f3430){const _0x279ae0=_0x55f97b,_0x3877e0=(_0x389c49,_0x451699)=>{const _0x47e66a=_0x2f79;if(!_0x451699)return _0x389c49;if(_0x451699['note']['match'](VisuMZ[_0x47e66a(0x4af)][_0x47e66a(0x8bb)][_0x47e66a(0x60c)][_0x1f3430])){var _0x21332e=Number(RegExp['$1'])/0x64;_0x389c49+=_0x21332e;}if(_0x451699['note'][_0x47e66a(0x4f2)](VisuMZ['CoreEngine'][_0x47e66a(0x8bb)]['xparamFlat2'][_0x1f3430])){var _0x21332e=Number(RegExp['$1']);_0x389c49+=_0x21332e;}if(_0x451699['note'][_0x47e66a(0x4f2)](VisuMZ[_0x47e66a(0x4af)][_0x47e66a(0x8bb)]['xparamFlatJS'][_0x1f3430])){var _0x48862e=String(RegExp['$1']);try{_0x389c49+=eval(_0x48862e);}catch(_0x2f3eca){if($gameTemp[_0x47e66a(0x206)]())console[_0x47e66a(0x84b)](_0x2f3eca);}}return _0x389c49;};return this['traitObjects']()[_0x279ae0(0x544)](_0x3877e0,0x0);},Game_BattlerBase[_0x55f97b(0x616)][_0x55f97b(0x2a1)]=function(_0x2d7842){const _0x4cf269=_0x55f97b;let _0x43d0aa=_0x4cf269(0x2a1)+_0x2d7842+_0x4cf269(0x57d);if(this['checkCacheKey'](_0x43d0aa))return this[_0x4cf269(0x687)][_0x43d0aa];return this[_0x4cf269(0x687)][_0x43d0aa]=VisuMZ[_0x4cf269(0x4af)][_0x4cf269(0x386)][_0x4cf269(0x91f)][_0x4cf269(0x227)][_0x4cf269(0x8a8)](this,_0x2d7842),this[_0x4cf269(0x687)][_0x43d0aa];},Game_BattlerBase[_0x55f97b(0x616)][_0x55f97b(0x318)]=function(_0x19bd7a){const _0x449a4c=_0x55f97b,_0x228137=(_0x181c78,_0xd89abe)=>{const _0x2c8337=_0x2f79;if(!_0xd89abe)return _0x181c78;if(_0xd89abe[_0x2c8337(0x584)]['match'](VisuMZ[_0x2c8337(0x4af)]['RegExp']['sparamPlus1'][_0x19bd7a])){var _0x1f2da5=Number(RegExp['$1'])/0x64;_0x181c78+=_0x1f2da5;}if(_0xd89abe[_0x2c8337(0x584)]['match'](VisuMZ[_0x2c8337(0x4af)][_0x2c8337(0x8bb)][_0x2c8337(0x96e)][_0x19bd7a])){var _0x1f2da5=Number(RegExp['$1']);_0x181c78+=_0x1f2da5;}if(_0xd89abe[_0x2c8337(0x584)][_0x2c8337(0x4f2)](VisuMZ[_0x2c8337(0x4af)]['RegExp']['sparamPlusJS'][_0x19bd7a])){var _0x2bf74c=String(RegExp['$1']);try{_0x181c78+=eval(_0x2bf74c);}catch(_0x5eaffe){if($gameTemp['isPlaytest']())console[_0x2c8337(0x84b)](_0x5eaffe);}}return _0x181c78;};return this[_0x449a4c(0x24f)]()['reduce'](_0x228137,0x0);},Game_BattlerBase[_0x55f97b(0x616)][_0x55f97b(0x388)]=function(_0x18c194){const _0x204b8f=_0x55f97b,_0x205127=(_0x311f0,_0x5f0f7d)=>{const _0x868221=_0x2f79;if(!_0x5f0f7d)return _0x311f0;if(_0x5f0f7d[_0x868221(0x584)][_0x868221(0x4f2)](VisuMZ[_0x868221(0x4af)]['RegExp']['sparamRate1'][_0x18c194])){var _0x282367=Number(RegExp['$1'])/0x64;_0x311f0*=_0x282367;}if(_0x5f0f7d[_0x868221(0x584)][_0x868221(0x4f2)](VisuMZ[_0x868221(0x4af)][_0x868221(0x8bb)][_0x868221(0x498)][_0x18c194])){var _0x282367=Number(RegExp['$1']);_0x311f0*=_0x282367;}if(_0x5f0f7d['note'][_0x868221(0x4f2)](VisuMZ[_0x868221(0x4af)][_0x868221(0x8bb)]['sparamRateJS'][_0x18c194])){var _0x268680=String(RegExp['$1']);try{_0x311f0*=eval(_0x268680);}catch(_0x19970a){if($gameTemp[_0x868221(0x206)]())console[_0x868221(0x84b)](_0x19970a);}}return _0x311f0;};return this['traitObjects']()[_0x204b8f(0x544)](_0x205127,0x1);},Game_BattlerBase[_0x55f97b(0x616)]['sparamFlatBonus']=function(_0x4a4405){const _0x55841d=_0x55f97b,_0x2b40af=(_0x84c141,_0x1aa036)=>{const _0x4734ca=_0x2f79;if(!_0x1aa036)return _0x84c141;if(_0x1aa036[_0x4734ca(0x584)][_0x4734ca(0x4f2)](VisuMZ[_0x4734ca(0x4af)][_0x4734ca(0x8bb)][_0x4734ca(0x512)][_0x4a4405])){var _0x4696a1=Number(RegExp['$1'])/0x64;_0x84c141+=_0x4696a1;}if(_0x1aa036[_0x4734ca(0x584)][_0x4734ca(0x4f2)](VisuMZ[_0x4734ca(0x4af)]['RegExp'][_0x4734ca(0x6ff)][_0x4a4405])){var _0x4696a1=Number(RegExp['$1']);_0x84c141+=_0x4696a1;}if(_0x1aa036[_0x4734ca(0x584)]['match'](VisuMZ[_0x4734ca(0x4af)]['RegExp'][_0x4734ca(0x543)][_0x4a4405])){var _0x253419=String(RegExp['$1']);try{_0x84c141+=eval(_0x253419);}catch(_0x18ea05){if($gameTemp[_0x4734ca(0x206)]())console[_0x4734ca(0x84b)](_0x18ea05);}}return _0x84c141;};return this[_0x55841d(0x24f)]()[_0x55841d(0x544)](_0x2b40af,0x0);},Game_BattlerBase[_0x55f97b(0x616)][_0x55f97b(0x881)]=function(_0x38ef83){const _0x4fb1d2=_0x55f97b;let _0x27dcbe=_0x4fb1d2(0x881)+_0x38ef83+_0x4fb1d2(0x57d);if(this[_0x4fb1d2(0x883)](_0x27dcbe))return this[_0x4fb1d2(0x687)][_0x27dcbe];return this[_0x4fb1d2(0x687)][_0x27dcbe]=VisuMZ[_0x4fb1d2(0x4af)][_0x4fb1d2(0x386)][_0x4fb1d2(0x91f)][_0x4fb1d2(0x33b)][_0x4fb1d2(0x8a8)](this,_0x38ef83),this[_0x4fb1d2(0x687)][_0x27dcbe];},Game_BattlerBase[_0x55f97b(0x616)][_0x55f97b(0x955)]=function(_0x481670,_0x2dccc5){const _0x31012f=_0x55f97b;if(typeof paramId===_0x31012f(0x453))return this[_0x31012f(0x65f)](_0x481670);_0x481670=String(_0x481670||'')['toUpperCase']();if(_0x481670===_0x31012f(0x6de))return this[_0x31012f(0x65f)](0x0);if(_0x481670===_0x31012f(0x2bc))return this['param'](0x1);if(_0x481670===_0x31012f(0x832))return this[_0x31012f(0x65f)](0x2);if(_0x481670==='DEF')return this[_0x31012f(0x65f)](0x3);if(_0x481670===_0x31012f(0x6d7))return this[_0x31012f(0x65f)](0x4);if(_0x481670==='MDF')return this[_0x31012f(0x65f)](0x5);if(_0x481670===_0x31012f(0x385))return this[_0x31012f(0x65f)](0x6);if(_0x481670===_0x31012f(0x6e4))return this[_0x31012f(0x65f)](0x7);if(_0x481670===_0x31012f(0x64d))return _0x2dccc5?String(Math[_0x31012f(0x7dd)](this[_0x31012f(0x2a1)](0x0)*0x64))+'%':this[_0x31012f(0x2a1)](0x0);if(_0x481670===_0x31012f(0x466))return _0x2dccc5?String(Math['round'](this[_0x31012f(0x2a1)](0x1)*0x64))+'%':this[_0x31012f(0x2a1)](0x1);if(_0x481670===_0x31012f(0x34c))return _0x2dccc5?String(Math[_0x31012f(0x7dd)](this[_0x31012f(0x2a1)](0x2)*0x64))+'%':this[_0x31012f(0x2a1)](0x2);if(_0x481670===_0x31012f(0x3d4))return _0x2dccc5?String(Math[_0x31012f(0x7dd)](this['xparam'](0x3)*0x64))+'%':this['xparam'](0x3);if(_0x481670===_0x31012f(0x399))return _0x2dccc5?String(Math['round'](this['xparam'](0x4)*0x64))+'%':this[_0x31012f(0x2a1)](0x4);if(_0x481670==='MRF')return _0x2dccc5?String(Math[_0x31012f(0x7dd)](this[_0x31012f(0x2a1)](0x5)*0x64))+'%':this[_0x31012f(0x2a1)](0x5);if(_0x481670==='CNT')return _0x2dccc5?String(Math[_0x31012f(0x7dd)](this['xparam'](0x6)*0x64))+'%':this[_0x31012f(0x2a1)](0x6);if(_0x481670===_0x31012f(0x77c))return _0x2dccc5?String(Math['round'](this[_0x31012f(0x2a1)](0x7)*0x64))+'%':this[_0x31012f(0x2a1)](0x7);if(_0x481670===_0x31012f(0x8bc))return _0x2dccc5?String(Math[_0x31012f(0x7dd)](this[_0x31012f(0x2a1)](0x8)*0x64))+'%':this[_0x31012f(0x2a1)](0x8);if(_0x481670===_0x31012f(0x63f))return _0x2dccc5?String(Math[_0x31012f(0x7dd)](this[_0x31012f(0x2a1)](0x9)*0x64))+'%':this[_0x31012f(0x2a1)](0x9);if(_0x481670===_0x31012f(0x818))return _0x2dccc5?String(Math['round'](this[_0x31012f(0x881)](0x0)*0x64))+'%':this[_0x31012f(0x881)](0x0);if(_0x481670==='GRD')return _0x2dccc5?String(Math[_0x31012f(0x7dd)](this[_0x31012f(0x881)](0x1)*0x64))+'%':this['sparam'](0x1);if(_0x481670==='REC')return _0x2dccc5?String(Math[_0x31012f(0x7dd)](this[_0x31012f(0x881)](0x2)*0x64))+'%':this[_0x31012f(0x881)](0x2);if(_0x481670===_0x31012f(0x6f2))return _0x2dccc5?String(Math['round'](this[_0x31012f(0x881)](0x3)*0x64))+'%':this[_0x31012f(0x881)](0x3);if(_0x481670==='MCR')return _0x2dccc5?String(Math[_0x31012f(0x7dd)](this['sparam'](0x4)*0x64))+'%':this[_0x31012f(0x881)](0x4);if(_0x481670===_0x31012f(0x23d))return _0x2dccc5?String(Math[_0x31012f(0x7dd)](this[_0x31012f(0x881)](0x5)*0x64))+'%':this['sparam'](0x5);if(_0x481670===_0x31012f(0x756))return _0x2dccc5?String(Math[_0x31012f(0x7dd)](this[_0x31012f(0x881)](0x6)*0x64))+'%':this['sparam'](0x6);if(_0x481670===_0x31012f(0x5ff))return _0x2dccc5?String(Math['round'](this['sparam'](0x7)*0x64))+'%':this[_0x31012f(0x881)](0x7);if(_0x481670==='FDR')return _0x2dccc5?String(Math['round'](this[_0x31012f(0x881)](0x8)*0x64))+'%':this[_0x31012f(0x881)](0x8);if(_0x481670===_0x31012f(0x78d))return _0x2dccc5?String(Math['round'](this[_0x31012f(0x881)](0x9)*0x64))+'%':this[_0x31012f(0x881)](0x9);if(VisuMZ[_0x31012f(0x4af)][_0x31012f(0x943)][_0x481670]){const _0x3f7fbb=VisuMZ['CoreEngine'][_0x31012f(0x943)][_0x481670],_0x8cc81=this[_0x3f7fbb];return VisuMZ[_0x31012f(0x4af)][_0x31012f(0x780)][_0x481670]===_0x31012f(0x4f9)?_0x8cc81:_0x2dccc5?String(Math['round'](_0x8cc81*0x64))+'%':_0x8cc81;}return'';},Game_BattlerBase[_0x55f97b(0x616)][_0x55f97b(0x2e6)]=function(){const _0x279e61=_0x55f97b;return this[_0x279e61(0x929)]()&&this[_0x279e61(0x88f)]<this[_0x279e61(0x91d)]*VisuMZ[_0x279e61(0x4af)]['Settings']['Param'][_0x279e61(0x302)];},Game_Battler['prototype'][_0x55f97b(0x698)]=function(){const _0x24cce9=_0x55f97b;SoundManager[_0x24cce9(0x768)](),this[_0x24cce9(0x351)]('evade');},VisuMZ[_0x55f97b(0x4af)]['Game_Actor_isPreserveTp']=Game_Actor[_0x55f97b(0x616)][_0x55f97b(0x8f1)],Game_Actor['prototype'][_0x55f97b(0x8f1)]=function(){const _0x4e829b=_0x55f97b;if(!$gameParty['inBattle']())return!![];return VisuMZ[_0x4e829b(0x4af)][_0x4e829b(0x74a)]['call'](this);},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x4fe)]=Game_Actor[_0x55f97b(0x616)][_0x55f97b(0x74f)],Game_Actor['prototype'][_0x55f97b(0x74f)]=function(_0x5842d1){const _0xb5becb=_0x55f97b;if(this[_0xb5becb(0x2f9)]>0x63)return this['paramBaseAboveLevel99'](_0x5842d1);return VisuMZ[_0xb5becb(0x4af)][_0xb5becb(0x4fe)][_0xb5becb(0x8a8)](this,_0x5842d1);},Game_Actor[_0x55f97b(0x616)][_0x55f97b(0x83d)]=function(_0x4accd3){const _0x16ff55=_0x55f97b,_0x4c2651=this[_0x16ff55(0x8ed)]()[_0x16ff55(0x8bf)][_0x4accd3][0x63],_0x2262e1=this[_0x16ff55(0x8ed)]()[_0x16ff55(0x8bf)][_0x4accd3][0x62];return _0x4c2651+(_0x4c2651-_0x2262e1)*(this[_0x16ff55(0x2f9)]-0x63);},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x8f9)]=Game_Actor[_0x55f97b(0x616)][_0x55f97b(0x553)],Game_Actor[_0x55f97b(0x616)][_0x55f97b(0x553)]=function(_0x1f6bdf,_0x43da22){const _0x3751cb=_0x55f97b;$gameTemp[_0x3751cb(0x7f7)]=!![],VisuMZ[_0x3751cb(0x4af)]['Game_Actor_changeClass']['call'](this,_0x1f6bdf,_0x43da22),$gameTemp[_0x3751cb(0x7f7)]=undefined;},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x75b)]=Game_Actor[_0x55f97b(0x616)][_0x55f97b(0x6a8)],Game_Actor[_0x55f97b(0x616)][_0x55f97b(0x6a8)]=function(){const _0x3dde38=_0x55f97b;VisuMZ[_0x3dde38(0x4af)][_0x3dde38(0x75b)][_0x3dde38(0x8a8)](this);if(!$gameTemp[_0x3dde38(0x7f7)])this[_0x3dde38(0x22f)]();},Game_Actor[_0x55f97b(0x616)][_0x55f97b(0x22f)]=function(){const _0x22169a=_0x55f97b;this[_0x22169a(0x687)]={};if(VisuMZ['CoreEngine']['Settings'][_0x22169a(0x585)][_0x22169a(0x5a2)])this['_hp']=this[_0x22169a(0x91d)];if(VisuMZ[_0x22169a(0x4af)][_0x22169a(0x386)][_0x22169a(0x585)][_0x22169a(0x1a4)])this[_0x22169a(0x984)]=this['mmp'];},Game_Actor[_0x55f97b(0x616)][_0x55f97b(0x502)]=function(){const _0x552182=_0x55f97b;if(this[_0x552182(0x446)]())return 0x1;const _0x3f3b10=this[_0x552182(0x53c)]()-this[_0x552182(0x68a)](),_0x4d5777=this['currentExp']()-this[_0x552182(0x68a)]();return(_0x4d5777/_0x3f3b10)[_0x552182(0x60e)](0x0,0x1);},Game_Actor[_0x55f97b(0x616)][_0x55f97b(0x24f)]=function(){const _0x516792=_0x55f97b,_0x3aa338=Game_Battler[_0x516792(0x616)][_0x516792(0x24f)][_0x516792(0x8a8)](this);for(const _0x28f108 of this[_0x516792(0x2d1)]()){_0x28f108&&_0x3aa338['push'](_0x28f108);}return _0x3aa338[_0x516792(0x35b)](this[_0x516792(0x8ed)](),this['actor']()),_0x3aa338;},Object['defineProperty'](Game_Enemy[_0x55f97b(0x616)],'level',{'get':function(){const _0xa3a880=_0x55f97b;return this[_0xa3a880(0x93d)]();},'configurable':!![]}),Game_Enemy[_0x55f97b(0x616)][_0x55f97b(0x93d)]=function(){const _0x2d0564=_0x55f97b;return this[_0x2d0564(0x97c)]()[_0x2d0564(0x2f9)];},Game_Enemy[_0x55f97b(0x616)]['moveRelativeToResolutionChange']=function(){const _0x17840f=_0x55f97b;!this['_repositioned']&&(this[_0x17840f(0x60b)]+=Math['round']((Graphics[_0x17840f(0x4f7)]-0x270)/0x2),this[_0x17840f(0x60b)]-=Math[_0x17840f(0x8d7)]((Graphics[_0x17840f(0x4f7)]-Graphics[_0x17840f(0x3e7)])/0x2),$gameSystem[_0x17840f(0x19e)]()?this[_0x17840f(0x4f5)]-=Math[_0x17840f(0x8d7)]((Graphics[_0x17840f(0x7cc)]-Graphics['boxWidth'])/0x2):this[_0x17840f(0x4f5)]+=Math[_0x17840f(0x7dd)]((Graphics['boxWidth']-0x330)/0x2)),this['_repositioned']=!![];},Game_Party['prototype'][_0x55f97b(0x2f8)]=function(){const _0x1d9c40=_0x55f97b;return VisuMZ[_0x1d9c40(0x4af)][_0x1d9c40(0x386)][_0x1d9c40(0x945)][_0x1d9c40(0x659)];},VisuMZ['CoreEngine'][_0x55f97b(0x81f)]=Game_Party[_0x55f97b(0x616)][_0x55f97b(0x438)],Game_Party[_0x55f97b(0x616)][_0x55f97b(0x438)]=function(_0x2a8d32){const _0x12c4c9=_0x55f97b;if(VisuMZ[_0x12c4c9(0x4af)][_0x12c4c9(0x386)][_0x12c4c9(0x585)][_0x12c4c9(0x61b)]&&DataManager['isKeyItem'](_0x2a8d32))return;VisuMZ[_0x12c4c9(0x4af)][_0x12c4c9(0x81f)][_0x12c4c9(0x8a8)](this,_0x2a8d32);},Game_Party[_0x55f97b(0x616)]['setupBattleTestItems']=function(){const _0x3a6cfe=_0x55f97b,_0x4f917d=VisuMZ['CoreEngine'][_0x3a6cfe(0x386)][_0x3a6cfe(0x585)],_0x573f7b=_0x4f917d['BTestAddedQuantity']??0x63;let _0x354b0f=[];(_0x4f917d[_0x3a6cfe(0x1ce)]??!![])&&(_0x354b0f=_0x354b0f[_0x3a6cfe(0x830)]($dataItems));(_0x4f917d[_0x3a6cfe(0x4d7)]??!![])&&(_0x354b0f=_0x354b0f[_0x3a6cfe(0x830)]($dataWeapons));(_0x4f917d[_0x3a6cfe(0x791)]??!![])&&(_0x354b0f=_0x354b0f['concat']($dataArmors));for(const _0x137069 of _0x354b0f){if(!_0x137069)continue;if(_0x137069[_0x3a6cfe(0x1bc)][_0x3a6cfe(0x8e9)]()<=0x0)continue;if(_0x137069[_0x3a6cfe(0x1bc)][_0x3a6cfe(0x4f2)](/-----/i))continue;this[_0x3a6cfe(0x380)](_0x137069,_0x573f7b);}},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x464)]=Game_Troop['prototype'][_0x55f97b(0x66c)],Game_Troop[_0x55f97b(0x616)]['setup']=function(_0x351d73){const _0x396ac5=_0x55f97b;$gameTemp[_0x396ac5(0x325)](),$gameTemp[_0x396ac5(0x968)](_0x351d73),VisuMZ[_0x396ac5(0x4af)][_0x396ac5(0x464)][_0x396ac5(0x8a8)](this,_0x351d73);},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x1e6)]=Game_Map['prototype'][_0x55f97b(0x66c)],Game_Map['prototype'][_0x55f97b(0x66c)]=function(_0x162eed){const _0xf7e94c=_0x55f97b;VisuMZ[_0xf7e94c(0x4af)][_0xf7e94c(0x1e6)][_0xf7e94c(0x8a8)](this,_0x162eed),this[_0xf7e94c(0x608)](),this['setupCoreEngine'](_0x162eed),this[_0xf7e94c(0x6a7)]();},Game_Map[_0x55f97b(0x616)][_0x55f97b(0x7fc)]=function(){const _0x177982=_0x55f97b;this['_hideTileShadows']=VisuMZ[_0x177982(0x4af)][_0x177982(0x386)][_0x177982(0x585)][_0x177982(0x30a)]||![];const _0x13dae8=VisuMZ['CoreEngine'][_0x177982(0x386)][_0x177982(0x1ea)],_0x205ecf=$dataMap?$dataMap[_0x177982(0x584)]||'':'';if(_0x205ecf[_0x177982(0x4f2)](/<SHOW TILE SHADOWS>/i))this[_0x177982(0x5f4)]=![];else _0x205ecf['match'](/<HIDE TILE SHADOWS>/i)&&(this['_hideTileShadows']=!![]);if(_0x205ecf[_0x177982(0x4f2)](/<SCROLL LOCK X>/i))this[_0x177982(0x3cb)]()[_0x177982(0x60d)]=!![],this['centerCameraCheckData']()['displayX']=_0x13dae8['DisplayLockX'];else _0x205ecf[_0x177982(0x4f2)](/<SCROLL LOCK X: (.*?)>/i)&&(this[_0x177982(0x3cb)]()[_0x177982(0x60d)]=!![],this[_0x177982(0x3cb)]()[_0x177982(0x7b4)]=Number(RegExp['$1']));if(_0x205ecf[_0x177982(0x4f2)](/<SCROLL LOCK Y>/i))this['centerCameraCheckData']()['centerY']=!![],this[_0x177982(0x3cb)]()[_0x177982(0x531)]=_0x13dae8[_0x177982(0x843)];else _0x205ecf[_0x177982(0x4f2)](/<SCROLL LOCK Y: (.*?)>/i)&&(this[_0x177982(0x3cb)]()[_0x177982(0x8aa)]=!![],this[_0x177982(0x3cb)]()[_0x177982(0x531)]=Number(RegExp['$1']));},Game_Map[_0x55f97b(0x616)][_0x55f97b(0x7d3)]=function(){const _0x9e52a4=_0x55f97b;if(this[_0x9e52a4(0x5f4)]===undefined)this[_0x9e52a4(0x7fc)]();return this[_0x9e52a4(0x5f4)];},Game_Map[_0x55f97b(0x616)]['checkCoreEngineDisplayCenter']=function(){const _0x5cd496=_0x55f97b,_0x41c97c=VisuMZ[_0x5cd496(0x4af)]['Settings'][_0x5cd496(0x1ea)];this[_0x5cd496(0x65e)]={'centerX':![],'centerY':![],'displayX':0x0,'displayY':0x0};if(_0x41c97c[_0x5cd496(0x5b6)]){const _0x34c98d=Graphics['width']/this['tileWidth']();_0x34c98d%0x1!==0x0&&Math[_0x5cd496(0x6af)](_0x34c98d)===this[_0x5cd496(0x7cc)]()&&!this[_0x5cd496(0x811)]()&&(this['_centerCameraCheck'][_0x5cd496(0x60d)]=!![],this[_0x5cd496(0x65e)][_0x5cd496(0x7b4)]=_0x41c97c[_0x5cd496(0x3f0)]||0x0);}if(_0x41c97c[_0x5cd496(0x53d)]){const _0x157ba2=Graphics[_0x5cd496(0x4f7)]/this[_0x5cd496(0x317)]();_0x157ba2%0x1!==0x0&&Math['ceil'](_0x157ba2)===this[_0x5cd496(0x4f7)]()&&!this['isLoopVertical']()&&(this[_0x5cd496(0x65e)][_0x5cd496(0x8aa)]=!![],this['_centerCameraCheck'][_0x5cd496(0x531)]=_0x41c97c['DisplayLockY']||0x0);}$gameScreen[_0x5cd496(0x3b5)]()===0x1&&(this[_0x5cd496(0x3cb)]()[_0x5cd496(0x60d)]&&(this[_0x5cd496(0x43d)]=this[_0x5cd496(0x3cb)]()[_0x5cd496(0x7b4)]),this[_0x5cd496(0x3cb)]()[_0x5cd496(0x8aa)]&&(this[_0x5cd496(0x728)]=this[_0x5cd496(0x3cb)]()[_0x5cd496(0x531)]));},VisuMZ['CoreEngine'][_0x55f97b(0x800)]=Game_Map['prototype'][_0x55f97b(0x7c9)],Game_Map[_0x55f97b(0x616)][_0x55f97b(0x7c9)]=function(_0x3687b3,_0x1b5032){const _0x4140a4=_0x55f97b;VisuMZ[_0x4140a4(0x4af)][_0x4140a4(0x800)][_0x4140a4(0x8a8)](this,_0x3687b3,_0x1b5032),$gameScreen[_0x4140a4(0x3b5)]()===0x1&&(!this[_0x4140a4(0x811)]()&&this[_0x4140a4(0x3cb)]()['centerX']&&(this['_displayX']=this[_0x4140a4(0x3cb)]()['displayX']),!this[_0x4140a4(0x452)]()&&this['centerCameraCheckData']()[_0x4140a4(0x8aa)]&&(this[_0x4140a4(0x728)]=this[_0x4140a4(0x3cb)]()[_0x4140a4(0x531)]));},Game_Map[_0x55f97b(0x616)][_0x55f97b(0x3cb)]=function(){const _0x278f4f=_0x55f97b;if(this[_0x278f4f(0x65e)]===undefined)this['checkCoreEngineDisplayCenter']();return this[_0x278f4f(0x65e)];},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x3a8)]=Game_Map[_0x55f97b(0x616)]['scrollDown'],Game_Map[_0x55f97b(0x616)][_0x55f97b(0x290)]=function(_0x948848){const _0x3eced2=_0x55f97b;if(this[_0x3eced2(0x3cb)]()[_0x3eced2(0x8aa)]&&$gameScreen[_0x3eced2(0x3b5)]()===0x1){this['_displayY']=this[_0x3eced2(0x3cb)]()[_0x3eced2(0x531)];return;}VisuMZ[_0x3eced2(0x4af)]['Game_Map_scrollDown'][_0x3eced2(0x8a8)](this,_0x948848);},VisuMZ[_0x55f97b(0x4af)]['Game_Map_scrollLeft']=Game_Map[_0x55f97b(0x616)][_0x55f97b(0x57f)],Game_Map[_0x55f97b(0x616)][_0x55f97b(0x57f)]=function(_0x56f44e){const _0x2e8cd9=_0x55f97b;if(this[_0x2e8cd9(0x3cb)]()[_0x2e8cd9(0x60d)]&&$gameScreen[_0x2e8cd9(0x3b5)]()===0x1){this[_0x2e8cd9(0x43d)]=this[_0x2e8cd9(0x3cb)]()['displayX'];return;}VisuMZ[_0x2e8cd9(0x4af)][_0x2e8cd9(0x4ab)]['call'](this,_0x56f44e);},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x606)]=Game_Map[_0x55f97b(0x616)]['scrollRight'],Game_Map[_0x55f97b(0x616)][_0x55f97b(0x21d)]=function(_0x3b1232){const _0x4590d7=_0x55f97b;if(this[_0x4590d7(0x3cb)]()['centerX']&&$gameScreen['zoomScale']()===0x1){this[_0x4590d7(0x43d)]=this[_0x4590d7(0x3cb)]()[_0x4590d7(0x7b4)];return;}VisuMZ[_0x4590d7(0x4af)][_0x4590d7(0x606)][_0x4590d7(0x8a8)](this,_0x3b1232);},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x73a)]=Game_Map[_0x55f97b(0x616)][_0x55f97b(0x27a)],Game_Map['prototype']['scrollUp']=function(_0xfbca92){const _0x70d2e2=_0x55f97b;if(this[_0x70d2e2(0x3cb)]()['centerY']&&$gameScreen[_0x70d2e2(0x3b5)]()===0x1){this[_0x70d2e2(0x728)]=this[_0x70d2e2(0x3cb)]()[_0x70d2e2(0x531)];return;}VisuMZ[_0x70d2e2(0x4af)][_0x70d2e2(0x73a)][_0x70d2e2(0x8a8)](this,_0xfbca92);},Game_Map['prototype'][_0x55f97b(0x6a7)]=function(){const _0x2c3832=_0x55f97b;this['_tileExtendTerrainTags']={};const _0x1bafdc=this[_0x2c3832(0x26c)]();if(!_0x1bafdc)return{};const _0x24f926=_0x1bafdc[_0x2c3832(0x584)]||'',_0x47e700=/<(?:TALLER|EXT|EXTEND|RAISE)[ ]BY[ ](\d+):[ ](.*)>/gi;let _0x12ecba={};const _0x4143c3=_0x24f926[_0x2c3832(0x4f2)](_0x47e700);if(_0x4143c3)for(const _0x3a66d0 of _0x4143c3){_0x3a66d0[_0x2c3832(0x4f2)](_0x47e700);const _0xb04a37=Number(RegExp['$1'])['clamp'](0x1,0x10),_0x2500c6=String(RegExp['$2'])[_0x2c3832(0x43c)](',')[_0x2c3832(0x5f9)](_0x5d35bb=>Number(_0x5d35bb)[_0x2c3832(0x60e)](0x1,0x7));for(const _0x39ac1e of _0x2500c6){_0x12ecba[_0x39ac1e]=_0xb04a37;}}this[_0x2c3832(0x74d)]=_0x12ecba;},Game_Map[_0x55f97b(0x616)][_0x55f97b(0x71b)]=function(){const _0x547b84=_0x55f97b;if(this[_0x547b84(0x74d)]===undefined)this[_0x547b84(0x6a7)]();return this[_0x547b84(0x74d)];},Game_Map['prototype']['isTileExtended']=function(_0x1c5ddf){const _0x316991=_0x55f97b;if(_0x1c5ddf>=0x400)return![];const _0x201524=$gameMap[_0x316991(0x71b)]();if(Object[_0x316991(0x794)](_0x201524)[_0x316991(0x382)]<=0x0)return![];const _0x198820=this['tilesetFlags'](),_0x2997bc=_0x198820[_0x1c5ddf]>>0xc,_0x1e3f75=_0x201524[_0x2997bc]||0x0;return _0x1e3f75>0x0;},VisuMZ['CoreEngine']['Game_Map_changeTileset']=Game_Map['prototype']['changeTileset'],Game_Map[_0x55f97b(0x616)][_0x55f97b(0x456)]=function(_0x3b7103){const _0x2103a1=_0x55f97b;VisuMZ[_0x2103a1(0x4af)]['Game_Map_changeTileset'][_0x2103a1(0x8a8)](this,_0x3b7103),this[_0x2103a1(0x8b1)](),SceneManager[_0x2103a1(0x49f)]['_spriteset'][_0x2103a1(0x94f)]();},Game_Map[_0x55f97b(0x616)][_0x55f97b(0x8b1)]=function(){const _0x51df78=_0x55f97b,_0x2293f7=this[_0x51df78(0x71b)]();if(Object['keys'](_0x2293f7)['length']<=0x0)return;const _0x318dac=SceneManager[_0x51df78(0x49f)]['_spriteset'];_0x318dac&&(_0x318dac[_0x51df78(0x312)]&&_0x318dac['removeTileExtendSprites'](),_0x318dac[_0x51df78(0x743)]&&_0x318dac[_0x51df78(0x743)]());},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x390)]=Game_Character[_0x55f97b(0x616)][_0x55f97b(0x8b9)],Game_Character['prototype'][_0x55f97b(0x8b9)]=function(_0x24312c){const _0x1e904f=_0x55f97b;try{VisuMZ[_0x1e904f(0x4af)][_0x1e904f(0x390)][_0x1e904f(0x8a8)](this,_0x24312c);}catch(_0x521de3){if($gameTemp['isPlaytest']())console[_0x1e904f(0x84b)](_0x521de3);}},Game_Player[_0x55f97b(0x616)][_0x55f97b(0x8d3)]=function(){const _0x164283=_0x55f97b,_0x204890=$gameMap[_0x164283(0x912)]();this[_0x164283(0x41f)]=Math[_0x164283(0x793)](_0x204890)+Math['randomInt'](_0x204890)+this[_0x164283(0x6b9)]();},Game_Player[_0x55f97b(0x616)][_0x55f97b(0x6b9)]=function(){const _0x572b5c=_0x55f97b;return $dataMap&&$dataMap[_0x572b5c(0x584)]&&$dataMap[_0x572b5c(0x584)][_0x572b5c(0x4f2)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ[_0x572b5c(0x4af)][_0x572b5c(0x386)][_0x572b5c(0x585)]['EncounterRateMinimum'];},VisuMZ['CoreEngine'][_0x55f97b(0x3ba)]=Game_Event[_0x55f97b(0x616)]['isCollidedWithEvents'],Game_Event[_0x55f97b(0x616)]['isCollidedWithEvents']=function(_0x4d6fba,_0x999e9c){const _0x137098=_0x55f97b;return this['isSmartEventCollisionOn']()?this[_0x137098(0x97b)](_0x4d6fba,_0x999e9c):VisuMZ[_0x137098(0x4af)][_0x137098(0x3ba)][_0x137098(0x8a8)](this,_0x4d6fba,_0x999e9c);},Game_Event['prototype'][_0x55f97b(0x4b1)]=function(){const _0x322070=_0x55f97b;return VisuMZ[_0x322070(0x4af)][_0x322070(0x386)][_0x322070(0x585)]['SmartEventCollisionPriority'];},Game_Event['prototype'][_0x55f97b(0x97b)]=function(_0x9b5ce3,_0x162aea){const _0x470264=_0x55f97b;if(!this[_0x470264(0x1f4)]())return![];else{const _0x2a820a=$gameMap['eventsXyNt'](_0x9b5ce3,_0x162aea)[_0x470264(0x217)](_0x569252=>_0x569252['isNormalPriority']());return _0x2a820a[_0x470264(0x382)]>0x0;}},VisuMZ[_0x55f97b(0x4af)]['Game_Interpreter_command105']=Game_Interpreter[_0x55f97b(0x616)]['command105'],Game_Interpreter[_0x55f97b(0x616)][_0x55f97b(0x7d2)]=function(_0x5ec030){const _0x4b7e6a=_0x55f97b,_0x443d8f=this[_0x4b7e6a(0x25f)]();return _0x443d8f[_0x4b7e6a(0x4f2)](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x4b7e6a(0x422)](_0x443d8f):VisuMZ[_0x4b7e6a(0x4af)][_0x4b7e6a(0x7cf)][_0x4b7e6a(0x8a8)](this,_0x5ec030);},Game_Interpreter[_0x55f97b(0x616)][_0x55f97b(0x25f)]=function(){const _0x4dcb49=_0x55f97b;let _0x16aceb='',_0x3c81c4=this[_0x4dcb49(0x5f5)]+0x1;while(this['_list'][_0x3c81c4]&&this[_0x4dcb49(0x648)][_0x3c81c4][_0x4dcb49(0x879)]===0x195){_0x16aceb+=this['_list'][_0x3c81c4][_0x4dcb49(0x87d)][0x0]+'\x0a',_0x3c81c4++;}return _0x16aceb;},Game_Interpreter['prototype'][_0x55f97b(0x422)]=function(_0x1efeac){const _0x231193=_0x55f97b;try{eval(_0x1efeac);}catch(_0x191755){$gameTemp['isPlaytest']()&&(console[_0x231193(0x84b)](_0x231193(0x762)),console[_0x231193(0x84b)](_0x191755));}return!![];},VisuMZ[_0x55f97b(0x4af)]['Game_Interpreter_command111']=Game_Interpreter[_0x55f97b(0x616)][_0x55f97b(0x235)],Game_Interpreter[_0x55f97b(0x616)][_0x55f97b(0x235)]=function(_0x344a47){const _0x1995d4=_0x55f97b;try{VisuMZ['CoreEngine'][_0x1995d4(0x450)][_0x1995d4(0x8a8)](this,_0x344a47);}catch(_0x36f573){$gameTemp['isPlaytest']()&&(console[_0x1995d4(0x84b)](_0x1995d4(0x491)),console[_0x1995d4(0x84b)](_0x36f573)),this[_0x1995d4(0x404)]();}return!![];},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x32a)]=Game_Interpreter[_0x55f97b(0x616)][_0x55f97b(0x61e)],Game_Interpreter[_0x55f97b(0x616)][_0x55f97b(0x61e)]=function(_0x246a18){const _0x1a59c1=_0x55f97b;try{VisuMZ[_0x1a59c1(0x4af)]['Game_Interpreter_command122']['call'](this,_0x246a18);}catch(_0x406e98){$gameTemp[_0x1a59c1(0x206)]()&&(console[_0x1a59c1(0x84b)](_0x1a59c1(0x308)),console['log'](_0x406e98));}return!![];},VisuMZ['CoreEngine'][_0x55f97b(0x7b7)]=Game_Interpreter[_0x55f97b(0x616)][_0x55f97b(0x5b7)],Game_Interpreter[_0x55f97b(0x616)][_0x55f97b(0x5b7)]=function(){const _0x292e04=_0x55f97b;try{VisuMZ['CoreEngine'][_0x292e04(0x7b7)][_0x292e04(0x8a8)](this);}catch(_0x37a5b0){$gameTemp['isPlaytest']()&&(console[_0x292e04(0x84b)]('Script\x20Call\x20Error'),console['log'](_0x37a5b0));}return!![];},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x296)]=Game_Interpreter[_0x55f97b(0x616)]['command357'],Game_Interpreter[_0x55f97b(0x616)][_0x55f97b(0x6f9)]=function(_0x46e3fd){const _0x3bfc99=_0x55f97b;return $gameTemp[_0x3bfc99(0x545)](this),VisuMZ[_0x3bfc99(0x4af)]['Game_Interpreter_PluginCommand'][_0x3bfc99(0x8a8)](this,_0x46e3fd);},Scene_Base[_0x55f97b(0x616)][_0x55f97b(0x6c6)]=function(){const _0x2120b6=_0x55f97b;return VisuMZ['CoreEngine'][_0x2120b6(0x386)]['UI'][_0x2120b6(0x440)];},Scene_Base[_0x55f97b(0x616)][_0x55f97b(0x667)]=function(){const _0x4cd9ed=_0x55f97b;return VisuMZ[_0x4cd9ed(0x4af)][_0x4cd9ed(0x386)]['UI']['BottomHelp'];},Scene_Base['prototype'][_0x55f97b(0x1ac)]=function(){const _0x541ca3=_0x55f97b;return VisuMZ[_0x541ca3(0x4af)]['Settings']['UI']['BottomButtons'];},Scene_Base[_0x55f97b(0x616)][_0x55f97b(0x78a)]=function(){const _0xa38919=_0x55f97b;return VisuMZ[_0xa38919(0x4af)][_0xa38919(0x386)]['UI'][_0xa38919(0x5ce)];},Scene_Base[_0x55f97b(0x616)][_0x55f97b(0x33f)]=function(){const _0x20f5d2=_0x55f97b;return VisuMZ[_0x20f5d2(0x4af)][_0x20f5d2(0x386)]['UI']['CommandWidth'];},Scene_Base[_0x55f97b(0x616)][_0x55f97b(0x4da)]=function(){const _0x24feeb=_0x55f97b;return VisuMZ[_0x24feeb(0x4af)]['Settings']['UI']['ButtonHeight'];},Scene_Base['prototype'][_0x55f97b(0x918)]=function(){const _0x2cab56=_0x55f97b;return VisuMZ[_0x2cab56(0x4af)]['Settings']['Window']['EnableMasking'];},VisuMZ['CoreEngine'][_0x55f97b(0x837)]=Scene_Base['prototype'][_0x55f97b(0x5e4)],Scene_Base['prototype'][_0x55f97b(0x5e4)]=function(){const _0x4949eb=_0x55f97b;VisuMZ[_0x4949eb(0x4af)]['Scene_Base_createWindowLayer'][_0x4949eb(0x8a8)](this),this[_0x4949eb(0x1ae)](),this[_0x4949eb(0x48c)](),this[_0x4949eb(0x877)]['x']=Math['round'](this[_0x4949eb(0x877)]['x']),this[_0x4949eb(0x877)]['y']=Math['round'](this[_0x4949eb(0x877)]['y']);},Scene_Base[_0x55f97b(0x616)][_0x55f97b(0x1ae)]=function(){},Scene_Base['prototype'][_0x55f97b(0x48c)]=function(){const _0x124a15=_0x55f97b;this[_0x124a15(0x37d)]=new Window_TextPopup(),this[_0x124a15(0x87c)](this['_textPopupWindow']);},$textPopup=function(_0x30ccf7){const _0x1eb0f0=_0x55f97b,_0x442f2c=SceneManager[_0x1eb0f0(0x49f)][_0x1eb0f0(0x37d)];_0x442f2c&&_0x442f2c[_0x1eb0f0(0x198)](_0x30ccf7);},Scene_Base['prototype']['buttonAssistKey1']=function(){const _0x253c54=_0x55f97b;return TextManager[_0x253c54(0x45a)](_0x253c54(0x73d),'pagedown');},Scene_Base['prototype'][_0x55f97b(0x535)]=function(){const _0x480973=_0x55f97b;return TextManager[_0x480973(0x39b)](_0x480973(0x7c6));},Scene_Base['prototype']['buttonAssistKey3']=function(){const _0x579e1f=_0x55f97b;return TextManager[_0x579e1f(0x39b)]('shift');},Scene_Base[_0x55f97b(0x616)][_0x55f97b(0x365)]=function(){const _0x5b92f2=_0x55f97b;return TextManager[_0x5b92f2(0x39b)]('ok');},Scene_Base[_0x55f97b(0x616)][_0x55f97b(0x864)]=function(){const _0xb4ea8a=_0x55f97b;return TextManager[_0xb4ea8a(0x39b)](_0xb4ea8a(0x8ce));},Scene_Base[_0x55f97b(0x616)][_0x55f97b(0x8fd)]=function(){const _0x4e0c8e=_0x55f97b;return this[_0x4e0c8e(0x568)]&&this[_0x4e0c8e(0x568)][_0x4e0c8e(0x292)]?TextManager['buttonAssistSwitch']:'';},Scene_Base[_0x55f97b(0x616)]['buttonAssistText2']=function(){return'';},Scene_Base[_0x55f97b(0x616)][_0x55f97b(0x63c)]=function(){return'';},Scene_Base[_0x55f97b(0x616)]['buttonAssistText4']=function(){const _0x5dda1d=_0x55f97b;return TextManager[_0x5dda1d(0x42a)];},Scene_Base[_0x55f97b(0x616)][_0x55f97b(0x451)]=function(){const _0x5e4f93=_0x55f97b;return TextManager[_0x5e4f93(0x709)];},Scene_Base[_0x55f97b(0x616)][_0x55f97b(0x2db)]=function(){return 0x0;},Scene_Base[_0x55f97b(0x616)][_0x55f97b(0x482)]=function(){return 0x0;},Scene_Base[_0x55f97b(0x616)]['buttonAssistOffset3']=function(){return 0x0;},Scene_Base[_0x55f97b(0x616)][_0x55f97b(0x897)]=function(){return 0x0;},Scene_Base['prototype'][_0x55f97b(0x28c)]=function(){return 0x0;},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x1ab)]=Scene_Boot[_0x55f97b(0x616)][_0x55f97b(0x496)],Scene_Boot['prototype'][_0x55f97b(0x496)]=function(){const _0x895a22=_0x55f97b;VisuMZ['CoreEngine'][_0x895a22(0x1ab)]['call'](this),this[_0x895a22(0x1d1)]();},Scene_Boot[_0x55f97b(0x616)][_0x55f97b(0x1d1)]=function(){const _0x29d5a1=_0x55f97b,_0x57774d=['animations','battlebacks1',_0x29d5a1(0x2a7),_0x29d5a1(0x2e9),'enemies',_0x29d5a1(0x71c),'parallaxes',_0x29d5a1(0x7c3),'sv_actors',_0x29d5a1(0x69d),_0x29d5a1(0x8b2),_0x29d5a1(0x960),_0x29d5a1(0x4c0),'titles2'];for(const _0x15ab8a of _0x57774d){const _0x5f1a8f=VisuMZ['CoreEngine'][_0x29d5a1(0x386)][_0x29d5a1(0x867)][_0x15ab8a],_0x39a31c=_0x29d5a1(0x2ce)[_0x29d5a1(0x55a)](_0x15ab8a);for(const _0x331c06 of _0x5f1a8f){ImageManager[_0x29d5a1(0x954)](_0x39a31c,_0x331c06);}}},VisuMZ['CoreEngine'][_0x55f97b(0x6a0)]=Scene_Boot[_0x55f97b(0x616)][_0x55f97b(0x853)],Scene_Boot[_0x55f97b(0x616)]['startNormalGame']=function(){const _0xac19fb=_0x55f97b;Utils['isOptionValid'](_0xac19fb(0x57c))&&VisuMZ['CoreEngine'][_0xac19fb(0x386)][_0xac19fb(0x585)][_0xac19fb(0x8c1)]?this[_0xac19fb(0x919)]():VisuMZ['CoreEngine'][_0xac19fb(0x6a0)][_0xac19fb(0x8a8)](this);},Scene_Boot[_0x55f97b(0x616)][_0x55f97b(0x919)]=function(){const _0xacc154=_0x55f97b;this[_0xacc154(0x723)](),DataManager[_0xacc154(0x420)](),SceneManager[_0xacc154(0x587)](Scene_Map);},Scene_Boot['prototype'][_0x55f97b(0x573)]=function(){const _0x2386b3=_0x55f97b,_0x589bbb=$dataSystem[_0x2386b3(0x91c)][_0x2386b3(0x230)],_0x3ee313=$dataSystem[_0x2386b3(0x91c)][_0x2386b3(0x26f)],_0x264db7=VisuMZ[_0x2386b3(0x4af)][_0x2386b3(0x386)]['UI'][_0x2386b3(0x2de)];Graphics[_0x2386b3(0x32f)]=_0x589bbb-_0x264db7*0x2,Graphics[_0x2386b3(0x3e7)]=_0x3ee313-_0x264db7*0x2,this[_0x2386b3(0x238)]();},VisuMZ['CoreEngine'][_0x55f97b(0x6e5)]=Scene_Boot[_0x55f97b(0x616)][_0x55f97b(0x3d9)],Scene_Boot[_0x55f97b(0x616)][_0x55f97b(0x3d9)]=function(){const _0x11f5d4=_0x55f97b;this[_0x11f5d4(0x35a)]()?this[_0x11f5d4(0x58c)]():VisuMZ[_0x11f5d4(0x4af)][_0x11f5d4(0x6e5)]['call'](this);},Scene_Boot[_0x55f97b(0x616)][_0x55f97b(0x35a)]=function(){const _0x3c9378=_0x55f97b;if(Scene_Title[_0x3c9378(0x720)]==='')return![];if(Scene_Title[_0x3c9378(0x720)]==='Subtitle')return![];if(Scene_Title[_0x3c9378(0x272)]==='')return![];if(Scene_Title[_0x3c9378(0x272)]===_0x3c9378(0x443))return![];return!![];},Scene_Boot[_0x55f97b(0x616)][_0x55f97b(0x58c)]=function(){const _0x1c1855=_0x55f97b,_0x5755f8=$dataSystem[_0x1c1855(0x3be)],_0xa73190=Scene_Title[_0x1c1855(0x720)]||'',_0x365247=Scene_Title[_0x1c1855(0x272)]||'',_0x5a1f1e=VisuMZ[_0x1c1855(0x4af)][_0x1c1855(0x386)]['MenuLayout']['Title'][_0x1c1855(0x623)],_0x5a1d03=_0x5a1f1e['format'](_0x5755f8,_0xa73190,_0x365247);document[_0x1c1855(0x620)]=_0x5a1d03;},Scene_Boot[_0x55f97b(0x616)][_0x55f97b(0x238)]=function(){const _0x3d6d3b=_0x55f97b;if(VisuMZ[_0x3d6d3b(0x4af)][_0x3d6d3b(0x386)]['UI']['SideButtons']){const _0x411754=Graphics[_0x3d6d3b(0x7cc)]-Graphics[_0x3d6d3b(0x32f)]-VisuMZ[_0x3d6d3b(0x4af)][_0x3d6d3b(0x386)]['UI'][_0x3d6d3b(0x2de)]*0x2,_0x2c5d35=Sprite_Button[_0x3d6d3b(0x616)][_0x3d6d3b(0x3e6)]['call'](this)*0x4;if(_0x411754>=_0x2c5d35)SceneManager[_0x3d6d3b(0x6f8)](!![]);}},Scene_Title['subtitle']=VisuMZ['CoreEngine'][_0x55f97b(0x386)][_0x55f97b(0x265)][_0x55f97b(0x1e9)]['Subtitle'],Scene_Title[_0x55f97b(0x272)]=VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x386)]['MenuLayout'][_0x55f97b(0x1e9)][_0x55f97b(0x1ee)],Scene_Title[_0x55f97b(0x6d6)]=VisuMZ['CoreEngine'][_0x55f97b(0x386)][_0x55f97b(0x34b)],VisuMZ[_0x55f97b(0x4af)]['Scene_Title_drawGameTitle']=Scene_Title['prototype']['drawGameTitle'],Scene_Title[_0x55f97b(0x616)]['drawGameTitle']=function(){const _0x346df0=_0x55f97b;VisuMZ[_0x346df0(0x4af)][_0x346df0(0x386)]['MenuLayout']['Title'][_0x346df0(0x5c1)][_0x346df0(0x8a8)](this);if(Scene_Title[_0x346df0(0x720)]!==''&&Scene_Title[_0x346df0(0x720)]!==_0x346df0(0x50c))this[_0x346df0(0x499)]();if(Scene_Title[_0x346df0(0x272)]!==''&&Scene_Title[_0x346df0(0x272)]!==_0x346df0(0x443))this[_0x346df0(0x2d3)]();},Scene_Title['prototype'][_0x55f97b(0x499)]=function(){const _0xdef00=_0x55f97b;VisuMZ[_0xdef00(0x4af)][_0xdef00(0x386)]['MenuLayout'][_0xdef00(0x1e9)]['drawGameSubtitle'][_0xdef00(0x8a8)](this);},Scene_Title[_0x55f97b(0x616)][_0x55f97b(0x2d3)]=function(){const _0x4f663c=_0x55f97b;VisuMZ[_0x4f663c(0x4af)][_0x4f663c(0x386)]['MenuLayout']['Title'][_0x4f663c(0x2d3)][_0x4f663c(0x8a8)](this);},Scene_Title[_0x55f97b(0x616)][_0x55f97b(0x1dd)]=function(){const _0x120b51=_0x55f97b;this[_0x120b51(0x3b7)]();const _0x4ecc71=$dataSystem[_0x120b51(0x771)][_0x120b51(0x6c2)],_0x29d21b=this[_0x120b51(0x8a1)]();this[_0x120b51(0x6d3)]=new Window_TitleCommand(_0x29d21b),this[_0x120b51(0x6d3)][_0x120b51(0x6c7)](_0x4ecc71);const _0x1f4177=this[_0x120b51(0x8a1)]();this[_0x120b51(0x6d3)][_0x120b51(0x55b)](_0x1f4177['x'],_0x1f4177['y'],_0x1f4177[_0x120b51(0x7cc)],_0x1f4177[_0x120b51(0x4f7)]),this['_commandWindow'][_0x120b51(0x7d6)](),this['_commandWindow'][_0x120b51(0x285)](),this[_0x120b51(0x6d3)][_0x120b51(0x6a4)](),this[_0x120b51(0x90b)](this['_commandWindow']);},Scene_Title['prototype'][_0x55f97b(0x774)]=function(){const _0x1111f8=_0x55f97b;return this['_commandWindow']?this[_0x1111f8(0x6d3)][_0x1111f8(0x7b1)]():VisuMZ['CoreEngine'][_0x1111f8(0x386)][_0x1111f8(0x91e)][_0x1111f8(0x382)];},Scene_Title[_0x55f97b(0x616)][_0x55f97b(0x8a1)]=function(){const _0x4d7dbd=_0x55f97b;return VisuMZ[_0x4d7dbd(0x4af)][_0x4d7dbd(0x386)][_0x4d7dbd(0x265)][_0x4d7dbd(0x1e9)][_0x4d7dbd(0x8b5)][_0x4d7dbd(0x8a8)](this);},Scene_Title[_0x55f97b(0x616)][_0x55f97b(0x3b7)]=function(){const _0x55f006=_0x55f97b;for(const _0x30d8e9 of Scene_Title[_0x55f006(0x6d6)]){const _0x4c1b59=new Sprite_TitlePictureButton(_0x30d8e9);this[_0x55f006(0x87c)](_0x4c1b59);}},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x65b)]=Scene_Map[_0x55f97b(0x616)][_0x55f97b(0x374)],Scene_Map['prototype']['initialize']=function(){const _0x5b7bdd=_0x55f97b;VisuMZ[_0x5b7bdd(0x4af)]['Scene_Map_initialize']['call'](this),$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),this[_0x5b7bdd(0x7bd)]();},VisuMZ['CoreEngine'][_0x55f97b(0x3d0)]=Scene_Map['prototype'][_0x55f97b(0x4cb)],Scene_Map['prototype'][_0x55f97b(0x4cb)]=function(){const _0x195a6b=_0x55f97b;VisuMZ['CoreEngine'][_0x195a6b(0x3d0)]['call'](this),$gameTemp[_0x195a6b(0x4b6)]&&!$gameMessage[_0x195a6b(0x925)]()&&(this[_0x195a6b(0x288)](),SceneManager[_0x195a6b(0x2b2)]());},Scene_Map[_0x55f97b(0x616)][_0x55f97b(0x3ef)]=function(){const _0x516c9b=_0x55f97b;Scene_Message[_0x516c9b(0x616)][_0x516c9b(0x3ef)]['call'](this),!SceneManager[_0x516c9b(0x28a)](Scene_Battle)&&(this[_0x516c9b(0x891)]['update'](),this[_0x516c9b(0x346)][_0x516c9b(0x820)](),this[_0x516c9b(0x877)][_0x516c9b(0x292)]=![],SceneManager[_0x516c9b(0x267)]()),$gameScreen['clearZoom'](),this[_0x516c9b(0x7bd)]();},VisuMZ['CoreEngine'][_0x55f97b(0x34d)]=Scene_Map[_0x55f97b(0x616)]['createMenuButton'],Scene_Map['prototype'][_0x55f97b(0x6ea)]=function(){const _0x3158d8=_0x55f97b;VisuMZ[_0x3158d8(0x4af)][_0x3158d8(0x34d)][_0x3158d8(0x8a8)](this),SceneManager['isSideButtonLayout']()&&this['moveMenuButtonSideButtonLayout']();},Scene_Map[_0x55f97b(0x616)]['moveMenuButtonSideButtonLayout']=function(){const _0x181567=_0x55f97b;this[_0x181567(0x459)]['x']=Graphics[_0x181567(0x32f)]+0x4;},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x54f)]=Scene_Map[_0x55f97b(0x616)][_0x55f97b(0x2c0)],Scene_Map[_0x55f97b(0x616)][_0x55f97b(0x2c0)]=function(){const _0x5a36aa=_0x55f97b;VisuMZ['CoreEngine']['Scene_Map_updateScene']['call'](this),this[_0x5a36aa(0x6be)]();},Scene_Map[_0x55f97b(0x616)][_0x55f97b(0x6be)]=function(){const _0x6a082=_0x55f97b;Input[_0x6a082(0x31e)]('dashToggle')&&(ConfigManager[_0x6a082(0x221)]=!ConfigManager['alwaysDash'],ConfigManager[_0x6a082(0x6f3)]());},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x660)]=Scene_Map[_0x55f97b(0x616)][_0x55f97b(0x288)],Scene_Map[_0x55f97b(0x616)]['updateMain']=function(){const _0x4e3180=_0x55f97b;VisuMZ['CoreEngine'][_0x4e3180(0x660)]['call'](this),this[_0x4e3180(0x71f)]();},Scene_Map[_0x55f97b(0x616)][_0x55f97b(0x7bd)]=function(){this['_onceParallelInterpreters']=[];},Scene_Map[_0x55f97b(0x616)][_0x55f97b(0x71f)]=function(){const _0x58ca00=_0x55f97b;if(!this[_0x58ca00(0x6cc)])return;for(const _0x39251b of this[_0x58ca00(0x6cc)]){_0x39251b&&_0x39251b[_0x58ca00(0x94f)]();}},Scene_Map[_0x55f97b(0x616)][_0x55f97b(0x7c8)]=function(_0x2c5d4e,_0x2b2d99){const _0x591a70=_0x55f97b,_0x17b953=$dataCommonEvents[_0x2c5d4e];if(!_0x17b953)return;const _0x315202=new Game_OnceParallelInterpreter();this['addOnceParallelInterpreter'](_0x315202),_0x315202[_0x591a70(0x364)](_0x2c5d4e),_0x315202[_0x591a70(0x6c1)](_0x2b2d99);},Scene_Map[_0x55f97b(0x616)]['addOnceParallelInterpreter']=function(_0x2bc23d){const _0x26f0da=_0x55f97b;this['_onceParallelInterpreters']=this[_0x26f0da(0x6cc)]||[],this['_onceParallelInterpreters']['push'](_0x2bc23d);},Scene_Map[_0x55f97b(0x616)][_0x55f97b(0x4a2)]=function(_0x32d3fc){const _0x5da9b9=_0x55f97b;this[_0x5da9b9(0x6cc)]=this[_0x5da9b9(0x6cc)]||[],this['_onceParallelInterpreters']['remove'](_0x32d3fc);};function Game_OnceParallelInterpreter(){const _0x4537e2=_0x55f97b;this[_0x4537e2(0x374)](...arguments);}Game_OnceParallelInterpreter[_0x55f97b(0x616)]=Object[_0x55f97b(0x226)](Game_Interpreter[_0x55f97b(0x616)]),Game_OnceParallelInterpreter[_0x55f97b(0x616)][_0x55f97b(0x6ac)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter[_0x55f97b(0x616)][_0x55f97b(0x364)]=function(_0xf7b20e){const _0x34f576=_0x55f97b,_0x4e9a44=$dataCommonEvents[_0xf7b20e];_0x4e9a44?this[_0x34f576(0x66c)](_0x4e9a44[_0x34f576(0x255)],0x0):this['terminate']();},Game_OnceParallelInterpreter[_0x55f97b(0x616)]['setEvent']=function(_0x3edb6c){const _0x30116e=_0x55f97b;this[_0x30116e(0x826)]=_0x3edb6c||0x0;},Game_OnceParallelInterpreter[_0x55f97b(0x616)]['terminate']=function(){const _0x554643=_0x55f97b;if(!SceneManager[_0x554643(0x732)]())return;SceneManager[_0x554643(0x49f)]['removeOnceParallelInterpreter'](this),Game_Interpreter['prototype']['terminate'][_0x554643(0x8a8)](this);},VisuMZ['CoreEngine'][_0x55f97b(0x84e)]=Scene_MenuBase[_0x55f97b(0x616)][_0x55f97b(0x3a5)],Scene_MenuBase[_0x55f97b(0x616)][_0x55f97b(0x3a5)]=function(){const _0x5609bb=_0x55f97b;let _0x10fe78=0x0;return SceneManager[_0x5609bb(0x72c)]()?_0x10fe78=this['helpAreaTopSideButtonLayout']():_0x10fe78=VisuMZ[_0x5609bb(0x4af)][_0x5609bb(0x84e)][_0x5609bb(0x8a8)](this),_0x10fe78;},Scene_MenuBase['prototype'][_0x55f97b(0x403)]=function(){const _0x3f153c=_0x55f97b;return this[_0x3f153c(0x667)]()?this['mainAreaBottom']():0x0;},VisuMZ[_0x55f97b(0x4af)]['Scene_MenuBase_mainAreaTop']=Scene_MenuBase[_0x55f97b(0x616)][_0x55f97b(0x6b5)],Scene_MenuBase['prototype']['mainAreaTop']=function(){const _0x54e2b4=_0x55f97b;return SceneManager[_0x54e2b4(0x72c)]()?this[_0x54e2b4(0x58d)]():VisuMZ['CoreEngine'][_0x54e2b4(0x3e0)][_0x54e2b4(0x8a8)](this);},Scene_MenuBase[_0x55f97b(0x616)][_0x55f97b(0x58d)]=function(){const _0x30604e=_0x55f97b;if(!this[_0x30604e(0x667)]())return this['helpAreaBottom']();else return this['isMenuButtonAssistEnabled']()&&this[_0x30604e(0x61c)]()===_0x30604e(0x8f6)?Window_ButtonAssist[_0x30604e(0x616)][_0x30604e(0x254)]():0x0;},VisuMZ['CoreEngine'][_0x55f97b(0x1e0)]=Scene_MenuBase[_0x55f97b(0x616)][_0x55f97b(0x939)],Scene_MenuBase[_0x55f97b(0x616)]['mainAreaHeight']=function(){const _0x439d64=_0x55f97b;let _0x5d1b1e=0x0;return SceneManager[_0x439d64(0x72c)]()?_0x5d1b1e=this[_0x439d64(0x8e2)]():_0x5d1b1e=VisuMZ['CoreEngine']['Scene_MenuBase_mainAreaHeight']['call'](this),this[_0x439d64(0x572)]()&&this[_0x439d64(0x61c)]()!==_0x439d64(0x944)&&(_0x5d1b1e-=Window_ButtonAssist[_0x439d64(0x616)]['lineHeight']()),_0x5d1b1e;},Scene_MenuBase[_0x55f97b(0x616)][_0x55f97b(0x8e2)]=function(){const _0x2e5615=_0x55f97b;return Graphics[_0x2e5615(0x3e7)]-this[_0x2e5615(0x428)]();},VisuMZ['CoreEngine'][_0x55f97b(0x97a)]=Scene_MenuBase[_0x55f97b(0x616)]['createBackground'],Scene_MenuBase['prototype'][_0x55f97b(0x6ee)]=function(){const _0x21cc71=_0x55f97b,_0x429cbb=VisuMZ['CoreEngine'][_0x21cc71(0x386)][_0x21cc71(0x43a)][_0x21cc71(0x2b0)]??0x8;this[_0x21cc71(0x2a4)]=new PIXI['filters'][(_0x21cc71(0x824))](_0x429cbb),this[_0x21cc71(0x52f)]=new Sprite(),this['_backgroundSprite'][_0x21cc71(0x1ef)]=SceneManager[_0x21cc71(0x38f)](),this[_0x21cc71(0x52f)][_0x21cc71(0x972)]=[this[_0x21cc71(0x2a4)]],this[_0x21cc71(0x87c)](this[_0x21cc71(0x52f)]),this['setBackgroundOpacity'](0xc0),this[_0x21cc71(0x624)](this[_0x21cc71(0x97d)]()),this[_0x21cc71(0x2cd)]();},Scene_MenuBase[_0x55f97b(0x616)]['getBackgroundOpacity']=function(){const _0x3f531d=_0x55f97b,_0xc0e4b4=String(this[_0x3f531d(0x6ac)][_0x3f531d(0x1bc)]),_0x2e9914=this['getCustomBackgroundSettings'](_0xc0e4b4);return _0x2e9914?_0x2e9914[_0x3f531d(0x6ab)]:0xc0;},Scene_MenuBase[_0x55f97b(0x616)]['createCustomBackgroundImages']=function(){const _0x416dae=_0x55f97b,_0x5c7ce6=String(this['constructor'][_0x416dae(0x1bc)]),_0x56b572=this['getCustomBackgroundSettings'](_0x5c7ce6);_0x56b572&&(_0x56b572[_0x416dae(0x748)]!==''||_0x56b572[_0x416dae(0x72a)]!=='')&&(this['_backSprite1']=new Sprite(ImageManager[_0x416dae(0x609)](_0x56b572['BgFilename1'])),this[_0x416dae(0x8e7)]=new Sprite(ImageManager[_0x416dae(0x640)](_0x56b572['BgFilename2'])),this[_0x416dae(0x87c)](this[_0x416dae(0x248)]),this[_0x416dae(0x87c)](this[_0x416dae(0x8e7)]),this[_0x416dae(0x248)]['bitmap'][_0x416dae(0x548)](this[_0x416dae(0x539)][_0x416dae(0x5cb)](this,this['_backSprite1'])),this['_backSprite2'][_0x416dae(0x1ef)][_0x416dae(0x548)](this[_0x416dae(0x539)][_0x416dae(0x5cb)](this,this[_0x416dae(0x8e7)])));},Scene_MenuBase[_0x55f97b(0x616)][_0x55f97b(0x4c4)]=function(_0x1624d5){const _0x169493=_0x55f97b;return VisuMZ[_0x169493(0x4af)][_0x169493(0x386)]['MenuBg'][_0x1624d5]||VisuMZ['CoreEngine'][_0x169493(0x386)]['MenuBg'][_0x169493(0x336)];},Scene_MenuBase['prototype']['adjustSprite']=function(_0x1763be){const _0x423809=_0x55f97b;this[_0x423809(0x8c7)](_0x1763be),this[_0x423809(0x555)](_0x1763be);},VisuMZ[_0x55f97b(0x4af)]['Scene_MenuBase_createCancelButton']=Scene_MenuBase['prototype'][_0x55f97b(0x619)],Scene_MenuBase[_0x55f97b(0x616)][_0x55f97b(0x619)]=function(){const _0x52c69f=_0x55f97b;VisuMZ[_0x52c69f(0x4af)]['Scene_MenuBase_createCancelButton']['call'](this),SceneManager[_0x52c69f(0x1bf)]()&&this[_0x52c69f(0x6a1)]();},Scene_MenuBase[_0x55f97b(0x616)][_0x55f97b(0x6a1)]=function(){const _0x1c5ad4=_0x55f97b;this[_0x1c5ad4(0x1ad)]['x']=Graphics[_0x1c5ad4(0x32f)]+0x4;},VisuMZ['CoreEngine'][_0x55f97b(0x509)]=Scene_MenuBase[_0x55f97b(0x616)][_0x55f97b(0x57e)],Scene_MenuBase['prototype'][_0x55f97b(0x57e)]=function(){const _0x5da3d2=_0x55f97b;VisuMZ[_0x5da3d2(0x4af)]['Scene_MenuBase_createPageButtons'][_0x5da3d2(0x8a8)](this),SceneManager['isSideButtonLayout']()&&this['movePageButtonSideButtonLayout']();},Scene_MenuBase[_0x55f97b(0x616)][_0x55f97b(0x4c5)]=function(){const _0x36d1d7=_0x55f97b;this[_0x36d1d7(0x568)]['x']=-0x1*(this[_0x36d1d7(0x568)][_0x36d1d7(0x7cc)]+this[_0x36d1d7(0x30e)][_0x36d1d7(0x7cc)]+0x8),this['_pagedownButton']['x']=-0x1*(this[_0x36d1d7(0x30e)][_0x36d1d7(0x7cc)]+0x4);},Scene_MenuBase[_0x55f97b(0x616)]['isMenuButtonAssistEnabled']=function(){const _0x384940=_0x55f97b;return VisuMZ[_0x384940(0x4af)][_0x384940(0x386)]['ButtonAssist']['Enable'];},Scene_MenuBase['prototype'][_0x55f97b(0x61c)]=function(){const _0xc711f4=_0x55f97b;return SceneManager[_0xc711f4(0x1bf)]()||SceneManager[_0xc711f4(0x8f7)]()?VisuMZ[_0xc711f4(0x4af)][_0xc711f4(0x386)][_0xc711f4(0x6ec)][_0xc711f4(0x293)]:'button';},Scene_MenuBase['prototype'][_0x55f97b(0x1ae)]=function(){const _0x3a4e54=_0x55f97b;if(!this[_0x3a4e54(0x572)]())return;const _0x2b7246=this[_0x3a4e54(0x7e5)]();this[_0x3a4e54(0x6b4)]=new Window_ButtonAssist(_0x2b7246),this[_0x3a4e54(0x90b)](this['_buttonAssistWindow']);},Scene_MenuBase[_0x55f97b(0x616)][_0x55f97b(0x7e5)]=function(){const _0x4561f5=_0x55f97b;return this[_0x4561f5(0x61c)]()===_0x4561f5(0x944)?this[_0x4561f5(0x71e)]():this[_0x4561f5(0x510)]();},Scene_MenuBase['prototype']['buttonAssistWindowButtonRect']=function(){const _0x265df1=_0x55f97b,_0x2d8760=ConfigManager['touchUI']?(Sprite_Button[_0x265df1(0x616)][_0x265df1(0x3e6)]()+0x6)*0x2:0x0,_0x19fb7e=this['buttonY'](),_0x2df76=Graphics[_0x265df1(0x32f)]-_0x2d8760*0x2,_0x2ca835=this[_0x265df1(0x4da)]();return new Rectangle(_0x2d8760,_0x19fb7e,_0x2df76,_0x2ca835);},Scene_MenuBase[_0x55f97b(0x616)][_0x55f97b(0x510)]=function(){const _0x11b226=_0x55f97b,_0x2ea6eb=Graphics[_0x11b226(0x32f)],_0xaeab61=Window_ButtonAssist[_0x11b226(0x616)][_0x11b226(0x254)](),_0xc98cd1=0x0;let _0x46922d=0x0;return this[_0x11b226(0x61c)]()==='top'?_0x46922d=0x0:_0x46922d=Graphics['boxHeight']-_0xaeab61,new Rectangle(_0xc98cd1,_0x46922d,_0x2ea6eb,_0xaeab61);},Scene_Menu[_0x55f97b(0x474)]=VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x386)]['MenuLayout'][_0x55f97b(0x871)],VisuMZ['CoreEngine'][_0x55f97b(0x88e)]=Scene_Menu['prototype'][_0x55f97b(0x226)],Scene_Menu['prototype']['create']=function(){const _0x33045f=_0x55f97b;VisuMZ[_0x33045f(0x4af)]['Scene_Menu_create'][_0x33045f(0x8a8)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Menu[_0x55f97b(0x616)][_0x55f97b(0x1df)]=function(){const _0x147b87=_0x55f97b;this[_0x147b87(0x6d3)]&&this[_0x147b87(0x6d3)][_0x147b87(0x6c7)](Scene_Menu[_0x147b87(0x474)]['CommandBgType']),this['_goldWindow']&&this['_goldWindow'][_0x147b87(0x6c7)](Scene_Menu[_0x147b87(0x474)][_0x147b87(0x70b)]),this['_statusWindow']&&this[_0x147b87(0x338)]['setBackgroundType'](Scene_Menu[_0x147b87(0x474)][_0x147b87(0x258)]);},Scene_Menu[_0x55f97b(0x616)][_0x55f97b(0x8a1)]=function(){const _0x1d892e=_0x55f97b;return Scene_Menu['layoutSettings']['CommandRect'][_0x1d892e(0x8a8)](this);},Scene_Menu[_0x55f97b(0x616)][_0x55f97b(0x42d)]=function(){const _0x243b8a=_0x55f97b;return Scene_Menu[_0x243b8a(0x474)][_0x243b8a(0x852)][_0x243b8a(0x8a8)](this);},Scene_Menu[_0x55f97b(0x616)][_0x55f97b(0x41d)]=function(){const _0x4daa4b=_0x55f97b;return Scene_Menu[_0x4daa4b(0x474)][_0x4daa4b(0x449)][_0x4daa4b(0x8a8)](this);},Scene_Item['layoutSettings']=VisuMZ[_0x55f97b(0x4af)]['Settings'][_0x55f97b(0x265)]['ItemMenu'],VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x371)]=Scene_Item[_0x55f97b(0x616)]['create'],Scene_Item[_0x55f97b(0x616)]['create']=function(){const _0x2a037b=_0x55f97b;VisuMZ['CoreEngine'][_0x2a037b(0x371)][_0x2a037b(0x8a8)](this),this[_0x2a037b(0x1df)]();},Scene_Item['prototype'][_0x55f97b(0x1df)]=function(){const _0x324bc2=_0x55f97b;this[_0x324bc2(0x6ce)]&&this[_0x324bc2(0x6ce)][_0x324bc2(0x6c7)](Scene_Item[_0x324bc2(0x474)][_0x324bc2(0x5ef)]),this['_categoryWindow']&&this[_0x324bc2(0x500)][_0x324bc2(0x6c7)](Scene_Item[_0x324bc2(0x474)]['CategoryBgType']),this[_0x324bc2(0x468)]&&this[_0x324bc2(0x468)][_0x324bc2(0x6c7)](Scene_Item[_0x324bc2(0x474)][_0x324bc2(0x682)]),this[_0x324bc2(0x873)]&&this[_0x324bc2(0x873)][_0x324bc2(0x6c7)](Scene_Item[_0x324bc2(0x474)][_0x324bc2(0x431)]);},Scene_Item[_0x55f97b(0x616)][_0x55f97b(0x62c)]=function(){const _0x58ba2d=_0x55f97b;return Scene_Item[_0x58ba2d(0x474)][_0x58ba2d(0x48d)][_0x58ba2d(0x8a8)](this);},Scene_Item[_0x55f97b(0x616)][_0x55f97b(0x706)]=function(){const _0x325d05=_0x55f97b;return Scene_Item['layoutSettings'][_0x325d05(0x750)][_0x325d05(0x8a8)](this);},Scene_Item[_0x55f97b(0x616)]['itemWindowRect']=function(){const _0x4e8602=_0x55f97b;return Scene_Item['layoutSettings']['ItemRect'][_0x4e8602(0x8a8)](this);},Scene_Item[_0x55f97b(0x616)][_0x55f97b(0x540)]=function(){const _0x9e61f8=_0x55f97b;return Scene_Item[_0x9e61f8(0x474)]['ActorRect'][_0x9e61f8(0x8a8)](this);},Scene_Skill[_0x55f97b(0x474)]=VisuMZ['CoreEngine'][_0x55f97b(0x386)]['MenuLayout'][_0x55f97b(0x93c)],VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x79b)]=Scene_Skill[_0x55f97b(0x616)][_0x55f97b(0x226)],Scene_Skill['prototype'][_0x55f97b(0x226)]=function(){const _0x151e23=_0x55f97b;VisuMZ[_0x151e23(0x4af)][_0x151e23(0x79b)][_0x151e23(0x8a8)](this),this[_0x151e23(0x1df)]();},Scene_Skill[_0x55f97b(0x616)][_0x55f97b(0x1df)]=function(){const _0x119c7f=_0x55f97b;this[_0x119c7f(0x6ce)]&&this[_0x119c7f(0x6ce)][_0x119c7f(0x6c7)](Scene_Skill[_0x119c7f(0x474)][_0x119c7f(0x5ef)]),this[_0x119c7f(0x7ff)]&&this['_skillTypeWindow'][_0x119c7f(0x6c7)](Scene_Skill['layoutSettings'][_0x119c7f(0x90f)]),this[_0x119c7f(0x338)]&&this[_0x119c7f(0x338)][_0x119c7f(0x6c7)](Scene_Skill['layoutSettings'][_0x119c7f(0x258)]),this['_itemWindow']&&this['_itemWindow'][_0x119c7f(0x6c7)](Scene_Skill[_0x119c7f(0x474)]['ItemBgType']),this[_0x119c7f(0x873)]&&this[_0x119c7f(0x873)][_0x119c7f(0x6c7)](Scene_Skill[_0x119c7f(0x474)][_0x119c7f(0x431)]);},Scene_Skill['prototype'][_0x55f97b(0x62c)]=function(){const _0xc8aadc=_0x55f97b;return Scene_Skill['layoutSettings']['HelpRect'][_0xc8aadc(0x8a8)](this);},Scene_Skill[_0x55f97b(0x616)][_0x55f97b(0x212)]=function(){const _0xdd2843=_0x55f97b;return Scene_Skill[_0xdd2843(0x474)]['SkillTypeRect'][_0xdd2843(0x8a8)](this);},Scene_Skill['prototype'][_0x55f97b(0x41d)]=function(){const _0x50169c=_0x55f97b;return Scene_Skill['layoutSettings'][_0x50169c(0x449)]['call'](this);},Scene_Skill[_0x55f97b(0x616)][_0x55f97b(0x6f0)]=function(){const _0x4133c5=_0x55f97b;return Scene_Skill['layoutSettings'][_0x4133c5(0x402)][_0x4133c5(0x8a8)](this);},Scene_Skill[_0x55f97b(0x616)][_0x55f97b(0x540)]=function(){const _0x1f4c26=_0x55f97b;return Scene_Skill['layoutSettings'][_0x1f4c26(0x8f8)][_0x1f4c26(0x8a8)](this);},Scene_Equip[_0x55f97b(0x474)]=VisuMZ['CoreEngine'][_0x55f97b(0x386)][_0x55f97b(0x265)]['EquipMenu'],VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x806)]=Scene_Equip['prototype']['create'],Scene_Equip[_0x55f97b(0x616)]['create']=function(){const _0x1d71f9=_0x55f97b;VisuMZ[_0x1d71f9(0x4af)][_0x1d71f9(0x806)][_0x1d71f9(0x8a8)](this),this[_0x1d71f9(0x1df)]();},Scene_Equip['prototype'][_0x55f97b(0x1df)]=function(){const _0x161638=_0x55f97b;this[_0x161638(0x6ce)]&&this[_0x161638(0x6ce)][_0x161638(0x6c7)](Scene_Equip['layoutSettings'][_0x161638(0x5ef)]),this[_0x161638(0x338)]&&this[_0x161638(0x338)][_0x161638(0x6c7)](Scene_Equip[_0x161638(0x474)][_0x161638(0x258)]),this['_commandWindow']&&this[_0x161638(0x6d3)][_0x161638(0x6c7)](Scene_Equip[_0x161638(0x474)]['CommandBgType']),this[_0x161638(0x237)]&&this[_0x161638(0x237)]['setBackgroundType'](Scene_Equip['layoutSettings'][_0x161638(0x7b8)]),this[_0x161638(0x468)]&&this[_0x161638(0x468)][_0x161638(0x6c7)](Scene_Equip['layoutSettings'][_0x161638(0x682)]);},Scene_Equip[_0x55f97b(0x616)][_0x55f97b(0x62c)]=function(){const _0x1d9037=_0x55f97b;return Scene_Equip[_0x1d9037(0x474)][_0x1d9037(0x48d)][_0x1d9037(0x8a8)](this);},Scene_Equip[_0x55f97b(0x616)][_0x55f97b(0x41d)]=function(){const _0xfec327=_0x55f97b;return Scene_Equip[_0xfec327(0x474)][_0xfec327(0x449)][_0xfec327(0x8a8)](this);},Scene_Equip[_0x55f97b(0x616)]['commandWindowRect']=function(){const _0x16f47c=_0x55f97b;return Scene_Equip[_0x16f47c(0x474)][_0x16f47c(0x8b5)][_0x16f47c(0x8a8)](this);},Scene_Equip[_0x55f97b(0x616)][_0x55f97b(0x298)]=function(){const _0x21f18d=_0x55f97b;return Scene_Equip['layoutSettings'][_0x21f18d(0x621)][_0x21f18d(0x8a8)](this);},Scene_Equip[_0x55f97b(0x616)][_0x55f97b(0x6f0)]=function(){const _0x5aa30c=_0x55f97b;return Scene_Equip[_0x5aa30c(0x474)][_0x5aa30c(0x402)]['call'](this);},Scene_Status['layoutSettings']=VisuMZ['CoreEngine'][_0x55f97b(0x386)][_0x55f97b(0x265)][_0x55f97b(0x6b1)],VisuMZ[_0x55f97b(0x4af)]['Scene_Status_create']=Scene_Status['prototype'][_0x55f97b(0x226)],Scene_Status['prototype'][_0x55f97b(0x226)]=function(){const _0x576a38=_0x55f97b;VisuMZ[_0x576a38(0x4af)]['Scene_Status_create'][_0x576a38(0x8a8)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Status[_0x55f97b(0x616)][_0x55f97b(0x1df)]=function(){const _0x5db51a=_0x55f97b;this[_0x5db51a(0x56a)]&&this['_profileWindow'][_0x5db51a(0x6c7)](Scene_Status[_0x5db51a(0x474)]['ProfileBgType']),this[_0x5db51a(0x338)]&&this[_0x5db51a(0x338)][_0x5db51a(0x6c7)](Scene_Status['layoutSettings'][_0x5db51a(0x258)]),this[_0x5db51a(0x366)]&&this['_statusParamsWindow'][_0x5db51a(0x6c7)](Scene_Status[_0x5db51a(0x474)][_0x5db51a(0x408)]),this[_0x5db51a(0x94b)]&&this['_statusEquipWindow'][_0x5db51a(0x6c7)](Scene_Status[_0x5db51a(0x474)]['StatusEquipBgType']);},Scene_Status[_0x55f97b(0x616)][_0x55f97b(0x409)]=function(){const _0x3b36bc=_0x55f97b;return Scene_Status['layoutSettings']['ProfileRect'][_0x3b36bc(0x8a8)](this);},Scene_Status[_0x55f97b(0x616)][_0x55f97b(0x41d)]=function(){const _0x5c121f=_0x55f97b;return Scene_Status[_0x5c121f(0x474)][_0x5c121f(0x449)][_0x5c121f(0x8a8)](this);},Scene_Status['prototype']['statusParamsWindowRect']=function(){const _0x1cf77b=_0x55f97b;return Scene_Status[_0x1cf77b(0x474)]['StatusParamsRect'][_0x1cf77b(0x8a8)](this);},Scene_Status[_0x55f97b(0x616)][_0x55f97b(0x25e)]=function(){const _0xfe2908=_0x55f97b;return Scene_Status[_0xfe2908(0x474)][_0xfe2908(0x5c3)][_0xfe2908(0x8a8)](this);},Scene_Options['layoutSettings']=VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x386)][_0x55f97b(0x265)][_0x55f97b(0x6e0)],VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x475)]=Scene_Options['prototype']['create'],Scene_Options[_0x55f97b(0x616)][_0x55f97b(0x226)]=function(){const _0x56bc67=_0x55f97b;VisuMZ[_0x56bc67(0x4af)]['Scene_Options_create'][_0x56bc67(0x8a8)](this),this[_0x56bc67(0x1df)]();},Scene_Options[_0x55f97b(0x616)][_0x55f97b(0x1df)]=function(){const _0x4c0c91=_0x55f97b;this[_0x4c0c91(0x393)]&&this[_0x4c0c91(0x393)][_0x4c0c91(0x6c7)](Scene_Options[_0x4c0c91(0x474)]['OptionsBgType']);},Scene_Options['prototype']['optionsWindowRect']=function(){const _0xcbbe65=_0x55f97b;return Scene_Options[_0xcbbe65(0x474)][_0xcbbe65(0x495)][_0xcbbe65(0x8a8)](this);},Scene_Save['layoutSettings']=VisuMZ[_0x55f97b(0x4af)]['Settings'][_0x55f97b(0x265)][_0x55f97b(0x551)],Scene_Save[_0x55f97b(0x616)][_0x55f97b(0x226)]=function(){const _0x44ea4f=_0x55f97b;Scene_File[_0x44ea4f(0x616)]['create'][_0x44ea4f(0x8a8)](this),this[_0x44ea4f(0x1df)]();},Scene_Save[_0x55f97b(0x616)]['setCoreEngineUpdateWindowBg']=function(){const _0x220422=_0x55f97b;this[_0x220422(0x6ce)]&&this[_0x220422(0x6ce)][_0x220422(0x6c7)](Scene_Save[_0x220422(0x474)]['HelpBgType']),this[_0x220422(0x2e3)]&&this[_0x220422(0x2e3)][_0x220422(0x6c7)](Scene_Save[_0x220422(0x474)][_0x220422(0x362)]);},Scene_Save[_0x55f97b(0x616)][_0x55f97b(0x62c)]=function(){const _0x491b6c=_0x55f97b;return Scene_Save[_0x491b6c(0x474)][_0x491b6c(0x48d)][_0x491b6c(0x8a8)](this);},Scene_Save[_0x55f97b(0x616)][_0x55f97b(0x664)]=function(){const _0x39a9e7=_0x55f97b;return Scene_Save[_0x39a9e7(0x474)][_0x39a9e7(0x7d1)][_0x39a9e7(0x8a8)](this);},Scene_Load[_0x55f97b(0x474)]=VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x386)][_0x55f97b(0x265)]['LoadMenu'],Scene_Load[_0x55f97b(0x616)][_0x55f97b(0x226)]=function(){const _0x1a225d=_0x55f97b;Scene_File[_0x1a225d(0x616)]['create'][_0x1a225d(0x8a8)](this),this[_0x1a225d(0x1df)]();},Scene_Load['prototype'][_0x55f97b(0x1df)]=function(){const _0x556be6=_0x55f97b;this[_0x556be6(0x6ce)]&&this[_0x556be6(0x6ce)][_0x556be6(0x6c7)](Scene_Load[_0x556be6(0x474)][_0x556be6(0x5ef)]),this['_listWindow']&&this[_0x556be6(0x2e3)][_0x556be6(0x6c7)](Scene_Load[_0x556be6(0x474)][_0x556be6(0x362)]);},Scene_Load[_0x55f97b(0x616)][_0x55f97b(0x62c)]=function(){const _0x1b8d7b=_0x55f97b;return Scene_Load['layoutSettings'][_0x1b8d7b(0x48d)][_0x1b8d7b(0x8a8)](this);},Scene_Load[_0x55f97b(0x616)][_0x55f97b(0x664)]=function(){const _0x4444d1=_0x55f97b;return Scene_Load[_0x4444d1(0x474)][_0x4444d1(0x7d1)][_0x4444d1(0x8a8)](this);};function Scene_QuickLoad(){this['initialize'](...arguments);}Scene_QuickLoad[_0x55f97b(0x616)]=Object[_0x55f97b(0x226)](Scene_Load['prototype']),Scene_QuickLoad[_0x55f97b(0x616)][_0x55f97b(0x6ac)]=Scene_QuickLoad,Scene_QuickLoad['prototype'][_0x55f97b(0x374)]=function(){const _0x4b9888=_0x55f97b;Scene_Load[_0x4b9888(0x616)][_0x4b9888(0x374)][_0x4b9888(0x8a8)](this);},Scene_QuickLoad[_0x55f97b(0x616)][_0x55f97b(0x226)]=function(){const _0x58823d=_0x55f97b;this[_0x58823d(0x645)](this[_0x58823d(0x1de)]);},Scene_QuickLoad[_0x55f97b(0x616)][_0x55f97b(0x2f0)]=function(_0x5499e3){const _0x234916=_0x55f97b;this[_0x234916(0x1de)]=_0x5499e3;},Scene_QuickLoad[_0x55f97b(0x616)][_0x55f97b(0x35f)]=function(){const _0x155f36=_0x55f97b;Scene_MenuBase[_0x155f36(0x616)]['start']['call'](this);},Scene_GameEnd['layoutSettings']=VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x386)][_0x55f97b(0x265)]['GameEnd'],VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x8db)]=Scene_GameEnd[_0x55f97b(0x616)]['createBackground'],Scene_GameEnd['prototype'][_0x55f97b(0x6ee)]=function(){const _0x132b65=_0x55f97b;Scene_MenuBase[_0x132b65(0x616)][_0x132b65(0x6ee)][_0x132b65(0x8a8)](this);},Scene_GameEnd[_0x55f97b(0x616)][_0x55f97b(0x1dd)]=function(){const _0x39d833=_0x55f97b,_0x4b7549=this['commandWindowRect']();this['_commandWindow']=new Window_GameEnd(_0x4b7549),this[_0x39d833(0x6d3)][_0x39d833(0x1bb)](_0x39d833(0x8ce),this[_0x39d833(0x861)][_0x39d833(0x5cb)](this)),this[_0x39d833(0x90b)](this[_0x39d833(0x6d3)]),this[_0x39d833(0x6d3)][_0x39d833(0x6c7)](Scene_GameEnd[_0x39d833(0x474)][_0x39d833(0x27c)]);},Scene_GameEnd[_0x55f97b(0x616)][_0x55f97b(0x8a1)]=function(){const _0x2e91b0=_0x55f97b;return Scene_GameEnd[_0x2e91b0(0x474)][_0x2e91b0(0x8b5)]['call'](this);},Scene_Shop[_0x55f97b(0x474)]=VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x386)]['MenuLayout'][_0x55f97b(0x303)],VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x5fd)]=Scene_Shop['prototype']['create'],Scene_Shop[_0x55f97b(0x616)][_0x55f97b(0x226)]=function(){const _0x510692=_0x55f97b;VisuMZ[_0x510692(0x4af)][_0x510692(0x5fd)]['call'](this),this[_0x510692(0x1df)]();},Scene_Shop['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x20707d=_0x55f97b;this['_helpWindow']&&this[_0x20707d(0x6ce)][_0x20707d(0x6c7)](Scene_Shop[_0x20707d(0x474)]['HelpBgType']),this[_0x20707d(0x2e4)]&&this[_0x20707d(0x2e4)][_0x20707d(0x6c7)](Scene_Shop[_0x20707d(0x474)][_0x20707d(0x70b)]),this[_0x20707d(0x6d3)]&&this[_0x20707d(0x6d3)][_0x20707d(0x6c7)](Scene_Shop[_0x20707d(0x474)][_0x20707d(0x27c)]),this[_0x20707d(0x6eb)]&&this[_0x20707d(0x6eb)][_0x20707d(0x6c7)](Scene_Shop[_0x20707d(0x474)][_0x20707d(0x54c)]),this[_0x20707d(0x98b)]&&this[_0x20707d(0x98b)]['setBackgroundType'](Scene_Shop[_0x20707d(0x474)][_0x20707d(0x7a8)]),this[_0x20707d(0x338)]&&this[_0x20707d(0x338)][_0x20707d(0x6c7)](Scene_Shop[_0x20707d(0x474)][_0x20707d(0x258)]),this[_0x20707d(0x651)]&&this['_buyWindow'][_0x20707d(0x6c7)](Scene_Shop[_0x20707d(0x474)][_0x20707d(0x7dc)]),this[_0x20707d(0x500)]&&this['_categoryWindow']['setBackgroundType'](Scene_Shop[_0x20707d(0x474)][_0x20707d(0x333)]),this[_0x20707d(0x432)]&&this[_0x20707d(0x432)][_0x20707d(0x6c7)](Scene_Shop[_0x20707d(0x474)]['SellBgType']);},Scene_Shop[_0x55f97b(0x616)]['helpWindowRect']=function(){const _0x1b9327=_0x55f97b;return Scene_Shop[_0x1b9327(0x474)][_0x1b9327(0x48d)]['call'](this);},Scene_Shop[_0x55f97b(0x616)][_0x55f97b(0x42d)]=function(){const _0x58ad59=_0x55f97b;return Scene_Shop[_0x58ad59(0x474)][_0x58ad59(0x852)][_0x58ad59(0x8a8)](this);},Scene_Shop[_0x55f97b(0x616)][_0x55f97b(0x8a1)]=function(){const _0x59915f=_0x55f97b;return Scene_Shop[_0x59915f(0x474)][_0x59915f(0x8b5)]['call'](this);},Scene_Shop[_0x55f97b(0x616)][_0x55f97b(0x8da)]=function(){const _0x2a295e=_0x55f97b;return Scene_Shop[_0x2a295e(0x474)][_0x2a295e(0x657)][_0x2a295e(0x8a8)](this);},Scene_Shop['prototype']['numberWindowRect']=function(){const _0x5df2b2=_0x55f97b;return Scene_Shop['layoutSettings'][_0x5df2b2(0x342)][_0x5df2b2(0x8a8)](this);},Scene_Shop[_0x55f97b(0x616)][_0x55f97b(0x41d)]=function(){const _0x12cee7=_0x55f97b;return Scene_Shop[_0x12cee7(0x474)][_0x12cee7(0x449)][_0x12cee7(0x8a8)](this);},Scene_Shop['prototype'][_0x55f97b(0x2fd)]=function(){const _0x58cb93=_0x55f97b;return Scene_Shop['layoutSettings'][_0x58cb93(0x5ed)][_0x58cb93(0x8a8)](this);},Scene_Shop[_0x55f97b(0x616)]['categoryWindowRect']=function(){const _0x132c9f=_0x55f97b;return Scene_Shop[_0x132c9f(0x474)][_0x132c9f(0x750)][_0x132c9f(0x8a8)](this);},Scene_Shop[_0x55f97b(0x616)][_0x55f97b(0x5c2)]=function(){const _0x396543=_0x55f97b;return Scene_Shop[_0x396543(0x474)][_0x396543(0x92a)]['call'](this);},Scene_Name[_0x55f97b(0x474)]=VisuMZ['CoreEngine']['Settings'][_0x55f97b(0x265)][_0x55f97b(0x3eb)],VisuMZ[_0x55f97b(0x4af)]['Scene_Name_create']=Scene_Name[_0x55f97b(0x616)][_0x55f97b(0x226)],Scene_Name[_0x55f97b(0x616)][_0x55f97b(0x226)]=function(){const _0x10ee43=_0x55f97b;VisuMZ[_0x10ee43(0x4af)][_0x10ee43(0x384)][_0x10ee43(0x8a8)](this),this[_0x10ee43(0x1df)]();},Scene_Name[_0x55f97b(0x616)]['setCoreEngineUpdateWindowBg']=function(){const _0x405aa3=_0x55f97b;this['_editWindow']&&this[_0x405aa3(0x55e)][_0x405aa3(0x6c7)](Scene_Name[_0x405aa3(0x474)][_0x405aa3(0x8d9)]),this['_inputWindow']&&this[_0x405aa3(0x63b)][_0x405aa3(0x6c7)](Scene_Name[_0x405aa3(0x474)]['InputBgType']);},Scene_Name['prototype'][_0x55f97b(0x428)]=function(){return 0x0;},Scene_Name['prototype'][_0x55f97b(0x646)]=function(){const _0x44dbea=_0x55f97b;return Scene_Name[_0x44dbea(0x474)]['EditRect'][_0x44dbea(0x8a8)](this);},Scene_Name[_0x55f97b(0x616)][_0x55f97b(0x1b1)]=function(){const _0x374eb6=_0x55f97b;return Scene_Name['layoutSettings'][_0x374eb6(0x26d)]['call'](this);},Scene_Name[_0x55f97b(0x616)]['EnableNameInput']=function(){const _0x3a8ade=_0x55f97b;if(!this['_inputWindow'])return![];return VisuMZ[_0x3a8ade(0x4af)]['Settings'][_0x3a8ade(0x4d6)][_0x3a8ade(0x933)];},Scene_Name['prototype'][_0x55f97b(0x3ea)]=function(){const _0x2179c0=_0x55f97b;if(this[_0x2179c0(0x933)]()&&this[_0x2179c0(0x63b)][_0x2179c0(0x3a9)]!=='keyboard')return TextManager[_0x2179c0(0x45a)](_0x2179c0(0x73d),_0x2179c0(0x5be));return Scene_MenuBase['prototype']['buttonAssistKey1'][_0x2179c0(0x8a8)](this);},Scene_Name[_0x55f97b(0x616)]['buttonAssistKey3']=function(){const _0x45ba50=_0x55f97b;return this[_0x45ba50(0x933)]()?TextManager[_0x45ba50(0x39b)](_0x45ba50(0x7c6)):Scene_MenuBase['prototype'][_0x45ba50(0x829)][_0x45ba50(0x8a8)](this);},Scene_Name['prototype'][_0x55f97b(0x365)]=function(){const _0x233c9a=_0x55f97b;if(this[_0x233c9a(0x933)]()&&this[_0x233c9a(0x63b)][_0x233c9a(0x3a9)]===_0x233c9a(0x51f))return TextManager[_0x233c9a(0x8f3)]([_0x233c9a(0x264)]);return Scene_MenuBase['prototype'][_0x233c9a(0x365)][_0x233c9a(0x8a8)](this);},Scene_Name[_0x55f97b(0x616)][_0x55f97b(0x864)]=function(){const _0x56b096=_0x55f97b;if(this[_0x56b096(0x933)]()&&this['_inputWindow'][_0x56b096(0x3a9)]==='keyboard')return TextManager[_0x56b096(0x8f3)]([_0x56b096(0x792)]);return Scene_MenuBase[_0x56b096(0x616)][_0x56b096(0x864)][_0x56b096(0x8a8)](this);},Scene_Name[_0x55f97b(0x616)][_0x55f97b(0x8fd)]=function(){const _0x418f5d=_0x55f97b;if(this[_0x418f5d(0x933)]()&&this[_0x418f5d(0x63b)][_0x418f5d(0x3a9)]!==_0x418f5d(0x51f)){const _0x2c88a4=VisuMZ[_0x418f5d(0x4af)]['Settings'][_0x418f5d(0x4d6)];return _0x2c88a4[_0x418f5d(0x4db)]||_0x418f5d(0x1c8);}return Scene_MenuBase['prototype'][_0x418f5d(0x8fd)][_0x418f5d(0x8a8)](this);},Scene_Name[_0x55f97b(0x616)][_0x55f97b(0x63c)]=function(){const _0xadad0b=_0x55f97b;if(this[_0xadad0b(0x933)]()){const _0x315c74=VisuMZ['CoreEngine'][_0xadad0b(0x386)][_0xadad0b(0x4d6)];return this[_0xadad0b(0x63b)][_0xadad0b(0x3a9)]===_0xadad0b(0x51f)?_0x315c74[_0xadad0b(0x1e7)]||_0xadad0b(0x1e7):_0x315c74[_0xadad0b(0x4cc)]||_0xadad0b(0x4cc);}else return Scene_MenuBase[_0xadad0b(0x616)][_0xadad0b(0x63c)][_0xadad0b(0x8a8)](this);},Scene_Name[_0x55f97b(0x616)][_0x55f97b(0x19b)]=function(){const _0x3f15cf=_0x55f97b;if(this['EnableNameInput']()){const _0x56c76a=VisuMZ[_0x3f15cf(0x4af)][_0x3f15cf(0x386)][_0x3f15cf(0x4d6)];if(this[_0x3f15cf(0x63b)]['_mode']===_0x3f15cf(0x51f))return _0x56c76a[_0x3f15cf(0x759)]||'Finish';}return Scene_MenuBase[_0x3f15cf(0x616)][_0x3f15cf(0x19b)][_0x3f15cf(0x8a8)](this);},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x286)]=Scene_Name[_0x55f97b(0x616)]['onInputOk'],Scene_Name[_0x55f97b(0x616)][_0x55f97b(0x742)]=function(){const _0x394688=_0x55f97b;this[_0x394688(0x56e)]()?this[_0x394688(0x6c0)]():VisuMZ['CoreEngine']['Scene_Name_onInputOk'][_0x394688(0x8a8)](this);},Scene_Name[_0x55f97b(0x616)][_0x55f97b(0x56e)]=function(){const _0x5ee788=_0x55f97b,_0x11f151=VisuMZ[_0x5ee788(0x4af)][_0x5ee788(0x386)]['KeyboardInput'];if(!_0x11f151)return![];const _0x64a70=_0x11f151['BannedWords'];if(!_0x64a70)return![];const _0x1feb72=this[_0x5ee788(0x55e)][_0x5ee788(0x1bc)]()[_0x5ee788(0x5ac)]();for(const _0x4447cb of _0x64a70){if(_0x1feb72['includes'](_0x4447cb[_0x5ee788(0x5ac)]()))return!![];}return![];},Scene_Name[_0x55f97b(0x616)]['onInputBannedWords']=function(){const _0xb689e4=_0x55f97b;SoundManager[_0xb689e4(0x979)]();},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x49e)]=Scene_Battle[_0x55f97b(0x616)][_0x55f97b(0x94f)],Scene_Battle[_0x55f97b(0x616)]['update']=function(){const _0x83bb4d=_0x55f97b;VisuMZ['CoreEngine'][_0x83bb4d(0x49e)][_0x83bb4d(0x8a8)](this);if($gameTemp[_0x83bb4d(0x4b6)])this[_0x83bb4d(0x831)]();},Scene_Battle[_0x55f97b(0x616)][_0x55f97b(0x831)]=function(){const _0x9e215a=_0x55f97b;!BattleManager[_0x9e215a(0x8b6)]()&&!this[_0x9e215a(0x5e3)]&&!$gameMessage[_0x9e215a(0x925)]()&&(this[_0x9e215a(0x5e3)]=!![],this[_0x9e215a(0x94f)](),SceneManager[_0x9e215a(0x2b2)](),this['_playtestF7Looping']=![]);},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x1d5)]=Scene_Battle[_0x55f97b(0x616)][_0x55f97b(0x619)],Scene_Battle[_0x55f97b(0x616)][_0x55f97b(0x619)]=function(){const _0x53664f=_0x55f97b;VisuMZ[_0x53664f(0x4af)][_0x53664f(0x1d5)][_0x53664f(0x8a8)](this),SceneManager[_0x53664f(0x1bf)]()&&this[_0x53664f(0x1c2)]();},Scene_Battle[_0x55f97b(0x616)][_0x55f97b(0x1c2)]=function(){const _0x31dd4e=_0x55f97b;this[_0x31dd4e(0x1ad)]['x']=Graphics['boxWidth']+0x4,this[_0x31dd4e(0x1ac)]()?this[_0x31dd4e(0x1ad)]['y']=Graphics[_0x31dd4e(0x3e7)]-this[_0x31dd4e(0x4da)]():this[_0x31dd4e(0x1ad)]['y']=0x0;},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x7a2)]=Sprite_Button['prototype'][_0x55f97b(0x374)],Sprite_Button['prototype'][_0x55f97b(0x374)]=function(_0x57226f){const _0x1903ff=_0x55f97b;VisuMZ[_0x1903ff(0x4af)][_0x1903ff(0x7a2)][_0x1903ff(0x8a8)](this,_0x57226f),this['initButtonHidden']();},Sprite_Button['prototype'][_0x55f97b(0x424)]=function(){const _0x268340=_0x55f97b,_0x4d4afa=VisuMZ['CoreEngine'][_0x268340(0x386)]['UI'];this['_isButtonHidden']=![];switch(this[_0x268340(0x1b3)]){case _0x268340(0x8ce):this[_0x268340(0x2da)]=!_0x4d4afa[_0x268340(0x86c)];break;case _0x268340(0x73d):case _0x268340(0x5be):this[_0x268340(0x2da)]=!_0x4d4afa[_0x268340(0x3fa)];break;case'down':case'up':case _0x268340(0x332):case _0x268340(0x263):case'ok':this[_0x268340(0x2da)]=!_0x4d4afa['numberShowButton'];break;case'menu':this['_isButtonHidden']=!_0x4d4afa[_0x268340(0x287)];break;}},VisuMZ['CoreEngine']['Sprite_Button_updateOpacity']=Sprite_Button[_0x55f97b(0x616)][_0x55f97b(0x870)],Sprite_Button[_0x55f97b(0x616)][_0x55f97b(0x870)]=function(){const _0x2ccf22=_0x55f97b;SceneManager['areButtonsHidden']()||this[_0x2ccf22(0x2da)]?this[_0x2ccf22(0x952)]():VisuMZ['CoreEngine'][_0x2ccf22(0x3e9)][_0x2ccf22(0x8a8)](this);},Sprite_Button[_0x55f97b(0x616)][_0x55f97b(0x952)]=function(){const _0x4323a7=_0x55f97b;this['visible']=![],this[_0x4323a7(0x8f5)]=0x0,this['x']=Graphics[_0x4323a7(0x7cc)]*0xa,this['y']=Graphics[_0x4323a7(0x4f7)]*0xa;},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x817)]=Sprite_Battler[_0x55f97b(0x616)][_0x55f97b(0x821)],Sprite_Battler['prototype'][_0x55f97b(0x821)]=function(_0x1b596d,_0x160e49,_0x386003){const _0x38741b=_0x55f97b;(this[_0x38741b(0x2ef)]!==_0x1b596d||this[_0x38741b(0x7e7)]!==_0x160e49)&&(this['setMoveEasingType']('Linear'),this['_movementWholeDuration']=_0x386003),VisuMZ['CoreEngine'][_0x38741b(0x817)]['call'](this,_0x1b596d,_0x160e49,_0x386003);},Sprite_Battler['prototype']['setMoveEasingType']=function(_0x370960){const _0x1f0632=_0x55f97b;this[_0x1f0632(0x489)]=_0x370960;},Sprite_Battler[_0x55f97b(0x616)][_0x55f97b(0x2d2)]=function(){const _0x1d495f=_0x55f97b;if(this[_0x1d495f(0x78c)]<=0x0)return;const _0xeae33b=this[_0x1d495f(0x78c)],_0x130ed0=this[_0x1d495f(0x3c6)],_0x16fe0a=this[_0x1d495f(0x489)];this[_0x1d495f(0x67f)]=this[_0x1d495f(0x5da)](this[_0x1d495f(0x67f)],this[_0x1d495f(0x2ef)],_0xeae33b,_0x130ed0,_0x16fe0a),this[_0x1d495f(0x575)]=this[_0x1d495f(0x5da)](this[_0x1d495f(0x575)],this['_targetOffsetY'],_0xeae33b,_0x130ed0,_0x16fe0a),this[_0x1d495f(0x78c)]--;if(this[_0x1d495f(0x78c)]<=0x0)this['onMoveEnd']();},Sprite_Battler['prototype'][_0x55f97b(0x5da)]=function(_0x2cb980,_0x41cd08,_0x283aa2,_0x42f2aa,_0x298f71){const _0x2ce36e=_0x55f97b,_0x2d2e4a=VisuMZ['ApplyEasing']((_0x42f2aa-_0x283aa2)/_0x42f2aa,_0x298f71||_0x2ce36e(0x8e3)),_0x178dbf=VisuMZ[_0x2ce36e(0x22a)]((_0x42f2aa-_0x283aa2+0x1)/_0x42f2aa,_0x298f71||'Linear'),_0x5c3653=(_0x2cb980-_0x41cd08*_0x2d2e4a)/(0x1-_0x2d2e4a);return _0x5c3653+(_0x41cd08-_0x5c3653)*_0x178dbf;},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x887)]=Sprite_Actor['prototype'][_0x55f97b(0x50f)],Sprite_Actor[_0x55f97b(0x616)][_0x55f97b(0x50f)]=function(_0x150118){const _0x17cea9=_0x55f97b;VisuMZ[_0x17cea9(0x4af)][_0x17cea9(0x386)]['UI'][_0x17cea9(0x7f2)]?this[_0x17cea9(0x357)](_0x150118):VisuMZ[_0x17cea9(0x4af)][_0x17cea9(0x887)]['call'](this,_0x150118);},Sprite_Actor[_0x55f97b(0x616)][_0x55f97b(0x357)]=function(_0x477bc7){const _0x24f445=_0x55f97b;let _0x551841=Math[_0x24f445(0x7dd)](Graphics['width']/0x2+0xc0);_0x551841-=Math[_0x24f445(0x8d7)]((Graphics['width']-Graphics[_0x24f445(0x32f)])/0x2),_0x551841+=_0x477bc7*0x20;let _0x57666a=Graphics[_0x24f445(0x4f7)]-0xc8-$gameParty[_0x24f445(0x812)]()*0x30;_0x57666a-=Math[_0x24f445(0x8d7)]((Graphics[_0x24f445(0x4f7)]-Graphics['boxHeight'])/0x2),_0x57666a+=_0x477bc7*0x30,this[_0x24f445(0x8d1)](_0x551841,_0x57666a);},Sprite_Actor['prototype']['retreat']=function(){const _0x22dfa5=_0x55f97b;this[_0x22dfa5(0x821)](0x4b0,0x0,0x78);},Sprite_Animation['prototype'][_0x55f97b(0x7ba)]=function(_0x4f3f3c){const _0x578476=_0x55f97b;this[_0x578476(0x4d9)]=_0x4f3f3c;},VisuMZ['CoreEngine'][_0x55f97b(0x7fe)]=Sprite_Animation['prototype']['processSoundTimings'],Sprite_Animation['prototype'][_0x55f97b(0x6cf)]=function(){const _0x1cc0ea=_0x55f97b;if(this[_0x1cc0ea(0x4d9)])return;VisuMZ[_0x1cc0ea(0x4af)][_0x1cc0ea(0x7fe)]['call'](this);},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x8d6)]=Sprite_Animation[_0x55f97b(0x616)]['setViewport'],Sprite_Animation[_0x55f97b(0x616)][_0x55f97b(0x484)]=function(_0x54cdf4){const _0x2f1318=_0x55f97b;this[_0x2f1318(0x260)]()?this[_0x2f1318(0x678)](_0x54cdf4):VisuMZ[_0x2f1318(0x4af)][_0x2f1318(0x8d6)]['call'](this,_0x54cdf4);},Sprite_Animation['prototype'][_0x55f97b(0x260)]=function(){const _0x57870b=_0x55f97b;if(!this[_0x57870b(0x373)])return![];const _0x44a46e=this[_0x57870b(0x373)][_0x57870b(0x1bc)]||'';if(_0x44a46e['match'](/<MIRROR OFFSET X>/i))return!![];if(_0x44a46e[_0x57870b(0x4f2)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x57870b(0x4af)][_0x57870b(0x386)]['QoL']['AnimationMirrorOffset'];},Sprite_Animation[_0x55f97b(0x616)][_0x55f97b(0x678)]=function(_0x38e5a2){const _0x19d3f8=_0x55f97b,_0x20501e=this[_0x19d3f8(0x5e7)],_0x2ed0d2=this[_0x19d3f8(0x5e7)],_0x24fa0d=this['_animation'][_0x19d3f8(0x4ef)]*(this['_mirror']?-0x1:0x1)-_0x20501e/0x2,_0x22eff9=this[_0x19d3f8(0x373)]['offsetY']-_0x2ed0d2/0x2,_0x5e72bf=this['targetPosition'](_0x38e5a2);_0x38e5a2['gl'][_0x19d3f8(0x1ec)](_0x24fa0d+_0x5e72bf['x'],_0x22eff9+_0x5e72bf['y'],_0x20501e,_0x2ed0d2);},Sprite_Animation['prototype']['targetSpritePosition']=function(_0x16890f){const _0x3baa64=_0x55f97b;if(_0x16890f[_0x3baa64(0x6f7)]){}const _0xdf04db=this[_0x3baa64(0x373)][_0x3baa64(0x1bc)];let _0x4a703a=_0x16890f[_0x3baa64(0x4f7)]*_0x16890f['scale']['y'],_0x33eaba=0x0,_0x3274d7=-_0x4a703a/0x2;if(_0xdf04db[_0x3baa64(0x4f2)](/<(?:HEAD|HEADER|TOP)>/i))_0x3274d7=-_0x4a703a;if(_0xdf04db[_0x3baa64(0x4f2)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x3274d7=0x0;if(this[_0x3baa64(0x373)][_0x3baa64(0x6ad)])_0x3274d7=0x0;if(_0xdf04db[_0x3baa64(0x4f2)](/<(?:LEFT)>/i))_0x33eaba=-_0x16890f[_0x3baa64(0x7cc)]/0x2;if(_0xdf04db[_0x3baa64(0x4f2)](/<(?:RIGHT)>/i))_0x33eaba=_0x16890f[_0x3baa64(0x7cc)]/0x2;_0xdf04db[_0x3baa64(0x4f2)](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0x33eaba=Number(RegExp['$1'])*_0x16890f[_0x3baa64(0x7cc)]);_0xdf04db['match'](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x3274d7=(0x1-Number(RegExp['$1']))*-_0x4a703a);_0xdf04db[_0x3baa64(0x4f2)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x33eaba=Number(RegExp['$1'])*_0x16890f[_0x3baa64(0x7cc)],_0x3274d7=(0x1-Number(RegExp['$2']))*-_0x4a703a);if(_0xdf04db['match'](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x33eaba+=Number(RegExp['$1']);if(_0xdf04db[_0x3baa64(0x4f2)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x3274d7+=Number(RegExp['$1']);_0xdf04db[_0x3baa64(0x4f2)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x33eaba+=Number(RegExp['$1']),_0x3274d7+=Number(RegExp['$2']));const _0x9c1163=new Point(_0x33eaba,_0x3274d7);return _0x16890f['updateTransform'](),_0x16890f[_0x3baa64(0x471)]['apply'](_0x9c1163);},Sprite_AnimationMV[_0x55f97b(0x616)][_0x55f97b(0x2a3)]=function(){const _0x3064b4=_0x55f97b;this[_0x3064b4(0x7e8)]=VisuMZ['CoreEngine'][_0x3064b4(0x386)][_0x3064b4(0x585)]['MvAnimationRate']??0x4,this[_0x3064b4(0x924)](),this[_0x3064b4(0x7e8)]=this[_0x3064b4(0x7e8)][_0x3064b4(0x60e)](0x1,0xa);},Sprite_AnimationMV[_0x55f97b(0x616)][_0x55f97b(0x924)]=function(){const _0x2d2eea=_0x55f97b;if(!this[_0x2d2eea(0x373)]);const _0x7dcda3=this[_0x2d2eea(0x373)][_0x2d2eea(0x1bc)]||'';_0x7dcda3['match'](/<RATE:[ ](\d+)>/i)&&(this[_0x2d2eea(0x7e8)]=(Number(RegExp['$1'])||0x1)[_0x2d2eea(0x60e)](0x1,0xa));},Sprite_AnimationMV['prototype'][_0x55f97b(0x7ba)]=function(_0xaa5279){const _0x11ebba=_0x55f97b;this[_0x11ebba(0x4d9)]=_0xaa5279;},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x85e)]=Sprite_AnimationMV[_0x55f97b(0x616)][_0x55f97b(0x2ad)],Sprite_AnimationMV[_0x55f97b(0x616)][_0x55f97b(0x2ad)]=function(_0x56d21d){const _0x5efae0=_0x55f97b;this[_0x5efae0(0x4d9)]&&(_0x56d21d=JsonEx[_0x5efae0(0x2d8)](_0x56d21d),_0x56d21d['se']&&(_0x56d21d['se'][_0x5efae0(0x909)]=0x0)),VisuMZ[_0x5efae0(0x4af)][_0x5efae0(0x85e)][_0x5efae0(0x8a8)](this,_0x56d21d);},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x80b)]=Sprite_AnimationMV[_0x55f97b(0x616)]['updatePosition'],Sprite_AnimationMV[_0x55f97b(0x616)][_0x55f97b(0x2fb)]=function(){const _0x2bbf8e=_0x55f97b;VisuMZ['CoreEngine']['Sprite_AnimationMV_updatePosition']['call'](this);if(this[_0x2bbf8e(0x373)][_0x2bbf8e(0x197)]===0x3){if(this['x']===0x0)this['x']=Math[_0x2bbf8e(0x7dd)](Graphics[_0x2bbf8e(0x7cc)]/0x2);if(this['y']===0x0)this['y']=Math[_0x2bbf8e(0x7dd)](Graphics[_0x2bbf8e(0x4f7)]/0x2);}},Sprite_Damage[_0x55f97b(0x616)]['createDigits']=function(_0x492337){const _0xadfedb=_0x55f97b;let _0x3f0648=Math[_0xadfedb(0x927)](_0x492337)['toString']();this['useDigitGrouping']()&&(_0x3f0648=VisuMZ[_0xadfedb(0x2b7)](_0x3f0648));const _0xf262d=this[_0xadfedb(0x697)](),_0xad211c=Math['floor'](_0xf262d*0.75);for(let _0x4ff6a1=0x0;_0x4ff6a1<_0x3f0648[_0xadfedb(0x382)];_0x4ff6a1++){const _0x561dd6=this[_0xadfedb(0x721)](_0xad211c,_0xf262d);_0x561dd6[_0xadfedb(0x1ef)][_0xadfedb(0x590)](_0x3f0648[_0x4ff6a1],0x0,0x0,_0xad211c,_0xf262d,'center'),_0x561dd6['x']=(_0x4ff6a1-(_0x3f0648[_0xadfedb(0x382)]-0x1)/0x2)*_0xad211c,_0x561dd6['dy']=-_0x4ff6a1;}},Sprite_Damage[_0x55f97b(0x616)]['useDigitGrouping']=function(){const _0x32fbce=_0x55f97b;return VisuMZ[_0x32fbce(0x4af)][_0x32fbce(0x386)]['QoL'][_0x32fbce(0x7aa)];},Sprite_Damage[_0x55f97b(0x616)][_0x55f97b(0x1c4)]=function(){const _0x3ff246=_0x55f97b;return ColorManager[_0x3ff246(0x376)]();},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x2b4)]=Sprite_Gauge[_0x55f97b(0x616)][_0x55f97b(0x67e)],Sprite_Gauge[_0x55f97b(0x616)][_0x55f97b(0x67e)]=function(){const _0x4426aa=_0x55f97b;return VisuMZ[_0x4426aa(0x4af)]['Sprite_Gauge_gaugeRate'][_0x4426aa(0x8a8)](this)[_0x4426aa(0x60e)](0x0,0x1);},VisuMZ[_0x55f97b(0x4af)]['Sprite_Gauge_currentValue']=Sprite_Gauge['prototype'][_0x55f97b(0x273)],Sprite_Gauge['prototype'][_0x55f97b(0x273)]=function(){const _0x104d69=_0x55f97b;let _0x484337=VisuMZ[_0x104d69(0x4af)][_0x104d69(0x7ec)][_0x104d69(0x8a8)](this);return _0x484337;},Sprite_Gauge['prototype'][_0x55f97b(0x4a9)]=function(){const _0x5544d0=_0x55f97b;let _0x3ed8f7=this[_0x5544d0(0x273)]();this[_0x5544d0(0x3b4)]()&&(_0x3ed8f7=VisuMZ[_0x5544d0(0x2b7)](_0x3ed8f7));const _0x7a7121=this[_0x5544d0(0x2cb)]()-0x1,_0x3ef7a9=this[_0x5544d0(0x5b0)]?this[_0x5544d0(0x5b0)]():this[_0x5544d0(0x200)]();this[_0x5544d0(0x76f)](),this[_0x5544d0(0x1ef)]['drawText'](_0x3ed8f7,0x0,0x0,_0x7a7121,_0x3ef7a9,_0x5544d0(0x7bf));},Sprite_Gauge[_0x55f97b(0x616)][_0x55f97b(0x4eb)]=function(){return 0x3;},Sprite_Gauge['prototype'][_0x55f97b(0x3b4)]=function(){const _0x22c769=_0x55f97b;return VisuMZ[_0x22c769(0x4af)][_0x22c769(0x386)][_0x22c769(0x585)][_0x22c769(0x24b)];},Sprite_Gauge[_0x55f97b(0x616)][_0x55f97b(0x1c4)]=function(){const _0x55b391=_0x55f97b;return ColorManager[_0x55b391(0x629)]();},Sprite_StateIcon[_0x55f97b(0x64f)]=VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x386)]['UI'][_0x55f97b(0x767)]??!![],VisuMZ['CoreEngine'][_0x55f97b(0x581)]=Sprite_StateIcon[_0x55f97b(0x616)][_0x55f97b(0x954)],Sprite_StateIcon[_0x55f97b(0x616)][_0x55f97b(0x954)]=function(){const _0x3fc8f7=_0x55f97b;Sprite_StateIcon[_0x3fc8f7(0x64f)]?this[_0x3fc8f7(0x8c9)]():VisuMZ['CoreEngine'][_0x3fc8f7(0x581)]['call'](this);},Sprite_StateIcon[_0x55f97b(0x616)][_0x55f97b(0x8c9)]=function(){const _0x467e2c=_0x55f97b;this['bitmap']=new Bitmap(ImageManager[_0x467e2c(0x448)],ImageManager['iconHeight']),this[_0x467e2c(0x973)]=ImageManager[_0x467e2c(0x689)](_0x467e2c(0x32e));},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x81d)]=Sprite_StateIcon[_0x55f97b(0x616)][_0x55f97b(0x3a7)],Sprite_StateIcon[_0x55f97b(0x616)][_0x55f97b(0x3a7)]=function(){const _0x2d4ff8=_0x55f97b;Sprite_StateIcon[_0x2d4ff8(0x64f)]?this[_0x2d4ff8(0x691)]():VisuMZ[_0x2d4ff8(0x4af)][_0x2d4ff8(0x81d)][_0x2d4ff8(0x8a8)](this);},Sprite_StateIcon[_0x55f97b(0x616)][_0x55f97b(0x691)]=function(){const _0x3ced48=_0x55f97b;if(this[_0x3ced48(0x53b)]===this[_0x3ced48(0x764)])return;this[_0x3ced48(0x53b)]=this[_0x3ced48(0x764)];const _0xd6631f=ImageManager[_0x3ced48(0x448)],_0x256f74=ImageManager[_0x3ced48(0x447)],_0x209506=this[_0x3ced48(0x764)]%0x10*_0xd6631f,_0x4a66ab=Math[_0x3ced48(0x8d7)](this['_iconIndex']/0x10)*_0x256f74,_0x3baf79=this[_0x3ced48(0x973)],_0x24f6cc=this[_0x3ced48(0x1ef)];_0x24f6cc[_0x3ced48(0x4fc)](),_0x24f6cc[_0x3ced48(0x7f8)](_0x3baf79,_0x209506,_0x4a66ab,_0xd6631f,_0x256f74,0x0,0x0,_0x24f6cc['width'],_0x24f6cc['height']);},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x86d)]=Sprite_Picture[_0x55f97b(0x616)]['loadBitmap'],Sprite_Picture[_0x55f97b(0x616)][_0x55f97b(0x954)]=function(){const _0x5c7654=_0x55f97b;this[_0x5c7654(0x389)]&&this[_0x5c7654(0x389)][_0x5c7654(0x4f2)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this[_0x5c7654(0x707)](Number(RegExp['$1'])):VisuMZ[_0x5c7654(0x4af)][_0x5c7654(0x86d)][_0x5c7654(0x8a8)](this);},Sprite_Picture[_0x55f97b(0x616)]['loadIconBitmap']=function(_0x121d19){const _0x274999=_0x55f97b,_0x21b59e=ImageManager['iconWidth'],_0x201306=ImageManager[_0x274999(0x447)],_0x3e5eda=this[_0x274999(0x389)][_0x274999(0x4f2)](/SMOOTH/i);this[_0x274999(0x1ef)]=new Bitmap(_0x21b59e,_0x201306);const _0x381650=ImageManager[_0x274999(0x689)](_0x274999(0x32e)),_0x4374ee=_0x121d19%0x10*_0x21b59e,_0xcdf5=Math[_0x274999(0x8d7)](_0x121d19/0x10)*_0x201306;this[_0x274999(0x1ef)][_0x274999(0x8b4)]=_0x3e5eda,this[_0x274999(0x1ef)][_0x274999(0x7f8)](_0x381650,_0x4374ee,_0xcdf5,_0x21b59e,_0x201306,0x0,0x0,_0x21b59e,_0x201306);};function Sprite_TitlePictureButton(){this['initialize'](...arguments);}Sprite_TitlePictureButton[_0x55f97b(0x616)]=Object[_0x55f97b(0x226)](Sprite_Clickable[_0x55f97b(0x616)]),Sprite_TitlePictureButton['prototype'][_0x55f97b(0x6ac)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x55f97b(0x616)]['initialize']=function(_0x5eb76a){const _0x1d776f=_0x55f97b;Sprite_Clickable[_0x1d776f(0x616)][_0x1d776f(0x374)]['call'](this),this[_0x1d776f(0x43b)]=_0x5eb76a,this['_clickHandler']=null,this['setup']();},Sprite_TitlePictureButton[_0x55f97b(0x616)]['setup']=function(){const _0x3976b2=_0x55f97b;this['x']=Graphics[_0x3976b2(0x7cc)],this['y']=Graphics['height'],this[_0x3976b2(0x292)]=![],this['setupButtonImage']();},Sprite_TitlePictureButton[_0x55f97b(0x616)]['setupButtonImage']=function(){const _0x4b8767=_0x55f97b;this[_0x4b8767(0x1ef)]=ImageManager['loadPicture'](this[_0x4b8767(0x43b)][_0x4b8767(0x419)]),this[_0x4b8767(0x1ef)][_0x4b8767(0x548)](this[_0x4b8767(0x72e)]['bind'](this));},Sprite_TitlePictureButton[_0x55f97b(0x616)][_0x55f97b(0x72e)]=function(){const _0x41e103=_0x55f97b;this[_0x41e103(0x43b)]['OnLoadJS'][_0x41e103(0x8a8)](this),this[_0x41e103(0x43b)]['PositionJS'][_0x41e103(0x8a8)](this),this[_0x41e103(0x69a)](this[_0x41e103(0x43b)]['CallHandlerJS'][_0x41e103(0x5cb)](this));},Sprite_TitlePictureButton[_0x55f97b(0x616)][_0x55f97b(0x94f)]=function(){const _0x566c0e=_0x55f97b;Sprite_Clickable[_0x566c0e(0x616)][_0x566c0e(0x94f)][_0x566c0e(0x8a8)](this),this[_0x566c0e(0x870)](),this['processTouch']();},Sprite_TitlePictureButton['prototype'][_0x55f97b(0x6c6)]=function(){const _0x396a82=_0x55f97b;return VisuMZ[_0x396a82(0x4af)]['Settings']['MenuLayout'][_0x396a82(0x1e9)][_0x396a82(0x677)];},Sprite_TitlePictureButton[_0x55f97b(0x616)][_0x55f97b(0x870)]=function(){const _0x4c88c7=_0x55f97b;this[_0x4c88c7(0x7ad)]||this[_0x4c88c7(0x282)]?this['opacity']=0xff:(this['opacity']+=this[_0x4c88c7(0x292)]?this[_0x4c88c7(0x6c6)]():-0x1*this[_0x4c88c7(0x6c6)](),this[_0x4c88c7(0x8f5)]=Math[_0x4c88c7(0x43e)](0xc0,this[_0x4c88c7(0x8f5)]));},Sprite_TitlePictureButton[_0x55f97b(0x616)]['setClickHandler']=function(_0x433b5f){this['_clickHandler']=_0x433b5f;},Sprite_TitlePictureButton[_0x55f97b(0x616)][_0x55f97b(0x7cb)]=function(){const _0x1d96d8=_0x55f97b;this[_0x1d96d8(0x4f6)]&&this[_0x1d96d8(0x4f6)]();};function Sprite_ExtendedTile(){const _0x46203=_0x55f97b;this[_0x46203(0x374)](...arguments);}Sprite_ExtendedTile[_0x55f97b(0x616)]=Object['create'](Sprite['prototype']),Sprite_ExtendedTile[_0x55f97b(0x616)][_0x55f97b(0x6ac)]=Sprite_ExtendedTile,Sprite_ExtendedTile[_0x55f97b(0x616)]['initialize']=function(_0x174d7f,_0x465938,_0x57daa6,_0x1b5824){const _0x5f2f2b=_0x55f97b;this['_shiftY']=Game_CharacterBase['DEFAULT_SHIFT_Y']||-0x6,this[_0x5f2f2b(0x3bf)]=_0x174d7f,this[_0x5f2f2b(0x1f2)]=_0x465938,this['_tile']=_0x57daa6,this[_0x5f2f2b(0x80e)]=_0x1b5824,Sprite[_0x5f2f2b(0x616)][_0x5f2f2b(0x374)][_0x5f2f2b(0x8a8)](this),this['createSubSprite'](),this['loadTileBitmap'](),this[_0x5f2f2b(0x2a0)](),this[_0x5f2f2b(0x94f)]();},Sprite_ExtendedTile[_0x55f97b(0x616)][_0x55f97b(0x1a2)]=function(){const _0x1e46e2=_0x55f97b;this[_0x1e46e2(0x715)]=new Sprite(),this[_0x1e46e2(0x715)][_0x1e46e2(0x30d)]['x']=0.5,this[_0x1e46e2(0x715)][_0x1e46e2(0x30d)]['y']=0x1,this['_tileSprite']['y']=-this['_shiftY']+0x1,this[_0x1e46e2(0x87c)](this[_0x1e46e2(0x715)]);},Sprite_ExtendedTile[_0x55f97b(0x616)][_0x55f97b(0x29b)]=function(){const _0x182b05=_0x55f97b,_0x413ba4=$gameMap[_0x182b05(0x26c)](),_0xeae2ac=0x5+Math[_0x182b05(0x8d7)](this[_0x182b05(0x1a1)]/0x100);this[_0x182b05(0x715)]['bitmap']=ImageManager[_0x182b05(0x1a5)](_0x413ba4['tilesetNames'][_0xeae2ac]);},Sprite_ExtendedTile[_0x55f97b(0x616)][_0x55f97b(0x2a0)]=function(){const _0xc55949=_0x55f97b,_0x353b52=this['_tile'],_0x9e8e98=$gameMap[_0xc55949(0x400)](),_0x93a18e=$gameMap['tileHeight'](),_0x5b871b=(Math[_0xc55949(0x8d7)](_0x353b52/0x80)%0x2*0x8+_0x353b52%0x8)*_0x9e8e98,_0xbf639f=Math[_0xc55949(0x8d7)](_0x353b52%0x100/0x8)%0x10*_0x93a18e,_0x339f2e=this[_0xc55949(0x80e)]*_0x93a18e;this[_0xc55949(0x715)]['setFrame'](_0x5b871b,_0xbf639f-_0x339f2e,_0x9e8e98,_0x93a18e+_0x339f2e);},Sprite_ExtendedTile[_0x55f97b(0x616)][_0x55f97b(0x94f)]=function(){const _0x47c0d0=_0x55f97b;Sprite[_0x47c0d0(0x616)][_0x47c0d0(0x94f)][_0x47c0d0(0x8a8)](this),this[_0x47c0d0(0x2fb)]();},Sprite_ExtendedTile[_0x55f97b(0x616)][_0x55f97b(0x2fb)]=function(){const _0x3be70f=_0x55f97b,_0x3b4fff=$gameMap[_0x3be70f(0x400)](),_0x296dee=$gameMap[_0x3be70f(0x317)](),_0x52fca3=this[_0x3be70f(0x3bf)],_0x27bada=this[_0x3be70f(0x1f2)];this['x']=Math['floor'](($gameMap[_0x3be70f(0x39c)](_0x52fca3)+0.5)*_0x3b4fff),this['y']=Math[_0x3be70f(0x8d7)](($gameMap[_0x3be70f(0x868)](_0x27bada)+0x1)*_0x296dee)+this[_0x3be70f(0x22d)]-0x1;},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x735)]=Spriteset_Base[_0x55f97b(0x616)][_0x55f97b(0x374)],Spriteset_Base[_0x55f97b(0x616)][_0x55f97b(0x374)]=function(){const _0x3d3aa1=_0x55f97b;VisuMZ[_0x3d3aa1(0x4af)][_0x3d3aa1(0x735)][_0x3d3aa1(0x8a8)](this),this[_0x3d3aa1(0x323)]();},Spriteset_Base['prototype'][_0x55f97b(0x323)]=function(){const _0x4ed1f4=_0x55f97b;this[_0x4ed1f4(0x40d)]=[],this[_0x4ed1f4(0x716)]=[],this[_0x4ed1f4(0x1f5)]=this[_0x4ed1f4(0x4ba)]['x'],this[_0x4ed1f4(0x3bd)]=this['scale']['y'];},VisuMZ[_0x55f97b(0x4af)]['Spriteset_Base_destroy']=Spriteset_Base[_0x55f97b(0x616)][_0x55f97b(0x26a)],Spriteset_Base[_0x55f97b(0x616)][_0x55f97b(0x26a)]=function(_0x27f80c){const _0x2fab10=_0x55f97b;this[_0x2fab10(0x22e)](),this[_0x2fab10(0x418)](),VisuMZ[_0x2fab10(0x4af)][_0x2fab10(0x1c7)][_0x2fab10(0x8a8)](this,_0x27f80c);},VisuMZ['CoreEngine'][_0x55f97b(0x30c)]=Spriteset_Base[_0x55f97b(0x616)]['update'],Spriteset_Base[_0x55f97b(0x616)][_0x55f97b(0x94f)]=function(){const _0x4fce41=_0x55f97b;VisuMZ[_0x4fce41(0x4af)]['Spriteset_Base_update'][_0x4fce41(0x8a8)](this),this[_0x4fce41(0x4b8)](),this['updatePictureAntiZoom'](),this[_0x4fce41(0x1f9)](),this['updatePointAnimations']();},Spriteset_Base[_0x55f97b(0x616)][_0x55f97b(0x4b8)]=function(){},Spriteset_Base[_0x55f97b(0x616)][_0x55f97b(0x586)]=function(){const _0x4158da=_0x55f97b;if(!VisuMZ[_0x4158da(0x4af)][_0x4158da(0x386)][_0x4158da(0x585)]['AntiZoomPictures'])return;if(this[_0x4158da(0x1f5)]===this[_0x4158da(0x4ba)]['x']&&this[_0x4158da(0x3bd)]===this[_0x4158da(0x4ba)]['y'])return;this[_0x4158da(0x278)](),this['_cacheScaleX']=this['scale']['x'],this[_0x4158da(0x3bd)]=this[_0x4158da(0x4ba)]['y'];},Spriteset_Base['prototype'][_0x55f97b(0x278)]=function(){const _0x2a988a=_0x55f97b;if(SceneManager[_0x2a988a(0x732)]()&&Spriteset_Map[_0x2a988a(0x23b)])return;else{if(SceneManager['isSceneBattle']()&&Spriteset_Battle[_0x2a988a(0x23b)])return;}this[_0x2a988a(0x4ba)]['x']!==0x0&&(this[_0x2a988a(0x3b8)]['scale']['x']=0x1/this['scale']['x'],this[_0x2a988a(0x3b8)]['x']=-(this['x']/this[_0x2a988a(0x4ba)]['x'])),this['scale']['y']!==0x0&&(this[_0x2a988a(0x3b8)][_0x2a988a(0x4ba)]['y']=0x1/this['scale']['y'],this[_0x2a988a(0x3b8)]['y']=-(this['y']/this[_0x2a988a(0x4ba)]['y']));},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x462)]=Spriteset_Base[_0x55f97b(0x616)][_0x55f97b(0x2fb)],Spriteset_Base['prototype'][_0x55f97b(0x2fb)]=function(){const _0x28a15f=_0x55f97b;VisuMZ[_0x28a15f(0x4af)][_0x28a15f(0x462)][_0x28a15f(0x8a8)](this),this[_0x28a15f(0x8d4)]();},Spriteset_Base['prototype'][_0x55f97b(0x8d4)]=function(){const _0x221ded=_0x55f97b;if(!$gameScreen)return;if($gameScreen[_0x221ded(0x917)]<=0x0)return;this['x']-=Math[_0x221ded(0x7dd)]($gameScreen[_0x221ded(0x4ce)]());const _0x58b144=$gameScreen[_0x221ded(0x894)]();switch($gameScreen[_0x221ded(0x894)]()){case _0x221ded(0x37c):this[_0x221ded(0x2be)]();break;case'horizontal':this[_0x221ded(0x1a0)]();break;case _0x221ded(0x4e1):this['updatePositionCoreEngineShakeVert']();break;default:this['updatePositionCoreEngineShakeRand']();break;}},Spriteset_Base[_0x55f97b(0x616)]['updatePositionCoreEngineShakeOriginal']=function(){const _0x40e1a6=_0x55f97b,_0xf0f2c=VisuMZ[_0x40e1a6(0x4af)]['Settings'][_0x40e1a6(0x88c)];if(_0xf0f2c&&_0xf0f2c[_0x40e1a6(0x777)])return _0xf0f2c[_0x40e1a6(0x777)][_0x40e1a6(0x8a8)](this);this['x']+=Math[_0x40e1a6(0x7dd)]($gameScreen[_0x40e1a6(0x4ce)]());},Spriteset_Base['prototype']['updatePositionCoreEngineShakeRand']=function(){const _0x28d809=_0x55f97b,_0x5608ad=VisuMZ[_0x28d809(0x4af)][_0x28d809(0x386)][_0x28d809(0x88c)];if(_0x5608ad&&_0x5608ad['randomJS'])return _0x5608ad[_0x28d809(0x45f)][_0x28d809(0x8a8)](this);const _0x4ee7e4=$gameScreen[_0x28d809(0x429)]*0.75,_0x2f95ec=$gameScreen[_0x28d809(0x802)]*0.6,_0x2a9870=$gameScreen[_0x28d809(0x917)];this['x']+=Math[_0x28d809(0x7dd)](Math[_0x28d809(0x793)](_0x4ee7e4)-Math[_0x28d809(0x793)](_0x2f95ec))*(Math[_0x28d809(0x43e)](_0x2a9870,0x1e)*0.5),this['y']+=Math[_0x28d809(0x7dd)](Math[_0x28d809(0x793)](_0x4ee7e4)-Math['randomInt'](_0x2f95ec))*(Math['min'](_0x2a9870,0x1e)*0.5);},Spriteset_Base[_0x55f97b(0x616)][_0x55f97b(0x1a0)]=function(){const _0x5513b1=_0x55f97b,_0x3e8e6d=VisuMZ[_0x5513b1(0x4af)][_0x5513b1(0x386)][_0x5513b1(0x88c)];if(_0x3e8e6d&&_0x3e8e6d[_0x5513b1(0x2c2)])return _0x3e8e6d[_0x5513b1(0x2c2)][_0x5513b1(0x8a8)](this);const _0x552ebb=$gameScreen[_0x5513b1(0x429)]*0.75,_0x506a2c=$gameScreen[_0x5513b1(0x802)]*0.6,_0x26c849=$gameScreen[_0x5513b1(0x917)];this['x']+=Math[_0x5513b1(0x7dd)](Math[_0x5513b1(0x793)](_0x552ebb)-Math['randomInt'](_0x506a2c))*(Math[_0x5513b1(0x43e)](_0x26c849,0x1e)*0.5);},Spriteset_Base[_0x55f97b(0x616)][_0x55f97b(0x46d)]=function(){const _0x12715d=_0x55f97b,_0x4f4ccb=VisuMZ[_0x12715d(0x4af)]['Settings'][_0x12715d(0x88c)];if(_0x4f4ccb&&_0x4f4ccb[_0x12715d(0x95e)])return _0x4f4ccb[_0x12715d(0x95e)]['call'](this);const _0x9f853c=$gameScreen[_0x12715d(0x429)]*0.75,_0x540642=$gameScreen['_shakeSpeed']*0.6,_0x1072e6=$gameScreen['_shakeDuration'];this['y']+=Math['round'](Math[_0x12715d(0x793)](_0x9f853c)-Math[_0x12715d(0x793)](_0x540642))*(Math[_0x12715d(0x43e)](_0x1072e6,0x1e)*0.5);},Spriteset_Base['prototype']['updateFauxAnimations']=function(){const _0x1b51e6=_0x55f97b;for(const _0x4fcc46 of this[_0x1b51e6(0x40d)]){!_0x4fcc46[_0x1b51e6(0x916)]()&&this['removeFauxAnimation'](_0x4fcc46);}this[_0x1b51e6(0x5c0)]();},Spriteset_Base['prototype'][_0x55f97b(0x5c0)]=function(){const _0x318b15=_0x55f97b;for(;;){const _0x492d09=$gameTemp[_0x318b15(0x4b4)]();if(_0x492d09)this['createFauxAnimation'](_0x492d09);else break;}},Spriteset_Base[_0x55f97b(0x616)][_0x55f97b(0x41b)]=function(_0xe8cc4a){const _0x332aee=_0x55f97b,_0x4a787b=$dataAnimations[_0xe8cc4a['animationId']],_0x2c28c8=_0xe8cc4a[_0x332aee(0x2f7)],_0x22900d=_0xe8cc4a[_0x332aee(0x907)],_0x372508=_0xe8cc4a[_0x332aee(0x33e)];let _0x273b3e=this[_0x332aee(0x320)]();const _0x168c32=this['animationNextDelay']();if(this[_0x332aee(0x2e1)](_0x4a787b))for(const _0x3c14f7 of _0x2c28c8){this['createFauxAnimationSprite']([_0x3c14f7],_0x4a787b,_0x22900d,_0x273b3e,_0x372508),_0x273b3e+=_0x168c32;}else this[_0x332aee(0x866)](_0x2c28c8,_0x4a787b,_0x22900d,_0x273b3e,_0x372508);},Spriteset_Base[_0x55f97b(0x616)][_0x55f97b(0x5f0)]=function(_0x343004,_0x200b35,_0x3a652e,_0x4727a7){const _0x2e4a00=_0x55f97b,_0x45a232=this[_0x2e4a00(0x71a)](_0x200b35),_0x3f235d=new(_0x45a232?Sprite_AnimationMV:Sprite_Animation)(),_0x2bf161=this[_0x2e4a00(0x2e5)](_0x343004),_0x48a98b=this[_0x2e4a00(0x320)](),_0x2c9770=_0x4727a7>_0x48a98b?this[_0x2e4a00(0x730)]():null;this['animationShouldMirror'](_0x343004[0x0])&&(_0x3a652e=!_0x3a652e),_0x3f235d[_0x2e4a00(0x7f5)]=_0x343004,_0x3f235d[_0x2e4a00(0x66c)](_0x2bf161,_0x200b35,_0x3a652e,_0x4727a7,_0x2c9770),this['addAnimationSpriteToContainer'](_0x3f235d),this['_animationSprites'][_0x2e4a00(0x35b)](_0x3f235d);},Spriteset_Base['prototype'][_0x55f97b(0x866)]=function(_0x4afdaf,_0x1355f8,_0x1d8df0,_0x44c6ac,_0x466437){const _0x26ae2f=_0x55f97b,_0x49e27a=this['isMVAnimation'](_0x1355f8),_0xb34c02=new(_0x49e27a?Sprite_AnimationMV:Sprite_Animation)(),_0x1b94be=this[_0x26ae2f(0x2e5)](_0x4afdaf);this[_0x26ae2f(0x79f)](_0x4afdaf[0x0])&&(_0x1d8df0=!_0x1d8df0);_0xb34c02[_0x26ae2f(0x7f5)]=_0x4afdaf,_0xb34c02[_0x26ae2f(0x66c)](_0x1b94be,_0x1355f8,_0x1d8df0,_0x44c6ac),_0xb34c02[_0x26ae2f(0x7ba)](_0x466437),this[_0x26ae2f(0x503)](_0xb34c02);if(this[_0x26ae2f(0x519)])this[_0x26ae2f(0x519)]['remove'](_0xb34c02);this[_0x26ae2f(0x40d)]['push'](_0xb34c02);},Spriteset_Base[_0x55f97b(0x616)][_0x55f97b(0x503)]=function(_0x16ba90){const _0x386b52=_0x55f97b;this[_0x386b52(0x5fb)][_0x386b52(0x87c)](_0x16ba90);},Spriteset_Base[_0x55f97b(0x616)][_0x55f97b(0x796)]=function(_0x561ed3){const _0x539b57=_0x55f97b;this['_animationSprites']['remove'](_0x561ed3),this['removeAnimationFromContainer'](_0x561ed3);for(const _0x36fc6f of _0x561ed3[_0x539b57(0x7f5)]){_0x36fc6f[_0x539b57(0x605)]&&_0x36fc6f[_0x539b57(0x605)]();}_0x561ed3[_0x539b57(0x26a)]();},Spriteset_Base[_0x55f97b(0x616)][_0x55f97b(0x2df)]=function(_0x356bc6){const _0x571088=_0x55f97b;this[_0x571088(0x40d)][_0x571088(0x7a7)](_0x356bc6),this[_0x571088(0x7a1)](_0x356bc6);for(const _0x3773c9 of _0x356bc6['targetObjects']){_0x3773c9[_0x571088(0x605)]&&_0x3773c9[_0x571088(0x605)]();}_0x356bc6[_0x571088(0x26a)]();},Spriteset_Base[_0x55f97b(0x616)][_0x55f97b(0x7a1)]=function(_0x43c19c){const _0x270728=_0x55f97b;this[_0x270728(0x5fb)][_0x270728(0x3bc)](_0x43c19c);},Spriteset_Base[_0x55f97b(0x616)]['removeAllFauxAnimations']=function(){const _0x49ccbe=_0x55f97b;for(const _0x1b3d85 of this[_0x49ccbe(0x40d)]){this[_0x49ccbe(0x2df)](_0x1b3d85);}},Spriteset_Base[_0x55f97b(0x616)][_0x55f97b(0x54b)]=function(){const _0x31ed03=_0x55f97b;return this[_0x31ed03(0x40d)][_0x31ed03(0x382)]>0x0;},Spriteset_Base[_0x55f97b(0x616)][_0x55f97b(0x1f6)]=function(){const _0x5a9efb=_0x55f97b;for(const _0xf93f47 of this['_pointAnimationSprites']){!_0xf93f47[_0x5a9efb(0x916)]()&&this[_0x5a9efb(0x7a0)](_0xf93f47);}this[_0x5a9efb(0x29a)]();},Spriteset_Base['prototype'][_0x55f97b(0x29a)]=function(){const _0x5f08c9=_0x55f97b;for(;;){const _0x2d52c5=$gameTemp[_0x5f08c9(0x417)]();if(_0x2d52c5)this[_0x5f08c9(0x64e)](_0x2d52c5);else break;}},Spriteset_Base[_0x55f97b(0x616)][_0x55f97b(0x64e)]=function(_0x3af621){const _0x1b7cac=_0x55f97b,_0x16c0a4=$dataAnimations[_0x3af621[_0x1b7cac(0x850)]],_0x236a08=this[_0x1b7cac(0x5c5)](_0x3af621),_0x1966b9=_0x3af621[_0x1b7cac(0x907)],_0x1099ec=_0x3af621[_0x1b7cac(0x33e)];let _0xcecd64=this['animationBaseDelay']();const _0xcb8b75=this[_0x1b7cac(0x47c)]();if(this[_0x1b7cac(0x2e1)](_0x16c0a4))for(const _0x2048e1 of _0x236a08){this[_0x1b7cac(0x8a6)]([_0x2048e1],_0x16c0a4,_0x1966b9,_0xcecd64,_0x1099ec),_0xcecd64+=_0xcb8b75;}else this[_0x1b7cac(0x8a6)](_0x236a08,_0x16c0a4,_0x1966b9,_0xcecd64,_0x1099ec);},Spriteset_Base[_0x55f97b(0x616)][_0x55f97b(0x5c5)]=function(_0x25e32f){const _0x531564=_0x55f97b,_0x2d2277=new Sprite_Clickable(),_0x280706=this['getPointAnimationLayer']();_0x2d2277['x']=_0x25e32f['x']-_0x280706['x'],_0x2d2277['y']=_0x25e32f['y']-_0x280706['y'],_0x2d2277['z']=0x64;const _0x137f2a=this['getPointAnimationLayer']();return _0x137f2a[_0x531564(0x87c)](_0x2d2277),[_0x2d2277];},Spriteset_Base[_0x55f97b(0x616)][_0x55f97b(0x7c2)]=function(){return this;},Spriteset_Map[_0x55f97b(0x616)][_0x55f97b(0x7c2)]=function(){return this['_tilemap']||this;},Spriteset_Battle[_0x55f97b(0x616)][_0x55f97b(0x7c2)]=function(){const _0x5b41bc=_0x55f97b;return this[_0x5b41bc(0x280)]||this;},Spriteset_Base[_0x55f97b(0x616)][_0x55f97b(0x8a6)]=function(_0x10d5da,_0x5be964,_0x5bf593,_0x4d1c03,_0x2cdf37){const _0x1ee870=_0x55f97b,_0x1d75cb=this[_0x1ee870(0x71a)](_0x5be964),_0x356f8f=new(_0x1d75cb?Sprite_AnimationMV:Sprite_Animation)();_0x356f8f['targetObjects']=_0x10d5da,_0x356f8f['setup'](_0x10d5da,_0x5be964,_0x5bf593,_0x4d1c03),_0x356f8f[_0x1ee870(0x7ba)](_0x2cdf37),this['addAnimationSpriteToContainer'](_0x356f8f),this[_0x1ee870(0x716)][_0x1ee870(0x35b)](_0x356f8f);},Spriteset_Base[_0x55f97b(0x616)]['removePointAnimation']=function(_0x42d1c4){const _0x490e7c=_0x55f97b;this[_0x490e7c(0x716)][_0x490e7c(0x7a7)](_0x42d1c4),this[_0x490e7c(0x5fb)][_0x490e7c(0x3bc)](_0x42d1c4);for(const _0x29b1d3 of _0x42d1c4[_0x490e7c(0x7f5)]){_0x29b1d3[_0x490e7c(0x605)]&&_0x29b1d3[_0x490e7c(0x605)]();const _0x27e448=this[_0x490e7c(0x7c2)]();if(_0x27e448)_0x27e448[_0x490e7c(0x3bc)](_0x29b1d3);}_0x42d1c4['destroy']();},Spriteset_Base[_0x55f97b(0x616)][_0x55f97b(0x418)]=function(){const _0x396f16=_0x55f97b;for(const _0x5248d8 of this[_0x396f16(0x716)]){this[_0x396f16(0x7a0)](_0x5248d8);}},Spriteset_Base[_0x55f97b(0x616)][_0x55f97b(0x294)]=function(){const _0x58a254=_0x55f97b;return this[_0x58a254(0x716)][_0x58a254(0x382)]>0x0;},VisuMZ['CoreEngine'][_0x55f97b(0x88a)]=Spriteset_Base[_0x55f97b(0x616)][_0x55f97b(0x1aa)],Spriteset_Base['prototype'][_0x55f97b(0x1aa)]=function(){const _0x3d3519=_0x55f97b;return VisuMZ['CoreEngine'][_0x3d3519(0x88a)]['call'](this)||this[_0x3d3519(0x294)]();},Spriteset_Map['DETACH_PICTURE_CONTAINER']=VisuMZ['CoreEngine'][_0x55f97b(0x386)]['QoL'][_0x55f97b(0x854)]||![],VisuMZ['CoreEngine']['Scene_Map_createSpriteset_detach']=Scene_Map[_0x55f97b(0x616)][_0x55f97b(0x26e)],Scene_Map[_0x55f97b(0x616)][_0x55f97b(0x26e)]=function(){const _0x18babe=_0x55f97b;VisuMZ[_0x18babe(0x4af)][_0x18babe(0x655)][_0x18babe(0x8a8)](this);if(!Spriteset_Map[_0x18babe(0x23b)])return;const _0x440086=this[_0x18babe(0x891)];if(!_0x440086)return;this[_0x18babe(0x3b8)]=_0x440086[_0x18babe(0x3b8)];if(!this[_0x18babe(0x3b8)])return;this['addChild'](this['_pictureContainer']);},VisuMZ[_0x55f97b(0x4af)]['Spriteset_Map_createTilemap']=Spriteset_Map[_0x55f97b(0x616)][_0x55f97b(0x7df)],Spriteset_Map[_0x55f97b(0x616)][_0x55f97b(0x7df)]=function(){const _0x2e8ab3=_0x55f97b;VisuMZ[_0x2e8ab3(0x4af)][_0x2e8ab3(0x2ee)][_0x2e8ab3(0x8a8)](this),this['createTileExtendSprites']();},Spriteset_Map[_0x55f97b(0x616)]['createTileExtendSprites']=function(){const _0x55a137=_0x55f97b,_0x51bd7a=$gameMap['tileset']();if(!_0x51bd7a)return;const _0x37c202=$gameMap['getTileExtendTerrainTags']();if(Object[_0x55a137(0x794)](_0x37c202)[_0x55a137(0x382)]<=0x0)return;const _0x1bb434=$gameMap[_0x55a137(0x7f6)]();this[_0x55a137(0x1fa)]=this[_0x55a137(0x1fa)]||[];for(let _0x2fe657=0x0;_0x2fe657<$gameMap[_0x55a137(0x4f7)]();_0x2fe657++){for(let _0x39b264=0x0;_0x39b264<$gameMap[_0x55a137(0x7cc)]();_0x39b264++){for(const _0x50ff21 of $gameMap[_0x55a137(0x731)](_0x39b264,_0x2fe657)){const _0xe43b95=_0x1bb434[_0x50ff21]>>0xc,_0x4948c4=_0x37c202[_0xe43b95]||0x0;if(_0x4948c4<=0x0)continue;this[_0x55a137(0x319)](_0x39b264,_0x2fe657,_0x50ff21,_0x4948c4);}}}},Spriteset_Map[_0x55f97b(0x616)][_0x55f97b(0x312)]=function(){const _0x2e49ff=_0x55f97b;this[_0x2e49ff(0x1fa)]=this[_0x2e49ff(0x1fa)]||[];for(const _0x8209e9 of this[_0x2e49ff(0x1fa)]){this['_tilemap'][_0x2e49ff(0x3bc)](_0x8209e9);}this[_0x2e49ff(0x1fa)]=[];},Spriteset_Map[_0x55f97b(0x616)]['createExtendedTileSprite']=function(_0x1792fe,_0x127ceb,_0x76bb4b,_0x5ef299){const _0x1ebf35=_0x55f97b,_0x3bce64=new Sprite_ExtendedTile(_0x1792fe,_0x127ceb,_0x76bb4b,_0x5ef299),_0x4d2792=$gameMap[_0x1ebf35(0x7f6)]();_0x4d2792[_0x76bb4b]&0x10?_0x3bce64['z']=0x4:_0x3bce64['z']=0x3,this[_0x1ebf35(0x281)][_0x1ebf35(0x87c)](_0x3bce64),this['_tileExtendSprites']['push'](_0x3bce64);},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x901)]=Tilemap[_0x55f97b(0x616)][_0x55f97b(0x674)],Tilemap[_0x55f97b(0x616)][_0x55f97b(0x674)]=function(_0x1ef96f,_0x155a8e,_0x1a2137){const _0x2b4bdc=_0x55f97b;if($gameMap[_0x2b4bdc(0x311)](_0x1ef96f))return;VisuMZ[_0x2b4bdc(0x4af)]['Tilemap_addSpotTile'][_0x2b4bdc(0x8a8)](this,_0x1ef96f,_0x155a8e,_0x1a2137);},Spriteset_Battle[_0x55f97b(0x23b)]=VisuMZ['CoreEngine'][_0x55f97b(0x386)][_0x55f97b(0x585)][_0x55f97b(0x6e1)]||![],VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x1ff)]=Scene_Battle[_0x55f97b(0x616)][_0x55f97b(0x26e)],Scene_Battle[_0x55f97b(0x616)][_0x55f97b(0x26e)]=function(){const _0x4fc30d=_0x55f97b;VisuMZ['CoreEngine'][_0x4fc30d(0x1ff)][_0x4fc30d(0x8a8)](this);if(!Spriteset_Battle['DETACH_PICTURE_CONTAINER'])return;const _0x2de2ed=this[_0x4fc30d(0x891)];if(!_0x2de2ed)return;this[_0x4fc30d(0x3b8)]=_0x2de2ed['_pictureContainer'];if(!this[_0x4fc30d(0x3b8)])return;this[_0x4fc30d(0x87c)](this[_0x4fc30d(0x3b8)]);},Spriteset_Battle[_0x55f97b(0x616)][_0x55f97b(0x6ee)]=function(){const _0x1c169d=_0x55f97b;this['_backgroundFilter']=new PIXI[(_0x1c169d(0x972))][(_0x1c169d(0x824))](clamp=!![]),this[_0x1c169d(0x52f)]=new Sprite(),this['_backgroundSprite'][_0x1c169d(0x1ef)]=SceneManager[_0x1c169d(0x38f)](),this[_0x1c169d(0x52f)]['filters']=[this[_0x1c169d(0x2a4)]],this[_0x1c169d(0x3c3)][_0x1c169d(0x87c)](this['_backgroundSprite']);},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x3a0)]=Spriteset_Battle[_0x55f97b(0x616)][_0x55f97b(0x27e)],Spriteset_Battle[_0x55f97b(0x616)][_0x55f97b(0x27e)]=function(){const _0xb274bc=_0x55f97b;this[_0xb274bc(0x40b)]()&&this[_0xb274bc(0x6bb)](),VisuMZ[_0xb274bc(0x4af)]['Spriteset_Battle_createEnemies'][_0xb274bc(0x8a8)](this);},Spriteset_Battle[_0x55f97b(0x616)][_0x55f97b(0x40b)]=function(){const _0x1fe4e1=_0x55f97b,_0x5997ae=VisuMZ['CoreEngine'][_0x1fe4e1(0x386)][_0x1fe4e1(0x1ea)];if(!_0x5997ae)return![];if(Utils['RPGMAKER_VERSION']>=_0x1fe4e1(0x2f5)&&!_0x5997ae[_0x1fe4e1(0x579)])return![];return _0x5997ae[_0x1fe4e1(0x1d2)];},Spriteset_Battle['prototype'][_0x55f97b(0x6bb)]=function(){const _0x397413=_0x55f97b;for(member of $gameTroop[_0x397413(0x588)]()){member['moveRelativeToResolutionChange']();}},VisuMZ[_0x55f97b(0x4af)]['Window_Base_initialize']=Window_Base['prototype'][_0x55f97b(0x374)],Window_Base[_0x55f97b(0x616)][_0x55f97b(0x374)]=function(_0x2cccd8){const _0x264ef2=_0x55f97b;_0x2cccd8['x']=Math[_0x264ef2(0x7dd)](_0x2cccd8['x']),_0x2cccd8['y']=Math[_0x264ef2(0x7dd)](_0x2cccd8['y']),_0x2cccd8[_0x264ef2(0x7cc)]=Math[_0x264ef2(0x7dd)](_0x2cccd8[_0x264ef2(0x7cc)]),_0x2cccd8[_0x264ef2(0x4f7)]=Math[_0x264ef2(0x7dd)](_0x2cccd8[_0x264ef2(0x4f7)]),this[_0x264ef2(0x905)](),VisuMZ[_0x264ef2(0x4af)][_0x264ef2(0x932)][_0x264ef2(0x8a8)](this,_0x2cccd8),this[_0x264ef2(0x8d0)]();},Window_Base['prototype'][_0x55f97b(0x905)]=function(){const _0x1607b3=_0x55f97b;this[_0x1607b3(0x650)]=VisuMZ['CoreEngine']['Settings'][_0x1607b3(0x585)][_0x1607b3(0x90c)],this[_0x1607b3(0x89b)]=VisuMZ['CoreEngine'][_0x1607b3(0x386)][_0x1607b3(0x585)][_0x1607b3(0x839)];},Window_Base[_0x55f97b(0x616)][_0x55f97b(0x254)]=function(){const _0x5f3ad0=_0x55f97b;return VisuMZ[_0x5f3ad0(0x4af)][_0x5f3ad0(0x386)][_0x5f3ad0(0x46e)]['LineHeight'];},Window_Base['prototype'][_0x55f97b(0x6a9)]=function(){const _0x48375a=_0x55f97b;return VisuMZ[_0x48375a(0x4af)][_0x48375a(0x386)]['Window'][_0x48375a(0x66b)];},Window_Base[_0x55f97b(0x616)][_0x55f97b(0x1be)]=function(){const _0x212566=_0x55f97b;$gameSystem[_0x212566(0x773)]?this[_0x212566(0x4d8)]=$gameSystem[_0x212566(0x773)]():this[_0x212566(0x4d8)]=VisuMZ[_0x212566(0x4af)]['Settings'][_0x212566(0x46e)]['BackOpacity'];},Window_Base[_0x55f97b(0x616)][_0x55f97b(0x982)]=function(){const _0x3bfe3f=_0x55f97b;return VisuMZ[_0x3bfe3f(0x4af)][_0x3bfe3f(0x386)][_0x3bfe3f(0x46e)][_0x3bfe3f(0x8bd)];},Window_Base[_0x55f97b(0x616)][_0x55f97b(0x708)]=function(){const _0x1a9c08=_0x55f97b;return VisuMZ[_0x1a9c08(0x4af)][_0x1a9c08(0x386)][_0x1a9c08(0x46e)][_0x1a9c08(0x467)];},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x50b)]=Window_Base['prototype']['update'],Window_Base[_0x55f97b(0x616)][_0x55f97b(0x94f)]=function(){const _0x81e885=_0x55f97b;VisuMZ[_0x81e885(0x4af)][_0x81e885(0x50b)][_0x81e885(0x8a8)](this),this['updateCoreEasing']();},Window_Base[_0x55f97b(0x616)]['updateOpen']=function(){const _0x1183d3=_0x55f97b;this[_0x1183d3(0x6f6)]&&(this[_0x1183d3(0x725)]+=this[_0x1183d3(0x708)](),this[_0x1183d3(0x6b8)]()&&(this[_0x1183d3(0x6f6)]=![]));},Window_Base['prototype'][_0x55f97b(0x1b4)]=function(){const _0x2ce6f4=_0x55f97b;this[_0x2ce6f4(0x923)]&&(this['openness']-=this[_0x2ce6f4(0x708)](),this[_0x2ce6f4(0x327)]()&&(this['_closing']=![]));},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x989)]=Window_Base['prototype']['drawText'],Window_Base[_0x55f97b(0x616)][_0x55f97b(0x590)]=function(_0x49ed92,_0x4c83bd,_0x5c55f6,_0x2932ac,_0x3fa086){const _0x5016a3=_0x55f97b;if(this['useDigitGrouping']())_0x49ed92=VisuMZ['GroupDigits'](_0x49ed92);VisuMZ['CoreEngine'][_0x5016a3(0x989)][_0x5016a3(0x8a8)](this,_0x49ed92,_0x4c83bd,_0x5c55f6,_0x2932ac,_0x3fa086);},Window_Base[_0x55f97b(0x616)][_0x55f97b(0x3b4)]=function(){const _0x4c1db2=_0x55f97b;return this[_0x4c1db2(0x650)];},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x65d)]=Window_Base['prototype'][_0x55f97b(0x675)],Window_Base[_0x55f97b(0x616)][_0x55f97b(0x675)]=function(_0x15b987,_0x47a91a,_0x4661a8,_0x291339){const _0x22f2c2=_0x55f97b;var _0x4fba87=VisuMZ['CoreEngine'][_0x22f2c2(0x65d)][_0x22f2c2(0x8a8)](this,_0x15b987,_0x47a91a,_0x4661a8,_0x291339);if(this[_0x22f2c2(0x2c5)]())_0x4fba87[_0x22f2c2(0x2c4)]=String(VisuMZ[_0x22f2c2(0x2b7)](_0x4fba87[_0x22f2c2(0x2c4)]))||'';return _0x4fba87;},Window_Base[_0x55f97b(0x616)]['useDigitGroupingEx']=function(){const _0x2b220c=_0x55f97b;return this[_0x2b220c(0x89b)];},Window_Base['prototype'][_0x55f97b(0x641)]=function(_0x3bf432){const _0x1b88d0=_0x55f97b;this[_0x1b88d0(0x650)]=_0x3bf432;},Window_Base[_0x55f97b(0x616)][_0x55f97b(0x851)]=function(_0x4d77f3){this['_digitGroupingEx']=_0x4d77f3;},VisuMZ[_0x55f97b(0x4af)]['Window_Base_drawIcon']=Window_Base[_0x55f97b(0x616)]['drawIcon'],Window_Base['prototype']['drawIcon']=function(_0xa2b690,_0x4617a8,_0x5eaf2f){const _0x5e06ac=_0x55f97b;_0x4617a8=Math[_0x5e06ac(0x7dd)](_0x4617a8),_0x5eaf2f=Math[_0x5e06ac(0x7dd)](_0x5eaf2f),VisuMZ[_0x5e06ac(0x4af)][_0x5e06ac(0x7a4)][_0x5e06ac(0x8a8)](this,_0xa2b690,_0x4617a8,_0x5eaf2f);},VisuMZ[_0x55f97b(0x4af)]['Window_Base_drawFace']=Window_Base['prototype'][_0x55f97b(0x862)],Window_Base[_0x55f97b(0x616)][_0x55f97b(0x862)]=function(_0x24641c,_0x36a327,_0x3c23d9,_0x1c0e02,_0x2a3a86,_0xd3e7e0){const _0x506d5c=_0x55f97b;_0x2a3a86=_0x2a3a86||ImageManager['faceWidth'],_0xd3e7e0=_0xd3e7e0||ImageManager[_0x506d5c(0x1c5)],_0x3c23d9=Math[_0x506d5c(0x7dd)](_0x3c23d9),_0x1c0e02=Math['round'](_0x1c0e02),_0x2a3a86=Math[_0x506d5c(0x7dd)](_0x2a3a86),_0xd3e7e0=Math['round'](_0xd3e7e0),VisuMZ[_0x506d5c(0x4af)]['Window_Base_drawFace']['call'](this,_0x24641c,_0x36a327,_0x3c23d9,_0x1c0e02,_0x2a3a86,_0xd3e7e0);},VisuMZ['CoreEngine'][_0x55f97b(0x524)]=Window_Base[_0x55f97b(0x616)][_0x55f97b(0x937)],Window_Base[_0x55f97b(0x616)][_0x55f97b(0x937)]=function(_0x507a9f,_0x48e3f4,_0x29e668,_0x55bcc3){const _0x2cbd9e=_0x55f97b;_0x29e668=Math[_0x2cbd9e(0x7dd)](_0x29e668),_0x55bcc3=Math[_0x2cbd9e(0x7dd)](_0x55bcc3),VisuMZ['CoreEngine'][_0x2cbd9e(0x524)]['call'](this,_0x507a9f,_0x48e3f4,_0x29e668,_0x55bcc3);},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x58e)]=Window_Selectable[_0x55f97b(0x616)][_0x55f97b(0x3aa)],Window_Selectable['prototype'][_0x55f97b(0x3aa)]=function(_0x214a41){const _0x57d788=_0x55f97b;let _0x3635fb=VisuMZ[_0x57d788(0x4af)][_0x57d788(0x58e)][_0x57d788(0x8a8)](this,_0x214a41);return _0x3635fb['x']=Math[_0x57d788(0x7dd)](_0x3635fb['x']),_0x3635fb['y']=Math[_0x57d788(0x7dd)](_0x3635fb['y']),_0x3635fb[_0x57d788(0x7cc)]=Math[_0x57d788(0x7dd)](_0x3635fb[_0x57d788(0x7cc)]),_0x3635fb[_0x57d788(0x4f7)]=Math[_0x57d788(0x7dd)](_0x3635fb[_0x57d788(0x4f7)]),_0x3635fb;},VisuMZ[_0x55f97b(0x4af)]['Window_StatusBase_drawActorSimpleStatus']=Window_StatusBase['prototype'][_0x55f97b(0x76c)],Window_StatusBase[_0x55f97b(0x616)][_0x55f97b(0x76c)]=function(_0x323052,_0x1968fd,_0x5c1126){const _0xffdaf7=_0x55f97b;_0x1968fd=Math[_0xffdaf7(0x7dd)](_0x1968fd),_0x5c1126=Math[_0xffdaf7(0x7dd)](_0x5c1126),VisuMZ['CoreEngine'][_0xffdaf7(0x3d6)][_0xffdaf7(0x8a8)](this,_0x323052,_0x1968fd,_0x5c1126);},Window_Base[_0x55f97b(0x616)][_0x55f97b(0x8d0)]=function(){const _0x5ebc5e=_0x55f97b;this[_0x5ebc5e(0x2a8)]={'duration':0x0,'wholeDuration':0x0,'type':'LINEAR','targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x5ebc5e(0x4ba)]['x'],'targetScaleY':this[_0x5ebc5e(0x4ba)]['y'],'targetOpacity':this[_0x5ebc5e(0x8f5)],'targetBackOpacity':this['backOpacity'],'targetContentsOpacity':this[_0x5ebc5e(0x5bc)]};},Window_Base[_0x55f97b(0x616)][_0x55f97b(0x822)]=function(){const _0xbfdcf6=_0x55f97b;if(!this['_coreEasing'])return;if(this[_0xbfdcf6(0x2a8)][_0xbfdcf6(0x2b5)]<=0x0)return;this['x']=this[_0xbfdcf6(0x477)](this['x'],this[_0xbfdcf6(0x2a8)]['targetX']),this['y']=this['applyCoreEasing'](this['y'],this[_0xbfdcf6(0x2a8)][_0xbfdcf6(0x1af)]),this[_0xbfdcf6(0x4ba)]['x']=this[_0xbfdcf6(0x477)](this[_0xbfdcf6(0x4ba)]['x'],this[_0xbfdcf6(0x2a8)][_0xbfdcf6(0x704)]),this[_0xbfdcf6(0x4ba)]['y']=this[_0xbfdcf6(0x477)](this['scale']['y'],this[_0xbfdcf6(0x2a8)][_0xbfdcf6(0x29d)]),this['opacity']=this[_0xbfdcf6(0x477)](this[_0xbfdcf6(0x8f5)],this[_0xbfdcf6(0x2a8)][_0xbfdcf6(0x971)]),this[_0xbfdcf6(0x4d8)]=this[_0xbfdcf6(0x477)](this[_0xbfdcf6(0x4d8)],this[_0xbfdcf6(0x2a8)][_0xbfdcf6(0x196)]),this[_0xbfdcf6(0x5bc)]=this[_0xbfdcf6(0x477)](this[_0xbfdcf6(0x5bc)],this[_0xbfdcf6(0x2a8)][_0xbfdcf6(0x571)]),this[_0xbfdcf6(0x2a8)][_0xbfdcf6(0x2b5)]--;},Window_Base[_0x55f97b(0x616)][_0x55f97b(0x477)]=function(_0x2663e2,_0x15cd31){const _0x1c1811=_0x55f97b;if(!this[_0x1c1811(0x2a8)])return _0x15cd31;const _0xbea274=this[_0x1c1811(0x2a8)][_0x1c1811(0x2b5)],_0x20fdb6=this[_0x1c1811(0x2a8)][_0x1c1811(0x87e)],_0x36d276=this[_0x1c1811(0x44b)]((_0x20fdb6-_0xbea274)/_0x20fdb6),_0x18f3b0=this[_0x1c1811(0x44b)]((_0x20fdb6-_0xbea274+0x1)/_0x20fdb6),_0x3b43ab=(_0x2663e2-_0x15cd31*_0x36d276)/(0x1-_0x36d276);return _0x3b43ab+(_0x15cd31-_0x3b43ab)*_0x18f3b0;},Window_Base[_0x55f97b(0x616)][_0x55f97b(0x44b)]=function(_0x180d57){const _0x3491ab=_0x55f97b;if(!this['_coreEasing'])return _0x180d57;return VisuMZ[_0x3491ab(0x22a)](_0x180d57,this[_0x3491ab(0x2a8)]['type']||_0x3491ab(0x6e9));},Window_Base[_0x55f97b(0x616)][_0x55f97b(0x492)]=function(_0x5d5474,_0x22c949){const _0x53b8ee=_0x55f97b;if(!this[_0x53b8ee(0x2a8)])return;this['x']=this['_coreEasing'][_0x53b8ee(0x505)],this['y']=this['_coreEasing'][_0x53b8ee(0x1af)],this[_0x53b8ee(0x4ba)]['x']=this[_0x53b8ee(0x2a8)][_0x53b8ee(0x704)],this[_0x53b8ee(0x4ba)]['y']=this[_0x53b8ee(0x2a8)][_0x53b8ee(0x29d)],this['opacity']=this[_0x53b8ee(0x2a8)]['targetOpacity'],this[_0x53b8ee(0x4d8)]=this[_0x53b8ee(0x2a8)][_0x53b8ee(0x196)],this[_0x53b8ee(0x5bc)]=this[_0x53b8ee(0x2a8)][_0x53b8ee(0x571)],this[_0x53b8ee(0x627)](_0x5d5474,_0x22c949,this['x'],this['y'],this[_0x53b8ee(0x4ba)]['x'],this[_0x53b8ee(0x4ba)]['y'],this[_0x53b8ee(0x8f5)],this['backOpacity'],this[_0x53b8ee(0x5bc)]);},Window_Base['prototype'][_0x55f97b(0x627)]=function(_0x563c4a,_0x50055e,_0x3d17ca,_0x4558e9,_0x58fa81,_0x5cfb8e,_0x104c2a,_0x17445a,_0x43b41b){const _0x17eaa2=_0x55f97b;this[_0x17eaa2(0x2a8)]={'duration':_0x563c4a,'wholeDuration':_0x563c4a,'type':_0x50055e,'targetX':_0x3d17ca,'targetY':_0x4558e9,'targetScaleX':_0x58fa81,'targetScaleY':_0x5cfb8e,'targetOpacity':_0x104c2a,'targetBackOpacity':_0x17445a,'targetContentsOpacity':_0x43b41b};},Window_Base['prototype']['drawCurrencyValue']=function(_0x23831b,_0x20f226,_0x244144,_0xde21d6,_0x4a5953){const _0x325caf=_0x55f97b;this[_0x325caf(0x2ac)](),this['contents'][_0x325caf(0x697)]=VisuMZ[_0x325caf(0x4af)][_0x325caf(0x386)]['Gold'][_0x325caf(0x6e2)];const _0x1e2328=VisuMZ[_0x325caf(0x4af)][_0x325caf(0x386)][_0x325caf(0x945)][_0x325caf(0x430)];if(_0x1e2328>0x0&&_0x20f226===TextManager[_0x325caf(0x86e)]){const _0x9d192a=_0xde21d6+(this[_0x325caf(0x254)]()-ImageManager[_0x325caf(0x447)])/0x2;this[_0x325caf(0x516)](_0x1e2328,_0x244144+(_0x4a5953-ImageManager[_0x325caf(0x448)]),_0x9d192a),_0x4a5953-=ImageManager[_0x325caf(0x448)]+0x4;}else this['changeTextColor'](ColorManager['systemColor']()),this[_0x325caf(0x590)](_0x20f226,_0x244144,_0xde21d6,_0x4a5953,_0x325caf(0x7bf)),_0x4a5953-=this['textWidth'](_0x20f226)+0x6;this[_0x325caf(0x3f9)]();const _0x483292=this[_0x325caf(0x347)](this[_0x325caf(0x650)]?VisuMZ[_0x325caf(0x2b7)](_0x23831b):_0x23831b);_0x483292>_0x4a5953?this[_0x325caf(0x590)](VisuMZ[_0x325caf(0x4af)]['Settings']['Gold'][_0x325caf(0x595)],_0x244144,_0xde21d6,_0x4a5953,'right'):this[_0x325caf(0x590)](_0x23831b,_0x244144,_0xde21d6,_0x4a5953,_0x325caf(0x7bf)),this[_0x325caf(0x2ac)]();},Window_Base['prototype'][_0x55f97b(0x29e)]=function(_0xea0b76,_0x54d63e,_0x4c019f,_0x883b21,_0x330302){const _0x3ef041=_0x55f97b,_0x64a449=ImageManager[_0x3ef041(0x689)](_0x3ef041(0x32e)),_0x4b12cf=ImageManager[_0x3ef041(0x448)],_0x5e9cfd=ImageManager[_0x3ef041(0x447)],_0x36c0bc=_0xea0b76%0x10*_0x4b12cf,_0x53ff4a=Math[_0x3ef041(0x8d7)](_0xea0b76/0x10)*_0x5e9cfd,_0x512502=_0x883b21,_0x156a56=_0x883b21;this[_0x3ef041(0x354)][_0x3ef041(0x938)][_0x3ef041(0x7cd)]=_0x330302,this[_0x3ef041(0x354)]['blt'](_0x64a449,_0x36c0bc,_0x53ff4a,_0x4b12cf,_0x5e9cfd,_0x54d63e,_0x4c019f,_0x512502,_0x156a56),this[_0x3ef041(0x354)][_0x3ef041(0x938)][_0x3ef041(0x7cd)]=!![];},Window_Base[_0x55f97b(0x616)][_0x55f97b(0x2cc)]=function(_0x15661a,_0x4d5cd0,_0x12b29a,_0xcedfaa,_0x4298e3,_0x8708ab){const _0x137d79=_0x55f97b,_0x45b22f=Math[_0x137d79(0x8d7)]((_0x12b29a-0x2)*_0xcedfaa),_0x4d8584=Sprite_Gauge['prototype'][_0x137d79(0x941)][_0x137d79(0x8a8)](this),_0x3b8949=_0x4d5cd0+this[_0x137d79(0x254)]()-_0x4d8584-0x2;this['contents'][_0x137d79(0x5ba)](_0x15661a,_0x3b8949,_0x12b29a,_0x4d8584,ColorManager['gaugeBackColor']()),this[_0x137d79(0x354)][_0x137d79(0x87a)](_0x15661a+0x1,_0x3b8949+0x1,_0x45b22f,_0x4d8584-0x2,_0x4298e3,_0x8708ab);},Window_Scrollable[_0x55f97b(0x596)]={'enabled':VisuMZ[_0x55f97b(0x4af)]['Settings'][_0x55f97b(0x46e)][_0x55f97b(0x863)]??!![],'thickness':VisuMZ[_0x55f97b(0x4af)]['Settings'][_0x55f97b(0x46e)][_0x55f97b(0x360)]??0x2,'offset':VisuMZ['CoreEngine'][_0x55f97b(0x386)][_0x55f97b(0x46e)][_0x55f97b(0x7e0)]??0x2,'bodyColor':VisuMZ['CoreEngine'][_0x55f97b(0x386)][_0x55f97b(0x46e)][_0x55f97b(0x63a)]??0x0,'offColor':VisuMZ[_0x55f97b(0x4af)]['Settings']['Window']['OffBarColor']??0x7,'offOpacity':VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x386)][_0x55f97b(0x46e)]['OffBarOpacity']??0x80},Window_Base[_0x55f97b(0x616)][_0x55f97b(0x643)]=function(){const _0x51ca62=_0x55f97b;return Window_Scrollable[_0x51ca62(0x596)][_0x51ca62(0x481)]&&Window_Scrollable[_0x51ca62(0x596)][_0x51ca62(0x875)]>0x0;},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x20b)]=Window_Base[_0x55f97b(0x616)][_0x55f97b(0x7d6)],Window_Base['prototype'][_0x55f97b(0x7d6)]=function(){const _0x1fd6f4=_0x55f97b;VisuMZ[_0x1fd6f4(0x4af)][_0x1fd6f4(0x20b)]['call'](this),this[_0x1fd6f4(0x7b0)](),this[_0x1fd6f4(0x3de)](!![]),this[_0x1fd6f4(0x3de)](![]);},Window_Base[_0x55f97b(0x616)][_0x55f97b(0x7b0)]=function(){const _0x27ea76=_0x55f97b;if(!this[_0x27ea76(0x643)]())return;if(this[_0x27ea76(0x8fb)]||this['_scrollBarVert'])return;this[_0x27ea76(0x343)]={'horz':null,'vert':null,'maxHorz':null,'maxVert':null},this['_scrollBarHorz']=new Sprite(),this[_0x27ea76(0x2a2)]=new Sprite(),this[_0x27ea76(0x87c)](this[_0x27ea76(0x8fb)]),this[_0x27ea76(0x87c)](this[_0x27ea76(0x2a2)]);},Window_Base[_0x55f97b(0x616)][_0x55f97b(0x3de)]=function(_0xba2995){const _0x5e7e65=_0x55f97b,_0x2737c5=_0xba2995?this['_scrollBarHorz']:this[_0x5e7e65(0x2a2)];if(!_0x2737c5)return;const _0x2688fc=Window_Scrollable[_0x5e7e65(0x596)],_0x3cdcbc=_0x2688fc[_0x5e7e65(0x875)],_0x48ef9a=_0xba2995?this[_0x5e7e65(0x96a)]-_0x3cdcbc*0x2:_0x3cdcbc,_0x43f499=_0xba2995?_0x3cdcbc:this[_0x5e7e65(0x949)]-_0x3cdcbc*0x2;_0x2737c5[_0x5e7e65(0x1ef)]=new Bitmap(_0x48ef9a,_0x43f499),_0x2737c5[_0x5e7e65(0x4e7)](0x0,0x0,_0x48ef9a,_0x43f499),this[_0x5e7e65(0x21e)](_0xba2995);},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x480)]=Window_Base[_0x55f97b(0x616)][_0x55f97b(0x77f)],Window_Base[_0x55f97b(0x616)][_0x55f97b(0x77f)]=function(){const _0x52634c=_0x55f97b;VisuMZ[_0x52634c(0x4af)]['Window_Base_destroyContents'][_0x52634c(0x8a8)](this),this['destroyScrollBarBitmaps']();},Window_Base[_0x55f97b(0x616)][_0x55f97b(0x253)]=function(){const _0x48dcee=_0x55f97b,_0x10fbdf=[this[_0x48dcee(0x8fb)],this[_0x48dcee(0x2a2)]];for(const _0x44dd8e of _0x10fbdf){if(_0x44dd8e&&_0x44dd8e[_0x48dcee(0x1ef)])_0x44dd8e[_0x48dcee(0x1ef)][_0x48dcee(0x26a)]();}},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x668)]=Window_Scrollable[_0x55f97b(0x616)][_0x55f97b(0x94f)],Window_Scrollable[_0x55f97b(0x616)]['update']=function(){const _0x1a9e37=_0x55f97b;VisuMZ[_0x1a9e37(0x4af)][_0x1a9e37(0x668)][_0x1a9e37(0x8a8)](this),this[_0x1a9e37(0x1fe)]();},Window_Scrollable['prototype'][_0x55f97b(0x1fe)]=function(){const _0x54f79f=_0x55f97b;this[_0x54f79f(0x52b)](),this[_0x54f79f(0x3da)](!![]),this[_0x54f79f(0x3da)](![]),this[_0x54f79f(0x21e)](!![]),this[_0x54f79f(0x21e)](![]);},Window_Scrollable[_0x55f97b(0x616)][_0x55f97b(0x52b)]=function(){const _0xaed1be=_0x55f97b,_0x357001=[this['_scrollBarHorz'],this[_0xaed1be(0x2a2)]];for(const _0x4f4aca of _0x357001){_0x4f4aca&&(_0x4f4aca[_0xaed1be(0x292)]=this[_0xaed1be(0x643)]()&&this[_0xaed1be(0x6b8)]());}},Window_Scrollable[_0x55f97b(0x616)][_0x55f97b(0x3da)]=function(_0x843575){const _0x44349e=_0x55f97b;if(!this[_0x44349e(0x343)])return;const _0x458711=this['scrollbar'](_0x843575),_0x301b8b=this[_0x44349e(0x58a)](_0x843575),_0x43105d=_0x843575?'horz':_0x44349e(0x3ad),_0x211e2c=_0x843575?_0x44349e(0x242):_0x44349e(0x48f);(this[_0x44349e(0x343)][_0x43105d]!==_0x458711||this['_lastScrollBarValues'][_0x211e2c]!==_0x301b8b)&&(this[_0x44349e(0x343)][_0x43105d]=_0x458711,this[_0x44349e(0x343)][_0x211e2c]=_0x301b8b,this[_0x44349e(0x52e)](_0x843575,_0x458711,_0x301b8b));},Window_Scrollable[_0x55f97b(0x616)]['scrollbar']=function(_0x50c4c4){const _0x3b3714=_0x55f97b;if(this['_allTextHeight']!==undefined)return _0x50c4c4?this[_0x3b3714(0x247)]():this[_0x3b3714(0x2eb)]['y'];return _0x50c4c4?this[_0x3b3714(0x247)]():this[_0x3b3714(0x703)]();},Window_Scrollable[_0x55f97b(0x616)]['maxScrollbar']=function(_0x48fdca){const _0x36d7e0=_0x55f97b;if(this['_allTextHeight']!==undefined)return _0x48fdca?this[_0x36d7e0(0x66d)]():Math[_0x36d7e0(0x1fb)](0x0,this[_0x36d7e0(0x4ca)]-this[_0x36d7e0(0x949)]);return _0x48fdca?this[_0x36d7e0(0x66d)]():this['maxScrollY']();},Window_Scrollable[_0x55f97b(0x616)]['scrollbarHeight']=function(){const _0x17a7e1=_0x55f97b;if(this['_allTextHeight']!==undefined)return Math[_0x17a7e1(0x1fb)](0x0,this[_0x17a7e1(0x4ca)]);return this[_0x17a7e1(0x766)]();},Window_Scrollable[_0x55f97b(0x616)]['refreshScrollBarBitmap']=function(_0x10eceb,_0x4104f5,_0x3c5871){const _0x469237=_0x55f97b,_0x56aaf2=_0x10eceb?this[_0x469237(0x8fb)]:this[_0x469237(0x2a2)];if(!_0x56aaf2)return;if(!_0x56aaf2['bitmap'])return;const _0x34132e=_0x56aaf2['bitmap'];_0x34132e[_0x469237(0x4fc)]();if(_0x3c5871<=0x0)return;const _0x20fef1=_0x10eceb?this[_0x469237(0x96a)]/this['overallWidth']():this['innerHeight']/this[_0x469237(0x653)](),_0xe68fb0=_0x10eceb?Math['round'](_0x4104f5*_0x20fef1):0x0,_0x46daf3=_0x10eceb?0x0:Math[_0x469237(0x7dd)](_0x4104f5*_0x20fef1),_0x4e527c=_0x10eceb?Math[_0x469237(0x7dd)](_0x34132e[_0x469237(0x7cc)]*_0x20fef1):_0x34132e[_0x469237(0x7cc)],_0x36a0f3=_0x10eceb?_0x34132e[_0x469237(0x4f7)]:Math[_0x469237(0x7dd)](_0x34132e['height']*_0x20fef1),_0x236380=Window_Scrollable[_0x469237(0x596)],_0x4e2fcf=ColorManager[_0x469237(0x445)](_0x236380[_0x469237(0x644)]),_0x496e0d=ColorManager[_0x469237(0x445)](_0x236380[_0x469237(0x1d0)]),_0x4b274d=_0x236380[_0x469237(0x199)];_0x34132e[_0x469237(0x78b)]=_0x4b274d,_0x34132e[_0x469237(0x413)](_0x4e2fcf),_0x34132e[_0x469237(0x78b)]=0xff,_0x34132e['fillRect'](_0xe68fb0,_0x46daf3,_0x4e527c,_0x36a0f3,_0x496e0d);},Window_Base[_0x55f97b(0x616)][_0x55f97b(0x21e)]=function(_0x165771){const _0x1f6522=_0x55f97b,_0x561765=_0x165771?this[_0x1f6522(0x8fb)]:this[_0x1f6522(0x2a2)];if(!_0x561765)return;const _0x1f0f9d=Window_Scrollable[_0x1f6522(0x596)],_0x15136d=_0x1f0f9d[_0x1f6522(0x875)],_0x487246=_0x1f0f9d[_0x1f6522(0x86f)];if(!_0x561765[_0x1f6522(0x439)])return;_0x561765['x']=this[_0x1f6522(0x6d0)]+(_0x165771?_0x15136d:this['innerWidth']+_0x487246),_0x561765['y']=this[_0x1f6522(0x6d0)]+(_0x165771?this[_0x1f6522(0x949)]+_0x487246:_0x15136d);},Window_Selectable[_0x55f97b(0x616)]['cursorDown']=function(_0x1b8090){const _0x31db80=_0x55f97b;let _0x3eb406=this[_0x31db80(0x76d)]();const _0xd8a6d4=this[_0x31db80(0x7b1)](),_0x3e55fc=this['maxCols']();if(this[_0x31db80(0x96d)]()&&(_0x3eb406<_0xd8a6d4||_0x1b8090&&_0x3e55fc===0x1)){_0x3eb406+=_0x3e55fc;if(_0x3eb406>=_0xd8a6d4)_0x3eb406=_0xd8a6d4-0x1;this['smoothSelect'](_0x3eb406);}else!this[_0x31db80(0x96d)]()&&((_0x3eb406<_0xd8a6d4-_0x3e55fc||_0x1b8090&&_0x3e55fc===0x1)&&this['smoothSelect']((_0x3eb406+_0x3e55fc)%_0xd8a6d4));},VisuMZ['CoreEngine'][_0x55f97b(0x5bd)]=Window_Selectable[_0x55f97b(0x616)]['cursorDown'],Window_Selectable[_0x55f97b(0x616)][_0x55f97b(0x803)]=function(_0x27439b){const _0x2a4942=_0x55f97b;this[_0x2a4942(0x96d)]()&&_0x27439b&&this[_0x2a4942(0x27b)]()===0x1&&this[_0x2a4942(0x76d)]()===this[_0x2a4942(0x7b1)]()-0x1?this[_0x2a4942(0x2f2)](0x0):VisuMZ[_0x2a4942(0x4af)][_0x2a4942(0x5bd)][_0x2a4942(0x8a8)](this,_0x27439b);},Window_Selectable['prototype']['cursorUp']=function(_0x353ab2){const _0x567d6c=_0x55f97b;let _0x5000ad=Math['max'](0x0,this[_0x567d6c(0x76d)]());const _0x1fa685=this[_0x567d6c(0x7b1)](),_0x36eff9=this['maxCols']();if(this['isUseModernControls']()&&_0x5000ad>0x0||_0x353ab2&&_0x36eff9===0x1){_0x5000ad-=_0x36eff9;if(_0x5000ad<=0x0)_0x5000ad=0x0;this[_0x567d6c(0x2f2)](_0x5000ad);}else!this['isUseModernControls']()&&((_0x5000ad>=_0x36eff9||_0x353ab2&&_0x36eff9===0x1)&&this['smoothSelect']((_0x5000ad-_0x36eff9+_0x1fa685)%_0x1fa685));},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x8ee)]=Window_Selectable[_0x55f97b(0x616)][_0x55f97b(0x8ab)],Window_Selectable[_0x55f97b(0x616)][_0x55f97b(0x8ab)]=function(_0x171b7f){const _0x21a74b=_0x55f97b;this[_0x21a74b(0x96d)]()&&_0x171b7f&&this[_0x21a74b(0x27b)]()===0x1&&this[_0x21a74b(0x76d)]()===0x0?this['smoothSelect'](this[_0x21a74b(0x7b1)]()-0x1):VisuMZ['CoreEngine'][_0x21a74b(0x8ee)][_0x21a74b(0x8a8)](this,_0x171b7f);},Window_Selectable[_0x55f97b(0x616)][_0x55f97b(0x96d)]=function(){const _0xffa25d=_0x55f97b;return VisuMZ[_0xffa25d(0x4af)][_0xffa25d(0x386)][_0xffa25d(0x585)]['ModernControls'];},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x631)]=Window_Selectable[_0x55f97b(0x616)][_0x55f97b(0x8a7)],Window_Selectable[_0x55f97b(0x616)][_0x55f97b(0x8a7)]=function(){const _0x4713bc=_0x55f97b;this[_0x4713bc(0x96d)]()?(this['processCursorMoveModernControls'](),this['processCursorHomeEndTrigger']()):VisuMZ['CoreEngine'][_0x4713bc(0x631)][_0x4713bc(0x8a8)](this);},Window_Selectable[_0x55f97b(0x616)]['allowShiftScrolling']=function(){return!![];},Window_Selectable['prototype'][_0x55f97b(0x5e0)]=function(){const _0x2e230a=_0x55f97b;if(this[_0x2e230a(0x483)]()){const _0x1b5d0c=this[_0x2e230a(0x76d)]();Input[_0x2e230a(0x74e)]('down')&&(Input['isPressed'](_0x2e230a(0x4c6))&&this[_0x2e230a(0x358)]()?this[_0x2e230a(0x8ad)]():this[_0x2e230a(0x803)](Input[_0x2e230a(0x31e)](_0x2e230a(0x931)))),Input[_0x2e230a(0x74e)]('up')&&(Input['isPressed'](_0x2e230a(0x4c6))&&this[_0x2e230a(0x358)]()?this[_0x2e230a(0x5ae)]():this[_0x2e230a(0x8ab)](Input[_0x2e230a(0x31e)]('up'))),Input[_0x2e230a(0x74e)](_0x2e230a(0x7bf))&&this[_0x2e230a(0x93b)](Input[_0x2e230a(0x31e)](_0x2e230a(0x7bf))),Input[_0x2e230a(0x74e)](_0x2e230a(0x55f))&&this[_0x2e230a(0x625)](Input['isTriggered']('left')),!this['isHandled'](_0x2e230a(0x5be))&&Input[_0x2e230a(0x74e)](_0x2e230a(0x5be))&&this[_0x2e230a(0x8ad)](),!this[_0x2e230a(0x56b)](_0x2e230a(0x73d))&&Input['isRepeated'](_0x2e230a(0x73d))&&this[_0x2e230a(0x5ae)](),this[_0x2e230a(0x76d)]()!==_0x1b5d0c&&this[_0x2e230a(0x84a)]();}},Window_Selectable['prototype'][_0x55f97b(0x2b9)]=function(){const _0x32aa26=_0x55f97b;if(this['isCursorMovable']()){const _0x44d107=this[_0x32aa26(0x76d)]();Input[_0x32aa26(0x31e)](_0x32aa26(0x658))&&this['smoothSelect'](Math[_0x32aa26(0x43e)](this[_0x32aa26(0x76d)](),0x0)),Input[_0x32aa26(0x31e)](_0x32aa26(0x3fd))&&this[_0x32aa26(0x2f2)](Math[_0x32aa26(0x1fb)](this[_0x32aa26(0x76d)](),this[_0x32aa26(0x7b1)]()-0x1)),this['index']()!==_0x44d107&&this[_0x32aa26(0x84a)]();}},VisuMZ[_0x55f97b(0x4af)]['Window_Selectable_processTouch']=Window_Selectable['prototype'][_0x55f97b(0x3b1)],Window_Selectable[_0x55f97b(0x616)][_0x55f97b(0x3b1)]=function(){const _0x3f45dc=_0x55f97b;this[_0x3f45dc(0x96d)]()?this['processTouchModernControls']():VisuMZ[_0x3f45dc(0x4af)]['Window_Selectable_processTouch']['call'](this);},Window_Selectable[_0x55f97b(0x616)][_0x55f97b(0x1c6)]=function(){const _0x1613e7=_0x55f97b;VisuMZ['CoreEngine']['Window_Selectable_processTouch'][_0x1613e7(0x8a8)](this);},Window_Selectable[_0x55f97b(0x616)][_0x55f97b(0x6fe)]=function(){const _0x201fba=_0x55f97b;return VisuMZ[_0x201fba(0x4af)][_0x201fba(0x386)][_0x201fba(0x46e)]['ColSpacing'];},Window_Selectable[_0x55f97b(0x616)][_0x55f97b(0x665)]=function(){const _0x2f05d7=_0x55f97b;return VisuMZ[_0x2f05d7(0x4af)][_0x2f05d7(0x386)][_0x2f05d7(0x46e)][_0x2f05d7(0x840)];},Window_Selectable[_0x55f97b(0x616)][_0x55f97b(0x7ce)]=function(){const _0x5a4609=_0x55f97b;return Window_Scrollable[_0x5a4609(0x616)][_0x5a4609(0x7ce)][_0x5a4609(0x8a8)](this)+VisuMZ[_0x5a4609(0x4af)][_0x5a4609(0x386)]['Window'][_0x5a4609(0x835)];;},VisuMZ['CoreEngine'][_0x55f97b(0x2a9)]=Window_Selectable['prototype']['drawBackgroundRect'],Window_Selectable['prototype']['drawBackgroundRect']=function(_0x1cff92){const _0x20bede=_0x55f97b,_0x350e6c=VisuMZ['CoreEngine'][_0x20bede(0x386)][_0x20bede(0x46e)];if(_0x350e6c[_0x20bede(0x630)]===![])return;_0x350e6c[_0x20bede(0x85f)]?_0x350e6c[_0x20bede(0x85f)]['call'](this,_0x1cff92):VisuMZ['CoreEngine'][_0x20bede(0x2a9)][_0x20bede(0x8a8)](this,_0x1cff92);},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x3b2)]=Window_Gold['prototype'][_0x55f97b(0x285)],Window_Gold[_0x55f97b(0x616)][_0x55f97b(0x285)]=function(){const _0x562d1a=_0x55f97b;this[_0x562d1a(0x8ae)]()?this[_0x562d1a(0x36e)]():VisuMZ['CoreEngine'][_0x562d1a(0x3b2)][_0x562d1a(0x8a8)](this);},Window_Gold[_0x55f97b(0x616)][_0x55f97b(0x8ae)]=function(){const _0x3279f8=_0x55f97b;if(TextManager[_0x3279f8(0x86e)]!==this['currencyUnit']())return![];return VisuMZ[_0x3279f8(0x4af)]['Settings'][_0x3279f8(0x945)][_0x3279f8(0x8d5)];},Window_Gold[_0x55f97b(0x616)][_0x55f97b(0x36e)]=function(){const _0x73f24b=_0x55f97b;this[_0x73f24b(0x2ac)](),this['contents'][_0x73f24b(0x4fc)](),this[_0x73f24b(0x354)][_0x73f24b(0x697)]=VisuMZ[_0x73f24b(0x4af)][_0x73f24b(0x386)][_0x73f24b(0x945)][_0x73f24b(0x6e2)];const _0x5b04cd=VisuMZ[_0x73f24b(0x4af)][_0x73f24b(0x386)][_0x73f24b(0x945)][_0x73f24b(0x430)],_0x50a57e=this[_0x73f24b(0x330)](0x0);if(_0x5b04cd>0x0){const _0x42c1c7=ImageManager[_0x73f24b(0x1b2)]||0x20,_0xeb3a73=_0x42c1c7-ImageManager[_0x73f24b(0x448)],_0x3a692c=_0x50a57e['y']+(this[_0x73f24b(0x254)]()-ImageManager[_0x73f24b(0x447)])/0x2;this[_0x73f24b(0x516)](_0x5b04cd,_0x50a57e['x']+Math[_0x73f24b(0x6af)](_0xeb3a73/0x2),_0x3a692c);const _0x44302c=_0x42c1c7+0x4;_0x50a57e['x']+=_0x44302c,_0x50a57e['width']-=_0x44302c;}this[_0x73f24b(0x94a)](ColorManager[_0x73f24b(0x8e4)]()),this[_0x73f24b(0x590)](this[_0x73f24b(0x86e)](),_0x50a57e['x'],_0x50a57e['y'],_0x50a57e[_0x73f24b(0x7cc)],_0x73f24b(0x55f));const _0x379582=this['textWidth'](this[_0x73f24b(0x86e)]())+0x6;;_0x50a57e['x']+=_0x379582,_0x50a57e[_0x73f24b(0x7cc)]-=_0x379582,this[_0x73f24b(0x3f9)]();const _0x4bc678=this[_0x73f24b(0x808)](),_0x3c1b96=this[_0x73f24b(0x347)](this['_digitGrouping']?VisuMZ['GroupDigits'](this[_0x73f24b(0x808)]()):this[_0x73f24b(0x808)]());_0x3c1b96>_0x50a57e[_0x73f24b(0x7cc)]?this[_0x73f24b(0x590)](VisuMZ[_0x73f24b(0x4af)][_0x73f24b(0x386)]['Gold'][_0x73f24b(0x595)],_0x50a57e['x'],_0x50a57e['y'],_0x50a57e['width'],'right'):this[_0x73f24b(0x590)](this[_0x73f24b(0x808)](),_0x50a57e['x'],_0x50a57e['y'],_0x50a57e[_0x73f24b(0x7cc)],_0x73f24b(0x7bf)),this[_0x73f24b(0x2ac)]();},Window_StatusBase[_0x55f97b(0x616)][_0x55f97b(0x5e5)]=function(_0x260e4c,_0x1bc313,_0x563b10,_0x2de47f,_0x2e8642){const _0x168594=_0x55f97b;_0x2de47f=String(_0x2de47f||'')[_0x168594(0x427)]();if(VisuMZ[_0x168594(0x4af)][_0x168594(0x386)]['Param']['DrawIcons']){const _0x507586=VisuMZ[_0x168594(0x205)](_0x2de47f);if(_0x2e8642)this['drawIconBySize'](_0x507586,_0x260e4c,_0x1bc313,this[_0x168594(0x8fa)]()),_0x563b10-=this[_0x168594(0x8fa)]()+0x2,_0x260e4c+=this['gaugeLineHeight']()+0x2;else{const _0x1ee821=ImageManager[_0x168594(0x1b2)]||0x20,_0x215516=ImageManager[_0x168594(0x62b)]||0x20,_0x4f72a6=_0x1ee821-ImageManager[_0x168594(0x448)],_0x5ab2b0=_0x215516-ImageManager[_0x168594(0x447)];let _0x5e45fa=0x2,_0x559d7e=0x2;this[_0x168594(0x254)]()!==0x24&&(_0x559d7e=Math['floor']((this[_0x168594(0x254)]()-_0x215516)/0x2));const _0x26fafa=_0x260e4c+Math[_0x168594(0x8d7)](_0x4f72a6/0x2)+_0x5e45fa,_0xa5e008=_0x1bc313+Math[_0x168594(0x8d7)](_0x5ab2b0/0x2)+_0x559d7e;this[_0x168594(0x516)](_0x507586,_0x26fafa,_0xa5e008),_0x563b10-=_0x1ee821+0x4,_0x260e4c+=_0x1ee821+0x4;}}const _0x1360f7=TextManager[_0x168594(0x65f)](_0x2de47f);this[_0x168594(0x2ac)](),this[_0x168594(0x94a)](ColorManager[_0x168594(0x8e4)]()),_0x2e8642?(this['contents'][_0x168594(0x697)]=this['smallParamFontSize'](),this[_0x168594(0x354)][_0x168594(0x590)](_0x1360f7,_0x260e4c,_0x1bc313,_0x563b10,this[_0x168594(0x8fa)](),_0x168594(0x55f))):this[_0x168594(0x590)](_0x1360f7,_0x260e4c,_0x1bc313,_0x563b10),this[_0x168594(0x2ac)]();},Window_StatusBase[_0x55f97b(0x616)][_0x55f97b(0x490)]=function(){const _0x24fd25=_0x55f97b;return $gameSystem[_0x24fd25(0x42e)]()-0x8;},Window_StatusBase['prototype']['drawActorClass']=function(_0xab2e61,_0x316765,_0x2cc6ad,_0x4e51fb){const _0x2994d8=_0x55f97b;_0x4e51fb=_0x4e51fb||0xa8,this[_0x2994d8(0x3f9)]();if(VisuMZ[_0x2994d8(0x4af)][_0x2994d8(0x386)]['UI'][_0x2994d8(0x59c)])this[_0x2994d8(0x3d7)](_0xab2e61[_0x2994d8(0x8ed)]()['name'],_0x316765,_0x2cc6ad,_0x4e51fb);else{const _0x4d4e47=_0xab2e61[_0x2994d8(0x8ed)]()['name']['replace'](/\\I\[(\d+)\]/gi,'');this[_0x2994d8(0x590)](_0x4d4e47,_0x316765,_0x2cc6ad,_0x4e51fb);}},Window_StatusBase['prototype']['drawActorNickname']=function(_0xdb293e,_0x4736ba,_0x35ab02,_0x3adc2e){const _0x5d8be8=_0x55f97b;_0x3adc2e=_0x3adc2e||0x10e,this[_0x5d8be8(0x3f9)]();if(VisuMZ[_0x5d8be8(0x4af)][_0x5d8be8(0x386)]['UI']['TextCodeNicknames'])this['drawTextEx'](_0xdb293e[_0x5d8be8(0x845)](),_0x4736ba,_0x35ab02,_0x3adc2e);else{const _0x53b4e7=_0xdb293e[_0x5d8be8(0x845)]()['replace'](/\\I\[(\d+)\]/gi,'');this['drawText'](_0xdb293e[_0x5d8be8(0x845)](),_0x4736ba,_0x35ab02,_0x3adc2e);}},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x876)]=Window_StatusBase[_0x55f97b(0x616)][_0x55f97b(0x3a4)],Window_StatusBase[_0x55f97b(0x616)][_0x55f97b(0x3a4)]=function(_0x188bf5,_0x2de90a,_0x5848d6){const _0x1c46a8=_0x55f97b;if(VisuMZ[_0x1c46a8(0x4af)]['Settings'][_0x1c46a8(0x91f)][_0x1c46a8(0x760)]===![])return;if(this['isExpGaugeDrawn']())this[_0x1c46a8(0x3d3)](_0x188bf5,_0x2de90a,_0x5848d6);VisuMZ[_0x1c46a8(0x4af)][_0x1c46a8(0x876)][_0x1c46a8(0x8a8)](this,_0x188bf5,_0x2de90a,_0x5848d6);},Window_StatusBase['prototype'][_0x55f97b(0x964)]=function(){const _0xc558c=_0x55f97b;return VisuMZ[_0xc558c(0x4af)][_0xc558c(0x386)]['UI'][_0xc558c(0x1f1)];},Window_StatusBase[_0x55f97b(0x616)][_0x55f97b(0x3d3)]=function(_0x4279e4,_0x358c3f,_0x4084e4){const _0x57d60d=_0x55f97b;if(!_0x4279e4)return;if(!_0x4279e4[_0x57d60d(0x4ad)]())return;const _0xbec4cd=0x80,_0x13d63f=_0x4279e4[_0x57d60d(0x502)]();let _0x5a2b24=ColorManager[_0x57d60d(0x34e)](),_0x4e05d5=ColorManager[_0x57d60d(0x554)]();_0x13d63f>=0x1&&(_0x5a2b24=ColorManager[_0x57d60d(0x563)](),_0x4e05d5=ColorManager[_0x57d60d(0x3e5)]()),this[_0x57d60d(0x2cc)](_0x358c3f,_0x4084e4,_0xbec4cd,_0x13d63f,_0x5a2b24,_0x4e05d5);},Window_EquipStatus[_0x55f97b(0x616)]['drawAllParams']=function(){const _0x4695ef=_0x55f97b;let _0x4d6d00=0x0;for(const _0x34066d of VisuMZ[_0x4695ef(0x4af)][_0x4695ef(0x386)][_0x4695ef(0x91f)][_0x4695ef(0x3f4)]){const _0x333f0d=this[_0x4695ef(0x6a9)](),_0x25424f=this[_0x4695ef(0x696)](_0x4d6d00);this[_0x4695ef(0x80d)](_0x333f0d,_0x25424f,_0x34066d),_0x4d6d00++;}},Window_EquipStatus[_0x55f97b(0x616)]['drawParamName']=function(_0x95a9df,_0x5ec4fa,_0x5136a6){const _0x337273=_0x55f97b,_0x5879a0=this[_0x337273(0x946)]()-this[_0x337273(0x6a9)]()*0x2;this[_0x337273(0x5e5)](_0x95a9df,_0x5ec4fa,_0x5879a0,_0x5136a6,![]);},Window_EquipStatus[_0x55f97b(0x616)]['drawCurrentParam']=function(_0x874244,_0x443962,_0x37ed31){const _0x537451=_0x55f97b,_0x59a546=this[_0x537451(0x5db)]();this[_0x537451(0x3f9)](),this[_0x537451(0x590)](this[_0x537451(0x1da)][_0x537451(0x955)](_0x37ed31,!![]),_0x874244,_0x443962,_0x59a546,_0x537451(0x7bf));},Window_EquipStatus[_0x55f97b(0x616)][_0x55f97b(0x3ca)]=function(_0x33db8c,_0x55df30){const _0x2dfd53=_0x55f97b,_0x5569ec=this[_0x2dfd53(0x2c8)]();this[_0x2dfd53(0x94a)](ColorManager[_0x2dfd53(0x8e4)]());const _0x2d8667=VisuMZ[_0x2dfd53(0x4af)][_0x2dfd53(0x386)]['UI']['ParamArrow'];this[_0x2dfd53(0x590)](_0x2d8667,_0x33db8c,_0x55df30,_0x5569ec,'center');},Window_EquipStatus['prototype'][_0x55f97b(0x89d)]=function(_0x508f06,_0x53a9db,_0x3c5d7b){const _0x1d21a3=_0x55f97b,_0x5396d1=this['paramWidth'](),_0x15e985=this[_0x1d21a3(0x28e)]['paramValueByName'](_0x3c5d7b),_0x2fadb5=_0x15e985-this['_actor'][_0x1d21a3(0x955)](_0x3c5d7b);this['changeTextColor'](ColorManager['paramchangeTextColor'](_0x2fadb5)),this['drawText'](this[_0x1d21a3(0x28e)][_0x1d21a3(0x955)](_0x3c5d7b,!![]),_0x508f06,_0x53a9db,_0x5396d1,_0x1d21a3(0x7bf));},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x4ec)]=Window_EquipItem[_0x55f97b(0x616)]['isEnabled'],Window_EquipItem[_0x55f97b(0x616)][_0x55f97b(0x745)]=function(_0x18c5e0){const _0x58f6aa=_0x55f97b;return _0x18c5e0&&this[_0x58f6aa(0x1da)]?this[_0x58f6aa(0x1da)][_0x58f6aa(0x1c0)](_0x18c5e0):VisuMZ[_0x58f6aa(0x4af)][_0x58f6aa(0x4ec)][_0x58f6aa(0x8a8)](this,_0x18c5e0);},Window_StatusParams[_0x55f97b(0x616)][_0x55f97b(0x7b1)]=function(){const _0x34267b=_0x55f97b;return VisuMZ['CoreEngine']['Settings'][_0x34267b(0x91f)][_0x34267b(0x3f4)][_0x34267b(0x382)];},Window_StatusParams['prototype'][_0x55f97b(0x80d)]=function(_0x19fdb3){const _0x20ca7b=_0x55f97b,_0x2166bb=this[_0x20ca7b(0x330)](_0x19fdb3),_0x9d20b6=VisuMZ['CoreEngine'][_0x20ca7b(0x386)][_0x20ca7b(0x91f)][_0x20ca7b(0x3f4)][_0x19fdb3],_0x18810d=TextManager[_0x20ca7b(0x65f)](_0x9d20b6),_0x132edd=this[_0x20ca7b(0x1da)][_0x20ca7b(0x955)](_0x9d20b6,!![]);this[_0x20ca7b(0x5e5)](_0x2166bb['x'],_0x2166bb['y'],0xa0,_0x9d20b6,![]),this[_0x20ca7b(0x3f9)](),this[_0x20ca7b(0x590)](_0x132edd,_0x2166bb['x']+0xa0,_0x2166bb['y'],0x3c,_0x20ca7b(0x7bf));};if(VisuMZ['CoreEngine']['Settings'][_0x55f97b(0x4d6)][_0x55f97b(0x933)]){VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x386)]['KeyboardInput'][_0x55f97b(0x21b)]&&(Window_NameInput[_0x55f97b(0x1a7)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x55f97b(0x1c8),'OK']);;VisuMZ[_0x55f97b(0x4af)]['Window_NameInput_initialize']=Window_NameInput['prototype'][_0x55f97b(0x374)],Window_NameInput['prototype'][_0x55f97b(0x374)]=function(_0x31af1e){const _0x348e03=_0x55f97b;this[_0x348e03(0x3a9)]=this[_0x348e03(0x378)](),VisuMZ[_0x348e03(0x4af)][_0x348e03(0x486)][_0x348e03(0x8a8)](this,_0x31af1e),this[_0x348e03(0x3a9)]==='default'?this[_0x348e03(0x7e2)](0x0):(Input[_0x348e03(0x4fc)](),this[_0x348e03(0x3c5)]());},Window_NameInput[_0x55f97b(0x616)]['defaultInputMode']=function(){const _0x5d1cc8=_0x55f97b;if(Input[_0x5d1cc8(0x5b9)]())return _0x5d1cc8(0x754);return VisuMZ[_0x5d1cc8(0x4af)]['Settings']['KeyboardInput'][_0x5d1cc8(0x913)]||_0x5d1cc8(0x51f);},VisuMZ[_0x55f97b(0x4af)]['Window_NameInput_processHandling']=Window_NameInput[_0x55f97b(0x616)][_0x55f97b(0x700)],Window_NameInput[_0x55f97b(0x616)][_0x55f97b(0x700)]=function(){const _0x4702e5=_0x55f97b;if(!this['isOpen']())return;if(!this[_0x4702e5(0x37e)])return;if(this[_0x4702e5(0x3a9)]===_0x4702e5(0x51f)&&Input['isGamepadTriggered']())this[_0x4702e5(0x49b)](_0x4702e5(0x754));else{if(Input[_0x4702e5(0x216)](_0x4702e5(0x37f)))Input[_0x4702e5(0x4fc)](),this['processBack']();else{if(Input[_0x4702e5(0x31e)]('tab'))Input[_0x4702e5(0x4fc)](),this[_0x4702e5(0x3a9)]==='keyboard'?this[_0x4702e5(0x49b)](_0x4702e5(0x754)):this[_0x4702e5(0x49b)](_0x4702e5(0x51f));else{if(this[_0x4702e5(0x3a9)]===_0x4702e5(0x51f))this[_0x4702e5(0x2c6)]();else Input[_0x4702e5(0x216)]('escape')?(Input[_0x4702e5(0x4fc)](),this[_0x4702e5(0x49b)](_0x4702e5(0x51f))):VisuMZ[_0x4702e5(0x4af)][_0x4702e5(0x26b)][_0x4702e5(0x8a8)](this);}}}},VisuMZ[_0x55f97b(0x4af)]['Window_NameInput_processTouch']=Window_NameInput[_0x55f97b(0x616)][_0x55f97b(0x3b1)],Window_NameInput[_0x55f97b(0x616)]['processTouch']=function(){const _0x10f538=_0x55f97b;if(!this[_0x10f538(0x58b)]())return;if(this[_0x10f538(0x3a9)]==='keyboard'){if(TouchInput[_0x10f538(0x31e)]()&&this[_0x10f538(0x4d3)]())this[_0x10f538(0x49b)](_0x10f538(0x754));else TouchInput['isCancelled']()&&this[_0x10f538(0x49b)](_0x10f538(0x754));}else VisuMZ[_0x10f538(0x4af)][_0x10f538(0x7db)][_0x10f538(0x8a8)](this);},Window_NameInput['prototype'][_0x55f97b(0x2c6)]=function(){const _0x34217e=_0x55f97b;if(Input['isSpecialCode'](_0x34217e(0x676)))Input[_0x34217e(0x4fc)](),this[_0x34217e(0x37b)]();else{if(Input['_inputString']!==undefined){let _0x17d343=Input[_0x34217e(0x2c7)],_0x4dde63=_0x17d343[_0x34217e(0x382)];for(let _0x10865f=0x0;_0x10865f<_0x4dde63;++_0x10865f){this[_0x34217e(0x55e)][_0x34217e(0x86a)](_0x17d343[_0x10865f])?SoundManager['playOk']():SoundManager['playBuzzer']();}Input[_0x34217e(0x4fc)]();}}},Window_NameInput[_0x55f97b(0x616)][_0x55f97b(0x49b)]=function(_0x50fdf3){const _0x555ae1=_0x55f97b;let _0x416359=this[_0x555ae1(0x3a9)];this[_0x555ae1(0x3a9)]=_0x50fdf3,_0x416359!==this['_mode']&&(this[_0x555ae1(0x285)](),SoundManager[_0x555ae1(0x4f3)](),this[_0x555ae1(0x3a9)]===_0x555ae1(0x754)?this['select'](0x0):this[_0x555ae1(0x7e2)](-0x1));},VisuMZ['CoreEngine']['Window_NameInput_cursorDown']=Window_NameInput[_0x55f97b(0x616)][_0x55f97b(0x803)],Window_NameInput[_0x55f97b(0x616)][_0x55f97b(0x803)]=function(_0x23c099){const _0x45dbaf=_0x55f97b;if(this[_0x45dbaf(0x3a9)]===_0x45dbaf(0x51f)&&!Input[_0x45dbaf(0x893)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x45dbaf(0x4af)]['Window_NameInput_cursorDown'][_0x45dbaf(0x8a8)](this,_0x23c099),this[_0x45dbaf(0x49b)](_0x45dbaf(0x754));},VisuMZ['CoreEngine'][_0x55f97b(0x884)]=Window_NameInput[_0x55f97b(0x616)]['cursorUp'],Window_NameInput[_0x55f97b(0x616)][_0x55f97b(0x8ab)]=function(_0x3a87d3){const _0x2b0556=_0x55f97b;if(this['_mode']==='keyboard'&&!Input[_0x2b0556(0x893)]())return;if(Input['isNumpadPressed']())return;VisuMZ['CoreEngine']['Window_NameInput_cursorUp'][_0x2b0556(0x8a8)](this,_0x3a87d3),this[_0x2b0556(0x49b)]('default');},VisuMZ['CoreEngine'][_0x55f97b(0x1d8)]=Window_NameInput[_0x55f97b(0x616)][_0x55f97b(0x93b)],Window_NameInput[_0x55f97b(0x616)][_0x55f97b(0x93b)]=function(_0x54f6f4){const _0x4372c2=_0x55f97b;if(this[_0x4372c2(0x3a9)]==='keyboard'&&!Input[_0x4372c2(0x893)]())return;if(Input[_0x4372c2(0x53a)]())return;VisuMZ['CoreEngine'][_0x4372c2(0x1d8)]['call'](this,_0x54f6f4),this[_0x4372c2(0x49b)](_0x4372c2(0x754));},VisuMZ[_0x55f97b(0x4af)]['Window_NameInput_cursorLeft']=Window_NameInput[_0x55f97b(0x616)][_0x55f97b(0x625)],Window_NameInput[_0x55f97b(0x616)][_0x55f97b(0x625)]=function(_0x4909b4){const _0x51a942=_0x55f97b;if(this[_0x51a942(0x3a9)]===_0x51a942(0x51f)&&!Input['isArrowPressed']())return;if(Input[_0x51a942(0x53a)]())return;VisuMZ['CoreEngine'][_0x51a942(0x910)][_0x51a942(0x8a8)](this,_0x4909b4),this[_0x51a942(0x49b)](_0x51a942(0x754));},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x744)]=Window_NameInput[_0x55f97b(0x616)][_0x55f97b(0x8ad)],Window_NameInput[_0x55f97b(0x616)]['cursorPagedown']=function(){const _0x279956=_0x55f97b;if(this['_mode']===_0x279956(0x51f))return;if(Input[_0x279956(0x53a)]())return;VisuMZ[_0x279956(0x4af)][_0x279956(0x744)][_0x279956(0x8a8)](this),this['switchModes'](_0x279956(0x754));},VisuMZ['CoreEngine'][_0x55f97b(0x1b5)]=Window_NameInput['prototype'][_0x55f97b(0x5ae)],Window_NameInput[_0x55f97b(0x616)]['cursorPageup']=function(){const _0x2eb1b3=_0x55f97b;if(this['_mode']===_0x2eb1b3(0x51f))return;if(Input['isNumpadPressed']())return;VisuMZ[_0x2eb1b3(0x4af)]['Window_NameInput_cursorPageup'][_0x2eb1b3(0x8a8)](this),this[_0x2eb1b3(0x49b)](_0x2eb1b3(0x754));},VisuMZ[_0x55f97b(0x4af)]['Window_NameInput_refresh']=Window_NameInput[_0x55f97b(0x616)][_0x55f97b(0x285)],Window_NameInput[_0x55f97b(0x616)][_0x55f97b(0x285)]=function(){const _0x3c26df=_0x55f97b;if(this[_0x3c26df(0x3a9)]==='keyboard'){this[_0x3c26df(0x354)][_0x3c26df(0x4fc)](),this[_0x3c26df(0x211)][_0x3c26df(0x4fc)](),this[_0x3c26df(0x3f9)]();let _0x57689a=VisuMZ['CoreEngine'][_0x3c26df(0x386)][_0x3c26df(0x4d6)][_0x3c26df(0x1e2)][_0x3c26df(0x43c)]('\x0a'),_0x365971=_0x57689a['length'],_0x19cdc6=(this[_0x3c26df(0x949)]-_0x365971*this[_0x3c26df(0x254)]())/0x2;for(let _0x4aad4a=0x0;_0x4aad4a<_0x365971;++_0x4aad4a){let _0xcf2379=_0x57689a[_0x4aad4a],_0x23694f=this[_0x3c26df(0x974)](_0xcf2379)[_0x3c26df(0x7cc)],_0x17c824=Math[_0x3c26df(0x8d7)]((this[_0x3c26df(0x354)]['width']-_0x23694f)/0x2);this[_0x3c26df(0x3d7)](_0xcf2379,_0x17c824,_0x19cdc6),_0x19cdc6+=this[_0x3c26df(0x254)]();}}else VisuMZ[_0x3c26df(0x4af)]['Window_NameInput_refresh'][_0x3c26df(0x8a8)](this);};};VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x8b8)]=Window_ShopSell[_0x55f97b(0x616)][_0x55f97b(0x745)],Window_ShopSell[_0x55f97b(0x616)][_0x55f97b(0x745)]=function(_0x3b865a){const _0x4423c6=_0x55f97b;return VisuMZ[_0x4423c6(0x4af)][_0x4423c6(0x386)][_0x4423c6(0x585)]['KeyItemProtect']&&DataManager['isKeyItem'](_0x3b865a)?![]:VisuMZ[_0x4423c6(0x4af)][_0x4423c6(0x8b8)]['call'](this,_0x3b865a);},Window_NumberInput[_0x55f97b(0x616)]['isUseModernControls']=function(){return![];};VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x386)]['KeyboardInput'][_0x55f97b(0x1b6)]&&(VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x537)]=Window_NumberInput[_0x55f97b(0x616)][_0x55f97b(0x35f)],Window_NumberInput[_0x55f97b(0x616)][_0x55f97b(0x35f)]=function(){const _0x542335=_0x55f97b;VisuMZ[_0x542335(0x4af)]['Window_NumberInput_start'][_0x542335(0x8a8)](this),this[_0x542335(0x7e2)](this[_0x542335(0x82f)]-0x1),Input[_0x542335(0x4fc)]();},VisuMZ['CoreEngine'][_0x55f97b(0x1f0)]=Window_NumberInput[_0x55f97b(0x616)][_0x55f97b(0x64c)],Window_NumberInput['prototype'][_0x55f97b(0x64c)]=function(){const _0x4995df=_0x55f97b;if(!this[_0x4995df(0x58b)]())return;if(Input['isNumpadPressed']())this[_0x4995df(0x6c8)]();else{if(Input['isSpecialCode']('backspace'))this[_0x4995df(0x3d1)]();else{if(Input[_0x4995df(0x775)]===0x2e)this[_0x4995df(0x414)]();else{if(Input[_0x4995df(0x775)]===0x24)this['processKeyboardHome']();else Input[_0x4995df(0x775)]===0x23?this[_0x4995df(0x259)]():VisuMZ[_0x4995df(0x4af)][_0x4995df(0x1f0)][_0x4995df(0x8a8)](this);}}}},Window_NumberInput[_0x55f97b(0x616)]['processCursorMove']=function(){const _0xaa94f9=_0x55f97b;if(!this[_0xaa94f9(0x483)]())return;Input[_0xaa94f9(0x53a)]()?this[_0xaa94f9(0x6c8)]():Window_Selectable[_0xaa94f9(0x616)][_0xaa94f9(0x8a7)]['call'](this);},Window_NumberInput[_0x55f97b(0x616)][_0x55f97b(0x2b9)]=function(){},Window_NumberInput[_0x55f97b(0x616)][_0x55f97b(0x6c8)]=function(){const _0x3ef51d=_0x55f97b;if(String(this[_0x3ef51d(0x615)])[_0x3ef51d(0x382)]>=this[_0x3ef51d(0x82f)])return;const _0x324d9b=Number(String(this['_number'])+Input['_inputString']);if(isNaN(_0x324d9b))return;this[_0x3ef51d(0x615)]=_0x324d9b;const _0x26b14d='9'[_0x3ef51d(0x556)](this[_0x3ef51d(0x82f)]);this[_0x3ef51d(0x615)]=this['_number']['clamp'](0x0,_0x26b14d),Input[_0x3ef51d(0x4fc)](),this[_0x3ef51d(0x285)](),SoundManager[_0x3ef51d(0x57b)](),this[_0x3ef51d(0x7e2)](this[_0x3ef51d(0x82f)]-0x1);},Window_NumberInput[_0x55f97b(0x616)]['processKeyboardBackspace']=function(){const _0x177f85=_0x55f97b;this[_0x177f85(0x615)]=Number(String(this['_number'])['slice'](0x0,-0x1)),this['_number']=Math['max'](0x0,this[_0x177f85(0x615)]),Input[_0x177f85(0x4fc)](),this['refresh'](),SoundManager[_0x177f85(0x57b)](),this[_0x177f85(0x7e2)](this[_0x177f85(0x82f)]-0x1);},Window_NumberInput[_0x55f97b(0x616)][_0x55f97b(0x414)]=function(){const _0x26c41a=_0x55f97b;this[_0x26c41a(0x615)]=Number(String(this['_number'])[_0x26c41a(0x534)](0x1)),this[_0x26c41a(0x615)]=Math[_0x26c41a(0x1fb)](0x0,this['_number']),Input['clear'](),this[_0x26c41a(0x285)](),SoundManager[_0x26c41a(0x57b)](),this[_0x26c41a(0x7e2)](this['_maxDigits']-0x1);},Window_NumberInput[_0x55f97b(0x616)][_0x55f97b(0x4a6)]=function(){const _0x2a0a6e=_0x55f97b;if(this[_0x2a0a6e(0x76d)]()===0x0)return;Input['clear'](),this[_0x2a0a6e(0x285)](),SoundManager['playCursor'](),this[_0x2a0a6e(0x7e2)](0x0);},Window_NumberInput[_0x55f97b(0x616)][_0x55f97b(0x259)]=function(){const _0x1d74b3=_0x55f97b;if(this[_0x1d74b3(0x76d)]()===this[_0x1d74b3(0x82f)]-0x1)return;Input[_0x1d74b3(0x4fc)](),this[_0x1d74b3(0x285)](),SoundManager[_0x1d74b3(0x57b)](),this[_0x1d74b3(0x7e2)](this[_0x1d74b3(0x82f)]-0x1);});;VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x250)]=Window_MapName['prototype'][_0x55f97b(0x285)],Window_MapName[_0x55f97b(0x616)][_0x55f97b(0x285)]=function(){const _0x302b29=_0x55f97b;VisuMZ[_0x302b29(0x4af)]['Settings']['QoL'][_0x302b29(0x828)]?this['refreshWithTextCodeSupport']():VisuMZ[_0x302b29(0x4af)][_0x302b29(0x250)][_0x302b29(0x8a8)](this);},Window_MapName[_0x55f97b(0x616)]['refreshWithTextCodeSupport']=function(){const _0x48784f=_0x55f97b;this['contents']['clear']();if($gameMap[_0x48784f(0x836)]()){const _0x23dac4=this[_0x48784f(0x96a)];this['drawBackground'](0x0,0x0,_0x23dac4,this[_0x48784f(0x254)]());const _0xa720e2=this[_0x48784f(0x974)]($gameMap['displayName']())[_0x48784f(0x7cc)];this[_0x48784f(0x3d7)]($gameMap[_0x48784f(0x836)](),Math['floor']((_0x23dac4-_0xa720e2)/0x2),0x0);}},Window_TitleCommand[_0x55f97b(0x322)]=VisuMZ['CoreEngine'][_0x55f97b(0x386)][_0x55f97b(0x91e)],Window_TitleCommand['prototype'][_0x55f97b(0x6fb)]=function(){this['makeCoreEngineCommandList']();},Window_TitleCommand[_0x55f97b(0x616)][_0x55f97b(0x295)]=function(){const _0x5a4ccf=_0x55f97b;for(const _0x3f3adc of Window_TitleCommand[_0x5a4ccf(0x322)]){if(_0x3f3adc[_0x5a4ccf(0x847)][_0x5a4ccf(0x8a8)](this)){const _0x4bc32c=_0x3f3adc['Symbol'];let _0xccf49b=_0x3f3adc[_0x5a4ccf(0x214)];if(['',_0x5a4ccf(0x5a5)][_0x5a4ccf(0x3e4)](_0xccf49b))_0xccf49b=_0x3f3adc[_0x5a4ccf(0x4b3)][_0x5a4ccf(0x8a8)](this);const _0x5c8d69=_0x3f3adc['EnableJS'][_0x5a4ccf(0x8a8)](this),_0x407120=_0x3f3adc[_0x5a4ccf(0x344)]['call'](this);this['addCommand'](_0xccf49b,_0x4bc32c,_0x5c8d69,_0x407120),this[_0x5a4ccf(0x1bb)](_0x4bc32c,_0x3f3adc[_0x5a4ccf(0x70a)][_0x5a4ccf(0x5cb)](this,_0x407120));}}},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x209)]=Window_TitleCommand[_0x55f97b(0x616)]['selectLast'],Window_TitleCommand[_0x55f97b(0x616)][_0x55f97b(0x6a4)]=function(){const _0x3473e6=_0x55f97b;VisuMZ[_0x3473e6(0x4af)][_0x3473e6(0x209)]['call'](this);if(!Window_TitleCommand[_0x3473e6(0x860)])return;const _0x2cccb4=this[_0x3473e6(0x815)](Window_TitleCommand[_0x3473e6(0x860)]),_0x56ead6=Math['floor'](this[_0x3473e6(0x636)]()/0x2)-0x1;this[_0x3473e6(0x2f2)](_0x2cccb4),this['_scrollDuration']>0x1&&(this[_0x3473e6(0x6e3)]=0x1,this[_0x3473e6(0x61a)]()),this[_0x3473e6(0x2ba)](_0x2cccb4-_0x56ead6);},Window_GameEnd[_0x55f97b(0x322)]=VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x386)][_0x55f97b(0x265)][_0x55f97b(0x611)][_0x55f97b(0x379)],Window_GameEnd[_0x55f97b(0x616)][_0x55f97b(0x6fb)]=function(){const _0x2b0df6=_0x55f97b;this[_0x2b0df6(0x295)]();},Window_GameEnd[_0x55f97b(0x616)][_0x55f97b(0x295)]=function(){const _0x4ddaab=_0x55f97b;for(const _0x30fba2 of Window_GameEnd['_commandList']){if(_0x30fba2['ShowJS']['call'](this)){const _0x37db0a=_0x30fba2[_0x4ddaab(0x8c2)];let _0x1a1652=_0x30fba2[_0x4ddaab(0x214)];if(['',_0x4ddaab(0x5a5)][_0x4ddaab(0x3e4)](_0x1a1652))_0x1a1652=_0x30fba2[_0x4ddaab(0x4b3)][_0x4ddaab(0x8a8)](this);const _0x4f8261=_0x30fba2[_0x4ddaab(0x8ef)]['call'](this),_0x1c22f6=_0x30fba2[_0x4ddaab(0x344)][_0x4ddaab(0x8a8)](this);this[_0x4ddaab(0x45e)](_0x1a1652,_0x37db0a,_0x4f8261,_0x1c22f6),this['setHandler'](_0x37db0a,_0x30fba2[_0x4ddaab(0x70a)][_0x4ddaab(0x5cb)](this,_0x1c22f6));}}};function Window_ButtonAssist(){const _0x2a0e1d=_0x55f97b;this[_0x2a0e1d(0x374)](...arguments);}Window_ButtonAssist['prototype']=Object[_0x55f97b(0x226)](Window_Base[_0x55f97b(0x616)]),Window_ButtonAssist[_0x55f97b(0x616)][_0x55f97b(0x6ac)]=Window_ButtonAssist,Window_ButtonAssist[_0x55f97b(0x616)][_0x55f97b(0x374)]=function(_0x3dbbce){const _0x29f82d=_0x55f97b;this[_0x29f82d(0x43b)]={},Window_Base[_0x29f82d(0x616)][_0x29f82d(0x374)][_0x29f82d(0x8a8)](this,_0x3dbbce),this['setBackgroundType'](VisuMZ['CoreEngine'][_0x29f82d(0x386)][_0x29f82d(0x6ec)][_0x29f82d(0x50d)]||0x0),this[_0x29f82d(0x285)]();},Window_ButtonAssist[_0x55f97b(0x616)]['lineHeight']=function(){const _0xbc7192=_0x55f97b;return this[_0xbc7192(0x949)]||Window_Base[_0xbc7192(0x616)]['lineHeight'][_0xbc7192(0x8a8)](this);},Window_ButtonAssist['prototype'][_0x55f97b(0x75c)]=function(){const _0x316aa5=_0x55f97b;this[_0x316aa5(0x354)][_0x316aa5(0x697)]<=0x60&&(this[_0x316aa5(0x354)][_0x316aa5(0x697)]+=0x6);},Window_ButtonAssist[_0x55f97b(0x616)][_0x55f97b(0x2e2)]=function(){const _0x572fd0=_0x55f97b;this[_0x572fd0(0x354)][_0x572fd0(0x697)]>=0x18&&(this[_0x572fd0(0x354)][_0x572fd0(0x697)]-=0x6);},Window_ButtonAssist[_0x55f97b(0x616)][_0x55f97b(0x94f)]=function(){const _0x394d51=_0x55f97b;Window_Base[_0x394d51(0x616)][_0x394d51(0x94f)][_0x394d51(0x8a8)](this),this[_0x394d51(0x6dc)]();},Window_ButtonAssist[_0x55f97b(0x616)][_0x55f97b(0x8ca)]=function(){const _0x5d6e26=_0x55f97b;this[_0x5d6e26(0x6d0)]=SceneManager[_0x5d6e26(0x49f)][_0x5d6e26(0x61c)]()!==_0x5d6e26(0x944)?0x0:0x8;},Window_ButtonAssist['prototype']['updateKeyText']=function(){const _0x345eea=_0x55f97b,_0x438024=SceneManager['_scene'];for(let _0x823b87=0x1;_0x823b87<=0x5;_0x823b87++){if(this[_0x345eea(0x43b)]['key%1'[_0x345eea(0x55a)](_0x823b87)]!==_0x438024[_0x345eea(0x705)['format'](_0x823b87)]())return this[_0x345eea(0x285)]();if(this[_0x345eea(0x43b)]['text%1'['format'](_0x823b87)]!==_0x438024['buttonAssistText%1'[_0x345eea(0x55a)](_0x823b87)]())return this[_0x345eea(0x285)]();}},Window_ButtonAssist[_0x55f97b(0x616)][_0x55f97b(0x285)]=function(){const _0x35769c=_0x55f97b;this[_0x35769c(0x354)][_0x35769c(0x4fc)]();for(let _0x2330de=0x1;_0x2330de<=0x5;_0x2330de++){this[_0x35769c(0x240)](_0x2330de);}},Window_ButtonAssist['prototype'][_0x55f97b(0x240)]=function(_0x2e4cb3){const _0x3b7baf=_0x55f97b,_0x25e61b=this[_0x3b7baf(0x96a)]/0x5,_0x4a0a72=SceneManager[_0x3b7baf(0x49f)],_0x17c24e=_0x4a0a72[_0x3b7baf(0x705)[_0x3b7baf(0x55a)](_0x2e4cb3)](),_0x30b1f4=_0x4a0a72['buttonAssistText%1'[_0x3b7baf(0x55a)](_0x2e4cb3)]();this[_0x3b7baf(0x43b)][_0x3b7baf(0x3df)[_0x3b7baf(0x55a)](_0x2e4cb3)]=_0x17c24e,this[_0x3b7baf(0x43b)][_0x3b7baf(0x5eb)[_0x3b7baf(0x55a)](_0x2e4cb3)]=_0x30b1f4;if(_0x17c24e==='')return;if(_0x30b1f4==='')return;const _0x5b796d=_0x4a0a72[_0x3b7baf(0x947)[_0x3b7baf(0x55a)](_0x2e4cb3)](),_0x5ef924=this[_0x3b7baf(0x6a9)](),_0x2d1b8e=_0x25e61b*(_0x2e4cb3-0x1)+_0x5ef924+_0x5b796d,_0x1ea653=VisuMZ[_0x3b7baf(0x4af)][_0x3b7baf(0x386)]['ButtonAssist']['TextFmt'];this[_0x3b7baf(0x3d7)](_0x1ea653['format'](_0x17c24e,_0x30b1f4),_0x2d1b8e,0x0,_0x25e61b-_0x5ef924*0x2);},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x381)]=Game_Interpreter[_0x55f97b(0x616)]['updateWaitMode'],Game_Interpreter[_0x55f97b(0x616)][_0x55f97b(0x685)]=function(){const _0x1e7383=_0x55f97b;if($gameTemp[_0x1e7383(0x89f)]!==undefined)return VisuMZ[_0x1e7383(0x4af)][_0x1e7383(0x935)]();return VisuMZ[_0x1e7383(0x4af)][_0x1e7383(0x381)][_0x1e7383(0x8a8)](this);},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x935)]=function(){const _0x40005d=_0x55f97b,_0x1ab2ab=$gameTemp[_0x40005d(0x89f)]||0x0;(_0x1ab2ab<0x0||_0x1ab2ab>0x64||TouchInput[_0x40005d(0x423)]()||Input['isTriggered']('cancel'))&&($gameTemp[_0x40005d(0x89f)]=undefined,Input['clear'](),TouchInput['clear']());const _0x2049b5=$gameScreen[_0x40005d(0x32b)](_0x1ab2ab);return _0x2049b5&&(_0x2049b5['_x']=TouchInput['_x'],_0x2049b5['_y']=TouchInput['_y']),VisuMZ[_0x40005d(0x4af)]['updatePictureCoordinates'](),$gameTemp['_pictureCoordinatesMode']!==undefined;},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x68d)]=function(){const _0x18de44=_0x55f97b,_0xc671c6=SceneManager[_0x18de44(0x49f)];if(!_0xc671c6)return;!_0xc671c6['_pictureCoordinatesWindow']&&(SoundManager['playLoad'](),_0xc671c6[_0x18de44(0x234)]=new Window_PictureCoordinates(),_0xc671c6['addChild'](_0xc671c6[_0x18de44(0x234)])),$gameTemp[_0x18de44(0x89f)]===undefined&&(SoundManager['playCancel'](),_0xc671c6[_0x18de44(0x3bc)](_0xc671c6[_0x18de44(0x234)]),_0xc671c6[_0x18de44(0x234)]=undefined);};function Window_PictureCoordinates(){this['initialize'](...arguments);}Window_PictureCoordinates[_0x55f97b(0x616)]=Object['create'](Window_Base[_0x55f97b(0x616)]),Window_PictureCoordinates[_0x55f97b(0x616)]['constructor']=Window_PictureCoordinates,Window_PictureCoordinates[_0x55f97b(0x616)][_0x55f97b(0x374)]=function(){const _0x5b9a54=_0x55f97b;this[_0x5b9a54(0x266)]=_0x5b9a54(0x3ac),this[_0x5b9a54(0x7fd)]='nah',this['_lastY']=_0x5b9a54(0x3ac);const _0x128e4a=this[_0x5b9a54(0x82d)]();Window_Base[_0x5b9a54(0x616)][_0x5b9a54(0x374)][_0x5b9a54(0x8a8)](this,_0x128e4a),this[_0x5b9a54(0x6c7)](0x2);},Window_PictureCoordinates['prototype'][_0x55f97b(0x82d)]=function(){const _0x470fe8=_0x55f97b;let _0x475912=0x0,_0x4c8784=Graphics[_0x470fe8(0x4f7)]-this['lineHeight'](),_0x20d637=Graphics['width'],_0x38c569=this['lineHeight']();return new Rectangle(_0x475912,_0x4c8784,_0x20d637,_0x38c569);},Window_PictureCoordinates[_0x55f97b(0x616)][_0x55f97b(0x8ca)]=function(){const _0x41e66e=_0x55f97b;this[_0x41e66e(0x6d0)]=0x0;},Window_PictureCoordinates[_0x55f97b(0x616)][_0x55f97b(0x94f)]=function(){const _0x413fb4=_0x55f97b;Window_Base[_0x413fb4(0x616)][_0x413fb4(0x94f)][_0x413fb4(0x8a8)](this),this[_0x413fb4(0x1b0)]();},Window_PictureCoordinates[_0x55f97b(0x616)]['updateData']=function(){const _0x5b53f0=_0x55f97b;if(!this[_0x5b53f0(0x6df)]())return;this[_0x5b53f0(0x285)]();},Window_PictureCoordinates[_0x55f97b(0x616)][_0x55f97b(0x6df)]=function(){const _0x47c879=_0x55f97b,_0x10d3cd=$gameTemp[_0x47c879(0x89f)],_0x1afe0b=$gameScreen[_0x47c879(0x32b)](_0x10d3cd);return _0x1afe0b?this[_0x47c879(0x266)]!==_0x1afe0b['_origin']||this[_0x47c879(0x7fd)]!==_0x1afe0b['_x']||this[_0x47c879(0x2f1)]!==_0x1afe0b['_y']:![];},Window_PictureCoordinates[_0x55f97b(0x616)][_0x55f97b(0x285)]=function(){const _0x2395c1=_0x55f97b;this[_0x2395c1(0x354)][_0x2395c1(0x4fc)]();const _0x37cde7=$gameTemp[_0x2395c1(0x89f)],_0x12bd45=$gameScreen['picture'](_0x37cde7);if(!_0x12bd45)return;this['_lastOrigin']=_0x12bd45[_0x2395c1(0x51d)],this['_lastX']=_0x12bd45['_x'],this[_0x2395c1(0x2f1)]=_0x12bd45['_y'];const _0x15b18a=ColorManager[_0x2395c1(0x84d)]();this[_0x2395c1(0x354)][_0x2395c1(0x5ba)](0x0,0x0,this[_0x2395c1(0x96a)],this['innerHeight'],_0x15b18a);const _0x469213=_0x2395c1(0x436)[_0x2395c1(0x55a)](_0x12bd45[_0x2395c1(0x51d)]===0x0?'Upper\x20Left':'Center'),_0x240bad=_0x2395c1(0x67a)[_0x2395c1(0x55a)](_0x12bd45['_x']),_0x2ed980=_0x2395c1(0x5d0)[_0x2395c1(0x55a)](_0x12bd45['_y']),_0x415ea1=_0x2395c1(0x21c)[_0x2395c1(0x55a)](TextManager[_0x2395c1(0x39b)](_0x2395c1(0x8ce)));let _0x579eab=Math[_0x2395c1(0x8d7)](this[_0x2395c1(0x96a)]/0x4);this[_0x2395c1(0x590)](_0x469213,_0x579eab*0x0,0x0,_0x579eab),this['drawText'](_0x240bad,_0x579eab*0x1,0x0,_0x579eab,_0x2395c1(0x8ac)),this[_0x2395c1(0x590)](_0x2ed980,_0x579eab*0x2,0x0,_0x579eab,_0x2395c1(0x8ac));const _0x4abd1c=this[_0x2395c1(0x974)](_0x415ea1)[_0x2395c1(0x7cc)],_0x38ef7b=this[_0x2395c1(0x96a)]-_0x4abd1c;this[_0x2395c1(0x3d7)](_0x415ea1,_0x38ef7b,0x0,_0x4abd1c);};function _0x10b9(){const _0x19f5f8=['isMagical','getPointAnimationLayer','pictures','wait','SParamVocab7','tab','initialBattleSystem','playOnceParallelInterpreter','setDisplayPos','filterArea','onClick','width','imageSmoothingEnabled','itemHeight','Game_Interpreter_command105','Input_clear','ListRect','command105','areTileShadowsHidden','Scene_Title','AudioChangeBgmPitch','createContents','CLOSE_PAREN','setSkill','reserveNewGameCommonEvent','_animationQueue','Window_NameInput_processTouch','BuyBgType','round','_shouldPreventDefault','createTilemap','BarOffset','CustomParam','select','_drawTextOutline','nw.gui','buttonAssistWindowRect','arePageButtonsEnabled','_targetOffsetY','_rate','getGamepads','_currentMap','SParamVocab2','Sprite_Gauge_currentValue','getBattleSystem','events','KeyTAB','scaleX','updateText','RepositionActors','_bgsBuffer','ExtractStrFromTroop','targetObjects','tilesetFlags','_changingClass','blt','createBuffer','WIN_OEM_FINISH','_stored_deathColor','setupCoreEngine','_lastX','Sprite_Animation_processSoundTimings','_skillTypeWindow','Game_Map_setDisplayPos','WIN_OEM_FJ_TOUROKU','_shakeSpeed','cursorDown','NewGameCommonEvent','exportAllMapStrings','Scene_Equip_create','current','value','ItemBackColor1','catchException','Sprite_AnimationMV_updatePosition','Troop%1','drawItem','_patternHeight','createJsQuickFunction','_coreEasingType','isLoopHorizontal','maxBattleMembers','BlendMode','alpha','findSymbol','NewGameCommonEventAll','Sprite_Battler_startMove','TGR','FontShadows','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','string','Game_Action_itemHit','Sprite_StateIcon_updateFrame','([\x5c+\x5c-]\x5cd+)([%％])>','Game_Party_consumeItem','hide','startMove','updateCoreEasing','BattleSystem','BlurFilter','〘Scrolling\x20Text〙\x0a','_eventId','hpColor','MapNameTextCode','buttonAssistKey3','WIN_OEM_PA2','enemies','ItemBackColor2','windowRect','Scene_Battle_createSpritesetFix','_maxDigits','concat','updatePlayTestF7','ATK','Bitmap_gradientFillRect','_sideButtonLayout','ItemHeight','displayName','Scene_Base_createWindowLayer','outlineColor','DigitGroupingExText','_clientArea','stencilFunc','CreateBattleSystemID','paramBaseAboveLevel99','Basic','Map%1','RowSpacing','_gamepadWait','PixelateImageRendering','DisplayLockY','Abbreviation','nickname','MIN_SAFE_INTEGER','ShowJS','_storedMapText','ParseClassNotetags','playCursorSound','log','IconParam4','itemBackColor1','Scene_MenuBase_helpAreaTop','_target','animationId','enableDigitGroupingEx','GoldRect','startNormalGame','DetachMapPictureContainer','playtestQuickLoad','ParseActorNotetags','itemSuccessRate','DOWN','KeyUnlisted','defineProperty','allIcons','GET','measureTextWidth','Sprite_AnimationMV_processTimingData','DrawItemBackgroundJS','_lastCommandSymbol','popScene','drawFace','ShowScrollBar','buttonAssistKey5','stencilOp','createFauxAnimationSprite','ImgLoad','adjustY','VisuMZ_2_BattleSystemBTB','add','ColorHPGauge2','cancelShowButton','Sprite_Picture_loadBitmap','currencyUnit','offset','updateOpacity','MainMenu','ActorTPColor','_actorWindow','INSERT','thickness','Window_StatusBase_drawActorLevel','_windowLayer','exit','code','gradientFillRect','applyEasingAnglePlus','addChild','parameters','wholeDuration','HANJA','resetBattleSystem','sparam','updateMotion','checkCacheKey','Window_NameInput_cursorUp','Class-%1-%2','atypeId','Sprite_Actor_setActorHome','ColorMaxLvGauge1','OUTQUART','Spriteset_Base_isAnimationPlaying','AccuracyBoost','ScreenShake','_targets','Scene_Menu_create','_hp','ColorPowerDown','_spriteset','Flat1','isArrowPressed','getCoreEngineScreenShakeStyle','786eYiXiS','$dataMap','buttonAssistOffset4','stypeId','getControllerInputButtonMatch','AdjustAngle','_digitGroupingEx','dimColor1','drawNewParam','MULTIPLY','_pictureCoordinatesMode','rgba(0,\x200,\x200,\x201.0)','commandWindowRect','showFauxAnimations','SubfolderParse','Bitmap_drawCircle','ColorMPGauge1','createPointAnimationSprite','processCursorMove','call','none','centerY','cursorUp','center','cursorPagedown','isItemStyle','EVAL','_stored_powerDownColor','refreshSpritesetForExtendedTiles','system','31074wOyVKA','smooth','CommandRect','isInputting','_updateGamepadState','Window_ShopSell_isEnabled','processMoveCommand','SwitchRandomizeOne','RegExp','MRG','TranslucentOpacity','_coreEngineShakeStyle','params','Flat','NewGameBoot','Symbol','numRepeats','_windowskin','skills','overrideMimeType','scaleSprite','_anchor','loadBitmapCoreEngine','updatePadding','_textQueue','INOUTCUBIC','storeMapData','cancel','679561WDUmUs','initCoreEasing','setHome','PictureID','makeEncounterCount','updatePositionCoreEngine','ItemStyle','Sprite_Animation_setViewport','floor','BattleManager_checkSubstitute','EditBgType','dummyWindowRect','Scene_GameEnd_createBackground','SceneManager_initialize','VOLUME_UP','ColorMaxLvGauge2','_pauseSignSprite','EndingID','pan','mainAreaHeightSideButtonLayout','Linear','systemColor','%1%2','deflate','_backSprite2','dashToggle','trim','_destroyInternalTextures','CommonEventID','sqrt','currentClass','Window_Selectable_cursorUp','EnableJS','LESS_THAN','isPreserveTp','MDF','makeInputButtonString','Scene_Base_terminate','opacity','top','areButtonsHidden','ActorRect','Game_Actor_changeClass','gaugeLineHeight','_scrollBarHorz','OpenConsole','buttonAssistText1','BaseTexture','pos','Graphics_centerElement','Tilemap_addSpotTile','_realScale','shouldAutosave','renderNoMask','initDigitGrouping','SwitchToggleOne','mirror','STENCIL_TEST','volume','ColorExpGauge2','addWindow','DigitGroupingStandardText','_bitmap','_margin','SkillTypeBgType','Window_NameInput_cursorLeft','SystemSetFontSize','encounterStep','DefaultMode','OTB','bgmVolume','isPlaying','_shakeDuration','isWindowMaskingEnabled','startAutoNewGame','_centerElementCoreEngine','PGDN','advanced','mhp','TitleCommandList','Param','EREOF','Rate2','IconXParam3','_closing','setupCustomRateCoreEngine','isBusy','KANA','abs','Scene_Map_createSpritesetFix','isAlive','SellRect','SETTINGS','OUTQUINT','_targetY','VariableJsBlock','_stored_mpCostColor','src','down','Window_Base_initialize','EnableNameInput','CONTEXT_MENU','UpdatePictureCoordinates','VisuMZ_2_BattleSystemETB','drawCharacter','_context','mainAreaHeight','SEMICOLON','cursorRight','SkillMenu','getLevel','paramMax','_makeFontNameText','initCoreEngine','gaugeHeight','openURL','CustomParamAbb','button','Gold','paramX','buttonAssistOffset%1','33873JJiJRW','innerHeight','changeTextColor','_statusEquipWindow','SwitchToggleRange','Bitmap_drawTextOutline','children','update','process_VisuMZ_CoreEngine_Functions','If\x20you\x20don\x27t\x20want\x20this\x20option,\x20set\x20Split\x20Escape\x20option\x20back\x20to\x20false.','hideButtonFromView','updateBgmParameters','loadBitmap','paramValueByName','_stored_hpGaugeColor1','%1\x0a','URL','ONE_MINUS_SRC_ALPHA','paramFlatBonus','result','mpGaugeColor1','ATTN','vertJS','refreshDimmerBitmap','tilesets','updateCurrentEvent','getLastGamepadUsed','tpCostColor','isExpGaugeDrawn','pointY','saveViewport','VOLUME_MUTE','applyForcedGameTroopSettingsCoreEngine','PERIOD','innerWidth','padZero','exportAllTroopStrings','isUseModernControls','sparamPlus2','Pixelated','_setupEventHandlers','targetOpacity','filters','_srcBitmap','textSizeEx','render','darwin','ColorMPCost','App','playBuzzer','Scene_MenuBase_createBackground','checkSmartEventCollision','enemy','getBackgroundOpacity','ColorNormal','IconSParam9','OS_KEY','_blank','translucentOpacity','clearStencil','_mp','isSceneBattle','disable','mpColor','drawing','Window_Base_drawText','isKeyItem','_numberWindow','targetBackOpacity','position','addQueue','offOpacity','INELASTIC','buttonAssistText4','MCR','Bitmap_resize','isSideView','_stored_ctGaugeColor2','updatePositionCoreEngineShakeHorz','_tile','createSubSprite','1136780tIOktd','LevelUpFullMp','loadTileset','WIN_ICO_CLEAR','LATIN1','_stored_systemColor','ZERO','isAnimationPlaying','Scene_Boot_loadSystemImages','isBottomButtonMode','_cancelButton','createButtonAssistWindow','targetY','updateData','inputWindowRect','standardIconWidth','_buttonType','updateClose','Window_NameInput_cursorPageup','EnableNumberInput','BasicParameterFormula','TextPopupShow','PRINT','Armor-%1-%2','setHandler','name','Scene_TitleTransition','updateBackOpacity','isSideButtonLayout','canEquip','process_VisuMZ_CoreEngine_jsQuickFunctions','repositionCancelButtonSideButtonLayout','xdg-open','valueOutlineColor','faceHeight','processTouchModernControls','Spriteset_Base_destroy','Page','STB','Name','successRate','autoRemovalTiming','_bgmBuffer','BTestItems','ENTER_SPECIAL','bodyColor','loadGameImagesCoreEngine','RepositionEnemies','OutlineColorDmg','Scene_Base_create','Scene_Battle_createCancelButton','IconSParam0','PositionY','Window_NameInput_cursorRight','CustomParamIcons','_actor','〘Common\x20Event\x20%1:\x20%2〙\x20Start','ConvertParams','createCommandWindow','_saveFileID','setCoreEngineUpdateWindowBg','Scene_MenuBase_mainAreaHeight','Duration','NameInputMessage','ctGaugeColor2','_stored_crisisColor','charAt','Game_Map_setup','Keyboard','subjectHitRate','Title','ScreenResolution','setSize','viewport','operand','Version','bitmap','Window_NumberInput_processDigitChange','LvExpGauge','_mapY','framesPerChar','isNormalPriority','_cacheScaleX','updatePointAnimations','ImprovedAccuracySystem','checkSubstitute','updateFauxAnimations','_tileExtendSprites','max','%1〘Choice\x20%2〙\x20%3%1','ARRAYJSON','updateScrollBars','Scene_Battle_createSpriteset_detach','bitmapHeight','onActorChange','paramRate2','mev','_onKeyPress','GetParamIcon','isPlaytest','initMembers','PRINTSCREEN','Window_TitleCommand_selectLast','keyCode','Window_Base_createContents','baseId','INOUTCIRC','calcEasing','_originalViewport','Match','contentsBack','skillTypeWindowRect','IconSParam3','TextStr','_text','isSpecialCode','filter','_pollGamepads','_onLoad','pop','QwertyLayout','%1:\x20Exit\x20','scrollRight','updateScrollBarPosition','style','onXhrError','alwaysDash','IconParam7','DIVIDE','paramRateJS','initRotationCoreEngine','create','XParameterFormula','angle','INOUTSINE','ApplyEasing','getColorDataFromPluginParameters','_timeDuration','_shiftY','removeAllFauxAnimations','levelUpRecovery','uiAreaWidth','pointX','Plus','Game_Picture_x','_pictureCoordinatesWindow','command111','onload','_slotWindow','determineSideButtonLayoutValid','%1〘End\x20Choice\x20Selection〙%1','([\x5c+\x5c-]\x5cd+)>','DETACH_PICTURE_CONTAINER','playTestF7','TCR','ARRAYEVAL','Max','drawSegment','AudioChangeBgmVolume','maxHorz','TILDE','normalColor','Bitmap_clearRect','restore','scrollX','_backSprite1','ExportCurMapText','Bitmap_measureTextWidth','DigitGroupingGaugeSprites','font-smooth','_battlerName','baseTextRect','traitObjects','Window_MapName_refresh','F10','_scaleX','destroyScrollBarBitmaps','lineHeight','list','Sprite_destroy','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','StatusBgType','processKeyboardEnd','CAPSLOCK','numActions','(\x5cd+\x5c.?\x5cd+)>','INOUTELASTIC','statusEquipWindowRect','getCombinedScrollingText','isAnimationOffsetXMirrored','DEF','xScrollLinkedOffset','up2','ENTER','MenuLayout','_lastOrigin','snapForBackground','SParamVocab5','ParseWeaponNotetags','destroy','Window_NameInput_processHandling','tileset','InputRect','createSpriteset','uiAreaHeight','_currentBgs','_hideButtons','version','currentValue','HYPHEN_MINUS','evaded','setGuard','INCUBIC','adjustPictureAntiZoom','ParseEnemyNotetags','scrollUp','maxCols','CommandBgType','ColorCrisis','createEnemies','_drawTextBody','_battleField','_tilemap','_hovered','\x5c}❪TAB❫\x5c{','BattleManager_processEscape','refresh','Scene_Name_onInputOk','menuShowButton','updateMain','_targetAnchor','isNextScene','isNwjs','buttonAssistOffset5','SParamVocab4','_tempActor','setActionState','scrollDown','paramName','visible','Location','isPointAnimationPlaying','makeCoreEngineCommandList','Game_Interpreter_PluginCommand','Game_Picture_updateMove','slotWindowRect','Game_Picture_initRotation','processPointAnimationRequests','loadTileBitmap','Speed','targetScaleY','drawIconBySize','ColorDeath','setTileFrame','xparam','_scrollBarVert','setupRate','_backgroundFilter','setAction','setCoreEngineScreenShakeStyle','battlebacks2','_coreEasing','Window_Selectable_drawBackgroundRect','startAnimation','getKeyboardInputButtonString','resetFontSettings','processTimingData','SParamVocab8','isPhysical','BlurStrength','\x0a\x0a\x0a\x0a\x0a','updateEffekseer','Input_setupEventHandlers','Sprite_Gauge_gaugeRate','duration','Input_pollGamepads','GroupDigits','NUMPAD1','processCursorHomeEndTrigger','setTopRow','dimColor2','MAXMP','QUOTE','updatePositionCoreEngineShakeOriginal','PositionX','updateScene','destroyed','horzJS','_stored_gaugeBackColor','text','useDigitGroupingEx','processKeyboardHandling','_inputString','rightArrowWidth','State-%1-%2','itemHit','bitmapWidth','drawGauge','createCustomBackgroundImages','img/%1/','Window_refreshBack','_drawTextShadow','equips','updateMove','drawGameVersion','activate','isItem','GoldChange','IconSParam6','makeDeepCopy','image-rendering','_isButtonHidden','buttonAssistOffset1','clearCachedKeys','requiredWtypeId1','BoxMargin','removeFauxAnimation','itypeId','isAnimationForEach','makeFontSmaller','_listWindow','_goldWindow','makeTargetSprites','isDying','Smooth','StartID','characters','canUse','origin','_troopId','optSideView','Spriteset_Map_createTilemap','_targetOffsetX','prepare','_lastY','smoothSelect','animations','CheckSplitEscape','1.3.0','INBOUNCE','targets','maxGold','level','ARRAYSTRUCT','updatePosition','LoadError','buyWindowRect','hpGaugeColor1','playBgs','random','setLastGamepadUsed','CrisisRate','ShopMenu','WIN_OEM_CUSEL','OUTCUBIC','WIN_ICO_HELP','_addShadow','Control\x20Variables\x20Script\x20Error','hasEncryptedImages','NoTileShadows','_onKeyDown','Spriteset_Base_update','anchor','_pagedownButton','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','ModernControls','isTileExtended','removeTileExtendSprites','ExportStrFromAllMaps','mapId','isGamepadButtonPressed','onLoad','tileHeight','sparamPlus','createExtendedTileSprite','Icon','Game_Action_itemEva','ExtDisplayedParams','pendingColor','isTriggered','Game_Action_updateLastTarget','animationBaseDelay','_active','_commandList','initMembersCoreEngine','Bitmap_fillRect','clearForcedGameTroopSettingsCoreEngine','ValueJS','isClosed','ctrlKey','_timerSprite','Game_Interpreter_command122','picture','SideButtons','paramMaxJS','IconSet','boxWidth','itemLineRect','jsonToZip','down2','CategoryBgType','_height','onEscapeSuccess','Scene_Unlisted','Renderer','_statusWindow','_registerKeyInput','Game_Picture_calcEasing','SParameterFormula','VIEWPORT','paramFlatJS','mute','mainCommandWidth','xparamPlus1','1681744VyNexz','NumberRect','_lastScrollBarValues','ExtJS','Rate1','_mapNameWindow','textWidth','meVolume','Enemy-%1-%2','_width','TitlePicButtons','CRI','Scene_Map_createMenuButton','expGaugeColor1','child_process','close','requestMotion','isForFriend','IconIndex','contents','toFixed','NUMPAD4','setActorHomeRepositioned','allowShiftScrolling','tpGaugeColor1','isFullDocumentTitle','push','setEasingType','You\x20do\x20not\x20have\x20a\x20custom\x20Input.keyMapper\x20with\x20\x22cancel\x22\x20and\x20\x22menu\x22\x20','OUTCIRC','start','BarThickness','playEscape','ListBgType','gainSilentTp','setCommonEvent','buttonAssistKey4','_statusParamsWindow','reservePlayTestNewGameCommonEvent','INBACK','alphabetic','playTestShiftR','ShiftR_Toggle','inbounce','process_VisuMZ_CoreEngine_RegExp','drawGoldItemStyle','escape','Window_SkillList_includes','Scene_Item_create','Plus2','_animation','initialize','Scene_SingleLoadTransition','outlineColorDmg','F17','defaultInputMode','CommandList','_fauxAnimationQueue','onNameOk','original','_textPopupWindow','active','backspace','gainItem','Game_Interpreter_updateWaitMode','length','hit','Scene_Name_create','AGI','Settings','F21','sparamRate','_pictureName','F19','SEPARATOR','SParamVocab9','Input_updateGamepadState','_storedStack','backgroundBitmap','Game_Character_processMoveCommand','INSINE','WIN_OEM_FJ_ROYA','_optionsWindow','skillId','initVisuMZCoreEngine','connected','CTRL','ParamMax','MEV','keyMapper','getInputButtonString','adjustX','Bitmap_strokeRect','gold','wtypeId','Spriteset_Battle_createEnemies','PreserveNumbers','SLASH','updateAnglePlus','drawActorLevel','helpAreaTop','_destroyCanvas','updateFrame','Game_Map_scrollDown','_mode','itemRect','_targetX','nah','vert','ExportStrFromAllTroops','windowPadding','forceOutOfPlaytest','processTouch','Window_Gold_refresh','_centerElement','useDigitGrouping','zoomScale','_refreshBack','createTitleButtons','_pictureContainer','HASH','Game_Event_isCollidedWithEvents','DashToggleR','removeChild','_cacheScaleY','gameTitle','_mapX','damageColor','WIN_OEM_PA1','HOME','_baseSprite','_anglePlus','deselect','_movementWholeDuration','F6key','AMPERSAND','WIN_OEM_FJ_LOYA','drawRightArrow','centerCameraCheckData','INEXPO','contains','_downArrowSprite','ParseTilesetNotetags','Scene_Map_updateMainMultiply','processKeyboardBackspace','process_VisuMZ_CoreEngine_ControllerButtons','drawActorExpGauge','CEV','drawCircle','Window_StatusBase_drawActorSimpleStatus','drawTextEx','_forcedTroopView','updateDocumentTitle','checkScrollBarBitmap','altKey','END','isOpening','setupScrollBarBitmap','key%1','Scene_MenuBase_mainAreaTop','printError','_customModified','F23','includes','maxLvGaugeColor2','blockWidth','boxHeight','guardSkillId','Sprite_Button_updateOpacity','buttonAssistKey1','NameMenu','description','pow','ControllerMatches','terminate','DisplayLockX','Mirror','setWindowPadding','framesMin','DisplayedParams','processDrawIcon','process_VisuMZ_CoreEngine_Notetags','Rate','Game_Picture_updateRotation','resetTextColor','pagedownShowButton','_paramPlus','ZOOM','end','VariableEvalReference','_isWindow','tileWidth','parse','ItemRect','helpAreaTopSideButtonLayout','skipBranch','WIN_OEM_COPY','PERCENT','getParameter','StatusParamsBgType','profileWindowRect','endBattlerActions','coreEngineRepositionEnemies','clearRect','_fauxAnimationSprites','strokeRect','createTroopNote','WIN_OEM_BACKTAB','PA1','DimColor2','fillAll','processKeyboardDelete','initCoreEngineScreenShake','TextManager_param','retrievePointAnimation','removeAllPointAnimations','PictureFilename','INQUINT','createFauxAnimation','updateRotation','statusWindowRect','_bypassCanCounterCheck','_encounterCount','setupNewGame','learnings','runCombinedScrollingTextAsCode','isCancelled','initButtonHidden','playTestF6','turn','toUpperCase','helpAreaHeight','_shakePower','buttonAssistOk','setAnglePlusData','Game_Action_numRepeats','goldWindowRect','mainFontSize','DigitGroupingLocale','GoldIcon','ActorBgType','_sellWindow','subject','yScrollLinkedOffset','EXSEL','\x20Origin:\x20%1','VisuMZ_2_BattleSystemFTB','consumeItem','transform','MenuBg','_data','split','_displayX','min','ParseAllNotetags','FadeSpeed','operation','process_VisuMZ_CoreEngine_CustomParameters','0.00','IconXParam0','getColor','isMaxLevel','iconHeight','iconWidth','StatusRect','redraw','calcCoreEasing','_stored_expGaugeColor1','CNT','createPointAnimationQueue','process_VisuMZ_CoreEngine_Settings','Game_Interpreter_command111','buttonAssistText5','isLoopVertical','number','Game_Action_setAttack','performEscape','changeTileset','EXCLAMATION','FINAL','_menuButton','getInputMultiButtonStrings','ARRAYSTR','OPEN_PAREN','paramFlat','addCommand','randomJS','IconXParam2','IconSParam7','Spriteset_Base_updatePosition','Skill-%1-%2','Game_Troop_setup','ScaleX','EVA','OpenSpeed','_itemWindow','mpCostColor','PictureRotateBy','_pointAnimationQueue','_subject','updatePositionCoreEngineShakeVert','Window','ColorTPGauge1','ColorSystem','worldTransform','easingType','SplitEscape','layoutSettings','Scene_Options_create','XParamVocab0','applyCoreEasing','setupFont','_scaleY','_lastGamepad','clone','animationNextDelay','ConvertNumberToString','show','WIN_OEM_FJ_MASSHOU','Window_Base_destroyContents','enabled','buttonAssistOffset2','isCursorMovable','setViewport','SceneManager_exit','Window_NameInput_initialize','_targetScaleX','SParamVocab3','_moveEasingType','INOUTQUART','IconXParam1','createTextPopupWindow','HelpRect','setValue','maxVert','smallParamFontSize','Conditional\x20Branch\x20Script\x20Error','anchorCoreEasing','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','Opacity','OptionsRect','loadSystemImages','ARRAYFUNC','sparamRate2','drawGameSubtitle','setTargetAnchor','switchModes','pages','_createInternalTextures','Scene_Battle_update','_scene','attackSkillId','ParseArmorNotetags','removeOnceParallelInterpreter','_onError','AudioChangeBgmPan','%2%1%3','processKeyboardHome','FTB','NEAREST','drawValue','EQUALS','Game_Map_scrollLeft','replace','isActor','loadWindowskin','CoreEngine','_stored_maxLvGaugeColor1','isSmartEventCollisionOn','_image','TextJS','retrieveFauxAnimation','endAction','_playTestFastMode','SceneManager_onKeyDown','updatePictureSettings','3967568MMgpPS','scale','showIncompleteTilesetError','DECIMAL','ADD','maxTp','ColorCTGauge2','titles1','textAlign','Scene_Map_createSpriteset','Tilemap_addShadow','getCustomBackgroundSettings','movePageButtonSideButtonLayout','shift','textColor','Game_Picture_move','data/','_allTextHeight','updateMainMultiply','Manual','Game_BattlerBase_refresh','shake','pitch','makeActionList','Input_update','ctrl','isTouchedInsideFrame','F20','inBattle','KeyboardInput','BTestWeapons','backOpacity','_muteSound','buttonAreaHeight','PageChange','powerDownColor','isEnemy','VisuMZ_2_BattleSystemPTB','Current\x20tileset\x20has\x20incomplete\x20flag\x20data.','Color','vertical','IconXParam4','_startPlaying','MRF','Graphics_printError','itemBackColor2','setFrame','_phase','ctGaugeColor1','missed','valueOutlineWidth','Window_EquipItem_isEnabled','PGUP','PLAY','offsetX','outbounce','F22','match','playOk','REC','_screenX','_clickHandler','height','open','integer','savefileInfo','isActiveTpb','clear','IDs','Game_Actor_paramBase','return\x200','_categoryWindow','waiting','expRate','addAnimationSpriteToContainer','WIN_OEM_RESET','targetX','_baseTexture','SHIFT','CRSEL','Scene_MenuBase_createPageButtons','SceneManager_isGameActive','Window_Base_update','Subtitle','BgType','ColorGaugeBack','setActorHome','buttonAssistWindowSideRect','axes','sparamFlat1','IconParam0','toLocaleString','AudioChangeBgsVolume','drawIcon','DELETE','VisuMZ_4_UniqueTileEffects','_animationSprites','MODECHANGE','_url','ColorMPGauge2','_origin','charCode','keyboard','target','addChildToBack','flush','BattleManager_update','Window_Base_drawCharacter','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','jsQuickFunc','DATABASE','_texture','IconXParam7','MaxDuration','updateScrollBarVisibility','SPACE','CTB','refreshScrollBarBitmap','_backgroundSprite','EQUAL','displayY','Wait','seVolume','substring','buttonAssistKey2','stringKeyMap','Window_NumberInput_start','AutoStretch','adjustSprite','isNumpadPressed','_lastIconIndex','nextLevelExp','AutoScrollLockY','gaugeBackColor','SParamVocab0','actorWindowRect','paramRate','ALTGR','sparamFlatJS','reduce','setLastPluginCommandInterpreter','Graphics_defaultStretchMode','menu','addLoadListener','useFontWidthFix','ARRAYNUM','isFauxAnimationPlaying','DummyBgType','DataManager_setupNewGame','Type','Scene_Map_updateScene','REPLACE','SaveMenu','ColorManager_loadWindowskin','changeClass','expGaugeColor2','centerSprite','repeat','RevertPreserveNumbers','Power','STR','format','move','ColorExpGauge1','NUMPAD0','_editWindow','left','xparamRateJS','F14','Bitmap_drawText','maxLvGaugeColor1','eva','OPEN_BRACKET','TAB','measureText','_pageupButton','FontWidthFix','_profileWindow','isHandled','_upArrowSprite','OpenURL','doesNameContainBannedWords','fillStyle','KEEP','targetContentsOpacity','isMenuButtonAssistEnabled','adjustBoxSize','COLON','_offsetY','battlebacks1','_forcedBattleGridSystem','Scene_Battle_createSpriteset','RepositionEnemies130','AllTroops','playCursor','test','Total','createPageButtons','scrollLeft','ColorTPCost','Sprite_StateIcon_loadBitmap','Scene_Load','Game_Temp_initialize','note','QoL','updatePictureAntiZoom','goto','members','VisuMZ_2_BattleSystemOTB','maxScrollbar','isOpenAndActive','makeDocumentTitle','mainAreaTopSideButtonLayout','Window_Selectable_itemRect','isTpb','drawText','startShake','showPointAnimations','Game_Picture_y','playTestShiftT','GoldOverlap','SCROLLBAR','setAttack','ParamChange','IconSParam8','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','showPicture','TextCodeClassNames','status','Click\x20\x22Copy\x20Page\x22\x20from\x20another\x20tileset\x27s\x20pages','Exported_Script_%1.txt','createCustomParameter','MapOnceParallel','LevelUpFullHp','IconSParam1','EscapeAlways','Untitled','getLastPluginCommandInterpreter','ActorMPColor','XParamVocab9','xparamRate','measureTextWidthNoRounding','CodeJS','toLowerCase','WindowLayer_render','cursorPageup','ACCEPT','textHeight','context','VisuMZ_2_BattleSystemSTB','Graphics','IconXParam9','bgm','AutoScrollLockX','command355','LEFT','isGamepadConnected','fillRect','onlyfilename','contentsOpacity','Window_Selectable_cursorDown','pagedown','and\x20add\x20it\x20onto\x20this\x20one.','processFauxAnimationRequests','drawGameTitle','sellWindowRect','StatusEquipRect','_dimmerSprite','createPointAnimationTargets','resize','%1〘Choice\x20Cancel〙%1','itemHitImprovedAccuracy','object','Game_BattlerBase_initMembers','bind','STENCIL_BUFFER_BIT','Bitmap_blt','RightMenus','onDatabaseLoaded','Y:\x20%1','IconParam1','_defaultStretchMode','TargetAngle','Bitmap_initialize','RequireFocus','_duration','sin','stretch','setAnchor','applyEasing','paramWidth','terms','isGamepadAxisMoved','updateBgsParameters','onKeyDownKeysF6F7','processCursorMoveModernControls','_colorCache','_stored_tpGaugeColor2','_playtestF7Looping','createWindowLayer','drawParamText','Scene_Base_terminateAnimationClearBugFix','_viewportSize','%1/','_stored_hpGaugeColor2','font','text%1','focus','BuyRect','XParamVocab7','HelpBgType','createAnimationSprite','XParamVocab1','markCoreEngineModified','IconSParam4','_hideTileShadows','_index','IconSParam2','actor','etypeId','map','SUBTRACT','_effectsContainer','ParseStateNotetags','Scene_Shop_create','onKeyDown','MDR','traitsPi','Key%1','TimeProgress','〘Common\x20Event\x20%1:\x20%2〙\x20End','powerUpColor','endAnimation','Game_Map_scrollRight','paramRate1','checkCoreEngineDisplayCenter','loadTitle1','KeySHIFT','_screenY','xparamFlat1','centerX','clamp','_smooth','Unnamed','GameEnd','XParamVocab2','ALT','initRotation','_number','prototype','xparamRate2','VisuMZ_2_BattleSystemCTB','createCancelButton','updateSmoothScroll','KeyItemProtect','getButtonAssistLocation','#%1','command122','deactivate','title','SlotRect','ShowDevTools','DocumentTitleFmt','setBackgroundOpacity','cursorLeft','isGamepadTriggered','setupCoreEasing','MinDuration','outlineColorGauge','WIN_OEM_FJ_JISHO','standardIconHeight','helpWindowRect','UNDERSCORE','initialLevel','isMapScrollLinked','ShowItemBackground','Window_Selectable_processCursorMove','ASTERISK','IconXParam5','RIGHT','updateAnchor','maxVisibleItems','ControllerButtons','Game_Picture_scaleY','PictureEasingType','BarBodyColor','_inputWindow','buttonAssistText3','WIN_OEM_AUTO','updateBattleVariables','TRG','loadTitle2','enableDigitGrouping','xparamPlus2','isScrollBarVisible','offColor','executeLoad','editWindowRect','ParseItemNotetags','_list','Game_Picture_initBasic','ParseSkillNotetags','en-US','processDigitChange','HIT','createPointAnimation','NON_FRAME','_digitGrouping','_buyWindow','playBgm','scrollbarHeight','CustomParamNames','Scene_Map_createSpriteset_detach','OUTQUAD','DummyRect','home','GoldMax','_action','Scene_Map_initialize','OUTELASTIC','Window_Base_createTextState','_centerCameraCheck','param','Scene_Map_updateMain','get','ONE','CLEAR','listWindowRect','rowSpacing','globalAlpha','isBottomHelpMode','Window_Scrollable_update','catchLoadError','Input_shouldPreventDefault','ItemPadding','setup','maxScrollX','PTB','onerror','Game_Picture_scaleX','dropItems','Flat2','addEventListener','_addSpotTile','createTextState','enter','ButtonFadeSpeed','setViewportCoreEngineFix','hpGaugeColor2','X:\x20%1','WIN_OEM_ENLW','Game_Picture_show','CtrlQuickLoad','gaugeRate','_offsetX','Enemy','paramPlus','ItemBgType','AllMaps','xparamPlusJS','updateWaitMode','GREATER_THAN','_cache','SLEEP','loadSystem','currentLevelExp','PIPE','_CoreEngineSettings','updatePictureCoordinates','xparamFlatBonus','FUNC','IconSParam5','updateFrameCoreEngine','itemEva','IconParam6','PictureCoordinatesMode','(\x5cd+)>','paramY','fontSize','performMiss','rgba(0,\x200,\x200,\x200.7)','setClickHandler','_targetScaleY','getLastUsedGamepadType','sv_enemies','WIN_OEM_WSCTRL','option','Scene_Boot_startNormalGame','moveCancelButtonSideButtonLayout','_opacity','maxLevel','selectLast','changeAnglePlusData','requestFauxAnimation','setupTileExtendTerrainTags','levelUp','itemPadding','DTB','SnapshotOpacity','constructor','alignBottom','NUMPAD2','ceil','_name','StatusMenu','Sprite_Picture_updateOrigin','ColorPowerUp','_buttonAssistWindow','mainAreaTop','XParamVocab4','loadMapData','isOpen','encounterStepsMinimum','canAttack','repositionEnemiesByResolution','sceneTerminationClearEffects','AudioChangeBgsPan','updateDashToggle','updateShadow','onInputBannedWords','setEvent','background','Plus1','FontSize','seek','fadeSpeed','setBackgroundType','processKeyboardDigitChange','recoverAll','createFauxAnimationQueue','BACK_QUOTE','_onceParallelInterpreters','updateDuration','_helpWindow','processSoundTimings','padding','VisuMZ_3_EventChainReact','<%1\x20%2:[\x20]','_commandWindow','mpGaugeColor2','isPressed','pictureButtons','MAT','invokeCounterAttack','ColorTPGauge2','blendFunc','isEventRunning','updateKeyText','_stored_mpGaugeColor1','MAXHP','needsUpdate','OptionsMenu','DetachBattlePictureContainer','GoldFontSize','_scrollDuration','LUK','Scene_Boot_updateDocumentTitle','_commonEventLayers','NUM_LOCK','BACK_SLASH','LINEAR','createMenuButton','_dummyWindow','ButtonAssist','_isPlaytest','createBackground','FDR','itemWindowRect','batch','PHA','save','WIN_ICO_00','OUTBACK','_opening','_mainSprite','setSideButtonLayout','command357','SideView','makeCommandList','isMaskingEnabled','DOLLAR','colSpacing','sparamFlat2','processHandling','ParamName','updateOrigin','scrollY','targetScaleX','buttonAssistKey%1','categoryWindowRect','loadIconBitmap','openingSpeed','buttonAssistCancel','CallHandlerJS','GoldBgType','xparamRate1','_stored_tpCostColor','atbActive','PLUS','DOUBLE_QUOTE','HELP','SELECT','Chance','CorrectSkinBleeding','_tileSprite','_pointAnimationSprites','Scene_Map_update','slice','_stored_powerUpColor','isMVAnimation','getTileExtendTerrainTags','faces','FontSmoothing','buttonAssistWindowButtonRect','updateOnceParallelInterpreters','subtitle','createChildSprite','requestPointAnimation','checkPlayerLocation','join','openness','buttonAssistSwitch','BTB','_displayY','parseForcedGameTroopSettingsCoreEngine','BgFilename2','OPEN_CURLY_BRACKET','areButtonsOutsideMainUI','WIN_OEM_PA3','onButtonImageLoad','DefaultStyle','lastAnimationSprite','layeredTiles','isSceneMap','Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!','getControllerInputButtonString','Spriteset_Base_initialize','OkText','ShortcutScripts','2081454lQpMJx','OUTBOUNCE','Game_Map_scrollUp','XParamVocab3','OUTEXPO','pageup','paramPlusJS','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','_lastPluginCommandInterpreter','JSON','onInputOk','createTileExtendSprites','Window_NameInput_cursorPagedown','isEnabled','ExtractStrFromMap','ExportString','BgFilename1','SwitchActorText','Game_Actor_isPreserveTp','BattleManager_invokeCounterAttack','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_tileExtendTerrainTags','isRepeated','paramBase','CategoryRect','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','IconParam2','bgsVolume','default','VisuMZ_1_OptionsCore','PDR','MAX_SAFE_INTEGER','_loadingState','Finish','asin','Game_Actor_levelUp','makeFontBigger','_backSprite','scaleY','Actor','ShowActorLevel','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','Show\x20Scrolling\x20Text\x20Script\x20Error','_stored_maxLvGaugeColor2','_iconIndex','SCALE_MODES','overallHeight','StateIconsNonFrame','playMiss','gainGold','ExportAllTroopText','OUTSINE','drawActorSimpleStatus','index','Game_System_initialize','setupValueFont','_forcedBattleSys','titleCommandWindow','paramchangeTextColor','windowOpacity','commandWindowRows','_inputSpecialKeyCode','indexOf','originalJS','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','isEventTest','registerCommand','refreshActor','HRG','anglePlus','Scene_Map_shouldAutosave','destroyContents','CustomParamType','Game_Event_start','sv_actors','EXECUTE','_stored_expGaugeColor2','_currentBgm','【%1】\x0a','DamageColor','platform','processEscape','isRightInputMode','paintOpacity','_movementDuration','EXR','_targetOpacity','_colorTone','targetEvaRate','BTestArmors','BKSP','randomInt','keys','ShiftT_Toggle','removeAnimation','expParams','_stypeId','F24','OutlineColor','Scene_Skill_create','DimColor1','crisisColor','updateLastTarget','animationShouldMirror','removePointAnimation','removeAnimationFromContainer','Sprite_Button_initialize','INOUTBACK','Window_Base_drawIcon','PictureShowIcon','ETB','remove','NumberBgType','exp','DigitGroupingDamageSprites','SParamVocab1','OutlineColorGauge','_pressed','setSideView','ERROR!\x0a\x0aCore\x20Engine\x20>\x20Plugin\x20Parameters\x20>\x20Button\x20Assist\x20>\x20Split\x20Escape\x0a\x0a','createScrollBarSprites','maxItems','ExportAllMapText','Padding','displayX','createKeyJS','drawTextTopAligned','Game_Interpreter_command355','SlotBgType','PictureRotate','setMute','QUESTION_MARK','CLOSE_BRACKET','clearOnceParallelInterpreters','WIN_OEM_ATTN','right','isGameActive'];_0x10b9=function(){return _0x19f5f8;};return _0x10b9();}function _0x2f79(_0x5b9c6e,_0x3153d9){const _0x10b972=_0x10b9();return _0x2f79=function(_0x2f7937,_0x416c8b){_0x2f7937=_0x2f7937-0x196;let _0x20807d=_0x10b972[_0x2f7937];return _0x20807d;},_0x2f79(_0x5b9c6e,_0x3153d9);}function Window_TextPopup(){const _0x3c18cc=_0x55f97b;this[_0x3c18cc(0x374)](...arguments);}Window_TextPopup['prototype']=Object[_0x55f97b(0x226)](Window_Base[_0x55f97b(0x616)]),Window_TextPopup[_0x55f97b(0x616)][_0x55f97b(0x6ac)]=Window_TextPopup,Window_TextPopup[_0x55f97b(0x92b)]={'framesPerChar':VisuMZ[_0x55f97b(0x4af)]['Settings'][_0x55f97b(0x46e)]['DurationPerChat']??1.5,'framesMin':VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x386)]['Window'][_0x55f97b(0x628)]??0x5a,'framesMax':VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x386)][_0x55f97b(0x46e)][_0x55f97b(0x52a)]??0x12c},Window_TextPopup[_0x55f97b(0x616)][_0x55f97b(0x374)]=function(){const _0x518665=_0x55f97b,_0x1b777f=new Rectangle(0x0,0x0,0x1,0x1);Window_Base[_0x518665(0x616)][_0x518665(0x374)][_0x518665(0x8a8)](this,_0x1b777f),this[_0x518665(0x725)]=0x0,this[_0x518665(0x215)]='',this[_0x518665(0x8cb)]=[],this[_0x518665(0x22c)]=0x0;},Window_TextPopup['prototype']['isAutoColorAffected']=function(){return!![];},Window_TextPopup[_0x55f97b(0x616)][_0x55f97b(0x198)]=function(_0x41a3d2){const _0x46b36d=_0x55f97b;if(this['_textQueue'][this[_0x46b36d(0x8cb)][_0x46b36d(0x382)]-0x1]===_0x41a3d2)return;this[_0x46b36d(0x8cb)][_0x46b36d(0x35b)](_0x41a3d2),SceneManager[_0x46b36d(0x49f)][_0x46b36d(0x87c)](this);},Window_TextPopup[_0x55f97b(0x616)][_0x55f97b(0x94f)]=function(){const _0x39fb5d=_0x55f97b;Window_Base[_0x39fb5d(0x616)][_0x39fb5d(0x94f)][_0x39fb5d(0x8a8)](this),this[_0x39fb5d(0x7f1)](),this[_0x39fb5d(0x6cd)]();},Window_TextPopup[_0x55f97b(0x616)]['updateText']=function(){const _0x2faacc=_0x55f97b;if(this[_0x2faacc(0x215)]!=='')return;if(this['_textQueue']['length']<=0x0)return;if(!this[_0x2faacc(0x327)]())return;this['_text']=this['_textQueue']['shift']();const _0x23d1ef=Window_TextPopup[_0x2faacc(0x92b)],_0x5b99f5=Math[_0x2faacc(0x6af)](this[_0x2faacc(0x215)]['length']*_0x23d1ef[_0x2faacc(0x1f3)]);this[_0x2faacc(0x22c)]=_0x5b99f5[_0x2faacc(0x60e)](_0x23d1ef[_0x2faacc(0x3f3)],_0x23d1ef['framesMax']);const _0x4acd5f=this['textSizeEx'](this[_0x2faacc(0x215)]);let _0x24c9b6=_0x4acd5f[_0x2faacc(0x7cc)]+this[_0x2faacc(0x6a9)]()*0x2;_0x24c9b6+=$gameSystem['windowPadding']()*0x2;let _0x1475e2=Math[_0x2faacc(0x1fb)](_0x4acd5f[_0x2faacc(0x4f7)],this[_0x2faacc(0x254)]());_0x1475e2+=$gameSystem[_0x2faacc(0x3af)]()*0x2;const _0xd3791e=Math['round']((Graphics[_0x2faacc(0x7cc)]-_0x24c9b6)/0x2),_0xbaef64=Math[_0x2faacc(0x7dd)]((Graphics[_0x2faacc(0x4f7)]-_0x1475e2)/0x2),_0x5c1681=new Rectangle(_0xd3791e,_0xbaef64,_0x24c9b6,_0x1475e2);this[_0x2faacc(0x55b)](_0x5c1681['x'],_0x5c1681['y'],_0x5c1681[_0x2faacc(0x7cc)],_0x5c1681[_0x2faacc(0x4f7)]),this[_0x2faacc(0x7d6)](),this['refresh'](),this[_0x2faacc(0x4f8)](),SceneManager[_0x2faacc(0x49f)][_0x2faacc(0x87c)](this);},Window_TextPopup['prototype'][_0x55f97b(0x285)]=function(){const _0x603057=_0x55f97b,_0x537788=this[_0x603057(0x24e)]();this[_0x603057(0x354)][_0x603057(0x4fc)](),this['drawTextEx'](this[_0x603057(0x215)],_0x537788['x'],_0x537788['y'],_0x537788[_0x603057(0x7cc)]);},Window_TextPopup[_0x55f97b(0x616)][_0x55f97b(0x6cd)]=function(){const _0x444eb7=_0x55f97b;if(this[_0x444eb7(0x3dd)]()||this['isClosing']())return;if(this[_0x444eb7(0x22c)]<=0x0)return;this[_0x444eb7(0x22c)]--,this[_0x444eb7(0x22c)]<=0x0&&(this[_0x444eb7(0x350)](),this['_text']='');},VisuMZ[_0x55f97b(0x622)]=function(_0x304aad){const _0x3087fc=_0x55f97b;if(Utils['isOptionValid'](_0x3087fc(0x57c))){var _0x3e783b=require(_0x3087fc(0x7e4))[_0x3087fc(0x46e)][_0x3087fc(0x661)]();SceneManager['showDevTools']();if(_0x304aad)setTimeout(_0x3e783b[_0x3087fc(0x5ec)]['bind'](_0x3e783b),0x190);}},VisuMZ[_0x55f97b(0x22a)]=function(_0x23beef,_0x2f67b7){const _0x48f66d=_0x55f97b;_0x2f67b7=_0x2f67b7[_0x48f66d(0x427)]();var _0x1ec097=1.70158,_0x4edec3=0.7;switch(_0x2f67b7){case'LINEAR':return _0x23beef;case _0x48f66d(0x391):return-0x1*Math['cos'](_0x23beef*(Math['PI']/0x2))+0x1;case _0x48f66d(0x76b):return Math[_0x48f66d(0x5d7)](_0x23beef*(Math['PI']/0x2));case _0x48f66d(0x229):return-0.5*(Math['cos'](Math['PI']*_0x23beef)-0x1);case'INQUAD':return _0x23beef*_0x23beef;case _0x48f66d(0x656):return _0x23beef*(0x2-_0x23beef);case'INOUTQUAD':return _0x23beef<0.5?0x2*_0x23beef*_0x23beef:-0x1+(0x4-0x2*_0x23beef)*_0x23beef;case _0x48f66d(0x277):return _0x23beef*_0x23beef*_0x23beef;case _0x48f66d(0x305):var _0x447205=_0x23beef-0x1;return _0x447205*_0x447205*_0x447205+0x1;case _0x48f66d(0x8cc):return _0x23beef<0.5?0x4*_0x23beef*_0x23beef*_0x23beef:(_0x23beef-0x1)*(0x2*_0x23beef-0x2)*(0x2*_0x23beef-0x2)+0x1;case'INQUART':return _0x23beef*_0x23beef*_0x23beef*_0x23beef;case _0x48f66d(0x889):var _0x447205=_0x23beef-0x1;return 0x1-_0x447205*_0x447205*_0x447205*_0x447205;case _0x48f66d(0x48a):var _0x447205=_0x23beef-0x1;return _0x23beef<0.5?0x8*_0x23beef*_0x23beef*_0x23beef*_0x23beef:0x1-0x8*_0x447205*_0x447205*_0x447205*_0x447205;case _0x48f66d(0x41a):return _0x23beef*_0x23beef*_0x23beef*_0x23beef*_0x23beef;case _0x48f66d(0x92c):var _0x447205=_0x23beef-0x1;return 0x1+_0x447205*_0x447205*_0x447205*_0x447205*_0x447205;case'INOUTQUINT':var _0x447205=_0x23beef-0x1;return _0x23beef<0.5?0x10*_0x23beef*_0x23beef*_0x23beef*_0x23beef*_0x23beef:0x1+0x10*_0x447205*_0x447205*_0x447205*_0x447205*_0x447205;case _0x48f66d(0x3cc):if(_0x23beef===0x0)return 0x0;return Math['pow'](0x2,0xa*(_0x23beef-0x1));case _0x48f66d(0x73c):if(_0x23beef===0x1)return 0x1;return-Math[_0x48f66d(0x3ed)](0x2,-0xa*_0x23beef)+0x1;case'INOUTEXPO':if(_0x23beef===0x0||_0x23beef===0x1)return _0x23beef;var _0x3456e1=_0x23beef*0x2,_0x1a7712=_0x3456e1-0x1;if(_0x3456e1<0x1)return 0.5*Math[_0x48f66d(0x3ed)](0x2,0xa*_0x1a7712);return 0.5*(-Math[_0x48f66d(0x3ed)](0x2,-0xa*_0x1a7712)+0x2);case'INCIRC':var _0x3456e1=_0x23beef/0x1;return-0x1*(Math[_0x48f66d(0x8ec)](0x1-_0x3456e1*_0x23beef)-0x1);case _0x48f66d(0x35e):var _0x447205=_0x23beef-0x1;return Math[_0x48f66d(0x8ec)](0x1-_0x447205*_0x447205);case _0x48f66d(0x20d):var _0x3456e1=_0x23beef*0x2,_0x1a7712=_0x3456e1-0x2;if(_0x3456e1<0x1)return-0.5*(Math[_0x48f66d(0x8ec)](0x1-_0x3456e1*_0x3456e1)-0x1);return 0.5*(Math[_0x48f66d(0x8ec)](0x1-_0x1a7712*_0x1a7712)+0x1);case _0x48f66d(0x368):return _0x23beef*_0x23beef*((_0x1ec097+0x1)*_0x23beef-_0x1ec097);case _0x48f66d(0x6f5):var _0x3456e1=_0x23beef/0x1-0x1;return _0x3456e1*_0x3456e1*((_0x1ec097+0x1)*_0x3456e1+_0x1ec097)+0x1;break;case _0x48f66d(0x7a3):var _0x3456e1=_0x23beef*0x2,_0x2c9dc5=_0x3456e1-0x2,_0x222002=_0x1ec097*1.525;if(_0x3456e1<0x1)return 0.5*_0x3456e1*_0x3456e1*((_0x222002+0x1)*_0x3456e1-_0x222002);return 0.5*(_0x2c9dc5*_0x2c9dc5*((_0x222002+0x1)*_0x2c9dc5+_0x222002)+0x2);case _0x48f66d(0x19a):if(_0x23beef===0x0||_0x23beef===0x1)return _0x23beef;var _0x3456e1=_0x23beef/0x1,_0x1a7712=_0x3456e1-0x1,_0x262b60=0x1-_0x4edec3,_0x222002=_0x262b60/(0x2*Math['PI'])*Math['asin'](0x1);return-(Math[_0x48f66d(0x3ed)](0x2,0xa*_0x1a7712)*Math[_0x48f66d(0x5d7)]((_0x1a7712-_0x222002)*(0x2*Math['PI'])/_0x262b60));case _0x48f66d(0x65c):var _0x262b60=0x1-_0x4edec3,_0x3456e1=_0x23beef*0x2;if(_0x23beef===0x0||_0x23beef===0x1)return _0x23beef;var _0x222002=_0x262b60/(0x2*Math['PI'])*Math[_0x48f66d(0x75a)](0x1);return Math['pow'](0x2,-0xa*_0x3456e1)*Math[_0x48f66d(0x5d7)]((_0x3456e1-_0x222002)*(0x2*Math['PI'])/_0x262b60)+0x1;case _0x48f66d(0x25d):var _0x262b60=0x1-_0x4edec3;if(_0x23beef===0x0||_0x23beef===0x1)return _0x23beef;var _0x3456e1=_0x23beef*0x2,_0x1a7712=_0x3456e1-0x1,_0x222002=_0x262b60/(0x2*Math['PI'])*Math['asin'](0x1);if(_0x3456e1<0x1)return-0.5*(Math[_0x48f66d(0x3ed)](0x2,0xa*_0x1a7712)*Math[_0x48f66d(0x5d7)]((_0x1a7712-_0x222002)*(0x2*Math['PI'])/_0x262b60));return Math[_0x48f66d(0x3ed)](0x2,-0xa*_0x1a7712)*Math[_0x48f66d(0x5d7)]((_0x1a7712-_0x222002)*(0x2*Math['PI'])/_0x262b60)*0.5+0x1;case _0x48f66d(0x739):var _0x3456e1=_0x23beef/0x1;if(_0x3456e1<0x1/2.75)return 7.5625*_0x3456e1*_0x3456e1;else{if(_0x3456e1<0x2/2.75){var _0x2c9dc5=_0x3456e1-1.5/2.75;return 7.5625*_0x2c9dc5*_0x2c9dc5+0.75;}else{if(_0x3456e1<2.5/2.75){var _0x2c9dc5=_0x3456e1-2.25/2.75;return 7.5625*_0x2c9dc5*_0x2c9dc5+0.9375;}else{var _0x2c9dc5=_0x3456e1-2.625/2.75;return 7.5625*_0x2c9dc5*_0x2c9dc5+0.984375;}}}case _0x48f66d(0x2f6):var _0x32ee0a=0x1-VisuMZ[_0x48f66d(0x22a)](0x1-_0x23beef,_0x48f66d(0x4f0));return _0x32ee0a;case'INOUTBOUNCE':if(_0x23beef<0.5)var _0x32ee0a=VisuMZ[_0x48f66d(0x22a)](_0x23beef*0x2,_0x48f66d(0x36c))*0.5;else var _0x32ee0a=VisuMZ['ApplyEasing'](_0x23beef*0x2-0x1,_0x48f66d(0x4f0))*0.5+0.5;return _0x32ee0a;default:return _0x23beef;}},VisuMZ[_0x55f97b(0x205)]=function(_0x1043d6){const _0x231068=_0x55f97b;_0x1043d6=String(_0x1043d6)[_0x231068(0x427)]();const _0x1ce839=VisuMZ[_0x231068(0x4af)]['Settings']['Param'];if(_0x1043d6==='MAXHP')return _0x1ce839[_0x231068(0x513)];if(_0x1043d6==='MAXMP')return _0x1ce839[_0x231068(0x5d1)];if(_0x1043d6===_0x231068(0x832))return _0x1ce839[_0x231068(0x752)];if(_0x1043d6===_0x231068(0x261))return _0x1ce839['IconParam3'];if(_0x1043d6===_0x231068(0x6d7))return _0x1ce839[_0x231068(0x84c)];if(_0x1043d6==='MDF')return _0x1ce839['IconParam5'];if(_0x1043d6==='AGI')return _0x1ce839[_0x231068(0x693)];if(_0x1043d6===_0x231068(0x6e4))return _0x1ce839[_0x231068(0x222)];if(_0x1043d6===_0x231068(0x64d))return _0x1ce839[_0x231068(0x444)];if(_0x1043d6===_0x231068(0x466))return _0x1ce839[_0x231068(0x48b)];if(_0x1043d6===_0x231068(0x34c))return _0x1ce839[_0x231068(0x460)];if(_0x1043d6==='CEV')return _0x1ce839[_0x231068(0x922)];if(_0x1043d6==='MEV')return _0x1ce839[_0x231068(0x4e2)];if(_0x1043d6===_0x231068(0x4e4))return _0x1ce839[_0x231068(0x633)];if(_0x1043d6===_0x231068(0x44d))return _0x1ce839['IconXParam6'];if(_0x1043d6===_0x231068(0x77c))return _0x1ce839[_0x231068(0x529)];if(_0x1043d6===_0x231068(0x8bc))return _0x1ce839['IconXParam8'];if(_0x1043d6==='TRG')return _0x1ce839[_0x231068(0x5b4)];if(_0x1043d6===_0x231068(0x818))return _0x1ce839[_0x231068(0x1d6)];if(_0x1043d6==='GRD')return _0x1ce839[_0x231068(0x5a3)];if(_0x1043d6===_0x231068(0x4f4))return _0x1ce839[_0x231068(0x5f6)];if(_0x1043d6===_0x231068(0x6f2))return _0x1ce839[_0x231068(0x213)];if(_0x1043d6===_0x231068(0x19c))return _0x1ce839[_0x231068(0x5f3)];if(_0x1043d6==='TCR')return _0x1ce839[_0x231068(0x690)];if(_0x1043d6==='PDR')return _0x1ce839[_0x231068(0x2d7)];if(_0x1043d6==='MDR')return _0x1ce839[_0x231068(0x461)];if(_0x1043d6===_0x231068(0x6ef))return _0x1ce839[_0x231068(0x599)];if(_0x1043d6===_0x231068(0x78d))return _0x1ce839[_0x231068(0x97f)];if(VisuMZ[_0x231068(0x4af)][_0x231068(0x1d9)][_0x1043d6])return VisuMZ[_0x231068(0x4af)]['CustomParamIcons'][_0x1043d6]||0x0;return 0x0;},VisuMZ[_0x55f97b(0x47d)]=function(_0x501a91,_0x59d300,_0x55b585){const _0x17629b=_0x55f97b;if(_0x55b585===undefined&&_0x501a91%0x1===0x0)return _0x501a91;if(_0x55b585!==undefined&&['MAXHP',_0x17629b(0x2bc),'ATK',_0x17629b(0x261),_0x17629b(0x6d7),'MDF',_0x17629b(0x385),_0x17629b(0x6e4)][_0x17629b(0x3e4)](String(_0x55b585)[_0x17629b(0x427)]()[_0x17629b(0x8e9)]()))return _0x501a91;_0x59d300=_0x59d300||0x0;if(VisuMZ[_0x17629b(0x4af)][_0x17629b(0x943)][_0x55b585])return VisuMZ['CoreEngine']['CustomParamType'][_0x55b585]===_0x17629b(0x4f9)?_0x501a91:String((_0x501a91*0x64)['toFixed'](_0x59d300))+'%';return String((_0x501a91*0x64)[_0x17629b(0x355)](_0x59d300))+'%';},VisuMZ[_0x55f97b(0x2b7)]=function(_0x16cf83){const _0x472b99=_0x55f97b;_0x16cf83=String(_0x16cf83);if(!_0x16cf83)return _0x16cf83;if(typeof _0x16cf83!==_0x472b99(0x81b))return _0x16cf83;const _0x2f7813=VisuMZ[_0x472b99(0x4af)][_0x472b99(0x386)][_0x472b99(0x585)][_0x472b99(0x42f)]||_0x472b99(0x64b),_0xba9f82={'maximumFractionDigits':0x6};_0x16cf83=_0x16cf83[_0x472b99(0x4ac)](/\[(.*?)\]/g,(_0x56729e,_0x3067c)=>{const _0x4e3b06=_0x472b99;return VisuMZ[_0x4e3b06(0x3a1)](_0x3067c,'[',']');}),_0x16cf83=_0x16cf83['replace'](/<(.*?)>/g,(_0x5697eb,_0x30ad34)=>{const _0x5d5944=_0x472b99;return VisuMZ[_0x5d5944(0x3a1)](_0x30ad34,'<','>');}),_0x16cf83=_0x16cf83[_0x472b99(0x4ac)](/\{\{(.*?)\}\}/g,(_0x104490,_0x2adbb7)=>{const _0x280eec=_0x472b99;return VisuMZ[_0x280eec(0x3a1)](_0x2adbb7,'','');}),_0x16cf83=_0x16cf83[_0x472b99(0x4ac)](/(\d+\.?\d*)/g,(_0x30b9d8,_0x16963f)=>{const _0x191492=_0x472b99;let _0x307ec0=_0x16963f;if(_0x307ec0[0x0]==='0')return _0x307ec0;if(_0x307ec0[_0x307ec0[_0x191492(0x382)]-0x1]==='.')return Number(_0x307ec0)[_0x191492(0x514)](_0x2f7813,_0xba9f82)+'.';else return _0x307ec0[_0x307ec0[_0x191492(0x382)]-0x1]===','?Number(_0x307ec0)[_0x191492(0x514)](_0x2f7813,_0xba9f82)+',':Number(_0x307ec0)[_0x191492(0x514)](_0x2f7813,_0xba9f82);});let _0x47a26e=0x3;while(_0x47a26e--){_0x16cf83=VisuMZ['RevertPreserveNumbers'](_0x16cf83);}return _0x16cf83;},VisuMZ[_0x55f97b(0x3a1)]=function(_0x283813,_0x959c22,_0xc60dcb){const _0x3332d8=_0x55f97b;return _0x283813=_0x283813[_0x3332d8(0x4ac)](/(\d)/gi,(_0x2bad81,_0x4cff53)=>'PRESERVCONVERSION(%1)'[_0x3332d8(0x55a)](Number(_0x4cff53))),_0x3332d8(0x4a5)[_0x3332d8(0x55a)](_0x283813,_0x959c22,_0xc60dcb);},VisuMZ[_0x55f97b(0x557)]=function(_0x4cc894){return _0x4cc894=_0x4cc894['replace'](/PRESERVCONVERSION\((\d+)\)/gi,(_0x2c54cc,_0x498a63)=>Number(parseInt(_0x498a63))),_0x4cc894;},VisuMZ[_0x55f97b(0x942)]=function(_0x2c7491){const _0x549f04=_0x55f97b;SoundManager[_0x549f04(0x4f3)]();if(!Utils['isNwjs']()){const _0x4bc411=window['open'](_0x2c7491,_0x549f04(0x981));}else{const _0x1baea7=process[_0x549f04(0x788)]==_0x549f04(0x976)?_0x549f04(0x4f8):process[_0x549f04(0x788)]=='win32'?_0x549f04(0x35f):_0x549f04(0x1c3);require(_0x549f04(0x34f))['exec'](_0x1baea7+'\x20'+_0x2c7491);}},VisuMZ[_0x55f97b(0x7b5)]=function(_0x38e3a5,_0x117614){const _0x2c21bb=_0x55f97b;if(!_0x38e3a5)return'';const _0x460b70=_0x38e3a5[_0x2c21bb(0x20c)]||_0x38e3a5['id'];let _0x30b4fc='';return _0x38e3a5[_0x2c21bb(0x62e)]!==undefined&&_0x38e3a5[_0x2c21bb(0x845)]!==undefined&&(_0x30b4fc='Actor-%1-%2'[_0x2c21bb(0x55a)](_0x460b70,_0x117614)),_0x38e3a5[_0x2c21bb(0x797)]!==undefined&&_0x38e3a5['learnings']!==undefined&&(_0x30b4fc=_0x2c21bb(0x885)[_0x2c21bb(0x55a)](_0x460b70,_0x117614)),_0x38e3a5['stypeId']!==undefined&&_0x38e3a5[_0x2c21bb(0x2dd)]!==undefined&&(_0x30b4fc=_0x2c21bb(0x463)['format'](_0x460b70,_0x117614)),_0x38e3a5['itypeId']!==undefined&&_0x38e3a5['consumable']!==undefined&&(_0x30b4fc='Item-%1-%2'[_0x2c21bb(0x55a)](_0x460b70,_0x117614)),_0x38e3a5[_0x2c21bb(0x39f)]!==undefined&&_0x38e3a5[_0x2c21bb(0x5f8)]===0x1&&(_0x30b4fc='Weapon-%1-%2'[_0x2c21bb(0x55a)](_0x460b70,_0x117614)),_0x38e3a5[_0x2c21bb(0x886)]!==undefined&&_0x38e3a5[_0x2c21bb(0x5f8)]>0x1&&(_0x30b4fc=_0x2c21bb(0x1ba)[_0x2c21bb(0x55a)](_0x460b70,_0x117614)),_0x38e3a5[_0x2c21bb(0x671)]!==undefined&&_0x38e3a5['battlerHue']!==undefined&&(_0x30b4fc=_0x2c21bb(0x349)[_0x2c21bb(0x55a)](_0x460b70,_0x117614)),_0x38e3a5[_0x2c21bb(0x1cc)]!==undefined&&_0x38e3a5['maxTurns']!==undefined&&(_0x30b4fc=_0x2c21bb(0x2c9)[_0x2c21bb(0x55a)](_0x460b70,_0x117614)),_0x30b4fc;},Window_Base['prototype'][_0x55f97b(0x3f5)]=function(_0x51ca70,_0x53b9e9){const _0x579fa3=_0x55f97b,_0x4f72ff=ImageManager['standardIconWidth']||0x20,_0x2a839c=ImageManager[_0x579fa3(0x62b)]||0x20;if(_0x53b9e9[_0x579fa3(0x988)]){const _0x58154e=_0x4f72ff-ImageManager[_0x579fa3(0x448)],_0x25d104=_0x2a839c-ImageManager[_0x579fa3(0x447)];let _0x212d38=0x2,_0x416230=0x2;this[_0x579fa3(0x254)]()!==0x24&&(_0x416230=Math[_0x579fa3(0x8d7)]((this[_0x579fa3(0x254)]()-_0x2a839c)/0x2));const _0x479bf4=_0x53b9e9['x']+Math['floor'](_0x58154e/0x2)+_0x212d38,_0x446ca5=_0x53b9e9['y']+Math[_0x579fa3(0x8d7)](_0x25d104/0x2)+_0x416230;this[_0x579fa3(0x516)](_0x51ca70,_0x479bf4,_0x446ca5);}_0x53b9e9['x']+=_0x4f72ff+0x4;},Window_StatusBase[_0x55f97b(0x616)]['drawActorIcons']=function(_0x1e7fca,_0x4aa7d7,_0x50aa90,_0x5b2c1c){const _0xf73910=_0x55f97b;_0x5b2c1c=_0x5b2c1c||0x90;const _0x3ef57b=ImageManager[_0xf73910(0x1b2)]||0x20,_0x129805=ImageManager[_0xf73910(0x62b)]||0x20,_0x50e953=_0x3ef57b-ImageManager[_0xf73910(0x448)],_0xdccd9c=_0x129805-ImageManager[_0xf73910(0x447)],_0x36fc23=_0x3ef57b,_0x4f2d17=_0x1e7fca[_0xf73910(0x85b)]()[_0xf73910(0x718)](0x0,Math[_0xf73910(0x8d7)](_0x5b2c1c/_0x36fc23));let _0x1ecee6=_0x4aa7d7+Math[_0xf73910(0x6af)](_0x50e953/0x2),_0x419f30=_0x50aa90+Math[_0xf73910(0x6af)](_0xdccd9c/0x2);for(const _0x592f64 of _0x4f2d17){this[_0xf73910(0x516)](_0x592f64,_0x1ecee6,_0x419f30),_0x1ecee6+=_0x36fc23;}},Game_Picture[_0x55f97b(0x616)][_0x55f97b(0x30d)]=function(){const _0x35e3ad=_0x55f97b;return this[_0x35e3ad(0x8c8)];},VisuMZ['CoreEngine'][_0x55f97b(0x649)]=Game_Picture[_0x55f97b(0x616)]['initBasic'],Game_Picture[_0x55f97b(0x616)]['initBasic']=function(){const _0x57788c=_0x55f97b;VisuMZ['CoreEngine'][_0x57788c(0x649)]['call'](this),this['_anchor']={'x':0x0,'y':0x0},this[_0x57788c(0x289)]={'x':0x0,'y':0x0};},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x297)]=Game_Picture[_0x55f97b(0x616)][_0x55f97b(0x2d2)],Game_Picture['prototype'][_0x55f97b(0x2d2)]=function(){const _0x5a99a8=_0x55f97b;this[_0x5a99a8(0x635)]();const _0x35ad25=this['_duration'];VisuMZ['CoreEngine'][_0x5a99a8(0x297)][_0x5a99a8(0x8a8)](this),_0x35ad25>0x0&&this[_0x5a99a8(0x5d6)]<=0x0&&(this['_x']=this[_0x5a99a8(0x3ab)],this['_y']=this[_0x5a99a8(0x92d)],this[_0x5a99a8(0x252)]=this[_0x5a99a8(0x487)],this[_0x5a99a8(0x479)]=this[_0x5a99a8(0x69b)],this[_0x5a99a8(0x6a2)]=this[_0x5a99a8(0x78e)],this[_0x5a99a8(0x8c8)]&&(this['_anchor']['x']=this[_0x5a99a8(0x289)]['x'],this[_0x5a99a8(0x8c8)]['y']=this['_targetAnchor']['y']));},VisuMZ['CoreEngine']['Game_Picture_show']=Game_Picture['prototype'][_0x55f97b(0x47e)],Game_Picture[_0x55f97b(0x616)][_0x55f97b(0x47e)]=function(_0x5ed4d4,_0x15c775,_0xadfb96,_0x1f89cc,_0x5e328c,_0x37de32,_0x1fc40e,_0x1627c9){const _0x1c11b8=_0x55f97b;VisuMZ['CoreEngine'][_0x1c11b8(0x67c)][_0x1c11b8(0x8a8)](this,_0x5ed4d4,_0x15c775,_0xadfb96,_0x1f89cc,_0x5e328c,_0x37de32,_0x1fc40e,_0x1627c9),this[_0x1c11b8(0x5d9)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x15c775]||{'x':0x0,'y':0x0});},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x4c8)]=Game_Picture[_0x55f97b(0x616)][_0x55f97b(0x55b)],Game_Picture[_0x55f97b(0x616)][_0x55f97b(0x55b)]=function(_0x3f89c7,_0x9f6bed,_0x53b021,_0x58c9d1,_0x1a5a31,_0x5bf478,_0x172f6c,_0x431507,_0x250d9f){const _0x2dab0e=_0x55f97b;VisuMZ['CoreEngine']['Game_Picture_move'][_0x2dab0e(0x8a8)](this,_0x3f89c7,_0x9f6bed,_0x53b021,_0x58c9d1,_0x1a5a31,_0x5bf478,_0x172f6c,_0x431507,_0x250d9f),this[_0x2dab0e(0x49a)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x3f89c7]||{'x':0x0,'y':0x0});},Game_Picture[_0x55f97b(0x616)]['updateAnchor']=function(){const _0x3d93a2=_0x55f97b;this[_0x3d93a2(0x5d6)]>0x0&&(this['_anchor']['x']=this['applyEasing'](this[_0x3d93a2(0x8c8)]['x'],this[_0x3d93a2(0x289)]['x']),this[_0x3d93a2(0x8c8)]['y']=this[_0x3d93a2(0x5da)](this[_0x3d93a2(0x8c8)]['y'],this['_targetAnchor']['y']));},Game_Picture[_0x55f97b(0x616)][_0x55f97b(0x5d9)]=function(_0x4c08ee){const _0x14ca7c=_0x55f97b;this[_0x14ca7c(0x8c8)]=_0x4c08ee,this['_targetAnchor']=JsonEx[_0x14ca7c(0x2d8)](this['_anchor']);},Game_Picture[_0x55f97b(0x616)][_0x55f97b(0x49a)]=function(_0x3944ca){const _0x5976c2=_0x55f97b;this[_0x5976c2(0x289)]=_0x3944ca;},VisuMZ[_0x55f97b(0x4af)]['Sprite_Picture_updateOrigin']=Sprite_Picture['prototype'][_0x55f97b(0x702)],Sprite_Picture[_0x55f97b(0x616)][_0x55f97b(0x702)]=function(){const _0x1ef323=_0x55f97b,_0x33433e=this[_0x1ef323(0x32b)]();!_0x33433e[_0x1ef323(0x30d)]()?VisuMZ[_0x1ef323(0x4af)][_0x1ef323(0x6b2)][_0x1ef323(0x8a8)](this):(this['anchor']['x']=_0x33433e['anchor']()['x'],this['anchor']['y']=_0x33433e[_0x1ef323(0x30d)]()['y']);},Game_Action[_0x55f97b(0x616)]['setEnemyAction']=function(_0x319138){const _0x1d61c0=_0x55f97b;if(_0x319138){const _0x4325bf=_0x319138[_0x1d61c0(0x394)];if(_0x4325bf===0x1&&this['subject']()[_0x1d61c0(0x4a0)]()!==0x1)this[_0x1d61c0(0x597)]();else _0x4325bf===0x2&&this[_0x1d61c0(0x433)]()[_0x1d61c0(0x3e8)]()!==0x2?this[_0x1d61c0(0x276)]():this[_0x1d61c0(0x7d8)](_0x4325bf);}else this['clear']();},Game_Actor[_0x55f97b(0x616)]['usableSkills']=function(){const _0x1b4fa5=_0x55f97b;return this[_0x1b4fa5(0x8c5)]()[_0x1b4fa5(0x217)](_0x3dae15=>this[_0x1b4fa5(0x2ea)](_0x3dae15)&&this['skillTypes']()[_0x1b4fa5(0x3e4)](_0x3dae15[_0x1b4fa5(0x898)]));},Window_Base[_0x55f97b(0x616)]['createDimmerSprite']=function(){const _0x26ef9f=_0x55f97b;this['_dimmerSprite']=new Sprite(),this['_dimmerSprite'][_0x26ef9f(0x1ef)]=new Bitmap(0x0,0x0),this['_dimmerSprite']['x']=0x0,this[_0x26ef9f(0x521)](this[_0x26ef9f(0x5c4)]);},Window_Base[_0x55f97b(0x616)][_0x55f97b(0x95f)]=function(){const _0xd5bcd=_0x55f97b;if(this[_0xd5bcd(0x5c4)]){const _0x2fb190=this[_0xd5bcd(0x5c4)][_0xd5bcd(0x1ef)],_0x1036c9=this['width'],_0x263ee7=this[_0xd5bcd(0x4f7)],_0x2b9fdf=this[_0xd5bcd(0x6d0)],_0x268501=ColorManager[_0xd5bcd(0x89c)](),_0x486a9f=ColorManager['dimColor2']();_0x2fb190[_0xd5bcd(0x5c6)](_0x1036c9,_0x263ee7),_0x2fb190['gradientFillRect'](0x0,0x0,_0x1036c9,_0x2b9fdf,_0x486a9f,_0x268501,!![]),_0x2fb190[_0xd5bcd(0x5ba)](0x0,_0x2b9fdf,_0x1036c9,_0x263ee7-_0x2b9fdf*0x2,_0x268501),_0x2fb190[_0xd5bcd(0x87a)](0x0,_0x263ee7-_0x2b9fdf,_0x1036c9,_0x2b9fdf,_0x268501,_0x486a9f,!![]),this[_0xd5bcd(0x5c4)][_0xd5bcd(0x4e7)](0x0,0x0,_0x1036c9,_0x263ee7);}},Game_Actor[_0x55f97b(0x616)]['makeAutoBattleActions']=function(){const _0x4fc5b9=_0x55f97b;for(let _0x24a709=0x0;_0x24a709<this[_0x4fc5b9(0x25b)]();_0x24a709++){const _0x542ad2=this[_0x4fc5b9(0x4d0)]();let _0x58db1e=Number[_0x4fc5b9(0x846)];this[_0x4fc5b9(0x2a5)](_0x24a709,_0x542ad2[0x0]);for(const _0x3ce72d of _0x542ad2){const _0x490807=_0x3ce72d['evaluate']();_0x490807>_0x58db1e&&(_0x58db1e=_0x490807,this[_0x4fc5b9(0x2a5)](_0x24a709,_0x3ce72d));}}this[_0x4fc5b9(0x28f)](_0x4fc5b9(0x501));},Window_BattleItem[_0x55f97b(0x616)][_0x55f97b(0x745)]=function(_0x3aeb75){const _0x4dc736=_0x55f97b;return BattleManager[_0x4dc736(0x5f7)]()?BattleManager[_0x4dc736(0x5f7)]()[_0x4dc736(0x2ea)](_0x3aeb75):Window_ItemList['prototype']['isEnabled']['call'](this,_0x3aeb75);},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x928)]=Scene_Map[_0x55f97b(0x616)][_0x55f97b(0x26e)],Scene_Map[_0x55f97b(0x616)][_0x55f97b(0x26e)]=function(){const _0x1c5e31=_0x55f97b;VisuMZ['CoreEngine'][_0x1c5e31(0x928)][_0x1c5e31(0x8a8)](this);const _0x309b84=this[_0x1c5e31(0x891)]['_timerSprite'];if(_0x309b84)this[_0x1c5e31(0x87c)](_0x309b84);},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x82e)]=Scene_Battle[_0x55f97b(0x616)][_0x55f97b(0x26e)],Scene_Battle[_0x55f97b(0x616)][_0x55f97b(0x26e)]=function(){const _0x45bed6=_0x55f97b;VisuMZ[_0x45bed6(0x4af)][_0x45bed6(0x82e)]['call'](this);const _0x45ae39=this[_0x45bed6(0x891)][_0x45bed6(0x329)];if(_0x45ae39)this[_0x45bed6(0x87c)](_0x45ae39);},Sprite_Actor['prototype'][_0x55f97b(0x94f)]=function(){const _0x4d8bcb=_0x55f97b;Sprite_Battler[_0x4d8bcb(0x616)]['update']['call'](this),this[_0x4d8bcb(0x6bf)]();if(this[_0x4d8bcb(0x1da)])this[_0x4d8bcb(0x882)]();else this[_0x4d8bcb(0x24d)]!==''&&(this[_0x4d8bcb(0x24d)]='');},Window[_0x55f97b(0x616)]['_refreshArrows']=function(){const _0x751352=_0x55f97b,_0x5281c3=this['_width'],_0x62117e=this['_height'],_0x4c9e35=0x18,_0x20ae42=_0x4c9e35/0x2,_0x1df9b6=0x60+_0x4c9e35,_0x1cf799=0x0+_0x4c9e35;this['_downArrowSprite']['bitmap']=this[_0x751352(0x8c4)],this['_downArrowSprite'][_0x751352(0x30d)]['x']=0.5,this[_0x751352(0x3ce)]['anchor']['y']=0.5,this[_0x751352(0x3ce)]['setFrame'](_0x1df9b6+_0x20ae42,_0x1cf799+_0x20ae42+_0x4c9e35,_0x4c9e35,_0x20ae42),this[_0x751352(0x3ce)][_0x751352(0x55b)](Math[_0x751352(0x7dd)](_0x5281c3/0x2),Math['round'](_0x62117e-_0x20ae42)),this[_0x751352(0x56c)][_0x751352(0x1ef)]=this[_0x751352(0x8c4)],this['_upArrowSprite'][_0x751352(0x30d)]['x']=0.5,this['_upArrowSprite'][_0x751352(0x30d)]['y']=0.5,this[_0x751352(0x56c)]['setFrame'](_0x1df9b6+_0x20ae42,_0x1cf799,_0x4c9e35,_0x20ae42),this['_upArrowSprite'][_0x751352(0x55b)](Math['round'](_0x5281c3/0x2),Math[_0x751352(0x7dd)](_0x20ae42));},Window[_0x55f97b(0x616)]['_refreshPauseSign']=function(){const _0x5c01ce=_0x55f97b,_0x429746=0x90,_0x4314d4=0x60,_0x424682=0x18;this[_0x5c01ce(0x8df)][_0x5c01ce(0x1ef)]=this['_windowskin'],this['_pauseSignSprite'][_0x5c01ce(0x30d)]['x']=0.5,this[_0x5c01ce(0x8df)]['anchor']['y']=0x1,this[_0x5c01ce(0x8df)]['move'](Math[_0x5c01ce(0x7dd)](this[_0x5c01ce(0x34a)]/0x2),this[_0x5c01ce(0x334)]),this[_0x5c01ce(0x8df)][_0x5c01ce(0x4e7)](_0x429746,_0x4314d4,_0x424682,_0x424682),this[_0x5c01ce(0x8df)][_0x5c01ce(0x814)]=0xff;},Window[_0x55f97b(0x616)]['_updateFilterArea']=function(){const _0x84b54=_0x55f97b,_0x1111fa=this[_0x84b54(0x83a)]['worldTransform']['apply'](new Point(0x0,0x0)),_0x2b9336=this['_clientArea'][_0x84b54(0x7ca)];_0x2b9336['x']=_0x1111fa['x']+this[_0x84b54(0x2eb)]['x'],_0x2b9336['y']=_0x1111fa['y']+this[_0x84b54(0x2eb)]['y'],_0x2b9336[_0x84b54(0x7cc)]=Math[_0x84b54(0x6af)](this[_0x84b54(0x96a)]*this[_0x84b54(0x4ba)]['x']),_0x2b9336[_0x84b54(0x4f7)]=Math[_0x84b54(0x6af)](this[_0x84b54(0x949)]*this['scale']['y']);},VisuMZ['CoreEngine'][_0x55f97b(0x2cf)]=Window[_0x55f97b(0x616)][_0x55f97b(0x3b6)],Window[_0x55f97b(0x616)][_0x55f97b(0x3b6)]=function(){const _0xbd943e=_0x55f97b,_0x4a0698=VisuMZ[_0xbd943e(0x4af)][_0xbd943e(0x386)]['Window'][_0xbd943e(0x714)]??!![];if(!_0x4a0698)return VisuMZ['CoreEngine']['Window_refreshBack'][_0xbd943e(0x8a8)](this);const _0x3e0f8f=this[_0xbd943e(0x90e)],_0x123778=Math['max'](0x0,this[_0xbd943e(0x34a)]-_0x3e0f8f*0x2),_0x31362d=Math['max'](0x0,this[_0xbd943e(0x334)]-_0x3e0f8f*0x2),_0x5baa03=this[_0xbd943e(0x75d)],_0x424f8e=_0x5baa03[_0xbd943e(0x94e)][0x0];_0x5baa03[_0xbd943e(0x1ef)]=this[_0xbd943e(0x8c4)],_0x5baa03[_0xbd943e(0x4e7)](0x0,0x0,0x60,0x60),_0x5baa03['move'](_0x3e0f8f,_0x3e0f8f),_0x5baa03[_0xbd943e(0x4ba)]['x']=_0x123778/0x60,_0x5baa03[_0xbd943e(0x4ba)]['y']=_0x31362d/0x60,_0x424f8e[_0xbd943e(0x1ef)]=this[_0xbd943e(0x8c4)],_0x424f8e[_0xbd943e(0x4e7)](0x0,0x60,0x60,0x60),_0x424f8e[_0xbd943e(0x55b)](0x0,0x0,_0x123778,_0x31362d),_0x424f8e[_0xbd943e(0x4ba)]['x']=0x1/_0x5baa03[_0xbd943e(0x4ba)]['x'],_0x424f8e['scale']['y']=0x1/_0x5baa03[_0xbd943e(0x4ba)]['y'],_0x5baa03['setColorTone'](this[_0xbd943e(0x78f)]);},Game_Temp[_0x55f97b(0x616)][_0x55f97b(0x6bc)]=function(){const _0x467130=_0x55f97b;this[_0x467130(0x7da)]=[],this[_0x467130(0x37a)]=[],this['_pointAnimationQueue']=[],this['_balloonQueue']=[];},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x5e6)]=Scene_Base['prototype'][_0x55f97b(0x3ef)],Scene_Base[_0x55f97b(0x616)][_0x55f97b(0x3ef)]=function(){const _0x2cf734=_0x55f97b;if($gameTemp)$gameTemp['sceneTerminationClearEffects']();VisuMZ[_0x2cf734(0x4af)][_0x2cf734(0x5e6)][_0x2cf734(0x8a8)](this);},Bitmap[_0x55f97b(0x616)]['measureTextWidthNoRounding']=function(_0x318283){const _0x43941b=_0x55f97b,_0x54b375=this['context'];_0x54b375[_0x43941b(0x6f3)](),_0x54b375[_0x43941b(0x5ea)]=this[_0x43941b(0x93f)]();const _0x3c3852=_0x54b375[_0x43941b(0x567)](_0x318283)[_0x43941b(0x7cc)];return _0x54b375[_0x43941b(0x246)](),_0x3c3852;},Window_Message[_0x55f97b(0x616)][_0x55f97b(0x347)]=function(_0x4fe8e7){const _0x1cf261=_0x55f97b;return this[_0x1cf261(0x549)]()?this[_0x1cf261(0x354)][_0x1cf261(0x5aa)](_0x4fe8e7):Window_Base['prototype']['textWidth'][_0x1cf261(0x8a8)](this,_0x4fe8e7);},Window_Message[_0x55f97b(0x616)][_0x55f97b(0x549)]=function(){const _0x578b73=_0x55f97b;return VisuMZ[_0x578b73(0x4af)][_0x578b73(0x386)][_0x578b73(0x585)][_0x578b73(0x569)]??!![];},VisuMZ['CoreEngine'][_0x55f97b(0x42c)]=Game_Action[_0x55f97b(0x616)][_0x55f97b(0x8c3)],Game_Action[_0x55f97b(0x616)][_0x55f97b(0x8c3)]=function(){const _0x1565c3=_0x55f97b;return this['item']()?VisuMZ[_0x1565c3(0x4af)]['Game_Action_numRepeats'][_0x1565c3(0x8a8)](this):0x0;},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x454)]=Game_Action[_0x55f97b(0x616)][_0x55f97b(0x597)],Game_Action[_0x55f97b(0x616)][_0x55f97b(0x597)]=function(){const _0x4be685=_0x55f97b;if(this[_0x4be685(0x433)]()&&this['subject']()[_0x4be685(0x6ba)]())VisuMZ[_0x4be685(0x4af)][_0x4be685(0x454)][_0x4be685(0x8a8)](this);else BattleManager[_0x4be685(0x41e)]?VisuMZ['CoreEngine']['Game_Action_setAttack'][_0x4be685(0x8a8)](this):this['clear']();},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x74b)]=BattleManager['invokeCounterAttack'],BattleManager[_0x55f97b(0x6d8)]=function(_0x444019,_0x25e1d3){const _0x360e4d=_0x55f97b;this[_0x360e4d(0x41e)]=!![],VisuMZ[_0x360e4d(0x4af)][_0x360e4d(0x74b)][_0x360e4d(0x8a8)](this,_0x444019,_0x25e1d3),this[_0x360e4d(0x41e)]=undefined;},Sprite_Name[_0x55f97b(0x616)][_0x55f97b(0x200)]=function(){return 0x24;},Sprite_Name[_0x55f97b(0x616)][_0x55f97b(0x44a)]=function(){const _0x22e74d=_0x55f97b,_0x247ab2=this[_0x22e74d(0x1bc)](),_0x1143fa=this['bitmapWidth'](),_0x25b0be=this[_0x22e74d(0x200)]();this[_0x22e74d(0x478)](),this[_0x22e74d(0x1ef)][_0x22e74d(0x4fc)](),this['bitmap'][_0x22e74d(0x7b6)](_0x247ab2,0x4,0x0,_0x1143fa-0xa,_0x25b0be,_0x22e74d(0x55f));},Bitmap[_0x55f97b(0x616)][_0x55f97b(0x7b6)]=function(_0x134878,_0x208b0f,_0x2f5d60,_0x304ad6,_0x35c7a4,_0x2a2b6c){const _0x4fa470=_0x55f97b,_0x2fb786=this[_0x4fa470(0x5b1)],_0x2c063d=_0x2fb786[_0x4fa470(0x666)];_0x304ad6=_0x304ad6||0xffffffff;let _0x23bc2b=_0x208b0f,_0x38dcf1=Math[_0x4fa470(0x7dd)](_0x2f5d60+0x18/0x2+this[_0x4fa470(0x697)]*0.35);_0x2a2b6c===_0x4fa470(0x8ac)&&(_0x23bc2b+=_0x304ad6/0x2),_0x2a2b6c==='right'&&(_0x23bc2b+=_0x304ad6),_0x2fb786[_0x4fa470(0x6f3)](),_0x2fb786[_0x4fa470(0x5ea)]=this[_0x4fa470(0x93f)](),_0x2fb786[_0x4fa470(0x4c1)]=_0x2a2b6c,_0x2fb786['textBaseline']=_0x4fa470(0x369),_0x2fb786[_0x4fa470(0x666)]=0x1,this[_0x4fa470(0x7e3)](_0x134878,_0x23bc2b,_0x38dcf1,_0x304ad6),_0x2fb786['globalAlpha']=_0x2c063d,this[_0x4fa470(0x27f)](_0x134878,_0x23bc2b,_0x38dcf1,_0x304ad6),_0x2fb786[_0x4fa470(0x246)](),this['_baseTexture'][_0x4fa470(0x94f)]();},VisuMZ['CoreEngine'][_0x55f97b(0x8d8)]=BattleManager[_0x55f97b(0x1f8)],BattleManager[_0x55f97b(0x1f8)]=function(_0x418354){const _0x22c2b5=_0x55f97b;if(this[_0x22c2b5(0x65a)][_0x22c2b5(0x352)]())return![];return VisuMZ['CoreEngine'][_0x22c2b5(0x8d8)][_0x22c2b5(0x8a8)](this,_0x418354);},BattleManager[_0x55f97b(0x4b5)]=function(){const _0x3a91e5=_0x55f97b;if(this[_0x3a91e5(0x46c)])this['_logWindow']['endAction'](this['_subject']);this[_0x3a91e5(0x4e8)]=_0x3a91e5(0x426),this[_0x3a91e5(0x46c)]&&this[_0x3a91e5(0x46c)][_0x3a91e5(0x25b)]()===0x0&&(this[_0x3a91e5(0x40a)](this[_0x3a91e5(0x46c)]),this[_0x3a91e5(0x46c)]=null);},Bitmap[_0x55f97b(0x616)]['_startLoading']=function(){const _0x3bfe03=_0x55f97b;this['_image']=new Image(),this[_0x3bfe03(0x4b2)][_0x3bfe03(0x236)]=this['_onLoad'][_0x3bfe03(0x5cb)](this),this[_0x3bfe03(0x4b2)][_0x3bfe03(0x66f)]=this[_0x3bfe03(0x4a3)]['bind'](this),this[_0x3bfe03(0x3a6)](),this[_0x3bfe03(0x758)]='loading',Utils[_0x3bfe03(0x309)]()?this['_startDecrypting']():(this[_0x3bfe03(0x4b2)][_0x3bfe03(0x930)]=this[_0x3bfe03(0x51b)],![]&&this['_image'][_0x3bfe03(0x7cc)]>0x0&&(this[_0x3bfe03(0x4b2)][_0x3bfe03(0x236)]=null,this[_0x3bfe03(0x219)]()));},Scene_Skill[_0x55f97b(0x616)][_0x55f97b(0x201)]=function(){const _0x54a429=_0x55f97b;Scene_MenuBase[_0x54a429(0x616)]['onActorChange'][_0x54a429(0x8a8)](this),this[_0x54a429(0x77b)](),this['_itemWindow'][_0x54a429(0x61f)](),this[_0x54a429(0x468)][_0x54a429(0x3c5)](),this[_0x54a429(0x7ff)][_0x54a429(0x2d4)]();},Scene_Skill[_0x55f97b(0x616)][_0x55f97b(0x7e6)]=function(){const _0x55bf24=_0x55f97b;return this[_0x55bf24(0x7ff)]&&this['_skillTypeWindow'][_0x55bf24(0x37e)];},Game_Map[_0x55f97b(0x616)]['checkPassage']=function(_0x3ce6ee,_0x4143e6,_0x4301cf){const _0x116e1e=_0x55f97b,_0x219884=this[_0x116e1e(0x7f6)](),_0x5459c8=this['allTiles'](_0x3ce6ee,_0x4143e6);for(const _0x2313d6 of _0x5459c8){const _0x365d88=_0x219884[_0x2313d6];if(_0x365d88===undefined||_0x365d88===null){if($gameTemp[_0x116e1e(0x206)]()&&!DataManager[_0x116e1e(0x779)]()){let _0x25b180=_0x116e1e(0x4df)+'\x0a';_0x25b180+=_0x116e1e(0x59e)+'\x0a',_0x25b180+=_0x116e1e(0x5bf);if(this[_0x116e1e(0x4bb)]())alert(_0x25b180),SceneManager['exit']();else{if(!this['_displayedPassageError'])console[_0x116e1e(0x84b)](_0x25b180);this['_displayedPassageError']=!![];}}}if((_0x365d88&0x10)!==0x0)continue;if((_0x365d88&_0x4301cf)===0x0)return!![];if((_0x365d88&_0x4301cf)===_0x4301cf)return![];}return![];},Game_Map[_0x55f97b(0x616)][_0x55f97b(0x4bb)]=function(){const _0x56391f=_0x55f97b;if(Imported[_0x56391f(0x6d1)])return!![];if(Imported[_0x56391f(0x518)])return!![];return![];},Sprite_Animation[_0x55f97b(0x616)][_0x55f97b(0x966)]=function(_0x5479e4){const _0x4a9e5f=_0x55f97b;!this[_0x4a9e5f(0x20f)]&&(this[_0x4a9e5f(0x20f)]=_0x5479e4['gl'][_0x4a9e5f(0x407)](_0x5479e4['gl'][_0x4a9e5f(0x33c)]));},VisuMZ['CoreEngine']['Scene_Map_shouldAutosave']=Scene_Map['prototype'][_0x55f97b(0x903)],Scene_Map['prototype'][_0x55f97b(0x903)]=function(){const _0x197536=_0x55f97b,_0x435d6e=SceneManager['_previousClass']['name'];if([_0x197536(0x7d4),_0x197536(0x582),_0x197536(0x1bd),_0x197536(0x375)][_0x197536(0x3e4)](_0x435d6e))return![];return VisuMZ[_0x197536(0x4af)][_0x197536(0x77e)][_0x197536(0x8a8)](this);},VisuMZ[_0x55f97b(0x4af)][_0x55f97b(0x370)]=Window_SkillList[_0x55f97b(0x616)][_0x55f97b(0x3e4)],Window_SkillList[_0x55f97b(0x616)][_0x55f97b(0x3e4)]=function(_0x131c69){const _0x30e4a0=_0x55f97b;if(this[_0x30e4a0(0x798)]<=0x0)return![];return VisuMZ[_0x30e4a0(0x4af)][_0x30e4a0(0x370)]['call'](this,_0x131c69);};