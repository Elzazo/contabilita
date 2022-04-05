/**
 * 
 */
package it.tarsardegna.model;

import it.tarsardegna.util.StringUtils;

/**
 * @author elzaz
 *
 */
public class DictionaryWithParent extends Dictionary {
	int parentId;
	
	public DictionaryWithParent() {
		super();
	}
	
	public DictionaryWithParent(int id, int parentId, String denominazione){
		super(id, denominazione);
		this.parentId = parentId;
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
		StringUtils.addPropertyAndValueToStringBuilder("parentid", parentId, sb, true);
		sb.append(tab); sb.append("\t");
		StringUtils.addPropertyAndValueToStringBuilder("denominazione", getDenominazione(), sb, false);
		sb.append(tab); sb.append("}");
		return sb.toString();
	}

}
