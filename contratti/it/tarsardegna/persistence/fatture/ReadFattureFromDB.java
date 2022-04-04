/**
 * 
 */
package it.tarsardegna.persistence.fatture;

import it.tarsardegna.model.Jsonable;
import it.tarsardegna.persistence.CONTABILITAQUERY;
import it.tarsardegna.persistence.DB;
import it.tarsardegna.persistence.Schema;
import it.tarsardegna.util.StringUtils;

import java.util.List;

/**
 * @author elzaz
 * 
 */
public class ReadFattureFromDB implements ReadFattureInterface {

	@Override
	public String getFatture() {
		if (DB.initDB()) {
			List<Jsonable> res = DB.doQuery(Schema.CONTABILITA,
					CONTABILITAQUERY.MAIN_QUERY);
			if (res.isEmpty()) {
				return "{ \"result\" : [] }";
			} else {
				StringBuilder sb = new StringBuilder();
				sb.append("{");
				sb.append(System.lineSeparator());
				sb.append("\t");
				sb.append(StringUtils.jsonifyPropertyName("result"));
				sb.append(": [");
				sb.append(System.lineSeparator());
				for (int i = 0; i < res.size()-1; i++) {
					Jsonable j = res.get(i);
					sb.append(j.toJson());
					sb.append(",");
					sb.append(System.lineSeparator());
				}
				sb.append(res.get(res.size()-1).toJson());
				sb.append(System.lineSeparator());
				sb.append("\t]");
				sb.append(System.lineSeparator());
				sb.append("}");
				return sb.toString();
			}
		}
		return null;
	}

}
