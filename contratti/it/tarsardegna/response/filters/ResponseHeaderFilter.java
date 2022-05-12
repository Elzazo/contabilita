package it.tarsardegna.response.filters;

import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class ResponseHeaderFilter implements Filter {

	private String[] headers = { "Cache-Control" };
	private String[] values = { "no-cache, no-store, must-revalidate, max-age=0"};
	
	@Override
	public void destroy() {
	}

	private void addHeaders(HttpServletRequest request, HttpServletResponse response) {
		System.out.println("Adding headers to response...");
		response.setBufferSize(0);
		for (int i = 0; i < headers.length; i++)
			response.setHeader(headers[i], values[i]);
	}
	
	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		System.out.println("Filtering the request...");
		if (response instanceof HttpServletResponse)
			addHeaders((HttpServletRequest) request, (HttpServletResponse) response);
		chain.doFilter(request, response);
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		System.out.println("Initialising response filter...");
	}

}
