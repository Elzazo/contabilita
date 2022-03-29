/**
 * 
 */
package it.tarsardegna.mock.persistence;

import java.util.Random;

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
		final int elements = Math.abs(new Random().nextInt(1000));
		for (int i=0; i< elements; i++){
			sb.append(MockFatturaFactory.getRandomFattura().toJson(i + 1!= elements));
		}
		sb.append("\t]");
		sb.append(System.lineSeparator());
		sb.append("}");
		return sb.toString();
	}

}
