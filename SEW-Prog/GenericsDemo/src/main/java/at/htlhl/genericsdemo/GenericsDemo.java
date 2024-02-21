package at.htlhl.genericsdemo;

public class GenericsDemo {

    public GenericsDemo(){
        Pair<Double,String> pair = new Pair<>();
        pair.doSomethingOne(32d);
        pair.doSomethingTwo("Zwei");
    }

    public static void main(String[] args) {
        new GenericsDemo();
    }
}
