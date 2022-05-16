/**
 * 
 */
package it.tarsardegna.persistence;

import it.tarsardegna.constants.FatturaPropertyNames;
import it.tarsardegna.model.Jsonable;

import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

/**
 * @author elzaz
 * 
 */
public class DB {

	private static final String POSTGRES_DRIVER = "org.postgresql.Driver";
	private static final String DB_URL = "jdbc:postgresql://127.0.0.1:5432/tarsardegna";
	private static final String DB_USER = "tarsardegna";
	private static final String DB_PASS = "Sardegna2022";

	public static final String updatePattern = "######";

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
				Connection conn = createConnectionBySchema(s);
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

	public static int cloneFattura(Schema schema, Map<String, String[]> map) {
		if (map != null) {
			if (map.containsKey("id")) {
				int id = Integer.parseInt(map.get("id")[0]);
				initDB();
				Connection c = connections.get(schema);
				try {
					PreparedStatement ps = c
							.prepareStatement(CONTABILITAQUERY.CLONE_FATTURA_QUERY
									.getQuery());
					ps.setInt(1, id);
					ps.execute();
					c.commit();
					ResultSet rs = ps.getResultSet();
					while (rs.next()) {
						return ps.getResultSet().getInt(1);
					}
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		return -1;
	}

	public static boolean deleteFattura(Schema schema, Map<String, String[]> map) {
		if (map != null) {
			if (map.containsKey("id")) {
				int id = Integer.parseInt(map.get("id")[0]);
				initDB();
				Connection c = connections.get(schema);
				try {
					PreparedStatement ps = c
							.prepareStatement(CONTABILITAQUERY.DELETE_FATTURA_QUERY
									.getQuery());
					ps.setInt(1, id);
					ps.execute();
					c.commit();
					ps.close();
					return true;
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		return false;
	}
	
	public static int addFornitore(Schema contabilita,
			Map<String, String[]> map) {
		if (map != null){
			if(map.containsKey("denominazione")){
				String newName = map.get("denominazione")[0];
				Connection c = connections.get(contabilita);
				try {
					PreparedStatement ps = c.prepareStatement(CONTABILITAQUERY.INSERT_FORNITORE_QUERY.getQuery());
					ps.setString(1, newName);
					ps.execute();
					c.commit();
					ResultSet rs = ps.getResultSet();
					while(rs.next()){
						int res = rs.getInt(1);
						rs.close();
						ps.close();
						return res;
					}
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		
		return -1;
	}

	public static boolean updateFattura(Schema schema, Map<String, String[]> map) {
		if (map != null) {
			if (map.containsKey("id")) {
				int id = Integer.parseInt(map.get("id")[0]);
				initDB();
				Connection c = connections.get(schema);
				for (Entry<String, String[]> es : map.entrySet()) {
					FatturaPropertyNames pn = FatturaPropertyNames
							.getFromName(es.getKey());
					if (pn == null) {
						System.err.println("cannot locate property name for "
								+ es.getKey());
						return false;
					}
					String sql = FatturaPropertyNames.CAPITOLO.equals(pn) ? CONTABILITAQUERY.FATTURA_CAPITOLO_UPDATE_QUERY
							.getQuery()
							: FatturaPropertyNames.DATADECRETO.equals(pn) ? CONTABILITAQUERY.FATTURA_DATADECRETO_UPDATE_QUERY
									.getQuery()
									: CONTABILITAQUERY.GENERAL_FATTURA_UPDATE_QUERY
											.getQuery().replaceAll(
													DB.updatePattern,
													pn.getDbColumn());
					PreparedStatement ps = null;
					try {
						ps = c.prepareStatement(sql);

						if (Types.VARCHAR == pn.getType()) {
							ps.setString(1, es.getValue()[0]);
						} else if (Types.INTEGER == pn.getType()) {
							ps.setInt(1, Integer.parseInt(es.getValue()[0]));
						} else if (Types.FLOAT == pn.getType()) {
							ps.setFloat(1, Float.parseFloat(es.getValue()[0]));
						} else if (Types.DATE == pn.getType()) {
							ps.setDate(1, new Date(new SimpleDateFormat(
									"yyyy-MM-dd").parse(es.getValue()[0])
									.getTime()));
						}

						ps.setInt(2, id);
						ps.execute();

						if (FatturaPropertyNames.CAPITOLO.equals(pn)) {
							ps = c.prepareStatement(CONTABILITAQUERY.FATTURA_NULL_VOCESPESA_UPDATE_QUERY
									.getQuery());
							ps.execute();
						}
					} catch (SQLException e) {
						try {
							if (ps != null) {
								ps.close();
							}
							closeConnectionAndRenew(c, schema);
						} catch (Exception e1) {
							// TODO Auto-generated catch block
							e1.printStackTrace();
						}
						e.printStackTrace();
						return false;
					} catch (ParseException e) {
						System.err.println("Error parsing date");
						try {
							if (ps != null) {
								System.err
										.println("The following update has not been executed: "
												+ sql);
								ps.close();
							}
							System.err.println("Prepared statement closed.");
							closeConnectionAndRenew(c, schema);
							System.err
									.println("Transaction has been rolled back.");
						} catch (SQLException e1) {
							// TODO Auto-generated catch block
							e1.printStackTrace();
						}
						return false;
					}
				}
				try {
					c.commit();
				} catch (SQLException e) {
					System.err.println("Error committing");
					return false;
				}
			}
		}
		return true;
	}

	private static Connection createConnectionBySchema(Schema s)
			throws SQLException {
		Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS);
		conn.setAutoCommit(false);
		conn.setSchema(s.getSchemaName());
		return conn;
	}

	private static void closeConnectionAndRenew(Connection c, Schema schema) {
		if (c != null && schema != null) {
			System.out.println("Renewing connection for schema "
					+ schema.getSchemaName());
			try {
				c.rollback();
				c.close();
				connections.put(schema, createConnectionBySchema(schema));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

	}

	
}
