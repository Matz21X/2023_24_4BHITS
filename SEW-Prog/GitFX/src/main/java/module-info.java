module com.example.gitfx {
    requires javafx.controls;
    requires javafx.fxml;

    requires org.controlsfx.controls;

    opens com.example.gitfx to javafx.fxml;
    exports com.example.gitfx;
}