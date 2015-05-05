package edu.upc.eetac.dsa.dsesto.travel_share;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.widget.EditText;

import edu.upc.eetac.dsa.dsesto.travel_share.api.User;

public class LoginActivity extends Activity {
    private final static String TAG = LoginActivity.class.getName();
    User user = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "onCreate()");
        requestWindowFeature(Window.FEATURE_NO_TITLE); //No enseña la barra superior

        setContentView(R.layout.login_layout);
    }

    public void register(View v) {
        Intent intent = new Intent(this, CreateUserActivity.class);
        startActivity(intent);
    }

    public void signIn(View v) {
        EditText etUsername = (EditText) findViewById(R.id.etUsername);
        EditText etPassword = (EditText) findViewById(R.id.etPassword);

        final String username = etUsername.getText().toString();
        final String password = etPassword.getText().toString();

        if (username != "" && password != "") {
            startuTrollActivity();
        }
    }

    private void startuTrollActivity() {
//        String urlUser = user.getLinks().get("self").getTarget();

        Intent intent = new Intent(this, MainActivity.class);
//        intent.putExtra("url", urlUser);
        startActivity(intent);
        finish(); //Botón "back" no vuelve a esta Activity
    }
}