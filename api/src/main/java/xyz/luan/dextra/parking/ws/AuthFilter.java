package xyz.luan.dextra.parking.ws;

import com.google.api.client.util.Base64;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;

import io.yawp.commons.http.HttpException;
import xyz.luan.dextra.parking.models.account.ServiceAccount;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Objects;
import java.util.concurrent.ExecutionException;
import java.util.logging.Logger;

import static io.yawp.repository.Yawp.yawp;

public class AuthFilter extends HttpFilter {

	private final static Logger LOGGER = Logger.getLogger(AuthFilter.class.getName());

	@Override
	protected void filter(HttpServletRequest request, HttpServletResponse response) throws ExecutionException, InterruptedException {
		String authToken = request.getHeader("Authorization");
		LOGGER.info(String.format("Request received [url: %s][auth: %s]", request.getRequestURI(), authToken));

		if (Objects.nonNull(authToken)) {
			String[] parts = authToken.split(" ");
			if (parts.length != 2) {
				throw new HttpException(403, "The Authorization header must be of type: <method> <token>");
			}
			String method = parts[0];
			String idToken = parts[1];
			if (method.equals("Bearer")) {
				bearerLogin(idToken);
			} else if (method.equals("Plain")) {
				plainLogin(idToken);
			} else {
				throw new HttpException(403, "Unknown Authorization method, should be: Plain or Bearer.");
			}
		} else {
			AuthHolder.email.set(null);
		}
	}

	private void plainLogin(String idToken) {
		String[] userPass = new String(Base64.decodeBase64(idToken)).split(":");
		if (userPass.length != 2) {
			throw new HttpException(403, "The Plain token must be a base64 string of format <user>:<pass>.");
		}

		ServiceAccount acc = yawp(ServiceAccount.class).where("user", "=", userPass[0]).first();
		if (acc == null) {
			throw new HttpException(403, "Plain token decoded, user not found.");
		}
		if (!acc.getPassword().equals(userPass[1])) {
			throw new HttpException(403, "Plain token decoded, wrong password.");
		}

		String email = acc.getUser() + "@dextra-sw.com";
		LOGGER.info(String.format("Authenticated: Plain, [%s]", email));
		AuthHolder.email.set(email);
	}

	private void bearerLogin(String idToken) throws InterruptedException, ExecutionException {
		FirebaseToken decodedToken = getFirebase().verifyIdTokenAsync(idToken).get();
		if (!decodedToken.isEmailVerified()) {
			throw new HttpException(403, "You can only login with a verified e-mail!");
		}
		String email = decodedToken.getEmail();
		LOGGER.info(String.format("Authenticated: Bearer, [%s]", email));
		AuthHolder.email.set(email);
	}

	private static FirebaseAuth _auth;

	private static FirebaseAuth getFirebase() {
		if (_auth == null) {
			FirebaseOptions options = new FirebaseOptions.Builder().setProjectId("dextra-parking").setCredentials(GoogleCredentials.newBuilder().build()).build();
			FirebaseApp app = FirebaseApp.initializeApp(options);
			_auth = FirebaseAuth.getInstance(app);
		}
		return _auth;
	}
}
