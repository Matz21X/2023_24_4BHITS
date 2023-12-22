package at.htlhl.builderpattern;

public class User {
    // All final attributes
    private final String firstName;     // Required
    private final String lastName;      // Required
    private final int age;              // Optional
    private final String phone;         // optional
    private final String address;       // optional

    private User(UserBuilder builder) {

    }

    // All getter and NO setter

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public int getAge() {
        return age;
    }

    public String getPhone() {
        return phone;
    }

    public String getAddress() {
        return address;
    }

    @Override
    public String toString() {
        return "User{" +
               "firstName='" + firstName + '\'' +
               ", lastName='" + lastName + '\'' +
               ", age=" + age +
               ", phone='" + phone + '\'' +
               ", address='" + address + '\'' +
               '}';
    }

    public static class UserBuilder{
        private final String firstName;
        private final String lastName;
        private int age;    
    }
}