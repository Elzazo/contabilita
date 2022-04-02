/**
 * 
 */
package it.tarsardegna.mock.model;

import it.tarsardegna.constants.Capitoli;
import it.tarsardegna.constants.Contratto;
import it.tarsardegna.model.Fattura;

import java.util.Calendar;
import java.util.Random;

/**
 * @author elzaz
 * 
 */
public class MockFatturaFactory {

	public static Fattura getRandomFattura() {
		Fattura f = new Fattura();
		{
			// getting a random index for capitoli
			int idx = new Random().nextInt() % Capitoli.values().length;
			idx = idx < 0 ? 0 : idx;
			f.setCapitolo(Capitoli.values()[idx].getNumeroCapitolo());
		}

		{
			f.setNumeroFattura("" + Math.abs(new Random().nextInt() % 1000));
		}

		{
			f.setImporto(Math.abs(new Random().nextFloat() * 100000 % 100000));
		}

		{
			f.setFornitore("Test fornitore");
		}

		{

			int idx = new Random().nextInt() % 2;
			idx = idx < 0 ? 0 : idx;
			f.setContrattoDiscrezionale(Contratto.values()[idx].toString());
		}

		{
			f.setNumeroDecreto("" + Math.abs(new Random().nextInt() % 1000));
		}

		{
			Calendar c = Calendar.getInstance();
			c.add(Calendar.DAY_OF_YEAR, new Random().nextInt(32));
			f.setDataDecreto(c.getTime());
		}

		return f;
	}
}
