package at.htlhl.ccc;

public class Main {

    public static void main(String[] args) {

        int[] currencies = {1, 2, 6, 11, 16};
        int[] amounts = {8, 4, 13, 3};
        boolean found = false;

        if (!found){
            for (int amount : amounts) {
                for (int currency: currencies){
                    for (int currency2: currencies){
                        if (amount == currency + currency2 ||!found){
                            System.out.println(currency + " "+ currency2);
                            found = true;
                        }
                    }
                }
            }
        }
        found = false;




    }
}

