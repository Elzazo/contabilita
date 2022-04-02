/**
 * 
 */
package it.tarsardegna.constants;

/**
 * @author elzaz
 *
 */
public enum FatturaPropertyNames {
	
	CAPITOLO("capitolo"),
	FATTURA("fattura"),
	DATASDI("datasdi"),
	SCADENZA("scadenza"),
	ESERCIZIO("eserciziospesa"),
	IMPORTO("importo"),
	CONTRATTO("contratto"),
	FORNITORE("fornitore"),
	OGGETTO("oggetto"),
	PRESTAZIONE("prestazione"),
	MESE("mese"),
	VOCEDISPESA("vocespesa"),
	DECRETOSG("decretosg"),
	DATADECRETO("datadecreto");
	
	private String _name;
	
	private FatturaPropertyNames (String name){
		_name = name;
	}
	
	@Override
	public String toString() {
		return _name;
	}

}
