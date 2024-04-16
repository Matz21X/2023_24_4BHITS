package at.htlhl.builderpattern;

public class Bike {
    private final String brand;
    private final String model;
    private final int horsepower;
    private final float torque;

    private Bike(BikeBuilder builder){
        this.brand = builder.brand;
        this.model = builder.model;
        this.horsepower = builder.horsepower;
        this.torque = builder.torque;
    }

    public String getBrand(){
        return brand;
    }

    public String getModel(){
        return model;
    }

    public int getHorsepower
}
