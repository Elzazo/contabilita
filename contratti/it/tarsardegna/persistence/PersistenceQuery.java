/**
 * 
 */
package it.tarsardegna.persistence;

import it.tarsardegna.persistence.mapper.QueryMapper;

/**
 * @author elzaz
 *
 */
public interface PersistenceQuery {
	
	public String getQuery();
	public QueryMapper getMapper();

}
