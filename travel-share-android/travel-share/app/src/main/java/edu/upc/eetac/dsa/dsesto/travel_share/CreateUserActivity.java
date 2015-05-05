package edu.upc.eetac.dsa.dsesto.travel_share;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import edu.upc.eetac.dsa.dsesto.travel_share.api.AppException;
import edu.upc.eetac.dsa.dsesto.travel_share.api.TravelShareAPI;
import edu.upc.eetac.dsa.dsesto.travel_share.api.User;

public class CreateUserActivity extends Activity {
    private final static String TAG = CreateUserActivity.class.getName();

    private class createUserTask extends AsyncTask<String, Void, User> {
        private ProgressDialog pd;

        @Override
        protected User doInBackground(String... params) {
            User user = new User();
            try {
                user = TravelShareAPI.getInstance(CreateUserActivity.this).createUser(params[0], params[1], params[2], params[3], params[4]);
            } catch (AppException e) {
                e.printStackTrace();
            }
            return user;
        }

        @Override
        protected void onPostExecute(User result) {
            Context context = getApplicationContext();
            CharSequence text = "Usuario creado correcatmente\nPuedes iniciar sesión";
            int duration = Toast.LENGTH_SHORT;

            Toast toast = Toast.makeText(context, text, duration);
            toast.setGravity(Gravity.CENTER, 0, 0);
            toast.show();
            finish();

            if (pd != null) {
                pd.dismiss();
            }
        }

        @Override
        protected void onPreExecute() {
            pd = new ProgressDialog(CreateUserActivity.this);
            pd.setTitle("Buscando...");
            pd.setCancelable(false);
            pd.setIndeterminate(true);
            pd.show();
        }

    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.create_user_layout);
    }

    public void createUser(View v) {
        EditText etUsername = (EditText) findViewById(R.id.etCreateUserUsername);
        EditText etNick = (EditText) findViewById(R.id.etCreateUserNick);
        EditText etNation = (EditText) findViewById(R.id.etCreateUserNation);
        EditText etEmail = (EditText) findViewById(R.id.etCreateUserEmail);
        EditText etPassword = (EditText) findViewById(R.id.etCreateUserPassword);
        EditText etPassword2 = (EditText) findViewById(R.id.etCreateUserPassword2);

        String username = etUsername.getText().toString();
        String nick = etNick.getText().toString();
        String nation = etNation.getText().toString();
        String email = etEmail.getText().toString();
        String password = etPassword.getText().toString();
        String password2 = etPassword2.getText().toString();

        if ((username.equals("")) || (nick.equals("")) || (email.equals("")) || (nation.equals("")) || (password.equals("")) || (password2.equals(""))) {
            Context context = getApplicationContext();
            CharSequence text = "Todos los campos son obligatorios";
            int duration = Toast.LENGTH_SHORT;

            Toast toast = Toast.makeText(context, text, duration);
            toast.setGravity(Gravity.CENTER, 0, 0);
            toast.show();
        } else if (!password.equals(password2)) {
            Context context = getApplicationContext();
            CharSequence text = "Las contraseñas no coinciden";
            int duration = Toast.LENGTH_SHORT;

            Toast toast = Toast.makeText(context, text, duration);
            toast.setGravity(Gravity.CENTER, 0, 0);
            toast.show();
        } else if (username.length() > 20) {
            Context context = getApplicationContext();
            CharSequence text = "El username es demasiado largo";
            int duration = Toast.LENGTH_SHORT;

            Toast toast = Toast.makeText(context, text, duration);
            toast.setGravity(Gravity.CENTER, 0, 0);
            toast.show();
        } else {
            (new createUserTask()).execute(username, nick, nation, email, password);
        }
    }
}