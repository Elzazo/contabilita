/**
 * 
 */
package it.tarsardegna;

import it.tarsardegna.persistence.DB;
import it.tarsardegna.persistence.Schema;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author elzaz
 *
 */
@WebServlet(description = "Allows to read clone fatture in the Database", urlPatterns = { "/CloneFatture" })
public class CloneFatture extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 580307897889073084L;
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("text");
		resp.getOutputStream().print(DB.cloneFattura(Schema.CONTABILITA, req.getParameterMap()));
		resp.getOutputStream().flush();		
	}

}
