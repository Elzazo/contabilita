/**
 * 
 */
package it.tarsardegna.constants;

import java.sql.Types;
import java.util.HashMap;

/**
 * @author elzaz
 * 
 */
public enum FatturaPropertyNames {

	ID("id", Types.INTEGER), CAPITOLO("capitolo", Types.INTEGER, "capitoloid"), NUMERO(
			"numero"), DATASDI("datasdi", Types.DATE), SCADENZA("scadenza",
			Types.DATE), ESERCIZIO("eserciziospesa", Types.INTEGER), IMPORTO("importo",
			Types.FLOAT), CONTRATTO("contratto", Types.INTEGER, "contrattoid"), FORNITORE(
			"fornitore", Types.INTEGER, "fornitoreid"), OGGETTO("oggetto"), PRESTAZIONE(
			"prestazione"), MESE("mese"), VOCEDISPESA("vocespesa",
			Types.INTEGER, "vocespesaid"), DECRETOSG("decretosg",
			Types.INTEGER, "decretoid"), DATADECRETO("datadecreto", Types.DATE);

	private String _name;
	private String _dbColumn;
	private int _type;

	private static HashMap<String, FatturaPropertyNames> _map = new HashMap<String, FatturaPropertyNames>();

	static {
		for (FatturaPropertyNames n : FatturaPropertyNames.values()) {
			_map.put(n._name, n);
		}
	}

	private static HashMap<String, FatturaPropertyNames> _colMap = new HashMap<String, FatturaPropertyNames>();

	static {
		for (FatturaPropertyNames n : FatturaPropertyNames.values()) {
			_colMap.put(n._dbColumn, n);
		}
	}

	private FatturaPropertyNames(String name, int type, String dbColumn) {
		_name = name;
		_dbColumn = dbColumn;
		_type = type;
	}

	private FatturaPropertyNames(String name, int type) {
		this(name, type, name);
	}

	private FatturaPropertyNames(String name) {
		this(name, Types.VARCHAR);
	}

	@Override
	public String toString() {
		return _name;
	}

	public int getType() {
		return _type;
	}

	public String getDbColumn() {
		return _dbColumn;
	}

	public static FatturaPropertyNames getFromName(String name) {
		return name == null ? null : _map.get(name);
	}

	public static FatturaPropertyNames getFromDbType(String dbColumn) {
		return dbColumn == null ? null : _colMap.get(dbColumn);
	}

}
