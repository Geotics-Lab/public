


class ContextMenu {

    constructor(element, scope, config) {

        this.config = config
        this.scope = scope
        this.contextMenu = null

        this.add(element, scope, config)
    }

    add(element, scope) {



        element.addEventListener("contextmenu", (event) => {

            event.preventDefault();

            try { this.closeMenu() } catch (error) { }

            this.contextMenu = document.createElement('div')

            for (let index = 0; index < this.config.labels.length; index++) {

                const label = this.config.labels[index];

                var option = document.createElement('div')

                option.setAttribute("index", index)
                option.innerHTML = label
                option.classList.add("item")

                this.contextMenu.appendChild(option)

                if (this.config.classes) {
                    option.classList.add(this.config.classes[index])
                }

                option.addEventListener('click', (e) => {

                    this.closeMenu()

                    var idx = e.target.getAttribute('index')
                    var callback = this.config.callbacks[idx];
                    var params = this.config.arguments[idx];

                    callback(...params);

                })

            }

            this.contextMenu.classList.add("context-menu")
            scope.appendChild(this.contextMenu)

            const { clientX: mouseX, clientY: mouseY } = event;
            const { normalizedX, normalizedY } = this._getNormalizedContextMenuPosition(mouseX, mouseY, scope, this.contextMenu);

            this.contextMenu.style.top = `${normalizedY}px`;
            this.contextMenu.style.left = `${normalizedX}px`;

            setTimeout(() => {

                this.contextMenu.classList.add("visible");

                var closeContextMenu = (e) => {
                    console.log('jj')

                    if (!this.contextMenu.contains(e.target)) {

                        try {
                            this.closeMenu()
                            scope.removeEventListener("click", closeContextMenu, false);
                            //document.body.removeAttributeNode( closeContextMenu);
                        } catch (error) {

                        }
                    }

                }

                document.body.addEventListener("click", closeContextMenu);

            });

        });



        /* node.addEventListener("click", (e) => {

            if (e.target.offsetParent != contextMenu) {

                try {
                    contextMenu.classList.remove("visible");
                    scope.removeChild(contextMenu)
                } catch (error) {

                }


            }

        }); */





    }

    closeMenu() {

        this.contextMenu.classList.remove("visible");
        this.scope.removeChild(this.contextMenu)

    }

    openMenu() {

    }


    _getNormalizedContextMenuPosition(mouseX, mouseY, scope, contextMenu) {
        // ? compute what is the mouse position relative to the container element (scope)
        let {
            left: scopeOffsetX,
            top: scopeOffsetY,
        } = scope.getBoundingClientRect();

        scopeOffsetX = scopeOffsetX < 0 ? 0 : scopeOffsetX;
        scopeOffsetY = scopeOffsetY < 0 ? 0 : scopeOffsetY;

        const scopeX = mouseX - scopeOffsetX;
        const scopeY = mouseY - scopeOffsetY;

        // ? check if the element will go out of bounds
        const outOfBoundsOnX =
            scopeX + contextMenu.clientWidth > scope.clientWidth;

        const outOfBoundsOnY =
            scopeY + contextMenu.clientHeight > scope.clientHeight;

        let normalizedX = mouseX;
        let normalizedY = mouseY;

        // ? normalize on X
        if (outOfBoundsOnX) {
            normalizedX =
                scopeOffsetX + scope.clientWidth - contextMenu.clientWidth;
        }

        // ? normalize on Y
        if (outOfBoundsOnY) {
            normalizedY =
                scopeOffsetY + scope.clientHeight - contextMenu.clientHeight;
        }

        return { normalizedX, normalizedY };
    }

}

define(["dojo/_base/declare",
    'jimu/portalUtils',
    "esri/layers/WebTiledLayer",
    "esri/tasks/QueryTask",
    "esri/symbols/SimpleFillSymbol",
    "esri/geometry/jsonUtils",
    "esri/graphic",
    "jimu/BaseWidget",
    "dijit/_WidgetsInTemplateMixin"
],
    function (
        declare,
        portalUtils,
        WebTiledLayer,
        QueryTask,
        SimpleFillSymbol,
        geometryJsonUtils,
        Graphic,
        BaseWidget,
        _WidgetsInTemplateMixin
    ) {
        return declare([BaseWidget, _WidgetsInTemplateMixin], {

            name: "AlteiaConnectMnt",
            baseClass: "jimu-widget-alteia-connect-mnt",

            postCreate: function () {
                this.inherited(arguments);
            },

            startup: function () {

                this.cookies = this._initCookie()
                this.projects = []
                this.selection = {}
                this.layers = {}
                this.api = this.API(this)

                this._init()

            },


            API: (context) => {

             

                return {
                    
       


                    _getWebTiledLayer_: function (url, label) {
                        return new WebTiledLayer(url, { "copyright": '', "id": label })
                    },

                    _addWebTiledLayerToMap_: function (webTiledLayer) {
                        return context.map.addLayer(webTiledLayer)
                    },

                    _removeWebTiledLayerFromMap_: function (webTiledLayer) {
                        return context.map.removeLayer(webTiledLayer)
                    },

                    _moveLayerToBackground_: function (layer) {
                        return context.map.reorderLayer(layer, context.config.backgroundIndex);
                    },

                    _getSimpleFillSymbol: function () {
                        return new SimpleFillSymbol({
                            "type": "esriSFS", "style": "esriSFSSolid", "color": [30, 144, 255, 80], "outline": {
                                "type": "esriSLS", "style": "esriSLSSolid", "color": [30, 144, 255, 255], "width": 2
                            }
                        })
                    },

                    _loadGeometryFromJson: function (json) {
                        return geometryJsonUtils.fromJson(json);
                    },

                    _zoomOnExtent: function (geometry) {
                        return context.map.setExtent(geometry.getExtent());
                    },

                    _hasMapIntersection: function (geometry) {
                        return context.map.extent.intersects(geometry)
                    },

                    _addPolygonToMap: function (geometry) {
                        return context.map.graphics.add(new Graphic(geometry, this._getSimpleFillSymbol()))
                    },

                    _removePolygonToMap: function (graphic) {
                        return context.map.graphics.remove(graphic)
                    },

                    _onMapExtentChange: function (callback) {
                        return context.map.on("extent-change", (e) => { callback() })
                    },

                    _queryAllFeatures: function (url, callback) {
                        return new QueryTask(url).execute({ toJson: () => { return { spatialRelationship: "esriSpatialRelIntersects", returnGeometry: true, outFields: "*", where: "1=1", token: portalUtils.getPortal(context.appConfig.portalUrl).credential.token } } }, (e) => { callback(e) })
                    },

                    _dispatchEvent(name, e = null) {
                        this.events.dispatchEvent(new CustomEvent(name, { detail: e }))

                    }


                }

            },


            async _init() {


                var data = await this.getData(this.config.alteiaConnectService)

                this.UI_Build(data)
                this.UI_SortByDate()
                this.UI_LoadCookies()


                var onMapExtentChange = (e) => {

                    if (this["extent-filter"].checked) {
                        this.UI_FilterByExtent()
                    }


                }


                var onSwitchExtentChange = (e) => {

                    switch (this["extent-filter"].checked) {

                        case true:

                            this.UI_FilterByExtent()

                            break;

                        case false:

                            var collection = document.getElementsByClassName("tms-mission")

                            for (let index = 0; index < collection.length; index++) {
                                const element = collection[index];
                                element.style.display = "flex "

                            }

                            break;
                    }



                    this.cookies.settings.enableExtentfilter = this["extent-filter"].checked
                    this._setCookie("alteia-connect", this.cookies, 365)


                }

                //this.api.events.addEventListener('map-extent-change', onMapExtentChange)
                this.api._onMapExtentChange(onMapExtentChange)
                this["extent-filter"].addEventListener('change', onSwitchExtentChange)


            },


            UI_Build(data={}) {

                i = 0

                for (const project in data) {

                    this.layers[project] = {}

                    var projectContainer = this._createNode({
                        tag: "div",
                        class: "expand-container",
                        parent: this['extent-list']
                    })

                    var projectTitle = this._createNode({
                        tag: "h2",
                        innerHTML: project,
                        class: "collapse-controler",
                        parent: projectContainer
                    })

                    var projectExpand = this._createNode({
                        tag: "div",
                        class: "collapse-content",
                        parent: projectContainer
                    })

                    var switchContainer = this._createNode({
                        tag: "div",
                        class: "switch-container",
                        parent: projectExpand
                    })

                    var switchLabel = this._createNode({
                        tag: "label",
                        class: "switch",
                        parent: switchContainer
                    })

                    var switchInput = this._createNode({
                        tag: "input",
                        class: "switch",
                        project: project,
                        index: i,
                        type: "checkbox",
                        parent: switchLabel
                    })

                    var switchRadio = this._createNode({
                        tag: "label",
                        class: "slider round",
                        parent: switchLabel
                    })

                    var switchInfo = this._createNode({
                        tag: "span",
                        innerHTML: "Show proportional timeline",
                        parent: switchContainer
                    })

                    var ajustColorimetry = this._createNode({
                        tag: "span",
                        class: "colorimetry-ajuster",
                        'project-refer': project,
                        parent: projectExpand
                    })

                    var ajustColorimetryLabel = this._createNode({
                        tag: "span",
                        class: "color-label",
                        innerHTML: "Ajust all layers colorimetry",
                        parent: ajustColorimetry
                    })

                    var ajustColorimetryLabelMin = this._createNode({
                        tag: "span",
                        class: "color-label-min",
                        innerHTML: "min",
                        parent: ajustColorimetry
                    })

                    var ajustColorimetryMinValue = this._createNode({
                        tag: "input",
                        class: "color-value-min",
                        type: 'number',
                        parent: ajustColorimetry
                    })

                    var ajustColorimetryLabelMax = this._createNode({
                        tag: "span",
                        class: "color-label-max",
                        innerHTML: "max",
                        parent: ajustColorimetry
                    })

                    var ajustColorimetryMaxValue = this._createNode({
                        tag: "input",
                        class: "color-value-max",
                        type: 'number',
                        parent: ajustColorimetry
                    })



                    if (Object.keys(data).length > 1) {

                        projectTitle.onclick = function (params) {

                            switch (this.classList.contains('active')) {

                                case true:
                                    this.nextElementSibling.classList.remove("expended")
                                    this.classList.remove("active")
                                    break;

                                case false:
                                    this.nextElementSibling.classList.add("expended")
                                    this.classList.add("active")
                                    break;
                            }
                        }
                    }
                    else {
                        projectTitle.classList.add("active")
                        projectTitle.nextElementSibling.classList.add("expended")
                    }


                    for (const mission in data[project]) {

                        var uuidv4 = this._getUuidv4()
                        var element = data[project][mission];
                        var missionField = this.config.mapping.mission
                        var projectField = this.config.mapping.project
                        var urlField = this.config.mapping.url
                        var zMinField = this.config.mapping.z_min
                        var zMaxField = this.config.mapping.z_max
                        var isColorMap = (!this._isEmptyString(element.attributes[zMinField]) && !this._isEmptyString(element.attributes[zMaxField]))

                        var missionLi = this._createNode({
                            tag: "li",
                            innerHTML: "<span class='ellipsys' > " + element.attributes[missionField] + "</span>",
                            class: "tms-mission",
                            'is-color-map': isColorMap,
                            url: element.attributes[urlField],
                            mission: element.attributes[missionField],
                            uuid: uuidv4,
                            attributes: JSON.stringify(element.attributes),
                            project: element.attributes[projectField],
                            geometry: JSON.stringify(element.geometry),
                            parent: projectExpand
                        })



                        var setExtent = (jsonGeometry) => {
                            let geometry = this.api._loadGeometryFromJson(jsonGeometry)
                            this.api._zoomOnExtent(geometry)
                        }
                        var resetColorimetry = (min, max, project, uuid) => {

                            this.reloadLayerColorimetry(min, max, project, uuid)

                        }
                        var setColorimetry = (minInit, maxInit, project, uuid) => {

                            let min = prompt("Please enter the minimum z value", minInit);
                            let max = prompt("Please enter the maximum z value", maxInit);

                            if ((min != null) && (max != null)) this.reloadLayerColorimetry(min, max, project, uuid)

                        }

                        var getAlteiaLayerId = (url) => {
                            var id = url.split('/')[5]
                            navigator.clipboard.writeText(id);
                            alert("Copied the Alteia layer id : " + id);
                        }

                        var getAlteiaBaseUrl = (url) => {
                            var baseUrl = url.split('?')[0]
                            navigator.clipboard.writeText(baseUrl);
                            alert("Copied the Alteia TMS URL : " + baseUrl);
                        }



                        this.layers[project][uuidv4] = {
                            attributes: element.attributes,
                            web_tiled_layer: null
                        }


                        if (!this.projects.includes(element.attributes[projectField])) {
                            this.projects.push(element.attributes[projectField])
                        }


                        switch (isColorMap) {

                            case true:

                                missionLi.setAttribute('z-min', element.attributes[zMinField])
                                missionLi.setAttribute('z-max', element.attributes[zMaxField])

                                var contextMenu = new ContextMenu(missionLi, this['alteia-connect'], {
                                    classes: ["zoom-on-ico", "custom-colorimetry", "reset-colorimetry", "copy-alteia-id-ico", "copy-tms-url-ico"],
                                    labels: ["Zoom on", "Set custom colorimetry", "Reset colorimetry", "Copy Alteia ID", "Copy TMS URL"],
                                    callbacks: [setExtent, setColorimetry, resetColorimetry, getAlteiaLayerId, getAlteiaBaseUrl],
                                    arguments: [
                                        [element.geometry],
                                        [element.attributes[this.config.mapping.z_min], element.attributes[this.config.mapping.z_max], project, uuidv4],
                                        [element.attributes[this.config.mapping.z_min], element.attributes[this.config.mapping.z_max], project, uuidv4],
                                        [element.attributes[this.config.mapping.url]],
                                        [element.attributes[this.config.mapping.url]]
                                    ]
                                })

                                break;

                            case false:

                                var contextMenu = new ContextMenu(missionLi, this['alteia-connect'], {
                                    classes: ["zoom-on-ico", "copy-alteia-id-ico", "copy-tms-url-ico"],
                                    labels: ["Zoom on", "Copy Alteia ID", "Copy TMS URL"],
                                    callbacks: [setExtent, getAlteiaLayerId, getAlteiaBaseUrl],
                                    arguments: [
                                        [element.geometry],
                                        [element.attributes[this.config.mapping.url]],
                                        [element.attributes[this.config.mapping.url]]
                                    ]
                                })

                                break;
                        }




                        missionLi.onclick = (e) => {

                            var target = e.target.closest('.tms-mission');
                            var targetColorimetryAdjuster = target.parentElement.querySelectorAll('.colorimetry-ajuster')[0];
                            var url = target.getAttribute('url').replace("{z}", "{level}").replace("{x}", "{col}").replace("{y}", "{row}")
                            var fid = target.getAttribute('uuid')
                            var project = target.getAttribute('project')
                            var mission = target.getAttribute('mission')
                            var isColorMap = target.getAttribute('is-color-map')
                            var isActive = target.classList.contains("active")
                            var layerLabel = `${project} - ${mission}`



                            switch (isActive) {

                                case true:

                                    target.classList.remove('active')

                                    this.api._removeWebTiledLayerFromMap_(this.layers[project][fid].web_tiled_layer)

                                    this.selection[project].customColorAllowed = this._arrayRemoveByIndex(this.selection[project].customColorAllowed, this.selection[project].ids.indexOf(fid))
                                    this.selection[project].ids = this._arrayRemoveByValue(this.selection[project].ids, fid)

                                    var uniformizeColorAuthorized = (this.selection[project].customColorAllowed.includes(false) == false) && (this.selection[project].customColorAllowed.length > 0)


                                    switch (uniformizeColorAuthorized) {
                                        case true:
                                            targetColorimetryAdjuster.classList.add('active')
                                            break;

                                        case false:
                                            targetColorimetryAdjuster.classList.remove('active')
                                            break;
                                    }


                                    break;



                                case false:

                                    target.classList.add('active')

                                    if (!Object.hasOwnProperty.call(this.selection, project)) this.selection[project] = { ids: [], customColorAllowed: [] }

                                    this.selection[project].ids.push(fid)
                                    this.selection[project].customColorAllowed.push(JSON.parse(isColorMap))

                                    var uniformizeColorAuthorized = (this.selection[project].customColorAllowed.includes(false) == false) && (this.selection[project].customColorAllowed.length > 0)


                                    switch (uniformizeColorAuthorized) {
                                        case true:
                                            targetColorimetryAdjuster.classList.add('active')
                                            break;

                                        case false:
                                            targetColorimetryAdjuster.classList.remove('active')
                                            break;
                                    }


                                    this.layers[project][fid].web_tiled_layer = this.api._getWebTiledLayer_(url, layerLabel);
                                    this.api._addWebTiledLayerToMap_(this.layers[project][fid].web_tiled_layer)

                                    if (this.config.moveImageryToBackgroung) {

                                        this.api._moveLayerToBackground_(this.layers[project][fid].web_tiled_layer)

                                    }

                                    break;
                            }

                            var elevation = this.getMinMaxElevation(project)

                            targetColorimetryAdjuster.setAttribute('min', elevation.min)
                            targetColorimetryAdjuster.setAttribute('max', elevation.max)
                            targetColorimetryAdjuster.querySelector(".color-value-min").value = Math.round(elevation.min)
                            targetColorimetryAdjuster.querySelector(".color-value-max").value = Math.round(elevation.max)



                        }


                        missionLi.onmouseover = (e) => {

                            var target = e.target.closest('.tms-mission');
                            var mission = target.getAttribute('mission')
                            var project = target.getAttribute('project')
                            var feature = data[project][mission]

                            this.extentGraphic = this.api._addPolygonToMap(feature.geometry)



                        }
                        missionLi.onmouseout = (e) => {

                            this.api._removePolygonToMap(this.extentGraphic)



                        }

                    }

                    switchInput.onchange = (e) => {

                        var project = e.target.getAttribute("project")

                        switch (e.target.checked) {
                            case true:
                                this.UI_ShowTimeLine(project)
                                break;

                            case false:
                                this.UI_HideTimeLine(project)
                                break;
                        }
                    }

                    ajustColorimetry.onclick = (e) => {

                        if (e.target.classList.contains("color-value-min") || e.target.classList.contains("color-value-max")) {
                            return
                        }

                        var project = e.target.closest('.colorimetry-ajuster').getAttribute('project-refer');
                        var min = e.target.closest('.colorimetry-ajuster').querySelector('.color-value-min').value
                        var max = e.target.closest('.colorimetry-ajuster').querySelector('.color-value-max').value
                        var layerIds = this.selection[project].ids

                        layerIds.forEach(id => {
                            this.reloadLayerColorimetry(min, max, project, id)
                        });

                    }
                    i++
                }



            },

            UI_SortByDate() {


                for (let index = 0; index < this.projects.length; index++) {

                    const project = this.projects[index];
                    var collection = document.querySelectorAll(`.tms-mission[project="${project}"]`)
                    var sorter = []

                    for (let index = 0; index < collection.length; index++) {

                        const element = collection[index];
                        var attributes = JSON.parse(element.getAttribute('attributes'))
                        var dateField = this.config.mapping.date
                        var date = new Date(attributes[dateField]);

                        if (this._isValidDate(date) == false) {
                            var date = Date.parse(attributes[dateField])
                        }

                        sorter.push({
                            index: index,
                            date: date
                        })

                        var dateElement = this._createNode({
                            tag: "span",
                            innerHTML: date.toDateString(),
                            class: "date-badge",
                            parent: element
                        })


                    }

                    ascSortedList = sorter.sort(function (a, b) {
                        var c = new Date(a.date);
                        var d = new Date(b.date);
                        return c - d;
                    });

                    descSortedList = ascSortedList.reverse()



                    for (let index = 0; index < descSortedList.length; index++) {
                        const element = descSortedList[index];
                        var target = collection[element.index]

                        target.style.order = index

                        if (index == 0) {

                            var lastProjectUpdateBadge = this._createNode({
                                tag: "span",
                                innerHTML: new Date(element.date).toDateString(),
                                class: "project-date-badge",
                                parent: target.parentElement.previousElementSibling
                            })


                        }

                    }
                }






            },

            UI_FilterByExtent() {

                for (let index = 0; index < this.projects.length; index++) {

                    const project = this.projects[index];
                    var collection = document.querySelectorAll(`.tms-mission[project="${project}"]`)


                    for (let index = 0; index < collection.length; index++) {

                        const element = collection[index];
                        var relatedGeometry = this.api._loadGeometryFromJson(JSON.parse(element.getAttribute('geometry')))
                        var isIntersecting = this.api._hasMapIntersection(relatedGeometry)

                        switch (isIntersecting) {
                            case true:
                                element.style.display = "flex "
                                break;

                            case false:
                                element.style.display = "none "
                                break;
                        }

                    }
                }

            },

            UI_ShowTimeLine(project="") {

                var sorter = []
                var collection = document.querySelectorAll(`.tms-mission[project="${project}"]`)

                for (let index = 0; index < collection.length; index++) {

                    const element = collection[index];
                    var attributes = JSON.parse(element.getAttribute('attributes'))
                    var dateField = this.config.mapping.date

                    var date = new Date(attributes[dateField]);
                    sorter.push({
                        index: index,
                        date: date
                    })


                }

                ascSortedList = sorter.sort(function (a, b) {
                    var c = new Date(a.date);
                    var d = new Date(b.date);
                    return c - d;
                });

                descSortedList = ascSortedList.reverse()



                for (let index = 0; index < descSortedList.length; index++) {
                    const element = descSortedList[index];
                    var target = collection[element.index]

                    if (index > 1) {

                        var weekDiff = this._getWeeksDiff(descSortedList[index - 1].date, descSortedList[index].date)
                        var daysDiff = this._getDaysDiff(descSortedList[index - 1].date, descSortedList[index].date)

                        //target.style.marginTop = weekDiff * 10 + "px"
                        target.style.marginTop = daysDiff * 10 + "px"
                    }

                }




            },

            UI_HideTimeLine(project="") {

                var collection = document.querySelectorAll(`.tms-mission[project="${project}"]`)

                for (let index = 0; index < collection.length; index++) {
                    var target = collection[index]

                    target.style.marginTop = 5 + "px"


                }




            },

            UI_LoadCookies(){

                if (this.cookies.settings.enableExtentfilter == true) {

                    this["extent-filter"].checked = true
                    this.UI_FilterByExtent()

                }

            },

            getData(serviceUrl="") {


                return new Promise((resolve, fail) => {


                    this.api._queryAllFeatures(serviceUrl, (featureSet) => {

                        var data = {}

                        featureSet.features.forEach(element => {

                            var missionField = this.config.mapping.mission
                            var projectField = this.config.mapping.project


                            switch (element.attributes[projectField] in data) {

                                case true:
                                    data[element.attributes[projectField]][element.attributes[missionField]] = element
                                    break;

                                case false:
                                    data[element.attributes[projectField]] = {}
                                    break;
                            }


                        });

                        resolve(data)
                    })

                })

            },

            getMinMaxElevation(project="") {

                var elevations = []
                var zMinField = this.config.mapping.z_min
                var zMaxField = this.config.mapping.z_max

                this.selection[project].ids.forEach(id => {

                    var retrievedAttributes = this.layers[project][id].attributes
                    elevations.push(parseFloat(retrievedAttributes[zMinField]))
                    elevations.push(parseFloat(retrievedAttributes[zMaxField]))

                });

                output = {
                    min: Math.min(...elevations),
                    max: Math.max(...elevations)
                }


                return output


            },

            reloadLayerColorimetry(min=0, max=0, project="", layerid="") {

                if ((min != undefined) && (max != undefined)) {

                    console.log(min, max, project, layerid)

                    var layer = this.layers[project][layerid].web_tiled_layer
                    const queryString = `?${layer.url.split("?")[1]}`;
                    const urlParams = new URLSearchParams(queryString);

                    urlParams.set('min', min);
                    urlParams.set('max', max);

                    var updatedUrl = `${layer.url.split("?")[0]}?${urlParams.toString()}`;
                    var layerLabel = `${this.layers[project][layerid].web_tiled_layer.id}  [min=${min} max=${max}]`

                    this.api._removeWebTiledLayerFromMap_(layer)
                    this.layers[project][layerid].web_tiled_layer = this.api._getWebTiledLayer_(updatedUrl, layerLabel);
                    this.api._addWebTiledLayerToMap_(this.layers[project][layerid].web_tiled_layer)
                }

            },

            _createNode(attributes={}) {

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

            _arrayRemoveByIndex(array=[], index=0) {
                array.splice(index, 1)
                return array
            },

            _arrayRemoveByValue(array=[], value) {
                array = array.filter(e => e !== value)
                return array
            },

            _getUuidv4() {
                return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
                );
            },

            _getWeeksDiff(startDate, endDate) {
                const msInWeek = 1000 * 60 * 60 * 24 * 7;
                return Math.round(Math.abs(endDate - startDate) / msInWeek);
            },

            _getDaysDiff(startDate, endDate) {
                const msInWeek = 1000 * 60 * 60 * 24;
                return Math.round(Math.abs(endDate - startDate) / msInWeek);
            },

            _isValidDate(d) {
                return d instanceof Date && !isNaN(d);
            },

            _isEmptyString(s="") {
                if (!s) {
                    return true
                }
                else {
                    return false
                }
            },

            _dispatchEvent(name, e = null) {
                if (!this.events) this.events = document.createElement("div")
                return this.events.dispatchEvent(new CustomEvent(name, { detail: e }))
            },

            _initCookie() {

                var output
                var name = "alteia-connect"

                var template = {
                    settings: {
                        enableExtentfilter: false
                    }
                }

                output = this._getCookie(name)

                if (typeof output !== 'object') {
                    this._setCookie(name, template, 365)
                    output = this._getCookie(name)
                }


                return output

            },

            _setCookie(cname, JSONvalue, exdays) {
                const d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                let expires = "expires=" + d.toUTCString();
                document.cookie = cname + "=" + JSON.stringify(JSONvalue) + ";" + expires + ";path=/";
            },

            _getCookie(cname) {
                let name = cname + "=";
                let decodedCookie = decodeURIComponent(document.cookie);
                let ca = decodedCookie.split(';');
                for (let i = 0; i < ca.length; i++) {
                    let c = ca[i];
                    while (c.charAt(0) == ' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {
                        return JSON.parse(c.substring(name.length, c.length));
                    }
                }
                return "";
            }


        });

    });