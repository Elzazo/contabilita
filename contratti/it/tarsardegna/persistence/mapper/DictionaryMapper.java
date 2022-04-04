/**
 * 
 */
package it.tarsardegna.persistence.mapper;

import it.tarsardegna.model.Dictionary;
import it.tarsardegna.model.Jsonable;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * @author elzaz
 *
 */
public class DictionaryMapper implements QueryMapper {

	/* (non-Javadoc)
	 * @see it.tarsardegna.persistence.mapper.QueryMapper#getElements(java.sql.ResultSet)
	 */
	@Override
	public List<Jsonable> getElements(ResultSet rs) {
		List<Jsonable> result = new ArrayList<Jsonable>();
		if (rs != null){
			try {
				while (rs.next()){
					result.add(new Dictionary(rs.getInt("id"), rs.getString("denominazione")));					
				}
			} catch (SQLException e) {
				result.clear();
				e.printStackTrace();
			}
		}
		
		return result;
	}

}
