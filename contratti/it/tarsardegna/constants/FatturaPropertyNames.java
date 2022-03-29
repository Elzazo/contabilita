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
	DATAFATTURA("dataFattura"),
	IMPORTO("importo"),
	CONTRATTO("contratto"),
	FORNITORE("fornitore"),
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
