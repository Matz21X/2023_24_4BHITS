package at.htlhl.weatherserver.repositories;

import at.htlhl.weatherserver.models.Temperature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Repository
public class TemperatureRepository {

    // Constants **************************************************************
    private static final Logger LOGGER = (Logger) LoggerFactory.getLogger(TemperatureRepository.class);

    private static final String INSERT_TEMPERATURE_SQL = "INSERT INTO temperature(measuretime, temperature) VALUES (?,?,?)";

    private final static String SELECT_LASTEST_TEMP_SQL = "SELECT measuretime, temp\n" + "FROM temperature\n" + "ORDER BY measuretime DESC" + "LIMIT 1";

    // Fields *****************************************************************
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // Database CRUD (CRUD = Create, Reade, Update, Delete)
    public Temperature insert(Temperature temperature) throws SQLException {
        if (temperature.getMeasuretime() == null) {
            LocalDateTime measureTime = LocalDateTime.now();
            temperature.setMeasuretime(measureTime);
            LOGGER.info("measure time added (" + measureTime + ")");
        }
        PreparedStatement ps = jdbcTemplate.getDataSource().getConnection().prepareStatement(INSERT_TEMPERATURE_SQL);

        ps.setTimestamp(1, Timestamp.valueOf(temperature.getMeasuretime()));
        ps.setFloat(2, temperature.getTemperature());
        ps.executeUpdate();
        return temperature;
    }

    public Temperature findLatestTemperature(){
        ResultSet rs = jdbcTemplate.getDataSource().getConnection().createStatement()
    }

}



