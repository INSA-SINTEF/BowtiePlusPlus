package repository;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import javax.sql.rowset.CachedRowSet;

import com.sun.rowset.CachedRowSetImpl;

public class MySQLAccess {
	private String serverName = "kprodb.cy5oybncucgm.us-east-1.rds.amazonaws.com";
	private String password;
	private String username;
	private int portNumber = 3306;
	private Connection connection;
	
	public MySQLAccess(String password, String username) {
		this.password = password;
		this.username = username;
	}

	public void getConnection() throws SQLException {
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}


		connection = DriverManager.getConnection(
		        "jdbc:mysql://" + this.serverName + ":" + this.portNumber + "?useSSL=false",
				username,
				password
		);
		if (connection != null) {
			System.out.println("You made it, take control your database now!");
		} else {
			System.out.println("Failed to make connection!");
		}
	}

    private void close()  {
        try {
            if (connection != null) {
            	connection.close();
            }
            System.out.println("Closed all connections");
        } catch (Exception e) {

        }
    }

    public static void setValues(PreparedStatement preparedStatement, Object... values) throws SQLException {
        for (int i = 0; i < values.length; i++) {
            preparedStatement.setObject(i + 1, values[i]);
        }
    }
    
	public CachedRowSet query(String query, Object... values) {
		PreparedStatement preparedStatement = null;
		ResultSet rs = null;
		CachedRowSet cachedRowSet = null;
		try {
			getConnection();
			cachedRowSet = new CachedRowSetImpl();
			preparedStatement = connection.prepareStatement(query);
			setValues(preparedStatement, values);

			rs = preparedStatement.executeQuery(query);
			cachedRowSet.populate(rs);
		} catch (SQLException e) {

		} finally {
			close();
		}
		return cachedRowSet;

	}

}
