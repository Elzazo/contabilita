// -----------------------CONSTANTS DEFINITION START----------------------------------------------- 
		 const CAPITOLO="capitolo";
		 const FATTURA = "numero";
		 const IMPORTO = "importo";
		 const OGGETTO = "oggetto";
		 const MESE = "mese";
		 const PRESTAZIONE = "prestazione";
		 const DATASDI = "datasdi";
		 const SCADENZA = "scadenza";
		 const ESERCIZIOSPESA = "eserciziospesa";
		 const VOCESPESA = "vocespesa";
		 const FORNITORE = "fornitore";
		 const CONTRATTO = "contratto";
		 const DECRETOSG = "decretosg";
		 const DATADECRETO = "datadecreto";
		 
         var idList=[CAPITOLO, FATTURA, DATASDI, IMPORTO, OGGETTO, MESE, PRESTAZIONE, 
                     SCADENZA, ESERCIZIOSPESA,  VOCESPESA, FORNITORE, CONTRATTO, DECRETOSG, DATADECRETO];
                  
// -----------------------CONSTANTS DEFINITION END-----------------------------------------------         





//---------------------------------------------------- AJAX CALLS START --------------------------------------------------------


         function ajaxDeleteRow(id, name){
           	    $.post( '../postDelete.html', id, function(){
           													// nothing to do,
															// will check the
															// results
           												}).done(function() {
           														alert('Fattura '+name+' cancellata correttamente.');
           														deleteRow(id);
           														}
           													   ).fail(function() {
           																alert('Errore durante la cancellazione della fattura '+name);
           																}
           													          );
           }
         
           function deleteRow(id){
         document.getElementById(id).remove();
           }
           
           function saveRow(id, name){
         if (window.confirm('Salvare la fattura '+document.getElementById(name).value+'?')){
         saveRow();
         }
           }
         
         function saveField(fieldName, fieldValue, td, tdValue, originalValue, tdOnDbClick){
         var arg = {};
         var dbFieldName = fieldName;
         var displayName = fieldName;     
         arg[dbFieldName]= fieldValue;
         var tid = td.getAttribute("id");
         var idValue = tid.substring(0, tid.indexOf("-"));
         arg["id"] = idValue;
         console.log("Will try to update fatture with {"+dbFieldName+": "+fieldValue+", id:"+idValue+"}, eventually restoring value "+originalValue);
         $.post( '../UpdateFatture', arg , function(){
           													// nothing to do,
															// will check the
															// results
           												}).done(function(data) {
           													    console.log('UpdateFattureResult: ['+data+']');
           													    if ("OK" == data){
           													    	//alert('Campo '+fieldName+' aggiornato correttamente.');
           													    	restoreInnerHtml(td, tdValue, tdOnDbClick);
           													    	//TODO: fix numeric fields (importo)
           													    	td.parentElement.setAttribute(fieldName, fieldValue);
           														}else {
           															alert('Errore durante l\'aggiornamento del campo '+displayName+ ' con il valore '+fieldValue);
           		         											restoreInnerHtml(td, originalValue, tdOnDbClick);
           		           										}
           														
           													}
           													   ).fail(function() {
           																alert('Errore durante l\'aggiornamento del campo '+displayName+ ' con il valore '+fieldValue);
         											restoreInnerHtml(td, originalValue, tdOnDbClick);
           																}
           													          );
         
         }
         
         function getFornitori() {
        	 return fornitore;
         }
		 
		 var rows;
		 var test=false;
		 
		 function getDummyFatture() {
			const o1 = {
				id: 1, 
				capitolo:"2288", 
				fattura:"500", 
				dataFattura:"11/03/2022", 
				importo: "1.234,56", 
				fornitore: "Enel Energia S.P.A.", 
				contratto: "Contratto", 
				decretosg: "50", 
				datadecreto: "24/03/2022"
			};
			
			const o2 = {
				id: 2, 
				capitolo:"2287", 
				fattura:"100", 
				dataFattura:"01/03/2022", 
				importo: "4.000,56", 
				fornitore: "Buffetti S.P.A.", 
				contratto: "Discrezionale", 
				decretosg: "2", 
				datadecreto: "02/03/2022"
			};
			
			return [o1, o2, o2, o2, o2, o2, o2, o2, o2, o2, o2, o2, o2, o2, o2, o2, o2, o2, o2, o2, o2, o2, o2, o2, o2, o2, o2, o2, o2, o2, o2, o2];
		 }
		 
		 
		 var dictionaryUrl='../ReadDictionary?dictionary=';
		 var capitolo, fornitore, contratto, vocespesa;
		 
		 function loadOptionValues() {
			 doGetDictionary(CAPITOLO);
			 doGetDictionary(CONTRATTO);
			 doGetDictionary(FORNITORE);
			 doGetDictionary(VOCESPESA);
		 }
		 
		 
		 function doGetDictionary(dictionary){
			 console.log('Retrieving dictionary for '+dictionary);
			 $.get( dictionaryUrl + dictionary, {}, function(data) { 
					var oResult = $.parseJSON(data);
					var storeResult = oResult["result"];
					if (CAPITOLO == dictionary){
						console.log('Dictionary capitolo loaded successfully.');
						capitolo = storeResult;
					}else if(CONTRATTO == dictionary){
						console.log('Dictionary contratto loaded successfully.');
						contratto = storeResult;
					}else if(FORNITORE == dictionary){
						console.log('Dictionary fornitore loaded successfully.');
						fornitore = storeResult;
					}else if(VOCESPESA == dictionary){
						console.log('Dictionary vocespesa loaded successfully.');
						vocespesa = storeResult;
					}
				}, 
			 	"text");
		 }
		 
		 function doGet(url){
			$.get( url, {}, function(data) { 
								var oResult = $.parseJSON(data);
								rows = oResult["result"];
								// only for the first time we sort desc by data
								// fattura
								sortDown(DATASDI);
								drawTableBody();								
							}, 
				"text");
		 }
		 
		 
		 function getFatture() {
			if (test){
				rows = getDummyFatture();
				drawTableBody();
			} else {
				rows = doGet("../ReadContratti");
			}
			return rows;
		 }
         
		//---------------------------------------------------- AJAX CALLS END --------------------------------------------------------
         
		//---------------------------------------------------- DOM MANIPULATION CALLS START --------------------------------------------------------
		 
		 var dbclicks = ["enableSelectForCapitolo(this, 'myid-"+CAPITOLO+"', 90);",
		        		 "enableTextInputElement(this, 'myid-"+FATTURA+"', 100, 'Es. 1/PA', 'Numero della fattura');",
		        		 "enableDateInputElement(this, 'myid-"+DATASDI+"', 160, 'Data SDI', 'myvalue');",
		        		 "enableNumberInputElement(this, 'myid-"+IMPORTO+"', 100, 'Es. 50', 'Importo fattura', this.innerHTML);",
		        		 "enableTextInputElement(this, 'myid-"+OGGETTO+"', 100, 'Es. Servizio di sorveglianza', 'Oggetto della fattura');",
		        		 "enableTextInputElement(this, 'myid-"+MESE+"', 100, 'Es. gen-22', 'Mese di competenza');",
		        		 "enableTextInputElement(this, 'myid-"+PRESTAZIONE+"', 100, 'Es. Pulizia locali', 'Prestazione della fattura');",
		        		 "enableDateInputElement(this, 'myid-"+SCADENZA+"', 160, 'Scadenza', 'myvalue');",
		        		 "enableNumberInputElement(this, 'myid-"+ESERCIZIOSPESA+"', 100, 'Es. 2022', 'Esercizio di spesa', this.innerHTML);",
		        		 "enableSelectForVoceSpesa(this, 'myid-"+VOCESPESA+"', 250);",
		        		 "enableSelectForFornitore(this, 'myid-"+FORNITORE+"', 250);",
		        		 "enableSelectForContratto(this, 'myid-"+CONTRATTO+"', 150, 'myvalue');",
		        		 "enableTextInputElement(this, 'myid-"+DECRETOSG+"', 100, 'Es. 50', 'Decreto SG');",
		        		 "enableDateInputElement(this, 'myid-"+DATADECRETO+"', 160, 'Data Decreto SG', 'myvalue');"
		        		 ]
		 
         function restoreInnerHtml(td, innerHTML, tdOnDbClick){
         	// restoring just the innerHTML deletes the input element
         	td.innerHTML=innerHTML;
         	td.setAttribute("ondblclick", tdOnDbClick);
         }
         
         function createInputElementTag() {
             return document.createElement("input");
         }
         function createATag() {
             return document.createElement("a");
         }
         function createImgTag() {
             return document.createElement("img");
         }
         
         function createDivTag() {
             return document.createElement("div");
         }
         
         function createSelectTag() {
             var sel =  document.createElement("select");
             sel.setAttribute("size", 5);
             return sel;
         }
         
         function createOptionTag() {
         	return document.createElement("option");
         }
         
         
         
         function enableTextInputElement(td, id, pixelWidth, placeholder,ariaLabel, numericValue){
         // e.g. <input id="2-fattura" style="width:100px" type="text"
			// class="form-control" placeholder="Es. 1/PA" aria-label="Numero
			// della fattura" aria-describedby="basic-addon2" value="1/PA">
         	
         	var ie = createInputElementTag();
         	var ieId = id.replace("td", "");
         	ie.setAttribute("id", ieId);
         	// ie.setAttribute("style", "width:"+pixelWidth+"px");
         	ie.setAttribute("style", "width: 100%");
         	ie.setAttribute("type", "text");
         	ie.setAttribute("class", "form-control input-sm");
         	ie.setAttribute("placeholder", placeholder);
         	ie.setAttribute("aria-label", ariaLabel);
         	ie.setAttribute("aria-describedby", "basic-addon2");
         	ie.setAttribute("title", "Premi Invio per salvare i dati, Esc per annullare");
         	var elementName = ieId.substring(ie.getAttribute("id").lastIndexOf("-") + 1);
         	var elementOriginalValue = td.parentElement.getAttribute(elementName);
         	if (numericValue === undefined){
         		ie.setAttribute("value", elementOriginalValue);
         	}else {
         		ie.setAttribute("value", numericValue);
         	}
			console.log("Original value of "+elementName+ " is "+ elementOriginalValue);
         	// removing the double click from tunneling
         	var tdOnDbClick = td.getAttribute("ondblclick");
         	td.removeAttribute("ondblclick");
         	var originalInnerHTML = td.innerHTML;
         	// on Escape Key the field won't be updated and the value will be
			// restored
         	ie.addEventListener("keyup", function(event) {
         									if(event.keyCode === 27){
         									   // Esc key was pressed
         									   var elementName = ieId.substring(ie.getAttribute("id").lastIndexOf("-") + 1);
         									   var elementOriginalValue = td.parentElement.getAttribute(elementName);
         									   console.log("Will restore original value of "+elementName+ " with "+ elementOriginalValue); 
         									   restoreInnerHtml(td, originalInnerHTML, tdOnDbClick);
         									   return;
         								   }
         								   
         								   if (event.keyCode === 13) {
         										// Enter Key was pressed,
												// saving...
         										var fieldName = id.substring(id.indexOf("-")+1);
         										var fieldValue = ie.getAttribute("value");
         										saveField(fieldName, ie.value, td, elementOriginalValue, elementOriginalValue, tdOnDbClick);
         									}
         								});
         								
         	td.innerHTML = "";
         	td.appendChild(ie);
         	ie.focus();
         	return ie;			
         }
         
         function enableNumberInputElement(td, id, pixelWidth, placeholder,ariaLabel, value){
        	 var myvalue = value;
        	 myvalue = myvalue.replace('.', '');
        	 myvalue = myvalue.replace(',', '.');
        	 var inputElement = enableTextInputElement(td, id, pixelWidth, placeholder,ariaLabel, myvalue);
        	 inputElement.setAttribute("type", "number");
        	 inputElement.setAttribute("step", ".01");
         }
         
         function enableSelectForContratto(td, id, pixelWidth) {
         	/*
			 * <select style="width:115px" id="2-contratto"
			 * class="form-control"> <option selected>Contratto</option>
			 * <option>Discrezionale</option> </select>
			 */
         	var ie = createSelectTag();
         	// ie.setAttribute("style", "width:"+pixelWidth+"px");
         	ie.setAttribute("style", "width: 100%");
         	var ieId = id.replace("td", "");
         	ie.setAttribute("id", ieId);
         	ie.setAttribute("class", "form-select");
         	ie.setAttribute("title", "Cambia valore per salvare i dati, Esc per annullare");
         
         	
         	// removing the double click from tunneling
         	var tdOnDbClick = td.getAttribute("ondblclick");
         	td.removeAttribute("ondblclick");
         	var originalInnerHTML = td.innerHTML;
         	td.innerHTML = "";
         	
         	console.log('Contratto size:'+contratto.length);
         	var elementName = ieId.substring(ie.getAttribute("id").lastIndexOf("-") + 1);
			var elementOriginalValue = td.parentElement.getAttribute(elementName);
			  
         	for (var i = 0; i < contratto.length; i++){
         		var el = createOptionTag();
         		var label = contratto[i]["denominazione"];
         		console.log(label);
         		el.innerHTML=label;
         		if (label == elementOriginalValue){
         			el.selected = "selected";
         		}
         		el.setAttribute("value", contratto[i]["id"]);
         		ie.appendChild(el);
         	}
         	
         	ie.addEventListener("change", function() {
         									   var fieldName = id.substring(id.indexOf("-")+1);
         									   var optionText = ie.options[ie.selectedIndex].text;
         									   saveField(fieldName, ie.value, td, optionText, elementOriginalValue, tdOnDbClick);
         									   location.reload(); // restores combos
         								  });
         	ie.addEventListener("keyup", function(event) {
         									if(event.keyCode === 27){
         									   // Esc key was pressed
         									   var elementName = ieId.substring(ie.getAttribute("id").lastIndexOf("-") + 1);
          									   var elementOriginalValue = td.parentElement.getAttribute(elementName);
          									   console.log("Will restore original value of "+elementName+ " with "+ originalInnerHTML); 
          									   restoreInnerHtml(td, originalInnerHTML, tdOnDbClick);
          									   return;
         								   }
         								});
         	td.appendChild(ie);
         	ie.focus();
         }
         
         
         function enableSelectForVoceSpesa(td, id, pixelWidth) {
          	
          	var ie = createSelectTag();
          	// ie.setAttribute("style", "width:"+pixelWidth+"px");
          	ie.setAttribute("style", "width: 100%");
          	var ieId = id.replace("td", "");
         	ie.setAttribute("id", ieId);
          	ie.setAttribute("class", "form-select");
          	ie.setAttribute("title", "Cambia valore per salvare i dati");
          
          	var parentid = td.parentElement.getAttribute(CAPITOLO);
          	
          	// removing the double click from tunneling
          	var tdOnDbClick = td.getAttribute("ondblclick");
          	td.removeAttribute("ondblclick");
          	var originalInnerHTML = td.innerHTML;
          	td.innerHTML = "";
          	
          	var elementName = ieId.substring(ie.getAttribute("id").lastIndexOf("-") + 1);
			var elementOriginalValue = td.parentElement.getAttribute(elementName);
			
          	
          	for (var i = 0; i < vocespesa.length; i++) {
          		  var currentparentid = vocespesa[i]["parentid"];
          		  if (currentparentid != parentid){
          			  continue;
          		  }
          		  var cap = createOptionTag();
          		  var den = vocespesa[i]["denominazione"];
 				  if (elementOriginalValue == den){
 					  cap.selected="selected";
          		  }
          		  cap.innerHTML=den;
          		  cap.setAttribute("value", vocespesa[i]["id"]);
          		  ie.appendChild(cap);
          	}
          	
          	td.appendChild(ie);
          	ie.focus();
          	ie.addEventListener("change", function() {
          									   var fieldName = id.substring(id.indexOf("-")+1);
          									   // TODO: add change to voce
 												// spesa
         									   var optionText = ie.options[ie.selectedIndex].text;
          									   saveField(fieldName, ie.value, td, optionText, elementOriginalValue, tdOnDbClick);	
          								  });
          	ie.addEventListener("keyup", function(event) {
          									if(event.keyCode === 27){
          									   console.log("Will restore original value of "+elementName+ " with "+ elementOriginalValue); 
          									   restoreInnerHtml(td, originalInnerHTML, tdOnDbClick);
          									   return;
          								   }
          								});
          }
         
         function enableSelectForCapitolo(td, id, pixelWidth) {
         	
         	var ie = createSelectTag();
         	// ie.setAttribute("style", "width:"+pixelWidth+"px");
         	ie.setAttribute("style", "width: 100%");
         	var ieId = id.replace("td", "");
         	ie.setAttribute("id", ieId);
         	ie.setAttribute("class", "form-select");
         	ie.setAttribute("title", "Cambia valore per salvare i dati");
         	
         	// removing the double click from tunneling
         	var tdOnDbClick = td.getAttribute("ondblclick");
         	td.removeAttribute("ondblclick");
         	var originalInnerHTML = td.innerHTML;
         	td.innerHTML = "";
         	var elementName = ieId.substring(ie.getAttribute("id").lastIndexOf("-") + 1);
			var elementOriginalValue = td.parentElement.getAttribute(elementName);
			
         	for (var i = 0; i < capitolo.length; i++) {
         		  var cap = createOptionTag();
         		  var den = capitolo[i]["denominazione"];
				  if (elementOriginalValue == den){
         				cap.selected="selected";
         		  }
         		  cap.innerHTML=den;
         		  cap.setAttribute("value", capitolo[i]["id"]);
         		  ie.appendChild(cap);
         	}
         	
         	td.appendChild(ie);
         	ie.focus();
         	ie.addEventListener("change", function() {
         									   var fieldName = id.substring(id.indexOf("-")+1);
         									   var optionText = ie.options[ie.selectedIndex].text;
         									   // TODO: add change to vocespesa
         									   console.log('Capitolo was changed to option '+ie.value);
         									   saveField(fieldName, ie.value, td, optionText, elementOriginalValue, tdOnDbClick);
         									   location.reload();
         								  });
         	ie.addEventListener("keyup", function(event) {
         									if(event.keyCode === 27){
         									   // Esc key was pressed
         									   console.log("Will restore original value of "+elementName+ " with "+ elementOriginalValue); 
          									   restoreInnerHtml(td, originalInnerHTML, tdOnDbClick);
          									   return;
         								   }
         								});
         }
         
         function enableSelectForFornitore(td, id, pixelWidth) {
         	
         	var ie = createSelectTag();
         	// ie.setAttribute("style", "width:"+pixelWidth+"px");
         	ie.setAttribute("style", "width: 100%");
         	var ieId = id.replace("td", "");
         	ie.setAttribute("id", ieId);
         	ie.setAttribute("class", "form-select");
         	ie.setAttribute("title", "Cambia valore per salvare i dati");
         
         	
         	// removing the double click from tunneling
         	var tdOnDbClick = td.getAttribute("ondblclick");
         	td.removeAttribute("ondblclick");
         	var originalInnerHTML = td.innerHTML;
         	td.innerHTML = "";
         	var elementName = ieId.substring(ie.getAttribute("id").lastIndexOf("-") + 1);
			var elementOriginalValue = td.parentElement.getAttribute(elementName);
			console.log('Will focus select for '+elementName+ ' for value '+elementOriginalValue);
         	
         	for (var i = 0; i < fornitore.length; i++) {
         		  // <!-- add ID in input element -->
         		  var forn = createOptionTag();
         		  var den = fornitore[i]["denominazione"];
         		  if (elementOriginalValue == den){
         				forn.selected="selected";
         		  }
         		  forn.innerHTML=den;
         		  forn.setAttribute("value", fornitore[i]["id"]);
         		  ie.appendChild(forn);
         	}
         	
         	td.appendChild(ie);
         	ie.focus();
         	ie.addEventListener("change", function() {
         									   var fieldName = id.substring(id.indexOf("-")+1);
         									   var optionText = ie.options[ie.selectedIndex].text;
         									   saveField(fieldName, ie.value, td, optionText, elementOriginalValue, tdOnDbClick);
         									   location.reload();
         								  });
         	ie.addEventListener("keyup", function(event) {
         									if(event.keyCode === 27){
         									   // Esc key was pressed
         									   console.log("Will restore original value of "+elementName+ " with "+ elementOriginalValue); 
          									   restoreInnerHtml(td, originalInnerHTML, tdOnDbClick);
          									   return;
         								   }
         								});
         }
         
         function enableDateInputElement(td, id, pixelWidth, ariaLabel, value){
         	var ie = createInputElementTag();
         	var ieId = id.replace("td", "");
         	ie.setAttribute("id", ieId);
         	// ie.setAttribute("style", "width:"+pixelWidth+"px");
         	ie.setAttribute("style", "width: 100%");
         	ie.setAttribute("type", "date");
         	ie.setAttribute("class", "form-control it-date-datepicker");
         	ie.setAttribute("aria-label", ariaLabel);
         	ie.setAttribute("aria-describedby", "basic-addon2");
         	ie.setAttribute("title", "Cambia data per salvare i dati");
         	var elementName = ieId.substring(ie.getAttribute("id").lastIndexOf("-") + 1);
			var elementOriginalValue = td.parentElement.getAttribute(elementName);
         	var undef;
         	if (value != undef && value != "") {
         		var splitted = value.split("\/");
         		ie.setAttribute("value", splitted[2]+"-"+splitted[1]+"-"+splitted[0]);
         	}
         	// removing the double click from tunneling
         	var tdOnDbClick = td.getAttribute("ondblclick");
         	td.removeAttribute("ondblclick");
         	// on Escape Key the field won't be updated and the value will be
			// restored
         	ie.addEventListener("keyup", function(event) {
         									if(event.keyCode === 27){
         									   // Esc key was pressed
           									   console.log("Will restore original value of "+elementName+ " with "+ elementOriginalValue); 
           									   restoreInnerHtml(td, elementOriginalValue, tdOnDbClick);
           									   return;
         								   }
         								   
         								   if (event.keyCode === 13) {
         										// Enter Key was pressed,
												// saving...
         										var fieldName = id.substring(id.indexOf("-")+1);
         										saveField(fieldName, ie.value, td, value, tdOnDbClick);
         									}
         								});
         	ie.addEventListener("input", function() {
         									   var fieldName = id.substring(id.indexOf("-")+1);
         									   var fieldValue = ie.value;
         									   var s = fieldValue.split('-');
         									   var actualValue = s[2]+"\/"+s[1]+"\/"+s[0];
         									   saveField(fieldName, actualValue, td, value, tdOnDbClick);	
         								  });
         								
         	td.innerHTML = "";
         	td.appendChild(ie);
         	ie.focus();
         					
         }
        
       //---------------------------------------------------- DOM MANIPULATION CALLS START --------------------------------------------------------      
         
         // holds the current state of each edit entire row image
         var toggleEditMap = new Map();
         
         
         function enableModifyEntireRow(rowId, aElemId) {
             var enable = true; // by default we plan to modify
         	// if the map holds true, it means that on click
         	// every object has to be set into edit mode
         	if (!toggleEditMap.has(aElemId)){
         		toggleEditMap.set(aElemId, true);				
         	}else {
         	    enable = toggleEditMap.get(aElemId);
         	}
         	
         	var img = document.getElementById(aElemId);
            img.setAttribute("title", enable? "Annulla le modifiche" : "Modifica la riga");
         	for (var i = 0; i<idList.length; i++){
         		var event;
         		if (enable) {
         		    // propagating a double click to enable editing
         			event = document.createEvent('Event');
         			event.initEvent('dblclick', false, true);
         			document.getElementById(rowId+"-"+idList[i]+"-td").dispatchEvent(event);
         		}else {
         			// propagating an Esc hit to disable editing
         			event=new KeyboardEvent("keyup", { key: "Esc", code: 27, keyCode: 27 } );
         			document.getElementById(rowId+"-"+idList[i]).dispatchEvent(event);
         		}
         	}
         	
         	// reversing for next iteration
         	toggleEditMap.set(aElemId, !enable);
         }
         
		 
		 function createTrTag() {
			var tr = document.createElement("tr");
			tr.setAttribute("class", "text-center");
			return tr;
		 }
		 
		 function createTdTag() {
			var tr = document.createElement("td");
			tr.setAttribute("scope", "col");
			tr.setAttribute("title", "Fare doppio click per modificare il campo");
			return tr;
		 }
		 
		 function clearTableBody() {
			document.getElementById("table-body").innerHTML="";
		 }
		 
		 function toggleVisibility(elem){
			elem.setAttribute("style", "display:none");
		 }
		 
		 function doDrawTableBody() {
			 loadOptionValues();
			 getFatture();
		 }
		 
		 function drawTableBody(){
			var tableBody = document.getElementById("table-body");
			{
				// adding the filter's top row
				/*
				 * { var tr = createTrTag(); tr.setAttribute("id", "tr-filter")
				 * var td = document.createElement("td");
				 * //td.setAttribute("scope", "col"); { var img =
				 * createImgTag(); img.setAttribute("id", "filterImg");
				 * img.setAttribute("title", "Applica i filtri all'intera
				 * tabella"); img.setAttribute("src", "../icons/funnel.svg");
				 * img.setAttribute("onClick",
				 * "toggleVisibility(document.getElementById('tr-filter'));");
				 * td.appendChild(img); } tr.appendChild(td); for (let j = 0; j<idList.length;
				 * j++) { var td = createTdTag(); // first version: every field
				 * is a text field //<input id="1-fattura" style="width:100px"
				 * type="text" class="form-control input-sm" placeholder="Es.
				 * 1/PA" aria-label="Numero della fattura"
				 * aria-describedby="basic-addon2" title="Premi Invio per
				 * salvare i dati, Esc per annullare" value="500"> var inputEl =
				 * createInputElementTag(); inputEl.setAttribute("type",
				 * "text"); inputEl.setAttribute("title", "Premi Invio per
				 * salvare i dati, Esc per annullare");
				 * inputEl.setAttribute("style", "width:50%");
				 * td.appendChild(inputEl); tr.appendChild(td); }
				 * tr.appendChild(createTdTag());
				 * 
				 * tableBody.appendChild(tr); }
				 */
			}
			
			
			for (var i = 0; i < rows.length; i++){
				var data = rows[i];
				var id = data["id"];
				var tr = createTrTag();
				{
					// adding the checkbox
					var td = document.createElement("td");
					td.setAttribute("scope", "col");
					// <input class="form-check-input" type="checkbox" value=""
					// id="1"></td>
					var checkbox = document.createElement("input");
					checkbox.setAttribute("class", "form-check-input");
					checkbox.setAttribute("type", "checkbox");
					checkbox.setAttribute("id", id+"-checkbox");
					td.appendChild(checkbox);
					tr.appendChild(td);
				}
				
				console.log('Populating cells...');
				for (var j = 0; j<idList.length; j++) {
					var field = idList[j];
					var value = data[field];
					console.log("Adding attribute "+field+" with value "+value);
					tr.setAttribute(field.toLowerCase(), ''+value);
					var td = createTdTag();
					td.setAttribute("id", id+"-"+field+"-td");
					var doubleClick = dbclicks[j].replace("myid", id);
					//doubleClick = doubleClick.replace("myvalue", value);
					td.setAttribute("ondblclick", doubleClick);
					td.innerHTML=value;
					tr.appendChild(td);
				}
				
				// action panel
				{
					var td = document.createElement("td");
					td.setAttribute("scope", "col");
					{
						var a = createATag();
						a.setAttribute("style", "text-decoration:none;");
						a.setAttribute("onclick", onclick="enableModifyEntireRow('"+id+"', '"+id+"-modify');");
						a.setAttribute("href", "#");
						var img = createImgTag();
						img.setAttribute("id", id+"-modify");
						img.setAttribute("title", "Modifica la riga");
						img.setAttribute("src", "../icons/pencil.svg");
						a.appendChild(img);
						td.appendChild(a);
					}
					{
						var a = createATag();
						a.setAttribute("style", "text-decoration:none;");
						a.setAttribute("onclick", onclick="window.alert('Funzione di duplicazione non ancora implementata.');");
						a.setAttribute("href", "#");
						var img = createImgTag();
						img.setAttribute("id", id+"-clone");
						img.setAttribute("title", "Duplica la riga");
						img.setAttribute("src", "../icons/check-all.svg");
						a.appendChild(img);
						td.appendChild(a);
					}
					{
					    var fattura = data["fattura"];
						var a = createATag();
						a.setAttribute("style", "text-decoration:none;");
						a.setAttribute("onclick", onclick="if (window.confirm('Cancellare la fattura "+fattura+"?')) { ajaxDeleteRow('"+id+"', '"+fattura+"');}");;
						a.setAttribute("href", "#");
						var img = createImgTag();
						img.setAttribute("id", id+"-delete");
						img.setAttribute("title", "Cancella la riga");
						img.setAttribute("src", "../icons/x-square.svg");
						a.appendChild(img);
						td.appendChild(a);
					}
					tr.appendChild(td);
				}
				
				/*
				 * 
				 * <td scope="col"> <a style="text-decoration:none;"
				 * onclick="enableModifyEntireRow('myid', 'my-modify');"
				 * href="#"> <img id="1-modify" src="../icons/pencil.svg"
				 * title="Modifica la riga"/> </a> <a
				 * style="text-decoration:none;" onclick="window.alert('Funzione
				 * di duplicazione non ancora implementata.')" href="#"> <img
				 * src="../icons/check-all.svg" title="Duplica la riga"/> </a>
				 * <a style="text-decoration:none;" onclick="if
				 * (window.confirm('Cancellare la fattura 1/PA?')) {
				 * ajaxDeleteRow('1', '1/PA');}" href="#" > <img
				 * src="../icons/x-square.svg" title="Cancella la riga"/> </a>
				 * </td>
				 * 
				 */
				
				tableBody.appendChild(tr);
			}
		 }
		 
		 
		 function isTextField(fieldName) {
			return !isDateField(fieldName) && !isNumericField(fieldName);
		 }
		 
		 function isDateField(fieldName) {
			return DATADECRETO == fieldName || SCADENZA == fieldName || DATASDI == fieldName;
		 }
		 
		 function isNumericField(fieldName) {
			return IMPORTO == fieldName || DECRETOSG == fieldName;
		 }
		 
		 function getDateFromString(dateToParse) {
		     var fields = dateToParse.split('\/');
			 return new Date(fields[2], fields[1], fields[0]);	
		 }
		 
		 function getFloatFromString(numberToParse) {
			return parseFloat(numberToParse.replace('.', '').replace(',', '.'));
		 }
		 
		 function sort(fieldName, asc) {
			console.log('Sorting '+fieldName+'...');
			if (isTextField(fieldName)) {
				console.log('Will sort '+fieldName+' like text');
				rows.sort((a, b) => {
				    var aa = a[fieldName], bb = b[fieldName];
					return asc ? ('' + aa).localeCompare(bb) : ('' + bb).localeCompare(aa);
				}
				);
			} else if (isDateField(fieldName)){
				console.log('Will sort '+fieldName+' like date');
				rows.sort((a, b) => {
				    var aa = asc ? getDateFromString(a[fieldName]) : getDateFromString(b[fieldName]);
					var bb = asc ? getDateFromString(b[fieldName]) : getDateFromString(a[fieldName]);
					
					if (aa == bb) {
						return 0;
					}else if (aa < bb){
						return -1;
					}
					return 1;
					
				}
				);
			} else if (isNumericField(fieldName)) {
				console.log('Will sort '+fieldName+' like number');
				rows.sort((a, b) => {
				    var aa = asc ? getFloatFromString(a[fieldName]) : getFloatFromString(b[fieldName]);
					var bb = asc ? getFloatFromString(b[fieldName]) : getFloatFromString(a[fieldName]);
					if (aa == bb) {
						return 0;
					}else if (aa < bb){
						return -1;
					}
					return 1;
				}
				);
			}
			
			clearTableBody();
			drawTableBody();
		 }

         function sortUp(fieldName) {
			sort(fieldName, true);
		 }
		 
		 function sortDown(fieldName) {
			sort(fieldName, false);
		 }