/**
 * 
 */
package it.tarsardegna.model;

import it.tarsardegna.util.StringUtils;


/**
 * @author elzaz
 *
 */
public class Dictionary implements Jsonable{
	
	private int id;
	private String denominazione;
	
	public Dictionary(){}

	public Dictionary(int id, String denominazione){
		this.id = id;
		this.denominazione = denominazione;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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
		StringUtils.addPropertyAndValueToStringBuilder("id", id, sb, true);
		sb.append(tab); sb.append("\t");
		StringUtils.addPropertyAndValueToStringBuilder("denominazione", denominazione, sb, false);
		sb.append(tab); sb.append("}");
		return sb.toString();
	}

	
}
