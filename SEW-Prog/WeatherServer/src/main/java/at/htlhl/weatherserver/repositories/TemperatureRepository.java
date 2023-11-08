package at.htlhl.weatherserver.repositories;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class TemperatureRepository {

    // Constants **************************************************************
    private static final Logger LOGGER = (Logger) LoggerFactory.getLogger(TemperatureRepository.class);

    private static final String INSERT_TEMPERATURE_SQL = "INSERT INTO temperature(measuretime, temperature) VALUES (?,?,?)";

    // Fields *****************************************************************
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

}



