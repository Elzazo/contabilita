/**
 * 
 */
package it.tarsardegna.persistence.fatture;

import it.tarsardegna.mock.persistence.MockReadContratti;

/**
 * @author elzaz
 *
 */
public class ReadFattureFactory {
	
	public final static boolean test = false;
	
	public static ReadFattureInterface getInterface() {
		if (test){
			return new MockReadContratti();
		}
		return new ReadFattureFromDB();
	}

}
