package at.htlhl.singletondemo;

public class MyDingleton {
    private static MyDingleton instance;

    private MyDingleton(){
    }

    public static synchronized MyDingleton getInstance(){
        if (instance==null){
            instance = new MyDingleton();
        }
        return instance;
    }
}
