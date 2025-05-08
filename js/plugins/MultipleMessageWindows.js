// MultipleMessageWindows.js Ver.1.3.0
// MIT License (C) 2023 あわやまたな
// http://opensource.org/licenses/mit-license.php

/*:
* @target MZ
* @plugindesc  Allows multiple message windows to be displayed.
* @orderAfter MessagePlus
* @orderAfter MessageWindowPopup
* @author あわやまたな (Awaya_Matana)
* @url https://awaya3ji.seesaa.net/article/498781437.html
* @help Ver.1.3.0
*
* @param numWindows
* @text Number of Windows
* @desc Number of message windows to increase.
* @type number
* @default 2
* @min 1
*
* @command changeTarget
* @text Change Target
* @desc Select the message window you want to operate on.
* 0 is the original window.
*
* @arg id
* @text Window ID
* @type number
* @default 0
*
* @command setWaitMode
* @text Set Wait Mode
* @desc Whether to wait to execute the event until the message window closes.
*
* @arg id
* @text Window ID
* @desc -1 for all windows.
* @type number
* @default -1
* @min -1
*
* @arg bool
* @text Boolean Value
* @type boolean
* @default true
*
* @command setNotClose
* @text Set Not Close
* @desc Prevents message windows from closing.
*
* @arg id
* @text Window ID
* @desc -1 for all windows.
* @type number
* @default -1
* @min -1
*
* @arg bool
* @text Boolean Value
* @type boolean
* @default false
*
* @command setAll
* @text Set All
* @desc Set all at once.
* If left blank, the status quo will be maintained.
*
* @arg id
* @text Window ID
* @desc -1 for all windows.
* @type number
* @default -1
* @min -1
*
* @arg waitMode
* @text Wait Mode
* @desc Whether to wait to execute the event until the message window closes.
* @type boolean
* @default true
*
* @arg notClose
* @text Set Not Close
* @desc Prevents message windows from closing.
* @type boolean
* @default false
*
* @command forceClose
* @text Force Close
* @desc Close the message window.
*
* @arg id
* @text Window ID
* @desc -1 for all windows.
* @type number
* @default -1
* @min -1
*
* @command synchronize
* @text Synchronize
* @desc Wait until all message windows are displayed.
*
* @arg bool
* @text Boolean Value
* @type boolean
* @default false
*
* @command setAnimation
* @text Set Animation
* @desc Enable open/close animation.
*
* @arg bool
* @text Boolean Value
* @type boolean
* @default true
*
* @command waitForCompletion
* @text Wait for Completion
* @desc Wait until the last targeted window completes its operation.
*
* @command resetAll
* @text Reset All
* @desc Initializes all target, wait mode, etc.
* We recommend doing this after every event.
*
*/

/*:ja
* @target MZ
* @plugindesc  メッセージウィンドウを複数表示可能にします。
* @orderAfter MessagePlus
* @orderAfter MessageWindowPopup
* @author あわやまたな (Awaya_Matana)
* @url https://awaya3ji.seesaa.net/article/498781437.html
* @help 不具合がある場合は無効化して下さい。
*
* [更新履歴]
* 2023/03/29：Ver.0.9.0b　公開。
* 2023/03/29：Ver.0.9.1b　シンクロさせた時に次の文章表示前に閉じてしまう不具合を修正。
* 2023/03/31：Ver.0.9.2b　固定中はポーズサインを非表示に。MultipleMessagesクラスを追加。
* 2023/10/20：Ver.1.0.0　対象切り替え時の仕様を修正。
* 2024/01/13：Ver.1.1.0　MessageWindowPopupに暫定的に対応。
* 2025/02/27：Ver.1.2.0　競合対策。
* 2025/03/13：Ver.1.3.0　[強制的に閉じる]を[全てリセット]で解除されないようにしました。
*
* @param numWindows
* @text ウィンドウ数
* @desc 増やすメッセージウィンドウの数です。
* @type number
* @default 2
* @min 1
*
* @param numWindows
* @text ウィンドウ数
* @desc 増やすメッセージウィンドウの数です。
* @type number
* @default 2
* @min 1
*
* @command changeTarget
* @text 対象変更
* @desc 操作するメッセージウィンドウを選択します。
* 0が元からあるウィンドウです。
*
* @arg id
* @text ウィンドウID
* @type number
* @default 0
*
* @command setWaitMode
* @text 待機モード
* @desc メッセージウィンドウが閉じるまでイベント実行を待機するかどうか。いわゆる完了までウェイトを行うか。
*
* @arg id
* @text ウィンドウID
* @desc -1で全てのウィンドウ。
* @type number
* @default -1
* @min -1
*
* @arg bool
* @text 真偽値
* @type boolean
* @default true
*
* @command setNotClose
* @text 固定
* @desc メッセージウィンドウを閉じなくします。
*
* @arg id
* @text ウィンドウID
* @desc -1で全てのウィンドウ。
* @type number
* @default -1
* @min -1
*
* @arg bool
* @text 真偽値
* @type boolean
* @default false
*
* @command setAll
* @text 一括設定
* @desc 一括で設定します。
* 空白にすると現状維持。
* 
* @arg id
* @text ウィンドウID
* @desc -1で全てのウィンドウ。
* @type number
* @default -1
* @min -1
*
* @arg waitMode
* @text 待機モード
* @desc メッセージウィンドウが閉じるまでイベント実行を待機するかどうか。いわゆる完了までウェイトを行うか。
* @type boolean
* @default true
*
* @arg notClose
* @text 固定
* @desc メッセージウィンドウを閉じなくします。
* @type boolean
* @default false
*
* @command forceClose
* @text 強制的に閉じる
* @desc メッセージウィンドウを閉じます。
*
* @arg id
* @text ウィンドウID
* @desc -1で全てのウィンドウ。
* @type number
* @default -1
* @min -1
*
* @command synchronize
* @text シンクロする
* @desc 全てのメッセージウィンドウが表示し終わるまで待ちます。
*
* @arg bool
* @text 真偽値
* @type boolean
* @default false
*
* @command setAnimation
* @text 開閉アニメ
* @desc 開閉アニメーションを有効化する。
*
* @arg bool
* @text 真偽値
* @type boolean
* @default true
*
* @command waitForCompletion
* @text 完了までウェイト
* @desc 最後に対象となったウィンドウの動作が完了するまで待ちます。
* 待機モードが無効なウィンドウに適用します。
*
* @command resetAll
* @text 全てリセット
* @desc 対象、待機モードなどを全て初期化します。
* イベント終了後に毎回行うことを推奨します。
*
*/

$multipleMessages = null;

'use strict';

class MultipleMessages {
	constructor() {
		this._data = [];
		this._waitMode = [];
		this._notClose = [];
		this._forceClose = [];
		this._synchronize = false;
		this._animation = true;
		this._windowId = 0;
	}

	data(index = this._windowId) {
		return this._data[index];
	}

	pushData(data) {
		this._data.push(data);
		const len = this._data.length;
		this._waitMode.length = len;
		this._notClose.length = len;
		this._forceClose.length = len;
	}

	resetLength() {
		this._data.length = numWindows;
		this._waitMode.length = numWindows;
		this._notClose.length = numWindows;
		this._forceClose.length = numWindows;
	}

	windowId() {
		return this._windowId;
	}

	setWindowId(value) {
		this._windowId = value;
	}

	waitMode(index = this._windowId) {
		return this._waitMode[index];
	}
	
	setWaitMode(index, value) {
		if (index === -1) {
			this._waitMode.fill(value);
			return;
		}
		this._waitMode[index] = value;
	}

	notClose(index = this._windowId) {
		return this._notClose[index];
	}

	setNotClose(index, value) {
		if (index === -1) {
			this._notClose.fill(value);
			return;
		}
		this._notClose[index] = value;
	}

	forceClose(index = this._windowId) {
		return this._forceClose[index];
	}

	setForceClose(index, value) {
		if (index === -1) {
			this._forceClose.fill(value);
			return;
		}
		this._forceClose[index] = value;
	}

	synchronize() {
		return this._synchronize;
	}

	setSynchronize(value) {
		this._synchronize = value;
	}

	animation() {
		return this._animation;
	}

	setAnimation(value) {
		this._animation = value;
	}

	resetAll() {
		$gameMessage = this.data(0);
		this.setWindowId(0);
		this.setSynchronize(false);
		this.setAnimation(true);
		this.setWaitMode(-1, true);
		this.setNotClose(-1, false);
		//this.setForceClose(-1, false);
	}
}

{
	const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
	const parameters = PluginManager.parameters(pluginName);
	const numWindows = Number(parameters["numWindows"]);
	const hasPluginCommonBase = typeof PluginManagerEx === "function";
	const hasMessageWindowPopup = $plugins.some(plugin => Utils.extractFileName(plugin.name) === "MessageWindowPopup" && plugin.status);

	//-----------------------------------------------------------------------------
	// PluginManager

	PluginManager.registerCommand(pluginName, "changeTarget", function (args) {
		const id = Number(args.id);
		if (id > numWindows) return;
		$multipleMessages.setWindowId(id);
		$gameMessage = $multipleMessages.data(id);
	});

	PluginManager.registerCommand(pluginName, "setWaitMode", function (args) {
		const id = Number(args.id);
		if (id > numWindows) return;
		const bool = args.bool === "true";
		$multipleMessages.setWaitMode(id, bool);
	});

	PluginManager.registerCommand(pluginName, "setNotClose", function (args) {
		const id = Number(args.id);
		if (id > numWindows) return;
		const bool = args.bool === "true";
		$multipleMessages.setNotClose(id, bool);
	});

	PluginManager.registerCommand(pluginName, "setAll", function (args) {
		let bool = "";
		const id = Number(args.id);
		if (id > numWindows) return;
		bool = args.waitMode;
		if (bool) {
			$multipleMessages.setWaitMode(id, bool === "true");
		}
		bool = args.notClose;
		if (bool) {
			$multipleMessages.setNotClose(id, bool === "true");
		}
	});

	PluginManager.registerCommand(pluginName, "forceClose", function (args) {
		const id = Number(args.id);
		if (id > numWindows) return;
		$multipleMessages.setForceClose(id, true);
		$multipleMessages.setNotClose(id, false);
	});

	PluginManager.registerCommand(pluginName, "waitForCompletion", function (args) {
		this.setWaitMode("message");
	});

	PluginManager.registerCommand(pluginName, "setAnimation", function (args) {
		$multipleMessages.setAnimation(args.bool === "true");
	});

	PluginManager.registerCommand(pluginName, "synchronize", function (args) {
		$multipleMessages.setSynchronize(args.bool === "true");
	});

	PluginManager.registerCommand(pluginName, "resetAll", function (args) {
		$multipleMessages.resetAll();
	});

	//-----------------------------------------------------------------------------
	// DataManager

	const _DataManager_createGameObjects = DataManager.createGameObjects;
	DataManager.createGameObjects = function() {
		_DataManager_createGameObjects.call(this);
		$multipleMessages = new MultipleMessages();
		$multipleMessages.pushData($gameMessage);
		for (let i = 1; i <= numWindows; i++) {
			$multipleMessages.pushData(new Game_Message());
		}
		$multipleMessages.resetAll();
	};

	//-----------------------------------------------------------------------------
	// Game_Interpreter

	const _Game_Interpreter_command101 = Game_Interpreter.prototype.command101;
	Game_Interpreter.prototype.command101 = function(params) {
		const id = $multipleMessages.windowId();
		if ($multipleMessages.forceClose(id)) {
			return false;
		}
		const r = _Game_Interpreter_command101.call(this, params);
		if (!$multipleMessages.waitMode()) {
			this.setWaitMode("");
		}
		return r;
	};

	//-----------------------------------------------------------------------------
	// Scene_Message

	const _Scene_Message_createAllWindows = Scene_Message.prototype.createAllWindows;
	Scene_Message.prototype.createAllWindows = function() {
		_Scene_Message_createAllWindows.call(this);
		this.createAllMultipleMessageWindows();
	};

	Scene_Message.prototype.createAllMultipleMessageWindows = function() {
		this.createMultipleMessageWindows();
		if (this._faceBoxWindow) {
			this.createMultipleFaceBoxWindows();
		}
		this.createMultipleNameBoxWindows();
		this.associateMultipleMessageWindows();
	};

	Scene_Message.prototype.createMultipleMessageWindows = function() {
		const rect = this.messageWindowRect();
		const index = this._windowLayer.children.indexOf(this._messageWindow);
		this._messageWindows = [this._messageWindow];
		this._messageWindow._messageWindows = this._messageWindows;
		for (let i = 1; i <= numWindows; i++) {
			const sprite = new Window_Message(rect);
			if (index === -1) {
				this.addWindow(sprite);
			} else {
				this._windowLayer.addChildAt(sprite, index + i);
			}
			sprite._messageId = i;
			sprite._messageWindows = this._messageWindows;
			this._messageWindows.push(sprite);
		}
	};

	Scene_Message.prototype.createMultipleFaceBoxWindows = function() {
		const index = this._windowLayer.children.indexOf(this._faceBoxWindow);
		this._faceBoxWindows = [this._faceBoxWindow];
		for (let i = 1; i <= numWindows; i++) {
			const rect = this.faceBoxWindowRect();
			const sprite = new Window_FaceBox(rect);
			this._faceBoxWindows.push(sprite);
			if (index === -1) {
				this.addWindow(sprite);
			} else {
				this._windowLayer.addChildAt(sprite, index + i);
			}
		}
	};

	Scene_Message.prototype.createMultipleNameBoxWindows = function() {
		const index = this._windowLayer.children.indexOf(this._nameBoxWindow);
		this._nameBoxWindows = [this._nameBoxWindow];
		for (let i = 1; i <= numWindows; i++) {
			const sprite = new Window_NameBox();
			this._nameBoxWindows.push(sprite);
			if (index === -1) {
				this.addWindow(sprite);
			} else {
				this._windowLayer.addChildAt(sprite, index + i);
			}
		}
	};

	Scene_Message.prototype.associateMultipleMessageWindows = function() {
		for (let i = 1; i <= numWindows; i++) {
			const messageWindow = this._messageWindows[i];
			const nameBoxWindow = this._nameBoxWindows[i];
			const faceBoxWindow = this._faceBoxWindows && this._faceBoxWindows[i];
			messageWindow.setGoldWindow(this._goldWindow);
			messageWindow.setNameBoxWindow(nameBoxWindow);
			messageWindow.setChoiceListWindow(this._choiceListWindow);
			messageWindow.setNumberInputWindow(this._numberInputWindow);
			messageWindow.setEventItemWindow(this._eventItemWindow);
			nameBoxWindow.setMessageWindow(messageWindow);
			if (faceBoxWindow) {
				messageWindow.setFaceBoxWindow(faceBoxWindow);
				faceBoxWindow.setMessageWindow(messageWindow);
			}
		}
	};

	//-----------------------------------------------------------------------------
	// Window_Message

	const _Window_Message_initMembers = Window_Message.prototype.initMembers;
	Window_Message.prototype.initMembers = function() {
		_Window_Message_initMembers.call(this);
		this._messageId = 0;
		this._messageWindows = null;
		this._synchronized = false;
	};

	const _Window_Message_update = Window_Message.prototype.update;
	Window_Message.prototype.update = function() {
		const id = this._messageId;
		$gameMessage = $multipleMessages.data(id);
		_Window_Message_update.call(this);
		$gameMessage = $multipleMessages.data();
	};

	const _Window_Message_updateWait = Window_Message.prototype.updateWait;
	Window_Message.prototype.updateWait = function() {
		const id = this._messageId;
		if ($multipleMessages.forceClose(id)) {
			this.forceClose();
			return false;
		}
		return _Window_Message_updateWait.call(this);
	};

	Window_Message.prototype.forceClose = function() {
		const id = this._messageId;
		this.pause = false;
		this.startWait(0);
		$multipleMessages.setForceClose(id, false);
		this.terminateMessage();
		this.close();
		this._synchronized = false;
	};

	let updateInput = false;
	const _Window_Message_updateInput = Window_Message.prototype.updateInput;
	Window_Message.prototype.updateInput = function() {
		updateInput = true;
		const r = _Window_Message_updateInput.call(this);
		updateInput = false;
		return r;
	};

	const _Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
	Window_Message.prototype.terminateMessage = function() {
		_Window_Message_terminateMessage.call(this);
		const notClose = $multipleMessages.notClose(this._messageId);
		if (notClose) {
			this.open();
		} else if ($multipleMessages.synchronize() && !this._synchronized) {
			$multipleMessages.setSynchronize(false);
			this.terminateAllMessageWindows();
			$multipleMessages.setSynchronize(true);
		}
	};

	Window_Message.prototype.terminateAllMessageWindows = function() {
		if (!this._messageWindows) return;
		for (const message of this._messageWindows) {
			const id = message._messageId;
			const notClose = $multipleMessages.notClose(id);
			$gameMessage = $multipleMessages.data(id);
			if (!notClose && !message._textState && !message._synchronized) {
				message._synchronized = true;
				if (id < this._messageId) {
					message.forceClose();
				} else if (id > this._messageId) {
					$multipleMessages.setForceClose(id, true);
				} else {
					this._synchronized = false;
				}
			}
		}
		$gameMessage = $multipleMessages.data(this._messageId);
	};

	const _Window_Message_updateOpen = Window_Message.prototype.updateOpen;
	Window_Message.prototype.updateOpen = function() {
		if (this._opening && !$multipleMessages.animation()) {
			this.openness = 255;
		}
		_Window_Message_updateOpen.call(this);
	};

	const _Window_Message_updateClose = Window_Message.prototype.updateClose;
	Window_Message.prototype.updateClose = function() {
		if (this._closing && !$multipleMessages.animation()) {
			this.openness = 0;
		}
		_Window_Message_updateClose.call(this);
	};

	const _Window_Message_startInput = Window_Message.prototype.startInput;
	Window_Message.prototype.startInput = function() {
		if (this._messageWindows) {
			this._choiceListWindow.setMessageWindow(this);
			this._numberInputWindow.setMessageWindow(this);
			this._eventItemWindow.setMessageWindow(this);
		}
		return _Window_Message_startInput.call(this);
	};

	const _Window_Message_isTriggered = Window_Message.prototype.isTriggered;
	Window_Message.prototype.isTriggered = function() {
		const isTriggered = _Window_Message_isTriggered.call(this);
		if (!this._messageWindows) {
			return isTriggered;
		}
		if (!isTriggered) {
			return false;
		}
		//ページ送り受付中でない時は普段通りの処理
		const synchronize = $multipleMessages.synchronize();
		if (!synchronize || this._textState || !updateInput) {
			return true;
		}
		const textStates = synchronize && this._messageWindows.find(win => {
			const notClose = $multipleMessages.notClose(win._messageId);
			return notClose ? false : win._textState;
		});
		return !textStates;
	};

	if (hasMessageWindowPopup) {

		//-----------------------------------------------------------------------------
		// Game_System

		const _Game_System_setMessagePopup = Game_System.prototype.setMessagePopup;
		Game_System.prototype.setMessagePopup = function(id) {
			_Game_System_setMessagePopup.apply(this, arguments);
			$gameMessage._messagePopupCharacterId = this._messagePopupCharacterId;
		};

		const _Game_System_clearMessagePopup = Game_System.prototype.clearMessagePopup;
		Game_System.prototype.clearMessagePopup = function() {
			_Game_System_clearMessagePopup.apply(this, arguments);
			$gameMessage._messagePopupCharacterId    = this._messagePopupCharacterId;
			$gameMessage._messagePopupPositionEvents = this._messagePopupPositionEvents.clone();
		};

		const _Game_System_setPopupFixPosition = Game_System.prototype.setPopupFixPosition;
		Game_System.prototype.setPopupFixPosition = function(characterId, position) {
			_Game_System_setPopupFixPosition.apply(this, arguments);
			if (characterId !== null) {
				$gameMessage._messagePopupPositionEvents = this._messagePopupPositionEvents.clone();
			}
		};

		//-----------------------------------------------------------------------------
		// Window_Message

		const _Window_Message_startMessage    = Window_Message.prototype.startMessage;
		Window_Message.prototype.startMessage = function() {
			_Window_Message_startMessage.call(this);
			const $gameMessage = $multipleMessages.data(this._messageId);
			if ($gameMessage._messagePopupPositionEvents) {
				this._messagePopupPositionEvents = $gameMessage._messagePopupPositionEvents.clone();
			}
		};

		const _Window_Message_updateTargetCharacterId = Window_Message.prototype.updateTargetCharacterId;
		Window_Message.prototype.updateTargetCharacterId = function() {
			const $gameMessage = $multipleMessages.data(this._messageId);
			const messagePopupCharacterId = $gameSystem._messagePopupCharacterId;
			$gameSystem._messagePopupCharacterId = $gameMessage._messagePopupCharacterId;
			_Window_Message_updateTargetCharacterId.apply(this, arguments);
			$gameSystem._messagePopupCharacterId = messagePopupCharacterId;
		};

		const _Window_Message_isPopupLower = Window_Message.prototype.isPopupLower;
		Window_Message.prototype.isPopupLower = function() {
			const messagePopupPositionEvents = $gameSystem._messagePopupPositionEvents;
			$gameSystem._messagePopupPositionEvents = this._messagePopupPositionEvents;
			const result = _Window_Message_isPopupLower.call(this);
			$gameSystem._messagePopupPositionEvents = messagePopupPositionEvents;
			return result;
		};
	}
}