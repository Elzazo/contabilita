package it.tarsardegna.persistence.mapper;

import it.tarsardegna.model.Jsonable;

import java.sql.ResultSet;
import java.util.List;

public interface QueryMapper {
	
	public List<Jsonable> getElements(ResultSet rs); 

}
