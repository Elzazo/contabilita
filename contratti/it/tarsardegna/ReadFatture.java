package it.tarsardegna;

import it.tarsardegna.persistence.ReadContrattiInterface;
import it.tarsardegna.persistence.ReadFattureFactory;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class ReadContratti
 */
@WebServlet(description = "Allows to read Contratti from the Database", urlPatterns = { "/ReadContratti" })
public class ReadFatture extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ReadFatture() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		ReadContrattiInterface readFatture = ReadFattureFactory.getInterface();
		String res = readFatture.getFatture();
		System.out.println(res);
		response.getWriter().println(res);
		response.getWriter().flush();
	}

}
