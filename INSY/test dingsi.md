# Test Vorbereitung
#INSY 

## Python

**Variablen**
```python
integer = 23
floating_point = 20.2
string_hehehaha = "String"
```

**Listen**
```python
list1 = ["a", "b", "c", "d"]  
list2 = [25.50, True, -55, 1+2j]  
list4 = ["Rohan", "Physics", 21, 69.75]  
list3 = [1, 2, 3, 4, 5]  
  
print ("Items from index 1 to last in list1: ", list1[1:])  # ['b', 'c', 'd']
print ("Items from index 0 to 1 in list2: ", list2[:2])  # [25.5, True]
print ("Items from index 2 to last in list3", list3[2:-1])  # [3, 4]
print ("Items from index 0 to index last in list4", list4[:]) #['Rohan', 'Physics', 21, 69.75]

list1.append("Bruh")
list1.insert("")
list1.pop(4)
list1.remove("d")
list1.insert(2, 'Chemistry')
```

**File I/O**
```python
with open('dein_dateiname.txt', 'r') as file: 
	inhalt = file.read()
```

## Datenbankdesign 

**Relations**
- m = at least 1
- c = 1 or 0
- 1 = 1 
- n = Zahl

## PSQL

-  \c ... Connect to database
- \l ... List all databases