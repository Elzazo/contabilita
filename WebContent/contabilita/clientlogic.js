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
         
         function saveField(fieldName, fieldValue, td, originalValue, tdOnDbClick){
         var arg = {};
         arg.fieldName = fieldName;
         arg.fieldValue = fieldValue;
         $.post( '../postUpdateField.html', arg , function(){
           													// nothing to do,
															// will check the
															// results
           												}).done(function() {
           														alert('Campo '+fieldName+' aggiornato correttamente.');
         									restoreInnerHtml(td, fieldValue, tdOnDbClick);
           														}
           													   ).fail(function() {
           																alert('Errore durante l\'aggiornamento del campo '+fieldName+ ' con il valore '+fieldValue);
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
		 var capitolo, fornitore, contratto;
		 
		 function loadOptionValues() {
			 doGetDictionary(CAPITOLO);
			 doGetDictionary(CONTRATTO);
			 doGetDictionary(FORNITORE);
		 }
		 
		 
		 function doGetDictionary(dictionary){
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
		 
		 var dbclicks = ["enableSelectForCapitolo(this, 'myid-capitolo', 90, 'myvalue');",
		        		 "enableTextInputElement(this, 'myid-fattura', 100, 'Es. 1/PA', 'Numero della fattura', this.innerHTML);",
		        		 "enableDateInputElement(this, 'myid-dataDataSdi', 160, 'Data SDI', 'myvalue');",
		        		 "enableNumberInputElement(this, 'myid-importo', 100, 'Es. 50', 'Importo fattura', this.innerHTML);",
		        		 "enableTextInputElement(this, 'myid-oggetto', 100, 'Es. Servizio di sorveglianza', 'Oggetto della fattura', this.innerHTML);",
		        		 "enableTextInputElement(this, 'myid-mese', 100, 'Es. gen-22', 'Mese di competenza', this.innerHTML);",
		        		 "enableTextInputElement(this, 'myid-prestazione', 100, 'Es. Pulizia locali', 'Prestazione della fattura', this.innerHTML);",
		        		 "enableDateInputElement(this, 'myid-scadenza', 160, 'Scadenza', 'myvalue');",
		        		 "enableNumberInputElement(this, 'myid-eserciziospesa', 100, 'Es. 2022', 'Esercizio di spesa', this.innerHTML);",
		        		 "enableSelectForVoceSpesa(this, 'myid-vocespesa', 250, 'myvalue');",
		        		 "enableSelectForFornitore(this, 'myid-fornitore', 250, 'myvalue');",
		        		 "enableSelectForContratto(this, 'myid-contratto', 150, 'myvalue');",
		        		 "enableTextInputElement(this, 'myid-decretosg', 100, 'Es. 50', 'Decreto SG', this.innerHTML);",
		        		 "enableDateInputElement(this, 'myid-datadecreto', 160, 'Data Decreto SG', '22/03/2022');"
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
             return document.createElement("select");
         }
         
         function createOptionTag() {
         	return document.createElement("option");
         }
         
         
         
         function enableTextInputElement(td, id, pixelWidth, placeholder,ariaLabel, value){
         // e.g. <input id="2-fattura" style="width:100px" type="text"
			// class="form-control" placeholder="Es. 1/PA" aria-label="Numero
			// della fattura" aria-describedby="basic-addon2" value="1/PA">
         	
         	var ie = createInputElementTag();
         	ie.setAttribute("id", id.replace("td", ""));
         	// ie.setAttribute("style", "width:"+pixelWidth+"px");
         	ie.setAttribute("style", "width: 100%");
         	ie.setAttribute("type", "text");
         	ie.setAttribute("class", "form-control input-sm");
         	ie.setAttribute("placeholder", placeholder);
         	ie.setAttribute("aria-label", ariaLabel);
         	ie.setAttribute("aria-describedby", "basic-addon2");
         	ie.setAttribute("title", "Premi Invio per salvare i dati, Esc per annullare");
         	ie.setAttribute("value", value);
         	// removing the double click from tunneling
         	var tdOnDbClick = td.getAttribute("ondblclick");
         	td.removeAttribute("ondblclick");
         	// on Escape Key the field won't be updated and the value will be
			// restored
         	ie.addEventListener("keyup", function(event) {
         									if(event.keyCode === 27){
         									   // Esc key was pressed
         									   restoreInnerHtml(td, value, tdOnDbClick);
         									   return;
         								   }
         								   
         								   if (event.keyCode === 13) {
         										// Enter Key was pressed,
												// saving...
         										var fieldName = id.substring(id.indexOf("-")+1);
         										var fieldValue = ie.getAttribute("value");
         										saveField(fieldName, ie.value, td, value, tdOnDbClick);
         									}
         								});
         								
         	td.innerHTML = "";
         	td.appendChild(ie);
         	ie.focus();
         	return ie;			
         }
         
         function enableNumberInputElement(td, id, pixelWidth, placeholder,ariaLabel, value){
        	 var inputElement = enableTextInputElement(td, id, pixelWidth, placeholder,ariaLabel, value);
        	 inputElement.setAttribute("type", "number");
         }
         
         function enableSelectForContratto(td, id, pixelWidth, value) {
         	/*
			 * <select style="width:115px" id="2-contratto"
			 * class="form-control"> <option selected>Contratto</option>
			 * <option>Discrezionale</option> </select>
			 */
         	var ie = createSelectTag();
         	// ie.setAttribute("style", "width:"+pixelWidth+"px");
         	ie.setAttribute("style", "width: 100%");
         	ie.setAttribute("id", id.replace("td", ""));
         	ie.setAttribute("class", "form-select");
         	ie.setAttribute("title", "Cambia valore per salvare i dati, Esc per annullare");
         
         	
         	// removing the double click from tunneling
         	var tdOnDbClick = td.getAttribute("ondblclick");
         	td.removeAttribute("ondblclick");
         	td.innerHTML = "";
         	
         	console.log('Contratto size:'+contratto.length);
         	
         	for (var i = 0; i < contratto.length; i++){
         		var el = createOptionTag();
         		var label = contratto[i]["denominazione"];
         		console.log(label);
         		el.innerHTML=label;
         		if (label == value){
         			el.selected = "selected";
         		}
         		ie.appendChild(el);
         	}
         	
         	ie.addEventListener("change", function() {
         									   var fieldName = id.substring(id.indexOf("-")+1);
         									   saveField(fieldName, ie.value, td, value, tdOnDbClick);	
         								  });
         	ie.addEventListener("keyup", function(event) {
         									if(event.keyCode === 27){
         									   // Esc key was pressed
         									   restoreInnerHtml(td, value, tdOnDbClick);
         									   return;
         								   }
         								});
         	td.appendChild(ie);
         	ie.focus();
         }
         
         
         function enableSelectForCapitolo(td, id, pixelWidth, value) {
         	
         	var ie = createSelectTag();
         	// ie.setAttribute("style", "width:"+pixelWidth+"px");
         	ie.setAttribute("style", "width: 100%");
         	ie.setAttribute("id", id.replace("td", ""));
         	ie.setAttribute("class", "form-select");
         	ie.setAttribute("title", "Cambia valore per salvare i dati");
         
         	
         	// removing the double click from tunneling
         	var tdOnDbClick = td.getAttribute("ondblclick");
         	td.removeAttribute("ondblclick");
         	td.innerHTML = "";
         	
         	for (var i = 0; i < capitolo.length; i++) {
         		  var cap = createOptionTag();
         		  var den = capitolo[i]["denominazione"];
				  if (value == den){
         				cap.selected="selected";
         		  }
         		  cap.innerHTML=den;
         		  cap.setAttribute("myid", capitolo[i]["id"]);
         		  ie.appendChild(cap);
         	}
         	
         	td.appendChild(ie);
         	ie.focus();
         	ie.addEventListener("change", function() {
         									   var fieldName = id.substring(id.indexOf("-")+1);
         									   // TODO: add change to voce
												// spesa
         									   saveField(fieldName, ie.value, td, value, tdOnDbClick);	
         								  });
         	ie.addEventListener("keyup", function(event) {
         									if(event.keyCode === 27){
         									   // Esc key was pressed
         									   restoreInnerHtml(td, value, tdOnDbClick);
         									   return;
         								   }
         								});
         }
         
         function enableSelectForFornitore(td, id, pixelWidth, value) {
         	/*
			 * <select style="width:90px" id="2-fornitore" class="form-select">
			 * <option selected>Enel S.P.A.</option> </select>
			 */
         	var ie = createSelectTag();
         	// ie.setAttribute("style", "width:"+pixelWidth+"px");
         	ie.setAttribute("style", "width: 100%");
         	ie.setAttribute("id", id);
         	ie.setAttribute("class", "form-select");
         	ie.setAttribute("title", "Cambia valore per salvare i dati");
         
         	
         	// removing the double click from tunneling
         	var tdOnDbClick = td.getAttribute("ondblclick");
         	td.removeAttribute("ondblclick");
         	td.innerHTML = "";
         	
         	
         	for (var i = 0; i < fornitore.length; i++) {
         		  // <!-- add ID in input element -->
         		  var forn = createOptionTag();
         		  var den = fornitore[i]["denominazione"];
         		  if (value == den){
         				forn.selected="selected";
         		  }
         		  forn.innerHTML=den;
         		  forn.setAttribute("myid", fornitore[i]["id"]);
         		  ie.appendChild(forn);
         	}
         	
         	td.appendChild(ie);
         	ie.focus();
         	ie.addEventListener("change", function() {
         									   var fieldName = id.substring(id.indexOf("-")+1);
         									   saveField(fieldName, ie.value, td, value, tdOnDbClick);	
         								  });
         	ie.addEventListener("keyup", function(event) {
         									if(event.keyCode === 27){
         									   // Esc key was pressed
         									   restoreInnerHtml(td, value, tdOnDbClick);
         									   return;
         								   }
         								});
         }
         
         
         
         function enableDateInputElement(td, id, pixelWidth, ariaLabel, value){
         	// <input id="2-data-fattura" style="width:175px"
			// id="2-data-decreto" type="date" class="form-control
			// it-date-datepicker" aria-label="Data Fattura"
			// aria-describedby="basic-addon2" value="2022-03-22" >
         	var ie = createInputElementTag();
         	ie.setAttribute("id", id.replace("td", ""));
         	// ie.setAttribute("style", "width:"+pixelWidth+"px");
         	ie.setAttribute("style", "width: 100%");
         	ie.setAttribute("type", "date");
         	ie.setAttribute("class", "form-control it-date-datepicker");
         	ie.setAttribute("aria-label", ariaLabel);
         	ie.setAttribute("aria-describedby", "basic-addon2");
         	ie.setAttribute("title", "Cambia data per salvare i dati");
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
         									   restoreInnerHtml(td, value, tdOnDbClick);
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
         
         // -----------------------CONSTANTS DEFINITION START-----------------------------------------------		 
		 // definition of voci spesa
		 
		 let vocispesadef = [
			["2286","1","Materiale informatico di facile consumo"],
			["2287","2","Spese per Covid_19 (dispensatori liquido, liquido igienizzante, mascherine di protezione, guanti monouso, ecc.)"],
			["2287","3","Carta"],
			["2287","4","Cancelleria, stampati speciali (compreso minute spese funzionamento biblioteca)"],
			["2287","5","Rilegatura bollettini, sentenze e pubblicazioni in genere"],
			["2287","6","Minute spese (piccoli accessori per auto, timbri, numeratori automatici, ecc)"],
			["2287","7","Materiale igienico e sanitario"],
			["2287","8","Manutenzione ordinaria attrezzature ed apparecchiature non informatiche (fotocopiatrici, fax, calcolatrici, ecc.)"],
			["2287","9","Noleggio macchine d'ufficio non informatiche (fotocopiatrici, videoproiettori, fax ecc.)"],
			["2287","10","Manutenzione ordinaria mobili, arredi e accessori"],
			["2287","11","Spese per servizio di reception"],
			["2287","12","Spese per servizio di vigilanza"],
			["2288","13","Canone e consumi per acqua"],
			["2288","14","Canone e consumi per energia elettrica"],
			["2288","15","Canone e consumi per riscaldamento"],
			["2288","16","Canone e consumi per condizionamento"],
			["2288","17","Canone e consumi per gas"],
			["2288","18","Canone e consumi telefonici"],
			["2288","19","Canone noleggio centralino telefonico"],
			["2291","20","Manutenzione ordinaria immobili"],
			["2291","21","Manutenzione straordinaria immobili"],
			["2291","22","Manutenzione ordinaria ascensori ed elevatori"],
			["2291","23","Manutenzione ordinaria impianti di condizionamento"],
			["2291","24","Manutenzione ordinaria impianto riscaldamento"],
			["2291","25","Manutenzione ordinaria centralini ed impianti telefonici"],
			["2291","26","Manutenzione ordinaria impianto elettrico"],
			["2291","27","Manutenzione ordinaria rete LAN"],
			["2291","28","Manutenzione ordinaria impianto idrico"],
			["2291","29","Manutenzione ordinaria impianto antincendio"],
			["2291","30","Manutenzione ordinaria aree esterne"],
			["2291","31","Manutenzione ordinaria altri impianti (specificare nella colonna delle osservazioni  quali altri impianti)  Impianto apriporta elettrico con lettori di tessere di prossimit…"],
			["2291","32","Manutenzione straordinaria impianti"],
			["2291","33","Spese per misure di sicurezza e vigilanza"],
			["2291","34","Spese per Covid_19 (Pulizia impianti condizionamento/riscaldamento)"],
			["2292","35","Noleggio"],
			["2292","36","Ccar sharing"],
			["2292","37","Convenzione taxi"],
			["2292","38","Spese per Covid_19 (sanificazione automezzi)"],
			["2293","39","Corrispondenza affrancata"],
			["2293","40","Cartoline postali"],
			["2293","41","Pick up"],
			["2293","42","Home box"],
			["2293","43","Corriere espresso"],
			["2294","44","Spese per l'inaugurazione dell'anno giudiziario"],
			["2296","45","Fitto locali sede"],
			["2296","46","Oneri accessori sede"],
			["2296","47","Fitto locali archivi esterni"],
			["2296","48","Oneri accessori archivi"],
			["2297","49","Spese per gli onorari degli avvocati che hanno esercitato il patrocinio con oneri a carico dello Stato"],
			["2297","50","Spese per notificazioni e comunicazioni"],
			["2298","51","Spese per contratto Responsabile del Servizio di Prevenzione e Protezione (RSPP)"],
			["2298","52","Spese per contratto Medico Competente (MC)"],
			["2298","53","Spese per visite del medico competente"],
			["2298","54","Spese per corsi di formazione in materia di sicurezza"],
			["2298","55","Spese per Covid_19 (redazione DUVRI, corsi formazione, ecc )"],
			["2301","56","Spese di trasporto mobili, macchine, impianti fascicoli ed altro materiale d'ufficio."],
			["2302","57","Spese per la pulizia dei locali"],
			["2302","58","Spese per Covid_19 (interventi di sanificazione, pulizie straordinarie)"],
			["2302","59","Spese per lo smaltimento dei rifiuti speciali (toner ecc.)"],
			["2303","60","Tassa smaltimento rifiuti solidi urbani"],
			["2303","61","Tributi vari"],
			["2304","62","Spese per l'affidamento esterno della gestione dell'archivio di deposito"],
			["5250","63","Mobili, scaffalature, arredi"],
			["5251","64","Libri"],
			["5252","65","Attrezzature ed apparecchiature non informatiche (fotocopiatrici, fax, calcolatrici, videoproiettori ecc.)"],
			["5252","66","Spese per misure di sicurezza e vigilanza"],
			["5253","67","SPESE PER RISTRUTTURAZIONE E MANUTENZIONE STRAORDINARIA DEGLI EDIFICI DEMANIALI"],
			["2287","68","Altro"],
			["2288","69","Altro"],
			["2291","70","Altro"],
			["2292","71","Altro"],
			["2293","72","Altro"],
			["2296","73","Altro"],
			["2298","74","Altro"],
			["5250","75","Altro"],
			["5252","76","Altro"]
		];
		 
		 var vocispesa = new Map();
		 
		 for (var i = 0; i < vocispesadef.length; i++){
			 var elem = vocispesadef[i];
			 var mainMap;
			 if (vocispesa.has(elem[0])){
				 mainMap = vocispesa.get(elem[0]);
			 }else {
				 mainMap = new Map();
				 vocispesa.set(elem[0], mainMap);
			 }
			 mainMap.set(elem[1], elem[2]);	
		 }
		 
		 // for (const cap of vocispesa.keys()){
		 // console.log("Values of "+cap);
		 // var innerMap = vocispesa.get(cap);
		 // for (const key of innerMap.keys()){
		 // console.log("Key "+key+" is "+innerMap.get(key));
		 // }
		 // }
		 
		 const CAPITOLO="capitolo";
		 const FATTURA = "fattura";
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
		 
         var idList=[CAPITOLO, FATTURA, DATASDI, IMPORTO, OGGETTO, MESE, PRESTAZIONE, SCADENZA, ESERCIZIOSPESA,  VOCESPESA, FORNITORE, CONTRATTO, DECRETOSG, DATADECRETO];
                  
         // -----------------------CONSTANTS DEFINITION END-----------------------------------------------

         
         
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
				
				for (var j = 0; j<idList.length; j++) {
					var field = idList[j];
					// alert(field);
					var value = data[field];
					// alert(value);
					var td = createTdTag();
					td.setAttribute("id", id+"-"+field+"-td");
					var doubleClick = dbclicks[j].replace("myid", id);
					doubleClick = doubleClick.replace("myvalue", value);
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
			return IMPORTO == fieldName || MESE == fieldName || ESERCIZIOSPESA == fieldName;
		 }
		 
		 function getDateFromString(dateToParse) {
		     var fields = dateToParse.split('\/');
			 return new Date(fields[2], fields[1], fields[0]);	
		 }
		 
		 function getFloatFromString(numberToParse) {
			return parseFloat(numberToParse.replace('.', '').replace(',', '.'));
		 }
		 
		 function sort(fieldName, asc) {
			
			if (isTextField(fieldName)) {
				rows.sort((a, b) => {
				    var aa = a[fieldName], bb = b[fieldName];
					return asc ? ('' + aa).localeCompare(bb) : ('' + bb).localeCompare(aa);
				}
				);
			} else if (isDateField(fieldName)){
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