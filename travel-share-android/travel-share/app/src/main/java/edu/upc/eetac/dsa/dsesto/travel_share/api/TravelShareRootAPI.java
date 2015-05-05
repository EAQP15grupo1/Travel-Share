package edu.upc.eetac.dsa.dsesto.travel_share.api;

import java.util.HashMap;
import java.util.Map;

public class TravelShareRootAPI {

    private Map<String, Link> links;

    public TravelShareRootAPI() {
        links = new HashMap<String, Link>();
    }

    public Map<String, Link> getLinks() {
        return links;
    }

}