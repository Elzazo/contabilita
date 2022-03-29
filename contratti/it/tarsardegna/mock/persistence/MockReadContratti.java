/**
 * 
 */
package it.tarsardegna.mock.persistence;

import it.tarsardegna.mock.model.MockFatturaFactory;
import it.tarsardegna.persistence.ReadContrattiInterface;
import it.tarsardegna.util.StringUtils;

/**
 * @author elzaz
 *
 */
public class MockReadContratti implements ReadContrattiInterface{

	@Override
	public String getFatture() {
		StringBuilder sb = new StringBuilder();
		sb.append("{");
		sb.append(System.lineSeparator());
		sb.append("\t");
		sb.append(StringUtils.jsonifyPropertyName("result"));
		sb.append(": [");
		sb.append(System.lineSeparator());
		for (int i=0; i<5; i++){
			sb.append(MockFatturaFactory.getRandomFattura().toJson(i + 1!= 5));
		}
		sb.append("\t]");
		sb.append(System.lineSeparator());
		sb.append("}");
		return sb.toString();
	}

}
