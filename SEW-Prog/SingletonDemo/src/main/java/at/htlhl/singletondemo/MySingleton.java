package at.htlhl.singletondemo;

public class MySingleton(){
    private static MySingleton instance;
    private MySingleton() {}

    public static synchronized MySingleton getInstance(){
        if (instance == null){
            instance = new MySingleton();
        }
        return instance;
    }

    // Other Methods

    public int getValue(){
        
    }
}