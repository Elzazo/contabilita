/**
 * 
 */
package it.tarsardegna.persistence;

import java.util.HashMap;

import it.tarsardegna.persistence.mapper.DictionaryMapper;
import it.tarsardegna.persistence.mapper.DictionaryWithParentMapper;
import it.tarsardegna.persistence.mapper.QueryMapper;

/**
 * @author elzaz
 *
 */
public enum CONTABILITADICTIONARYQUERY implements PersistenceQuery {
	
	
	
	CAPITOLO("SELECT id, denominazione FROM "+Dictionary.CAPITOLO.getDictionaryName()+ " ORDER BY denominazione"),
	CONTRATTO("SELECT id, denominazione FROM "+Dictionary.CONTRATTO.getDictionaryName()+ " ORDER BY denominazione"),
	FORNITORE("SELECT id, denominazione FROM "+Dictionary.FORNITORE.getDictionaryName()+ " ORDER BY denominazione"),
	VOCESPESA("SELECT id, capitoloid as parentid, denominazione FROM "+Dictionary.VOCESPESA.getDictionaryName()+ " ORDER BY denominazione"),
	;
	
	private static HashMap<String, CONTABILITADICTIONARYQUERY> _map = new  HashMap<>();
	
	static {
		_map.put(Dictionary.CAPITOLO.getDictionaryName(), CAPITOLO);
		_map.put(Dictionary.CONTRATTO.getDictionaryName(), CONTRATTO);
		_map.put(Dictionary.FORNITORE.getDictionaryName(), FORNITORE);
		_map.put(Dictionary.VOCESPESA.getDictionaryName(), VOCESPESA);
	}

	private String query;
	
	private CONTABILITADICTIONARYQUERY(String q) {
		query = q;
	}
	
	@Override
	public String getQuery() {
		return query;
	}

	@Override
	public QueryMapper getMapper() {
		return VOCESPESA.equals(this) ? new DictionaryWithParentMapper(): new DictionaryMapper();
	}

	public static PersistenceQuery getQueryByDictionaryName(String parameter) {
		return _map.get(parameter);
	}

}
