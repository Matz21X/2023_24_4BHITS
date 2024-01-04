package at.htlhl.weatherserver.models;

import java.time.LocalDateTime;

public class Temperature {
    private LocalDateTime measureTime;
    private  float temperature;

    public Temperature (LocalDateTime measureTime, float temperature){
        this.measureTime=measureTime;
        this.temperature=temperature;
    }

    public Temperature() {

    }

    @Override
    public String toString() {
        return "Temperature{" +
                "measureTime=" + measureTime +
                ", temperature=" + temperature +
                '}';
    }

    public LocalDateTime getMeasureTime() {
        return measureTime;
    }

    public void setMeasureTime(LocalDateTime measureTime) {
        this.measureTime = measureTime;
    }

    public float getTemperature() {
        return temperature;
    }

    public void setTemperature(float temperature) {
        this.temperature = temperature;
    }
}
