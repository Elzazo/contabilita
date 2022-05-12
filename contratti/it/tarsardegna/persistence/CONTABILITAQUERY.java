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
			+ "FROM fattura f "
			+ "LEFT JOIN fornitore forn ON forn.id = f.fornitoreid "
			+ "LEFT JOIN decreto d ON f.decretoid = d.id "
			+ "LEFT JOIN capitolo cap ON cap.id = f.capitoloid "
			+ "LEFT JOIN contratto contr ON contr.id = f.contrattoId "
			+ "LEFT JOIN vocespesa vs ON vs.id = f.vocespesaid "
			+ "WHERE NOT f.annullato;", new FatturaMapper()),
	GENERAL_FATTURA_UPDATE_QUERY("UPDATE fattura SET "+DB.updatePattern+ " = ? WHERE id = ?", null),
	FATTURA_CAPITOLO_UPDATE_QUERY("UPDATE fattura SET capitoloid = ?, vocespesaid=NULL WHERE id = ?", null),
	FATTURA_DATADECRETO_UPDATE_QUERY("UPDATE decreto SET datadecreto = ?  WHERE id IN (SELECT f.decretoid FROM fattura f WHERE f.id = ?)", null),
	FATTURA_NULL_VOCESPESA_UPDATE_QUERY("UPDATE fattura "
			+ "SET vocespesaid = s.voceid "
			+ "FROM ("
			+ "	SELECT v.id AS voceid, v.capitoloid AS capid "
			+ "FROM vocespesa v "
			+ "WHERE v.denominazione = 'Nessuna voce spesa') s "
			+ "WHERE vocespesaid IS NULL AND capitoloid = s.capid", null),
	DELETE_FATTURA_QUERY("UPDATE fattura SET annullato = true WHERE id = ?", null);
	
	
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
