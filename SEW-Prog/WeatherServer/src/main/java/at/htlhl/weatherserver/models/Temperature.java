package at.htlhl.weatherserver.models;

import java.time.LocalDateTime;

public class Temperature {
    private LocalDateTime measuretime;
    private float temperature;

    public Temperature(LocalDateTime measureTime, float temperature) {
        this.measuretime = measureTime;
        this.temperature = temperature;
    }

    public LocalDateTime getMeasuretime() {
        return measuretime;
    }

    public void setMeasuretime(LocalDateTime measuretime) {
        this.measuretime = measuretime;
    }

    public float getTemperature() {
        return temperature;
    }

    public void setTemperature(float temperature) {
        this.temperature = temperature;
    }

    @Override
    public String toString() {
        return "Temperature{" +
               "measureTime=" + measuretime +
               ", temperature=" + temperature +
               '}';
    }
}
