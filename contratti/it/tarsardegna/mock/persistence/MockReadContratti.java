/**
 * 
 */
package it.tarsardegna.mock.persistence;

import java.util.Random;

import it.tarsardegna.mock.model.MockFatturaFactory;
import it.tarsardegna.persistence.fatture.ReadFattureInterface;
import it.tarsardegna.util.StringUtils;

/**
 * @author elzaz
 *
 */
public class MockReadContratti implements ReadFattureInterface{

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
		for (int i=0; i< elements - 1; i++){
			sb.append(MockFatturaFactory.getRandomFattura().toJson(2));
			sb.append(",");
			sb.append(System.lineSeparator());
		}
		sb.append(MockFatturaFactory.getRandomFattura().toJson(2));
		sb.append("\t]");
		sb.append(System.lineSeparator());
		sb.append("}");
		return sb.toString();
	}

}
