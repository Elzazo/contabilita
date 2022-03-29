package it.tarsardegna.constants;

public enum Contratto {
	
	CONTRATTO("Contratto"),
	DISCREZIONALE("Discrezionale");
	
	private String _val;
	
	private Contratto (String s){
		_val= s;
	}
	
	@Override
	public String toString() {
		return _val;
	}

}
