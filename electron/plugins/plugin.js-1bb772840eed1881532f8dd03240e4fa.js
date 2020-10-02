var capacitorPlugin = (function (exports) {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var CameraSource;
    (function (CameraSource) {
        CameraSource["Prompt"] = "PROMPT";
        CameraSource["Camera"] = "CAMERA";
        CameraSource["Photos"] = "PHOTOS";
    })(CameraSource || (CameraSource = {}));
    var CameraDirection;
    (function (CameraDirection) {
        CameraDirection["Rear"] = "REAR";
        CameraDirection["Front"] = "FRONT";
    })(CameraDirection || (CameraDirection = {}));
    var CameraResultType;
    (function (CameraResultType) {
        CameraResultType["Uri"] = "uri";
        CameraResultType["Base64"] = "base64";
        CameraResultType["DataUrl"] = "dataUrl";
    })(CameraResultType || (CameraResultType = {}));
    var FilesystemDirectory;
    (function (FilesystemDirectory) {
        /**
         * The Documents directory
         * On iOS it's the app's documents directory.
         * Use this directory to store user-generated content.
         * On Android it's the Public Documents folder, so it's accessible from other apps.
         * It's not accesible on Android 10 unless the app enables legacy External Storage
         * by adding `android:requestLegacyExternalStorage="true"` in the `application` tag
         * in the `AndroidManifest.xml`
         */
        FilesystemDirectory["Documents"] = "DOCUMENTS";
        /**
         * The Data directory
         * On iOS it will use the Documents directory
         * On Android it's the directory holding application files.
         * Files will be deleted when the application is uninstalled.
         */
        FilesystemDirectory["Data"] = "DATA";
        /**
         * The Cache directory
         * Can be deleted in cases of low memory, so use this directory to write app-specific files
         * that your app can re-create easily.
         */
        FilesystemDirectory["Cache"] = "CACHE";
        /**
         * The external directory
         * On iOS it will use the Documents directory
         * On Android it's the directory on the primary shared/external
         * storage device where the application can place persistent files it owns.
         * These files are internal to the applications, and not typically visible
         * to the user as media.
         * Files will be deleted when the application is uninstalled.
         */
        FilesystemDirectory["External"] = "EXTERNAL";
        /**
         * The external storage directory
         * On iOS it will use the Documents directory
         * On Android it's the primary shared/external storage directory.
         * It's not accesible on Android 10 unless the app enables legacy External Storage
         * by adding `android:requestLegacyExternalStorage="true"` in the `application` tag
         * in the `AndroidManifest.xml`
         */
        FilesystemDirectory["ExternalStorage"] = "EXTERNAL_STORAGE";
    })(FilesystemDirectory || (FilesystemDirectory = {}));
    var FilesystemEncoding;
    (function (FilesystemEncoding) {
        FilesystemEncoding["UTF8"] = "utf8";
        FilesystemEncoding["ASCII"] = "ascii";
        FilesystemEncoding["UTF16"] = "utf16";
    })(FilesystemEncoding || (FilesystemEncoding = {}));
    var HapticsImpactStyle;
    (function (HapticsImpactStyle) {
        HapticsImpactStyle["Heavy"] = "HEAVY";
        HapticsImpactStyle["Medium"] = "MEDIUM";
        HapticsImpactStyle["Light"] = "LIGHT";
    })(HapticsImpactStyle || (HapticsImpactStyle = {}));
    var HapticsNotificationType;
    (function (HapticsNotificationType) {
        HapticsNotificationType["SUCCESS"] = "SUCCESS";
        HapticsNotificationType["WARNING"] = "WARNING";
        HapticsNotificationType["ERROR"] = "ERROR";
    })(HapticsNotificationType || (HapticsNotificationType = {}));
    var KeyboardStyle;
    (function (KeyboardStyle) {
        KeyboardStyle["Dark"] = "DARK";
        KeyboardStyle["Light"] = "LIGHT";
    })(KeyboardStyle || (KeyboardStyle = {}));
    var KeyboardResize;
    (function (KeyboardResize) {
        KeyboardResize["Body"] = "body";
        KeyboardResize["Ionic"] = "ionic";
        KeyboardResize["Native"] = "native";
        KeyboardResize["None"] = "none";
    })(KeyboardResize || (KeyboardResize = {}));
    var ActionSheetOptionStyle;
    (function (ActionSheetOptionStyle) {
        ActionSheetOptionStyle["Default"] = "DEFAULT";
        ActionSheetOptionStyle["Destructive"] = "DESTRUCTIVE";
        ActionSheetOptionStyle["Cancel"] = "CANCEL";
    })(ActionSheetOptionStyle || (ActionSheetOptionStyle = {}));
    //
    var PermissionType;
    (function (PermissionType) {
        PermissionType["Camera"] = "camera";
        PermissionType["Photos"] = "photos";
        PermissionType["Geolocation"] = "geolocation";
        PermissionType["Notifications"] = "notifications";
        PermissionType["ClipboardRead"] = "clipboard-read";
        PermissionType["ClipboardWrite"] = "clipboard-write";
        PermissionType["Microphone"] = "microphone";
    })(PermissionType || (PermissionType = {}));
    var PhotosAlbumType;
    (function (PhotosAlbumType) {
        /**
         * Album is a "smart" album (such as Favorites or Recently Added)
         */
        PhotosAlbumType["Smart"] = "smart";
        /**
         * Album is a cloud-shared album
         */
        PhotosAlbumType["Shared"] = "shared";
        /**
         * Album is a user-created album
         */
        PhotosAlbumType["User"] = "user";
    })(PhotosAlbumType || (PhotosAlbumType = {}));
    var StatusBarStyle;
    (function (StatusBarStyle) {
        /**
         * Light text for dark backgrounds.
         */
        StatusBarStyle["Dark"] = "DARK";
        /**
         * Dark text for light backgrounds.
         */
        StatusBarStyle["Light"] = "LIGHT";
    })(StatusBarStyle || (StatusBarStyle = {}));
    var StatusBarAnimation;
    (function (StatusBarAnimation) {
        /**
         * No animation during show/hide.
         */
        StatusBarAnimation["None"] = "NONE";
        /**
         * Slide animation during show/hide.
         */
        StatusBarAnimation["Slide"] = "SLIDE";
        /**
         * Fade animation during show/hide.
         */
        StatusBarAnimation["Fade"] = "FADE";
    })(StatusBarAnimation || (StatusBarAnimation = {}));

    var CapacitorWeb = /** @class */ (function () {
        function CapacitorWeb() {
            var _this = this;
            this.platform = 'web';
            this.isNative = false;
            // Need to assign here to avoid having to define every plugin but still
            // get the typed benefits of the provided plugins in PluginRegistry
            this.Plugins = {};
            // Gracefully degrade in non-Proxy supporting engines, e.g. IE11. This
            // effectively means that trying to access an unavailable plugin will
            // locally throw, but this is still better than throwing a syntax error.
            if (typeof Proxy !== 'undefined') {
                // Build a proxy for the Plugins object that returns the "Noop Plugin"
                // if a plugin isn't available
                this.Plugins = new Proxy(this.Plugins, {
                    get: function (target, prop) {
                        if (typeof target[prop] === 'undefined') {
                            var thisRef_1 = _this;
                            return new Proxy({}, {
                                get: function (_target, _prop) {
                                    if (typeof _target[_prop] === 'undefined') {
                                        return thisRef_1.pluginMethodNoop.bind(thisRef_1, _target, _prop, prop);
                                    }
                                    else {
                                        return _target[_prop];
                                    }
                                }
                            });
                        }
                        else {
                            return target[prop];
                        }
                    }
                });
            }
        }
        CapacitorWeb.prototype.pluginMethodNoop = function (_target, _prop, pluginName) {
            return Promise.reject(pluginName + " does not have web implementation.");
        };
        CapacitorWeb.prototype.getPlatform = function () {
            return this.platform;
        };
        CapacitorWeb.prototype.isPluginAvailable = function (name) {
            return this.Plugins.hasOwnProperty(name);
        };
        CapacitorWeb.prototype.convertFileSrc = function (filePath) {
            return filePath;
        };
        CapacitorWeb.prototype.handleError = function (e) {
            console.error(e);
        };
        return CapacitorWeb;
    }());

    // Create our default Capacitor instance, which will be
    // overridden on native platforms
    var Capacitor$1 = (function (globalThis) {
        // Create a new CapacitorWeb instance if one doesn't already exist on globalThis
        // Ensure the global is assigned the same Capacitor instance,
        // then export Capacitor so it can be imported in other modules
        return globalThis.Capacitor = (globalThis.Capacitor || new CapacitorWeb());
    })(
    // figure out the current globalThis, such as "window", "self" or "global"
    // ensure errors are not thrown in an node SSR environment or web worker
    typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {});
    var Plugins = Capacitor$1.Plugins;

    var WebPluginRegistry = /** @class */ (function () {
        function WebPluginRegistry() {
            this.plugins = {};
            this.loadedPlugins = {};
        }
        WebPluginRegistry.prototype.addPlugin = function (plugin) {
            this.plugins[plugin.config.name] = plugin;
        };
        WebPluginRegistry.prototype.getPlugin = function (name) {
            return this.plugins[name];
        };
        WebPluginRegistry.prototype.loadPlugin = function (name) {
            var plugin = this.getPlugin(name);
            if (!plugin) {
                console.error("Unable to load web plugin " + name + ", no such plugin found.");
                return;
            }
            plugin.load();
        };
        WebPluginRegistry.prototype.getPlugins = function () {
            var p = [];
            for (var name_1 in this.plugins) {
                p.push(this.plugins[name_1]);
            }
            return p;
        };
        return WebPluginRegistry;
    }());
    var WebPlugins = new WebPluginRegistry();
    var WebPlugin = /** @class */ (function () {
        function WebPlugin(config, pluginRegistry) {
            this.config = config;
            this.loaded = false;
            this.listeners = {};
            this.windowListeners = {};
            if (!pluginRegistry) {
                WebPlugins.addPlugin(this);
            }
            else {
                pluginRegistry.addPlugin(this);
            }
        }
        WebPlugin.prototype.addWindowListener = function (handle) {
            window.addEventListener(handle.windowEventName, handle.handler);
            handle.registered = true;
        };
        WebPlugin.prototype.removeWindowListener = function (handle) {
            if (!handle) {
                return;
            }
            window.removeEventListener(handle.windowEventName, handle.handler);
            handle.registered = false;
        };
        WebPlugin.prototype.addListener = function (eventName, listenerFunc) {
            var _this = this;
            var listeners = this.listeners[eventName];
            if (!listeners) {
                this.listeners[eventName] = [];
            }
            this.listeners[eventName].push(listenerFunc);
            // If we haven't added a window listener for this event and it requires one,
            // go ahead and add it
            var windowListener = this.windowListeners[eventName];
            if (windowListener && !windowListener.registered) {
                this.addWindowListener(windowListener);
            }
            return {
                remove: function () {
                    _this.removeListener(eventName, listenerFunc);
                }
            };
        };
        WebPlugin.prototype.removeListener = function (eventName, listenerFunc) {
            var listeners = this.listeners[eventName];
            if (!listeners) {
                return;
            }
            var index = listeners.indexOf(listenerFunc);
            this.listeners[eventName].splice(index, 1);
            // If there are no more listeners for this type of event,
            // remove the window listener
            if (!this.listeners[eventName].length) {
                this.removeWindowListener(this.windowListeners[eventName]);
            }
        };
        WebPlugin.prototype.removeAllListeners = function () {
            this.listeners = {};
            for (var listener in this.windowListeners) {
                this.removeWindowListener(this.windowListeners[listener]);
            }
            this.windowListeners = {};
        };
        WebPlugin.prototype.notifyListeners = function (eventName, data) {
            var listeners = this.listeners[eventName];
            if (listeners) {
                listeners.forEach(function (listener) { return listener(data); });
            }
        };
        WebPlugin.prototype.hasListeners = function (eventName) {
            return !!this.listeners[eventName].length;
        };
        WebPlugin.prototype.registerWindowListener = function (windowEventName, pluginEventName) {
            var _this = this;
            this.windowListeners[pluginEventName] = {
                registered: false,
                windowEventName: windowEventName,
                pluginEventName: pluginEventName,
                handler: function (event) {
                    _this.notifyListeners(pluginEventName, event);
                }
            };
        };
        WebPlugin.prototype.requestPermissions = function () {
            if (Capacitor.isNative) {
                return Capacitor.nativePromise(this.config.name, 'requestPermissions', {});
            }
            else {
                return Promise.resolve({ results: [] });
            }
        };
        WebPlugin.prototype.load = function () {
            this.loaded = true;
        };
        return WebPlugin;
    }());
    var shouldMergeWebPlugin = function (plugin) {
        return plugin.config.platforms && plugin.config.platforms.indexOf(Capacitor.platform) >= 0;
    };
    /**
     * For all our known web plugins, merge them into the global plugins
     * registry if they aren't already existing. If they don't exist, that
     * means there's no existing native implementation for it.
     * @param knownPlugins the Capacitor.Plugins global registry.
     */
    var mergeWebPlugins = function (knownPlugins) {
        var plugins = WebPlugins.getPlugins();
        for (var _i = 0, plugins_1 = plugins; _i < plugins_1.length; _i++) {
            var plugin = plugins_1[_i];
            mergeWebPlugin(knownPlugins, plugin);
        }
    };
    var mergeWebPlugin = function (knownPlugins, plugin) {
        // If we already have a plugin registered (meaning it was defined in the native layer),
        // then we should only overwrite it if the corresponding web plugin activates on
        // a certain platform. For example: Geolocation uses the WebPlugin on Android but not iOS
        if (knownPlugins.hasOwnProperty(plugin.config.name) && !shouldMergeWebPlugin(plugin)) {
            return;
        }
        knownPlugins[plugin.config.name] = plugin;
    };

    var AccessibilityPluginWeb = /** @class */ (function (_super) {
        __extends(AccessibilityPluginWeb, _super);
        function AccessibilityPluginWeb() {
            return _super.call(this, {
                name: 'Accessibility',
                platforms: ['web']
            }) || this;
        }
        AccessibilityPluginWeb.prototype.isScreenReaderEnabled = function () {
            throw new Error('Feature not available in the browser');
        };
        AccessibilityPluginWeb.prototype.speak = function (options) {
            if (!('speechSynthesis' in window)) {
                return Promise.reject('Browser does not support the Speech Synthesis API');
            }
            var utterance = new SpeechSynthesisUtterance(options.value);
            if (options.language) {
                utterance.lang = options.language;
            }
            window.speechSynthesis.speak(utterance);
            return Promise.resolve();
        };
        return AccessibilityPluginWeb;
    }(WebPlugin));
    var Accessibility = new AccessibilityPluginWeb();

    var AppPluginWeb = /** @class */ (function (_super) {
        __extends(AppPluginWeb, _super);
        function AppPluginWeb() {
            var _this = _super.call(this, {
                name: 'App',
                platforms: ['web']
            }) || this;
            if (typeof document !== 'undefined') {
                document.addEventListener('visibilitychange', _this.handleVisibilityChange.bind(_this), false);
            }
            return _this;
        }
        AppPluginWeb.prototype.exitApp = function () {
            throw new Error('Method not implemented.');
        };
        AppPluginWeb.prototype.canOpenUrl = function (_options) {
            return Promise.resolve({ value: true });
        };
        AppPluginWeb.prototype.openUrl = function (_options) {
            return Promise.resolve({ completed: true });
        };
        AppPluginWeb.prototype.getLaunchUrl = function () {
            return Promise.resolve({ url: '' });
        };
        AppPluginWeb.prototype.getState = function () {
            return Promise.resolve({ isActive: document.hidden !== true });
        };
        AppPluginWeb.prototype.handleVisibilityChange = function () {
            var data = {
                isActive: document.hidden !== true
            };
            this.notifyListeners('appStateChange', data);
        };
        return AppPluginWeb;
    }(WebPlugin));
    var App = new AppPluginWeb();

    var BrowserPluginWeb = /** @class */ (function (_super) {
        __extends(BrowserPluginWeb, _super);
        function BrowserPluginWeb() {
            return _super.call(this, {
                name: 'Browser',
                platforms: ['web']
            }) || this;
        }
        BrowserPluginWeb.prototype.open = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this._lastWindow = window.open(options.url, options.windowName || '_blank');
                    return [2 /*return*/, Promise.resolve()];
                });
            });
        };
        BrowserPluginWeb.prototype.prefetch = function (_options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // Does nothing
                    return [2 /*return*/, Promise.resolve()];
                });
            });
        };
        BrowserPluginWeb.prototype.close = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this._lastWindow && this._lastWindow.close();
                    return [2 /*return*/, Promise.resolve()];
                });
            });
        };
        return BrowserPluginWeb;
    }(WebPlugin));
    var Browser = new BrowserPluginWeb();

    var CameraPluginWeb = /** @class */ (function (_super) {
        __extends(CameraPluginWeb, _super);
        function CameraPluginWeb() {
            return _super.call(this, {
                name: 'Camera',
                platforms: ['web']
            }) || this;
        }
        CameraPluginWeb.prototype.getPhoto = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var cameraModal_1, e_1;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!options.webUseInput) return [3 /*break*/, 1];
                                        this.fileInputExperience(options, resolve);
                                        return [3 /*break*/, 7];
                                    case 1:
                                        if (!customElements.get('pwa-camera-modal')) return [3 /*break*/, 6];
                                        cameraModal_1 = document.createElement('pwa-camera-modal');
                                        document.body.appendChild(cameraModal_1);
                                        _a.label = 2;
                                    case 2:
                                        _a.trys.push([2, 4, , 5]);
                                        return [4 /*yield*/, cameraModal_1.componentOnReady()];
                                    case 3:
                                        _a.sent();
                                        cameraModal_1.addEventListener('onPhoto', function (e) { return __awaiter(_this, void 0, void 0, function () {
                                            var photo, _a;
                                            return __generator(this, function (_b) {
                                                switch (_b.label) {
                                                    case 0:
                                                        photo = e.detail;
                                                        if (!(photo === null)) return [3 /*break*/, 1];
                                                        reject('User cancelled photos app');
                                                        return [3 /*break*/, 4];
                                                    case 1:
                                                        if (!(photo instanceof Error)) return [3 /*break*/, 2];
                                                        reject(photo.message);
                                                        return [3 /*break*/, 4];
                                                    case 2:
                                                        _a = resolve;
                                                        return [4 /*yield*/, this._getCameraPhoto(photo, options)];
                                                    case 3:
                                                        _a.apply(void 0, [_b.sent()]);
                                                        _b.label = 4;
                                                    case 4:
                                                        cameraModal_1.dismiss();
                                                        document.body.removeChild(cameraModal_1);
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); });
                                        cameraModal_1.present();
                                        return [3 /*break*/, 5];
                                    case 4:
                                        e_1 = _a.sent();
                                        this.fileInputExperience(options, resolve);
                                        return [3 /*break*/, 5];
                                    case 5: return [3 /*break*/, 7];
                                    case 6:
                                        console.error("Unable to load PWA Element 'pwa-camera-modal'. See the docs: https://capacitorjs.com/docs/pwa-elements.");
                                        this.fileInputExperience(options, resolve);
                                        _a.label = 7;
                                    case 7: return [2 /*return*/];
                                }
                            });
                        }); })];
                });
            });
        };
        CameraPluginWeb.prototype.fileInputExperience = function (options, resolve) {
            var input = document.querySelector('#_capacitor-camera-input');
            var cleanup = function () {
                input.parentNode && input.parentNode.removeChild(input);
            };
            if (!input) {
                input = document.createElement('input');
                input.id = '_capacitor-camera-input';
                input.type = 'file';
                document.body.appendChild(input);
            }
            input.accept = 'image/*';
            input.capture = true;
            if (options.source === CameraSource.Photos || options.source === CameraSource.Prompt) {
                input.removeAttribute('capture');
            }
            else if (options.direction === CameraDirection.Front) {
                input.capture = 'user';
            }
            else if (options.direction === CameraDirection.Rear) {
                input.capture = 'environment';
            }
            input.addEventListener('change', function (_e) {
                var file = input.files[0];
                var format = 'jpeg';
                if (file.type === 'image/png') {
                    format = 'png';
                }
                else if (file.type === 'image/gif') {
                    format = 'gif';
                }
                if (options.resultType === CameraResultType.DataUrl || options.resultType === CameraResultType.Base64) {
                    var reader_1 = new FileReader();
                    reader_1.addEventListener('load', function () {
                        if (options.resultType === CameraResultType.DataUrl) {
                            resolve({
                                dataUrl: reader_1.result,
                                format: format
                            });
                        }
                        else if (options.resultType === CameraResultType.Base64) {
                            var b64 = reader_1.result.split(',')[1];
                            resolve({
                                base64String: b64,
                                format: format
                            });
                        }
                        cleanup();
                    });
                    reader_1.readAsDataURL(file);
                }
                else {
                    resolve({
                        webPath: URL.createObjectURL(file),
                        format: format
                    });
                    cleanup();
                }
            });
            input.click();
        };
        CameraPluginWeb.prototype._getCameraPhoto = function (photo, options) {
            return new Promise(function (resolve, reject) {
                var reader = new FileReader();
                var format = photo.type.split('/')[1];
                if (options.resultType === CameraResultType.Uri) {
                    resolve({
                        webPath: URL.createObjectURL(photo),
                        format: format
                    });
                }
                else {
                    reader.readAsDataURL(photo);
                    reader.onloadend = function () {
                        var r = reader.result;
                        if (options.resultType === CameraResultType.DataUrl) {
                            resolve({
                                dataUrl: r,
                                format: format
                            });
                        }
                        else {
                            resolve({
                                base64String: r.split(',')[1],
                                format: format
                            });
                        }
                    };
                    reader.onerror = function (e) {
                        reject(e);
                    };
                }
            });
        };
        return CameraPluginWeb;
    }(WebPlugin));
    var Camera = new CameraPluginWeb();

    var ClipboardPluginWeb = /** @class */ (function (_super) {
        __extends(ClipboardPluginWeb, _super);
        function ClipboardPluginWeb() {
            return _super.call(this, {
                name: 'Clipboard',
                platforms: ['web']
            }) || this;
        }
        ClipboardPluginWeb.prototype.write = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var blob, clipboardItemInput, err_1;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!navigator.clipboard) {
                                return [2 /*return*/, Promise.reject('Clipboard API not available in this browser')];
                            }
                            if (!(options.string !== undefined || options.url)) return [3 /*break*/, 2];
                            if (!navigator.clipboard.writeText) {
                                return [2 /*return*/, Promise.reject('Writting to clipboard not supported in this browser')];
                            }
                            return [4 /*yield*/, navigator.clipboard.writeText(options.string !== undefined ? options.string : options.url)];
                        case 1:
                            _b.sent();
                            return [3 /*break*/, 10];
                        case 2:
                            if (!options.image) return [3 /*break*/, 9];
                            if (!navigator.clipboard.write) {
                                return [2 /*return*/, Promise.reject('Setting images not supported in this browser')];
                            }
                            _b.label = 3;
                        case 3:
                            _b.trys.push([3, 7, , 8]);
                            return [4 /*yield*/, fetch(options.image)];
                        case 4: return [4 /*yield*/, (_b.sent()).blob()];
                        case 5:
                            blob = _b.sent();
                            clipboardItemInput = new ClipboardItem((_a = {}, _a[blob.type] = blob, _a));
                            return [4 /*yield*/, navigator.clipboard.write([clipboardItemInput])];
                        case 6:
                            _b.sent();
                            return [3 /*break*/, 8];
                        case 7:
                            err_1 = _b.sent();
                            return [2 /*return*/, Promise.reject('Failed to write image')];
                        case 8: return [3 /*break*/, 10];
                        case 9: return [2 /*return*/, Promise.reject('Nothing to write')];
                        case 10: return [2 /*return*/, Promise.resolve()];
                    }
                });
            });
        };
        ClipboardPluginWeb.prototype.read = function () {
            return __awaiter(this, void 0, void 0, function () {
                var clipboardItems, type, clipboardBlob, data, err_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!navigator.clipboard) {
                                return [2 /*return*/, Promise.reject('Clipboard API not available in this browser')];
                            }
                            if (!!navigator.clipboard.read) return [3 /*break*/, 1];
                            if (!navigator.clipboard.readText) {
                                return [2 /*return*/, Promise.reject('Reading from clipboard not supported in this browser')];
                            }
                            return [2 /*return*/, this.readText()];
                        case 1:
                            _a.trys.push([1, 5, , 6]);
                            return [4 /*yield*/, navigator.clipboard.read()];
                        case 2:
                            clipboardItems = _a.sent();
                            type = clipboardItems[0].types[0];
                            return [4 /*yield*/, clipboardItems[0].getType(type)];
                        case 3:
                            clipboardBlob = _a.sent();
                            return [4 /*yield*/, this._getBlobData(clipboardBlob, type)];
                        case 4:
                            data = _a.sent();
                            return [2 /*return*/, Promise.resolve({ value: data, type: type })];
                        case 5:
                            err_2 = _a.sent();
                            return [2 /*return*/, this.readText()];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        ClipboardPluginWeb.prototype.readText = function () {
            return __awaiter(this, void 0, void 0, function () {
                var text;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, navigator.clipboard.readText()];
                        case 1:
                            text = _a.sent();
                            return [2 /*return*/, Promise.resolve({ value: text, type: 'text/plain' })];
                    }
                });
            });
        };
        ClipboardPluginWeb.prototype._getBlobData = function (clipboardBlob, type) {
            return new Promise(function (resolve, reject) {
                var reader = new FileReader();
                if (type.includes('image')) {
                    reader.readAsDataURL(clipboardBlob);
                }
                else {
                    reader.readAsText(clipboardBlob);
                }
                reader.onloadend = function () {
                    var r = reader.result;
                    resolve(r);
                };
                reader.onerror = function (e) {
                    reject(e);
                };
            });
        };
        return ClipboardPluginWeb;
    }(WebPlugin));
    var Clipboard = new ClipboardPluginWeb();

    var FilesystemPluginWeb = /** @class */ (function (_super) {
        __extends(FilesystemPluginWeb, _super);
        function FilesystemPluginWeb() {
            var _this = _super.call(this, {
                name: 'Filesystem',
                platforms: ['web']
            }) || this;
            _this.DEFAULT_DIRECTORY = FilesystemDirectory.Data;
            _this.DB_VERSION = 1;
            _this.DB_NAME = 'Disc';
            _this._writeCmds = ['add', 'put', 'delete'];
            return _this;
        }
        FilesystemPluginWeb.prototype.initDb = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    if (this._db !== undefined) {
                        return [2 /*return*/, this._db];
                    }
                    if (!('indexedDB' in window)) {
                        throw new Error('This browser doesn\'t support IndexedDB');
                    }
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var request = indexedDB.open(_this.DB_NAME, _this.DB_VERSION);
                            request.onupgradeneeded = FilesystemPluginWeb.doUpgrade;
                            request.onsuccess = function () {
                                _this._db = request.result;
                                resolve(request.result);
                            };
                            request.onerror = function () { return reject(request.error); };
                            request.onblocked = function () {
                                console.warn('db blocked');
                            };
                        })];
                });
            });
        };
        FilesystemPluginWeb.doUpgrade = function (event) {
            var eventTarget = event.target;
            var db = eventTarget.result;
            switch (event.oldVersion) {
                case 0:
                case 1:
                default:
                    if (db.objectStoreNames.contains('FileStorage')) {
                        db.deleteObjectStore('FileStorage');
                    }
                    var store = db.createObjectStore('FileStorage', { keyPath: 'path' });
                    store.createIndex('by_folder', 'folder');
            }
        };
        FilesystemPluginWeb.prototype.dbRequest = function (cmd, args) {
            return __awaiter(this, void 0, void 0, function () {
                var readFlag;
                return __generator(this, function (_a) {
                    readFlag = this._writeCmds.indexOf(cmd) !== -1 ? 'readwrite' : 'readonly';
                    return [2 /*return*/, this.initDb()
                            .then(function (conn) {
                            return new Promise(function (resolve, reject) {
                                var tx = conn.transaction(['FileStorage'], readFlag);
                                var store = tx.objectStore('FileStorage');
                                var req = store[cmd].apply(store, args);
                                req.onsuccess = function () { return resolve(req.result); };
                                req.onerror = function () { return reject(req.error); };
                            });
                        })];
                });
            });
        };
        FilesystemPluginWeb.prototype.dbIndexRequest = function (indexName, cmd, args) {
            return __awaiter(this, void 0, void 0, function () {
                var readFlag;
                return __generator(this, function (_a) {
                    readFlag = this._writeCmds.indexOf(cmd) !== -1 ? 'readwrite' : 'readonly';
                    return [2 /*return*/, this.initDb()
                            .then(function (conn) {
                            return new Promise(function (resolve, reject) {
                                var tx = conn.transaction(['FileStorage'], readFlag);
                                var store = tx.objectStore('FileStorage');
                                var index = store.index(indexName);
                                var req = index[cmd].apply(index, args);
                                req.onsuccess = function () { return resolve(req.result); };
                                req.onerror = function () { return reject(req.error); };
                            });
                        })];
                });
            });
        };
        FilesystemPluginWeb.prototype.getPath = function (directory, uriPath) {
            directory = directory || this.DEFAULT_DIRECTORY;
            var cleanedUriPath = uriPath !== undefined ? uriPath.replace(/^[/]+|[/]+$/g, '') : '';
            var fsPath = '/' + directory;
            if (uriPath !== '')
                fsPath += '/' + cleanedUriPath;
            return fsPath;
        };
        FilesystemPluginWeb.prototype.clear = function () {
            return __awaiter(this, void 0, void 0, function () {
                var conn, tx, store;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.initDb()];
                        case 1:
                            conn = _a.sent();
                            tx = conn.transaction(['FileStorage'], 'readwrite');
                            store = tx.objectStore('FileStorage');
                            store.clear();
                            return [2 /*return*/, {}];
                    }
                });
            });
        };
        /**
         * Read a file from disk
         * @param options options for the file read
         * @return a promise that resolves with the read file data result
         */
        FilesystemPluginWeb.prototype.readFile = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var path, entry;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            path = this.getPath(options.directory, options.path);
                            return [4 /*yield*/, this.dbRequest('get', [path])];
                        case 1:
                            entry = _a.sent();
                            if (entry === undefined)
                                throw Error('File does not exist.');
                            return [2 /*return*/, { data: entry.content }];
                    }
                });
            });
        };
        /**
         * Write a file to disk in the specified location on device
         * @param options options for the file write
         * @return a promise that resolves with the file write result
         */
        FilesystemPluginWeb.prototype.writeFile = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var path, data, doRecursive, occupiedEntry, encoding, parentPath, parentEntry, subDirIndex, parentArgPath, now, pathObj;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            path = this.getPath(options.directory, options.path);
                            data = options.data;
                            doRecursive = options.recursive;
                            return [4 /*yield*/, this.dbRequest('get', [path])];
                        case 1:
                            occupiedEntry = _a.sent();
                            if (occupiedEntry && occupiedEntry.type === 'directory')
                                throw ('The supplied path is a directory.');
                            encoding = options.encoding;
                            parentPath = path.substr(0, path.lastIndexOf('/'));
                            return [4 /*yield*/, this.dbRequest('get', [parentPath])];
                        case 2:
                            parentEntry = _a.sent();
                            if (!(parentEntry === undefined)) return [3 /*break*/, 4];
                            subDirIndex = parentPath.indexOf('/', 1);
                            if (!(subDirIndex !== -1)) return [3 /*break*/, 4];
                            parentArgPath = parentPath.substr(subDirIndex);
                            return [4 /*yield*/, this.mkdir({ path: parentArgPath, directory: options.directory, recursive: doRecursive })];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            now = Date.now();
                            pathObj = {
                                path: path,
                                folder: parentPath,
                                type: 'file',
                                size: data.length,
                                ctime: now,
                                mtime: now,
                                content: !encoding && data.indexOf(',') >= 0 ? data.split(',')[1] : data,
                            };
                            return [4 /*yield*/, this.dbRequest('put', [pathObj])];
                        case 5:
                            _a.sent();
                            return [2 /*return*/, {
                                    uri: pathObj.path
                                }];
                    }
                });
            });
        };
        /**
         * Append to a file on disk in the specified location on device
         * @param options options for the file append
         * @return a promise that resolves with the file write result
         */
        FilesystemPluginWeb.prototype.appendFile = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var path, data, parentPath, now, ctime, occupiedEntry, parentEntry, parentArgPathIndex, parentArgPath, pathObj;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            path = this.getPath(options.directory, options.path);
                            data = options.data;
                            parentPath = path.substr(0, path.lastIndexOf('/'));
                            now = Date.now();
                            ctime = now;
                            return [4 /*yield*/, this.dbRequest('get', [path])];
                        case 1:
                            occupiedEntry = _a.sent();
                            if (occupiedEntry && occupiedEntry.type === 'directory')
                                throw ('The supplied path is a directory.');
                            return [4 /*yield*/, this.dbRequest('get', [parentPath])];
                        case 2:
                            parentEntry = _a.sent();
                            if (!(parentEntry === undefined)) return [3 /*break*/, 4];
                            parentArgPathIndex = parentPath.indexOf('/', 1);
                            parentArgPath = parentArgPathIndex !== -1 ? parentPath.substr(parentArgPathIndex) : '/';
                            return [4 /*yield*/, this.mkdir({ path: parentArgPath, directory: options.directory, recursive: true })];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            if (occupiedEntry !== undefined) {
                                data = occupiedEntry.content + data;
                                ctime = occupiedEntry.ctime;
                            }
                            pathObj = {
                                path: path,
                                folder: parentPath,
                                type: 'file',
                                size: data.length,
                                ctime: ctime,
                                mtime: now,
                                content: data
                            };
                            return [4 /*yield*/, this.dbRequest('put', [pathObj])];
                        case 5:
                            _a.sent();
                            return [2 /*return*/, {}];
                    }
                });
            });
        };
        /**
         * Delete a file from disk
         * @param options options for the file delete
         * @return a promise that resolves with the deleted file data result
         */
        FilesystemPluginWeb.prototype.deleteFile = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var path, entry, entries;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            path = this.getPath(options.directory, options.path);
                            return [4 /*yield*/, this.dbRequest('get', [path])];
                        case 1:
                            entry = _a.sent();
                            if (entry === undefined)
                                throw Error('File does not exist.');
                            return [4 /*yield*/, this.dbIndexRequest('by_folder', 'getAllKeys', [IDBKeyRange.only(path)])];
                        case 2:
                            entries = _a.sent();
                            if (entries.length !== 0)
                                throw Error('Folder is not empty.');
                            return [4 /*yield*/, this.dbRequest('delete', [path])];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, {}];
                    }
                });
            });
        };
        /**
         * Create a directory.
         * @param options options for the mkdir
         * @return a promise that resolves with the mkdir result
         */
        FilesystemPluginWeb.prototype.mkdir = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var path, doRecursive, parentPath, depth, parentEntry, occupiedEntry, parentArgPath, now, pathObj;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            path = this.getPath(options.directory, options.path);
                            doRecursive = options.recursive;
                            parentPath = path.substr(0, path.lastIndexOf('/'));
                            depth = (path.match(/\//g) || []).length;
                            return [4 /*yield*/, this.dbRequest('get', [parentPath])];
                        case 1:
                            parentEntry = _a.sent();
                            return [4 /*yield*/, this.dbRequest('get', [path])];
                        case 2:
                            occupiedEntry = _a.sent();
                            if (depth === 1)
                                throw Error('Cannot create Root directory');
                            if (occupiedEntry !== undefined)
                                throw Error('Current directory does already exist.');
                            if (!doRecursive && depth !== 2 && parentEntry === undefined)
                                throw Error('Parent directory must exist');
                            if (!(doRecursive && depth !== 2 && parentEntry === undefined)) return [3 /*break*/, 4];
                            parentArgPath = parentPath.substr(parentPath.indexOf('/', 1));
                            return [4 /*yield*/, this.mkdir({
                                    path: parentArgPath,
                                    directory: options.directory,
                                    recursive: doRecursive
                                })];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            now = Date.now();
                            pathObj = { path: path, folder: parentPath, type: 'directory', size: 0, ctime: now, mtime: now };
                            return [4 /*yield*/, this.dbRequest('put', [pathObj])];
                        case 5:
                            _a.sent();
                            return [2 /*return*/, {}];
                    }
                });
            });
        };
        /**
         * Remove a directory
         * @param options the options for the directory remove
         */
        FilesystemPluginWeb.prototype.rmdir = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var path, directory, recursive, fullPath, entry, readDirResult, _i, _a, entry_1, entryPath, entryObj;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            path = options.path, directory = options.directory, recursive = options.recursive;
                            fullPath = this.getPath(directory, path);
                            return [4 /*yield*/, this.dbRequest('get', [fullPath])];
                        case 1:
                            entry = _b.sent();
                            if (entry === undefined)
                                throw Error('Folder does not exist.');
                            if (entry.type !== 'directory')
                                throw Error('Requested path is not a directory');
                            return [4 /*yield*/, this.readdir({ path: path, directory: directory })];
                        case 2:
                            readDirResult = _b.sent();
                            if (readDirResult.files.length !== 0 && !recursive)
                                throw Error('Folder is not empty');
                            _i = 0, _a = readDirResult.files;
                            _b.label = 3;
                        case 3:
                            if (!(_i < _a.length)) return [3 /*break*/, 9];
                            entry_1 = _a[_i];
                            entryPath = path + "/" + entry_1;
                            return [4 /*yield*/, this.stat({ path: entryPath, directory: directory })];
                        case 4:
                            entryObj = _b.sent();
                            if (!(entryObj.type === 'file')) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.deleteFile({ path: entryPath, directory: directory })];
                        case 5:
                            _b.sent();
                            return [3 /*break*/, 8];
                        case 6: return [4 /*yield*/, this.rmdir({ path: entryPath, directory: directory, recursive: recursive })];
                        case 7:
                            _b.sent();
                            _b.label = 8;
                        case 8:
                            _i++;
                            return [3 /*break*/, 3];
                        case 9: return [4 /*yield*/, this.dbRequest('delete', [fullPath])];
                        case 10:
                            _b.sent();
                            return [2 /*return*/, {}];
                    }
                });
            });
        };
        /**
         * Return a list of files from the directory (not recursive)
         * @param options the options for the readdir operation
         * @return a promise that resolves with the readdir directory listing result
         */
        FilesystemPluginWeb.prototype.readdir = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var path, entry, entries, names;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            path = this.getPath(options.directory, options.path);
                            return [4 /*yield*/, this.dbRequest('get', [path])];
                        case 1:
                            entry = _a.sent();
                            if (options.path !== '' && entry === undefined)
                                throw Error('Folder does not exist.');
                            return [4 /*yield*/, this.dbIndexRequest('by_folder', 'getAllKeys', [IDBKeyRange.only(path)])];
                        case 2:
                            entries = _a.sent();
                            names = entries.map(function (e) {
                                return e.substring(path.length + 1);
                            });
                            return [2 /*return*/, { files: names }];
                    }
                });
            });
        };
        /**
         * Return full File URI for a path and directory
         * @param options the options for the stat operation
         * @return a promise that resolves with the file stat result
         */
        FilesystemPluginWeb.prototype.getUri = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var path, entry;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            path = this.getPath(options.directory, options.path);
                            return [4 /*yield*/, this.dbRequest('get', [path])];
                        case 1:
                            entry = _a.sent();
                            if (!(entry === undefined)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.dbRequest('get', [path + '/'])];
                        case 2:
                            entry = (_a.sent());
                            _a.label = 3;
                        case 3:
                            if (entry === undefined)
                                throw Error('Entry does not exist.');
                            return [2 /*return*/, {
                                    uri: entry.path
                                }];
                    }
                });
            });
        };
        /**
         * Return data about a file
         * @param options the options for the stat operation
         * @return a promise that resolves with the file stat result
         */
        FilesystemPluginWeb.prototype.stat = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var path, entry;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            path = this.getPath(options.directory, options.path);
                            return [4 /*yield*/, this.dbRequest('get', [path])];
                        case 1:
                            entry = _a.sent();
                            if (!(entry === undefined)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.dbRequest('get', [path + '/'])];
                        case 2:
                            entry = (_a.sent());
                            _a.label = 3;
                        case 3:
                            if (entry === undefined)
                                throw Error('Entry does not exist.');
                            return [2 /*return*/, {
                                    type: entry.type,
                                    size: entry.size,
                                    ctime: entry.ctime,
                                    mtime: entry.mtime,
                                    uri: entry.path
                                }];
                    }
                });
            });
        };
        /**
         * Rename a file or directory
         * @param options the options for the rename operation
         * @return a promise that resolves with the rename result
         */
        FilesystemPluginWeb.prototype.rename = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this._copy(options, true)];
                });
            });
        };
        /**
         * Copy a file or directory
         * @param options the options for the copy operation
         * @return a promise that resolves with the copy result
         */
        FilesystemPluginWeb.prototype.copy = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this._copy(options, false)];
                });
            });
        };
        /**
         * Function that can perform a copy or a rename
         * @param options the options for the rename operation
         * @param doRename whether to perform a rename or copy operation
         * @return a promise that resolves with the result
         */
        FilesystemPluginWeb.prototype._copy = function (options, doRename) {
            if (doRename === void 0) { doRename = false; }
            return __awaiter(this, void 0, void 0, function () {
                var to, from, fromDirectory, toDirectory, fromPath, toPath, toObj, e_1, toPathComponents, toPath_1, toParentDirectory, fromObj, updateTime, _a, file, e_2, contents, _i, contents_1, filename;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            to = options.to, from = options.from, fromDirectory = options.directory, toDirectory = options.toDirectory;
                            if (!to || !from) {
                                throw Error('Both to and from must be provided');
                            }
                            // If no "to" directory is provided, use the "from" directory
                            if (!toDirectory) {
                                toDirectory = fromDirectory;
                            }
                            fromPath = this.getPath(fromDirectory, from);
                            toPath = this.getPath(toDirectory, to);
                            // Test that the "to" and "from" locations are different
                            if (fromPath === toPath) {
                                return [2 /*return*/, {}];
                            }
                            if (toPath.startsWith(fromPath)) {
                                throw Error('To path cannot contain the from path');
                            }
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 6]);
                            return [4 /*yield*/, this.stat({
                                    path: to,
                                    directory: toDirectory
                                })];
                        case 2:
                            toObj = _b.sent();
                            return [3 /*break*/, 6];
                        case 3:
                            e_1 = _b.sent();
                            toPathComponents = to.split('/');
                            toPathComponents.pop();
                            toPath_1 = toPathComponents.join('/');
                            if (!(toPathComponents.length > 0)) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.stat({
                                    path: toPath_1,
                                    directory: toDirectory,
                                })];
                        case 4:
                            toParentDirectory = _b.sent();
                            if (toParentDirectory.type !== 'directory') {
                                throw new Error('Parent directory of the to path is a file');
                            }
                            _b.label = 5;
                        case 5: return [3 /*break*/, 6];
                        case 6:
                            // Cannot overwrite a directory
                            if (toObj && toObj.type === 'directory') {
                                throw new Error('Cannot overwrite a directory with a file');
                            }
                            return [4 /*yield*/, this.stat({
                                    path: from,
                                    directory: fromDirectory,
                                })];
                        case 7:
                            fromObj = _b.sent();
                            updateTime = function (path, ctime, mtime) { return __awaiter(_this, void 0, void 0, function () {
                                var fullPath, entry;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            fullPath = this.getPath(toDirectory, path);
                                            return [4 /*yield*/, this.dbRequest('get', [fullPath])];
                                        case 1:
                                            entry = _a.sent();
                                            entry.ctime = ctime;
                                            entry.mtime = mtime;
                                            return [4 /*yield*/, this.dbRequest('put', [entry])];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); };
                            _a = fromObj.type;
                            switch (_a) {
                                case 'file': return [3 /*break*/, 8];
                                case 'directory': return [3 /*break*/, 15];
                            }
                            return [3 /*break*/, 28];
                        case 8: return [4 /*yield*/, this.readFile({
                                path: from,
                                directory: fromDirectory
                            })];
                        case 9:
                            file = _b.sent();
                            if (!doRename) return [3 /*break*/, 11];
                            return [4 /*yield*/, this.deleteFile({
                                    path: from,
                                    directory: fromDirectory
                                })];
                        case 10:
                            _b.sent();
                            _b.label = 11;
                        case 11: 
                        // Write the file to the new location
                        return [4 /*yield*/, this.writeFile({
                                path: to,
                                directory: toDirectory,
                                data: file.data
                            })];
                        case 12:
                            // Write the file to the new location
                            _b.sent();
                            if (!doRename) return [3 /*break*/, 14];
                            return [4 /*yield*/, updateTime(to, fromObj.ctime, fromObj.mtime)];
                        case 13:
                            _b.sent();
                            _b.label = 14;
                        case 14: 
                        // Resolve promise
                        return [2 /*return*/, {}];
                        case 15:
                            if (toObj) {
                                throw Error('Cannot move a directory over an existing object');
                            }
                            _b.label = 16;
                        case 16:
                            _b.trys.push([16, 20, , 21]);
                            // Create the to directory
                            return [4 /*yield*/, this.mkdir({
                                    path: to,
                                    directory: toDirectory,
                                    recursive: false,
                                })];
                        case 17:
                            // Create the to directory
                            _b.sent();
                            if (!doRename) return [3 /*break*/, 19];
                            return [4 /*yield*/, updateTime(to, fromObj.ctime, fromObj.mtime)];
                        case 18:
                            _b.sent();
                            _b.label = 19;
                        case 19: return [3 /*break*/, 21];
                        case 20:
                            e_2 = _b.sent();
                            return [3 /*break*/, 21];
                        case 21: return [4 /*yield*/, this.readdir({
                                path: from,
                                directory: fromDirectory,
                            })];
                        case 22:
                            contents = (_b.sent()).files;
                            _i = 0, contents_1 = contents;
                            _b.label = 23;
                        case 23:
                            if (!(_i < contents_1.length)) return [3 /*break*/, 26];
                            filename = contents_1[_i];
                            // Move item from the from directory to the to directory
                            return [4 /*yield*/, this._copy({
                                    from: from + "/" + filename,
                                    to: to + "/" + filename,
                                    directory: fromDirectory,
                                    toDirectory: toDirectory,
                                }, doRename)];
                        case 24:
                            // Move item from the from directory to the to directory
                            _b.sent();
                            _b.label = 25;
                        case 25:
                            _i++;
                            return [3 /*break*/, 23];
                        case 26:
                            if (!doRename) return [3 /*break*/, 28];
                            return [4 /*yield*/, this.rmdir({
                                    path: from,
                                    directory: fromDirectory
                                })];
                        case 27:
                            _b.sent();
                            _b.label = 28;
                        case 28: return [2 /*return*/, {}];
                    }
                });
            });
        };
        FilesystemPluginWeb._debug = true;
        return FilesystemPluginWeb;
    }(WebPlugin));
    var Filesystem = new FilesystemPluginWeb();

    var extend = function (target) {
        var objs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            objs[_i - 1] = arguments[_i];
        }
        objs.forEach(function (o) {
            if (o && typeof (o) === 'object') {
                for (var k in o) {
                    if (o.hasOwnProperty(k)) {
                        target[k] = o[k];
                    }
                }
            }
        });
        return target;
    };
    var uuid4 = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    var GeolocationPluginWeb = /** @class */ (function (_super) {
        __extends(GeolocationPluginWeb, _super);
        function GeolocationPluginWeb() {
            return _super.call(this, {
                name: 'Geolocation',
                platforms: ['web']
            }) || this;
        }
        GeolocationPluginWeb.prototype.getCurrentPosition = function (options) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                return _this.requestPermissions().then(function (_result) {
                    window.navigator.geolocation.getCurrentPosition(function (pos) {
                        resolve(pos);
                    }, function (err) {
                        reject(err);
                    }, extend({
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 0
                    }, options));
                });
            });
        };
        GeolocationPluginWeb.prototype.watchPosition = function (options, callback) {
            var id = window.navigator.geolocation.watchPosition(function (pos) {
                callback(pos);
            }, function (err) {
                callback(null, err);
            }, extend({
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }, options));
            return "" + id;
        };
        GeolocationPluginWeb.prototype.clearWatch = function (options) {
            window.navigator.geolocation.clearWatch(parseInt(options.id, 10));
            return Promise.resolve();
        };
        return GeolocationPluginWeb;
    }(WebPlugin));
    var Geolocation = new GeolocationPluginWeb();

    var DevicePluginWeb = /** @class */ (function (_super) {
        __extends(DevicePluginWeb, _super);
        function DevicePluginWeb() {
            return _super.call(this, {
                name: 'Device',
                platforms: ['web']
            }) || this;
        }
        DevicePluginWeb.prototype.getInfo = function () {
            return __awaiter(this, void 0, void 0, function () {
                var ua, uaFields;
                return __generator(this, function (_a) {
                    ua = navigator.userAgent;
                    uaFields = this.parseUa(ua);
                    return [2 /*return*/, Promise.resolve({
                            model: uaFields.model,
                            platform: 'web',
                            appVersion: '',
                            appBuild: '',
                            appId: '',
                            appName: '',
                            operatingSystem: uaFields.operatingSystem,
                            osVersion: uaFields.osVersion,
                            manufacturer: navigator.vendor,
                            isVirtual: false,
                            uuid: this.getUid()
                        })];
                });
            });
        };
        DevicePluginWeb.prototype.getBatteryInfo = function () {
            return __awaiter(this, void 0, void 0, function () {
                var battery, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            battery = {};
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, navigator.getBattery()];
                        case 2:
                            battery = _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _a.sent();
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/, Promise.resolve({
                                batteryLevel: battery.level,
                                isCharging: battery.charging
                            })];
                    }
                });
            });
        };
        DevicePluginWeb.prototype.getLanguageCode = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, {
                            value: navigator.language
                        }];
                });
            });
        };
        DevicePluginWeb.prototype.parseUa = function (_ua) {
            var uaFields = {};
            var start = _ua.indexOf('(') + 1;
            var end = _ua.indexOf(') AppleWebKit');
            if (_ua.indexOf(') Gecko') !== -1) {
                end = _ua.indexOf(') Gecko');
            }
            var fields = _ua.substring(start, end);
            if (_ua.indexOf('Android') !== -1) {
                uaFields.model = fields.replace('; wv', '').split('; ').pop().split(' Build')[0];
                uaFields.osVersion = fields.split('; ')[1];
            }
            else {
                uaFields.model = fields.split('; ')[0];
                if (navigator.oscpu) {
                    uaFields.osVersion = navigator.oscpu;
                }
                else {
                    if (_ua.indexOf('Windows') !== -1) {
                        uaFields.osVersion = fields;
                    }
                    else {
                        var lastParts = fields.split('; ').pop().replace(' like Mac OS X', '').split(' ');
                        uaFields.osVersion = lastParts[lastParts.length - 1].replace(/_/g, '.');
                    }
                }
            }
            if (/android/i.test(_ua)) {
                uaFields.operatingSystem = 'android';
            }
            else if (/iPad|iPhone|iPod/.test(_ua) && !window.MSStream) {
                uaFields.operatingSystem = 'ios';
            }
            else if (/Win/.test(_ua)) {
                uaFields.operatingSystem = 'windows';
            }
            else if (/Mac/i.test(_ua)) {
                uaFields.operatingSystem = 'mac';
            }
            else {
                uaFields.operatingSystem = 'unknown';
            }
            return uaFields;
        };
        DevicePluginWeb.prototype.getUid = function () {
            var uid = window.localStorage.getItem('_capuid');
            if (uid) {
                return uid;
            }
            uid = uuid4();
            window.localStorage.setItem('_capuid', uid);
            return uid;
        };
        return DevicePluginWeb;
    }(WebPlugin));
    var Device = new DevicePluginWeb();

    var LocalNotificationsPluginWeb = /** @class */ (function (_super) {
        __extends(LocalNotificationsPluginWeb, _super);
        function LocalNotificationsPluginWeb() {
            var _this = _super.call(this, {
                name: 'LocalNotifications',
                platforms: ['web']
            }) || this;
            _this.pending = [];
            return _this;
        }
        LocalNotificationsPluginWeb.prototype.createChannel = function (channel) {
            throw new Error('Feature not available in the browser. ' + channel.id);
        };
        LocalNotificationsPluginWeb.prototype.deleteChannel = function (channel) {
            throw new Error('Feature not available in the browser. ' + channel.id);
        };
        LocalNotificationsPluginWeb.prototype.listChannels = function () {
            throw new Error('Feature not available in the browser');
        };
        LocalNotificationsPluginWeb.prototype.sendPending = function () {
            var _this = this;
            var toRemove = [];
            var now = +new Date;
            this.pending.forEach(function (localNotification) {
                if (localNotification.schedule && localNotification.schedule.at) {
                    if (+localNotification.schedule.at <= now) {
                        _this.buildNotification(localNotification);
                        toRemove.push(localNotification);
                    }
                }
            });
            console.log('Sent pending, removing', toRemove);
            this.pending = this.pending.filter(function (localNotification) { return !toRemove.find(function (ln) { return ln === localNotification; }); });
        };
        LocalNotificationsPluginWeb.prototype.sendNotification = function (localNotification) {
            var _this = this;
            var l = localNotification;
            if (localNotification.schedule && localNotification.schedule.at) {
                var diff = +localNotification.schedule.at - +new Date;
                this.pending.push(l);
                setTimeout(function () {
                    _this.sendPending();
                }, diff);
                return;
            }
            this.buildNotification(localNotification);
        };
        LocalNotificationsPluginWeb.prototype.buildNotification = function (localNotification) {
            var l = localNotification;
            return new Notification(l.title, {
                body: l.body
            });
        };
        LocalNotificationsPluginWeb.prototype.schedule = function (options) {
            var _this = this;
            var notifications = [];
            options.notifications.forEach(function (notification) {
                notifications.push(_this.sendNotification(notification));
            });
            return Promise.resolve({
                notifications: options.notifications.map(function (notification) { return { id: '' + notification.id }; })
            });
        };
        LocalNotificationsPluginWeb.prototype.getPending = function () {
            return Promise.resolve({
                notifications: this.pending.map(function (localNotification) {
                    return {
                        id: '' + localNotification.id
                    };
                })
            });
        };
        LocalNotificationsPluginWeb.prototype.registerActionTypes = function (_options) {
            throw new Error('Method not implemented.');
        };
        LocalNotificationsPluginWeb.prototype.cancel = function (pending) {
            console.log('Cancel these', pending);
            this.pending = this.pending.filter(function (localNotification) { return !pending.notifications.find(function (ln) { return ln.id === '' + localNotification.id; }); });
            return Promise.resolve();
        };
        LocalNotificationsPluginWeb.prototype.areEnabled = function () {
            return Promise.resolve({
                value: Notification.permission === 'granted'
            });
        };
        LocalNotificationsPluginWeb.prototype.requestPermission = function () {
            return new Promise(function (resolve) {
                Notification.requestPermission(function (result) {
                    var granted = true;
                    if (result === 'denied' || result === 'default') {
                        granted = false;
                    }
                    resolve({ granted: granted });
                });
            });
        };
        LocalNotificationsPluginWeb.prototype.requestPermissions = function () {
            return new Promise(function (resolve, reject) {
                Notification.requestPermission(function (result) {
                    if (result === 'denied' || result === 'default') {
                        reject(result);
                        return;
                    }
                    resolve({
                        results: [result]
                    });
                });
            });
        };
        return LocalNotificationsPluginWeb;
    }(WebPlugin));
    var LocalNotifications = new LocalNotificationsPluginWeb();

    var SharePluginWeb = /** @class */ (function (_super) {
        __extends(SharePluginWeb, _super);
        function SharePluginWeb() {
            return _super.call(this, {
                name: 'Share',
                platforms: ['web']
            }) || this;
        }
        SharePluginWeb.prototype.share = function (options) {
            if (!navigator.share) {
                return Promise.reject('Web Share API not available');
            }
            return navigator.share({
                title: options.title,
                text: options.text,
                url: options.url
            });
        };
        return SharePluginWeb;
    }(WebPlugin));
    var Share = new SharePluginWeb();

    var ModalsPluginWeb = /** @class */ (function (_super) {
        __extends(ModalsPluginWeb, _super);
        function ModalsPluginWeb() {
            return _super.call(this, {
                name: 'Modals',
                platforms: ['web']
            }) || this;
        }
        ModalsPluginWeb.prototype.alert = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    window.alert(options.message);
                    return [2 /*return*/, Promise.resolve()];
                });
            });
        };
        ModalsPluginWeb.prototype.prompt = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var val;
                return __generator(this, function (_a) {
                    val = window.prompt(options.message, options.inputText || '');
                    return [2 /*return*/, Promise.resolve({
                            value: val,
                            cancelled: val === null
                        })];
                });
            });
        };
        ModalsPluginWeb.prototype.confirm = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var val;
                return __generator(this, function (_a) {
                    val = window.confirm(options.message);
                    return [2 /*return*/, Promise.resolve({
                            value: val
                        })];
                });
            });
        };
        ModalsPluginWeb.prototype.showActions = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, _reject) { return __awaiter(_this, void 0, void 0, function () {
                            var actionSheet;
                            var _this = this;
                            return __generator(this, function (_a) {
                                actionSheet = document.querySelector('pwa-action-sheet');
                                if (!actionSheet) {
                                    actionSheet = document.createElement('pwa-action-sheet');
                                    document.body.appendChild(actionSheet);
                                }
                                actionSheet.header = options.title;
                                actionSheet.cancelable = false;
                                actionSheet.options = options.options;
                                actionSheet.addEventListener('onSelection', function (e) { return __awaiter(_this, void 0, void 0, function () {
                                    var selection;
                                    return __generator(this, function (_a) {
                                        selection = e.detail;
                                        resolve({
                                            index: selection
                                        });
                                        return [2 /*return*/];
                                    });
                                }); });
                                return [2 /*return*/];
                            });
                        }); })];
                });
            });
        };
        return ModalsPluginWeb;
    }(WebPlugin));
    var Modals = new ModalsPluginWeb();

    var MotionPluginWeb = /** @class */ (function (_super) {
        __extends(MotionPluginWeb, _super);
        function MotionPluginWeb() {
            var _this = _super.call(this, {
                name: 'Motion'
            }) || this;
            _this.registerWindowListener('devicemotion', 'accel');
            _this.registerWindowListener('deviceorientation', 'orientation');
            return _this;
        }
        return MotionPluginWeb;
    }(WebPlugin));
    var Motion = new MotionPluginWeb();

    var NetworkPluginWeb = /** @class */ (function (_super) {
        __extends(NetworkPluginWeb, _super);
        function NetworkPluginWeb() {
            var _this = _super.call(this, {
                name: 'Network',
                platforms: ['web']
            }) || this;
            _this.listenerFunction = null;
            return _this;
        }
        NetworkPluginWeb.prototype.getStatus = function () {
            return new Promise(function (resolve, reject) {
                if (!window.navigator) {
                    reject('Network info not available');
                    return;
                }
                var connected = window.navigator.onLine;
                var connection = window.navigator.connection || window.navigator.mozConnection || window.navigator.webkitConnection;
                var connectionType = connection ? (connection.type || connection.effectiveType) : 'wifi';
                resolve({
                    connected: connected,
                    connectionType: connected ? connectionType : 'none'
                });
            });
        };
        NetworkPluginWeb.prototype.addListener = function (eventName, listenerFunc) {
            var thisRef = this;
            var connection = window.navigator.connection || window.navigator.mozConnection || window.navigator.webkitConnection;
            var connectionType = connection ? (connection.type || connection.effectiveType) : 'wifi';
            var onlineBindFunc = listenerFunc.bind(thisRef, { connected: true, connectionType: connectionType });
            var offlineBindFunc = listenerFunc.bind(thisRef, { connected: false, connectionType: 'none' });
            if (eventName.localeCompare('networkStatusChange') === 0) {
                window.addEventListener('online', onlineBindFunc);
                window.addEventListener('offline', offlineBindFunc);
                return {
                    remove: function () {
                        window.removeEventListener('online', onlineBindFunc);
                        window.removeEventListener('offline', offlineBindFunc);
                    }
                };
            }
        };
        return NetworkPluginWeb;
    }(WebPlugin));
    var Network = new NetworkPluginWeb();

    var PermissionsPluginWeb = /** @class */ (function (_super) {
        __extends(PermissionsPluginWeb, _super);
        function PermissionsPluginWeb() {
            return _super.call(this, {
                name: 'Permissions'
            }) || this;
        }
        PermissionsPluginWeb.prototype.query = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var navigator, name, ret;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            navigator = window.navigator;
                            if (!navigator.permissions) {
                                return [2 /*return*/, Promise.reject('This browser does not support the Permissions API')];
                            }
                            name = options.name === PermissionType.Photos ? 'camera' : options.name;
                            return [4 /*yield*/, navigator.permissions.query({ name: name })];
                        case 1:
                            ret = _a.sent();
                            return [2 /*return*/, {
                                    state: ret.state
                                }];
                    }
                });
            });
        };
        return PermissionsPluginWeb;
    }(WebPlugin));
    var Permissions = new PermissionsPluginWeb();

    var SplashScreenPluginWeb = /** @class */ (function (_super) {
        __extends(SplashScreenPluginWeb, _super);
        function SplashScreenPluginWeb() {
            return _super.call(this, {
                name: 'SplashScreen',
                platforms: ['web']
            }) || this;
        }
        SplashScreenPluginWeb.prototype.show = function (_options, _callback) {
            return Promise.resolve();
        };
        SplashScreenPluginWeb.prototype.hide = function (_options, _callback) {
            return Promise.resolve();
        };
        return SplashScreenPluginWeb;
    }(WebPlugin));
    var SplashScreen = new SplashScreenPluginWeb();

    var StoragePluginWeb = /** @class */ (function (_super) {
        __extends(StoragePluginWeb, _super);
        function StoragePluginWeb() {
            var _this = _super.call(this, {
                name: 'Storage',
                platforms: ['web']
            }) || this;
            _this.KEY_PREFIX = '_cap_';
            return _this;
        }
        StoragePluginWeb.prototype.get = function (options) {
            var _this = this;
            return new Promise(function (resolve, _reject) {
                resolve({
                    value: window.localStorage.getItem(_this.makeKey(options.key))
                });
            });
        };
        StoragePluginWeb.prototype.set = function (options) {
            var _this = this;
            return new Promise(function (resolve, _reject) {
                window.localStorage.setItem(_this.makeKey(options.key), options.value);
                resolve();
            });
        };
        StoragePluginWeb.prototype.remove = function (options) {
            var _this = this;
            return new Promise(function (resolve, _reject) {
                window.localStorage.removeItem(_this.makeKey(options.key));
                resolve();
            });
        };
        StoragePluginWeb.prototype.keys = function () {
            var _this = this;
            return new Promise(function (resolve, _reject) {
                resolve({
                    keys: Object.keys(localStorage).filter(function (k) { return _this.isKey(k); }).map(function (k) { return _this.getKey(k); })
                });
            });
        };
        StoragePluginWeb.prototype.clear = function () {
            var _this = this;
            return new Promise(function (resolve, _reject) {
                Object.keys(localStorage)
                    .filter(function (k) { return _this.isKey(k); })
                    .forEach(function (k) { return window.localStorage.removeItem(k); });
                resolve();
            });
        };
        StoragePluginWeb.prototype.makeKey = function (key) {
            return this.KEY_PREFIX + key;
        };
        StoragePluginWeb.prototype.isKey = function (key) {
            return key.indexOf(this.KEY_PREFIX) === 0;
        };
        StoragePluginWeb.prototype.getKey = function (key) {
            return key.substr(this.KEY_PREFIX.length);
        };
        return StoragePluginWeb;
    }(WebPlugin));
    var Storage = new StoragePluginWeb();

    var ToastPluginWeb = /** @class */ (function (_super) {
        __extends(ToastPluginWeb, _super);
        function ToastPluginWeb() {
            return _super.call(this, {
                name: 'Toast',
                platforms: ['web']
            }) || this;
        }
        ToastPluginWeb.prototype.show = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var duration, toast;
                return __generator(this, function (_a) {
                    duration = 2000;
                    if (options.duration) {
                        duration = options.duration === 'long' ? 3500 : 2000;
                    }
                    toast = document.createElement('pwa-toast');
                    toast.duration = duration;
                    toast.message = options.text;
                    document.body.appendChild(toast);
                    return [2 /*return*/];
                });
            });
        };
        return ToastPluginWeb;
    }(WebPlugin));
    var Toast = new ToastPluginWeb();

    mergeWebPlugins(Plugins);
    var registerWebPlugin = function (plugin) {
        mergeWebPlugin(Plugins, plugin);
    };

    class Data {
    }

    //import * as sqlite3 from 'sqlite3';
    //import * as path from 'path';
    //import * as fs from 'fs';
    //const sqlite3: any = window['sqlite3' as any];
    ////const fs: any = window['fs' as any];
    //const path: any = window['path' as any];
    class UtilsSQLite {
        constructor() {
            this.pathDB = './DataStorage';
            this.Path = null;
            this.NodeFs = null;
            this.SQLite3 = null;
            this.Path = require('path');
            this.NodeFs = require('fs');
            this.SQLite3 = require('sqlite3');
        }
        connection(dbName, readOnly /*,key?:string*/) {
            const flags = readOnly
                ? this.SQLite3.OPEN_READONLY
                : this.SQLite3.OPEN_CREATE | this.SQLite3.OPEN_READWRITE;
            console.log('in UtilsSQLite.connection flags ', flags);
            // get the path for the database
            const dbPath = this._getDBPath(dbName);
            console.log("#### dbPath " + dbPath);
            let dbOpen;
            if (dbPath != null) {
                try {
                    dbOpen = new this.SQLite3.Database(dbPath, flags);
                    return dbOpen;
                }
                catch (e) {
                    console.log('Error: in UtilsSQLite.connection ', e);
                    return null;
                }
            }
        }
        getWritableDatabase(dbName /*, secret: string*/) {
            const db = this.connection(dbName, false /*,secret*/);
            return db;
        }
        getReadableDatabase(dbName /*, secret: string*/) {
            const db = this.connection(dbName, true /*,secret*/);
            return db;
        }
        _getDBPath(dbName) {
            let retPath = null;
            const dbFolder = this.pathDB;
            retPath = this.Path.join(dbFolder, dbName);
            try {
                if (!this.NodeFs.existsSync(dbFolder)) {
                    this._mkdirSyncRecursive(dbFolder);
                }
            }
            catch (e) {
                console.log('Error: in getDBPath', e);
            }
            return retPath;
        }
        _mkdirSyncRecursive(directory) {
            var path = directory.replace(/\/$/, '').split('/');
            for (var i = 1; i <= path.length; i++) {
                var segment = path.slice(0, i).join('/');
                segment.length > 0 && !this.NodeFs.existsSync(segment)
                    ? this.NodeFs.mkdirSync(segment)
                    : null;
            }
            return;
        }
    }

    const COL_ID = 'id';
    const COL_NAME = 'name';
    const COL_VALUE = 'value';
    //const fs: any = window['fs' as any];
    //const path: any = window['path' as any];
    class StorageDatabaseHelper {
        constructor() {
            this.Path = null;
            this.NodeFs = null;
            this.Path = require('path');
            this.NodeFs = require('fs');
            this._utils = new UtilsSQLite();
        }
        openStore(dbName, tableName) {
            return new Promise(resolve => {
                let ret = false;
                this._db = this._utils.connection(dbName, false /*,this._secret*/);
                if (this._db !== null) {
                    this._createTable(tableName);
                    this._dbName = dbName;
                    this._tableName = tableName;
                    ret = true;
                }
                resolve(ret);
            });
        }
        _createTable(tableName) {
            const CREATE_STORAGE_TABLE = 'CREATE TABLE IF NOT EXISTS ' +
                tableName +
                '(' +
                COL_ID +
                ' INTEGER PRIMARY KEY AUTOINCREMENT,' + // Define a primary key
                COL_NAME +
                ' TEXT NOT NULL UNIQUE,' +
                COL_VALUE +
                ' TEXT' +
                ')';
            try {
                this._db.run(CREATE_STORAGE_TABLE, this._createIndex.bind(this, tableName));
            }
            catch (e) {
                console.log('Error: in createTable ', e);
            }
        }
        _createIndex(tableName) {
            const idx = `index_${tableName}_on_${COL_NAME}`;
            const CREATE_INDEX_NAME = 'CREATE INDEX IF NOT EXISTS ' +
                idx +
                ' ON ' +
                tableName +
                ' (' +
                COL_NAME +
                ')';
            try {
                this._db.run(CREATE_INDEX_NAME);
            }
            catch (e) {
                console.log('Error: in createIndex ', e);
            }
        }
        setTable(tableName) {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                let ret = false;
                this._db = this._utils.getWritableDatabase(this._dbName /*,this._secret*/);
                try {
                    this._createTable(tableName);
                    this._tableName = tableName;
                    ret = true;
                    console.log('create table successfull ', this._tableName);
                }
                catch (e) {
                    console.log('Error: in createTable ', e);
                }
                finally {
                    this._db.close();
                    resolve(ret);
                }
            }));
        }
        // Insert a data into the database
        set(data) {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                const db = this._utils.getWritableDatabase(this._dbName /*,this._secret*/);
                // Check if data.name does not exist otherwise update it
                const res = yield this.get(data.name);
                if (res.id != null) {
                    // exists so update it
                    const resUpd = yield this.update(data);
                    db.close();
                    resolve(resUpd);
                }
                else {
                    // does not exist add it
                    const DATA_INSERT = `INSERT INTO "${this._tableName}" 
                ("${COL_NAME}", "${COL_VALUE}") 
                VALUES (?, ?)`;
                    db.run(DATA_INSERT, [data.name, data.value], (err) => {
                        if (err) {
                            console.log('Data INSERT: ', err.message);
                            db.close();
                            resolve(false);
                        }
                        else {
                            db.close();
                            resolve(true);
                        }
                    });
                }
            }));
        }
        // get a Data
        get(name) {
            return new Promise(resolve => {
                let data = null;
                const db = this._utils.getReadableDatabase(this._dbName /*,this._secret*/);
                const DATA_SELECT_QUERY = 'SELECT * FROM ' +
                    this._tableName +
                    ' WHERE ' +
                    COL_NAME +
                    " = '" +
                    name +
                    "'";
                db.all(DATA_SELECT_QUERY, (err, rows) => {
                    if (err) {
                        data = new Data();
                        data.id = null;
                        db.close();
                        resolve(data);
                    }
                    else {
                        data = new Data();
                        if (rows.length >= 1) {
                            data = rows[0];
                        }
                        else {
                            data.id = null;
                        }
                        db.close();
                        resolve(data);
                    }
                });
            });
        }
        // update a Data
        update(data) {
            return new Promise(resolve => {
                const db = this._utils.getWritableDatabase(this._dbName /*,this._secret*/);
                const DATA_UPDATE = `UPDATE "${this._tableName}" 
            SET "${COL_VALUE}" = ? WHERE "${COL_NAME}" = ?`;
                db.run(DATA_UPDATE, [data.value, data.name], (err) => {
                    if (err) {
                        console.log('Data UPDATE: ', err.message);
                        db.close();
                        resolve(false);
                    }
                    else {
                        db.close();
                        resolve(true);
                    }
                });
            });
        }
        // isKey exists
        iskey(name) {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                const res = yield this.get(name);
                if (res.id != null) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }));
        }
        // remove a key
        remove(name) {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                const res = yield this.get(name);
                if (res.id != null) {
                    const db = this._utils.getWritableDatabase(this._dbName /*,this._secret*/);
                    const DATA_DELETE = `DELETE FROM "${this._tableName}" 
                WHERE "${COL_NAME}" = ?`;
                    db.run(DATA_DELETE, name, (err) => {
                        if (err) {
                            console.log('Data DELETE: ', err.message);
                            db.close();
                            resolve(false);
                        }
                        else {
                            db.close();
                            resolve(true);
                        }
                    });
                }
                else {
                    console.log('Error:REMOVE key does not exist');
                    resolve(false);
                }
            }));
        }
        // remove all keys
        clear() {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                const db = this._utils.getWritableDatabase(this._dbName /*,this._secret*/);
                const DATA_DELETE = `DELETE FROM "${this._tableName}"`;
                db.run(DATA_DELETE, [], (err) => {
                    if (err) {
                        console.log('Data CLEAR: ', err.message);
                        db.close();
                        resolve(false);
                    }
                    else {
                        // set back the key primary index to 0
                        const DATA_UPDATE = `UPDATE SQLITE_SEQUENCE 
                    SET SEQ = ? `;
                        db.run(DATA_UPDATE, 0, (err) => {
                            if (err) {
                                console.log('Data UPDATE SQLITE_SEQUENCE: ', err.message);
                                db.close();
                                resolve(false);
                            }
                            else {
                                db.close();
                                resolve(true);
                            }
                        });
                    }
                });
            }));
        }
        keys() {
            return new Promise(resolve => {
                const db = this._utils.getReadableDatabase(this._dbName /*,this._secret*/);
                const DATA_SELECT_KEYS = `SELECT "${COL_NAME}" FROM "${this._tableName}"`;
                db.all(DATA_SELECT_KEYS, (err, rows) => {
                    if (err) {
                        db.close();
                        resolve([]);
                    }
                    else {
                        let arKeys = [];
                        for (let i = 0; i < rows.length; i++) {
                            arKeys = [...arKeys, rows[i].name];
                            if (i === rows.length - 1) {
                                db.close();
                                resolve(arKeys);
                            }
                        }
                    }
                });
            });
        }
        values() {
            return new Promise(resolve => {
                const db = this._utils.getReadableDatabase(this._dbName /*,this._secret*/);
                const DATA_SELECT_VALUES = `SELECT "${COL_VALUE}" FROM "${this._tableName}"`;
                db.all(DATA_SELECT_VALUES, (err, rows) => {
                    if (err) {
                        db.close();
                        resolve([]);
                    }
                    else {
                        let arValues = [];
                        for (let i = 0; i < rows.length; i++) {
                            arValues = [...arValues, rows[i].value];
                            if (i === rows.length - 1) {
                                db.close();
                                resolve(arValues);
                            }
                        }
                    }
                });
            });
        }
        keysvalues() {
            return new Promise(resolve => {
                const db = this._utils.getReadableDatabase(this._dbName /*,this._secret*/);
                const DATA_SELECT_KEYSVALUES = `SELECT "${COL_NAME}" , "${COL_VALUE}" FROM "${this._tableName}"`;
                db.all(DATA_SELECT_KEYSVALUES, (err, rows) => {
                    if (err) {
                        db.close();
                        resolve([]);
                    }
                    else {
                        db.close();
                        resolve(rows);
                    }
                });
            });
        }
        deleteStore(dbName) {
            return new Promise(resolve => {
                let ret = false;
                const dbPath = this.Path.join(this._utils.pathDB, dbName);
                try {
                    this.NodeFs.unlinkSync(dbPath);
                    //file removed
                    ret = true;
                }
                catch (e) {
                    console.log('Error: in deleteStore');
                }
                resolve(ret);
            });
        }
    }

    const { remote } = require('electron');
    class CapacitorDataStorageSqliteElectronWeb extends WebPlugin {
        constructor() {
            super({
                name: 'CapacitorDataStorageSqlite',
                platforms: ['electron'],
            });
            this.RemoteRef = null;
            this.RemoteRef = remote;
            this.mDb = new StorageDatabaseHelper();
        }
        echo(options) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log('ECHO in Electron Plugin', options);
                return options;
            });
        }
        openStore(options) {
            return __awaiter(this, void 0, void 0, function* () {
                let ret = false;
                let dbName = options.database
                    ? `${options.database}SQLite.db`
                    : 'storageSQLite.db';
                let tableName = options.table ? options.table : 'storage_store';
                ret = yield this.mDb.openStore(dbName, tableName);
                return Promise.resolve({ result: ret });
            });
        }
        setTable(options) {
            return __awaiter(this, void 0, void 0, function* () {
                let tableName = options.table;
                if (tableName == null) {
                    return Promise.reject({
                        result: false,
                        message: 'Must provide a table name',
                    });
                }
                let ret = false;
                let message = '';
                if (this.mDb) {
                    ret = yield this.mDb.setTable(tableName);
                    if (ret) {
                        return Promise.resolve({ result: ret, message: message });
                    }
                    else {
                        return Promise.reject({
                            result: ret,
                            message: 'failed in adding table',
                        });
                    }
                }
                else {
                    return Promise.reject({
                        result: ret,
                        message: 'Must open a store first',
                    });
                }
            });
        }
        set(options) {
            return __awaiter(this, void 0, void 0, function* () {
                let ret;
                let key = options.key;
                if (key == null) {
                    return Promise.reject({ result: false, message: 'Must provide key' });
                }
                let value = options.value;
                if (value == null) {
                    return Promise.reject({ result: false, message: 'Must provide value' });
                }
                let data = new Data();
                data.name = key;
                data.value = value;
                ret = yield this.mDb.set(data);
                return Promise.resolve({ result: ret });
            });
        }
        get(options) {
            return __awaiter(this, void 0, void 0, function* () {
                let ret;
                let key = options.key;
                if (key == null) {
                    return Promise.reject({ result: false, message: 'Must provide key' });
                }
                let data = yield this.mDb.get(key);
                ret = data != null && data.id != null ? data.value : null;
                return Promise.resolve({ value: ret });
            });
        }
        remove(options) {
            return __awaiter(this, void 0, void 0, function* () {
                let ret;
                let key = options.key;
                if (key == null) {
                    return Promise.reject({ result: false, message: 'Must provide key' });
                }
                ret = yield this.mDb.remove(key);
                return Promise.resolve({ result: ret });
            });
        }
        clear() {
            return __awaiter(this, void 0, void 0, function* () {
                let ret;
                ret = yield this.mDb.clear();
                return Promise.resolve({ result: ret });
            });
        }
        iskey(options) {
            return __awaiter(this, void 0, void 0, function* () {
                let ret;
                let key = options.key;
                if (key == null) {
                    return Promise.reject({ result: false, message: 'Must provide key' });
                }
                ret = yield this.mDb.iskey(key);
                return Promise.resolve({ result: ret });
            });
        }
        keys() {
            return __awaiter(this, void 0, void 0, function* () {
                let ret;
                ret = yield this.mDb.keys();
                return Promise.resolve({ keys: ret });
            });
        }
        values() {
            return __awaiter(this, void 0, void 0, function* () {
                let ret;
                ret = yield this.mDb.values();
                return Promise.resolve({ values: ret });
            });
        }
        keysvalues() {
            return __awaiter(this, void 0, void 0, function* () {
                let ret = [];
                let results;
                results = yield this.mDb.keysvalues();
                for (let i = 0; i < results.length; i++) {
                    let res = { key: results[i].name, value: results[i].value };
                    ret.push(res);
                }
                return Promise.resolve({ keysvalues: ret });
            });
        }
        deleteStore(options) {
            return __awaiter(this, void 0, void 0, function* () {
                let dbName = options.database;
                if (dbName == null) {
                    return Promise.reject({
                        result: false,
                        message: 'Must provide a Database Name',
                    });
                }
                dbName = `${options.database}SQLite.db`;
                if (typeof this.mDb === 'undefined' || this.mDb === null)
                    this.mDb = new StorageDatabaseHelper();
                const ret = yield this.mDb.deleteStore(dbName);
                this.mDb = null;
                return Promise.resolve({ result: ret });
            });
        }
    }
    const CapacitorDataStorageSqlite = new CapacitorDataStorageSqliteElectronWeb();
    registerWebPlugin(CapacitorDataStorageSqlite);

    exports.CapacitorDataStorageSqlite = CapacitorDataStorageSqlite;
    exports.CapacitorDataStorageSqliteElectronWeb = CapacitorDataStorageSqliteElectronWeb;

    return exports;

}({}));
//# sourceMappingURL=plugin.js.map
