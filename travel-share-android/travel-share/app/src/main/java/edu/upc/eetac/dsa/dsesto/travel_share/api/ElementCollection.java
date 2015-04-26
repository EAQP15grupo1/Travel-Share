package edu.upc.eetac.dsa.dsesto.travel_share.api;

import java.util.ArrayList;
import java.util.List;

public class ElementCollection {
    private List<User> elements;

    public ElementCollection() {
        super();
        elements = new ArrayList<User>();
    }

    public List<User> getElements() {
        return elements;
    }

    public void setElements(List<User> elements) {
        this.elements = elements;
    }
}
