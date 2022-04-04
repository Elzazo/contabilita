/**
 * 
 */
package it.tarsardegna.util;

import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

/**
 * @author elzaz
 * 
 */
public class StringUtils {

	private static SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
	private static NumberFormat df = NumberFormat.getNumberInstance(new Locale(
			"it", "IT"));
	static {
		df.setMinimumFractionDigits(2);
		df.setMaximumFractionDigits(2);
	}

	public static String jsonifyPropertyName(String property) {
		return property == null ? "" : "\"" + property + "\"";
	}

	public static String jsonifyPropertyValue(Object value) {
		if (value == null) {
			return "null";
		}

		if (value instanceof String) {
			return jsonifyPropertyName(value.toString());
		}

		if (value instanceof Integer) {
			return jsonifyPropertyName(value.toString());
		}

		if (value instanceof Float) {
			return jsonifyPropertyValue(df.format(value)); // raw numbers not
															// allowed
		}

		if (value instanceof Date) {
			return jsonifyPropertyName(sdf.format(value));
		}

		// unhandled objects will return null
		return null;
	}

	public static void addPropertyAndValueToStringBuilder(String property,
			Object value, StringBuilder sb, boolean addComma) {
		sb.append(StringUtils.jsonifyPropertyName(property));
		sb.append(" : ");
		sb.append(StringUtils.jsonifyPropertyValue(value));
		if (addComma) {
			sb.append(",");
		}
		sb.append(System.lineSeparator());
	}

	public static String getTabs(int tabs) {
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < tabs; i++) {
			sb.append("\t");
		}
		return sb.toString();
	}

}
