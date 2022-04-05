/**
 * 
 */
package it.tarsardegna.model;

/**
 * @author elzaz
 *
 */
public abstract class IntKey {
	private int key;
	
	IntKey(int key){
		this.key = key;
	}
	
	public int getKey(){
		return key;
	}
	
	public void setKey(int newKey){
		key = newKey;
	}

}
