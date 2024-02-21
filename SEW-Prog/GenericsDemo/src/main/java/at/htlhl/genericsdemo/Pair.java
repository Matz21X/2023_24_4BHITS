package at.htlhl.genericsdemo;

public class Pair<E extends Number, Z> {

    public void doSomethingOne(E e) {
        System.out.println("Show first value: " + e);
        System.out.println("Show first class: " + e.getClass());
        System.out.println();
    }

    public void doSomethingTwo(Z z) {
        System.out.println("Show second value: " + z);
        System.out.println("Show second class: " + z.getClass());
    }


}
