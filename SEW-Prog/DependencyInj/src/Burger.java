public class Burger implements Food{
    private String name;
    private int calories;

    public Burger(String name, int calories) {
        this.name = name;
        this.calories = calories;
    }

    @Override
    public void prepareFood() {
        System.out.println("Prepping");
    }
}
