/**
 * 
 */
package it.tarsardegna;

import it.tarsardegna.model.Jsonable;
import it.tarsardegna.persistence.CONTABILITADICTIONARYQUERY;
import it.tarsardegna.persistence.DB;
import it.tarsardegna.persistence.Schema;

import java.io.IOException;
import java.io.PrintStream;
import java.io.Writer;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author elzaz
 * 
 */
@WebServlet(description = "Allows to read a dictionary from the Database", urlPatterns = { "/ReadDictionary" })
public class ReadDictionary extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2941197916027756950L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		PrintStream ps = new PrintStream(resp.getOutputStream());
		List<Jsonable> dictionaryContent = DB.doQuery(Schema.CONTABILITA,
				CONTABILITADICTIONARYQUERY.getQueryByDictionaryName(req
						.getParameter("dictionary")));
		ps.println("{");
		ps.println("    \"result\": [");
		if (dictionaryContent.size() > 0) {
			for (int i = 0; i < dictionaryContent.size() - 1; i++) {
				Jsonable j = dictionaryContent.get(i);
				ps.print(j.toJson());
				ps.println(",");
			}
			ps.println(dictionaryContent.get(dictionaryContent.size() - 1).toJson());
		}
		ps.println("    ]");
		ps.println("}");
		ps.close();
	}

}
