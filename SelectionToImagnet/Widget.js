
define([
  "dojo/_base/declare",
  "esri/geometry/webMercatorUtils",
  'jimu/LayerInfos/LayerInfos',
  "esri/graphic",
  "esri/layers/GraphicsLayer",
  "jimu/BaseWidget",
  "dijit/_WidgetsInTemplateMixin",
  'dojo/on'
],
  function (
    declare,
    webMercatorUtils,
    LayerInfos,
    Graphic,
    GraphicsLayer,
    BaseWidget,
    _WidgetsInTemplateMixin,
    on
  ) {
    return declare([BaseWidget, _WidgetsInTemplateMixin], {

      name: "SelectionToImagnet",
      baseClass: "jimu-selection-to-imagenet",

      postCreate: function () {
        this.inherited(arguments);
      },

      onOpen() {
        this.pauseEvent = false
      },

      onClose() {
        this.pauseEvent = true
        this.hideImajnetButton()
      },

      startup: function () {

        this.api = this.API(this)
        this.pauseEvent = false
        this.layerInfos = this.api._getMapLayers()
        this.featureLayers = []
        this.eventsManager = document.createElement('div')
        this.highlightGraphicsLayer = this.map.addLayer(new GraphicsLayer())
        this.map.reorderLayer(this.highlightGraphicsLayer, 100000)


        this.config.url.forEach(url => {
          this.featureLayers.push(this.getLayerByUrl(url))
        });

        console.log(this.map.container)

        this._init()


      },

      _init() {

        this.addImajnetButton()
        this.addModalIframe()
        this.api._onMapClick(this.onMapClick)
        //this.api._onFeatureLayerOver(this.onFeatureLayerOver)
        //this.api._onFeatureLayerOut(this.onFeatureLayerOut)

        this.featureLayers.forEach(featureLayer => {
          featureLayer.on("mouse-over", (evt) => {

            console.log(evt)
            this.highlightGraphicsLayer.clear();
            var highlightGraphic = new Graphic({
              geometry: evt.graphic.geometry,
              spatialReference: this.map.spatialReference,
              symbol: this._getSymbol(featureLayer.geometryType, [0, 255, 255, 50], [0, 255, 255, 255], 2)
            })
  
            this.highlightGraphicsLayer.add(highlightGraphic);
  
          });
        });

        this.highlightGraphicsLayer.on("mouse-out", () => {
          console.log("clear")
          this.highlightGraphicsLayer.clear();
        });

  
      },


      API: (context) => {

        return {

          _pointToLngLat: function (geometry) {
            return webMercatorUtils.xyToLngLat(geometry.x, geometry.y);

          },
          _getMapLayers: function () {
            return LayerInfos.getInstanceSync()._layerInfos;
          },
          _onMapClick: function (callback) {
            return context.map.on("click", (e) => { callback(context, e) })
          },
          _onFeatureLayerOver: function (callback) {
            return context.featureLayer.on("mouse-over", (e) => { callback(context, e) });
          },
          _onFeatureLayerOut: function (callback) {
            return context.featureLayer.on("mouse-out", (e) => { callback(context, e) });
          }
        }

      },

      onFeatureLayerOver(self, evt) {

        console.info(evt)
        self._dispatchEvent("feature-hover", evt)

      },

      onFeatureLayerOut(self, evt) {

        console.info(evt)
        self._dispatchEvent("feature-out", evt)

      },

      onMapClick(self, evt) {

        if (self.pauseEvent) return


        if (feature = self._clickEventIsTargetFeature(evt)) {

          var [lng, lat] = self.api._pointToLngLat(feature.geometry)

          self.imajnetButton.setAttribute("href", self._getImajnetReverseGeocoding(lng, lat))

          self.showImajnetButton()

        }
        else {
          self.hideImajnetButton()
        }

      },

      addImajnetButton() {

        this.imajnetButton = this._createNode({
          tag: "a",
          class: "imajnet-button",
          innerHTML: "<span class='imajnet-logo'></span><span>View in Imajnet</span>",
          style: this.getCssPosition(this.config['button-position']),
          target: "_blank",
          parent: this.map.container
        })

        this.imajnetButton.onclick = (e) => {
          console.log(e.target.getAttribute('url'))

          //this.showModalIframe()
          //this.updateIframeUrl(e.target.getAttribute('url'))
          //this.openUrlInNewTab(e.target.getAttribute('url'))


        }

      




      },

      getCssPosition(positionObject) {
        var output = ""

        for (const property in positionObject) {
          var value = positionObject[property];
          output += `${property}:${value};`
        }

        return output
      },

      addModalIframe() {


        this.modal = this._createNode({
          tag: "div",
          class: "modal",
          parent: document.body
        })

        this.modalContent = this._createNode({
          tag: "div",
          class: "modal-content",
          parent: this.modal
        })

        this.close = this._createNode({
          tag: "span",
          class: "close",
          innerHTML: "&times;",
          parent: this.modalContent
        })

        this.iframe = this._createNode({
          tag: "iframe",
          class: "modal-content",
          parent: this.modalContent
        })



        this.close.onclick = function () {
          this.hideModalIframe()
        }

        window.onclick = function (event) {
          if (event.target == this.modal) {
            this.hideModalIframe()
          }
        }

      },

      showModalIframe() {
        this.modal.style.display = "block";
      },

      hideModalIframe() {
        this.modal.style.display = "none";
      },

      showImajnetButton() {

        this.imajnetButton.classList.add("visible")
        console.log(this.imajnetButton)

      },
      hideImajnetButton() {

        this.imajnetButton.classList.remove("visible")

      },
      updateIframeUrl(url) {
        this.iframe.setAttribute('src', url)
        setTimeout(() => {
          this.iframe.contentWindow.location.reload();
        }, 500);

      },

      getLayerByUrl(url) {

        var output = null

        this.layerInfos.forEach(b => {

          if (url == b.layerObject.url) {

            output = this.map.getLayer(b.layerObject.id)

            return

          }

        });


        console.log(output)


        return output

      },

      openUrlInNewTab(url) {
        window.open(url, '_blank').focus();
      },

      _getSymbol(esriGeometryType, fillColor, outlineColor, outlineSize = 1, outlineStyle = "esriSLSSolid") {

        output = null

        switch (esriGeometryType) {
          case 'esriGeometryPoint':
            output = {
              "color": fillColor,
              "size": 32,
              "angle": -30,
              "xoffset": 0,
              "yoffset": 0,
              "type": "esriSMS",
              "style": "esriSMSCircle",
              "outline": {
                "color": outlineColor,
                "width": outlineSize,
                "type": "esriSLS",
                "style": outlineStyle
              }
            }
            break
          case 'esriGeometryMultiPoint':
            output = {
              "color": fillColor,
              "size": 32,
              "angle": -30,
              "xoffset": 0,
              "yoffset": 0,
              "type": "esriSMS",
              "style": "esriSMSCircle",
              "outline": {
                "color": outlineColor,
                "width": outlineSize,
                "type": "esriSLS",
                "style": outlineStyle
              }
            }
            break
          case 'esriGeometryPolyline':
            output = {
              "color": [0, 0, 0, 0],
              "outline": {
                "color": outlineColor,
                "width": outlineSize,
                "type": "esriSLS",
                "style": outlineStyle
              },
              "type": "esriSFS",
              "style": "esriSFSSolid"
            }
            break
          case 'esriGeometryPolygon':
            output = {
              "color": fillColor,
              "outline": {
                "color": outlineColor,
                "width": outlineSize,
                "type": "esriSLS",
                "style": outlineStyle
              },
              "type": "esriSFS", "style": "esriSFSSolid"
            }
            break

        }

        return output
      },

      _clickEventIsTargetFeature(evt) {
        try { return { attributes: evt.graphic.attributes, geometry: evt.graphic.geometry } } catch (error) { return false }
      },

      _getImajnetReverseGeocoding(lng = 0, lat = 0) {
        return `https://gecko.imajnet.net/#map=OSM;zoom=10;loc=${lat},${lng}`
      },

      _createNode(attributes = {}) {

        var output = document.createElement(attributes.tag)

        for (const property in attributes) {

          const value = attributes[property];

          switch (property) {

            case "parent":
              value.appendChild(output)
              break;

            case "innerHTML":
              output.innerHTML = value
              break;

            case "tag":
              break;

            default:
              output.setAttribute(property, value)
              break;

          }

        }

        return output


      },

      _dispatchEvent(name, e = null) {
        if (!this.eventsManager) this.eventsManager = document.createElement("div")
        return this.eventsManager.dispatchEvent(new CustomEvent(name, { detail: e }))
      },

      _GET: function (path) {

        return new Promise((resolve, reject) => {

          var xmlHttp = new XMLHttpRequest();
          xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
              resolve(xmlHttp.responseText);
          }
          xmlHttp.open("GET", path, true); // true for asynchronous 
          xmlHttp.send(null);

        })
      }

    });

  });

