sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageItem",
    "sap/m/MessagePopover"
],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageItem, MessagePopover) {
        "use strict";

        return Controller.extend("SA.SmartAssignment.controller.App", {
            onInit: function () {
                debugger;
                var that = this;
                var odT = this.getView().getModel();
                var myJSON = new JSONModel();
                this.getOwnerComponent().setModel(myJSON, "myMod");
                odT.read("/ManagementOpeartionSet", {
                    success: function (oDt22) {

                        this.getOwnerComponent().getModel("myMod").setProperty("/ManagData", oDt22);
                        var EMPdata = this.getOwnerComponent().getModel("myMod").getProperty("/ManagData");
                        var sConition = EMPdata.results.some((item) => {
                            return item.EmpSalary < 25000;
                        });
                        if (sConition) {
                            var oErrorBtn = new sap.m.Button({
                                id: "errorButton",
                                icon: "sap-icon://message-error",
                                type: "Reject"
                            });
                            oErrorBtn.attachPress(function (oEventPress) {
                                that.errorMessageHandle(oEventPress, EMPdata.results);
                            });
                            var footer = this.getView().byId("idtoolbar");
                            oErrorBtn.placeAt(footer, 0);

                            // this.errorMessageHandle(EMPdata.results);
                        }
                    }.bind(this),

                    error: function (oError) {
                        console.log("error");
                        var oErrorBtn = new sap.m.Button({
                            id: "errorButton",
                            icon: "sap-icon://message-error",
                            type: "Reject"
                        });
                        oErrorBtn.attachPress(function (oEventPress) {
                            that.errorMessageHandle(oEventPress, null, oError);
                        });
                        var footer = this.getView().byId("idtoolbar");
                        oErrorBtn.placeAt(footer, 0);
                    }.bind(this)

                })

                odT.read("/TabSet", {
                    success: function (oDt22) {

                        this.getOwnerComponent().getModel("myMod").setProperty("/EmpData", oDt22);

                    }.bind(this),

                    error: function () {
                        console.log("error");
                    }.bind(this)

                })

                // var myData1  = this.getView().getModel().getProperty("/TabSet");





            },
            errorMessageHandle: function (oEventPress, oValues, obackendError) {
                var aLessSalary = [];
                // for(let i = 0; i< oValues; i++){
                // if(oValues[i].EmpSalary < 25000){
                // aLessSalary.push(oValues[i]);
                // }
                //             }
                var errorModel = new sap.ui.model.json.JSONModel();
                this.getOwnerComponent().setModel(errorModel, "errorModel");
                if (obackendError) {
                    var oMessageTemplate = new MessageItem({
                        type: 'Error',
                        title: 'Its Backend Error',
                        description: 'Please check with backend person',
                        subtitle: 'Error status',
                        counter: 1
                    });
                    var oMessagePopover = new MessagePopover({
                        items: oMessageTemplate,
                        activeTitlePress: function () {
                            sap.m.MessageToast.show('Active title is pressed');
                        }
                    });
                    var errMdl = this.getView().getModel("errorModel")
                    errMdl.setData(aMockMessages);
                    oMessagePopover.setModel(errMdl);

                    oMessagePopover.toggle(oEventPress.getSource());
                } else if (oValues) {
                    this.getOwnerComponent().getModel("myMod").setProperty("/lessSalData", aLessSalary);

                    // this.getView().getModel("errorModel").setProperty("/ErrorData",aLessSalary);

                    var oMessageTemplate = new MessageItem({
                        type: '{type}',
                        title: '{title}',
                        activeTitle: "{active}",
                        description: '{description}',
                        subtitle: '{subtitle}',
                        counter: '{counter}'
                    });

                    var sErrorDescription = 'First Error message description. \n' +
                        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod' +
                        'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,' +
                        'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo' +
                        'consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse' +
                        'cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non' +
                        'proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';


                    var aMockMessages = [{
                        type: 'Error',
                        title: 'Error message',
                        active: true,
                        description: sErrorDescription,
                        subtitle: 'Example of subtitle',
                        counter: 1
                    }, {
                        type: 'Warning',
                        title: 'Warning without description',
                        description: ''
                    }, {
                        type: 'Success',
                        title: 'Success message',
                        description: 'First Success message description',
                        subtitle: 'Example of subtitle',
                        counter: 1
                    }];



                    var oMessagePopover = new MessagePopover({
                        items: {
                            path: '/',
                            template: oMessageTemplate
                        },
                        activeTitlePress: function () {
                            sap.m.MessageToast.show('Active title is pressed');
                        }
                    });
                    var errMdl = this.getView().getModel("errorModel")
                    errMdl.setData(aMockMessages);
                    oMessagePopover.setModel(errMdl);

                    oMessagePopover.toggle(oEventPress.getSource());

                }
            },
            onAfterRendering: function () {

            },
            onBeforeRendering: function () {
                var EmpVar = this.getOwnerComponent().getModel("myMod").getProperty("/EmpData");
                console.log(EmpVar);
            },
            frag: null,
            onAddResources: function () {
                if (!this.frag) {
                    this.frag = new sap.ui.xmlfragment(this.getView().getId(), "SA.SmartAssignment.Fragment.Resources", this);
                    this.getView().addDependent(this.frag);
                }

                this.frag.open();
            },
            onChange: function (oEv) {
                debugger;
      var aRestricted = [];
      var aNonRest = [];
      var bRestricted = false;
      var bChanged = false;
      var oFilterBar = oEv.getSource();
                // var myControlID = this.getView().byId("idControlConfig");
                // this.getView().byId("container-SmartAssignment---App--IDsmartFilterBar-filterItemControlA_-Empname-content");
                var myJSN = this.getView().getModel("myMod").getProperty("/EmpData");
              
                    
                this.FilData =  oFilterBar.getFilterData().Empname.value;
              
                
                for (var i = 0; i < myJSN.results.length; i++) {
                    if (myJSN.results[i].Empname == this.FilData) {
                        if (myJSN.results[i].Restct == "R") {
                            // aRestricted.push(myJSN.results[i].Empname);
                            // bRestricted = true;
                            // bChanged = true;
                            //    var tokens = this.getView().byId("container-SmartAssignment---App--IDsmartFilterBar-filterItemControlA_-Empname").getTokens();
                            //    var tokenRemove = tokens[0];
                            this.getView().byId("container-SmartAssignment---App--IDsmartFilterBar-filterItemControlA_-Empname").setValue(null);
                            //  var oFilterD =  oEv.getSource().getFilterData().Empname.value;
                        //   oFilterD = "";
                        //   oEv.getSource().setFilterData(oFilterD,true);
                            // tokenRemove.setText(null);
                            //    tokenRemove.fireDelete();

                            // var jFilterData = this.getView().byId("IDsmartFilterBar").getFilterData();
                            // this.getView().byId("IDsmartFilterBar").setFilterData(jFilterData, null);
                            // var oSmartTable = this.getView().byId("smartTable_ResponsiveTable").search();
                            sap.m.MessageBox.error("This ID is restricted");
                            return;

                        }

                    }
                    // if(!bRestricted){
                    //     aNonRest.push();
                    // }
                }
                
            },
            _generateInvalidUserInput: function () {

            },


            onCLose: function () {
                this.frag.close();
            }
        });
    });
