# Singleton (Pattern)
#SEW 

Das Entwurfsmuster Singleton stellt sicher, dass es von einer Klasse genau **ein** Objekt existiert

```java
public class mySingleton(){
	private static MySingleton instance;
	private MySingleton() {}

	public static synchronized MySingleton getInstance(){
		if (instance == null){
			instance = new Singleton()
		}
	}
}
```