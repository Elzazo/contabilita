package it.tarsardegna.model;

import it.tarsardegna.constants.FatturaPropertyNames;
import it.tarsardegna.util.StringUtils;

import java.util.Date;

public class Fattura {

	private int capitolo;
	private String numeroFattura;
	private Date dataFattura;
	private float importo;
	private String fornitore;
	private String contrattoDiscrezionale;
	private String numeroDecreto;
	private Date dataDecreto;

	public Fattura() {
	}

	public Fattura(int capitolo, String numeroFattura, Date dataFattura,
			float importo, String fornitore, String contrattoDiscrezionale,
			String numeroDecreto, Date dataDecreto) {
		this.capitolo = capitolo;
		this.numeroFattura = numeroFattura;
		this.dataFattura = dataFattura;
		this.importo = importo;
		this.fornitore = fornitore;
		this.contrattoDiscrezionale = contrattoDiscrezionale;
		this.numeroDecreto = numeroDecreto;
		this.dataDecreto = dataDecreto;
	}

	public int getCapitolo() {
		return capitolo;
	}

	public void setCapitolo(int capitolo) {
		this.capitolo = capitolo;
	}

	public String getNumeroFattura() {
		return numeroFattura;
	}

	public void setNumeroFattura(String numeroFattura) {
		this.numeroFattura = numeroFattura;
	}

	public Date getDataFattura() {
		return dataFattura;
	}

	public void setDataFattura(Date dataFattura) {
		this.dataFattura = dataFattura;
	}

	public float getImporto() {
		return importo;
	}

	public void setImporto(float importo) {
		this.importo = importo;
	}

	public String getFornitore() {
		return fornitore;
	}

	public void setFornitore(String fornitore) {
		this.fornitore = fornitore;
	}

	public String getContrattoDiscrezionale() {
		return contrattoDiscrezionale;
	}

	public void setContrattoDiscrezionale(String contrattoDiscrezionale) {
		this.contrattoDiscrezionale = contrattoDiscrezionale;
	}

	public String getNumeroDecreto() {
		return numeroDecreto;
	}

	public void setNumeroDecreto(String numeroDecreto) {
		this.numeroDecreto = numeroDecreto;
	}

	public Date getDataDecreto() {
		return dataDecreto;
	}

	public void setDataDecreto(Date dataDecreto) {
		this.dataDecreto = dataDecreto;
	}

	public String toJson(boolean addComma) {

		StringBuilder sb = new StringBuilder();
		sb.append("\t\t{");
		sb.append(System.lineSeparator());
		
		sb.append("\t\t\t");
		StringUtils.addPropertyAndValueToStringBuilder(
				FatturaPropertyNames.CAPITOLO.toString(), capitolo, sb, true);
		sb.append("\t\t\t");
		StringUtils.addPropertyAndValueToStringBuilder(
				FatturaPropertyNames.FATTURA.toString(), numeroFattura, sb,
				true);
		sb.append("\t\t\t");
		StringUtils.addPropertyAndValueToStringBuilder(
				FatturaPropertyNames.DATAFATTURA.toString(), dataFattura, sb,
				true);
		sb.append("\t\t\t");
		StringUtils.addPropertyAndValueToStringBuilder(
				FatturaPropertyNames.IMPORTO.toString(), importo, sb, true);
		sb.append("\t\t\t");
		StringUtils.addPropertyAndValueToStringBuilder(
				FatturaPropertyNames.FORNITORE.toString(), fornitore, sb, true);
		sb.append("\t\t\t");
		StringUtils.addPropertyAndValueToStringBuilder(
				FatturaPropertyNames.CONTRATTO.toString(),
				contrattoDiscrezionale, sb, true);
		sb.append("\t\t\t");
		StringUtils.addPropertyAndValueToStringBuilder(
				FatturaPropertyNames.DECRETOSG.toString(), numeroDecreto, sb,
				true);
		sb.append("\t\t\t");
		StringUtils.addPropertyAndValueToStringBuilder(
				FatturaPropertyNames.DATADECRETO.toString(), dataDecreto, sb,
				false);

		sb.append("\t\t}");
		if (addComma){
			sb.append(",");
		}
		sb.append(System.lineSeparator());
		return sb.toString();
	}
	
	public String toJson() {
		return toJson(false);
	}

}
