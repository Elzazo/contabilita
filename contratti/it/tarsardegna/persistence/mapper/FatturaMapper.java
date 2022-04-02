/**
 * 
 */
package it.tarsardegna.persistence.mapper;

import it.tarsardegna.model.Fattura;
import it.tarsardegna.model.Jsonable;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * @author elzaz
 *
 */
public class FatturaMapper implements QueryMapper{
	
	public List<Jsonable> getElements (ResultSet rs) {
		ArrayList<Jsonable> result = new ArrayList<>();
		try {
			while(rs.next()){
				Fattura f = new Fattura();
				f.setCapitolo(rs.getInt("capitolo"));
				f.setNumeroFattura(rs.getString("numero"));
				f.setImporto(rs.getFloat("importo"));
				f.setOggetto(rs.getString("oggetto"));
				f.setMese(rs.getString("mese"));
				f.setPrestazione(rs.getString("prestazione"));
				f.setDataSdi(rs.getDate("datasdi"));
				f.setScadenza(rs.getDate("scadenza"));
				f.setEsercizioSpesa(rs.getInt("eserciziospesa"));
				f.setVocespesa(rs.getString("vocespesa"));
				f.setFornitore(rs.getString("fornitore"));
				f.setContrattoDiscrezionale(rs.getString("contratto"));
				f.setNumeroDecreto(rs.getString("numerodecreto"));
				f.setDataDecreto(rs.getDate("datadecreto"));
				result.add(f);
			}
		} catch (SQLException e) {
			result.clear();
			e.printStackTrace();
		}
		
		return result;
		
	}

}
