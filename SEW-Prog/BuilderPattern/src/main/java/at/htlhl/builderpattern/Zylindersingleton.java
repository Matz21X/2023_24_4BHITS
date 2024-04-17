package at.htlhl.builderpattern;

import java.util.EnumSet;

public class Zylindersingleton {

    public static Zylindersingleton instance;
    private String data;

    private Zylindersingleton(String data){
        this.data = data;
    }

    public static synchronized Zylindersingleton getInstance(String data){
        if (instance == null){
            instance = new Zylindersingleton(data);
        }
        return instance;
    }

}
