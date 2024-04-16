package at.htlhl.builderpattern;

public class Car {

    private final String brand;
    private final String model;
    private final int hp;
    private final int torque;

    private Car (CarBuilder builder){
        this.brand = builder.brand;
        this.model = builder.model;
        this.hp = builder.hp;
        this.torque = builder.torque;
    }

    public String getBrand(){
        return brand;
    }

    public String getModel() {
        return model;
    }

    public int getHp() {
        return hp;
    }

    public int getTorque() {
        return torque;
    }


    @Override
    public String toString() {
        return "Car{" +
                "brand='" + brand + '\'' +
                ", model='" + model + '\'' +
                ", hp=" + hp +
                ", torque=" + torque +
                '}';
    }

    public static class CarBuilder{
        private final String brand;
        private final String model;
        private int hp;
        private int torque;


        public CarBuilder(String brand, String model){
            this.brand = brand;
            this.model = model;
        }

        public CarBuilder hp(int hp){
            this.hp = hp;
            return this;
        }

        public CarBuilder torque(int torque){
            this.torque = torque;
            return this;
        }

        public Car build(){
            Car car = new Car(this);
            return car;
        }

    }
}
