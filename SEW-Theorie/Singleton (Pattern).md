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
			return instance; 
	}

	// Other Methods

	public int getValue(){
		// ...
	}
}
```

Das Schlüsselwort `synchronized` stellt sicher, dass der Singleton nur einmal instanziiert wird. (Threadsicher)

**Zugriff aus anderer Klasse:**
```java
MySingleton.getInstance.getValue();
```

**Alternative Implementierung mittels Enum:**
```java
public enum MySingleton {
	INSTANCE;
	public MySingleton getInstance() {
		return INSTANCE;
	}
	// Other methods ...

	public int getValue(){
		// ...
	}
}
```

**Anwendungsbeispiele**:
- Zugriff auf eine zentrale Login-Funktionalität in eine Datei


>[!INFO] VORSICHT!!!!
>Eine Singleton Implementierung sollte sehr sparsam eingesetzt werden, da die Gefahr besteht Quasi ein Äquivalent zu globalen Variablen zu schaffen. Die Testbarkeit wird darüber hinaus sehr erschwert.
