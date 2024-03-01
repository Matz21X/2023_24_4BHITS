package at.htlhl.singletondemo;

/**
 * Usage example for a singleton implementation
 * <p>
 * Example demonstrates a single resource (e.g. a file) access
 */

public class ConfigAccessSingleton {
    private static ConfigAccessSingleton instance;

    /**
     * PRIVATE Constructor
     */
    private ConfigAccessSingleton() {

    }

    private static synchronized ConfigAccessSingleton getInsance() {
        if (instance == null){
            instance = new ConfigAccessSingleton();
        }
        return instance;
    }


}
