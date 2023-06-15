define([
  "dojo/_base/declare",
  "jimu/BaseWidgetSetting",
  "dijit/_WidgetsInTemplateMixin",
  'jimu/utils',
  './lib/codemirror',
  './lib/css',
  './lib/javascript',
  './lib/closebrackets',
  './lib/matchbrackets'

],
  function (
    declare,
    BaseWidgetSetting,
    _WidgetsInTemplateMixin,
    utils,
    CodeMirror
  ) {

    return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {

      baseClass: "template",


      postCreate: function () {

        this.inherited(arguments);

        utils.loadStyleLink('codemirrorstyle', this.folderUrl + 'setting/css/codemirror.css');
        utils.loadStyleLink('codemirrortheme', this.folderUrl + 'setting/css/material-darker.css');

      },

      startup: function () {

        this.inherited(arguments);
        this.setConfig(this.config);

        setTimeout(() => {

          this.buildJsonConfigSetter()

        }, 2000);




      },

      buildJsonConfigSetter(){

        var codeMirror = CodeMirror.fromTextArea(this["json-params"], {
          lineNumbers: true,
          mode: 'javascript',
          theme: 'material-darker',
          matchBrackets: true,
          autoCloseBrackets: true
        });

        codeMirror.setValue(JSON.stringify(this.config, undefined, 2))

        this['save-params'].onclick = (e) => {
          this.config = JSON.parse(codeMirror.getValue())
        }

      },

      getConfig: function () {


        if (!this.config) {
          this.config = {};
        }

        return this.config;
      },

      setConfig: function (config) {
        this.config = config || {};
        var self = this;


      }

    });

  });





