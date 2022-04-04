/**
 * 
 */
package it.tarsardegna.persistence;

/**
 * @author elzaz
 *
 */
public enum Dictionary {
	
	CAPITOLO("capitolo"),
	CONTRATTO("contratto"),
	FORNITORE("fornitore"),
	VOCESPESA("vocespesa");

	private String dictionaryName;
	
	private Dictionary (String d){
		dictionaryName = d;
	}
	
	public String getDictionaryName(){
		return dictionaryName;
	}
	
}
