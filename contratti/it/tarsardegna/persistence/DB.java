/**
 * 
 */
package it.tarsardegna.persistence;

import it.tarsardegna.model.Jsonable;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * @author elzaz
 * 
 */
public class DB {

	private static final String POSTGRES_DRIVER = "org.postgresql.Driver";
	private static final String DB_URL = "jdbc:postgresql://127.0.0.1:5432/tarsardegna";
	private static final String DB_USER = "tarsardegna";
	private static final String DB_PASS = "Sardegna2022";

	private static boolean isConnected = false;
	private static HashMap<Schema, Connection> connections = new HashMap<Schema, Connection>();

	public static boolean initDB() {
		if (isConnected) {
			return true;
		}

		boolean connectionSuccessful = false;

		try {
			Class.forName(POSTGRES_DRIVER);
			for (Schema s : Schema.values()) {
				Connection conn = DriverManager.getConnection(DB_URL, DB_USER,
						DB_PASS);
				conn.setSchema(s.getSchemaName());
				connections.put(s, conn);
			}
			connectionSuccessful = true;

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		} finally {
			if (!connectionSuccessful) {
				System.err
						.println("Cannot connect to all schemas, will clean up...");
				for (Connection c : connections.values()) {
					try {
						c.close();
					} catch (SQLException e) {
						e.printStackTrace();
					}
				}
			}
		}

		isConnected = true;
		return true;
	}

	public static List<Jsonable> doQuery(Schema schema, PersistenceQuery query) {
		List<Jsonable> result = new ArrayList<>();
		if (schema != null && query != null) {
			initDB();
			Connection c = connections.get(schema);
			if (c != null) {
				try {
					PreparedStatement ps = c.prepareStatement(query.getQuery());
					if (ps.execute()) {
						result.addAll(query.getMapper().getElements(
								ps.getResultSet()));
					}
					ps.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

			}
		}
		return result;
	}

}
