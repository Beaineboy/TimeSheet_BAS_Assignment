sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/Device",
    "sap/ui/core/ResizeHandler"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Device,ResizeHandler) {
        "use strict";
        var oProductsModel
        var count;
        return Controller.extend("com.ibspl.shppingcart.controller.Home", {
            onInit: function () {
                debugger

                 // Get the DOM reference of Toolbar
            this.oToolbar = this.getView().byId("toolbar").$();

            // Attach scroll event listener to window
            $(window).on("scroll", this.handleScroll.bind(this));

                 oProductsModel = this.getOwnerComponent().getModel("productmodel");
                 this.getView().setModel(oProductsModel, "products");
                 this.getView().setModel(oProductsModel, "products2");
                count = this.getView().getModel("products2").getData().PrCount
                
                 this.handleNavigate();
            },
            
            onResize: function() {
                debugger
                // Adjust scroll position on resize
                var sectionId = this.getView().getContent().filter(function(section) {
                    return section.$().offset().top > 0; // Find the section currently on viewport
                })[0].getId();
                this.scrollToSection(sectionId);
            },

            handleScroll: function() {
                debugger
                var scrollTop = $(window).scrollTop();
                var toolbarTop = this.oToolbar.offset().top;
    
                // Check if the toolbar is above the viewport
                if (toolbarTop < scrollTop) {
                    // Make toolbar sticky
                    this.oToolbar.addClass("stickyToolbar");
                } else {
                    // Remove sticky behavior
                    this.oToolbar.removeClass("stickyToolbar");
                }
            },
    
            

            // scrollToSection2: function(event) {
            //     debugger
            //     var sectionId = event.getSource().data("section");
            //     this.scrollToSection(sectionId);
            // },
    
            // scrollToSection: function(sectionId) {
            //     debugger
            //     var oPage = this.getView().byId("page");
            //     var oSection = this.getView().byId(sectionId);
            //     if (oSection) {
            //         oPage.scrollToElement(oSection, 1000); // Smooth scroll to section
            //     }
            // },

            scrollToSection2: function(sectionId) {
                var oPage = this.getView().byId("page");
                var oSection = this.getView().byId(sectionId);
                if (oSection) {
                    oPage.scrollToElement(oSection, 1000); // Smooth scroll to section
                }
            },
            

            handleNavigate:function(){
                // debugger
                var that = this;
                setTimeout(function() { that.byId("carImg").next(); }, 5000);   
            },

            autcaroload:function(){
                debugger
                var index = this.byId("carImg").getPages.length
                this.handleNavigate();
            },

            handleUploadPress: function (oEvent) {
                debugger
                var that = this
                var TableId = that.getView().byId("Qalification")
                 index =  oEvent.getSource().getBindingContext("NavtoQuali").sPath.split("/")[2]
                // var dyn = that.dynacmicFile(oEvent);
                var fileName = oEvent.getSource().oFileUpload.files[0].name;

                if (!fileName) {
                    MessageBox.error("Choose a file first");
                    return;
                    }
                    
                    TableId.getItems()[index].getCells()[6].setText(fileName);
                    
                    // TableId.getItems()[index].getCells()[5].setValue("");
                    // return;

                    var oFileUploader = oEvent.getSource().oFileUpload.files[0];
            
                // var file = TableId.getItems()[0].getCells()[5].oFileUpload.files[0];
                fileName = oFileUploader.name;
                fileType = oFileUploader.type;
                // var fileContent = 'data:' + file.type + ';base64,';
                var reader = new FileReader();

                reader.onload = function (e) {
                   

                    var obj = {}
                    var results = []
                    // f = e.currentTarget.result.split(",")[1];
                    basePlusASCII = e.currentTarget.result.split(",")[1]
                    convert = btoa(basePlusASCII);
                    obj.FileName = fileName;
                    obj.MimeType = fileType;
                    obj.content = convert;
                    // return obj;
                    results.push(obj);
                    obj = {}

                    oDataModel.create("/InitAttachSet", results, {
                        PUT: "POST",
                        async: true,
                        success: function (Data, oResponse) {
                           
                            BusyIndicator.hide();
                            MessageToast.show("Draft Saved Successfully")
                        },
                        error: function (Error) {
                           
                            BusyIndicator.hide();
                            MessageBox.error(JSON.parse(Error.responseText).error.message.value)
                        }
                    })
                    TableId.getItems()[index].getCells()[5].setValue("");

                };
                //reader.readAsDataURL(oFileUploader);
                reader.readAsDataURL(oFileUploader);  
            },

            allow:function(){
                debugger;
                var fragment = [{
                    "a":[{}],
                    "b":[{"c":[]}]
                }]
            }
        });
    });
