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

    public int getHorsepower(){
        return horsepower;
    }

    public float getTorque(){
        return torque;
    }

    @Override
    public String toString() {
        return "Bike{" +
                "brand='" + brand + '\'' +
                ", model='" + model + '\'' +
                ", horsepower=" + horsepower +
                ", torque=" + torque +
                '}';
    }

    public static class BikeBuilder{
        private final String brand;
        private final String model;
        private int horsepower;
        private float torque;

        public BikeBuilder (String brand, String model){
            this.brand = brand;
            this.model = model;
        }

        public BikeBuilder horsepower(int horsepower){
            this.horsepower = horsepower;
            return this;
        }

        public BikeBuilder torque (float torque){
            this.torque = torque;
            return this;
        }

        public Bike build(){
            Bike bike = new Bike(this);
            return bike;
        }


    }
}
