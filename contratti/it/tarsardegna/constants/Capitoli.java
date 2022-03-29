/**
 * 
 */
package it.tarsardegna.constants;

/**
 * @author elzaz
 *
 */
public enum Capitoli {
	
	_2287(2287, "2287"),
	_2288(2288, "2288"),
	_2291(2291, "2291"),
	_2292(2292, "2292"),
	_2293(2293, "2293"),
	_2294(2294, "2294"),
	_2297(2297, "2297"),
	_2298(2298, "2298"),
	_2301(2301, "2301"),
	_2302(2302, "2302"),
	_2303(2303, "2303"),
	_5250(5250, "5250"),
	_5251(5251, "5251"),
	_5252(5252, "5252"),
	_5253(5253, "5253");
	
	
	private int numCapitolo;
	private String descCapitolo;
	
	private Capitoli(int cap, String descCap){
		numCapitolo = cap;
		descCapitolo = descCap;
	}
	
	public int getNumeroCapitolo() { return numCapitolo; }
	public String getDescCapitolo() { return descCapitolo;}

}
