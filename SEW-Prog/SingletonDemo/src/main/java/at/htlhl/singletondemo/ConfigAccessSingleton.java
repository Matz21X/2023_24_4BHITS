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


    /**
     * Create (once) and return the singleton instance
     *
     * Note the keywords static and synchronized (needed for thread safety)
     * @return
     */
    private static synchronized ConfigAccessSingleton getInsance() {
        if (instance == null){
            instance = new ConfigAccessSingleton();
        }
        return instance;
    }

    // Example methods to access methods in an image configuration file


}