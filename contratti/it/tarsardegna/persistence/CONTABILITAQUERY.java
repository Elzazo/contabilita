/**
 * 
 */
package it.tarsardegna.persistence;

import it.tarsardegna.persistence.mapper.FatturaMapper;
import it.tarsardegna.persistence.mapper.QueryMapper;

/**
 * @author elzaz
 * 
 */
public enum CONTABILITAQUERY implements PersistenceQuery{

	
	MAIN_QUERY(
			"SELECT f.id, cap.denominazione AS capitolo, f.numero, "
			+ "f.importo, f.oggetto, f.mese, f.prestazione, f.datasdi AS datasdi, "
			+ "f.scadenza, f.eserciziospesa, vs.denominazione as vocespesa, forn.denominazione AS fornitore,"
			+ " contr.denominazione AS contratto, d.id AS numerodecreto ,d.datadecreto "
			+ "FROM fattura f, fornitore forn, decreto d, capitolo cap, contratto contr, vocespesa vs "
			+ "WHERE forn.id = f.fornitoreid AND f.decretoid = d.id AND cap.id = f.capitoloid "
			+ "AND contr.id = f.contrattoId AND vs.id = f.vocespesaid;", new FatturaMapper()),
	GENERAL_FATTURA_UPDATE_QUERY("UPDATE fattura SET "+DB.updatePattern+ " = ? WHERE id = ?", null),
	FATTURA_CAPITOLO_UPDATE_QUERY("UPDATE fattura SET capitoloid = ?, vocespesaid=NULL WHERE id = ?", null),
	FATTURA_NULL_VOCESPESA_UPDATE_QUERY("UPDATE fattura f SET f.vocespesaid = s.id FROM vocespesa s WHERE f.vocespesaid IS NULL AND f.capitoloid = s.capitoloid AND s.denominazione = 'Nessuna voce spesa'", null);
	
	private String query;
	private QueryMapper mapper;

	private CONTABILITAQUERY(String s, QueryMapper map) {
		query = s;
		mapper = map;
	}

	public String getQuery() {
		return query;
	}
	
	public QueryMapper getMapper() {
		return mapper;
	}

}
