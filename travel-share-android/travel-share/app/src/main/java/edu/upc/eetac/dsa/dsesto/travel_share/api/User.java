package edu.upc.eetac.dsa.dsesto.travel_share.api;

import java.util.ArrayList;
import java.util.List;

public class User {
    private String username;
    private String password;
    private String nick;
    private String email;
    private String nation;
    private boolean loginSuccessful;
    private List<Element> needs;
    private List<Element> offers;

    public User() {
        super();
        needs = new ArrayList<Element>();
        offers = new ArrayList<Element>();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNick() {
        return nick;
    }

    public void setNick(String nick) {
        this.nick = nick;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNation() {
        return nation;
    }

    public void setNation(String nation) {
        this.nation = nation;
    }

    public boolean isLoginSuccessful() {
        return loginSuccessful;
    }

    public void setLoginSuccessful(boolean loginSuccessful) {
        this.loginSuccessful = loginSuccessful;
    }

    public List<Element> getNeeds() {
        return needs;
    }

    public void setNeeds(List<Element> needs) {
        this.needs = needs;
    }

    public List<Element> getOffers() {
        return offers;
    }

    public void setOffers(List<Element> offers) {
        this.offers = offers;
    }
}
