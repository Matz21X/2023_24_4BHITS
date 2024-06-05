package at.htlhl.ccc;

import java.util.HashMap;
import java.util.Map;

public class MapDemo {

    public MapDemo() {

        // Create a HashMap object called capitalCityMap
        Map<String, String> capitalCityMap = new HashMap<String, String>();

        // Add keys and values (Country, City)
        capitalCityMap.put("England", "London");
        capitalCityMap.put("France", "Paris");
        capitalCityMap.put("Germany", "Berlin");
        capitalCityMap.put("USA", "Washington DC");

        System.out.println("Size: " + capitalCityMap.size());

        // Access single entry
        String capitalOfEngland = capitalCityMap.get("England");
        System.out.println("Capital of England: " + capitalOfEngland);

        // Remove an entry
        System.out.println("Remove an entry ...");
        capitalCityMap.remove("England");
        System.out.println("Size: " + capitalCityMap.size());

        // Loop through a Map
        System.out.println("Output map entries: ");
        for (String key : capitalCityMap.keySet()) {
            System.out.println("   Key: " + key + ", Value: " + capitalCityMap.get(key));
        }

        // Clear Map
        System.out.println("Clear Map ...");
        capitalCityMap.clear();
        System.out.println("Size: " + capitalCityMap.size());
    }



    public static void main(String[] args) {
        new MapDemo();
    }
}