package edu.upc.eetac.dsa.dsesto.travel_share.api;

import android.content.Context;
import android.content.res.AssetManager;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

public class TravelShareAPI {
    private final static String TAG = TravelShareAPI.class.getName();
    private static TravelShareAPI instance = null;
    private URL url;

    private TravelShareRootAPI rootAPI = null;

    private TravelShareAPI(Context context) throws IOException, AppException {
        super();

        AssetManager assetManager = context.getAssets();
        Properties config = new Properties();
        config.load(assetManager.open("config.properties")); //Carga el asset creado "config.properties"
        String urlHome = config.getProperty("travelShare.home"); //Obtener la propiedad por su nombre
        url = new URL(urlHome);

        Log.d("LINKS", url.toString());
//        getRootAPI();
    }

    // Singleton
    public final static TravelShareAPI getInstance(Context context) throws AppException {
        if (instance == null)
            try {
                instance = new TravelShareAPI(context);
            } catch (IOException e) {
                throw new AppException(
                        "Can't load configuration file");
            }
        return instance;
    }

    private void getRootAPI() throws AppException {
        Log.d(TAG, "getRootAPI()");
        rootAPI = new TravelShareRootAPI(); //Instancia el model que pide la respuesta a "/"
        HttpURLConnection urlConnection = null; //cnx HTTP
        try {
            urlConnection = (HttpURLConnection) url.openConnection(); //Abrir cnx
            urlConnection.setRequestMethod("GET"); //Indicar método a usar
            urlConnection.setDoInput(true); //Declaras que vas a leer la respuesta
            urlConnection.connect(); //Hacer la petición
        } catch (IOException e) {
            throw new AppException(
                    "Can't connect to travelShare API Web Service");
        }

        BufferedReader reader; //Leer la respuesta
        try {
            reader = new BufferedReader(new InputStreamReader(
                    urlConnection.getInputStream()));
            StringBuilder sb = new StringBuilder();
            String line = null;
            while ((line = reader.readLine()) != null) {
                sb.append(line); //Guardar la respuesta en un StringBuilder (es un JSON)
            }

            JSONObject jsonObject = new JSONObject(sb.toString()); //Se procesa el JSON de respuesta
            JSONArray jsonLinks = jsonObject.getJSONArray("links");
            parseLinks(jsonLinks, rootAPI.getLinks());
        } catch (IOException e) {
            throw new AppException(
                    "Can't get response from travelShare API Web Service");
        } catch (JSONException e) {
            throw new AppException("Error parsing travelShare Root API");
        }
    }

    //Le pasamos un Array y un Mapa donde vamos a guardar los links
    private void parseLinks(JSONArray jsonLinks, Map<String, Link> map)
            throws AppException, JSONException {
        for (int i = 0; i < jsonLinks.length(); i++) {
            Link link = null;
            try {
                link = SimpleLinkHeaderParser
                        .parseLink(jsonLinks.getString(i));
            } catch (Exception e) {
                throw new AppException(e.getMessage());
            }
            String rel = link.getParameters().get("rel");
            String rels[] = rel.split("\\s"); //La rel del HATEOAS puede tener varios parámetros, ej: rel="create collection" (separadas por espacio)
            for (String s : rels) //En el mapa se guardan las rels y los titles
                map.put(s, link);
        }
    }

//    ---------------------------------------------------------------------------------------------------------------------------

    // Funciones de la API

    // Crear nuevo usuario
    public User createUser(String username, String nick, String nation, String email, String password) throws AppException {
        Log.d(TAG, "createUser()");
        User user = new User();
        user.setUsername(username);
        user.setNick(nick);
        user.setNation(nation);
        user.setEmail(email);
        user.setPassword(password);

        HttpURLConnection urlConnection = null;
        try {
            JSONObject jsonUser = createJsonUser(user);
            URL urlPostUsers = new URL("http://192.168.2.103:3000/users");
            urlConnection = (HttpURLConnection) urlPostUsers.openConnection();
            String mediaType = "application/json";
            urlConnection.setRequestProperty("Accept",
                    mediaType);
            urlConnection.setRequestProperty("Content-Type",
                    mediaType);
            urlConnection.setRequestMethod("POST");
            urlConnection.setDoInput(true);
            urlConnection.setDoOutput(true);
            urlConnection.connect();
            PrintWriter writer = new PrintWriter(
                    urlConnection.getOutputStream());
            writer.println(jsonUser.toString());
            writer.close();
            BufferedReader reader = new BufferedReader(new InputStreamReader(
                    urlConnection.getInputStream()));
            StringBuilder sb = new StringBuilder();
            String line = null;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
//            jsonUser = new JSONObject(sb.toString());

//            user.setUsername(jsonUser.getString("username"));

        } catch (JSONException e) {
            Log.e(TAG, e.getMessage(), e);
            throw new AppException("Error parsing response");
        } catch (IOException e) {
            Log.e(TAG, e.getMessage(), e);
            throw new AppException("Error getting response");
        } finally {
            if (urlConnection != null)
                urlConnection.disconnect();
        }

        return user;
    }

    // Crear JSON de un Usuario
    private JSONObject createJsonUser(User user) throws JSONException {
        JSONObject jsonUser = new JSONObject();
        jsonUser.put("username", user.getUsername());
        jsonUser.put("password", user.getPassword());
        jsonUser.put("nick", user.getNick());
        jsonUser.put("email", user.getEmail());
        jsonUser.put("nation", user.getNation());

        return jsonUser;
    }
}