package at.htlhl.singletondemo;

public class MyDingleton {
    private static MyDingleton instance;
    private String geischi;

    private MyDingleton(String geischi){
        this.geischi = geischi;
    }

    public static synchronized MyDingleton getInstance(String geischi){
        if (instance==null){
            instance = new MyDingleton(geischi);
        }

        return instance;
    }

}
