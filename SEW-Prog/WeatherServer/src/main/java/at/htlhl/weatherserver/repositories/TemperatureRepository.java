package at.htlhl.weatherserver.repositories;

import at.htlhl.weatherserver.models.Temperature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.time.LocalDateTime;

@Repository
public class TemperatureRepository {
    // Constants **************************************************************

    private static final Logger LOGGER = (Logger) LoggerFactory.getLogger(TemperatureRepository.class);

    private static final String INSERT_TEMPERATURE_SQL= "insert into temperature(measuretime, temperature) values (?,?)";

    private static final String SELECT_LATEST_TEMP_SQL="select measuretime, temperature from temperature order by measuretime limit 1";

    private JdbcTemplate jdbcTemplate;

    @Autowired
    private void setJdbcTemplate(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate=jdbcTemplate;
    }

    //Database CRUD operations (CRUD = Create Read Update Delete)

    public Temperature insert(Temperature temperature) throws SQLException {
        if (temperature.getMeasureTime()==null){
            LocalDateTime measureTime =LocalDateTime.now();
            temperature.setMeasureTime(measureTime);
            LOGGER.info("measure time added ("+measureTime+")");
        }
        PreparedStatement ps= jdbcTemplate.getDataSource().getConnection().prepareStatement(INSERT_TEMPERATURE_SQL);
        ps.setTimestamp(1, Timestamp.valueOf(temperature.getMeasureTime()));
        ps.setFloat(2,temperature.getTemperature());
        ps.executeUpdate();
        return temperature;
    }

    public Temperature findLatestTemperature()throws SQLException{
        ResultSet rs=jdbcTemplate.getDataSource().getConnection().createStatement().executeQuery(SELECT_LATEST_TEMP_SQL);
        if(rs.next()){
            Temperature temperature=new Temperature();
            temperature.setMeasureTime(rs.getTimestamp("measuretime").toLocalDateTime());
            temperature.setTemperature(rs.getFloat("temperature"));
            return temperature;
        }else {
            throw new SQLException("Could not fetch data from database");
        }

    }
}
