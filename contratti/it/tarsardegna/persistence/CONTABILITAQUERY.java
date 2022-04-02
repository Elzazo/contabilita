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
			"SELECT cap.denominazione AS capitolo, f.numero, "
			+ "f.importo, f.oggetto, f.mese, f.prestazione, f.datasdi AS datasdi, "
			+ "f.scadenza, f.eserciziospesa, vs.denominazione as vocespesa, forn.denominazione AS fornitore,"
			+ " contr.denominazione AS contratto, d.id AS numerodecreto ,d.datadecreto "
			+ "FROM fattura f, fornitore forn, decreto d, capitolo cap, contratto contr, vocespesa vs "
			+ "WHERE forn.id = f.fornitoreid AND f.decretoid = d.id AND cap.id = f.capitoloid "
			+ "AND contr.id = f.contrattoId AND vs.id = f.vocespesaid;", new FatturaMapper());

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
