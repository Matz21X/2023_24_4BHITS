package at.htlhl.builderpattern;

private class Car {

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
        return this.brand;
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

    private class CarBuilder{
        private final String brand;
        private final String model;
        private int hp;
        private int torque;


        private CarBuilder(String brand, String model){
            this.brand = brand;
            this.model = model;
        }

        private CarBuilder hp(int hp){
            this.hp = hp;
            return this;
        }

        private CarBuilder torque(int torque){
            this.torque = torque;
            return this;
        }

        private CarBuilder

    }
}
