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
	
}
```