/**
 * 
 */
package it.tarsardegna.persistence;

import it.tarsardegna.mock.persistence.MockReadContratti;

/**
 * @author elzaz
 *
 */
public class ReadFattureFactory {
	
	public final static boolean test = true;
	
	public static ReadContrattiInterface getInterface() {
		if (test){
			return new MockReadContratti();
		}
		return null;
	}

}
