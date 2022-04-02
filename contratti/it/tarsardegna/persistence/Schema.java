/**
 * 
 */
package it.tarsardegna.persistence;

/**
 * @author elzaz
 *
 */
public enum Schema {
	
	CONTABILITA("contabilita");
	
	private String schema;
	private Schema(String s){
		schema = s;
	}
	
	public String getSchemaName(){
		return schema;
	}

}
