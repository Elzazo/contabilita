/**
 * 
 */
package it.tarsardegna.model;

import it.tarsardegna.util.StringUtils;


/**
 * @author elzaz
 *
 */
public class Dictionary extends IntKey implements Jsonable{
	
	private String denominazione;
	
	public Dictionary(){
		super(-1);
	}

	public Dictionary(int id, String denominazione){
		super(id);
		this.denominazione = denominazione;
	}

	public String getDenominazione() {
		return denominazione;
	}

	public void setDenominazione(String denominazione) {
		this.denominazione = denominazione;
	}

	@Override
	public String toJson() {
		return toJson(1);
	}

	@Override
	public String toJson(int tabs) {
		String tab = StringUtils.getTabs(tabs);		
		StringBuilder sb = new StringBuilder(tab);
		sb.append("{");
		sb.append(System.lineSeparator());
		sb.append(tab); sb.append("\t");
		StringUtils.addPropertyAndValueToStringBuilder("id", getKey(), sb, true);
		sb.append(tab); sb.append("\t");
		StringUtils.addPropertyAndValueToStringBuilder("denominazione", denominazione, sb, false);
		sb.append(tab); sb.append("}");
		return sb.toString();
	}

	
}
