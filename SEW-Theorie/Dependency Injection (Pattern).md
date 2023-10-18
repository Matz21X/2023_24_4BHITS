# Dependency Injection (Pattern)
#SEW 

**Was ist eine Abhängigkeit?**

> Klasse A hat eine Abhängigkeit zu Klasse B wenn es in irgendeiner Form mit dieser interagiert

![[dependency.svg]]

z.B. Klasse A instanziiert Klasse B selbst:

```java
public class A {
	private B bDependency;
	public A(){
		bDependency = new B();
	}
}
```

Oder man injiziert eine Instanz der Klasse B in A (Dependency Injection)

```java
public class A {
	private B b;
	public A (B bDependency) {
		this.b = bDependency;
	}
}
```

**Es gibt 3 Arten der Injektion mittels:**
- Konstruktor (Siehe Bsp. oben)
- setter
- Eigenschaft (z.B. mit Annotierung `@Autowired` in Spring)

**Vorteile von Dependency Injection:**
- Trennung von Zuständigkeiten
- Losegekoppeltes System
- Sehr hilfreich beim testen (Test-Mockups werden injiziert)